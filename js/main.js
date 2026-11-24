/**
 * main.js — Codevera Solutions
 * ─────────────────────────────────────────────────────────────
 * Page orchestration, payment logic, contact form, smooth scroll.
 * Each page calls only the renderers it needs.
 * ─────────────────────────────────────────────────────────────
 */

/* ── Page Detection ───────────────────────────────────────── */
const PAGE = (() => {
  const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  return path === '' ? 'index' : path;
})();

/* ── Razorpay Payment Handler ─────────────────────────────── */
function handlePayment(productId, amount, tierName = '') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (amount === 0) {
    // Free plan — redirect to contact / signup
    window.location.href = `index.html#contact?product=${productId}&tier=${tierName}`;
    return;
  }

  // Check if Razorpay is loaded
  if (typeof Razorpay === 'undefined') {
    // Fallback: open WhatsApp with order intent
    const msg = encodeURIComponent(
      `Hi! I'd like to purchase "${product.name}"${tierName ? ` (${tierName} plan)` : ''} for ₹${amount}. Please share payment details.`
    );
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank');
    return;
  }

  /* ── Razorpay Options (production-ready structure) ── */
  const options = {
    key: SITE.razorpayKey,
    amount: amount * 100, // paise
    currency: product.currencyCode || 'INR',
    name: SITE.name + ' Solutions',
    description: product.name + (tierName ? ` — ${tierName}` : ''),
    image: 'https://codevera.in/logo.png', // Replace with actual logo URL
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      product_id: productId,
      tier: tierName,
    },
    theme: { color: '#4f46e5' },
    handler(response) {
      // Payment success
      console.log('Payment successful:', response);
      showPaymentSuccess(product.name, tierName, response.razorpay_payment_id);
    },
    modal: {
      ondismiss() {
        console.log('Payment cancelled');
      },
    },
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', err => {
    console.error('Payment failed:', err.error);
    alert(`Payment failed: ${err.error.description}. Please try again or contact us.`);
  });
  rzp.open();
}

