/**
 * Privacy Policy — /ar/privacy-policy (Arabic)
 *
 * Arabic mirror of /privacy-policy with contextual, native Arabic copy (NOT a
 * word-for-word translation) written for Arabic SEO keywords. RTL layout is
 * inherited from the Arabic root layout (`src/app/ar/layout.tsx`); the sidebar
 * auto-flips to the right via CSS logical properties.
 *
 * Schema: PrivacyPolicy + BreadcrumbList + FAQPage (locale "ar") — see
 * lib/schema.ts privacyPageSchemaStack. The Arabic Organization/NAP entity is
 * injected sitewide by the Arabic root layout — NOT duplicated here.
 *
 * @see /plans/privacy-policy-build-plan.md §5
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { privacyPageSchemaStack } from "@/lib/schema";
import { privacyContentAr } from "@/data/privacy-ar";
import PrivacyPolicyPage from "@/components/privacy/PrivacyPolicyPage";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: privacyContentAr.metaTitle,
  description: privacyContentAr.metaDescription,
  alternates: {
    canonical: `${SITE.url}/ar/privacy-policy`,
    languages: hreflangAlternates(SITE.url, "/ar/privacy-policy"),
  },
  openGraph: {
    title: privacyContentAr.ogTitle,
    description: privacyContentAr.ogDescription,
    url: `${SITE.url}/ar/privacy-policy`,
    siteName: SITE.name,
    type: "website",
    locale: "ar_AE",
    images: [{ url: `${SITE.url}/logos/og.jpg`, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: privacyContentAr.ogTitle,
    description: privacyContentAr.ogDescription,
    images: [`${SITE.url}/logos/og.jpg`],
  },
};

/* ============================================================
   Page Component
   ============================================================ */

export default function ArabicPrivacyPolicyPage() {
  /* ── Schema: PrivacyPolicy + BreadcrumbList + FAQPage (Arabic) ── */
  const schemas = privacyPageSchemaStack(
    {
      url: "/ar/privacy-policy",
      title: privacyContentAr.metaTitle,
      description: privacyContentAr.metaDescription,
      faqs: privacyContentAr.faqs,
      dateModified: privacyContentAr.lastUpdated,
    },
    "ar",
  );

  return (
    <>
      {/* JSON-LD Schema */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PrivacyPolicyPage content={privacyContentAr} locale="ar" />
    </>
  );
}
