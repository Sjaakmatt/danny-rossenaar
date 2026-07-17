// Rossenaar Marketing — kleine interacties

// Mobiel menu
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
});

// Menu sluiten na klik op een link (mobiel)
siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Secties rustig laten verschijnen bij het scrollen
const revealables = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealables.forEach((el) => observer.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('visible'));
}

// Reviews in- en uitklappen
document.querySelectorAll('.story-card').forEach((card) => {
  const quote = card.querySelector('blockquote');
  const toggle = card.querySelector('.story-toggle');
  if (!quote || !toggle) return;

  // knop verbergen als de tekst toch al past
  if (quote.scrollHeight <= quote.clientHeight + 2) {
    toggle.classList.add('hidden');
    return;
  }

  toggle.addEventListener('click', () => {
    const expanded = card.classList.toggle('expanded');
    toggle.textContent = expanded ? 'Lees minder' : 'Lees verder';
    toggle.setAttribute('aria-expanded', String(expanded));
  });
});

// Jaartal in de footer actueel houden
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
