/* ============================================================
   2AD Architecture — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll fade-in ── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    fadeEls.forEach(el => obs.observe(el));
  }

  /* ── Hero : animation d'entrée ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    const img = hero.querySelector('.hero-img');
    const activate = () => hero.classList.add('loaded');
    if (img) {
      img.complete ? activate() : img.addEventListener('load', activate);
    }
  }

  /* ── Navigation mobile ── */
  const toggle  = document.querySelector('.nav-toggle');
  const sidebar = document.querySelector('.nav-sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    document.addEventListener('click', (e) => {
      if (
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        sidebar.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ── Lien actif dans la nav ── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ── Bandeau cookies ── */
  const banner       = document.querySelector('.cookie-banner');
  const btnAccept    = document.querySelector('.cookie-btn-accept');
  const btnRefuse    = document.querySelector('.cookie-btn-refuse');

  function dismissBanner() {
    if (!banner) return;
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 520);
  }

  if (banner && !localStorage.getItem('2ad-cookies')) {
    setTimeout(() => banner.classList.add('visible'), 1400);
  }
  btnAccept?.addEventListener('click', () => {
    localStorage.setItem('2ad-cookies', 'accepted');
    dismissBanner();
  });
  btnRefuse?.addEventListener('click', () => {
    localStorage.setItem('2ad-cookies', 'refused');
    dismissBanner();
  });

  /* ── Formulaire de contact ── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      /* Honeypot anti-spam */
      if (form.querySelector('[name="website"]')?.value) return;

      /*
        INTÉGRATION EMAIL — À CONNECTER :
        Option A (recommandée) : Formspree → form action="https://formspree.io/f/VOTRE_ID"
        Option B : Netlify Forms → ajouter netlify netlify-honeypot="website" sur <form>
        Option C : Backend propre (PHP/Node) envoyant à agence@2ad.net
      */

      const success = document.querySelector('.form-success');
      if (success) {
        success.style.display = 'block';
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ── Filtres projets ── */
  const filtres = document.querySelectorAll('.filtre-btn');
  const cards   = document.querySelectorAll('.projet-card');

  if (filtres.length && cards.length) {
    filtres.forEach(btn => {
      btn.addEventListener('click', () => {
        filtres.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.filter;
        cards.forEach(card => {
          if (cat === 'tous' || card.dataset.cat === cat) {
            card.removeAttribute('data-hidden');
          } else {
            card.setAttribute('data-hidden', 'true');
          }
        });
      });
    });
  }

})();
