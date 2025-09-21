// SkyShot Lab – main JS (simple & robust)
// - Collapsible “See more work”
// - Lightbox with prev/next + keyboard
// Works whether the script is loaded in <head> (defer) or before </body>

document.addEventListener('DOMContentLoaded', () => {
  // ===========================
  // WORK – Collapsible grid
  // ===========================
  const btn = document.getElementById('work-toggle');
  const more = document.getElementById('work-more');
  if (btn && more) {
    // start collapsed (CSS controls visibility; we ensure ARIA/label)
    more.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'See more work ▾';

    btn.addEventListener('click', () => {
      const open = more.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Show less ▴' : 'See more work ▾';
      if (!open) {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ===========================
  // LIGHTBOX – open/close/nav
  // ===========================
  const lb = document.getElementById('lightbox');
  const lbImg = lb?.querySelector('img');
  const btnClose = lb?.querySelector('.lightbox__close');
  const btnPrev = lb?.querySelector('.lightbox__prev');
  const btnNext = lb?.querySelector('.lightbox__next');

  let images = [];
  let current = -1;

  function collectImages() {
    images = Array.from(document.querySelectorAll('#work .gallery img'));
  }

  function show(index) {
    if (!lb || !lbImg) return;
    if (images.length === 0) collectImages();
    if (images.length === 0) return;
    // wrap-around
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    current = index;

    const img = images[current];
    const src = img.currentSrc || img.src;
    lbImg.src = src;
    lbImg.alt = img.alt || '';
    lb.classList.remove('hidden');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openFromImage(img) {
    collectImages();
    current = images.indexOf(img);
    if (current < 0) current = 0;
    show(current);
  }

  function close() {
    if (!lb || !lbImg) return;
    lb.classList.add('hidden');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.removeAttribute('src');
    lbImg.removeAttribute('alt');
    document.body.style.overflow = '';
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  // Delegated click: open lightbox when any gallery image is clicked
  document.addEventListener('click', (e) => {
    const img = e.target.closest('#work .gallery img');
    if (img) {
      e.preventDefault();
      openFromImage(img);
    }
  });

  // Controls
  btnClose?.addEventListener('click', close);
  btnNext?.addEventListener('click', next);
  btnPrev?.addEventListener('click', prev);

  // Click on overlay closes (only if click target is the overlay container)
  lb?.addEventListener('click', (e) => { if (e.target === lb) close(); });

  // Keyboard navigation when lightbox is open
  document.addEventListener('keydown', (e) => {
    if (lb && !lb.classList.contains('hidden')) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
  });
});
