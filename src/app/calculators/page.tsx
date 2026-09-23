"use client";
import { useState } from "react";

/* ─────────── helpers ─────────── */
const fmt = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 2 });
const fmtPct = (n: number) => fmt(n) + "%";
const fmtUsd = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─────────── calculator definitions ─────────── */
type CalcField = {
  key: string;
  label: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  defaultValue?: number;
};

type CalcResult = { label: string; value: string; highlight?: boolean };

type CalculatorDef = {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: CalcField[];
  calculate: (v: Record<string, number>) => CalcResult[];
};

const calculators: CalculatorDef[] = [
  /* 1 ─ ROI */
  {
    id: "roi",
    name: "ROI Calculator",
    description:
      "Measure the return on investment for any deal, including rehab, holding costs, and sale proceeds.",
    icon: "roi",
    fields: [
      { key: "purchase", label: "Purchase Price", prefix: "$", placeholder: "250000" },
      { key: "rehab", label: "Rehab / Improvement Costs", prefix: "$", placeholder: "50000", defaultValue: 0 },
      { key: "holding", label: "Holding Costs", prefix: "$", placeholder: "5000", defaultValue: 0 },
      { key: "closing", label: "Total Closing Costs (Buy + Sell)", prefix: "$", placeholder: "15000", defaultValue: 0 },
      { key: "salePrice", label: "Sale Price / Current Value", prefix: "$", placeholder: "375000" },
    ],
    calculate: (v) => {
      const totalInvested = v.purchase + v.rehab + v.holding + v.closing;
      const profit = v.salePrice - totalInvested;
      const roi = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
      return [
        { label: "Total Invested", value: fmtUsd(totalInvested) },
        { label: "Net Profit", value: fmtUsd(profit) },
        { label: "Return on Investment", value: fmtPct(roi), highlight: true },
      ];
    },
  },

  /* 2 ─ Cap Rate */
  {
    id: "cap",
    name: "Cap Rate",
    description:
      "Evaluate a property's rate of return based on its net operating income relative to market value.",
    icon: "cap",
    fields: [
      { key: "noi", label: "Annual Net Operating Income (NOI)", prefix: "$", placeholder: "60000" },
      { key: "value", label: "Property Value / Purchase Price", prefix: "$", placeholder: "750000" },
    ],
    calculate: (v) => {
      const capRate = v.value > 0 ? (v.noi / v.value) * 100 : 0;
      return [
        { label: "Cap Rate", value: fmtPct(capRate), highlight: true },
        { label: "Monthly NOI", value: fmtUsd(v.noi / 12) },
      ];
    },
  },

  /* 3 ─ Cash-on-Cash Return */
  {
    id: "coc",
    name: "Cash-on-Cash Return",
    description:
      "Calculate the annual return on the actual cash you invested: the metric that matters most to leveraged investors.",
    icon: "coc",
    fields: [
      { key: "cashInvested", label: "Total Cash Invested", prefix: "$", placeholder: "75000" },
      { key: "annualCashFlow", label: "Annual Pre-Tax Cash Flow", prefix: "$", placeholder: "9000" },
    ],
    calculate: (v) => {
      const coc = v.cashInvested > 0 ? (v.annualCashFlow / v.cashInvested) * 100 : 0;
      return [
        { label: "Cash-on-Cash Return", value: fmtPct(coc), highlight: true },
        { label: "Monthly Cash Flow", value: fmtUsd(v.annualCashFlow / 12) },
      ];
    },
  },

  /* 4 ─ Mortgage Payment */
  {
    id: "mortgage",
    name: "Mortgage Payment",
    description:
      "Compute your monthly principal & interest payment, total interest paid, and full cost of the loan.",
    icon: "mortgage",
    fields: [
      { key: "principal", label: "Loan Amount", prefix: "$", placeholder: "400000" },
      { key: "rate", label: "Annual Interest Rate", suffix: "%", placeholder: "7.0" },
      { key: "years", label: "Loan Term", suffix: "years", placeholder: "30" },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      let monthly = 0;
      if (r > 0) {
        monthly = (v.principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        monthly = n > 0 ? v.principal / n : 0;
      }
      const totalPaid = monthly * n;
      const totalInterest = totalPaid - v.principal;
      return [
        { label: "Monthly Payment (P&I)", value: fmtUsd(monthly), highlight: true },
        { label: "Total Interest Paid", value: fmtUsd(totalInterest) },
        { label: "Total Cost of Loan", value: fmtUsd(totalPaid) },
      ];
    },
  },

  /* 5 ─ DSCR */
  {
    id: "dscr",
    name: "DSCR",
    description:
      "Debt Service Coverage Ratio, the key metric lenders use to evaluate whether a property's income can cover its debt obligations.",
    icon: "dscr",
    fields: [
      { key: "noi", label: "Annual Net Operating Income (NOI)", prefix: "$", placeholder: "72000" },
      { key: "annualDebt", label: "Annual Debt Service", prefix: "$", placeholder: "55000" },
    ],
    calculate: (v) => {
      const dscr = v.annualDebt > 0 ? v.noi / v.annualDebt : 0;
      const surplus = v.noi - v.annualDebt;
      return [
        { label: "DSCR", value: fmt(dscr) + "x", highlight: true },
        { label: "Annual Surplus / (Deficit)", value: fmtUsd(surplus) },
        {
          label: "Lender Assessment",
          value: dscr >= 1.25 ? "Strong: Likely Qualifies" : dscr >= 1.0 ? "Marginal: May Qualify" : "Below 1.0: Does Not Qualify",
        },
      ];
    },
  },

  /* 6 ─ GRM */
  {
    id: "grm",
    name: "Gross Rent Multiplier",
    description:
      "A quick-glance metric to compare property prices relative to gross rental income, useful for screening deals fast.",
    icon: "grm",
    fields: [
      { key: "price", label: "Property Price", prefix: "$", placeholder: "500000" },
      { key: "annualRent", label: "Annual Gross Rental Income", prefix: "$", placeholder: "60000" },
    ],
    calculate: (v) => {
      const grm = v.annualRent > 0 ? v.price / v.annualRent : 0;
      const monthlyRent = v.annualRent / 12;
      return [
        { label: "Gross Rent Multiplier", value: fmt(grm) + "x", highlight: true },
        { label: "Monthly Gross Rent", value: fmtUsd(monthlyRent) },
        { label: "Price per Dollar of Rent", value: fmtUsd(grm) },
      ];
    },
  },

  /* 7 ─ 70% Rule (Fix & Flip) */
  {
    id: "flip",
    name: "Fix & Flip (70% Rule)",
    description:
      "Determine your maximum allowable offer on a flip using the industry-standard 70% rule.",
    icon: "flip",
    fields: [
      { key: "arv", label: "After Repair Value (ARV)", prefix: "$", placeholder: "350000" },
      { key: "rehab", label: "Estimated Rehab Costs", prefix: "$", placeholder: "50000" },
    ],
    calculate: (v) => {
      const mao = v.arv * 0.7 - v.rehab;
      const projectedProfit = v.arv - mao - v.rehab;
      return [
        { label: "Maximum Allowable Offer", value: fmtUsd(Math.max(mao, 0)), highlight: true },
        { label: "Projected Gross Profit", value: fmtUsd(projectedProfit) },
        { label: "70% of ARV", value: fmtUsd(v.arv * 0.7) },
      ];
    },
  },

  /* 8 ─ Rental Property Analysis */
  {
    id: "rental",
    name: "Rental Property Analysis",
    description:
      "A comprehensive snapshot of a rental deal, from monthly cash flow to cap rate, CoC return, and break-even occupancy.",
    icon: "rental",
    fields: [
      { key: "price", label: "Purchase Price", prefix: "$", placeholder: "300000" },
      { key: "downPct", label: "Down Payment", suffix: "%", placeholder: "25" },
      { key: "rate", label: "Interest Rate", suffix: "%", placeholder: "7.0" },
      { key: "years", label: "Loan Term", suffix: "years", placeholder: "30" },
      { key: "monthlyRent", label: "Monthly Gross Rent", prefix: "$", placeholder: "2500" },
      { key: "vacancy", label: "Vacancy Rate", suffix: "%", placeholder: "5", defaultValue: 5 },
      { key: "monthlyExpenses", label: "Monthly Operating Expenses", prefix: "$", placeholder: "600" },
    ],
    calculate: (v) => {
      const down = v.price * (v.downPct / 100);
      const loan = v.price - down;
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      let monthlyPI = 0;
      if (r > 0) {
        monthlyPI = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        monthlyPI = n > 0 ? loan / n : 0;
      }
      const effectiveRent = v.monthlyRent * (1 - v.vacancy / 100);
      const monthlyCashFlow = effectiveRent - v.monthlyExpenses - monthlyPI;
      const annualCashFlow = monthlyCashFlow * 12;
      const annualNOI = (effectiveRent - v.monthlyExpenses) * 12;
      const capRate = v.price > 0 ? (annualNOI / v.price) * 100 : 0;
      const coc = down > 0 ? (annualCashFlow / down) * 100 : 0;
      const breakEvenOcc =
        v.monthlyRent > 0
          ? ((v.monthlyExpenses + monthlyPI) / v.monthlyRent) * 100
          : 0;
      return [
        { label: "Monthly Cash Flow", value: fmtUsd(monthlyCashFlow), highlight: true },
        { label: "Annual Cash Flow", value: fmtUsd(annualCashFlow) },
        { label: "Monthly Mortgage (P&I)", value: fmtUsd(monthlyPI) },
        { label: "Down Payment", value: fmtUsd(down) },
        { label: "Cap Rate", value: fmtPct(capRate) },
        { label: "Cash-on-Cash Return", value: fmtPct(coc) },
        { label: "Annual NOI", value: fmtUsd(annualNOI) },
        { label: "Break-Even Occupancy", value: fmtPct(breakEvenOcc) },
      ];
    },
  },
];

/* ─────────── icons ─────────── */
function CalcIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    roi: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    cap: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4" />
      </svg>
    ),
    coc: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    mortgage: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    dscr: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    grm: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    flip: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    rental: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  };
  return <span className="calc-icon">{icons[type] || icons.roi}</span>;
}

