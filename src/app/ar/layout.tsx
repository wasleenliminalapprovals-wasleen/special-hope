import type { Metadata, Viewport } from "next";
import { SITE, AR } from "@/lib/constants";
import { fontVariables } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ArabicDocumentAttributes from "@/components/layout/ArabicDocumentAttributes";

/* ============================================================
   Viewport Configuration
   ============================================================ */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#004080",
};

/* ============================================================
   Arabic Root Metadata
   ============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${AR.siteShortName} | ${AR.tagline}`,
    template: `%s | ${AR.siteShortName}`,
  },
  description: AR.description,
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
    canonical: `${SITE.url}/ar`,
    languages: {
      "en-AE": SITE.url,
      "ar-AE": `${SITE.url}/ar`,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_AE",
    siteName: AR.siteName,
    title: `${AR.siteShortName} | ${AR.tagline}`,
    description: AR.description,
    url: `${SITE.url}/ar`,
    images: [
      {
        url: "/logos/og.jpg",
        width: 1200,
        height: 630,
        alt: "وسلين ليمينال لاستشارات الموافقات — خبراء موافقات دبي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AR.siteShortName} | ${AR.tagline}`,
    description: AR.description,
    images: ["/logos/og.jpg"],
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
   Arabic Root Layout
   ============================================================ */

export default function ArabicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Sync <html lang="ar-AE" dir="rtl"> after hydration (root layout owns <html>) */}
      <ArabicDocumentAttributes />

      {/* RTL wrapper — <html>/<body> belong to the root layout only */}
      <div lang="ar-AE" dir="rtl" className={fontVariables("ar")}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-md"
        >
          تخطي إلى المحتوى الرئيسي
        </a>

        {/* Site header — localized Arabic */}
        <Header locale="ar" />

        <main id="main-content">{children}</main>

        {/* Site footer — localized Arabic */}
        <Footer locale="ar" />

        {/* Analytics (GTM + GA4) load once via the root layout for ALL routes
            including /ar — never duplicate third-party scripts in nested layouts. */}
      </div>
    </>
  );
}
