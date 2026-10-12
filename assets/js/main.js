document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

/* Mobile nav: hamburger opens a full-width sheet */
if (header && toggle && nav) {
  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) setOpen(false);
  });
  window.matchMedia('(min-width: 981px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

/* Active nav link (aria-current) */
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach((a) => {
  if (a.getAttribute('href') === here && !a.classList.contains('nav-sheet-cta')) a.setAttribute('aria-current', 'page');
});

/* Hairline border on the sticky header once scrolled */
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Restrained scroll reveal: fade + rise 8px */
const revealTargets = document.querySelectorAll('main .section-heading, main .feature-card, main .workflow-list li, main .product-grid > *, main .split > *, main .cta-panel');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealTargets.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) return; // already in view: no animation
    el.classList.add('reveal');
    io.observe(el);
  });
}
