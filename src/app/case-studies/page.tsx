/**
 * Case Studies Hub — /case-studies (EN)
 *
 * Part 19 hub shell (plans/case-studies-mega-plan.md §19.3 — Z0..Z11).
 *
 * Renders the project-register hub as a single server shell:
 *   Z1  brand-blue hero with mono eyebrow + direct-answer sentence (GEO)
 *   Z2  HubAggregateBand — four aggregate tiles (owner-set 2026-09-02 totals)
 *   Z4  HubFreshnessStrip (server) — top-4 recently updated entries
 *   Z3+Z5/Z6+Z8  CaseStudyHub (client) — authority rail, register grid,
 *       amber pattern-break CTA tile, smart empty state
 *   Z7  HubRelatedSidebar (server) — right-hand related rail, sticky on lg
 *   Z10 HubFaq (server) — hub-level FAQ (visible text = FAQPage schema)
 *   CTASection
 *
 * Register row-count, freshness and FAQ derive from `caseStudies` at build
 * time (Part 19 §19.6). Exception (owner directive 2026-09-02): the Z2 band
 * shows fixed company-wide marketing totals (500+ scoped, 17+ authorities,
 * 8.9 Million+ quoted value, 9 areas) and the register presents every file
 * as "Approved / Completed" — the real per-entry status is preserved in the
 * data for the detail pages. The same `faqs` array built by `buildHubFaqs`
 * feeds both the visible `<HubFaq>` and the `FAQPage` schema, so visible
 * text equals schema text word-for-word (Part 12 gate).
 *
 * Schema stack: WebPage + BreadcrumbList + FAQPage — one JSON-LD script
 * per object (RULE 3).
 *
 * @see plans/case-studies-mega-plan.md §19
 */

