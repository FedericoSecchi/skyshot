// SkyShot Lab – main JS (simple & robust)
document.addEventListener('DOMContentLoaded', () => {
  // ===========================
// WORK – Optimizado para muchas fotos
// ===========================
const seeMoreBtn = document.getElementById('seeMoreBtn');
const gallery = document.querySelector('#work .gallery');

if (seeMoreBtn && gallery) {
  const allFigures = Array.from(gallery.querySelectorAll('figure'));
  const initialVisibleCount = 6;
  let isExpanded = false;

  // Ocultar figuras adicionales al inicio
  allFigures.forEach((figure, index) => {
    if (index >= initialVisibleCount) {
      figure.style.display = 'none';
    }
  });

  seeMoreBtn.setAttribute('aria-expanded', 'false');
  seeMoreBtn.textContent = `See more (+${allFigures.length - initialVisibleCount} photos)`;

  seeMoreBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
      // Mostrar todas las fotos con animación suave
      allFigures.forEach((figure, index) => {
        setTimeout(() => {
          figure.style.display = 'block';
          figure.style.opacity = '0';
          figure.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            figure.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            figure.style.opacity = '1';
            figure.style.transform = 'translateY(0)';
          }, 50);
        }, index * 50); // Efecto cascada
      });
      
      seeMoreBtn.setAttribute('aria-expanded', 'true');
      seeMoreBtn.textContent = 'Show less';
    } else {
      // Ocultar fotos adicionales
      allFigures.forEach((figure, index) => {
        if (index >= initialVisibleCount) {
          figure.style.display = 'none';
        }
      });
      
      seeMoreBtn.setAttribute('aria-expanded', 'false');
      seeMoreBtn.textContent = `See more (+${allFigures.length - initialVisibleCount} photos)`;
      
      // Scroll suave hacia la sección work
      document.getElementById('work')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  });
}

  // ===========================
  // LIGHTBOX – open/close/nav (RESTA DEL CÓDIGO IGUAL)
  // ===========================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox__img');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');
  const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
  const lightboxNext = lightbox?.querySelector('.lightbox__next');

  let lightboxImages = [];
  let currentImageIndex = -1;

  function collectGalleryImages() {
    lightboxImages = Array.from(document.querySelectorAll('#work .gallery img'));
  }

  function showLightboxImage(index) {
    if (!lightbox || !lightboxImg) return;
    
    if (lightboxImages.length === 0) collectGalleryImages();
    if (lightboxImages.length === 0) return;
    
    if (index < 0) index = lightboxImages.length - 1;
    if (index >= lightboxImages.length) index = 0;
    
    currentImageIndex = index;
    const img = lightboxImages[currentImageIndex];
    const src = img.currentSrc || img.src;
    
    lightboxImg.src = src;
    lightboxImg.alt = img.alt || 'Gallery image preview';
    
    lightbox.classList.remove('hidden');
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
    
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function openLightboxFromImage(clickedImg) {
    collectGalleryImages();
    currentImageIndex = lightboxImages.indexOf(clickedImg);
    if (currentImageIndex < 0) currentImageIndex = 0;
    showLightboxImage(currentImageIndex);
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightboxImg.removeAttribute('src');
      document.body.style.overflow = '';
    }, 300);
    
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function nextImage() { showLightboxImage(currentImageIndex + 1); }
  function prevImage() { showLightboxImage(currentImageIndex - 1); }

  document.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('#work .gallery img');
    if (clickedImg) {
      e.preventDefault();
      openLightboxFromImage(clickedImg);
    }
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => { 
      if (e.target === lightbox) closeLightbox(); 
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox && !lightbox.classList.contains('hidden')) {
      switch(e.key) {
        case 'Escape': closeLightbox(); break;
        case 'ArrowRight': nextImage(); break;
        case 'ArrowLeft': prevImage(); break;
        case 'Tab':
          const focusableElements = lightbox.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
          break;
      }
    }
  });

  // ===========================
  // Smooth scrolling for navigation links
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================
  // Navbar background on scroll
  // ===========================
  const navbar = document.querySelector('.nav');
  
  function updateNavbarBackground() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(14, 17, 23, 0.5)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = 'rgba(14, 17, 23, 0.0)';
      navbar.style.backdropFilter = 'blur(8px)';
    }
  }
  
  window.addEventListener('scroll', updateNavbarBackground);
  updateNavbarBackground();

  // ===========================
  // Image loading optimization
  // ===========================
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  console.log('SkyShot Lab JS loaded successfully!');
});