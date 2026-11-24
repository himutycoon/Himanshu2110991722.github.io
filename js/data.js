/**
 * data.js — Codevera Solutions
 * ─────────────────────────────────────────────────────────────
 * Single source of truth. Edit this file to update ALL pages.
 * No HTML editing needed for content changes.
 * ─────────────────────────────────────────────────────────────
 */

// ─── SITE CONFIG ─────────────────────────────────────────────
const SITE = {
  name: 'Codevera',
  tagline: 'Solutions',
  email: 'codeverasolutions@gmail.com',
  phone: '+91 9680739559',
  whatsapp: '919680739559',
  location: 'Delhi, India',
  year: new Date().getFullYear(),
  founder: 'Himanshu Shekhar',
  razorpayKey: 'rzp_test_PLACEHOLDER', // Replace with live key
};

// ─── NAVIGATION ──────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Services', href: 'index.html',    anchor: '#services' },
  { label: 'Work',     href: 'index.html',    anchor: '#work' },
  { label: 'SaaS',     href: 'index.html',    anchor: '#saas' },
  { label: 'Process',  href: 'index.html',    anchor: '#process' },
  { label: 'Products', href: 'products.html', anchor: '' },
  { label: 'Contact',  href: 'index.html',    anchor: '#contact' },
];

// ─── SERVICES ────────────────────────────────────────────────
// icon = key in ICONS (render.js). wide = spans two bento columns.
const SERVICES = [
  {
    icon: 'web', wide: true,
    title: 'Web Apps & Websites',
    description: 'Fast, SEO-ready websites and full web applications, from a five-page business site to a multi-role platform with dashboards.',
    features: ['Next.js', 'React', 'Node.js', 'Supabase', 'Firebase'],
  },
  {
    icon: 'mobile',
    title: 'Android & iOS Apps',
    description: 'Cross-platform mobile apps with one codebase, push notifications and Play Store / App Store release.',
    features: ['React Native', 'Expo', 'Capacitor'],
  },
  {
    icon: 'cart',
    title: 'E-commerce Stores',
    description: 'Online stores with catalogues, carts, checkout, inventory and order management.',
    features: ['Stripe', 'Razorpay', 'PayPal'],
  },
  {
    icon: 'ai', wide: true,
    title: 'AI Chatbots & Assistants',
    description: 'Assistants trained on your products, prices and policies that answer customers 24/7, capture leads and hand off to WhatsApp.',
    features: ['OpenAI', 'Claude', 'RAG', 'Tool calling'],
  },
  {
    icon: 'saas',
    title: 'SaaS Product Development',
    description: 'From idea to a paid product: auth, roles, subscriptions, admin panel and analytics.',
    features: ['Multi-tenant', 'Billing', 'Admin'],
  },
  {
    icon: 'bolt',
    title: 'AI Automation',
    description: 'Automate the repetitive work: document processing, lead routing, reports, email and WhatsApp flows.',
    features: ['Workflows', 'APIs', 'Webhooks'],
  },
  {
    icon: 'data',
    title: 'Scraping & Data Pipelines',
    description: 'Collect, clean and deliver data from websites and open-data portals on a schedule, into sheets, databases or dashboards.',
    features: ['Python', 'Node.js', 'Excel / Sheets'],
  },
  {
    icon: 'chart',
    title: 'Dashboards & Internal Tools',
    description: 'Admin panels, CRMs and ops tools that replace spreadsheets and paper registers.',
    features: ['Role-based access', 'Reports', 'Exports'],
  },
  {
    icon: 'card',
    title: 'Payments & Subscriptions',
    description: 'One-time payments, recurring billing, invoices and webhooks, integrated properly and tested.',
    features: ['Stripe', 'Razorpay', 'PayPal'],
  },
  {
    icon: 'pen',
    title: 'UI/UX & Brand Sites',
    description: 'Interfaces that look premium and convert: design systems, landing pages and product UI.',
    features: ['Design systems', 'Motion', 'Accessibility'],
  },
  {
    icon: 'game',
    title: 'Games & Interactive',
    description: 'Browser games and interactive experiences, including real-time multiplayer.',
    features: ['Phaser', 'WebSockets'],
  },
  {
    icon: 'shield',
    title: 'Hosting & Maintenance',
    description: 'Deployment, monitoring, backups, updates and support after launch, on monthly plans.',
    features: ['Vercel', 'Hostinger', 'Firebase'],
  },
];

