// Three.js and the matching GLTF/OrbitControls add-ons are version-pinned.
(async () => {
  const stage = document.querySelector('#rack-viewer');
  const status = document.querySelector('#model-status');
  try {
    const base = 'https://esm.sh/three@0.170.0';
    const [THREE, { GLTFLoader }, { OrbitControls }] = await Promise.all([
      import(base), import(base + '/examples/jsm/loaders/GLTFLoader.js'),
      import(base + '/examples/jsm/controls/OrbitControls.js')
    ]);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.setAttribute('aria-label', 'Rack model: drag to rotate and pinch to zoom');
    stage.append(renderer.domElement);
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xfff8eb, 0x8b7660, 2.5));
    for (const [x,y,z,power] of [[3,5,4,3],[-4,2,-3,2]]) {
      const light = new THREE.DirectionalLight(0xffffff, power);
      light.position.set(x,y,z); scene.add(light);
    }
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.enablePan = false;
    controls.minDistance = 1.3; controls.maxDistance = 8;
    const binary = atob(window.GAMMIRIS_RACK_GLB);
    const bytes = new Uint8Array(binary.length);
    for (let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
    delete window.GAMMIRIS_RACK_GLB;
    const gltf = await new GLTFLoader().parseAsync(bytes.buffer, '');
    const model = gltf.scene;
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 2 / Math.max(size.x,size.y,size.z);
    model.scale.multiplyScalar(scale);
    model.position.sub(center.multiplyScalar(scale));
    scene.add(model);
    let fitDistance = 4;
    const reset = () => {
      camera.position.set(fitDistance * .22, fitDistance * .12, fitDistance);
      controls.target.set(0,0,0); controls.update();
    };
    const resize = () => {
      const width=stage.clientWidth,height=stage.clientHeight;
      renderer.setSize(width,height); camera.aspect=width/height;
      camera.updateProjectionMatrix();
      fitDistance=1.2 / Math.tan(THREE.MathUtils.degToRad(19)) / Math.min(1,camera.aspect);
    };
    resize(); reset();
    new ResizeObserver(() => { resize(); }).observe(stage);
    stage.addEventListener('webglcontextlost',()=>{status.hidden=false;status.textContent='The 3D view was interrupted. Refresh this page to reload the model.';});
    status.hidden=true; stage.setAttribute('aria-busy','false');
    renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera);});
  } catch(error) {
    console.error('Rack viewer:',error);
    stage.setAttribute('aria-busy','false');
    status.textContent='The 3D view could not load. Check your internet connection and that your browser supports WebGL, then refresh.';
  }
})();
