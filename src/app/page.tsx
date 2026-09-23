"use client";

import { useEffect, useState, useRef } from "react";

/* ===== SVG ICON COMPONENTS ===== */
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ArrowUpRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

/* ===== SERVICE ICONS ===== */
const serviceIcons = [
  // Fix & Flip
  <svg key="1" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="6" y="20" width="36" height="22" rx="1" /><path d="M24 8l18 12H6z" /><path d="M18 30v12M30 30v12M20 26h8" /></svg>,
  // Spec Homes
  <svg key="2" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="4" y="14" width="16" height="28" rx="1" /><rect x="28" y="6" width="16" height="36" rx="1" /><path d="M8 22h8M8 28h8M8 34h8M32 14h8M32 20h8M32 26h8M32 32h8" /></svg>,
  // Land Development
  <svg key="3" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M4 44h40" /><path d="M8 44V20l16-12 16 12v24" /><path d="M20 44V32h8v12" /><circle cx="24" cy="22" r="3" /></svg>,
  // Commercial
  <svg key="4" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="4" y="10" width="40" height="32" rx="2" /><path d="M4 20h40" /><path d="M16 10V42M32 10v32" /><path d="M4 30h40" /></svg>,
  // Subdivisions
  <svg key="5" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M6 42V18l12-8v32" /><path d="M18 42V14l12-8v36" /><path d="M30 42V10l12-8v40" /><path d="M4 42h40" /></svg>,
  // Hotels
  <svg key="6" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="8" y="6" width="32" height="36" rx="2" /><path d="M8 14h32M8 22h32M8 30h32" /><path d="M16 6v36M24 6v36M32 6v36" /><path d="M20 38h8v4h-8z" /></svg>,
  // Apartments
  <svg key="7" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="6" y="8" width="36" height="34" rx="2" /><path d="M6 18h36" /><rect x="12" y="24" width="8" height="8" rx="1" /><rect x="28" y="24" width="8" height="8" rx="1" /><path d="M12 36h24" /></svg>,
  // Rentals
  <svg key="8" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M24 4v40" /><path d="M12 12l12-8 12 8" /><path d="M8 42h32" /><circle cx="24" cy="24" r="6" /><path d="M20 24l2.5 2.5L29 21" /></svg>,
  // Everything Between
  <svg key="9" className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="24" cy="24" r="18" /><path d="M12 24h24M24 12v24" /><path d="M14 14l20 20M34 14L14 34" /></svg>,
];

/* ===== DATA ===== */
/* Public contact details. Leave empty to hide until confirmed. */
const CONTACT_EMAIL: string = "donavanallen@hotmail.com";
const CONTACT_PHONE: string = "(435) 893-1289";

const services = [
  { title: "Fix & Flip", desc: "We acquire undervalued residential properties, execute strategic renovations, and deliver beautifully finished homes to market, generating strong returns on accelerated timelines." },
  { title: "Spec Homes", desc: "We build new construction spec homes in high-demand markets, combining modern design with strategic location selection to maximize buyer appeal and profit margins." },
  { title: "Land Development", desc: "From raw acreage to entitled, shovel-ready parcels, we navigate the complexities of zoning, infrastructure, and entitlements to transform land into high-value development opportunities." },
  { title: "Commercial Real Estate", desc: "Office buildings, retail centers, industrial spaces: we acquire, develop, and manage commercial assets that generate stable cash flow and long-term appreciation." },
  { title: "Subdivisions", desc: "We develop residential and commercial subdivisions from the ground up, master-planning communities that create value for homeowners, businesses, and our investors alike." },
  { title: "Hotels & Hospitality", desc: "From boutique hotels to branded hospitality assets, we identify and develop properties in prime markets that deliver premium returns through operational excellence and strategic positioning." },
  { title: "Apartments & Multifamily", desc: "We acquire and develop multifamily properties ranging from small complexes to large-scale apartment communities, targeting markets with strong rental demand and growth fundamentals." },
  { title: "Long & Short Term Rentals", desc: "Strategic acquisition and management of rental properties across all hold periods, from vacation rentals and Airbnb portfolios to traditional long-term leased residential assets." },
  { title: "And Everything Between", desc: "Mixed-use developments, 1031 exchanges, joint ventures, creative financing: if there's an opportunity in real estate, we have the expertise and network to execute on it." },
];

