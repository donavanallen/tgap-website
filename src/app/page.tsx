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
const services = [
  { title: "Fix & Flip", desc: "We acquire undervalued residential properties, execute strategic renovations, and deliver beautifully finished homes to market — generating strong returns on accelerated timelines." },
  { title: "Spec Homes", desc: "We build new construction spec homes in high-demand markets, combining modern design with strategic location selection to maximize buyer appeal and profit margins." },
  { title: "Land Development", desc: "From raw acreage to entitled, shovel-ready parcels — we navigate the complexities of zoning, infrastructure, and entitlements to transform land into high-value development opportunities." },
  { title: "Commercial Real Estate", desc: "Office buildings, retail centers, industrial spaces — we acquire, develop, and manage commercial assets that generate stable cash flow and long-term appreciation." },
  { title: "Subdivisions", desc: "We develop residential and commercial subdivisions from the ground up — master-planning communities that create value for homeowners, businesses, and our investors alike." },
  { title: "Hotels & Hospitality", desc: "From boutique hotels to branded hospitality assets, we identify and develop properties in prime markets that deliver premium returns through operational excellence and strategic positioning." },
  { title: "Apartments & Multifamily", desc: "We acquire and develop multifamily properties ranging from small complexes to large-scale apartment communities, targeting markets with strong rental demand and growth fundamentals." },
  { title: "Long & Short Term Rentals", desc: "Strategic acquisition and management of rental properties across all hold periods — from vacation rentals and Airbnb portfolios to traditional long-term leased residential assets." },
  { title: "And Everything Between", desc: "Mixed-use developments, 1031 exchanges, joint ventures, creative financing — if there's an opportunity in real estate, we have the expertise and network to execute on it." },
];

const portfolioItems = [
  { type: "Mixed-Use Development", name: "Mountain View Commons", location: "Central Utah · 42 Units" },
  { type: "Residential Subdivision", name: "Cedar Ridge Estates", location: "Utah County · 86 Lots" },
  { type: "Hospitality", name: "The Grand Summit Hotel", location: "Park City, UT · 120 Keys" },
  { type: "Commercial", name: "Crossroads Business Park", location: "Salt Lake City · 180,000 SF" },
  { type: "Fix & Flip Portfolio", name: "Wasatch Renovation Series", location: "Multiple Locations · 35+ Homes" },
];

const testimonials = [
  { text: "TGAP's ability to identify and execute on opportunities that others miss is truly exceptional. Their transparent approach and consistent returns have made them our go-to partner for real estate investments.", author: "Private Investor", role: "Salt Lake City, Utah" },
  { text: "What sets TGAP apart is their hands-on approach. They don't just find deals — they create value at every stage. From land entitlement to final disposition, their execution is world-class.", author: "Development Partner", role: "Denver, Colorado" },
  { text: "As a passive investor, I appreciate the level of transparency and communication TGAP provides. Quarterly reports, project updates, and direct access to the team — it's the gold standard.", author: "Accredited Investor", role: "Scottsdale, Arizona" },
];

