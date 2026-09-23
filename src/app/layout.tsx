import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://tgap.us";
const SITE_NAME = "TGAP Real Estate Investment Group";
const DESCRIPTION =
  "TGAP is a vertically integrated real estate investment and development group based in Richfield, Utah. Hospitality, multifamily, commercial, land development, and residential construction across Central Utah and beyond.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TGAP | Real Estate Investment & Development, Central Utah",
    template: "%s | TGAP",
  },
  description: DESCRIPTION,
  keywords: [
    "real estate investment Utah",
    "real estate development Richfield Utah",
    "Central Utah real estate developer",
    "Sevier County commercial real estate",
    "multifamily development Utah",
    "hotel development Utah",
    "land development Central Utah",
    "TGAP LLC",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "TGAP | Real Estate Investment & Development",
    description: "We don't just find opportunity. We create it. Real estate investment and development from Central Utah.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGAP | Real Estate Investment & Development",
    description: "We don't just find opportunity. We create it.",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TGAP LLC",
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Richfield",
    addressRegion: "UT",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "State", name: "Utah" },
    { "@type": "Country", name: "United States" },
  ],
  founder: { "@type": "Person", name: "Donavan Allen" },
  employee: [
    { "@type": "Person", name: "Donavan Allen" },
    { "@type": "Person", name: "Tyson Hansen" },
    { "@type": "Person", name: "Doug Monroe" },
    { "@type": "Person", name: "Dustin Nielsen" },
  ],
  knowsAbout: [
    "Real estate development",
    "Hotel development",
    "Multifamily housing",
    "Land development",
    "Commercial real estate",
    "Residential construction",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