/* ─────────── calculator card component ─────────── */
function CalculatorCard({ def }: { def: CalculatorDef }) {
  const initial: Record<string, string> = {};
  def.fields.forEach((f) => {
    initial[f.key] = f.defaultValue !== undefined ? String(f.defaultValue) : "";
  });

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [results, setResults] = useState<CalcResult[] | null>(null);

  const handleChange = (key: string, val: string) => {
    // Allow only numbers, decimals, and empty
    if (val !== "" && !/^[\d.]*$/.test(val)) return;
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleCalculate = () => {
    const numericValues: Record<string, number> = {};
    def.fields.forEach((f) => {
      numericValues[f.key] = parseFloat(values[f.key]) || 0;
    });
    setResults(def.calculate(numericValues));
  };

  const handleClear = () => {
    const cleared: Record<string, string> = {};
    def.fields.forEach((f) => {
      cleared[f.key] = f.defaultValue !== undefined ? String(f.defaultValue) : "";
    });
    setValues(cleared);
    setResults(null);
  };

  return (
    <div className="calc-card" id={def.id}>
      <div className="calc-card-header">
        <CalcIcon type={def.icon} />
        <h3 className="calc-card-title">{def.name}</h3>
      </div>
      <p className="calc-card-desc">{def.description}</p>

      <div className="calc-fields">
        {def.fields.map((f) => (
          <div className="calc-field" key={f.key}>
            <label className="calc-label">{f.label}</label>
            <div className="calc-input-wrap">
              {f.prefix && <span className="calc-input-prefix">{f.prefix}</span>}
              <input
                type="text"
                inputMode="decimal"
                className="calc-input"
                placeholder={f.placeholder}
                value={values[f.key]}
                onChange={(e) => handleChange(f.key, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
              />
              {f.suffix && <span className="calc-input-suffix">{f.suffix}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="calc-actions">
        <button className="calc-btn-primary" onClick={handleCalculate}>
          Calculate
        </button>
        <button className="calc-btn-secondary" onClick={handleClear}>
          Clear
        </button>
      </div>

      {results && (
        <div className="calc-results">
          {results.map((r, i) => (
            <div className={`calc-result-row ${r.highlight ? "highlight" : ""}`} key={i}>
              <span className="calc-result-label">{r.label}</span>
              <span className="calc-result-value">{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────── page ─────────── */
export default function CalculatorsPage() {
  return (
    <div className="calc-page">
      {/* Nav */}
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

      {/* Hero */}
      <header className="calc-hero">
        <div className="calc-hero-inner">
          <div className="section-label" style={{ justifyContent: "center" }}>
            Investment Tools
          </div>
          <h1 className="calc-hero-title">Investment Calculators</h1>
          <p className="calc-hero-subtitle">
            Professional-grade tools to analyze deals, evaluate returns, and make
            smarter investment decisions, built for serious investors.
          </p>
        </div>
      </header>

      {/* Quick Nav */}
      <div className="calc-quick-nav">
        <div className="calc-quick-nav-inner">
          {calculators.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="calc-quick-link">
              {c.name}
            </a>
          ))}
        </div>
      </div>

      {/* Calculator Grid */}
      <main className="calc-main">
        <div className="calc-grid">
          {calculators.map((def) => (
            <CalculatorCard key={def.id} def={def} />
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="calc-cta">
        <div className="calc-cta-inner">
          <h2 className="calc-cta-title">Ready to Put These Numbers to Work?</h2>
          <p className="calc-cta-text">
            TGAP identifies, structures, and executes high-value real estate
            opportunities nationwide. Let&apos;s talk about your next investment.
          </p>
          <a href="/#contact" className="btn-primary">
            Get in Touch
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: 8 }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="calc-footer">
        <p>&copy; {new Date().getFullYear()} TGAP Real Estate Investment Group. All rights reserved.</p>
        <p className="calc-disclaimer">
          These calculators are for informational purposes only and do not
          constitute financial, tax, or legal advice. Consult a qualified
          professional before making investment decisions.
        </p>
      </footer>
    </div>
  );
}
