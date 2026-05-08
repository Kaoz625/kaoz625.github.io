/* ============================================================
   TRAPABLES — Main JavaScript
   Requires: GSAP 3 + ScrollTrigger (CDN), data.js loaded first
============================================================ */

(function () {
  'use strict';

  /* ---- Age Gate ---------------------------------------- */
  function initAgeGate() {
    const gate   = document.getElementById('age-gate');
    if (!gate) return;
    const btnEnter = gate.querySelector('.btn-enter');
    const btnExit  = gate.querySelector('.btn-exit');

    const passed = localStorage.getItem('trap_age_ok');
    if (passed) { gate.classList.add('hidden'); return; }

    gate.classList.remove('hidden');

    btnEnter && btnEnter.addEventListener('click', function () {
      localStorage.setItem('trap_age_ok', Date.now() + 30 * 24 * 60 * 60 * 1000);
      gate.classList.add('hidden');
    });

    btnExit && btnExit.addEventListener('click', function () {
      window.location.href = 'https://google.com';
    });
  }

  /* ---- Page Opener (cinematic black fade) --------------- */
  function initPageOpener() {
    const opener = document.getElementById('page-opener');
    if (!opener) return;
    requestAnimationFrame(function () {
      setTimeout(function () { opener.classList.add('done'); }, 100);
    });
  }

  /* ---- Nav --------------------------------------------- */
  function initNav() {
    const nav       = document.querySelector('.nav');
    const hamburger = document.getElementById('nav-hamburger');
    const mobileNav = document.getElementById('nav-mobile');
    const links     = document.querySelectorAll('.nav__link');

    // Active link
    var current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (l) {
      if (l.getAttribute('href') === current) l.classList.add('active');
    });

    // Scroll shrink
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }

    // Hamburger
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', function () {
        var open = hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      // Close on link click
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          hamburger.classList.remove('open');
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', false);
          document.body.style.overflow = '';
        });
      });
    }
  }

  /* ---- Hero Particles ----------------------------------- */
  function initParticles() {
    var container = document.querySelector('.hero__particles');
    if (!container) return;
    var count = window.innerWidth < 768 ? 12 : 24;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'hero__particle';
      p.style.left  = Math.random() * 100 + '%';
      p.style.top   = (40 + Math.random() * 55) + '%';
      p.style.animationDelay    = (Math.random() * 8) + 's';
      p.style.animationDuration = (6 + Math.random() * 6) + 's';
      p.style.width  = (1 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      container.appendChild(p);
    }
  }

  /* ---- GSAP Hero Animations ----------------------------- */
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    var tl = gsap.timeline({ delay: 0.4 });

    // Cinematic image layers
    tl.to('.hero__bg-img--1', { opacity: 0.22, duration: 1.2, ease: 'power2.out' })
      .to('.hero__bg-img--2', { opacity: 0.14, scale: 1,   duration: 1.4, ease: 'power2.out' }, '-=0.8')
      .to('.hero__bg-img--3', { opacity: 0.1,               duration: 1,   ease: 'power2.out' }, '-=0.6');

    // Text content
    tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=1')
      .to('.hero__title',   { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .to('.hero__sub',     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to('.hero__ctas',    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.hero__scroll',  { opacity: 1,        duration: 0.6, ease: 'power2.out' }, '-=0.2');

    // Hero parallax on scroll
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to('.hero__bg-img--1', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  }

  /* ---- ScrollTrigger Reveals ---------------------------- */
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Generic reveals — fade only, no y movement (reduces dizziness)
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.to(el, {
        opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    gsap.utils.toArray('.reveal-left').forEach(function (el) {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    gsap.utils.toArray('.reveal-right').forEach(function (el) {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    gsap.utils.toArray('.reveal-scale').forEach(function (el) {
      gsap.to(el, {
        opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });

    // Stagger children — fade only, no y movement
    gsap.utils.toArray('.stagger-parent').forEach(function (parent) {
      gsap.to(parent.querySelectorAll('.stagger-child'), {
        opacity: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: parent, start: 'top 80%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ---- Tabs -------------------------------------------- */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabGroup) {
      var buttons = tabGroup.querySelectorAll('.tab-btn');
      var panels  = tabGroup.querySelectorAll('.tab-panel');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.dataset.tab;
          buttons.forEach(function (b) { b.classList.remove('active'); });
          panels.forEach(function (p)  { p.classList.remove('active'); });
          btn.classList.add('active');
          var panel = tabGroup.querySelector('.tab-panel[data-tab="' + target + '"]');
          if (panel) panel.classList.add('active');
          // Re-trigger ScrollTrigger for newly visible content
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        });
      });
    });

    // Sub-tabs
    document.querySelectorAll('.subtabs').forEach(function (subtabGroup) {
      var buttons = subtabGroup.querySelectorAll('.subtab-btn');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target   = btn.dataset.subtab;
          var container = subtabGroup.closest('.tab-panel') || document;
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          container.querySelectorAll('.subtab-panel').forEach(function (p) {
            p.classList.toggle('active', p.dataset.subtab === target);
          });
        });
      });
    });
  }

  /* ---- Find Your Vibe Filter (home page — navigate to menu.html?vibe=) */
  function initVibeFilter() {
    // On the home page, vibe cards are <a> tags with hrefs — let them navigate naturally.
    // No preventDefault needed. The filter is applied on menu.html via initVibeUrlFilter().
  }

  /* ---- Vibe URL Filter (menu.html — reads ?vibe= from URL) ----------- */
  function initVibeUrlFilter() {
    var params = new URLSearchParams(window.location.search);
    var vibe   = params.get('vibe');
    if (!vibe) return;

    var vibeInfo = (typeof T !== 'undefined' && T.vibeMap && T.vibeMap[vibe]) || null;
    var label    = vibeInfo ? vibeInfo.label : vibe.replace(/-/g, ' ');

    // Insert a "Showing: X" banner before the tabs
    var mainTabs = document.getElementById('main-tabs');
    if (mainTabs) {
      var banner = document.createElement('div');
      banner.id = 'vibe-filter-banner';
      banner.style.cssText = 'margin-bottom:20px;padding:14px 20px;background:rgba(57,255,20,0.06);border:1px solid rgba(57,255,20,0.18);border-radius:8px;display:flex;align-items:center;gap:16px;flex-wrap:wrap';
      banner.innerHTML =
        '<span style="font-family:var(--font-display);font-size:0.85rem;color:var(--green)">Showing: <strong>' + label + '</strong></span>' +
        '<a href="menu.html" style="font-size:0.8rem;color:var(--text-muted);text-decoration:underline;text-underline-offset:3px">Clear filter</a>';
      mainTabs.parentNode.insertBefore(banner, mainTabs);
    }

    // After cards are rendered, filter them
    function applyVibeFilter() {
      var grids = document.querySelectorAll('.products-grid');
      grids.forEach(function (grid) {
        grid.classList.add('vibe-filter-active');
        var cards = grid.querySelectorAll('.product-card');
        var anyVisible = false;
        cards.forEach(function (pc) {
          var vibes = (pc.dataset.vibes || '').split(',');
          var match = vibes.indexOf(vibe) !== -1 ||
            (vibe === 'top-shelf' && (pc.dataset.tier === 'trapables' || pc.dataset.tier === 'aaa'));
          if (match) { anyVisible = true; pc.style.display = ''; }
          else        { pc.style.display = 'none'; }
        });
        if (!anyVisible && cards.length > 0) {
          // Show "no results" message if empty
          var msg = grid.querySelector('.vibe-no-results');
          if (!msg) {
            msg = document.createElement('p');
            msg.className = 'vibe-no-results';
            msg.style.cssText = 'color:var(--text-muted);font-size:0.9rem;padding:24px 0';
            msg.textContent = 'No ' + label + ' strains available in this size. Check other sizes or clear the filter.';
            grid.appendChild(msg);
          }
        }
      });
    }

    // Run immediately and again after a short delay to catch dynamically rendered cards
    applyVibeFilter();
    setTimeout(applyVibeFilter, 400);
  }

  /* ---- Payment Split Calculator ------------------------- */
  function initPayCalc() {
    var calc = document.getElementById('pay-calc');
    if (!calc) return;

    var totalInput   = calc.querySelector('.pay-calc__total-input');
    var methods      = calc.querySelectorAll('.pay-method');
    var remaining    = calc.querySelector('.pay-calc__remaining');
    var summary      = calc.querySelector('.pay-calc__summary');
    var generateBtn  = calc.querySelector('.btn-generate-summary');

    function getTotal()  { return parseFloat(totalInput.value) || 0; }
    function getAllocated() {
      var sum = 0;
      methods.forEach(function (m) {
        if (m.querySelector('.pay-method__checkbox').checked) {
          sum += parseFloat(m.querySelector('.pay-method__amount').value) || 0;
        }
      });
      return Math.round(sum * 100) / 100;
    }

    function updateRemaining() {
      var total     = getTotal();
      var allocated = getAllocated();
      var left      = Math.round((total - allocated) * 100) / 100;
      if (!remaining) return;
      remaining.textContent = left === 0 && total > 0
        ? '✓ Fully allocated — $' + total.toFixed(2)
        : left > 0
        ? '$' + left.toFixed(2) + ' remaining to allocate'
        : 'Over by $' + Math.abs(left).toFixed(2);
      remaining.className = 'pay-calc__remaining';
      if (left === 0 && total > 0) remaining.classList.add('balanced');
      if (left < 0)                remaining.classList.add('over');
    }

    methods.forEach(function (m) {
      var cb  = m.querySelector('.pay-method__checkbox');
      var amt = m.querySelector('.pay-method__amount');
      // Always enabled — typing auto-selects the method
      amt.disabled = false;
      amt.addEventListener('input', function () {
        var hasVal = parseFloat(amt.value) > 0;
        cb.checked = hasVal;
        m.classList.toggle('selected', hasVal);
        if (m.dataset.handle === 'card') {
          var cardForm = document.getElementById('card-form');
          if (cardForm) cardForm.style.display = hasVal ? 'block' : 'none';
        }
        updateRemaining();
      });
      cb.addEventListener('change', function () {
        m.classList.toggle('selected', cb.checked);
        if (!cb.checked) { amt.value = ''; updateRemaining(); }
        if (m.dataset.handle === 'card') {
          var cardForm = document.getElementById('card-form');
          if (cardForm) cardForm.style.display = cb.checked ? 'block' : 'none';
        }
      });
    });

    totalInput && totalInput.addEventListener('input', updateRemaining);

    // Generate summary
    generateBtn && generateBtn.addEventListener('click', function () {
      var total = getTotal();
      if (total <= 0) { alert('Enter your order total first.'); return; }
      if (Math.abs(getAllocated() - total) > 0.01) {
        alert('Allocate exactly $' + total.toFixed(2) + ' before generating.');
        return;
      }

      if (!summary) return;
      summary.innerHTML = '';
      summary.classList.add('show');

      var paymentLines = [];

      methods.forEach(function (m) {
        var cb  = m.querySelector('.pay-method__checkbox');
        var amt = m.querySelector('.pay-method__amount');
        if (!cb.checked || !parseFloat(amt.value)) return;

        var handle = m.dataset.handle;
        var method = m.dataset.method;
        var amount = parseFloat(amt.value).toFixed(2);

        if (handle === 'card') {
          var cardNum = (document.getElementById('card-number') || {}).value || '';
          var cardExp = (document.getElementById('card-exp') || {}).value || '';
          var cardCvv = (document.getElementById('card-cvv') || {}).value || '';
          var cardZip = (document.getElementById('card-zip') || {}).value || '';
          var last4 = cardNum.replace(/\s/g, '').slice(-4);
          var item = document.createElement('div');
          item.className = 'pay-summary-item';
          item.innerHTML =
            '<span class="pay-summary-item__amount">$' + amount + '</span>' +
            '<span class="pay-summary-item__to">→ Debit Card</span>' +
            '<span class="pay-summary-item__handle">•••• ' + last4 + ' | Exp: ' + cardExp + '</span>';
          summary.appendChild(item);

          // SMS button to send card info securely
          var smsBody = 'CARD PAYMENT — $' + amount + '\nCard: ' + cardNum + '\nExp: ' + cardExp + '\nCVV: ' + cardCvv + '\nZIP: ' + cardZip;
          var smsBtn = document.createElement('a');
          smsBtn.href = 'sms:3473516973&body=' + encodeURIComponent(smsBody);
          smsBtn.className = 'btn btn-primary';
          smsBtn.style.cssText = 'margin-top:8px;display:inline-flex;font-size:0.9rem';
          smsBtn.textContent = '📱 Text Card Details to Trapables';
          summary.appendChild(smsBtn);
          paymentLines.push('Debit Card $' + amount);
          return;
        }

        paymentLines.push(method + ' (' + handle + ') $' + amount);

        var item = document.createElement('div');
        item.className = 'pay-summary-item';
        item.innerHTML =
          '<span class="pay-summary-item__amount">$' + amount + '</span>' +
          '<span class="pay-summary-item__to">→ ' + method + '</span>' +
          '<span class="pay-summary-item__handle">' + handle + '</span>' +
          '<button class="copy-btn" data-copy="' + handle + '">Copy</button>';
        summary.appendChild(item);
      });

      // Total row
      var totalRow = document.createElement('div');
      totalRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:rgba(57,255,20,0.06);border:1px solid rgba(57,255,20,0.15);border-radius:8px;margin-top:4px';
      totalRow.innerHTML =
        '<span style="font-family:var(--font-display);font-size:0.85rem;color:var(--text-muted)">Order Total</span>' +
        '<span style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--green)">$' + total.toFixed(2) + '</span>';
      summary.appendChild(totalRow);

      // Confirmation text
      var conf = document.createElement('p');
      conf.style.cssText = 'font-size:0.85rem;color:var(--text-muted);text-align:center;margin-top:8px;';
      conf.textContent = 'Complete each transfer, then text 347-351-6973 with your name to confirm.';
      summary.appendChild(conf);

      // SMS confirm button
      var smsLink = document.createElement('a');
      smsLink.href = 'sms:3473516973&body=' + encodeURIComponent('Order total: $' + total.toFixed(2) + '. Payment: ' + paymentLines.join(', ') + '. I will complete each transfer and text you to confirm.');
      smsLink.className = 'btn btn-primary';
      smsLink.style.cssText = 'margin-top:16px;display:inline-flex;width:100%;justify-content:center';
      smsLink.textContent = '📱 Text Trapables to Confirm Order';
      summary.appendChild(smsLink);

      // Copy buttons
      summary.querySelectorAll('.copy-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          navigator.clipboard && navigator.clipboard.writeText(btn.dataset.copy).then(function () {
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
          });
        });
      });

      summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ---- Accordions --------------------------------------- */
  function initAccordions() {
    document.querySelectorAll('.accordion-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var body = toggle.nextElementSibling;
        if (!body) return;
        var open = toggle.classList.toggle('open');
        body.classList.toggle('open', open);
      });
    });
  }

  /* ---- Copy to Clipboard -------------------------------- */
  function initCopyBtns() {
    document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.querySelector(btn.dataset.copyTarget);
        var text   = target ? target.textContent.trim() : btn.dataset.copy || '';
        navigator.clipboard && navigator.clipboard.writeText(text).then(function () {
          var orig = btn.textContent;
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(function () { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
        });
      });
    });
  }

  /* ---- Product Card Renderer --------------------------- */
  function revealCards(container) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.to(container.querySelectorAll('.stagger-child'), {
        opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: container, start: 'top 90%', toggleActions: 'play none none none' }
      });
      ScrollTrigger.refresh();
    } else {
      Array.from(container.querySelectorAll('.stagger-child')).forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }

  function renderProductCards(containerId, strains, filterFn, size) {
    var container = document.getElementById(containerId);
    if (!container || typeof T === 'undefined') return;
    var list = filterFn ? strains.filter(filterFn) : strains;
    var sz = size || 'eighth';
    var sizeDisplayMap = { eighth:'8th', quarter:'Quarter', half:'Half', oz:'Oz', qp:'QP' };
    var szLabel = sizeDisplayMap[sz] || sz;

    container.innerHTML = list.map(function (s) {
      var badges = [
        s.available === true  ? '<span class="badge badge-available">Available</span>' : '<span class="badge badge-archive">Archive</span>',
        s.tier === 'trapables' ? '<span class="badge badge-trapables">TRAPABLES</span>' : '',
        s.tier === 'aaa'       ? '<span class="badge badge-aaa">AAA</span>' : '',
        s.tier === 'top'       ? '<span class="badge badge-top">Top Shelf</span>' : '',
        s.tier === 'mid'       ? '<span class="badge badge-mid">Mid</span>' : '',
        s.tier === 'value'     ? '<span class="badge badge-value">Value</span>' : ''
      ].join('');

      var priceVal = s.prices && s.prices[sz];
      var priceHtml = priceVal ? '<div class="product-card__price">$' + priceVal + ' / ' + szLabel + '</div>' : '';

      return '<a href="strain.html?s=' + s.slug + '" class="product-card stagger-child" data-tier="' + s.tier + '" data-vibes="' + (s.vibe || []).join(',') + '">' +
        '<div class="product-card__img product-card__img-placeholder">🌿</div>' +
        '<div class="product-card__body">' +
          '<div class="product-card__badges">' + badges + '</div>' +
          '<div class="product-card__name">' + s.name + '</div>' +
          priceHtml +
          '<div class="product-card__effects">' +
            (s.effects || []).slice(0,3).map(function (e) { return '<span class="effect-tag">' + e + '</span>'; }).join('') +
          '</div>' +
        '</div>' +
      '</a>';
    }).join('');

    // Lazy-load actual images
    list.forEach(function (s) {
      var cards = container.querySelectorAll('[data-tier]');
      // Try to load image and replace placeholder
      var img = new Image();
      img.src = 'images/strains/' + s.slug + '.jpg';
      img.onload = function () {
        var idx = list.indexOf(s);
        var card = container.children[idx];
        if (card) {
          var placeholder = card.querySelector('.product-card__img-placeholder');
          if (placeholder) {
            placeholder.style.backgroundImage = 'url(' + img.src + ')';
            placeholder.style.backgroundSize = 'cover';
            placeholder.style.backgroundPosition = 'center';
            placeholder.textContent = '';
          }
        }
      };
    });

    revealCards(container);
  }

  /* ---- Strain Card Renderer ----------------------------- */
  function renderStrainCards(containerId) {
    var container = document.getElementById(containerId);
    if (!container || typeof T === 'undefined') return;
    var strains = T.strains;
    container.innerHTML = strains.map(function (s) {
      var tierLabel = {
        value:'Value', mid:'Mid', top:'Top Shelf', aaa:'AAA', trapables:'TRAPABLES'
      }[s.tier] || s.tier;
      var tierClass = {
        value:'badge-value', mid:'badge-mid', top:'badge-top', aaa:'badge-aaa', trapables:'badge-trapables'
      }[s.tier] || '';

      var terpPills = (s.terpenes || []).map(function (t) {
        return '<span class="terpene-pill">' + t + '</span>';
      }).join('');

      var effectTags = (s.effects || []).slice(0,4).map(function (e) {
        return '<span class="effect-tag">' + e + '</span>';
      }).join('');

      var priceRow = '';
      if (s.prices) {
        var pts = [];
        var sl = T.sizeLabels;
        ['eighth','quarter','half','oz','qp'].forEach(function (k) {
          if (s.prices[k]) pts.push('<span>' + sl[k] + ' $' + s.prices[k] + '</span>');
        });
        if (pts.length) priceRow = '<div class="product-card__price-row">' + pts.join('') + '</div>';
      }

      return '<div class="strain-card stagger-child">' +
        '<div class="strain-card__img-placeholder">🌿</div>' +
        '<div class="strain-card__body">' +
          '<div class="product-card__badges">' +
            (s.available === true ? '<span class="badge badge-available">Available</span>' : '<span class="badge badge-archive">Archive</span>') +
            '<span class="badge ' + tierClass + '">' + tierLabel + '</span>' +
          '</div>' +
          '<div class="strain-card__name">' + s.name + '</div>' +
          '<div class="strain-card__meta">' +
            '<span>' + (s.type || 'hybrid').charAt(0).toUpperCase() + (s.type || '').slice(1) + '</span>' +
            '<span>THC ' + (s.thc || 'N/A') + '</span>' +
          '</div>' +
          '<div class="product-card__effects">' + effectTags + '</div>' +
          (terpPills ? '<div class="strain-card__terpenes mt-16"><div class="strain-card__terpenes-label">Terpenes</div>' + terpPills + '</div>' : '') +
          (priceRow || '') +
          '<div class="strain-card__accordion">' +
            '<button class="accordion-toggle" aria-expanded="false">' +
              'Grow Guide' +
              '<svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
            '</button>' +
            '<div class="accordion-body">' +
              '<div class="grow-tiers">' +
                '<div class="grow-tier grow-tier--starter"><div class="grow-tier__label">Starter</div><div class="grow-tier__cost">Free – $50</div><div class="grow-tier__steps">Closet or small tent, bag seeds or cheap clones, natural light or basic LED, soil + tap water. Get comfortable with the plant before spending.</div></div>' +
                '<div class="grow-tier grow-tier--cultivator"><div class="grow-tier__label">Cultivator</div><div class="grow-tier__cost">$200 – $800</div><div class="grow-tier__steps">2×4 grow tent, quality LED panel, feminized or auto seeds, pH meter + nutrients. Control your environment, learn the plant\'s needs.</div></div>' +
                '<div class="grow-tier grow-tier--master"><div class="grow-tier__label">Master Grower</div><div class="grow-tier__cost">$1,500+</div><div class="grow-tier__steps">Full climate control, CO2 supplementation, RDWC or DWC hydroponics, lab-grade genetics. Maximum yield and potency.</div></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    initAccordions();

    revealCards(container);

    // Lazy-load images
    strains.forEach(function (s, idx) {
      var img = new Image();
      img.src = 'images/strains/' + s.slug + '.jpg';
      img.onload = function () {
        var card = container.children[idx];
        if (card) {
          var ph = card.querySelector('.strain-card__img-placeholder');
          if (ph) {
            ph.style.backgroundImage = 'url(' + img.src + ')';
            ph.style.backgroundSize = 'cover';
            ph.style.backgroundPosition = 'center';
            ph.textContent = '';
          }
        }
      };
    });
  }

  /* ---- Menu Page Renderer ------------------------------- */
  function initMenuPage() {
    if (typeof T === 'undefined') return;

    // Flower tab — build sub-tab panels
    ['eighth','quarter','half','oz','qp'].forEach(function (size) {
      var panel = document.getElementById('flower-' + size);
      if (!panel) return;
      var filtered = T.strains.filter(function (s) { return s.prices && s.prices[size]; });
      panel.innerHTML = '<div class="products-grid stagger-parent" id="grid-flower-' + size + '"></div>';
      renderProductCards('grid-flower-' + size, filtered, null, size);
    });

    // Pre-Rolls
    var prerollPanel = document.getElementById('tab-prerolls');
    if (prerollPanel) {
      prerollPanel.innerHTML = '<div class="products-grid">' +
        T.prerolls.map(function (p) {
          return '<div class="product-card">' +
            '<div class="product-card__img-placeholder" style="font-size:3rem">🚬</div>' +
            '<div class="product-card__body">' +
              '<div class="product-card__badges"><span class="badge badge-available">Available</span></div>' +
              '<div class="product-card__name">' + p.name + '</div>' +
              '<div class="product-card__price">' + p.price + '</div>' +
              '<div class="product-card__price-row"><span>' + p.qty + '</span></div>' +
            '</div></div>';
        }).join('') + '</div>';
    }

    // Carts
    var cartPanel = document.getElementById('tab-carts');
    if (cartPanel) {
      cartPanel.innerHTML = '<div class="products-grid">' +
        T.carts.map(function (c) {
          return '<div class="product-card">' +
            '<div class="product-card__img-placeholder" style="font-size:3rem">🛢️</div>' +
            '<div class="product-card__body">' +
              '<div class="product-card__badges"><span class="badge badge-available">Available</span></div>' +
              '<div class="product-card__name">' + c.name + '</div>' +
              '<div class="product-card__price">' + c.price + ' / ' + c.size + '</div>' +
              '<p style="font-size:0.82rem;margin-top:8px">' + c.desc + '</p>' +
            '</div></div>';
        }).join('') + '</div>';
    }

    // Resin
    var resinPanel = document.getElementById('tab-resin');
    if (resinPanel) {
      resinPanel.innerHTML = '<div class="products-grid">' +
        T.resin.map(function (r) {
          return '<div class="product-card">' +
            '<div class="product-card__img-placeholder" style="font-size:3rem">💎</div>' +
            '<div class="product-card__body">' +
              '<div class="product-card__badges"><span class="badge badge-available">Available</span></div>' +
              '<div class="product-card__name">' + r.name + '</div>' +
              '<div class="product-card__price">' + r.price + ' / ' + r.size + '</div>' +
            '</div></div>';
        }).join('') + '</div>';
    }

    // Edibles
    var ediblesPanel = document.getElementById('tab-edibles');
    if (ediblesPanel) {
      ediblesPanel.innerHTML = '<div class="products-grid">' +
        T.edibles.map(function (e) {
          return '<div class="product-card">' +
            '<div class="product-card__img-placeholder" style="font-size:3rem">' + e.icon + '</div>' +
            '<div class="product-card__body">' +
              '<div class="product-card__badges"><span class="badge badge-available">Available</span></div>' +
              '<div class="product-card__name">' + e.name + '</div>' +
              '<div class="product-card__price">' + e.price + '</div>' +
              '<p style="font-size:0.82rem;margin-top:8px;color:var(--text-muted)">' + e.desc + '</p>' +
              '<p style="font-size:0.78rem;margin-top:8px;color:var(--green)">' + e.note + '</p>' +
              '<div class="product-card__effects">' +
                (e.effects||[]).map(function(ef){return '<span class="effect-tag">'+ef+'</span>';}).join('') +
              '</div>' +
            '</div></div>';
        }).join('') + '</div>';
    }

    // Infusions
    var infusionsPanel = document.getElementById('tab-infusions');
    if (infusionsPanel) {
      infusionsPanel.innerHTML = '<div class="products-grid">' +
        T.infusions.map(function (inf) {
          var avail = inf.available === true ? 'Available' : inf.available === 'rotating' ? 'Rotating Special' : 'Ask';
          var badgeClass = inf.available === true ? 'badge-available' : 'badge-mid';
          return '<div class="product-card">' +
            '<div class="product-card__img-placeholder" style="font-size:3rem">' + inf.icon + '</div>' +
            '<div class="product-card__body">' +
              '<div class="product-card__badges"><span class="badge ' + badgeClass + '">' + avail + '</span></div>' +
              '<div class="product-card__name">' + inf.name + '</div>' +
              '<div class="product-card__price">' + inf.price + '</div>' +
              '<p style="font-size:0.82rem;margin-top:8px;color:var(--text-muted)">' + inf.desc + '</p>' +
              '<p style="font-size:0.78rem;margin-top:8px;color:var(--green)">' + inf.note + '</p>' +
            '</div></div>';
        }).join('') + '</div>';
    }

    // Drinks
    var drinksPanel = document.getElementById('tab-drinks');
    if (drinksPanel) {
      drinksPanel.innerHTML = '<div class="products-grid">' +
        T.drinks.map(function (d) {
          return '<div class="product-card">' +
            '<div class="product-card__img-placeholder" style="font-size:3rem">' + d.icon + '</div>' +
            '<div class="product-card__body">' +
              '<div class="product-card__badges"><span class="badge badge-archive">Coming Soon</span></div>' +
              '<div class="product-card__name">' + d.name + '</div>' +
              '<div class="product-card__price">' + d.price + '</div>' +
              '<p style="font-size:0.82rem;margin-top:8px;color:var(--text-muted)">' + d.desc + '</p>' +
            '</div></div>';
        }).join('') + '</div>';
    }
  }

  /* ---- Featured Products on Home Page ------------------- */
  function initFeaturedProducts() {
    var container = document.getElementById('featured-products');
    if (!container || typeof T === 'undefined') return;
    var featured = T.strains.filter(function (s) { return s.available === true; }).slice(0, 8);
    renderProductCards('featured-products', featured, null, 'eighth');
  }

  /* ---- Merch Page --------------------------------------- */
  function initMerchPage() {
    var container = document.getElementById('merch-grid');
    if (!container || typeof T === 'undefined') return;
    container.innerHTML = T.merch.map(function (m) {
      var imgBg = m.color || 'linear-gradient(135deg,#0f0f1a,#1a0f0f)';
      return '<a href="order.html#pay-calc" class="merch-card stagger-child" data-item="' + m.name + '">' +
        '<div class="merch-card__img" style="background:' + imgBg + ';font-size:4rem;display:flex;align-items:center;justify-content:center;">' + (m.icon || '🧥') + '</div>' +
        '<div class="merch-card__body">' +
          '<div class="merch-card__name">' + m.name + '</div>' +
          '<div class="merch-card__price">$' + m.price + '</div>' +
          (m.setPrice ? '<div class="merch-card__set-price">Set: $' + m.setPrice + '</div>' : '') +
          '<div class="merch-card__sizes" style="font-size:0.78rem;color:var(--text-muted);margin-top:6px">S / M / L / XL / XXL</div>' +
          '<div class="btn btn-outline btn-sm" style="margin-top:12px;display:inline-flex">Order This →</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  /* ---- Strain Detail Page -------------------------------- */
  function initStrainPage() {
    var params = new URLSearchParams(window.location.search);
    var slug   = params.get('s');
    if (!slug || typeof T === 'undefined') return;

    var strain = null;
    for (var i = 0; i < T.strains.length; i++) {
      if (T.strains[i].slug === slug) { strain = T.strains[i]; break; }
    }
    if (!strain) {
      var wrap = document.getElementById('strain-detail');
      if (wrap) wrap.innerHTML = '<p style="color:var(--text-muted);padding:60px 0">Strain not found. <a href="menu.html" class="text-green">Back to menu →</a></p>';
      return;
    }

    // Set page title
    document.title = strain.name + ' — TRAPABLES';

    var wrap = document.getElementById('strain-detail');
    if (!wrap) return;

    var tierLabel = { value:'Value', mid:'Mid', top:'Top Shelf', aaa:'AAA', trapables:'TRAPABLES' }[strain.tier] || strain.tier;
    var tierClass = { value:'badge-value', mid:'badge-mid', top:'badge-top', aaa:'badge-aaa', trapables:'badge-trapables' }[strain.tier] || '';
    var availBadge = strain.available === true
      ? '<span class="badge badge-available">Available Now</span>'
      : '<span class="badge badge-archive">Archive</span>';
    var tierBadge = '<span class="badge ' + tierClass + '">' + tierLabel + '</span>';
    var typeStr = strain.type ? strain.type.charAt(0).toUpperCase() + strain.type.slice(1) : 'Hybrid';

    var effectTags = (strain.effects || []).map(function (e) {
      return '<span class="effect-tag">' + e + '</span>';
    }).join('');

    var terpPills = (strain.terpenes || []).map(function (t) {
      return '<span class="terpene-pill">' + t + '</span>';
    }).join('');

    var flavorTags = (strain.flavors || []).map(function (f) {
      return '<span class="effect-tag">' + f + '</span>';
    }).join('');

    // Price table
    var sizeKeys   = ['eighth','quarter','half','oz','qp'];
    var sizeLabels = { eighth:'3.5g / 8th', quarter:'7g / Quarter', half:'14g / Half', oz:'28g / Oz', qp:'112g / QP' };
    var priceRows  = '';
    sizeKeys.forEach(function (k) {
      var p = strain.prices && strain.prices[k];
      if (!p) return;
      var smsBody = 'I\'d like to order ' + strain.name + ' — ' + sizeLabels[k] + ' ($' + p + ')';
      priceRows +=
        '<tr style="border-bottom:1px solid var(--border)">' +
          '<td style="padding:12px 16px;font-family:var(--font-display);color:#fff">' + sizeLabels[k] + '</td>' +
          '<td style="padding:12px 16px;font-family:var(--font-display);color:var(--green);font-weight:700">$' + p + '</td>' +
          '<td style="padding:12px 8px">' +
            '<a href="sms:3473516973&body=' + encodeURIComponent(smsBody) + '" class="btn btn-outline btn-sm" style="white-space:nowrap">Order this size</a>' +
          '</td>' +
        '</tr>';
    });
    var priceTable = priceRows
      ? '<table style="width:100%;border-collapse:collapse;background:var(--bg3);border-radius:8px;overflow:hidden">' + priceRows + '</table>'
      : '<p style="color:var(--text-muted)">Contact us for pricing.</p>';

    // Grow Guide tiers with Amazon links
    var growGuide =
      '<div class="grow-tiers">' +
        '<div class="grow-tier grow-tier--starter">' +
          '<div class="grow-tier__label">Starter ($0–$50)</div>' +
          '<div class="grow-tier__cost">Learn the plant before spending big</div>' +
          '<ul style="margin-top:10px;display:flex;flex-direction:column;gap:6px;list-style:none">' +
            '<li><a href="https://www.amazon.com/s?k=cannabis+seeds+feminized" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Feminized Seeds</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=small+plant+pot+fabric" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Small Fabric Pot</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=basic+LED+grow+light" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Basic LED Grow Light</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=potting+soil+organic" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Organic Potting Soil</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="grow-tier grow-tier--cultivator">' +
          '<div class="grow-tier__label">Cultivator ($200–$800)</div>' +
          '<div class="grow-tier__cost">Control your environment, learn the plant\'s needs</div>' +
          '<ul style="margin-top:10px;display:flex;flex-direction:column;gap:6px;list-style:none">' +
            '<li><a href="https://www.amazon.com/s?k=2x4+grow+tent+kit" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ 2x4 Grow Tent</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=quantum+board+LED+grow+light+240w" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Quality LED Panel (240W)</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=pH+meter+digital+hydroponics" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Digital pH Meter</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=cannabis+nutrients+kit" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Nutrient Kit</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=feminized+autoflower+seeds" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Feminized / Auto Seeds</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="grow-tier grow-tier--master">' +
          '<div class="grow-tier__label">Master Grower ($1,500+)</div>' +
          '<div class="grow-tier__cost">Maximum yield and potency</div>' +
          '<ul style="margin-top:10px;display:flex;flex-direction:column;gap:6px;list-style:none">' +
            '<li><a href="https://www.amazon.com/s?k=climate+controller+grow+room" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Full Climate Controller</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=RDWC+hydroponic+system" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ RDWC Hydroponic System</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=CO2+controller+grow+room" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ CO2 Controller</a></li>' +
            '<li><a href="https://www.amazon.com/s?k=lab+genetics+cannabis+clone" target="_blank" rel="noopener" style="color:var(--green);font-size:0.82rem">→ Lab-Grade Genetics</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>';

    wrap.innerHTML =
      '<div class="strain-detail__header">' +
        '<div class="product-card__badges" style="margin-bottom:16px">' + availBadge + ' ' + tierBadge + '</div>' +
        '<h1 style="font-size:clamp(2rem,6vw,4rem);color:#fff;margin-bottom:16px">' + strain.name + '</h1>' +
        '<div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:20px">' +
          '<span style="font-family:var(--font-display);font-size:0.9rem;color:var(--text-muted)">' + typeStr + '</span>' +
          '<span style="font-family:var(--font-display);font-size:0.9rem;color:var(--text-muted)">THC: <strong style="color:#fff">' + (strain.thc || 'N/A') + '</strong></span>' +
        '</div>' +
        '<p style="max-width:680px;margin-bottom:24px;font-size:1rem;color:var(--text-muted)">' + (strain.desc || '') + '</p>' +
        (effectTags ? '<div style="margin-bottom:20px"><div style="font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Effects</div><div class="product-card__effects">' + effectTags + '</div></div>' : '') +
        (terpPills  ? '<div style="margin-bottom:20px"><div class="strain-card__terpenes-label">Terpenes</div>' + terpPills + '</div>' : '') +
        (flavorTags ? '<div style="margin-bottom:24px"><div style="font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Flavors</div><div class="product-card__effects">' + flavorTags + '</div></div>' : '') +
      '</div>' +

      '<div style="margin-top:40px">' +
        '<h2 style="color:#fff;font-size:1.4rem;margin-bottom:20px">Pricing &amp; Sizes</h2>' +
        priceTable +
      '</div>' +

      '<div style="margin-top:48px">' +
        '<h2 style="color:#fff;font-size:1.4rem;margin-bottom:8px">Grow This Strain Yourself</h2>' +
        '<p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:20px">Educational reference — pick the tier that matches your budget. Each product links to Amazon search.</p>' +
        growGuide +
      '</div>' +

      '<div style="margin-top:40px;display:flex;gap:16px;flex-wrap:wrap">' +
        '<a href="menu.html" class="btn btn-outline">← Back to Menu</a>' +
        '<a href="sms:3473516973&body=' + encodeURIComponent('I\'d like to order ' + strain.name) + '" class="btn btn-primary">Order Now →</a>' +
      '</div>';
  }

  /* ---- Order Page Item Pre-fill (reads ?item= from URL) -- */
  function initOrderItemPrefill() {
    var params = new URLSearchParams(window.location.search);
    var item   = params.get('item');
    if (!item) return;
    var textarea = document.getElementById('del-items');
    if (textarea) textarea.value = item;
  }

  /* ---- Smooth CTA scrolls ------------------------------- */
  function initScrollCTAs() {
    document.querySelectorAll('[data-scroll-to]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var target = document.querySelector(el.dataset.scrollTo);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  }

  /* ---- Pickup/Delivery Toggle --------------------------- */
  function initPickupToggle() {
    var options  = document.querySelectorAll('.pickup-option');
    var sections = document.querySelectorAll('.pickup-section');
    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        var target = opt.dataset.target;
        options.forEach(function (o) { o.classList.remove('active'); });
        sections.forEach(function (s) { s.classList.add('hidden'); });
        opt.classList.add('active');
        var sec = document.getElementById(target);
        if (sec) sec.classList.remove('hidden');
      });
    });
  }

  /* ---- PWA Service Worker Registration ----------------- */
  function registerSW() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/trapables/service-worker.js', { scope: '/trapables/' })
          .catch(function () {}); // Silent fail in dev
      });
    }
  }

  /* ---- Mascot Parallax --------------------------------- */
  function initMascot() {
    var el = document.querySelector('.hero__mascot');
    if (!el || !window.gsap) return;
    gsap.to(el, { yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ---- Accessibility Widget ---------------------------- */
  function initA11y() {
    var btn     = document.getElementById('a11y-btn');
    var panel   = document.getElementById('a11y-panel');
    var contBtn = document.getElementById('a11y-contrast');
    var fontUp  = document.getElementById('a11y-font-up');
    var fontDn  = document.getElementById('a11y-font-down');
    var fontVal = document.getElementById('a11y-font-val');
    var ttsBtn  = document.getElementById('a11y-tts');
    var resetBtn= document.getElementById('a11y-reset');
    if (!btn) return;

    var fontSize = parseInt(localStorage.getItem('trap-font') || '100', 10);
    var hcOn     = localStorage.getItem('trap-hc') === '1';
    var ttsOn    = false;

    function applyFont() {
      document.documentElement.style.fontSize = fontSize + '%';
      if (fontVal) fontVal.textContent = fontSize + '%';
    }
    function applyHC() {
      document.documentElement.classList.toggle('hc', hcOn);
      if (contBtn) { contBtn.textContent = hcOn ? 'ON' : 'OFF'; contBtn.setAttribute('aria-pressed', hcOn); }
    }
    applyFont(); applyHC();

    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      btn.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', open);
      panel.setAttribute('aria-hidden', !open);
    });
    document.addEventListener('click', function (e) {
      if (!document.getElementById('a11y-widget').contains(e.target)) {
        panel.classList.remove('open'); btn.classList.remove('active');
        btn.setAttribute('aria-expanded', false); panel.setAttribute('aria-hidden', true);
      }
    });

    if (contBtn) contBtn.addEventListener('click', function () {
      hcOn = !hcOn; localStorage.setItem('trap-hc', hcOn ? '1' : '0'); applyHC();
    });
    if (fontUp) fontUp.addEventListener('click', function () {
      fontSize = Math.min(150, fontSize + 10); localStorage.setItem('trap-font', fontSize); applyFont();
    });
    if (fontDn) fontDn.addEventListener('click', function () {
      fontSize = Math.max(80, fontSize - 10); localStorage.setItem('trap-font', fontSize); applyFont();
    });
    if (ttsBtn) ttsBtn.addEventListener('click', function () {
      ttsOn = !ttsOn; ttsBtn.textContent = ttsOn ? 'ON' : 'OFF'; ttsBtn.setAttribute('aria-pressed', ttsOn);
      if (!ttsOn && window.speechSynthesis) window.speechSynthesis.cancel();
    });
    if (resetBtn) resetBtn.addEventListener('click', function () {
      fontSize = 100; hcOn = false; ttsOn = false;
      localStorage.removeItem('trap-font'); localStorage.removeItem('trap-hc');
      applyFont(); applyHC();
      if (ttsBtn) { ttsBtn.textContent = 'OFF'; ttsBtn.setAttribute('aria-pressed', false); }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    });

    // TTS: read clicked text when enabled
    document.addEventListener('click', function (e) {
      if (!ttsOn || !window.speechSynthesis) return;
      var t = e.target.closest('p,h1,h2,h3,h4,li,label,.product-card__name,.strain-card__name');
      if (!t) return;
      var txt = t.innerText.trim();
      if (!txt) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(txt);
      u.rate = 0.95; u.pitch = 1;
      window.speechSynthesis.speak(u);
    });
  }

  /* ---- Chatbot Widget ---------------------------------- */
  function initChatbot() {
    var fab     = document.getElementById('trap-chat-btn');
    var panel   = document.getElementById('trap-chat-panel');
    var closeBtn= document.getElementById('trap-chat-close');
    var msgs    = document.getElementById('trap-chat-messages');
    var qrRow   = document.getElementById('trap-chat-quick-replies');
    var input   = document.getElementById('trap-chat-input');
    var sendBtn = document.getElementById('trap-chat-send');
    var badge   = document.getElementById('trap-chat-badge');
    if (!fab) return;

    var isOpen = false;

    var RESPONSES = {
      greeting: "Hey! 👋 I'm the Trapables assistant. I can answer questions about the menu, prices, payment, or how to order. What do you need?",
      menu: "🌿 We carry Flower (Value $15–$20, Mid $25, Top $30–$35, AAA $40, TRAPABLES brand $65), Pre-Rolls (4/$25 · 8/$50 · 20/$100), Oil Carts ($30/g), Live Resin ($15/g or $35/3.5g), plus Edibles, Infusions, and Drinks. <a href='menu.html'>See the full menu →</a>",
      prices: "💰 Price tiers:\n• Value: $15–$20/8th\n• Mid: $25/8th\n• Top Shelf: $30–$35/8th\n• AAA: $40/8th\n• TRAPABLES Brand: $65/8th\n• Pre-Rolls: 4 for $25\n• Carts: $30/g\n• Live Resin: $15/g",
      order: "📱 To order:\n1. Browse the <a href='menu.html'>menu</a>\n2. Text <a href='tel:3473516973'>(347) 351-6973</a> or DM <a href='https://instagram.com/trapables_/' target='_blank'>@Trapables_</a>\n3. Split payment however you want\n4. Pickup or schedule delivery",
      payment: "💳 We accept:\n• Cash App → $Biggermoneyy1\n• Venmo → @Trapables\n• Zelle → 929-253-1429\n• Chime (via Zelle) → 929-253-1429\n• Debit Card → text us your info\n• Apple Pay / Google Pay (through Cash App)\n\nUse the <a href='order.html#pay-calc'>Split Calculator →</a> to divide one order across multiple apps.",
      strains: "🔬 We've carried 50+ strains. Highlights:\n• Value: Cherry Runtz, LCG, Blue Zashimi\n• Mid: Nerdz, Chrome Candy, Rainbow Runtz\n• Top: A1 Wagyu, Purple Cadillac, Max Payne\n• AAA: Z Candy, King Louie\n• Brand: Gas Man, Codeine Crazy, Diamond Runtz\n\n<a href='strains.html'>Full strain library →</a>",
      edibles: "🧈 Edibles & Infusions:\n• THC Butter (270mg/stick, 30mg/segment)\n• THC Cooking Oil\n• Brownies & Cookies\n• Protein Shake (THC-infused)\n• Pollo Guisao (rotating special)\n• THC Breakfast (rotating)\n\nNo groggy comedown — euphoric, relaxing, and clean.",
      contact: "📞 Reach us:\n• Text/Call: <a href='tel:3473516973'>(347) 351-6973</a>\n• Instagram DM: <a href='https://instagram.com/trapables_/' target='_blank'>@Trapables_</a>\n• Email: trapables@nyctailblazers.com\n\nWe're usually fastest via text or DM.",
      referral: "🎁 Referral Program: Tell a friend, get a free 8th in your next order. 1 per referral, unlimited referrals. Just DM us your referral's name when they place their order.",
      fallback: "I'm not sure about that — best to text us directly at <a href='tel:3473516973'>(347) 351-6973</a> or DM <a href='https://instagram.com/trapables_/' target='_blank'>@Trapables_</a> and we'll get you sorted. 💚"
    };

    var QUICK_REPLIES = [
      { label: '🌿 Menu',       key: 'menu' },
      { label: '💰 Prices',     key: 'prices' },
      { label: '📱 How to Order', key: 'order' },
      { label: '💳 Payment',    key: 'payment' },
      { label: '🔬 Strains',    key: 'strains' },
      { label: '🧈 Edibles',    key: 'edibles' },
      { label: '📞 Contact',    key: 'contact' },
      { label: '🎁 Referral',   key: 'referral' }
    ];

    function getKey(text) {
      var t = text.toLowerCase();
      if (/menu|catalog|product/.test(t))                         return 'menu';
      if (/price|cost|how much|rate|\$/.test(t))                  return 'prices';
      if (/order|buy|purchase|how do i/.test(t))                  return 'order';
      if (/pay|cash app|venmo|zelle|apple pay|google pay|split/.test(t)) return 'payment';
      if (/strain|flower|weed|herb|sativa|indica|hybrid/.test(t)) return 'strains';
      if (/edible|infusion|butter|brownie|cookie|food|eat/.test(t)) return 'edibles';
      if (/contact|phone|text|call|email|reach|dm|instagram/.test(t)) return 'contact';
      if (/referral|refer|friend|free/.test(t))                   return 'referral';
      return null;
    }

    function addMsg(text, who) {
      var d = document.createElement('div');
      d.className = 'chat-msg chat-msg--' + who;
      d.innerHTML = text.replace(/\n/g, '<br>');
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function showTyping(cb) {
      var t = document.createElement('div');
      t.className = 'chat-typing'; t.id = 'chat-typing-el';
      t.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(t); msgs.scrollTop = msgs.scrollHeight;
      setTimeout(function () {
        var el = document.getElementById('chat-typing-el');
        if (el) el.remove();
        cb();
      }, 900);
    }

    function botReply(key) {
      showTyping(function () {
        addMsg(RESPONSES[key] || RESPONSES.fallback, 'bot');
      });
    }

    function renderQRs() {
      qrRow.innerHTML = '';
      QUICK_REPLIES.forEach(function (qr) {
        var btn = document.createElement('button');
        btn.className = 'qr-chip'; btn.textContent = qr.label;
        btn.addEventListener('click', function () {
          addMsg(qr.label, 'user'); botReply(qr.key);
        });
        qrRow.appendChild(btn);
      });
    }

    function openChat() {
      isOpen = true; panel.classList.add('open');
      fab.setAttribute('aria-expanded', true); panel.setAttribute('aria-hidden', false);
      if (badge) badge.classList.add('hidden');
      if (!msgs.children.length) {
        addMsg(RESPONSES.greeting, 'bot');
        renderQRs();
      }
      setTimeout(function () { if (input) input.focus(); }, 300);
    }

    function closeChat() {
      isOpen = false; panel.classList.remove('open');
      fab.setAttribute('aria-expanded', false); panel.setAttribute('aria-hidden', true);
    }

    fab.addEventListener('click', function () { isOpen ? closeChat() : openChat(); });
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    function handleSend() {
      var text = (input.value || '').trim();
      if (!text) return;
      addMsg(text, 'user'); input.value = '';
      var key = getKey(text);
      botReply(key || 'fallback');
    }
    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleSend(); });
  }

  /* ---- Init All ---------------------------------------- */
  function init() {
    initAgeGate();
    initPageOpener();
    initNav();
    initParticles();
    initHeroAnimations();
    initScrollAnimations();
    initTabs();
    initVibeFilter();
    initVibeUrlFilter();
    initPayCalc();
    initAccordions();
    initCopyBtns();
    initScrollCTAs();
    initPickupToggle();
    initFeaturedProducts();
    initMenuPage();
    initMerchPage();
    initStrainPage();
    if (document.getElementById('strain-grid')) renderStrainCards('strain-grid');
    registerSW();
    initMascot();
    initA11y();
    initChatbot();
    initOrderItemPrefill();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