function showPaymentSuccess(productName, tierName, paymentId) {
  const overlay = document.createElement('div');
  overlay.className = 'payment-success-overlay';
  overlay.innerHTML = `
    <div class="payment-success-modal">
      <div class="success-icon">🎉</div>
      <h2>Payment Successful!</h2>
      <p>Thank you for purchasing <strong>${productName}</strong>${tierName ? ` (${tierName})` : ''}.</p>
      <p class="payment-id">Payment ID: <code>${paymentId}</code></p>
      <p>You'll receive download / access details at your email within a few minutes.</p>
      <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem">
        <a href="mailto:${SITE.email}" class="btn btn-primary">Contact Support</a>
        <button class="btn btn-secondary" onclick="this.closest('.payment-success-overlay').remove()">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

/* ── Contact Form ─────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    // Firebase-ready lead format
    const lead = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      service: data.service || '',
      budget: data.budget || '',
      message: data.message,
      source: 'website_contact_form',
      page: PAGE,
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    console.log('Lead captured (Firebase-ready):', lead);
    // TODO: Replace with Firebase write:
    // firebase.firestore().collection('leads').add(lead);

    // WhatsApp direct option
    if (data.whatsapp === 'yes') {
      const msg = encodeURIComponent(
        `Hi! I'm ${data.name}.\nService: ${data.service || 'General'}\nBudget: ${data.budget || 'TBD'}\n\n${data.message}`
      );
      window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank');
      return;
    }

    // Mailto fallback
    const subject = `[Codevera] ${data.service || 'Project Inquiry'} from ${data.name}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\nService: ${data.service || '—'}\nBudget: ${data.budget || '—'}\n\n${data.message}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // UI feedback
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = orig;
      btn.disabled = false;
    }, 3000);
  });
}

/* ── Motion preference ────────────────────────────────────── */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Smooth Scroll ────────────────────────────────────────── */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;          // bare "#" is not a valid selector
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 68;
    window.scrollTo({
      top: target.offsetTop - navH - 12,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
    history.replaceState(null, '', href);
  });
}

/* ── Scroll UI: progress bar + back-to-top ────────────────── */
function initScrollUI() {
  const bar = document.getElementById('navProgress');
  const toTop = document.getElementById('toTopBtn');
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    if (toTop) toTop.classList.toggle('show', y > 600);
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  update();
}

/* ── Scrollspy: highlight the nav link for the section in view ── */
function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav-links a[href*="#"]')]
    .filter(a => !a.classList.contains('btn'));
  if (!links.length) return;

  const byHash = new Map();
  const sections = [];
  links.forEach(a => {
    const hash = a.getAttribute('href').slice(a.getAttribute('href').indexOf('#'));
    const section = document.querySelector(hash);
    if (!section) return;
    byHash.set(hash, a);
    sections.push(section);
  });
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    // Pick the entry closest to the top of the viewport among those visible
    const visible = entries.filter(e => e.isIntersecting);
    if (!visible.length) return;
    const top = visible.reduce((a, b) =>
      a.boundingClientRect.top < b.boundingClientRect.top ? a : b);
    links.forEach(a => a.classList.remove('active'));
    byHash.get('#' + top.target.id)?.classList.add('active');
  }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ── Scroll Animations ────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Number Counter Animation ─────────────────────────────── */
function animateCounters() {
  const stats = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);

      // Only count up a plain "<digits><suffix>" value. Stripping non-digits
      // from something like "24/7" would rebuild it as "247/".
      const m = el.textContent.trim().match(/^(\d+)(\D*)$/);
      if (!m || prefersReducedMotion()) return;

      const num = parseInt(m[1], 10);
      const suffix = m[2];
      let start = 0;
      const duration = 1200;
      const step = num / (duration / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, num);
        el.textContent = Math.round(start) + suffix;
        if (start >= num) clearInterval(timer);
      }, 16);
    });
  }, { threshold: 0.5 });
  stats.forEach(el => observer.observe(el));
}

/* ── Spotlight: cards glow where the cursor is ────────────── */
function initSpotlight() {
  document.addEventListener('pointermove', e => {
    const card = e.target.closest?.('.spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}

/* ── Hero: rotating word ("We build websites / apps / …") ── */
function initRotator() {
  const el = document.getElementById('rotator');
  if (!el) return;
  const words = JSON.parse(el.dataset.words || '[]');
  if (words.length < 2 || prefersReducedMotion()) return;
  let i = 0;
  let current = el.querySelector('.word');
  setInterval(() => {
    i = (i + 1) % words.length;
    const next = document.createElement('span');
    next.className = 'word gradient-text in-start';
    next.textContent = words[i];
    el.appendChild(next);
    current.classList.add('out');
    setTimeout(() => next.classList.remove('in-start'), 30);
    const old = current;
    setTimeout(() => old.remove(), 600);
    current = next;
  }, 2600);
}

/* ── Hero: AI chat demo that plays like a real conversation ── */
const CHAT_SCRIPT = [
  { who: 'user', text: 'Do you have 1/2" drywall? What does it cost?' },
  { who: 'bot', text: 'Yes! Here\'s what\'s in stock right now:' },
  { who: 'product', name: 'Drywall Sheet 1/2" × 4\' × 8\'', price: '$17.98 / sheet' },
  { who: 'user', text: 'I need 60 sheets delivered to Brampton.' },
  { who: 'bot', text: 'Delivery is free over $500 🚚 I\'ve started a quote for 60 sheets. What\'s your name?' },
];

function initChatDemo() {
  const body = document.getElementById('chat-body');
  if (!body) return;
  const esc = R.esc;

  if (prefersReducedMotion()) {
    body.innerHTML = CHAT_SCRIPT.map(chatLine).join('');
    return;
  }

  let step = 0;
  const tick = () => {
    if (step >= CHAT_SCRIPT.length) {
      setTimeout(() => { body.innerHTML = ''; step = 0; tick(); }, 4500);
      return;
    }
    const line = CHAT_SCRIPT[step++];
    if (line.who === 'user') {
      body.insertAdjacentHTML('beforeend', chatLine(line));
      setTimeout(tick, 900);
    } else {
      body.insertAdjacentHTML('beforeend', '<div class="typing"><span></span><span></span><span></span></div>');
      setTimeout(() => {
        body.querySelector('.typing')?.remove();
        body.insertAdjacentHTML('beforeend', chatLine(line));
        setTimeout(tick, line.who === 'product' ? 700 : 1300);
      }, line.who === 'product' ? 300 : 1100);
    }
  };
  setTimeout(tick, 700);

  function chatLine(l) {
    if (l.who === 'product') {
      return `<div class="chat-product"><i></i><div><b>${esc(l.name)}</b>${esc(l.price)}</div><em>In stock</em></div>`;
    }
    return `<div class="bubble ${l.who}">${esc(l.text)}</div>`;
  }
}

/* ── Work: open a case study from a card ─────────────────── */
function initProjectModal() {
  const grid = document.getElementById('projects-grid');
  const modal = document.getElementById('project-modal');
  if (!grid || !modal) return;
  grid.addEventListener('click', e => {
    const card = e.target.closest('[data-project]');
    if (card) openProject(card.dataset.project);
  });
  grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('[data-project]');
    if (!card) return;
    e.preventDefault();
    openProject(card.dataset.project);
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.closest('[data-close]')) closeProject();
  });
}

/* ── Keyboard Accessibility ───────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeLightbox();
  if (typeof closeProject === 'function') closeProject();
});

/* ── Page Bootstrap ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Universal
  renderNav(PAGE);
  renderFooter();
  renderWhatsApp();
  initSmoothScroll();
  initScrollUI();
  initSpotlight();

  // Page-specific
  switch (PAGE) {
    case 'index':
      renderTech();
      renderStats();
      renderServices();
      renderProjectFilters();
      renderProjects();
      renderBuild();
      renderSaas();
      renderProcess();
      renderHomeFaq();
      initContactForm();
      animateCounters();
      initScrollSpy();
      initRotator();
      initChatDemo();
      initProjectModal();
      break;

    case 'products':
      renderProductFilters();
      renderProductsGrid();
      break;

    case 'product':
      renderProductDetail();
      initScrollAnimations();
      break;

    case 'blog':
      renderBlog();
      break;
  }

  // Global reveal after all renders
  setTimeout(observeReveal, 100);
});