// ─── PROJECTS (real work) ────────────────────────────────────
// mock: 'browser' | 'phone' | 'data' | 'icon' (drawn in CSS, no screenshots needed)
const PROJECTS = [
  {
    id: 'careby',
    title: 'CareBy Supplies',
    client: 'Client project · Ontario, Canada',
    category: 'E-commerce',
    icon: '🏗️', color: '#f59e0b', mock: 'browser', year: 2026,
    description: 'Building-materials store with homeowner and trade pricing, material estimates and an AI sales assistant that knows the whole catalogue.',
    highlights: [
      'Catalogue of 3,400+ products with separate homeowner and contractor pricing',
      'AI assistant that answers from live prices, stock and SKUs, and captures quote requests',
      'Material lists from room photos, contractor packages and drawing takeoffs',
      'Card checkout, admin dashboard and an editable knowledge base for the bot',
    ],
    tags: ['Next.js', 'Supabase', 'Stripe', 'OpenAI'],
    link: 'https://carebysupplies.com', linkLabel: 'Visit live site', live: true,
    featured: true,
  },
  {
    id: 'kabootar',
    title: 'Kabootar',
    client: 'Own product',
    category: 'Marketplace',
    icon: '🕊️', color: '#38bdf8', mock: 'browser', year: 2025,
    description: 'Peer-to-peer intercity delivery: travellers with spare luggage space carry parcels for people who need them delivered.',
    highlights: [
      'Matches posted trips with parcel requests between cities',
      'Real-time chat between sender and traveller',
      'Web app plus an Android app',
    ],
    tags: ['React', 'Node.js', 'Socket.io', 'Firebase'],
    link: 'https://www.kabutar.in', linkLabel: 'Visit kabutar.in', live: true,
    featured: true,
  },
  {
    id: 'uninest',
    title: 'UniNest',
    client: 'Built for Chitkara University students',
    category: 'Mobile',
    icon: '🏠', color: '#a78bfa', mock: 'phone', year: 2025,
    description: 'Hostel and mess companion app for college students: today\'s menu, meal ratings, campus feed and short video stories.',
    highlights: [
      'Daily and weekly mess menu, meal ratings and live crowd levels',
      'Announcements, polls and a community feed',
      'Short-video campus stories',
      'Web admin dashboard for hostel staff',
    ],
    tags: ['React Native', 'Expo', 'Firebase', 'Cloud Functions'],
    link: 'https://www.unest.in', linkLabel: 'Visit unest.in', live: true,
    featured: true,
  },
  {
    id: 'digiregister',
    title: 'DigiRegister',
    client: 'For coaching institutes',
    category: 'SaaS',
    icon: '📒', color: '#34d399', mock: 'phone', year: 2025,
    description: 'Replaces a coaching teacher\'s paper attendance and fees register with a fast Android app.',
    highlights: ['Attendance in a few taps', 'Fee tracking per student', 'Cloud sync and sign-in'],
    tags: ['React', 'TypeScript', 'Capacitor', 'Firebase'],
  },
  {
    id: 'railnest',
    title: 'RailNest',
    client: 'Own product',
    category: 'Mobile',
    icon: '🚆', color: '#f472b6', mock: 'phone', year: 2025,
    description: 'Offline-first railway companion app for Indian train travellers, built to work on patchy networks.',
    highlights: ['Offline-first design', 'Android app from a web codebase'],
    tags: ['React', 'TypeScript', 'Capacitor', 'Tailwind'],
  },
  {
    id: 'lokaljobs',
    title: 'LokalJobs',
    client: 'Own product',
    category: 'Marketplace',
    icon: '🏪', color: '#fb923c', mock: 'browser', year: 2025,
    description: 'Hyperlocal job marketplace connecting small businesses with job seekers nearby.',
    highlights: ['Job seeker and business owner roles', 'OTP mobile login', 'Admin panel', 'Mobile-first, installable web app'],
    tags: ['React', 'Vite', 'Firebase', 'PWA'],
  },
  {
    id: 'qcommerce',
    title: 'Q-Commerce Intelligence',
    client: 'Data platform',
    category: 'Data & AI',
    icon: '📦', color: '#22d3ee', mock: 'data', year: 2026,
    description: 'Tracks product availability across quick-commerce apps so brands can see where they are out of stock.',
    highlights: ['Scheduled collection across platforms', 'Availability history in a database', 'Built as a monorepo of services'],
    tags: ['TypeScript', 'Node.js', 'Supabase', 'Scraping'],
  },
  {
    id: 'permits',
    title: 'Canada Permits Scraper',
    client: 'Lead-generation tool',
    category: 'Data & AI',
    icon: '🏛️', color: '#60a5fa', mock: 'data', year: 2026,
    description: 'Collects new building permits from Canadian city open-data portals into timestamped Excel reports.',
    highlights: ['Real data only: cities without an API are skipped, never faked', 'Last 30 / 60 / 90-day reports', 'Auto-timestamped files'],
    tags: ['Python', 'Open-data APIs', 'Excel'],
  },
  {
    id: 'carcare',
    title: 'Car Care Storefront',
    client: 'D2C brand',
    category: 'E-commerce',
    icon: '🚗', color: '#ef4444', mock: 'browser', year: 2026,
    description: 'Premium mobile-first storefront for a car-care brand, with free car-care tools and SEO landing pages.',
    highlights: ['Shop, product pages, cart and checkout', 'Free car-care tools to pull in traffic', 'Small dependency footprint for speed'],
    tags: ['React 19', 'TypeScript', 'Vite'],
  },
  {
    id: 'chaoskarts',
    title: 'Chaos Karts',
    client: 'Original game',
    category: 'Games',
    icon: '🏎️', color: '#facc15', mock: 'icon', year: 2026,
    description: 'Original browser multiplayer kart racing with combat. No install, play in the browser.',
    highlights: ['Real-time multiplayer in the browser', 'Kart racing combined with combat'],
    tags: ['Phaser 3', 'React', 'TypeScript', 'WebSockets'],
  },
  {
    id: 'bunkmate',
    title: 'BunkMate',
    client: 'Student utility',
    category: 'Utility',
    icon: '📊', color: '#4ade80', mock: 'icon', year: 2025,
    description: 'Attendance calculator that tells students how many classes they can still miss, and how many they need to attend.',
    highlights: ['Instant attendance maths per subject'],
    tags: ['React', 'Vite'],
  },
];

