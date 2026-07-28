import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto, Roboto_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Suspense } from "react";
import { SITE, NAP, GTM_ID } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import "./globals.css";

/* ============================================================
   Font Configuration — next/font
   ============================================================ */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

/* ============================================================
   Viewport Configuration
   ============================================================ */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#004080",
};

/* ============================================================
   Root Metadata — default SEO for the entire site
   ============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.tagline} | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Dubai approvals",
    "Dubai Municipality approval",
    "DDA approval",
    "DEWA approval",
    "Dubai Civil Defense approval",
    "building permit Dubai",
    "approval consultants Dubai",
    "Wasleen Approvals",
  ],
  authors: [{ name: NAP.companyName }],
  creator: NAP.companyName,
  publisher: NAP.companyName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: SITE.name,
    title: `${SITE.tagline} | ${SITE.name}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.tagline} | ${SITE.name}`,
    description: SITE.description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

/* ============================================================
   Root Layout
   ============================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AE" className={`${montserrat.variable} ${roboto.variable} ${robotoMono.variable}`}>
      <body className="font-roboto antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>

        {/* Site header — sticky with nav, mega menus, mobile hamburger */}
        <Header />

        <main id="main-content">{children}</main>

        {/* Site footer — 5-column with accordion on mobile */}
        <Footer />

        {/* Page view tracking on client-side route changes */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>

        {/* Global floating WhatsApp button */}
        <FloatingWhatsApp />

        {/* Google Tag Manager (noscript fallback + head script) */}
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      </body>
    </html>
  );
}
