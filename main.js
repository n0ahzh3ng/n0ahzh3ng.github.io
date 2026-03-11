// ─── NAV SCROLL EFFECT ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── HAMBURGER MENU ───────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate bars
  const [a, b, c] = hamburger.querySelectorAll('span');
  if (isOpen) {
    a.style.transform = 'translateY(7px) rotate(45deg)';
    b.style.opacity   = '0';
    c.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    a.style.transform = b.style.transform = c.style.transform = '';
    b.style.opacity   = '1';
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const [a, b, c] = hamburger.querySelectorAll('span');
    a.style.transform = b.style.transform = c.style.transform = '';
    b.style.opacity = '1';
  });
});

// ─── REVEAL ON SCROLL ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ─── SMOOTH ACTIVE LINK HIGHLIGHT ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const allLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          if (!link.classList.contains('nav-cta')) {
            link.style.color = 'var(--teal)';
          }
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