// ─── SAAS WE BUILD ───────────────────────────────────────────
const SAAS_WE_BUILD = [
  { emoji: '🤖', title: 'AI support desk', description: 'A chatbot trained on your business that answers, sells and escalates.', proof: 'Live on CareBy Supplies' },
  { emoji: '📒', title: 'Attendance & fees', description: 'For coaching centres, gyms, schools and academies.', proof: 'Like DigiRegister' },
  { emoji: '🛒', title: 'Marketplaces', description: 'Two-sided platforms with listings, matching, chat and payments.', proof: 'Like Kabootar & LokalJobs' },
  { emoji: '📅', title: 'Booking & appointments', description: 'Slots, reminders, payments and staff calendars.', proof: 'Clinics · salons · consultants' },
  { emoji: '👥', title: 'CRM & lead tracking', description: 'Capture leads from your site and WhatsApp, follow up, close.', proof: 'Sales teams · agencies' },
  { emoji: '📦', title: 'Inventory & ordering', description: 'Stock, purchase orders, suppliers and reorder alerts.', proof: 'Stores · distributors' },
  { emoji: '📈', title: 'Data & monitoring', description: 'Track prices, availability or public records automatically.', proof: 'Like Q-Commerce Intelligence' },
  { emoji: '🏠', title: 'Community & campus apps', description: 'Feeds, polls, announcements and stories for a closed community.', proof: 'Like UniNest' },
];

// ─── PROCESS ─────────────────────────────────────────────────
const PROCESS = [
  { title: 'Discover', description: 'A free call to understand the goal, users and budget. You get a written scope and quote.' },
  { title: 'Design', description: 'Screens and flows you can click through before any code is written.' },
  { title: 'Build', description: 'Weekly demos on a live link, so you see progress and steer early.' },
  { title: 'Launch', description: 'Deployment, domain, app-store release and payments switched on.' },
  { title: 'Grow', description: 'Monthly support, improvements and new features as you scale.' },
];

