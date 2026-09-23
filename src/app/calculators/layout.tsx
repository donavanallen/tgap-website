import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Investment Calculators",
  description:
    "Free real estate investment calculators: ROI, cap rate, cash-on-cash return, mortgage payment, DSCR, gross rent multiplier, 70% rule fix and flip, and full rental property analysis.",
  alternates: { canonical: "/calculators" },
  openGraph: {
    title: "Real Estate Investment Calculators | TGAP",
    description: "ROI, cap rate, cash-on-cash, DSCR, mortgage, GRM, fix and flip, and rental analysis tools.",
    url: "https://tgap.us/calculators",
  },
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
