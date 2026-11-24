import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { CHOICE_PRODUCTS } from "./data/products.js";

const assetUrl = (path) => (path?.startsWith("/") ? path : `/${path}`);
const startingPrice = (product) => product?.variants?.[0]?.price ?? product?.price ?? null;
const OWNER_PHONE_DISPLAY = "+880 1716 663980";
const OWNER_PHONE_LINK = "+8801716663980";
const OWNER_WHATSAPP = "8801716663980";
const OWNER_EMAIL = "na.raju80@gmail.com";
const STORE_PHONE_DISPLAY = "+880 122544663";
const STORE_PHONE_LINK = "+880122544663";
const STORE_WHATSAPP = "880122544663";
const STORE_EMAIL = "choicetel890@gmail.com";
const STORE_MAP_URL = "https://www.google.com/maps/search/?api=1&query=C39G%2BMC8%20Choice%20Telecom%2C%20Bhaduria%20Daudpur%20Road%2C%20Nawabganj";
const formatMoney = (amount) => new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
}).format(amount);

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Choice Telecom home">
      <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
      <span className="brand-copy"><strong>choice</strong><small>TELECOM</small></span>
    </Link>
  );
}

function Layout({ children, language, setLanguage, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(() => new URLSearchParams(location.search).get("search") || "");
  const isBangla = language === "bn";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setSearchQuery(new URLSearchParams(location.search).get("search") || "");
  }, [location.search]);

  useEffect(() => {
    if (!location.hash) return;
    document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="announcement">
        <span className="announcement-dot" aria-hidden="true" />
        <span>{isBangla ? "আপনার পরের ফোনটি খুঁজে পাবেন আরও সহজে" : "A better way to find your next phone"}</span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-label">Menu</span>
            <span className="menu-lines" aria-hidden="true" />
          </button>
          <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} id="primary-nav" aria-label="Main navigation">
            <NavLink className="nav-link" to="/" end>{isBangla ? "হোম" : "Home"}</NavLink>
            <NavLink className="nav-link" to="/products">{isBangla ? "ফোন" : "Phones"}</NavLink>
            <NavLink className="nav-link" to="/offers">{isBangla ? "অফার ও ইএমআই" : "Offers & EMI"}</NavLink>
            <NavLink className="nav-link" to="/about">{isBangla ? "আমাদের কথা" : "About"}</NavLink>
            <NavLink className="nav-link" to="/contact">{isBangla ? "যোগাযোগ" : "Contact"}</NavLink>
            <button
              className="language-toggle"
              type="button"
              aria-pressed={isBangla}
              aria-label={isBangla ? "Switch to English" : "Switch to Bangla"}
              onClick={() => setLanguage(isBangla ? "en" : "bn")}
            >
              <span className="language-label">{isBangla ? "EN" : "বাং"}</span>
            </button>
            <button
              className="theme-toggle"
              type="button"
              aria-pressed={theme === "dark"}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span className="theme-icon" aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
              <span className="theme-label">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </nav>
        </div>
        <div className="header-search-row">
          <div className="container">
            <form
              className="global-search"
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                const search = searchQuery.trim();
                navigate(`/products${search ? `?search=${encodeURIComponent(search)}` : ""}`);
              }}
            >
              <span aria-hidden="true">⌕</span>
              <label className="visually-hidden" htmlFor="global-phone-search">Search all phones</label>
              <input
                id="global-phone-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search all phones by brand, model or feature"
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <Link className="emi-support" to="/offers#emi-calculator">
        <span aria-hidden="true">৳</span>
        <span>EMI options</span>
      </Link>
      <a
        className="whatsapp-support"
        href={`https://wa.me/${OWNER_WHATSAPP}?text=Hello%20Choice%20Telecom%2C%20I%20need%20help.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Choice Telecom on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3C8.82 3 3 8.66 3 15.64c0 2.68.86 5.16 2.33 7.18L3.9 28l5.38-1.38A13.28 13.28 0 0 0 16 28.28c7.18 0 13-5.66 13-12.64S23.18 3 16 3zm7.48 18.01c-.32.9-1.86 1.72-2.57 1.83-.66.11-1.5.16-2.42-.15-.56-.19-1.28-.42-2.2-.82-3.87-1.67-6.39-5.58-6.58-5.84-.19-.26-1.57-2.09-1.57-3.98 0-1.89.99-2.82 1.34-3.2.35-.38.77-.48 1.02-.48h.74c.24.01.56-.09.88.67.32.77 1.09 2.66 1.18 2.85.1.19.16.42.03.67-.13.26-.19.42-.38.64-.19.23-.4.51-.57.68-.19.19-.39.39-.17.77.22.38.98 1.62 2.11 2.62 1.45 1.29 2.67 1.69 3.05 1.88.38.19.61.16.84-.1.22-.26.96-1.12 1.22-1.5.26-.38.51-.32.86-.19.35.13 2.22 1.05 2.6 1.24.38.19.64.29.74.45.1.16.1.93-.22 1.83z" />
        </svg>
        <span>Chat with us</span>
      </a>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Your Trusted Mobile Partner<br />Nawabganj, Dinajpur, Bangladesh</p>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          <Link to="/products">Phones</Link>
          <Link to="/offers">Offers & EMI</Link>
          <Link to="/about">About us</Link>
        </div>
        <div className="footer-column">
          <h2>Help</h2>
          <Link to="/contact">Contact & location</Link>
          <Link to="/contact#business-details">Business details</Link>
        </div>
        <div className="footer-note">
          <span className="footer-note-icon" aria-hidden="true">✳</span>
          <p>We only publish product and offer details after they’re confirmed.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Choice Telecom</span>
        <span>Made for local connections.</span>
      </div>
    </footer>
  );
}

function ProductCard({ product, showPrice = true }) {
  return (
    <article className="product-card">
      <Link className="product-image" to={`/products/${product.id}`}>
        {product.image
          ? <img src={assetUrl(product.image)} alt={`${product.brand} ${product.name}`} loading="lazy" />
          : <span className="product-placeholder" aria-hidden="true">✳</span>}
      </Link>
      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
        {showPrice && <p className="product-price">{Number.isFinite(product.price) ? formatMoney(product.price) : "Contact for price"}</p>}
        <Link className="text-link" to={`/products/${product.id}`}>View details <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}

function Home() {
  const featured = CHOICE_PRODUCTS.filter((product) => product.featured).slice(0, 4);
  const campaigns = [
    {
      id: "exchange",
      eyebrow: "DEMO OFFER · ASK IN STORE",
      title: "Trade in your old phone.",
      description: "Explore an exchange toward your next device. Final value depends on an in-store inspection.",
      action: "Explore exchange",
      href: "/offers#exchange",
      theme: "exchange",
      art: "↻",
    },
    {
      id: "emi",
      eyebrow: "DEMO OFFER · TERMS TO CONFIRM",
      title: "EMI without a credit card.",
      description: "Ask about a sample 6-month plan with 20% down. Eligibility and availability must be confirmed.",
      action: "View EMI options",
      href: "/offers#emi-calculator",
      theme: "emi",
      art: "6",
    },
    {
      id: "flexible",
      eyebrow: "CHOICE TELECOM · DEMO",
      title: "A better way to choose.",
      description: "Compare phones, ask questions and find a payment option that works for you.",
      action: "Browse phones",
      href: "/products",
      theme: "flexible",
      art: "✳",
    },
  ];
  const campaignTrackRef = useRef(null);
  const campaignViewportRef = useRef(null);
  const [activeCampaign, setActiveCampaign] = useState(0);

  useEffect(() => {
    let frameId;
    const updateActiveCampaign = () => {
      const animation = campaignTrackRef.current?.getAnimations()[0];
      const duration = animation?.effect?.getTiming().duration;
      const currentTime = animation?.currentTime;
      if (typeof duration === "number" && duration > 0 && typeof currentTime === "number") {
        const progress = ((currentTime % duration) + duration) % duration;
        const index = Math.floor(progress / (duration / campaigns.length));
        setActiveCampaign((current) => current === index ? current : index);
      }
      frameId = requestAnimationFrame(updateActiveCampaign);
    };

    frameId = requestAnimationFrame(updateActiveCampaign);
    return () => cancelAnimationFrame(frameId);
  }, [campaigns.length]);

  const selectCampaign = (index) => {
    const track = campaignTrackRef.current;
    const animation = track?.getAnimations()[0];
    const duration = animation?.effect?.getTiming().duration;
    if (animation && typeof duration === "number") {
      animation.currentTime = index * duration / campaigns.length;
    } else if (track) {
      const card = track?.children[index];
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const width = card?.getBoundingClientRect().width || 0;
      campaignViewportRef.current?.scrollTo({ left: index * (width + gap), behavior: "smooth" });
    }
    setActiveCampaign(index);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> YOUR LOCAL MOBILE PARTNER</p>
            <h1>Find the phone that feels right.</h1>
            <p className="hero-description">Explore your options, get clear answers, and choose your next smartphone with confidence.</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/products">Explore phones <span aria-hidden="true">↗</span></Link>
              <Link className="button button-secondary" to="/contact">Visit our store</Link>
            </div>
            <p className="hero-footnote"><span className="small-check" aria-hidden="true">✓</span> Helpful, straightforward service in Nawabganj</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-glow" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="phone phone-back"><div className="phone-camera" /><div className="phone-camera" /><div className="phone-camera" /></div>
            <div className="phone phone-front"><div className="phone-notch" /><div className="phone-screen">
              <span className="screen-kicker">MAKE IT YOURS</span><span className="screen-shape" /><span className="screen-line" /><span className="screen-line short" />
            </div></div>
            <div className="art-caption"><span className="caption-icon">✳</span><span><strong>Your next favorite</strong><small>starts with a conversation</small></span></div>
            <span className="art-spark spark-one">✳</span><span className="art-spark spark-two">+</span>
          </div>
        </div>
      </section>
      <section className="trust-strip" aria-label="What to expect">
        <div className="container trust-grid">
          <div className="trust-item"><span className="trust-icon">⌕</span><span><strong>Find your fit</strong><small>Explore phones at your pace</small></span></div>
          <div className="trust-item"><span className="trust-icon">◎</span><span><strong>Get clear answers</strong><small>Ask about details that matter</small></span></div>
          <div className="trust-item"><span className="trust-icon">⌖</span><span><strong>Shop local</strong><small>Visit us in Nawabganj</small></span></div>
        </div>
      </section>
      <section className="campaign-section" aria-labelledby="campaign-heading">
        <div className="container section-heading campaign-heading">
          <div><p className="eyebrow">OFFERS TO EXPLORE</p><h2 id="campaign-heading">Find your next deal.</h2></div>
          <span className="campaign-demo-note">Sample posters · confirm all terms in store</span>
        </div>
        <div className="campaign-viewport" ref={campaignViewportRef}>
          <div className="campaign-track" ref={campaignTrackRef}>
            {[...campaigns, ...campaigns].map((campaign, index) => (
              <article
                key={`${campaign.id}-${index}`}
                className={`campaign-card campaign-${campaign.theme}`}
                aria-hidden={index >= campaigns.length ? "true" : undefined}
              >
                <div className="campaign-copy">
                  <p className="campaign-eyebrow">{campaign.eyebrow}</p>
                  <h3>{campaign.title}</h3>
                  <p className="campaign-description">{campaign.description}</p>
                  <Link className="campaign-action" to={campaign.href} tabIndex={index >= campaigns.length ? -1 : undefined}>
                    {campaign.action}<span aria-hidden="true">→</span>
                  </Link>
                </div>
                <span className="campaign-art" aria-hidden="true">{campaign.art}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="campaign-pagination" role="group" aria-label="Choose an offer poster">
          {campaigns.map((campaign, index) => (
            <button
              key={campaign.id}
              className="campaign-dot"
              type="button"
              aria-label={`Show poster ${index + 1}: ${campaign.title}`}
              aria-pressed={activeCampaign === index}
              onClick={() => selectCampaign(index)}
            />
          ))}
        </div>
      </section>
      <section className="section section-products">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">THE RIGHT PHONE, YOUR WAY</p><h2>Explore the catalog</h2></div>
            <Link className="text-link" to="/products">View all phones <span aria-hidden="true">→</span></Link>
          </div>
          <div className="catalog-results">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>
      <section className="section section-offers">
        <div className="container promo-panel">
          <div className="promo-copy">
            <p className="eyebrow">GOOD TO KNOW</p>
            <h2>Questions about EMI or exchange?</h2>
            <p>Terms can vary by phone and eligibility. Ask our team for current, confirmed details before making a decision.</p>
            <Link className="button button-light" to="/offers">Learn about your options <span aria-hidden="true">→</span></Link>
          </div>
          <div className="promo-art" aria-hidden="true"><div className="promo-circle circle-large" /><div className="promo-circle circle-small" /><div className="promo-card"><span className="promo-card-mark">C</span><span className="promo-card-lines" /><span className="promo-card-lines short" /><span className="promo-card-check">✓</span></div><span className="promo-star">✳</span></div>
        </div>
      </section>
    </>
  );
}

function Products() {
  const location = useLocation();
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get("search") || "");
  const [sort, setSort] = useState("featured");
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");
  const brands = useMemo(
    () => [...new Set(CHOICE_PRODUCTS.map((product) => product.brand))].sort((a, b) => a.localeCompare(b)),
    [],
  );
  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("search") || "");
  }, [location.search]);

  const visible = useMemo(() => {
    const filtered = CHOICE_PRODUCTS.filter((product) => {
      const searchableText = `${product.brand} ${product.name} ${product.description} ${Object.values(product.specifications || {}).join(" ")} ${(product.variants || []).map((variant) => `${variant.ram}GB ${variant.storage}GB`).join(" ")}`;
      const network = (product.specifications?.Network || "").toLowerCase();
      const networkCategory = network.includes("5g") ? "5g" : network.includes("4g") ? "4g" : "to be confirmed";
      return searchableText.toLowerCase().includes(query.toLowerCase())
        && (brand === "all" || product.brand === brand)
        && (category === "all" || networkCategory === category);
    });
    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return (startingPrice(a) ?? Infinity) - (startingPrice(b) ?? Infinity);
      if (sort === "price-high") return (startingPrice(b) ?? -Infinity) - (startingPrice(a) ?? -Infinity);
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [query, sort, brand, category]);

  return (
    <>
      <section className="page-hero"><div className="container">
        <p className="eyebrow">CHOICE TELECOM CATALOG</p><h1>Find your next favorite phone.</h1>
        <p>Compare confirmed models and ask us about the details that matter to you.</p>
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span aria-current="page">Phones</span></div>
      </div></section>
      <section className="section catalog-section"><div className="container">
        <div className="catalog-toolbar">
          <label className="search-field"><span aria-hidden="true">⌕</span><span className="visually-hidden">Search phones</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by brand or model" />
            <span className="search-shortcut">Search</span>
          </label>
          <div className="catalog-filters">
            <label className="filter-control"><span>Brand</span>
              <select value={brand} onChange={(event) => setBrand(event.target.value)}>
                <option value="all">All brands</option>
                {brands.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </label>
            <label className="filter-control"><span>Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="all">All phones</option>
                <option value="5g">5G phones</option>
                <option value="4g">4G phones</option>
                <option value="to be confirmed">Network to be confirmed</option>
              </select>
            </label>
            <label className="sort-control"><span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option><option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>
        </div>
        <div className="catalog-results" aria-live="polite">
          {visible.length
            ? visible.map((product) => <ProductCard key={product.id} product={product} showPrice={false} />)
            : <div className="empty-catalog"><span className="empty-icon">⌕</span><p className="eyebrow">NO MATCHES</p><h2>No phones match that search.</h2><p>Try a different brand or model name.</p></div>}
        </div>
      </div></section>
    </>
  );
}

const emiMatrix = {
  20: [25, 30, 33, 35, 40, 43, 45, 48],
  30: [22, 25, 28, 30, 35, 38, 40, 45],
  40: [18, 20, 23, 25, 30, 35, 40, 45],
  50: [13, 15, 18, 20, 25, 27, 32, 35],
  60: [10, 13, 15, 17, 20, 23, 25, 30],
};

function EmiCalculator({ initialPrice = 0, standalone = false }) {
  const [selectedPrice, setSelectedPrice] = useState(initialPrice || 0);
  const [selectedModelId, setSelectedModelId] = useState("custom");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [down, setDown] = useState(0);
  const [months, setMonths] = useState(6);
  const emiProducts = useMemo(
    () => CHOICE_PRODUCTS.filter((product) => product.variants?.some((variant) => Number.isFinite(variant.price))),
    [],
  );
  const selectedModel = emiProducts.find((product) => product.id === selectedModelId);
  const availableVariants = selectedModel?.variants.filter((variant) => Number.isFinite(variant.price)) || [];
  useEffect(() => {
    if (!standalone) {
      setSelectedPrice(initialPrice || 0);
    }
  }, [initialPrice, standalone]);
  const mobilePrice = selectedPrice > 0
    ? selectedPrice
    : (Number(customPrice) > 0 ? Number(customPrice) : 0);
  const downAmount = mobilePrice * down / 100;
  const remaining = mobilePrice - downAmount;
  const profitRate = down > 0 ? emiMatrix[down][months - 2] || 0 : 0;
  const profit = remaining * profitRate / 100;
  const total = remaining + profit;
  const monthly = months > 0 ? total / months : 0;

  return (
    <section id={standalone ? "emi-calculator" : undefined} className={`emi-calculator${standalone ? " emi-calculator-page" : ""}`}>
      <div className="emi-heading"><div><p className="eyebrow">EMI CALCULATOR</p><h2>{standalone ? "Calculate your monthly payment" : "Plan your payment"}</h2></div><span className="emi-badge">{down}% down payment</span></div>
      <div className="emi-grid">
        <div className="emi-controls">
          {standalone && <>
            <label htmlFor="emi-phone">Select phone model</label>
            <select id="emi-phone" value={selectedModelId} onChange={(event) => {
              const product = emiProducts.find((item) => item.id === event.target.value);
              const firstVariant = product?.variants.find((variant) => Number.isFinite(variant.price));
              setSelectedModelId(event.target.value);
              setSelectedVariantId(firstVariant?.id || "");
              setSelectedPrice(firstVariant?.price || 0);
              setCustomPrice("");
            }}>
              <option value="custom">Custom price</option>
              {emiProducts.map((product) => (
                <option key={product.id} value={product.id}>{product.brand} {product.name}</option>
              ))}
            </select>
            {selectedModel && <div className="emi-variant-field">
              <label htmlFor="emi-phone-variant">Choose RAM and ROM</label>
              <select id="emi-phone-variant" value={selectedVariantId} onChange={(event) => {
                const variant = availableVariants.find((item) => item.id === event.target.value);
                setSelectedVariantId(event.target.value);
                setSelectedPrice(variant?.price || 0);
              }}>
                {availableVariants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.ram}GB RAM / {variant.storage}GB ROM — {formatMoney(variant.price)}
                  </option>
                ))}
              </select>
            </div>}
            {selectedModelId === "custom" && <>
              <label htmlFor="emi-custom-price">Custom price (BDT)</label>
              <input id="emi-custom-price" type="number" min="0" value={customPrice} onChange={(event) => { setCustomPrice(event.target.value); setSelectedPrice(0); }} placeholder="Enter phone price" />
            </>}
          </>}
          <label htmlFor="emi-down-payment">Down payment</label>
          <select id="emi-down-payment" value={down} onChange={(event) => setDown(Number(event.target.value))}>{[0, 20, 30, 40, 50, 60].map((value) => <option key={value} value={value}>{value}%</option>)}</select>
          <label htmlFor="emi-months">EMI duration</label>
          <select id="emi-months" value={months} onChange={(event) => setMonths(Number(event.target.value))}>{[2, 3, 4, 5, 6, 7, 8, 9].map((value) => <option key={value} value={value}>{value} months</option>)}</select>
          <p className="emi-note">Profit is calculated from the Choice Telecom EMI table.</p>
        </div>
        <div className="emi-summary" aria-live="polite">
          <div><span>Mobile price</span><strong>{formatMoney(mobilePrice)}</strong></div>
          <div><span>Down payment</span><strong>{formatMoney(downAmount)}</strong></div>
          <div><span>Remaining amount</span><strong>{formatMoney(remaining)}</strong></div>
          <div><span>Profit rate</span><strong>{profitRate}%</strong></div>
          <div><span>Total profit</span><strong>{formatMoney(profit)}</strong></div>
          <div><span>Total EMI amount</span><strong>{formatMoney(total)}</strong></div>
          <div className="emi-monthly"><span>Monthly installment</span><strong>{formatMoney(monthly)}</strong></div>
          <div><span>Total phone price</span><strong>{formatMoney(mobilePrice + profit)}</strong></div>
        </div>
      </div>
    </section>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const product = CHOICE_PRODUCTS.find((item) => item.id === id);
  const [activeImage, setActiveImage] = useState(product?.images?.[0] || product?.image);
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants?.[0]?.id || "");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewCloseRef = useRef(null);
  const previewTriggerRef = useRef(null);

  useEffect(() => {
    setActiveImage(product?.images?.[0] || product?.image);
    setSelectedVariantId(product?.variants?.[0]?.id || "");
    setPreviewOpen(false);
  }, [product]);

  const images = useMemo(
    () => product?.images?.length ? product.images : (product?.image ? [product.image] : []),
    [product]
  );
  const colorOptions = useMemo(
    () => product?.colorOptions?.length
      ? product.colorOptions
      : images.map((image, index) => ({ name: `View ${index + 1}`, image })),
    [product, images]
  );
  const selectedVariant = product?.variants?.find((variant) => variant.id === selectedVariantId)
    || product?.variants?.[0];
  const selectedPrice = selectedVariant?.price ?? product?.price;
  const currentColorIndex = Math.max(0, colorOptions.findIndex((color) => color.image === activeImage));

  const closePreview = () => {
    setPreviewOpen(false);
    previewTriggerRef.current?.focus();
  };
  const changePreview = (direction) => {
    if (!colorOptions.length) return;
    const nextIndex = (previewIndex + direction + colorOptions.length) % colorOptions.length;
    setPreviewIndex(nextIndex);
    setActiveImage(colorOptions[nextIndex].image);
  };

  useEffect(() => {
    if (previewOpen) previewCloseRef.current?.focus();
  }, [previewOpen]);

  useEffect(() => {
    if (!previewOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (previewIndex + 1) % colorOptions.length;
        setPreviewIndex(nextIndex);
        setActiveImage(colorOptions[nextIndex].image);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const nextIndex = (previewIndex - 1 + colorOptions.length) % colorOptions.length;
        setPreviewIndex(nextIndex);
        setActiveImage(colorOptions[nextIndex].image);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [previewOpen, previewIndex, colorOptions]);

  if (!product) {
    return (
      <section className="section detail-section"><div className="container">
        <div className="empty-catalog detail-empty"><span className="empty-icon">⌕</span><p className="eyebrow">PHONE DETAILS</p><h1>This phone isn’t listed yet.</h1><p>Our verified catalog is being prepared. Visit the phone catalog or contact the store to ask about current models.</p><Link className="button button-primary" to="/products">Browse phones <span aria-hidden="true">→</span></Link></div>
      </div></section>
    );
  }

  return (
    <section className="section detail-section"><div className="container">
      <div className="detail-layout">
        <div className="detail-visual">
          {activeImage
            ? <div className="detail-gallery"><button className="detail-image-open" type="button" onClick={(event) => { previewTriggerRef.current = event.currentTarget; setPreviewIndex(currentColorIndex); setPreviewOpen(true); }} aria-label="Enlarge product image and browse colors"><img className="detail-image" src={assetUrl(activeImage)} alt={`${product.brand} ${product.name}`} /><span className="image-zoom-hint">Click to enlarge</span></button>
                {images.length > 1 && <div className="detail-thumbnails" aria-label="Product image gallery">{images.map((image, index) => (
                  <button key={image} className={`detail-thumbnail${activeImage === image ? " is-active" : ""}`} type="button" onClick={() => setActiveImage(image)} aria-label={`View image ${index + 1}`}>
                    <img src={assetUrl(image)} alt="" loading="lazy" />
                  </button>
                ))}</div>}</div>
            : <div className="detail-image-placeholder">✳</div>}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.brand}</p>
          <h1>{product.name}</h1>
          <div className="detail-price-block">
            <p className="detail-price">{Number.isFinite(selectedPrice) ? formatMoney(selectedPrice) : "Contact for price"}</p>
            <span className="demo-price-note">Estimated demo price · final price to be confirmed</span>
          </div>
          <p>{product.description}</p>
          <p className="detail-availability">Availability: please confirm with the store</p>
          {product.variants?.length > 0 && <div className="variant-picker">
            <label htmlFor="product-variant">RAM and storage</label>
            <select id="product-variant" value={selectedVariant?.id || ""} onChange={(event) => setSelectedVariantId(event.target.value)}>
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.ram}GB RAM / {variant.storage}GB storage — {formatMoney(variant.price)}
                </option>
              ))}
            </select>
            {selectedVariant?.estimated && <p className="variant-note">This configuration and demo price need store confirmation.</p>}
          </div>}
          <table className="spec-table"><tbody>{Object.entries(product.specifications).map(([label, value]) => (
            <tr key={label}><th>{label}</th><td>{label === "Memory" && selectedVariant
              ? `${selectedVariant.ram}GB RAM + ${selectedVariant.storage}GB`
              : value}</td></tr>
          ))}</tbody></table>
          <Link className="button button-primary" to="/contact">Ask the store <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      {Number.isFinite(selectedPrice) && <EmiCalculator initialPrice={selectedPrice} />}
      {previewOpen && colorOptions.length > 0 && <div className="image-preview-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closePreview(); }}>
        <div className="image-preview-dialog" role="dialog" aria-modal="true" aria-label={`${product.name} color preview`}>
          <button ref={previewCloseRef} className="image-preview-close" type="button" onClick={closePreview} aria-label="Close image preview">×</button>
          {colorOptions.length > 1 && <>
            <button className="image-preview-arrow image-preview-previous" type="button" onClick={() => changePreview(-1)} aria-label="Previous color">‹</button>
            <button className="image-preview-arrow image-preview-next" type="button" onClick={() => changePreview(1)} aria-label="Next color">›</button>
          </>}
          <img className="image-preview-image" src={assetUrl(colorOptions[previewIndex]?.image || activeImage)} alt={`${product.name} in ${colorOptions[previewIndex]?.name || "selected color"}`} />
          <div className="image-preview-caption"><strong>{colorOptions[previewIndex]?.name}</strong><span>{previewIndex + 1} / {colorOptions.length}</span></div>
        </div>
      </div>}
    </div></section>
  );
}

function Offers() {
  return (
    <>
      <section className="page-hero page-hero-compact"><div className="container">
        <p className="eyebrow">CLEAR TERMS. CONFIDENT CHOICES.</p><h1>Know the details before you decide.</h1>
        <p>EMI and exchange terms may depend on the phone and your situation. Confirm the latest details with the store.</p>
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span aria-current="page">Offers & EMI</span></div>
      </div></section>
      <section className="section emi-page-section"><div className="container"><EmiCalculator standalone /></div></section>
      <section className="section"><div className="container offer-grid">
        <article className="info-card"><span className="info-card-icon">↗</span><p className="eyebrow">PAYMENT OPTIONS</p><h2>Ask about EMI</h2><p>Availability, down payment, duration, fees, and eligibility can vary. Please confirm the full terms and final amount before agreeing to any plan.</p><Link className="text-link" to="/contact">Ask the store <span>→</span></Link></article>
        <article className="info-card" id="exchange"><span className="info-card-icon">⟳</span><p className="eyebrow">TRADE-IN</p><h2>Thinking of an exchange?</h2><p>Any exchange value depends on an in-store inspection. Device condition, included accessories, and applicable terms may affect the final valuation.</p><Link className="text-link" to="/contact">Ask about exchange <span>→</span></Link></article>
        <article className="info-card"><span className="info-card-icon">✳</span><p className="eyebrow">CURRENT PROMOTIONS</p><h2>Offers are confirmed in store</h2><p>We’ll list an offer here only after its products, conditions, and validity are verified.</p><Link className="text-link" to="/products">Explore phones <span>→</span></Link></article>
      </div></section>
    </>
  );
}

function About() {
  const team = [
    {
      name: "Swapon Kumar Das",
      role: "Sales Executive",
      period: "Since 2024",
      mobile: "+880 01976991540",
      phoneLink: "+8801976991540",
      email: "swaponkumardas540@gmail.com",
      image: "/assets/images/staff-swapon-kumar-das.png",
    },
  ];

  return (
    <>
      <section className="page-hero page-hero-compact"><div className="container">
        <p className="eyebrow">A LOCAL SHOP, A PERSONAL CHOICE</p><h1>Good choices start with good guidance.</h1>
        <p>Choice Telecom is a mobile phone shop serving the Nawabganj, Dinajpur community.</p>
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span aria-current="page">About</span></div>
      </div></section>
      <section className="section"><div className="container about-grid">
        <div className="owner-profile">
          <img src="/assets/images/shop-owner.png" alt="Choice Telecom shop owner" loading="lazy" />
          <div className="owner-profile-copy">
            <div className="owner-profile-kicker"><span aria-hidden="true">✦</span><p className="eyebrow">SHOP OWNER & FOUNDER</p></div>
            <h3>Md. Nural Amin (Raju)</h3>
            <p className="owner-role">Founder & Proprietor</p>
            <div className="owner-profile-contacts">
              <a className="owner-profile-contact" href={`tel:${OWNER_PHONE_LINK}`}>
                <span aria-hidden="true">☎</span><span><small>Call the owner</small><strong>{OWNER_PHONE_DISPLAY}</strong></span>
              </a>
              <a className="owner-profile-contact" href={`mailto:${OWNER_EMAIL}`}>
                <span aria-hidden="true">✉</span><span><small>Email</small><strong>{OWNER_EMAIL}</strong></span>
              </a>
            </div>
          </div>
        </div>
        <div className="about-copy"><p className="eyebrow">CHOICE TELECOM</p><h2>Here to help you choose with confidence.</h2><p>Finding the right phone is personal. We want to make it easier to explore your options, ask questions, and understand the details before you decide.</p><p>Our online catalog is prepared with confirmed models and current information.</p><Link className="button button-primary" to="/products">Explore the catalog <span>→</span></Link></div>
      </div></section>
      <section className="section team-section"><div className="container">
        <div className="section-heading team-heading">
          <div><p className="eyebrow">MEET THE TEAM</p><h2>People ready to help.</h2></div>
          <p>Friendly product guidance, clear answers and local support.</p>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <article className="team-card" key={person.name}>
              <img src={assetUrl(person.image)} alt={person.name} loading="eager" decoding="async" />
              <div className="team-card-copy">
                <p className="eyebrow">YOUR LOCAL CONTACT</p>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <span className="team-period"><span aria-hidden="true">●</span>{person.period}</span>
                <div className="team-contact-actions">
                  <a className="team-contact-link" href={`tel:${person.phoneLink}`}>
                    <span className="team-contact-icon" aria-hidden="true">☎</span>
                    <span><small>Call Swapon</small><strong>{person.mobile}</strong></span>
                  </a>
                  <a className="team-contact-link" href={`mailto:${person.email}`}>
                    <span className="team-contact-icon" aria-hidden="true">✉</span>
                    <span><small>Email</small><strong>{person.email}</strong></span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div></section>
      <section className="section location-section"><div className="container location-grid">
        <div className="location-copy">
          <p className="eyebrow">VISIT OUR STORE</p>
          <h2>Choice Telecom, Nawabganj</h2>
          <p>Visit Choice Telecom in Nawabganj, Dinajpur. Open the map for directions.</p>
          <dl className="store-details">
            <div><dt>Phone</dt><dd><a href={`tel:${STORE_PHONE_LINK}`}>{STORE_PHONE_DISPLAY}</a></dd></div>
            <div><dt>WhatsApp</dt><dd><a href={`https://wa.me/${STORE_WHATSAPP}`} target="_blank" rel="noopener noreferrer">{STORE_PHONE_DISPLAY}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a></dd></div>
            <div><dt>Opening hours</dt><dd>Saturday–Thursday, 9:00 AM–8:00 PM</dd></div>
          </dl>
          <a className="button button-primary" href={STORE_MAP_URL} target="_blank" rel="noopener noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>
        </div>
        <a className="store-map" href={STORE_MAP_URL} target="_blank" rel="noopener noreferrer" aria-label="Open Choice Telecom location in Google Maps">
          <div className="map-grid" />
          <span className="map-road road-one" />
          <span className="map-road road-two" />
          <span className="map-marker"><span>CT</span></span>
          <span className="map-label"><strong>Choice Telecom</strong><small>Nawabganj, Dinajpur</small></span>
        </a>
      </div></section>
    </>
  );
}