// ─── HOME FAQ ────────────────────────────────────────────────
const HOME_FAQ = [
  { q: 'How much does a project cost?', a: 'Business websites start around ₹25,000, web and mobile apps are usually ₹75,000 – ₹2,00,000+, and SaaS products are quoted after a scoping call. You get a fixed written quote before we start.' },
  { q: 'How long does it take?', a: 'A website takes 1–3 weeks. An MVP app or SaaS usually takes 4–10 weeks, depending on features. You see working progress every week.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We already build for clients in Canada, and work across time zones over WhatsApp, email and video calls. International payments are accepted.' },
  { q: 'What happens after launch?', a: 'We offer monthly plans for hosting, monitoring, updates and new features, so your product keeps running smoothly.' },
  { q: 'Can you add AI to my existing website or app?', a: 'Yes. We add AI assistants, smart search and automations to existing sites and apps without rebuilding them.' },
];

// ─── TECH STACK (marquee) ────────────────────────────────────
const TECH = [
  ['Next.js', '#ffffff'], ['React', '#61dafb'], ['React Native', '#61dafb'], ['TypeScript', '#3178c6'],
  ['Node.js', '#68a063'], ['Supabase', '#3ecf8e'], ['Firebase', '#ffca28'], ['Python', '#ffd43b'],
  ['OpenAI', '#10a37f'], ['Claude', '#d97757'], ['Stripe', '#635bff'], ['Razorpay', '#3395ff'],
  ['PayPal', '#009cde'], ['Tailwind CSS', '#38bdf8'], ['Capacitor', '#53b9ff'], ['Phaser', '#8b5cf6'],
  ['Socket.io', '#ffffff'], ['PostgreSQL', '#336791'],
];

