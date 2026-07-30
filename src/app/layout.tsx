import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { SITE, NAP } from "@/lib/constants";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import "./globals.css";

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
    images: [
      {
        url: "/logos/og.jpg",
        width: 1200,
        height: 630,
        alt: "Wasleen Liminal Approval Consultants — Dubai Approvals Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.tagline} | ${SITE.name}`,
    description: SITE.description,
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
   Root Layout
   ============================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { gtmId, sitewideSchema } = siteConfig("en");

  return (
    <html lang="en-AE" className={fontVariables("en")}>
      <body className="font-roboto antialiased">
        {/* RootLayoutClient conditionally renders Header/Footer only on non-Arabic routes */}
        <RootLayoutClient>{children}</RootLayoutClient>

        {/* Page view tracking on client-side route changes */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>

        {/* Global floating WhatsApp button */}
        <FloatingWhatsApp />

        {/* Google Tag Manager — deferred until page fully loads (lazyOnload) */}
        {gtmId && (
          <>
            <Script
              id="gtm-script"
              src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
              strategy="lazyOnload"
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}

        {/* ============================================================
           Sitewide JSON-LD Schema — injected once in root layout
           ============================================================ */}

        {sitewideSchema.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
      </body>
    </html>
  );
}
