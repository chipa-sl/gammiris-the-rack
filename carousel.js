document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  if (slides.length < 2) return;
  const pages = [...carousel.querySelectorAll('[data-page]')];
  let active = 0;
  const show = index => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== active; });
    pages.forEach((button, i) => {
      if (i === active) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    carousel.querySelector('[data-count]').textContent = `${active + 1} / ${slides.length}`;
  };
  document.querySelectorAll('[data-show-screen]').forEach(button => button.addEventListener('click', () => show(Number(button.dataset.showScreen))));
  const selectTopic = () => { if (location.hash === '#household-habits') show(1); else if (location.hash === '#stock-monitoring') show(0); };
  window.addEventListener('hashchange', selectTopic);
  selectTopic();
  carousel.querySelector('[data-prev]').addEventListener('click', () => show(active - 1));
  carousel.querySelector('[data-next]').addEventListener('click', () => show(active + 1));
  pages.forEach(button => button.addEventListener('click', () => show(Number(button.dataset.page))));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let startX, startY;
  carousel.addEventListener('touchstart', event => {
    startX = event.changedTouches[0].clientX; startY = event.changedTouches[0].clientY;
  }, {passive:true});
  carousel.addEventListener('touchend', event => {
    const dx = event.changedTouches[0].clientX - startX;
    const dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(active + (dx < 0 ? 1 : -1));
  }, {passive:true});
});