// ─── PRODUCTS ─────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'lf-catalogue',
    slug: 'lf-catalogue',
    name: 'LocalFind Multi-Vendor Catalogue',
    category: 'Plugin',
    badge: 'New',
    tagline: 'Map unlimited vendors to any WooCommerce product',
    description: 'A powerful WordPress plugin that lets admins create master product catalogues and map them to unlimited Dokan vendors. LocalFind displays every mapped vendor on an interactive map.',
    price: 99,
    originalPrice: null,
    currency: '₹',
    currencyCode: 'INR',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    ],
    features: [
      'Master product catalogue dashboard',
      'Unlimited vendor mapping per product',
      'CSV / Excel bulk import',
      'Auto-geocoding via LocalFind',
      'LocalFind REST API bridge (priority override)',
      'Admin-friendly product creation wizard',
      'WooCommerce & Dokan compatible',
      'PHP 7.4+ / WordPress 6.0+',
    ],
    tiers: [
      { name: 'Single Site', price: 99, period: 'one-time', features: ['1 WordPress installation', '1 year support & updates', 'Email support'] },
      { name: 'Developer', price: 249, period: 'one-time', features: ['Up to 5 sites', '1 year support & updates', 'Priority support', 'Source code access'], highlight: true },
      { name: 'Agency', price: 499, period: 'one-time', features: ['Unlimited sites', 'Lifetime updates', 'Dedicated support', 'White-label ready'] },
    ],
    faq: [
      { q: 'Does this require Dokan?', a: 'Yes — Dokan Free or Pro must be installed for vendor features. The plugin falls back gracefully if Dokan is absent.' },
      { q: 'Is LocalFind plugin required?', a: 'LocalFind is recommended for full map functionality. The plugin includes a REST bridge that works with or without it.' },
      { q: 'Can I import products from CSV?', a: 'Yes. The plugin supports CSV and Excel import for bulk product creation with vendor mapping.' },
      { q: 'What support is included?', a: 'All licences include 12 months of email support and updates. Developer and Agency tiers get priority response.' },
    ],
    requirements: 'WordPress 6.0+, PHP 7.4+, WooCommerce 7.0+',
    version: '1.0.0',
    updated: 'March 2025',
    downloads: '—',
    rating: 5,
  },
  {
    id: 'invoice-gen',
    slug: 'invoice-gen',
    name: 'Smart Invoice Generator',
    category: 'Tools',
    badge: 'Popular',
    tagline: 'Generate GST-ready invoices in seconds',
    description: 'A standalone web tool to create, customise, and download professional GST invoices. No login required. Works entirely in the browser.',
    price: 49,
    originalPrice: 79,
    currency: '₹',
    currencyCode: 'INR',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    ],
    features: [
      'GST-compliant invoice format',
      'Custom logo & branding',
      'PDF download (no server)',
      'Client database (local storage)',
      'Auto tax calculations',
      'Recurring invoice templates',
      'Multiple currency support',
      'Zero backend — fully client-side',
    ],
    tiers: [
      { name: 'Personal', price: 49, period: 'one-time', features: ['Single user', 'PDF export', 'Email support'] },
      { name: 'Business', price: 149, period: 'one-time', features: ['Team of 5', 'White-label', 'Custom domain embed', 'Priority support'], highlight: true },
    ],
    faq: [
      { q: 'Is my data safe?', a: 'All data stays in your browser. Nothing is sent to any server.' },
      { q: 'Does it work offline?', a: 'Yes. Once loaded, the tool works fully offline.' },
    ],
    requirements: 'Modern browser (Chrome, Firefox, Edge, Safari)',
    version: '2.1.0',
    updated: 'February 2025',
    downloads: '340+',
    rating: 4.8,
  },
  {
    id: 'leadsync',
    slug: 'leadsync',
    name: 'LeadSync CRM Widget',
    category: 'SaaS',
    badge: 'Beta',
    tagline: 'Capture & track leads from any website',
    description: 'Embeddable CRM widget that captures leads from your website, scores them automatically, and syncs with WhatsApp, Email, and Google Sheets.',
    price: 0,
    originalPrice: null,
    currency: '₹',
    currencyCode: 'INR',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    ],
    features: [
      'Embeddable contact widget',
      'Automatic lead scoring',
      'WhatsApp + Email notifications',
      'Google Sheets sync',
      'Budget & intent capture',
      'Simple analytics dashboard',
      'No-code setup (1 script tag)',
    ],
    tiers: [
      { name: 'Starter', price: 0, period: 'month', features: ['50 leads/month', 'Email notifications', 'Basic analytics'] },
      { name: 'Growth', price: 499, period: 'month', features: ['Unlimited leads', 'WhatsApp + Email', 'Google Sheets sync', 'Lead scoring'], highlight: true },
      { name: 'Agency', price: 1499, period: 'month', features: ['Multi-client', 'Custom branding', 'API access', 'Dedicated support'] },
    ],
    faq: [
      { q: 'Is there a free plan?', a: 'Yes — the Starter plan is free forever with 50 leads/month.' },
      { q: 'How do I install it?', a: 'Copy one script tag into your HTML. Takes under 2 minutes.' },
    ],
    requirements: 'Any website. Add 1 script tag.',
    version: '0.9.0 (Beta)',
    updated: 'March 2025',
    downloads: '—',
    rating: null,
  },
];

// ─── SAAS TOOLS ───────────────────────────────────────────────
const SAAS_TOOLS = [
  {
    icon: '🤖',
    name: 'AI Chat Assistant',
    tagline: 'An AI sales assistant for your website',
    description: 'A 24/7 chat assistant trained on your products, SKUs, prices and policies. Answers customers instantly, captures quote requests and hands off to WhatsApp. Installed and maintained by us.',
    price: 3999,
    currency: '₹',
    period: 'month',
    freeTrialDays: 0,
    ctaLabel: 'Get It for Your Site',
    ctaHref: '#contact',
    features: ['Knows your catalogue: live prices & stock', 'Editable knowledge base & rules', 'Quote capture with email alerts', 'WhatsApp hand-off', 'Setup, hosting & AI usage included'],
    color: '#f59e0b',
  },
  {
    icon: '📋',
    name: 'LeadSync',
    tagline: 'Capture leads from any website',
    description: 'Drop-in lead capture widget with automatic scoring, WhatsApp alerts, and Google Sheets sync. Zero-backend, no-code setup.',
    price: 499,
    currency: '₹',
    period: 'month',
    freeTrialDays: 14,
    ctaLabel: 'Start Free Trial',
    ctaHref: '#contact',
    features: ['Embeddable widget', 'Lead scoring AI', 'WhatsApp + Email alerts', 'Google Sheets sync', 'Analytics dashboard'],
    color: '#4f46e5',
  },
  {
    icon: '🗺️',
    name: 'VendorMap',
    tagline: 'Show your vendors on a live map',
    description: 'Hosted map widget for multi-vendor marketplaces. Integrates with WooCommerce, Dokan, and any REST API in under 10 minutes.',
    price: 799,
    currency: '₹',
    period: 'month',
    freeTrialDays: 14,
    ctaLabel: 'Start Free Trial',
    ctaHref: '#contact',
    features: ['Embeddable map widget', 'Real-time vendor pins', 'Product-level filtering', 'Mobile responsive', 'White-label ready'],
    color: '#0ea5e9',
  },
  {
    icon: '🧾',
    name: 'InvoicePro',
    tagline: 'GST invoices in your browser',
    description: 'Create, customise, and download professional GST invoices instantly. No server, no signup — works entirely client-side.',
    price: 299,
    currency: '₹',
    period: 'month',
    freeTrialDays: 30,
    ctaLabel: 'Try Free for 30 Days',
    ctaHref: '#contact',
    features: ['GST-compliant templates', 'PDF export', 'Client database', 'Multi-currency', 'Team sharing'],
    color: '#10b981',
  },
];