import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies } from "@/data/case-studies";
import { SITE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import {
  aggregateHubStats,
  CASE_STUDIES_HUB_PATH,
} from "@/lib/case-studies";
import { breadcrumbList, faqPageSchema, webPageSchema } from "@/lib/schema";
import CaseStudyHub from "@/components/case-studies/CaseStudyHub";
import HubAggregateBand from "@/components/case-studies/HubAggregateBand";
import HubFreshnessStrip from "@/components/case-studies/HubFreshnessStrip";
import type { HubFreshnessItem } from "@/components/case-studies/HubFreshnessStrip";
import HubRelatedSidebar from "@/components/case-studies/HubRelatedSidebar";
import HubFaq, { buildHubFaqs } from "@/components/case-studies/HubFaq";
import CTASection from "@/components/sections/CTASection";
import "@/components/case-studies/case-studies.css";

/** en-GB, UTC-stable date (mirrors the freshness-strip / card formatter). */
function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Dynamic metadata — live count, never hardcoded (Part 19 §19.6). */
export function generateMetadata(): Metadata {
  const count = caseStudies.length;
  const title = `Case Studies | ${count} Real Dubai Approval Projects | Wasleen`;
  const description = `See ${count} real Dubai approval projects with exact fees, timelines and documents \u2014 DCD, DM, DEWA and more. Get a file-stamped quote for your project today.`;

  return {
    // `absolute` bypasses the root layout's `%s | Wasleen Approvals` template
    // so the brand is NOT appended twice (same pattern as about-us/page.tsx).
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${SITE.url}${CASE_STUDIES_HUB_PATH}`,
      languages: hreflangAlternates(SITE.url, CASE_STUDIES_HUB_PATH),
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${CASE_STUDIES_HUB_PATH}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function CaseStudiesHubPage() {
  /* Freshness — real dates only; derives from the data, never fabricated.
     The data module always exports ≥1 study, so `lastUpdated` is always a
     real ISO date in practice. */
  const sortedDates = caseStudies.map((s) => s.lastUpdated).sort();
  const lastUpdated = sortedDates[sortedDates.length - 1] ?? "";

  /* Z2 — build-time aggregates (Part 19 §19.6, §19.12 defaults: register
     lists every entry in the data array — no publishStatus gate). */
  const stats = aggregateHubStats(caseStudies);
  const authorityCount = stats.authorities.length;
  const areaCount = stats.areas.length;

  /* Z4 — top-4 recently updated entries, pre-sorted for the freshness strip. */
  const recent = [...caseStudies]
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
    .slice(0, 4)
    .map<HubFreshnessItem>((study) => ({
      slug: study.slug,
      projectTitle: study.projectTitle,
      sourceRef: study.sourceRef,
      lastUpdated: study.lastUpdated,
      /* Owner directive (2026-09-02): the hub presents every register file as
         Approved / Completed. Real per-entry status stays in the data for the
         detail pages; this keeps the strip glyphs coherent with the cards. */
      projectStatus: "completed",
    }));

  /* Z10 — hub FAQ; the SAME array feeds visible <HubFaq> and FAQPage schema. */
  const faqs = buildHubFaqs(formatDate(lastUpdated));

  const schemas = [
    webPageSchema({
      url: CASE_STUDIES_HUB_PATH,
      title: `Case Studies | ${caseStudies.length} Real Dubai Approval Projects`,
      description: `See ${caseStudies.length} real Dubai approval projects with exact fees, timelines and documents \u2014 DCD, DM, DEWA and more.`,
      dateModified: lastUpdated,
    }),
    breadcrumbList([
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Case Studies", slug: CASE_STUDIES_HUB_PATH },
    ]),
    faqPageSchema(faqs),
  ];

  return (
    <>
      {/* RULE 3 — one JSON-LD script per object */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ===== Z0 Blueprint-watermark wrapper + Z1 Hero ===== */}
      <section className="cs-hub-bg">
        <section className="bg-brand-blue text-white">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
            <p className="font-mono text-caption uppercase tracking-widest text-white/60">
              Project register
            </p>
            <h1 className="mb-3 mt-2 font-montserrat text-h1 font-bold">
              Dubai Approval Case Studies
            </h1>
            <p className="max-w-3xl text-body-lg text-white/80">
              {caseStudies.length} real Dubai approval projects managed by
              Wasleen Approvals across {authorityCount} authorities. Every file
              shows the quoted fee, the documents submitted and the actual
              outcome — clients stay anonymous unless they gave written
              consent.
            </p>
            {lastUpdated && (
              <p className="mt-2 font-mono text-body-sm text-white/60">
                Register last reviewed: {formatDate(lastUpdated)} ·{" "}
                {caseStudies.length} files · {areaCount} areas
              </p>
            )}
          </div>
        </section>

        <div className="cs-hub-main mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
          {/* ===== Z2 Aggregate stat band ===== */}
          <HubAggregateBand />

          {/* ===== Z4 + Z3/Z5/Z6/Z8 register + Z7 related rail ===== */}
          <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10">
            <div className="min-w-0">
              <HubFreshnessStrip recent={recent} />
              <CaseStudyHub />
            </div>
            <aside className="mt-8 lg:sticky lg:top-24 lg:mt-0">
              <HubRelatedSidebar />
            </aside>
          </div>

          {/* ===== Register evidence image (owner add 2026-09-02) ===== */}
          <figure className="mt-8 overflow-hidden rounded-md border border-border-light bg-white p-3 shadow-card">
            <Image
              src="/images/trade-license-approval-dubai-business-activity.webp"
              alt="Trade license approval documents for a new business activity in Dubai"
              width={1376}
              height={768}
              sizes="(min-width: 1024px) 76rem, 100vw"
              loading="lazy"
              className="h-auto w-full rounded-sm"
            />
          </figure>

          {/* ===== Z10 Hub-level FAQ + authority links ===== */}
          <div className="mt-8">
            <HubFaq faqs={faqs} />
          </div>
        </div>

        {/* ===== Bottom CTA ===== */}
        <CTASection />
      </section>
    </>
  );
}
