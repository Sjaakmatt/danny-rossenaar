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

// ===== Reviewcarrousel =====
const track = document.getElementById('storiesTrack');

if (track) {
  const carousel = track.closest('.carousel');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dotsContainer = document.getElementById('carouselDots');
  const cards = Array.from(track.querySelectorAll('.story-card'));

  const stapGrootte = () => {
    if (cards.length < 2) return track.clientWidth;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  };

  const zichtbaarAantal = () => Math.max(1, Math.round(track.clientWidth / stapGrootte()));

  // Stipjes opbouwen: één per "pagina"
  function bouwStipjes() {
    const paginas = Math.max(1, cards.length - zichtbaarAantal() + 1);
    dotsContainer.innerHTML = '';

    if (paginas < 2) return;

    for (let i = 0; i < paginas; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ga naar review ${i + 1}`);
      dot.addEventListener('click', () => {
        track.scrollTo({ left: i * stapGrootte(), behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    }
  }

  function ververs() {
    const overloop = track.scrollWidth > track.clientWidth + 4;
    carousel.classList.toggle('heeft-overloop', overloop);

    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = track.scrollLeft <= 12;
    nextBtn.disabled = track.scrollLeft >= maxScroll - 12;

    const actief = Math.round(track.scrollLeft / stapGrootte());
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle('actief', i === actief);
    });
  }

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -stapGrootte(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: stapGrootte(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(ververs);
  });

  window.addEventListener('resize', () => {
    bouwStipjes();
    ververs();
  });

  bouwStipjes();
  ververs();

  // Automatisch doordraaien, met respect voor de bezoeker:
  // stopt bij hover, aanraking, toetsenbordfocus of een verborgen tabblad.
  const rustigerAnimaties = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer = null;

  function volgende() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 12) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: stapGrootte(), behavior: 'smooth' });
    }
  }

  function start() {
    if (timer || rustigerAnimaties.matches) return;
    if (track.scrollWidth <= track.clientWidth + 4) return;
    timer = setInterval(volgende, 5000);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  track.addEventListener('pointerdown', stop);
  dotsContainer.addEventListener('click', stop);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  rustigerAnimaties.addEventListener('change', () => {
    stop();
    start();
  });

  start();
}

// Contactformulier versturen zonder de pagina te herladen
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmit');
  const originalLabel = submitBtn.textContent;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm).entries());

    if (!data.naam || !data.email || !data.bericht) {
      status.textContent = 'Vul je naam, e-mailadres en bericht even in.';
      status.className = 'form-status error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Bezig met versturen…';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        contactForm.reset();
        status.textContent = 'Bedankt voor je bericht! Ik neem binnen één werkdag contact met je op.';
        status.className = 'form-status success';
      } else {
        status.textContent = result.error || 'Versturen is niet gelukt. Mail me gerust rechtstreeks.';
        status.className = 'form-status error';
      }
    } catch (error) {
      status.textContent = 'Versturen is niet gelukt. Mail me gerust rechtstreeks op danny@rossenaarmarketing.nl.';
      status.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}

// Jaartal in de footer actueel houden
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
