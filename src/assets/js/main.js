/* ============================================================
   STAGEHAUS PRODUCTIONS — Main JavaScript
   ============================================================ */
'use strict';

/* ── Header scroll state ── */
(function initHeader() {
  const header    = document.getElementById('site-header');
  const hamburger = document.querySelector('.header__hamburger');
  const mobileMenu= document.getElementById('mobile-menu');
  const overlay   = document.getElementById('mobile-overlay');
  const closeBtn  = document.querySelector('.mobile-menu__close');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });
  header.classList.toggle('is-scrolled', window.scrollY > 24);

  function openMenu() {
    mobileMenu.classList.add('is-open');
    overlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* Dropdown keyboard support */
  const trigger  = document.querySelector('.header__dropdown-trigger');
  const dropdown = document.getElementById('services-dropdown');
  if (trigger && dropdown) {
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', e => {
      if (!trigger.closest('li').contains(e.target)) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') trigger.setAttribute('aria-expanded', 'false');
    });
  }

  /* Active link highlight */
  const path = window.location.pathname;
  document.querySelectorAll('.header__nav-link, .header__dropdown-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (path === href || (href !== '/' && path.startsWith(href))) {
      link.classList.add('is-active');
    }
  });
})();

/* ── Scroll reveal ── */
(function initReveal() {
  const els = document.querySelectorAll(
    '.svc-card, .card, .value-card, .process-step, .testimonial, .team-card, [data-reveal]'
  );
  if (!els.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const idx = Array.from(el.parentElement?.children || []).indexOf(el);
        const delay = Math.min(idx * 60, 360);
        setTimeout(() => {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.52s ease, transform 0.52s ease';
    io.observe(el);
  });
})();

/* ── Contact / booking form ── */
(function initForms() {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';

      /* ── Wire up your form service here ──────────────────────
         Options:
         • Formspree:  fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })
         • Netlify:    add netlify attribute to <form>
         • EmailJS:    emailjs.sendForm('SERVICE', 'TEMPLATE', form)
         ─────────────────────────────────────────────────────── */
      setTimeout(() => {
        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = 'var(--clr-success)';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = orig;
          btn.style.background = '';
          btn.style.color = '';
          form.reset();
        }, 3500);
      }, 1100);
    });
  });
})();

/* ── Merch store scaffolding ──────────────────────────────────
   SQUARE WEB PAYMENTS SDK
   1. Add to base.njk <head>:
      <script src="https://web.squarecdn.com/v1/square.js"></script>
   2. Initialize:
      const payments = Square.payments('YOUR_APP_ID', 'YOUR_LOCATION_ID');
   Docs: developer.squareup.com/docs/web-payments/overview

   SHOPIFY BUY BUTTON
   1. Install the Shopify Buy Button channel in your store
   2. Embed the generated <script> snippet directly in the page
   Docs: shopify.com/buy-button

   STRIPE + SNIPCART
   1. Add to base.njk <head>:
      <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.css" />
   2. Add before </body>:
      <div hidden id="snipcart" data-api-key="YOUR_PUBLIC_KEY"></div>
      <script src="https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.js"></script>
   3. Add to any buy button:
      class="snipcart-add-item"
      data-item-id="sku"
      data-item-price="35.00"
      data-item-url="/merch-operations/"
      data-item-name="Classic Tee"
   Docs: docs.snipcart.com
────────────────────────────────────────────────────────────── */

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