// ─── BLOG POSTS ───────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 'dokan-multi-vendor',
    title: 'Building a Multi-Vendor Marketplace with Dokan & WooCommerce',
    excerpt: 'A complete guide to setting up a production-ready multi-vendor marketplace with Dokan, including vendor onboarding, commission management, and map integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tags: ['WordPress', 'Dokan', 'WooCommerce'],
    date: 'March 15, 2025',
    readTime: '8 min read',
    author: 'Himanshu Shekhar',
    href: '#',
  },
  {
    id: 'razorpay-integration',
    title: 'Integrating Razorpay in WordPress Without a Plugin',
    excerpt: 'Step-by-step tutorial on adding Razorpay payment gateway directly via custom PHP and JavaScript — no bloated plugins required.',
    image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&q=80',
    tags: ['Razorpay', 'PHP', 'Payments'],
    date: 'February 28, 2025',
    readTime: '6 min read',
    author: 'Himanshu Shekhar',
    href: '#',
  },
  {
    id: 'react-saas',
    title: 'From Freelance to SaaS: Productising Your Service Skills',
    excerpt: "How we turned a custom CRM project into a reusable SaaS product — the mindset shift, tech decisions, and pricing strategy that made it work.",
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['SaaS', 'Business', 'Strategy'],
    date: 'February 10, 2025',
    readTime: '5 min read',
    author: 'Himanshu Shekhar',
    href: '#',
  },
  {
    id: 'gpt-wordpress',
    title: 'Adding GPT-4 to WordPress: A Practical Guide',
    excerpt: 'Integrate OpenAI directly into WordPress themes and plugins. Covers streaming responses, rate limiting, and keeping API keys secure.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    tags: ['AI', 'GPT-4', 'WordPress'],
    date: 'January 20, 2025',
    readTime: '10 min read',
    author: 'Himanshu Shekhar',
    href: '#',
  },
  {
    id: 'cicd-wordpress',
    title: 'CI/CD for WordPress with GitHub Actions',
    excerpt: 'Automate plugin testing, deployment, and versioning using GitHub Actions. A practical workflow for solo developers and small teams.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    tags: ['DevOps', 'GitHub', 'WordPress'],
    date: 'January 5, 2025',
    readTime: '7 min read',
    author: 'Himanshu Shekhar',
    href: '#',
  },
  {
    id: 'freelance-pricing',
    title: 'How to Price Your Freelance Projects in India (2025)',
    excerpt: 'A data-driven approach to pricing web development projects in India. Includes rate benchmarks, proposal templates, and negotiation tactics.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    tags: ['Freelance', 'Business', 'Pricing'],
    date: 'December 18, 2024',
    readTime: '6 min read',
    author: 'Himanshu Shekhar',
    href: '#',
  },
];

// ─── STATS (counted from the real work above) ───────────────
const STATS = [
  { number: PROJECTS.length + '+', label: 'Products shipped' },
  { number: new Set(PROJECTS.map(p => p.category)).size + '', label: 'Industries & domains' },
  { number: '24h', label: 'Reply time' },
  { number: '1:1', label: 'Founder-led delivery' },
];
