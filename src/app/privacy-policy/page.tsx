/**
 * Privacy Policy — /privacy-policy (English)
 *
 * Trust-grade legal page with a sticky category sidebar, full 16-section
 * policy, "No Third-Party Sharing" pillar, mandatory data tables, and an
 * 8-question FAQ. Optimized for:
 *   - Google / Bing: PrivacyPolicy schema, BreadcrumbList, FAQPage, trust signals
 *   - AI search (Google AI Overviews, ChatGPT, Perplexity): direct-answer
 *     block, stats strip, structured tables, FAQ
 *   - Due-diligence visitors evaluating how their data is handled
 *
 * Schema: PrivacyPolicy + BreadcrumbList + FAQPage
 * (see lib/schema.ts privacyPageSchemaStack). The Organization/NAP entity is
 * injected sitewide by the root layout — NOT duplicated here.
 *
 * @see /plans/privacy-policy-build-plan.md
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { privacyPageSchemaStack } from "@/lib/schema";
import { privacyContent } from "@/data/privacy";
import PrivacyPolicyPage from "@/components/privacy/PrivacyPolicyPage";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: privacyContent.metaTitle,
  description: privacyContent.metaDescription,
  alternates: {
    canonical: `${SITE.url}/privacy-policy`,
    languages: hreflangAlternates(SITE.url, "/privacy-policy"),
  },
  openGraph: {
    title: privacyContent.ogTitle,
    description: privacyContent.ogDescription,
    url: `${SITE.url}/privacy-policy`,
    siteName: SITE.name,
    type: "website",
    locale: "en_AE",
    images: [{ url: `${SITE.url}/logos/og.jpg`, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: privacyContent.ogTitle,
    description: privacyContent.ogDescription,
    images: [`${SITE.url}/logos/og.jpg`],
  },
};

/* ============================================================
   Page Component
   ============================================================ */

export default function PrivacyPolicyPageRoute() {
  /* ── Schema: PrivacyPolicy + BreadcrumbList + FAQPage ── */
  const schemas = privacyPageSchemaStack(
    {
      url: "/privacy-policy",
      title: privacyContent.metaTitle,
      description: privacyContent.metaDescription,
      faqs: privacyContent.faqs,
      dateModified: privacyContent.lastUpdated,
    },
    "en",
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

      <PrivacyPolicyPage content={privacyContent} locale="en" />
    </>
  );
}
