import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { SITE, NAP } from "@/lib/constants";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import MetaPixelTracker from "@/components/analytics/MetaPixelTracker";
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
  const { gtmId, gaId, metaPixelId, sitewideSchema } = siteConfig("en");

  return (
    <html lang="en-AE" className={fontVariables("en")}>
      {/* ============================================================
          Manual font preloads (critical path).
          Next.js 15.x extracts the next/font @font-face CSS into a shared
          external chunk (fonts.ts is imported by BOTH the EN and AR
          layouts) and therefore emits ZERO <link rel="preload"> tags for
          the font files. To recover the font download head-start, we
          hand-preload the latin-subset variable-font files that cover the
          LCP H1 (Montserrat 700) and body copy (Roboto 400). These are
          content-hashed: if Google Fonts updates the files, the hashes
          below must be re-derived from .next/static/css/*.css.
          ============================================================ */}
      <link
        rel="preload"
        href="/_next/static/media/904be59b21bd51cb-s.p.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/_next/static/media/1e41be92c43b3255-s.p.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <body className="font-roboto antialiased">
        {/* RootLayoutClient conditionally renders Header/Footer only on non-Arabic routes */}
        <RootLayoutClient>{children}</RootLayoutClient>

        {/* Page view tracking on client-side route changes */}
        <Suspense fallback={null}>
          <PageViewTracker />
          {/* Meta Pixel tracking (PageView every route + ViewContent on content routes) */}
          <MetaPixelTracker />
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

        {/* GA4 Direct Google Tag — for Google Analytics cross-page detection.
            lazyOnload (same as GTM) so Next.js does NOT emit a
            <link rel="preload" as="script"> for gtag.js in <head>,
            removing a third-party round-trip from the critical path. */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel — loader + fbq('init', META_PIXEL_ID).
            lazyOnload (same as GTM/GA4) to keep fbevents.js off the critical
            path. NOTE: no inline fbq('track','PageView') here — MetaPixelTracker
            fires exactly one PageView per route (Meta's documented SPA pattern). */}
        {metaPixelId && (
          <>
            <Script id="meta-pixel-init" strategy="lazyOnload">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
              `}
            </Script>
            {/* Non-JS fallback — fires a single PageView pixel request only for browsers without JS */}
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
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