/* TGAP projects: active, past, and upcoming. */
const portfolioItems = [
  { type: "Hospitality", name: "La Quinta & Hawthorn Suites by Wyndham", location: "Richfield, Utah · $12M Development · Under Construction" },
  { type: "Multifamily Development", name: "800 South Townhomes", location: "Richfield, Utah · 14 Units" },
  { type: "Multifamily", name: "Ephraim Rental Community", location: "Ephraim, Utah · 36 Units" },
  { type: "Subdivision Development", name: "Central Utah Subdivisions", location: "Multiple 40+ Lot Developments · Horizontal & Vertical" },
  { type: "Residential Construction", name: "Spec Home Program", location: "Central Utah · New Construction" },
  { type: "Multifamily Portfolio", name: "Richfield Small Multifamily", location: "Duplexes, Triplexes & 4-Plexes" },
  { type: "Commercial", name: "Retail & Industrial Sites", location: "Central Utah · Multiple Locations" },
  { type: "Land", name: "Land Acquisition & Holdings", location: "Central Utah · Entitlement & Long-Term Holds" },
  { type: "Rentals", name: "Long & Short Term Rental Portfolio", location: "Central Utah · Owned & Operated" },
];

const heroStats: [string, string][] = [
  ["$20M+", "Portfolio Value"],
  ["15+", "Years of Experience"],
  ["100s", "Homes Sold"],
  ["$12M", "Flagship Hotel Project"],
];

const teamMembers = [
  { initials: "DA", name: "Donavan Allen", role: "Founder & Managing Partner", image: "/team/donavan-allen.jpg", bio: "With over a decade of hands-on real estate experience and a broker's license earned in 2020, Donavan has forged a reputation for seeing opportunity where others see obstacles. Born and raised in Central Utah, he brings an intimate understanding of markets both local and national, paired with an instinct for creative deal structuring that consistently unlocks value for investors and partners alike. A serial entrepreneur at heart, Donavan has founded and scaled multiple successful ventures, but real estate remains the throughline of his career: the arena where his vision, grit, and relentless pursuit of excellence converge." },
  { initials: "TH", name: "Tyson Hansen", role: "Partner & Director of Development", image: "/team/tyson-hansen.jpg", bio: "A Central Utah native with deep ties to the communities TGAP serves, Tyson brings a rare blend of financial acumen and boots-on-the-ground development experience to every project. With a background spanning finance, public-sector budgeting, and real estate, he applies a disciplined, numbers-driven lens to every investment decision. Tyson is hands-on across the full development lifecycle, from site selection and municipal entitlements to horizontal development, marketing, and sales, ensuring each project moves efficiently from raw ground to a finished product that creates lasting value." },
  { initials: "DM", name: "Doug Monroe", role: "", image: "/team/doug-monroe.jpg", bio: "" },
  { initials: "DN", name: "Dustin Nielsen", role: "", image: "/team/dustin-nielsen.jpg", bio: "" },
];

const marqueeItems = [
  "Residential Development", "Commercial Real Estate", "Land Development",
  "Flip & Spec Houses", "Hotel Investments", "Apartment Complexes",
  "Short Term Rentals", "Subdivisions", "Long Term Rentals", "Mixed Use",
];

