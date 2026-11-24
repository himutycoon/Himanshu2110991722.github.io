/**
 * render.js — Codevera Solutions
 * ─────────────────────────────────────────────────────────────
 * All reusable DOM-rendering functions.
 * Each render* function targets a CSS class / ID and injects HTML.
 * ─────────────────────────────────────────────────────────────
 */

/* ── Helpers ──────────────────────────────────────────────── */
const R = {
  /** Render stars ★★★★★ */
  stars(n) {
    if (!n) return '';
    return Array.from({ length: 5 }, (_, i) =>
      `<span class="star ${i < Math.floor(n) ? 'filled' : ''}">${i < Math.floor(n) ? '★' : '☆'}</span>`
    ).join('');
  },

  /** Escape HTML entities */
  esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  },

  /** Format price */
  price(p, currency = '₹') {
    if (p === 0) return 'Free';
    return `${currency}${p.toLocaleString('en-IN')}`;
  },

  /** Build product page URL */
  productUrl(id) {
    return `product.html?id=${id}`;
  },
};

/* ── Navigation ───────────────────────────────────────────── */
function renderNav(activePage = 'index') {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const linksHTML = NAV_LINKS.map(link => {
    const href = link.anchor
      ? (activePage === 'index' ? link.anchor : link.href + link.anchor)
      : link.href;
    const active = (activePage === 'products' && link.href === 'products.html') ||
                   (activePage === 'blog' && link.href === 'blog.html') ? 'active' : '';
    return `<li><a href="${href}" class="${active}">${link.label}</a></li>`;
  }).join('');

  nav.innerHTML = `
    <div class="nav-container">
      <a href="index.html" class="logo" aria-label="Codevera Solutions home"><span class="logo-mark" aria-hidden="true">C</span><span>Codevera<span class="dot">.</span></span></a>
      <ul class="nav-links" id="navLinks">
        ${linksHTML}
        <li><a href="${activePage === 'index' ? '#contact' : 'index.html#contact'}" class="btn btn-primary btn-sm">Start a project <span class="arrow">→</span></a></li>
      </ul>
      <button class="mobile-menu-toggle" id="mobileToggle" aria-label="Menu"
              aria-expanded="false" aria-controls="navLinks">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-progress"><span id="navProgress"></span></div>
  `;

  // Nav scroll behaviour
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.pageYOffset > 60);
  });

  // Mobile toggle
  const toggle = document.getElementById('mobileToggle');
  const links = document.getElementById('navLinks');
  toggle?.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  links?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  // Close the mobile menu on Escape or when clicking outside it
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !links?.classList.contains('open')) return;
    toggle.classList.remove('open');
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });
  document.addEventListener('click', e => {
    if (!links?.classList.contains('open')) return;
    if (e.target.closest('.nav-links') || e.target.closest('.mobile-menu-toggle')) return;
    toggle.classList.remove('open');
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
}

/* ── Footer ───────────────────────────────────────────────── */
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo"><span class="logo-mark" aria-hidden="true">C</span><span>Codevera<span class="dot">.</span></span></div>
        <p>Websites, mobile apps, SaaS products and AI assistants, designed and built end to end by Codevera Solutions.</p>
        <div class="footer-social">
          <a href="https://wa.me/${SITE.whatsapp}" target="_blank" aria-label="WhatsApp" class="social-btn">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor"><path d="M16 0C7.164 0 0 7.164 0 16c0 2.832.736 5.488 2.02 7.796L0 32l8.416-1.984C10.656 31.144 13.248 31.8 16 31.8c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.2c-2.464 0-4.784-.652-6.796-1.808l-.484-.288-4.96 1.336 1.36-4.816-.324-.508C3.524 20.984 2.8 18.56 2.8 16 2.8 8.716 8.716 2.8 16 2.8S29.2 8.716 29.2 16 23.284 29.2 16 29.2z"/></svg>
          </a>
          <a href="mailto:${SITE.email}" aria-label="Email" class="social-btn">✉</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="index.html#services">Services</a></li>
          <li><a href="index.html#work">Our work</a></li>
          <li><a href="index.html#build">SaaS we build</a></li>
          <li><a href="index.html#process">Process</a></li>
          <li><a href="index.html#contact">Start a project</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Products</h4>
        <ul>
          ${PRODUCTS.map(p => `<li><a href="${R.productUrl(p.id)}">${p.name}</a></li>`).join('')}
        </ul>
      </div>

      <div class="footer-col">
        <h4>SaaS Tools</h4>
        <ul>
          ${SAAS_TOOLS.map(t => `<li><a href="index.html#saas">${t.name}</a></li>`).join('')}
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="contact.html">Contact Us</a></li>
          <li><a href="terms.html">Terms &amp; Conditions</a></li>
          <li><a href="privacy-policy.html">Privacy Policy</a></li>
          <li><a href="refund-policy.html">Refund &amp; Cancellation</a></li>
          <li><a href="shipping-policy.html">Shipping &amp; Delivery</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© ${SITE.year} Codevera Solutions. Crafted by ${SITE.founder}.</p>
      <p><a href="mailto:${SITE.email}">${SITE.email}</a> · <a href="tel:${SITE.phone}">${SITE.phone}</a></p>
    </div>
  `;
}

/* ── Services ─────────────────────────────────────────────── */
function renderServices() {
  const el = document.getElementById('services-grid');
  if (!el) return;

  el.innerHTML = SERVICES.map((s, i) => `
    <div class="service-card spot reveal ${s.wide ? 'wide' : ''}" style="--d:${(i % 4) * 0.06}s">
      <div class="service-icon">${ICONS[s.icon] || ICONS.web}</div>
      <h3>${R.esc(s.title)}</h3>
      <p>${R.esc(s.description)}</p>
      <ul class="service-features">
        ${s.features.map(f => `<li>${R.esc(f)}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

/* ── Projects / Work ──────────────────────────────────────── */
/** A browser, phone or chart drawn in CSS, tinted with the project colour. */
function projectMock(p) {
  if (p.mock === 'phone') return `
    <div class="mock mock-phone"><div class="notch"></div>
      <div class="app-hdr">${p.icon}</div>
      <div class="row"></div><div class="row"></div><div class="row" style="width:70%"></div>
    </div>`;
  if (p.mock === 'data') return `
    <div class="mock mock-data">
      ${[38, 62, 45, 80, 55, 92, 70, 100].map(h => `<span style="height:${h}%"></span>`).join('')}
    </div>`;
  if (p.mock === 'icon') return `<div class="mock-icon">${p.icon}</div>`;
  return `
    <div class="mock mock-browser">
      <div class="mock-bar"><i></i><i></i><i></i></div>
      <div class="mock-ui">
        <div class="hero-blk">${p.icon}<span class="ln s" style="flex:1"></span></div>
        <div class="card-blk"></div><div class="card-blk"></div>
        <div class="ln"></div><div class="ln s"></div>
      </div>
    </div>`;
}

function projectVisual(p) {
  return `
    <div class="project-image" style="--accent:${p.color}">
      <div class="project-overlay">
        <span class="project-category">${R.esc(p.category)}</span>
        <span class="project-year">${p.year}</span>
      </div>
      ${projectMock(p)}
    </div>`;
}

function renderProjects(filter = 'all') {
  const el = document.getElementById('projects-grid');
  if (!el) return;

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  if (!filtered.length) {
    el.innerHTML = `<p class="grid-empty">No projects in this category yet.</p>`;
    return;
  }

  el.innerHTML = filtered.map((p, i) => `
    <article class="project-card spot reveal ${p.featured && filter === 'all' ? 'featured' : ''}"
             style="--d:${(i % 3) * 0.07}s" data-project="${p.id}" tabindex="0" role="button"
             aria-label="Open case study: ${R.esc(p.title)}">
      ${projectVisual(p)}
      <div class="project-info">
        <span class="client">${R.esc(p.client)}</span>
        <h3>${R.esc(p.title)} ${p.live ? '<span class="live-dot">Live</span>' : ''}</h3>
        <p>${R.esc(p.description)}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${R.esc(t)}</span>`).join('')}
        </div>
        <span class="project-link">View case study <span class="arrow">→</span></span>
      </div>
    </article>
  `).join('');

  observeReveal();
}

/** Case-study modal for one project. */
function openProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  const modal = document.getElementById('project-modal');
  if (!p || !modal) return;
  modal.querySelector('.modal-card').innerHTML = `
    <button class="modal-close" aria-label="Close" data-close>✕</button>
    ${projectVisual(p)}
    <div class="modal-body">
      <span style="font-family:var(--f-mono);font-size:12px;color:var(--ink-3)">${R.esc(p.client)}</span>
      <h3>${R.esc(p.title)} ${p.live ? '<span class="live-dot">Live</span>' : ''}</h3>
      <p>${R.esc(p.description)}</p>
      <ul>${p.highlights.map(h => `<li>${R.esc(h)}</li>`).join('')}</ul>
      <div class="project-tags">${p.tags.map(t => `<span class="tag">${R.esc(t)}</span>`).join('')}</div>
      <div class="modal-actions">
        ${p.link ? `<a class="btn btn-primary" href="${p.link}" target="_blank" rel="noopener">${R.esc(p.linkLabel || 'Visit')} <span class="arrow">→</span></a>` : ''}
        <a class="btn btn-secondary" href="#contact" data-close>Build something like this</a>
      </div>
    </div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').focus();
}

function closeProject() {
  const modal = document.getElementById('project-modal');
  if (!modal || !modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ── Project filter buttons ───────────────────────────────── */
function renderProjectFilters() {
  const el = document.getElementById('project-filters');
  if (!el) return;

  const cats = ['All', ...new Set(PROJECTS.map(p => p.category))];
  el.innerHTML = cats.map(c => `
    <button class="filter-btn ${c === 'All' ? 'active' : ''}" data-filter="${c.toLowerCase()}">
      ${c}
    </button>
  `).join('');

  el.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    el.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
}

/* ── Stats ────────────────────────────────────────────────── */
function renderStats() {
  const el = document.getElementById('stats-grid');
  if (!el) return;

  el.innerHTML = STATS.map(s => `
    <div class="stat-item reveal">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

/* ── Products Grid (products.html) ────────────────────────── */
function renderProductsGrid(filter = 'all') {
  const el = document.getElementById('products-grid');
  if (!el) return;

  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  // The markup ships an empty state — show it when a filter matches nothing
  const empty = document.getElementById('products-empty');
  if (empty) empty.style.display = filtered.length ? 'none' : 'block';

  el.innerHTML = filtered.map(p => `
    <div class="product-card reveal" data-category="${p.category.toLowerCase()}">
      ${p.badge ? `<span class="product-badge ${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
      <div class="product-image">
        <img src="${p.image}" alt="${R.esc(p.name)}" loading="lazy">
      </div>
      <div class="product-body">
        <span class="product-category-tag">${p.category}</span>
        <h3>${R.esc(p.name)}</h3>
        <p>${R.esc(p.description)}</p>
        <div class="product-price">
          ${p.originalPrice ? `<span class="price-original">${R.price(p.originalPrice, p.currency)}</span>` : ''}
          <span class="price-current">${R.price(p.price, p.currency)}</span>
          ${p.price === 0 ? '' : '<span class="price-note">one-time</span>'}
        </div>
        <div class="product-actions">
          <a href="${R.productUrl(p.id)}" class="btn btn-secondary">View Details</a>
          <button class="btn btn-primary" onclick="handlePayment('${p.id}', ${p.tiers ? p.tiers[0]?.price : p.price})">Buy Now</button>
        </div>
      </div>
    </div>
  `).join('');

  observeReveal();
}

/* ── Product Category Filters ─────────────────────────────── */
function renderProductFilters() {
  const el = document.getElementById('product-filters');
  if (!el) return;

  const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  el.innerHTML = cats.map(c => `
    <button class="filter-btn ${c === 'All' ? 'active' : ''}" data-filter="${c.toLowerCase()}">
      ${c}
    </button>
  `).join('');

  el.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    el.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProductsGrid(btn.dataset.filter);
  });
}

/* ── Product Detail Page ──────────────────────────────────── */
function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(p => p.id === id || p.slug === id);
  const el = document.getElementById('product-detail');

  if (!el) return;

  if (!product) {
    el.innerHTML = `<div class="container" style="padding:10rem 2rem;text-align:center">
      <h2>Product not found</h2>
      <a href="products.html" class="btn btn-primary" style="margin-top:2rem">← Back to Products</a>
    </div>`;
    return;
  }

  document.title = `${product.name} — Codevera Solutions`;

  el.innerHTML = `
    <!-- Hero -->
    <section class="product-hero">
      <div class="container">
        <div class="product-hero-inner">
          <div class="product-hero-text">
            <a href="products.html" class="back-link">← All Products</a>
            <div class="product-meta-row">
              <span class="product-category-tag">${product.category}</span>
              ${product.badge ? `<span class="product-badge ${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
            </div>
            <h1>${R.esc(product.name)}</h1>
            <p class="product-tagline">${R.esc(product.tagline)}</p>
            <p class="product-long-desc">${R.esc(product.description)}</p>
            <div class="product-hero-meta">
              <span>v${product.version}</span>
              <span>Updated ${product.updated}</span>
              ${product.downloads !== '—' ? `<span>${product.downloads} downloads</span>` : ''}
              ${product.rating ? `<span>${R.stars(product.rating)} ${product.rating}</span>` : ''}
            </div>
            <div class="product-cta-row">
              <a href="#pricing" class="btn btn-primary btn-lg">View Pricing</a>
              <a href="#features" class="btn btn-secondary btn-lg">See Features</a>
            </div>
          </div>
          <div class="product-hero-image">
            <img src="${product.image}" alt="${R.esc(product.name)}">
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="product-features section-pad" id="features">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Features</div>
          <h2 class="section-title">Everything You Get</h2>
        </div>
        <div class="features-grid">
          ${product.features.map(f => `
            <div class="feature-item reveal">
              <div class="feature-check">✓</div>
              <span>${R.esc(f)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Screenshots -->
    ${product.screenshots?.length ? `
    <section class="product-screenshots section-pad">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Screenshots</div>
          <h2 class="section-title">See It In Action</h2>
        </div>
        <div class="screenshots-gallery">
          ${product.screenshots.map((s, i) => `
            <div class="screenshot reveal" style="animation-delay:${i * 0.1}s">
              <img src="${s}" alt="Screenshot ${i + 1}" loading="lazy"
                   onclick="openLightbox('${s}')">
            </div>
          `).join('')}
        </div>
      </div>
    </section>` : ''}

    <!-- Pricing -->
    <section class="product-pricing section-pad" id="pricing">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Pricing</div>
          <h2 class="section-title">Simple, Transparent Pricing</h2>
        </div>
        <div class="pricing-grid">
          ${product.tiers.map(tier => `
            <div class="pricing-card reveal ${tier.highlight ? 'highlighted' : ''}">
              ${tier.highlight ? '<div class="pricing-popular">Most Popular</div>' : ''}
              <h3>${R.esc(tier.name)}</h3>
              <div class="pricing-price">
                <span class="price-amount">${tier.price === 0 ? 'Free' : R.price(tier.price, product.currency)}</span>
                <span class="price-period">/${tier.period}</span>
              </div>
              <ul class="pricing-features">
                ${tier.features.map(f => `<li><span class="check">✓</span> ${R.esc(f)}</li>`).join('')}
              </ul>
              <button class="btn ${tier.highlight ? 'btn-primary' : 'btn-secondary'} btn-full"
                      onclick="handlePayment('${product.id}', ${tier.price}, '${tier.name}')">
                ${tier.price === 0 ? 'Get Started Free' : 'Buy ' + tier.name}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    ${product.faq?.length ? `
    <section class="product-faq section-pad">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">FAQ</div>
          <h2 class="section-title">Common Questions</h2>
        </div>
        <div class="faq-list">
          ${product.faq.map((item, i) => `
            <div class="faq-item reveal">
              <button class="faq-question" onclick="toggleFaq(${i})"
                      aria-expanded="false" aria-controls="faq-answer-${i}">
                <span>${R.esc(item.q)}</span>
                <span class="faq-arrow" aria-hidden="true">↓</span>
              </button>
              <div class="faq-answer" id="faq-answer-${i}">
                <div class="faq-answer-inner"><p>${R.esc(item.a)}</p></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>` : ''}

    <!-- Requirements -->
    <section class="product-requirements section-pad">
      <div class="container">
        <div class="req-box reveal">
          <div class="req-icon">⚙️</div>
          <div>
            <h3>Requirements</h3>
            <p>${R.esc(product.requirements)}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div id="lightbox" class="lightbox" onclick="closeLightbox()">
      <img id="lightbox-img" src="" alt="Screenshot">
    </div>
  `;

  observeReveal();
}

/* ── SaaS Section ─────────────────────────────────────────── */
function renderSaas() {
  const el = document.getElementById('saas-grid');
  if (!el) return;

  el.innerHTML = SAAS_TOOLS.map(t => `
    <div class="saas-card spot reveal" style="--accent:${t.color}">
      <div class="saas-icon">${t.icon}</div>
      <h3>${R.esc(t.name)}</h3>
      <p class="saas-tagline">${R.esc(t.tagline)}</p>
      <p>${R.esc(t.description)}</p>
      <ul class="saas-features">
        ${t.features.map(f => `<li><span class="check">✓</span>${R.esc(f)}</li>`).join('')}
      </ul>
      <div class="saas-price">
        <span class="price-amount">${t.currency}${t.price.toLocaleString('en-IN')}</span>
        <span class="price-period">/${t.period}</span>
        ${t.freeTrialDays ? `<div class="trial-note">${t.freeTrialDays}-day free trial</div>` : ''}
      </div>
      <a href="${t.ctaHref}" class="btn btn-primary btn-full saas-cta">${t.ctaLabel}</a>
    </div>
  `).join('');
}

/* ── Tech marquee ─────────────────────────────────────────── */
function renderTech() {
  const el = document.getElementById('tech-track');
  if (!el) return;
  const pills = TECH.map(([name, color]) =>
    `<span class="tech-pill"><i style="background:${color}"></i>${R.esc(name)}</span>`).join('');
  el.innerHTML = pills + pills; // doubled so the loop is seamless
}

/* ── SaaS we build ──────────────────────────────────────────── */
function renderBuild() {
  const el = document.getElementById('build-grid');
  if (!el) return;
  el.innerHTML = SAAS_WE_BUILD.map((b, i) => `
    <div class="build-card spot reveal" style="--d:${(i % 4) * 0.06}s">
      <span class="emoji">${b.emoji}</span>
      <h3>${R.esc(b.title)}</h3>
      <p>${R.esc(b.description)}</p>
      <span class="proof">${R.esc(b.proof)}</span>
    </div>`).join('');
}

/* ── Process ────────────────────────────────────────────────── */
function renderProcess() {
  const el = document.getElementById('process-steps');
  if (!el) return;
  el.innerHTML = PROCESS.map((s, i) => `
    <div class="step reveal" style="--d:${i * 0.08}s">
      <div class="step-num">0${i + 1}</div>
      <h3>${R.esc(s.title)}</h3>
      <p>${R.esc(s.description)}</p>
    </div>`).join('');
}

/* ── Home FAQ ───────────────────────────────────────────────── */
function renderHomeFaq() {
  const el = document.getElementById('home-faq');
  if (!el) return;
  el.innerHTML = HOME_FAQ.map((item, i) => `
    <div class="faq-item reveal">
      <button class="faq-question" onclick="toggleFaq(${i})" aria-expanded="false" aria-controls="faq-answer-${i}">
        <span>${R.esc(item.q)}</span><span class="faq-arrow" aria-hidden="true">↓</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}">
        <div class="faq-answer-inner"><p>${R.esc(item.a)}</p></div>
      </div>
    </div>`).join('');
}

/* ── Icons (inline SVG, stroke style) ───────────────────────── */
const ICONS = (() => {
  const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  return {
    web: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>'),
    mobile: svg('<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>'),
    cart: svg('<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 7H6"/>'),
    ai: svg('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>'),
    saas: svg('<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5z"/><path d="M12 12v6M9.5 14.5 12 12l2.5 2.5"/>'),
    bolt: svg('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
    data: svg('<ellipse cx="12" cy="5.5" rx="7.5" ry="2.5"/><path d="M4.5 5.5v6c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-6M4.5 11.5v6c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-6"/>'),
    chart: svg('<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-7"/>'),
    card: svg('<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h4"/>'),
    pen: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    game: svg('<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 13.5h.01"/>'),
    shield: svg('<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
  };
})();

/* ── Blog Cards ───────────────────────────────────────────── */
function renderBlog(limit = null) {
  const el = document.getElementById('blog-grid');
  if (!el) return;

  const posts = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;

  el.innerHTML = posts.map(p => `
    <article class="blog-card reveal">
      <a href="${p.href}" class="blog-image-link">
        <div class="blog-image">
          <img src="${p.image}" alt="${R.esc(p.title)}" loading="lazy">
        </div>
      </a>
      <div class="blog-body">
        <div class="blog-tags">
          ${p.tags.map(t => `<span class="tag">${R.esc(t)}</span>`).join('')}
        </div>
        <h3><a href="${p.href}">${R.esc(p.title)}</a></h3>
        <p>${R.esc(p.excerpt)}</p>
        <div class="blog-meta">
          <span>${p.date}</span>
          <span>·</span>
          <span>${p.readTime}</span>
        </div>
        <a href="${p.href}" class="read-more">Read article →</a>
      </div>
    </article>
  `).join('');

  observeReveal();
}

/* ── Scroll reveal ────────────────────────────────────────── */
function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

/* ── FAQ Toggle ───────────────────────────────────────────── */
function toggleFaq(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  if (!answer) return;
  const item = answer.closest('.faq-item');
  const willOpen = !answer.classList.contains('open');

  // Close all — the arrow direction is handled by CSS off .faq-item.open
  document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(q => q.setAttribute('aria-expanded', 'false'));

  if (willOpen) {
    answer.classList.add('open');
    item?.classList.add('open');
    item?.querySelector('.faq-question')?.setAttribute('aria-expanded', 'true');
  }
}

/* ── Lightbox ─────────────────────────────────────────────── */
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── WhatsApp Float ───────────────────────────────────────── */
function renderWhatsApp() {
  const el = document.getElementById('whatsapp-float');
  if (!el) return;
  el.innerHTML = `
    <button class="to-top-btn" id="toTopBtn" aria-label="Back to top" title="Back to top">↑</button>
    <a href="https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I'm%20interested%20in%20your%20services"
       target="_blank" rel="noopener" class="whatsapp-btn" aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="white"><path d="M16 0C7.164 0 0 7.164 0 16c0 2.832.736 5.488 2.02 7.796L0 32l8.416-1.984C10.656 31.144 13.248 31.8 16 31.8c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.2c-2.464 0-4.784-.652-6.796-1.808l-.484-.288-4.96 1.336 1.36-4.816-.324-.508C3.524 20.984 2.8 18.56 2.8 16 2.8 8.716 8.716 2.8 16 2.8S29.2 8.716 29.2 16 23.284 29.2 16 29.2zM23.26 19.52c-.36-.18-2.12-1.04-2.46-1.16-.34-.12-.58-.18-.82.18-.24.36-.92 1.16-1.12 1.4-.2.24-.4.26-.76.08-.36-.18-1.54-.556-2.92-1.776-1.1-.956-1.84-2.136-2.04-2.496-.2-.36-.02-.56.16-.74.16-.16.36-.42.54-.62.18-.2.24-.34.36-.58.12-.24.06-.44-.04-.62-.1-.18-.82-1.94-1.12-2.66-.3-.7-.6-.6-.82-.6h-.66c-.24 0-.6.1-.94.46-.34.36-1.26 1.22-1.26 2.98s1.3 3.46 1.48 3.7c.18.24 2.5 3.82 6.04 5.38.82.36 1.46.56 1.96.68.82.26 1.58.22 2.18.12.66-.12 2.1-.78 2.4-1.5.3-.72.3-1.34.2-1.5-.1-.16.02-.54-.34-.72z"/></svg>
    </a>
  `;
}
