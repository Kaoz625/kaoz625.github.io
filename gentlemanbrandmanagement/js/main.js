/* ============================================================
   GENTLEMAN BRAND MANAGEMENT — Production JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. MOBILE NAV TOGGLE ── */
  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('nav-mobile');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 2. ACTIVE NAV LINK ── */
  function initActiveNav() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav__link');

    links.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      const linkFile = href.split('/').pop();
      if (
        linkFile === filename ||
        (filename === '' && linkFile === 'index.html') ||
        (filename === 'index.html' && linkFile === 'index.html')
      ) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── 3. SCROLL ANIMATIONS ── */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── 4. ACCESSIBILITY WIDGET ── */
  function initA11yWidget() {
    const toggleBtn = document.getElementById('a11y-toggle');
    const panel = document.getElementById('a11y-panel');
    if (!toggleBtn || !panel) return;

    // Open/close panel
    toggleBtn.addEventListener('click', function () {
      const isOpen = panel.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      // Close chat if open
      const chatPanel = document.getElementById('chat-panel');
      if (chatPanel) chatPanel.classList.remove('open');
    });

    // High contrast toggle
    const contrastToggle = document.getElementById('hc-toggle');
    if (contrastToggle) {
      // Restore saved preference
      const savedHC = localStorage.getItem('gbm-high-contrast') === 'true';
      contrastToggle.checked = savedHC;
      if (savedHC) document.body.classList.add('high-contrast');

      contrastToggle.addEventListener('change', function () {
        document.body.classList.toggle('high-contrast', this.checked);
        localStorage.setItem('gbm-high-contrast', String(this.checked));
      });
    }

    // Font size controls
    const fontIncBtn = document.getElementById('font-inc');
    const fontDecBtn = document.getElementById('font-dec');
    let currentSize = parseFloat(localStorage.getItem('gbm-font-size') || '16');

    function applyFontSize(size) {
      currentSize = Math.min(24, Math.max(12, size));
      document.documentElement.style.fontSize = currentSize + 'px';
      localStorage.setItem('gbm-font-size', String(currentSize));
    }

    applyFontSize(currentSize);

    if (fontIncBtn) {
      fontIncBtn.addEventListener('click', function () {
        applyFontSize(currentSize + 1);
      });
    }

    if (fontDecBtn) {
      fontDecBtn.addEventListener('click', function () {
        applyFontSize(currentSize - 1);
      });
    }

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggleBtn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 5. AI CHATBOT WIDGET ── */
  function initChatWidget() {
    const chatToggleBtn = document.getElementById('chat-toggle');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatToggleBtn || !chatPanel) return;

    // System prompt for the AI assistant
    const SYSTEM_PROMPT = `You are the AI assistant for Gentleman Brand Management, a veteran-owned SBA-certified business consulting firm. You help potential clients understand our services (registration, consulting, marketing, financial, leadership, contracts), answer questions, and book consultations via our Calendly. Always be professional, concise, and mission-focused. If asked about pricing, say consultations start with a free 30-min discovery call. If asked to book, direct them to our contact page.`;

    // Conversation history
    const conversation = [];

    // Demo responses when no API key is configured
    const demoResponses = [
      "Thank you for reaching out to Gentleman Brand Management. We're a veteran-owned, SBA-certified business consulting firm built on the same discipline and commitment that defines the Marine Corps. How can we serve you today?",
      "Our services include business registration & planning, consulting & coaching, marketing & brand strategy, financial & accounting services, leadership development, and contract guidance. Each engagement is tailored to your mission.",
      "We start every engagement with a free 30-minute discovery call — no commitment, no pressure. Just a strategic conversation about your business goals. Ready to schedule? Visit our Contact page or book directly via Calendly.",
      "Great question. Our approach is rooted in military precision — clear objectives, measurable outcomes, and absolute accountability. We've helped 50+ businesses launch and scale. Semper Fidelis: always faithful to your success.",
      "SBA certification means we're recognized and qualified to assist small businesses with government contracting opportunities, financing, and growth programs. As a veteran-owned firm, we bring mission-first discipline to every engagement.",
      "I'd recommend scheduling a free discovery call so we can assess your specific situation and recommend the right service. You can reach us through the Contact page. We respond within 24 hours — Semper Fi."
    ];

    let demoIndex = 0;

    // Open/close panel
    chatToggleBtn.addEventListener('click', function () {
      const isOpen = chatPanel.classList.toggle('open');
      chatToggleBtn.setAttribute('aria-expanded', String(isOpen));
      // Close a11y panel if open
      const a11yPanel = document.getElementById('a11y-panel');
      if (a11yPanel) a11yPanel.classList.remove('open');
      if (isOpen && chatInput) chatInput.focus();
    });

    if (chatClose) {
      chatClose.addEventListener('click', function () {
        chatPanel.classList.remove('open');
        chatToggleBtn.setAttribute('aria-expanded', 'false');
      });
    }

    function appendMessage(text, role) {
      const msg = document.createElement('div');
      msg.classList.add('chat-message', role);
      msg.textContent = text;
      msg.setAttribute('role', 'listitem');
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.classList.add('chat-message', 'bot');
      typing.id = 'chat-typing';
      typing.textContent = '...';
      typing.setAttribute('aria-label', 'Assistant is typing');
      chatMessages.appendChild(typing);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTyping() {
      const typing = document.getElementById('chat-typing');
      if (typing) typing.remove();
    }

    async function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;

      chatInput.value = '';
      appendMessage(text, 'user');
      conversation.push({ role: 'user', content: text });
      showTyping();
      chatSendBtn.disabled = true;

      // Replace with your Claude API proxy endpoint
      // const API_ENDPOINT = 'https://your-proxy.example.com/api/chat';

      try {
        // Demo mode: cycle through pre-written responses
        await new Promise(function (resolve) { setTimeout(resolve, 800 + Math.random() * 600); });
        removeTyping();
        const reply = demoResponses[demoIndex % demoResponses.length];
        demoIndex++;
        appendMessage(reply, 'bot');
        conversation.push({ role: 'assistant', content: reply });

        /* Live API mode (uncomment and configure your proxy):
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system: SYSTEM_PROMPT,
            messages: conversation.slice(-10) // Last 10 messages for context
          })
        });
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        removeTyping();
        const reply = data.content?.[0]?.text || data.message || 'I apologize, something went wrong. Please contact us directly.';
        appendMessage(reply, 'bot');
        conversation.push({ role: 'assistant', content: reply });
        */
      } catch (err) {
        removeTyping();
        appendMessage('I apologize, I\'m having trouble connecting. Please contact us directly through our Contact page or call us — we respond within 24 hours.', 'bot');
      } finally {
        chatSendBtn.disabled = false;
        if (chatInput) chatInput.focus();
      }
    }

    if (chatSendBtn) {
      chatSendBtn.addEventListener('click', sendMessage);
    }

    if (chatInput) {
      chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }
  }

  /* ── 6. CASE STUDY MODALS ── */
  function initCaseStudyModals() {
    const cards = document.querySelectorAll('[data-modal]');
    const overlay = document.getElementById('modal-overlay');
    if (!cards.length || !overlay) return;

    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalMetric = document.getElementById('modal-metric');
    const modalChallenge = document.getElementById('modal-challenge');
    const modalSolution = document.getElementById('modal-solution');
    const modalOutcome = document.getElementById('modal-outcome');
    const modalClose = document.getElementById('modal-close');

    function openModal(data) {
      if (modalCategory) modalCategory.textContent = data.category || '';
      if (modalTitle) modalTitle.textContent = data.title || '';
      if (modalMetric) modalMetric.textContent = data.metric || '';
      if (modalChallenge) modalChallenge.textContent = data.challenge || '';
      if (modalSolution) modalSolution.textContent = data.solution || '';
      if (modalOutcome) modalOutcome.textContent = data.outcome || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (modalClose) modalClose.focus();
    }

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        openModal({
          category: card.dataset.categoryLabel || card.dataset.category,
          title: card.dataset.title,
          metric: card.dataset.metric,
          challenge: card.dataset.challenge,
          solution: card.dataset.solution,
          outcome: card.dataset.outcome
        });
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ── 7. CASE STUDY FILTER ── */
  function initCaseStudyFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.case-study-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        cards.forEach(function (card) {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            card.setAttribute('aria-hidden', 'false');
          } else {
            card.style.display = 'none';
            card.setAttribute('aria-hidden', 'true');
          }
        });
      });
    });
  }

  /* ── 8. CONTACT FORM SUBMISSION ── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      // Simulate submission (replace with actual endpoint)
      setTimeout(function () {
        form.innerHTML = `
          <div style="text-align:center;padding:var(--space-12,3rem) 0;">
            <div style="font-size:2.5rem;margin-bottom:1rem;">&#10003;</div>
            <h3 style="font-family:'Playfair Display',serif;font-size:1.5rem;margin-bottom:0.75rem;">Message Received</h3>
            <p style="color:#6C757D;">Thank you for reaching out. We'll respond within 24 hours — Semper Fi.</p>
          </div>`;
      }, 1200);
    });
  }

  /* ── 9. NEWSLETTER FORM ── */
  function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (btn) {
        btn.textContent = 'Subscribed!';
        btn.disabled = true;
        btn.style.background = '#28a745';
      }
      if (input) input.value = '';
    });
  }

  /* ── 10. 404 SPA ROUTING FIX ── */
  function initSPARouting() {
    const p = new URLSearchParams(window.location.search).get('p');
    if (p) {
      window.history.replaceState(null, null, '/' + p);
    }
  }

  /* ── 11. SERVICE CARD EXPAND ── */
  function initServiceExpand() {
    const expandBtns = document.querySelectorAll('[data-expand]');
    expandBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetId = btn.dataset.expand;
        const target = document.getElementById(targetId);
        if (!target) return;
        const isOpen = target.style.display === 'block';
        target.style.display = isOpen ? 'none' : 'block';
        btn.textContent = isOpen ? 'Learn More' : 'Show Less';
      });
    });
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', function () {
    initSPARouting();
    initMobileNav();
    initActiveNav();
    initScrollAnimations();
    initA11yWidget();
    initChatWidget();
    initCaseStudyModals();
    initCaseStudyFilter();
    initContactForm();
    initNewsletterForm();
    initServiceExpand();
  });

})();
