export default function SimpleNav() {
  return (
    <nav className="calc-nav">
      <div className="calc-nav-inner">
        <a href="/" className="calc-nav-logo">
          <span className="calc-nav-logo-text">T G A P</span>
        </a>
        <a href="/" className="calc-nav-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Main Site
        </a>
      </div>
    </nav>
  );
}