const teamMembers = [
  { initials: "DA", name: "Donavan Allen", role: "Founder & Managing Partner", bio: "Visionary leader with deep expertise in identifying and structuring high-value real estate opportunities across multiple asset classes." },
  { initials: "JM", name: "Team Member", role: "Director of Acquisitions", bio: "Leads deal sourcing and underwriting across all asset types, with a keen eye for value-add and development opportunities." },
  { initials: "SR", name: "Team Member", role: "VP of Development", bio: "Oversees all ground-up development projects from entitlement through construction, ensuring on-time, on-budget delivery." },
  { initials: "KL", name: "Team Member", role: "Director of Investor Relations", bio: "Manages all investor communications, capital formation, and reporting to ensure complete transparency and alignment." },
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const testimonialInterval = useRef<NodeJS.Timeout | null>(null);

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
            const hasPrefix = text.startsWith("$");
            const hasSuffix = text.includes("+") ? "+" : text.includes("x") ? "x" : "";
            const numStr = text.replace(/[^0-9.]/g, "");
            const target = parseFloat(numStr);
            const isDecimal = numStr.includes(".");
            let current = 0;
            const step = target / (2000 / 16);
            function update() {
              current += step;
              if (current >= target) { el.textContent = text; return; }
              let display = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
              el.textContent = (hasPrefix ? "$" : "") + display + (hasPrefix && !isDecimal && target >= 100 ? "M" : "") + hasSuffix;
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

  // Testimonial auto-rotate
  useEffect(() => {
    testimonialInterval.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => { if (testimonialInterval.current) clearInterval(testimonialInterval.current); };
  }, []);

  const handleTestimonialClick = (index: number) => {
    setCurrentTestimonial(index);
    if (testimonialInterval.current) clearInterval(testimonialInterval.current);
    testimonialInterval.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
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
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={(e) => smoothScroll(e, href)}>{label}</a>
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
            <div className="hero-eyebrow">Central Utah &middot; Nationwide Reach</div>
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
                Investor Portal
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-stats">
              {[
                ["$150M+", "Assets Managed"],
                ["200+", "Projects Completed"],
                ["48", "States Active"],
                ["15+", "Years of Experience"],
              ].map(([num, label]) => (
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
              on a simple but powerful premise: that the best real estate opportunities
              aren&apos;t always found — they&apos;re created.
            </p>
            <p>
              We bring institutional-quality strategy to every deal, from single-family flips
              to large-scale commercial subdivisions and hospitality projects. Our deep local
              roots combined with a nationwide network allow us to source, structure, and
              execute deals that others simply can&apos;t.
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
            <div className="section-title">Selected Projects</div>
            <p className="section-subtitle">
              A cross-section of our work across residential, commercial, hospitality, and
              land development.
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
              <div className="section-label">Investor Portal</div>
              <div className="section-title">Partner With TGAP</div>
              <p className="section-subtitle">
                We provide qualified investors access to institutional-caliber real estate
                opportunities with hands-on management and transparent reporting.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
                <a href="#contact" onClick={(e) => smoothScroll(e, "#contact")} className="btn-primary">
                  Request Information <ArrowRight />
                </a>
              </div>
            </div>
            <div className="investor-stats-grid">
              {[
                ["22%+", "Avg. Annual IRR"],
                ["1.8x", "Avg. Equity Multiple"],
                ["100%", "Positive Returns"],
                ["$50K", "Minimum Investment"],
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
                desc: "Quarterly performance reports, real-time project updates, and full financial transparency on every investment. You always know exactly where your capital stands.",
                icon: <svg className="investor-feature-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="4" y="4" width="32" height="32" rx="2" /><path d="M12 24l5-6 5 4 6-10" /><circle cx="28" cy="12" r="2" /></svg>,
              },
              {
                title: "Diversified Strategies",
                desc: "Access to multiple asset classes and investment structures — from short-term flips to long-hold commercial assets. Build a portfolio that matches your risk profile.",
                icon: <svg className="investor-feature-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M20 4v32" /><path d="M4 20h32" /><circle cx="20" cy="20" r="16" /><path d="M8 8l24 24M32 8L8 32" /></svg>,
              },
              {
                title: "Hands-On Management",
                desc: "Unlike passive REITs, we actively manage every project from acquisition through disposition. Our team is on the ground, ensuring quality execution at every stage.",
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
                  <div className="team-photo-initials">{member.initials}</div>
                </div>
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-bio">{member.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="testimonials-bg" />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }} className="testimonials-content">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Testimonials</div>
            <div className="section-title">What Our Partners Say</div>
          </div>
          <div className="testimonial-slider reveal">
            <div className="testimonial-card">
              <div className="testimonial-quote-mark">&ldquo;</div>
              <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
              <div className="testimonial-author">{testimonials[currentTestimonial].author}</div>
              <div className="testimonial-role">{testimonials[currentTestimonial].role}</div>
            </div>
            <div className="testimonial-nav">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === currentTestimonial ? "active" : ""}`}
                  onClick={() => handleTestimonialClick(i)}
                />
              ))}
            </div>
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
                <div className="contact-info-value">Central Utah<br />United States</div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">Email</div>
                <div className="contact-info-value">
                  <a href="mailto:info@tgapgroup.com">info@tgapgroup.com</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">Phone</div>
                <div className="contact-info-value">
                  <a href="tel:+18015551234">(801) 555-1234</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">Office Hours</div>
                <div className="contact-info-value">Monday – Friday<br />8:00 AM – 6:00 PM MST</div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="John" required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Smith" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="(801) 555-0000" />
                </div>
              </div>
              <div className="form-group">
                <label>I&apos;m Interested In</label>
                <select defaultValue="">
                  <option value="" disabled>Select an option...</option>
                  <option>Investing with TGAP</option>
                  <option>Partnership Opportunities</option>
                  <option>Selling a Property</option>
                  <option>Development Services</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us about your project or investment goals..." />
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                {formSubmitted ? "Message Sent ✓" : <>Send Message <ArrowRight /></>}
              </button>
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
                A vertically integrated real estate investment group based in Central Utah
                with a nationwide portfolio spanning every major asset class.
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
                <li><a href="#investors" onClick={(e) => smoothScroll(e, "#investors")}>Investor Portal</a></li>
                <li><a href="#investors" onClick={(e) => smoothScroll(e, "#investors")}>Current Opportunities</a></li>
                <li><a href="#contact" onClick={(e) => smoothScroll(e, "#contact")}>Request Info</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">© 2026 TGAP Real Estate Investment Group. All rights reserved.</div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Disclosures</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
