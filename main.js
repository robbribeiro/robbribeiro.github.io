// ── CURSOR CUSTOMIZADO ──
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .skill-card, .project-card, .stat-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// ── NAV COM SCROLL ──
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── REVEAL AO ROLAR ──
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

// ── GALERIA MODAL ──
const galleryImages = [
  'img/robo-autonomo/image.png',
  'img/robo-autonomo/image_copy.png',
  'img/robo-autonomo/image_copy_2.png',
  'img/robo-autonomo/image_copy_3.png'
];
let currentSlide = 0;

// Preload all images on page load
galleryImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

function openGallery() {
  currentSlide = 0;
  updateGallery(true);
  document.getElementById('galleryOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGallery(e) {
  if (e) e.stopPropagation();
  const overlay = document.getElementById('galleryOverlay');
  if (e && e.target !== overlay && !e.currentTarget.classList.contains('gallery-close')) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function changeSlide(dir, e) {
  if (e) e.stopPropagation();
  currentSlide = (currentSlide + dir + galleryImages.length) % galleryImages.length;
  updateGallery();
}

function goToSlide(idx, e) {
  if (e) e.stopPropagation();
  currentSlide = idx;
  updateGallery();
}

function updateGallery(instant) {
  const img = document.getElementById('galleryImg');
  if (instant) {
    img.src = galleryImages[currentSlide];
  } else {
    img.style.opacity = 0;
    requestAnimationFrame(() => {
      img.src = galleryImages[currentSlide];
      requestAnimationFrame(() => { img.style.opacity = 1; });
    });
  }

  document.getElementById('galleryIndex').textContent = currentSlide + 1;

  document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === currentSlide);
  });
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  const overlay = document.getElementById('galleryOverlay');
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'Escape') { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'ArrowLeft') changeSlide(-1);
});