function Contact() {
  return (
    <>
      <section className="page-hero page-hero-compact"><div className="container">
        <p className="eyebrow">WE’RE HERE IN NAWABGANJ</p><h1>Let’s talk phones.</h1>
        <p>Have a question? Contact the owner directly by phone, email or WhatsApp.</p>
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span aria-current="page">Contact</span></div>
      </div></section>
      <section className="section"><div className="container contact-grid">
        <div className="contact-intro"><p className="eyebrow">GET IN TOUCH</p><h2>We are ready to help.</h2><p>Call, email or chat with us to ask about availability, specifications, exchange and EMI options.</p><div className="contact-status"><span className="status-pulse" /><span>Support available during opening hours</span></div></div>
        <div className="contact-card" id="business-details">
          <div className="contact-card-top"><span className="contact-card-icon">⌖</span><span className="eyebrow">STORE LOCATION</span></div>
          <h3>Choice Telecom</h3>
          <p>Visit Choice Telecom in Nawabganj, Dinajpur. Use the map link for directions.</p>
          <div className="contact-divider" />
          <p className="detail-pending"><span>☎</span> <a href={`tel:${STORE_PHONE_LINK}`}>{STORE_PHONE_DISPLAY}</a></p>
          <p className="detail-pending"><span>✉</span> <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a></p>
          <p className="detail-pending"><span>◷</span> Saturday–Thursday, 9:00 AM–8:00 PM</p>
          <a className="button button-primary contact-whatsapp" href={`https://wa.me/${STORE_WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a>
          <a className="contact-map-link" href={STORE_MAP_URL} target="_blank" rel="noopener noreferrer">Get directions on Google Maps <span aria-hidden="true">↗</span></a>
        </div>
      </div></section>
    </>
  );
}

function NotFound() {
  return (
    <section className="section"><div className="container empty-catalog"><p className="eyebrow">PAGE NOT FOUND</p><h1>Looks like this page moved.</h1><p>The link may be out of date, or the page may not exist.</p><Link className="button button-primary" to="/">Back to home</Link></div></section>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("choice-telecom-theme") || "light");
  const [language, setLanguage] = useState(() => localStorage.getItem("choice-telecom-language") || "en");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === "bn" ? "bn" : "en";
    localStorage.setItem("choice-telecom-theme", theme);
  }, [theme, language]);

  useEffect(() => {
    localStorage.setItem("choice-telecom-language", language);
  }, [language]);

  return (
    <Layout language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
