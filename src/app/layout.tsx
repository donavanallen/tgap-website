import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TGAP | Real Estate Investment Group",
  description:
    "TGAP is a vertically integrated real estate investment group based in Central Utah, specializing in creating high-value opportunities across every asset class nationwide.",
  openGraph: {
    title: "TGAP | Real Estate Investment Group",
    description:
      "We don't just find opportunity. We create it. Nationwide real estate investment and development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
