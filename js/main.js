document.getElementById('year').textContent = new Date().getFullYear();

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Ticker content (real project figures), duplicated for seamless loop
const tickerData = [
  ['450+', 'systèmes solaires en Casamance'],
  ['27 / 14', 'centrales solaires sécurisées, 14 régions'],
  ['56', 'villages électrifiés en solaire (ASER)'],
  ['8 421 ml', 'de réseau MT — Ndiassane Saloum'],
  ['R+11', 'immeuble SCI Immobilière, Dakar'],
  ['26', 'villages raccordés au Lac de Guiers'],
  ['10 kWc', 'centrale solaire — village de Sabodola'],
  ['900', 'paires de câble tirées — Sonatel Médina'],
  ['300', 'systèmes PV — CR de Wack Ngouna'],
];
const track = document.getElementById('ticker');
const buildItems = () => tickerData.map(([num, label]) =>
  `<div class="ticker-item"><span class="dot"></span><b>${num}</b>${label}</div>`
).join('');
track.innerHTML = buildItems() + buildItems();

// Mobile menu
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (burgerBtn && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
  };
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
}

// Header shadow on scroll
const header = document.getElementById('siteHeader');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Scrollspy — highlight active nav link
const navLinks = document.querySelectorAll('#navLinks a');
const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if (navLinks.length && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spy.observe(s));
}

// Scroll reveal
const revealTargets = document.querySelectorAll(
  '.section-head, .team-card, .chain-strip, .lot, .stat-row, .service-item, .collab-item, .contact-panel, .tabs-nav, .proj-list'
);
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), (i % 4) * 70);
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => reveal.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}