/* ===== MAIN PAGE COMPONENT ===== */
export default function Home() {
  const [preloaderHidden, setPreloaderHidden] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement | null>(null);

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => setPreloaderHidden(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Nav scroll
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [preloaderHidden]);

  // Counter animation
  useEffect(() => {
    const heroEl = document.querySelector(".hero");
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          document.querySelectorAll(".hero-stat-number").forEach((stat) => {
            const el = stat as HTMLElement;
            const text = el.textContent || "";
            const m = text.match(/^([^0-9]*)([0-9.]+)(.*)$/);
            if (!m) return;
            const [, prefix, numStr, suffix] = m;
            const target = parseFloat(numStr);
            const isDecimal = numStr.includes(".");
            let current = 0;
            const step = target / (1500 / 16);
            function update() {
              current += step;
              if (current >= target) { el.textContent = text; return; }
              const display = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
              el.textContent = prefix + display + suffix;
              requestAnimationFrame(update);
            }
            update();
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [preloaderHidden]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "sending") return;
    setFormStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setFormStatus("sent");
      formRef.current?.reset();
    } catch {
      setFormStatus("error");
    }
  };

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setMobileNavOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Preloader */}
      <div className={`preloader ${preloaderHidden ? "hidden" : ""}`}>
        <div className="preloader-logo">TGAP</div>
      </div>

      {/* Navigation */}
      <nav className={`nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#hero" onClick={(e) => smoothScroll(e, "#hero")} className="nav-logo">
            TGAP<span>Real Estate Investment Group</span>
          </a>
          <ul className={`nav-links ${mobileNavOpen ? "active" : ""}`}>
            {[
              ["#about", "About"],
              ["#services", "Services"],
              ["#portfolio", "Portfolio"],
              ["#investors", "Investors"],
              ["#team", "Team"],
              ["/calculators", "Calculators"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={(e) => { if (href.startsWith("#")) smoothScroll(e, href); }}>{label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={(e) => smoothScroll(e, "#contact")} className="nav-cta">Get in Touch</a>
            </li>
          </ul>
          <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle navigation">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-grid-overlay" />
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow">Richfield, Utah &middot; Utah &amp; Surrounding States</div>
            <h1 className="hero-title">
              We Don&apos;t Just Find <em>Opportunity.</em> We Create It.
            </h1>
            <p className="hero-description">
              TGAP is a vertically integrated real estate investment group specializing in
              identifying, structuring, and executing high-value opportunities across every
              asset class in the nation.
            </p>
            <div className="hero-buttons">
              <a href="#services" onClick={(e) => smoothScroll(e, "#services")} className="btn-primary">
                Explore Our Services <ArrowRight />
              </a>
              <a href="#investors" onClick={(e) => smoothScroll(e, "#investors")} className="btn-outline">
                Invest With Us
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-stats">
              {heroStats.map(([num, label]) => (
                <div className="hero-stat" key={label}>
                  <div className="hero-stat-number">{num}</div>
                  <div className="hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <a href="#about" onClick={(e) => smoothScroll(e, "#about")} className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </a>
      </section>

      {/* Marquee */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div className="marquee-item" key={i}>{item}</div>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="about" id="about">
        <div className="about-grid reveal">
          <div className="about-image-wrapper">
            <div className="about-image">
              <div className="about-image-text">TGAP</div>
            </div>
            <div className="about-image-accent" />
          </div>
          <div className="about-text">
            <div className="section-label">About TGAP</div>
            <div className="section-title">
              A Legacy of Vision.<br />A Future of Growth.
            </div>
            <p>
              Founded in the heart of Central Utah, TGAP Real Estate Investment Group was built
              on a simple but powerful premise: the best real estate opportunities
              aren&apos;t always found. They&apos;re created.
            </p>
            <p>
              We bring institutional-quality strategy to every deal, from spec homes and small
              multifamily to multiple 40+ lot subdivisions, hundreds of homes sold, and a
              $12M branded hotel. With more than 15
              years of experience across Utah and the surrounding states, plus multiple
              business acquisitions and holdings, our deep local roots and broad network allow
              us to source, structure, and execute deals that others simply can&apos;t.
            </p>
            <p>
              Whether we&apos;re developing raw land, repositioning an underperforming asset,
              or building from the ground up, we approach every project with the same
              discipline, creativity, and commitment to delivering exceptional returns for our
              partners and investors.
            </p>
            <div className="about-values">
              {[
                ["Conviction", "Data-driven decisions backed by deep market expertise"],
                ["Execution", "From concept to completion, we deliver on every commitment"],
                ["Partnership", "Aligned interests with our investors and communities"],
                ["Innovation", "Creative deal structures that unlock hidden value"],
              ].map(([title, desc]) => (
                <div className="about-value" key={title}>
                  <div className="about-value-title">{title}</div>
                  <div className="about-value-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Services */}
      <section className="services" id="services">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="services-header reveal">
            <div>
              <div className="section-label">What We Do</div>
              <div className="section-title">
                Full-Spectrum Real Estate<br />Investment &amp; Development
              </div>
              <p className="section-subtitle">
                We operate across every major real estate vertical, giving us the flexibility
                to pursue the best risk-adjusted opportunities in any market cycle.
              </p>
            </div>
          </div>
          <div className="services-grid reveal">
            {services.map((svc, i) => (
              <div className="service-card" key={svc.title}>
                <div className="service-number">{String(i + 1).padStart(2, "0")}</div>
                {serviceIcons[i]}
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Portfolio */}
      <section className="portfolio" id="portfolio">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="reveal">
            <div className="section-label">Portfolio</div>
            <div className="section-title">Active, Past &amp; Upcoming Projects</div>
            <p className="section-subtitle">
              A cross-section of our work across hospitality, multifamily, subdivision
              development, commercial, land, and rentals throughout Central Utah.
            </p>
          </div>
          <div className="portfolio-grid reveal">
            {portfolioItems.map((item) => (
              <div className="portfolio-card" key={item.name}>
                <div className="portfolio-bg" />
                <div className="portfolio-overlay" />
                <div className="portfolio-content">
                  <div className="portfolio-type">{item.type}</div>
                  <div className="portfolio-name">{item.name}</div>
                  <div className="portfolio-location">{item.location}</div>
                </div>
                <div className="portfolio-arrow"><ArrowUpRight /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Investors */}
      <section className="investors" id="investors">
        <div className="investors-bg" />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }} className="investors-content">
          <div className="investors-top reveal">
            <div>
              <div className="section-label">Investors</div>
              <div className="section-title">Partner With TGAP</div>
              <p className="section-subtitle">
                We work with a select group of private investors and capital partners on
                development and acquisition projects in Central Utah and beyond. Every
                project is owned, managed, and executed by our own team.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
                <a href="#contact" onClick={(e) => smoothScroll(e, "#contact")} className="btn-primary">
                  Request Information <ArrowRight />
                </a>
              </div>
            </div>
            <div className="investor-stats-grid">
              {[
                ["Direct", "Ownership in Real Assets"],
                ["Aligned", "We Invest Alongside You"],
                ["Local", "Boots on the Ground"],
                ["Clear", "Regular Project Reporting"],
              ].map(([num, label]) => (
                <div className="investor-stat" key={label}>
                  <div className="investor-stat-number">{num}</div>
                  <div className="investor-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="investors-features reveal">
            {[
              {
                title: "Transparent Reporting",
                desc: "Regular project updates, construction progress, and financial reporting on every investment. You always know where your capital stands and what comes next.",
                icon: <svg className="investor-feature-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="4" y="4" width="32" height="32" rx="2" /><path d="M12 24l5-6 5 4 6-10" /><circle cx="28" cy="12" r="2" /></svg>,
              },
              {
                title: "Creative Structures",
                desc: "Joint ventures, seller financing, land contributions, and conventional equity. We structure each deal around what the project and our partners actually need.",
                icon: <svg className="investor-feature-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M20 4v32" /><path d="M4 20h32" /><circle cx="20" cy="20" r="16" /><path d="M8 8l24 24M32 8L8 32" /></svg>,
              },
              {
                title: "Hands-On Management",
                desc: "We are not a passive fund. Our team handles site selection, entitlements, construction, and operations directly, on the ground in the communities we build in.",
                icon: <svg className="investor-feature-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M20 4L4 14v16l16 6 16-6V14z" /><path d="M4 14l16 6 16-6" /><path d="M20 20v16" /></svg>,
              },
            ].map((feat) => (
              <div className="investor-feature" key={feat.title}>
                {feat.icon}
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
          <p className="investor-disclaimer reveal" id="disclosures">
            Nothing on this website is an offer to sell or a solicitation of an offer to buy
            any security. Any offering will be made only to qualified investors through
            definitive offering documents. Real estate investments involve risk, including
            possible loss of principal, and past performance does not guarantee future results.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Team */}
      <section className="team" id="team">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="reveal">
            <div className="section-label">Our Team</div>
            <div className="section-title">The People Behind TGAP</div>
            <p className="section-subtitle">
              A seasoned team of real estate professionals, operators, and strategists with
              decades of combined experience.
            </p>
          </div>
          <div className="team-grid reveal">
            {teamMembers.map((member) => (
              <div className="team-card" key={member.initials}>
                <div className="team-photo">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="team-photo-img" />
                  ) : (
                    <div className="team-photo-initials">{member.initials}</div>
                  )}
                </div>
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-bio">{member.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Contact */}
      <section className="contact" id="contact">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="reveal">
            <div className="section-label">Contact</div>
            <div className="section-title">
              Let&apos;s Build Something<br />Extraordinary Together
            </div>
          </div>
          <div className="contact-grid reveal">
            <div>
              <div className="contact-info-item">
                <div className="contact-info-label">Headquarters</div>
                <div className="contact-info-value">Richfield, Utah<br />Serving Central Utah and beyond</div>
              </div>
              {CONTACT_EMAIL && (
                <div className="contact-info-item">
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </div>
                </div>
              )}
              {CONTACT_PHONE && (
                <div className="contact-info-item">
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">
                    <a href={`tel:${CONTACT_PHONE.replace(/[^0-9+]/g, "")}`}>{CONTACT_PHONE}</a>
                  </div>
                </div>
              )}
              <div className="contact-info-item">
                <div className="contact-info-label">Office Hours</div>
                <div className="contact-info-value">Monday to Friday<br />8:00 AM to 6:00 PM MST</div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit} ref={formRef}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" placeholder="John" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" placeholder="Smith" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="(435) 555-0000" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="interest">I&apos;m Interested In</label>
                <select id="interest" name="interest" defaultValue="" required>
                  <option value="" disabled>Select an option...</option>
                  <option>Investing with TGAP</option>
                  <option>Partnership Opportunities</option>
                  <option>Selling a Property</option>
                  <option>Development Services</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell us about your project or investment goals..." />
              </div>
              {/* Honeypot: bots fill this, humans never see it */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} aria-hidden="true" />
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }} disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Sending..." : formStatus === "sent" ? "Message Sent" : <>Send Message <ArrowRight /></>}
              </button>
              {formStatus === "sent" && (
                <p className="form-note success">Thank you. We received your message and will be in touch shortly.</p>
              )}
              {formStatus === "error" && (
                <p className="form-note error">Something went wrong sending your message. Please try again{CONTACT_EMAIL ? <> or email us directly at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></> : null}.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="footer-top">
            <div>
              <div className="footer-brand-logo">TGAP</div>
              <p className="footer-brand-desc">
                A vertically integrated real estate investment and development group based
                in Richfield, Utah, active across hospitality, multifamily, commercial, and
                residential projects.
              </p>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {["about", "team", "portfolio", "contact"].map((s) => (
                  <li key={s}>
                    <a href={`#${s}`} onClick={(e) => smoothScroll(e, `#${s}`)}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                {["Fix & Flip", "Land Development", "Commercial", "Hospitality"].map((s) => (
                  <li key={s}>
                    <a href="#services" onClick={(e) => smoothScroll(e, "#services")}>{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Investors</div>
              <ul className="footer-links">
                <li><a href="#investors" onClick={(e) => smoothScroll(e, "#investors")}>Invest With Us</a></li>
                <li><a href="/calculators">Investment Calculators</a></li>
                <li><a href="#contact" onClick={(e) => smoothScroll(e, "#contact")}>Request Info</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">© {new Date().getFullYear()} TGAP LLC. All rights reserved.</div>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
              <a href="#disclosures" onClick={(e) => smoothScroll(e, "#disclosures")}>Disclosures</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
