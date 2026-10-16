(() => {
  // Elements
  const modal = document.getElementById('orderModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalSimulateBtn = document.getElementById('modalSimulateBtn');
  const modalThumb = document.getElementById('modalThumb');
  const modalName = document.getElementById('modalName');
  const modalPrice = document.getElementById('modalPrice');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
  const shopToast = document.getElementById('shopToast');
  const toastMessage = document.getElementById('toastMessage');

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const productCount = document.getElementById('productCount');
  const racksSection = document.getElementById('racks-section');
  const upcomingSection = document.getElementById('upcoming-section');

  // Toast Helper
  let toastTimer = null;
  const showToast = (message) => {
    if (shopToast && toastMessage) {
      toastMessage.textContent = message;
      shopToast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        shopToast.classList.remove('show');
      }, 4000);
    }
  };

  // Modal Open Handler
  const openModal = (name, price, img, specs) => {
    if (!modal) return;
    if (modalName) modalName.textContent = name;
    if (modalPrice) modalPrice.textContent = price;
    if (modalThumb) {
      modalThumb.src = img;
      modalThumb.alt = name;
    }
    if (modalSpecs) modalSpecs.textContent = specs || 'Handcrafted Solid Oak';

    if (modalWhatsAppBtn) {
      const message = encodeURIComponent(`Hi GamMiris! I would like to inquire about ordering ${name} (${price}). Please let me know delivery availability.`);
      modalWhatsAppBtn.href = `https://wa.me/94770000000?text=${message}`;
    }

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  };

  const closeModal = () => {
    if (!modal) return;
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  };

  // Buy Now Buttons
  document.querySelectorAll('[data-buy-btn]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.getAttribute('data-name') || 'GamMiris The Rack';
      const price = btn.getAttribute('data-price') || '5,000 LKR';
      const img = btn.getAttribute('data-img') || 'assets/rack-1.jpg';
      const specs = btn.getAttribute('data-specs') || 'Handcrafted Solid Oak';
      openModal(name, price, img, specs);
    });
  });

  // Modal Close Events
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });
  }

  // Simulate Order Action
  if (modalSimulateBtn) {
    modalSimulateBtn.addEventListener('click', () => {
      const currentProduct = modalName ? modalName.textContent : 'The Rack';
      closeModal();
      showToast(`Inquiry received for ${currentProduct}! Our workshop team will contact you shortly.`);
    });
  }

  // Coming Soon Notify Buttons
  document.querySelectorAll('[data-notify-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product') || 'this item';
      showToast(`Thank you! You're on the waitlist for the ${product}. We'll notify you upon release.`);
    });
  });

  // Category Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      productCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide section headings appropriately
      if (racksSection) {
        racksSection.style.display = (filter === 'upcoming') ? 'none' : '';
      }
      if (upcomingSection) {
        upcomingSection.style.display = (filter === 'available') ? 'none' : '';
      }

      if (productCount) {
        if (filter === 'all') {
          productCount.textContent = `Showing all ${visibleCount} products`;
        } else if (filter === 'available') {
          productCount.textContent = `Showing ${visibleCount} available racks`;
        } else {
          productCount.textContent = `Showing ${visibleCount} upcoming items`;
        }
      }
    });
  });
})();
