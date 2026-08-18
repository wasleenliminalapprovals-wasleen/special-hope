import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { SITE, NAP } from "@/lib/constants";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import AnalyticsLoader from "@/components/analytics/AnalyticsLoader";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import MetaPixelTracker from "@/components/analytics/MetaPixelTracker";
import PopupProvider from "@/components/popup/PopupProvider";
import { ABOUT_SIGNATURE_LAYER, ABOUT_THEME_KEY } from "@/lib/feature-flags";
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
  const { gtmId, metaPixelId, sitewideSchema } = siteConfig("en");

  return (
    <html
      lang="en-AE"
      className={fontVariables("en")}
      suppressHydrationWarning
    >
      {/* ============================================================
          Manual font preloads (critical path).
          Next.js 15.x extracts the next/font @font-face CSS into a shared
          external chunk (fonts.ts is imported by BOTH the EN and AR
          layouts) and therefore emits ZERO <link rel="preload"> tags for
          the font files. We hand-preload every Montserrat/Roboto subset
          the browser fetches to render the LCP hero — verified via the
          Lighthouse critical request chain and .next/static/css/*.css:
            1. Montserrat latin  (904be... — LCP H1, weights 400/700/800/900)
            2. Roboto latin      (1e41be... — body copy, weights 400/500/700)
            3. Roboto greek      (970d71... — extra Roboto subset Chrome fetches)
            4. Roboto extended   (b3f718... — extra Roboto subset Chrome fetches)
          These are content-hashed: if Google Fonts updates the files, run
          `npm run check:fonts` (post-build) to re-derive the hashes.
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
      <link
        rel="preload"
        href="/_next/static/media/970d71e7dcbc144d-s.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/_next/static/media/b3f718d64f9a6dea-s.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <body className="font-roboto antialiased">
        {/* Q1 — About Us cyanotype pre-paint theme (ISOLATED scope addition;
            everything else in this file is untouched). Sets <html data-theme>
            synchronously during HTML parse — before first paint — so a saved
            day theme never flashes to night on /about-us or /ar/about-us.
            Night is the first-visit default (day is opt-in). Path-gated
            internally; also gated by the ABOUT_SIGNATURE_LAYER feature flag
            (Q13). Same localStorage key across locales. */}
        {ABOUT_SIGNATURE_LAYER ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var p=location.pathname;if(p!=="/about-us"&&p!=="/ar/about-us")return;var t="night";try{t=localStorage.getItem(${JSON.stringify(
                ABOUT_THEME_KEY
              )})||"night";}catch(e){}document.documentElement.setAttribute("data-theme",t);})();`,
            }}
          />
        ) : null}
        {/* Early dataLayer init — GTM's gtm.js and @next/third-parties
            sendGTMEvent both rely on window.dataLayer. It must exist before
            any analytics script runs; this tiny inline script executes during
            HTML parse, before hydration and long before the deferred GTM load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer = window.dataLayer || [];",
          }}
        />
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

        {/* Dynamic lead-capture popup — Phase A: 8 rollout service pages only.
            Provider (~3KB) is eager; the popup UI is lazy-loaded via next/dynamic
            only after a trigger fires (see plans/dynamic-popup-implementation-plan.md). */}
        <PopupProvider />

        {/* Third-party analytics (GTM + Meta Pixel) — loaded AFTER LCP via idle
            scheduling instead of lazyOnload (see AnalyticsLoader) to keep
            ~145 KiB of third-party JS off the critical path and reduce Total
            Blocking Time on mobile. GA4 fires through the GTM container only
            (single gtag.js load). Events fired before these load are buffered:
            GTM via the early window.dataLayer init above, Meta via the pending
            queue in lib/meta-pixel.ts (drained by AnalyticsLoader). The
            <noscript> fallbacks below are server-rendered for no-JS browsers. */}
        <AnalyticsLoader gtmId={gtmId} metaPixelId={metaPixelId} />
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {metaPixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
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
