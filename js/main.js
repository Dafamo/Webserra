/* =========================================================
   GAZELEC — main.js
   Interactions minimales : nav mobile, fade-in scroll,
   bandeau cookies (CNIL), formulaire contact.
   ========================================================= */

(function () {
  'use strict';

  /* ---- Nav mobile toggle ---- */
  var nav = document.querySelector('[data-nav]');
  var toggle = document.querySelector('[data-nav-toggle]');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Fade-in au scroll ---- */
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- Cookie banner — CNIL : refus aussi simple que l'acceptation ---- */
  var KEY = 'gazelec_cookie_choice';
  var banner = document.querySelector('[data-cookie-banner]');
  if (banner) {
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    if (!stored) banner.classList.add('is-visible');

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie-action]');
      if (!btn) return;
      try { localStorage.setItem(KEY, btn.dataset.cookieAction); } catch (err) {}
      banner.classList.remove('is-visible');
    });
  }

  /* ---- Année courante footer ---- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
