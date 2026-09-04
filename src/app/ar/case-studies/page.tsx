/**
 * Arabic Case Studies Hub — /ar/case-studies (AR twin of /case-studies)
 *
 * mega-plan Part 19 Step 6c. Server shell that mirrors the EN hub
 * (`src/app/case-studies/page.tsx`, Z0..Z11) in native Arabic:
 *   Z1  brand-blue hero — Arabic eyebrow + hub H1 + GEO direct-answer sentence
 *   Z2  ArHubAggregateBand — fixed company-wide marketing totals (owner-set)
 *   Z4  ArHubFreshnessStrip (server) — top-4 recently updated AR entries
 *   Z3/Z5/Z6/Z8  ArCaseStudyHub (client) — authority rail, register grid,
 *       amber CTA tile, smart empty state — fed the `{study, ar}` twin pairs
 *   Z7  ArHubRelatedSidebar (server) — Arabic related-resources rail, sticky
 *   Z10 ArHubFaq (server) — hub FAQ (visible text = FAQPage schema)
 *   CTASectionArabic
 *
 * Register policy (mirrors the EN contract — EN page line 99): the register
 * lists EVERY entry in `caseStudiesArabic` — no publishStatus gate (only
 * `live` entries feed sitemap / llms.txt; the hub itself presents all files
 * as "معتمد / مكتمل" per the owner directive 2026-09-02, while the real
 * per-entry status stays in the data for the detail pages).
 *
 * Each AR entry is zipped by shared `slug` with its EN twin so shared values
 * (sourceRef, authorities, location, dates, projectStatus) are read from the
 * EN twin once — never duplicated in Arabic. The Arabic data currently holds
 * the pilot; the register grows file-by-file as Steps 7.1–7.17 land, so every
 * count below derives from the pairs at build time (never hardcoded).
 *
 * RTL conventions: the main + aside two-column grid is DOM-ordered (main first)
 * so CSS grid auto-flips it for RTL — main occupies the inline-start column
 * and the 300px related rail sits on the inline-end, mirroring EN. All Arabic
 * copy is native (Part 10.2); `font-mono`/`uppercase`/`tracking-*` are omitted
 * for Arabic text — only the Latin `sourceRef` keeps mono inside the child
 * components. Heading font stays `font-montserrat`.
 *
 * Schema stack: WebPage + BreadcrumbList + FAQPage (locale "ar") — one
 * JSON-LD script per object (RULE 3). The FAQPage schema text equals the
 * visible `<ArHubFaq>` text word-for-word (same `faqs` array from
 * `buildArHubFaqs`).
 *
 * @see plans/case-studies-mega-plan.md Part 19 / Step 6c
 * @see src/app/case-studies/page.tsx — EN hub shell
 */

import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies } from "@/data/case-studies";
import { caseStudiesArabic } from "@/data/case-studies-ar";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { breadcrumbList, faqPageSchema, webPageSchema } from "@/lib/schema";
import ArCaseStudyHub, {
  type ArCaseStudyPair,
} from "@/components/case-studies/ar/ArCaseStudyHub";
import ArHubAggregateBand from "@/components/case-studies/ar/ArHubAggregateBand";
import ArHubFreshnessStrip from "@/components/case-studies/ar/ArHubFreshnessStrip";
import type { ArHubFreshnessItem } from "@/components/case-studies/ar/ArHubFreshnessStrip";
import ArHubRelatedSidebar from "@/components/case-studies/ar/ArHubRelatedSidebar";
import ArHubFaq, {
  buildArHubFaqs,
} from "@/components/case-studies/ar/ArHubFaq";
import {
  AR_CASE_STUDY_HERO_EYEBROW,
  AR_CASE_STUDY_HUB_LABEL,
  AR_CASE_STUDY_HUB_PATH,
  formatArabicDate,
} from "@/components/case-studies/ar/ar-labels";
import CTASectionArabic from "@/components/sections/CTASectionArabic";
import "@/components/case-studies/case-studies.css";

/** Simple Arabic pluralisation — 1 stays singular, everything else plural
 *  (matches the shipped `/ar/approvals` hub style: "{n} موافقات"). */
function pluralise(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

/**
 * Zip every Arabic entry to its EN twin by shared slug. Shared values are
 * read from the EN twin; unmatched AR entries are dropped (they have no EN
 * twin to supply the shared sourceRef/authorities/dates — none exist today).
 */
function buildPairs(): ArCaseStudyPair[] {
  return caseStudiesArabic
    .map((ar) => {
      const study = caseStudies.find((s) => s.slug === ar.slug);
      return study ? { study, ar } : null;
    })
    .filter((pair): pair is ArCaseStudyPair => pair !== null);
}

/** Dynamic metadata — live count, never hardcoded (mirrors the EN hub). */
export function generateMetadata(): Metadata {
  const count = caseStudiesArabic.length;
  const countPhrase =
    count === 1 ? "مشروع اعتماد حقيقي واحد" : `${count} مشاريع اعتماد حقيقية`;
  // `absolute` bypasses the /ar layout's brand template so the brand is NOT
  // appended twice (same pattern as the other Arabic hub pages).
  const title = `دراسات الحالة | ${countPhrase} في دبي | ${AR.siteShortName}`;
  const description = `اطّلع على ${countPhrase} في دبي: الرسوم المقتبسة والمستندات المقدمة والمدد الفعلية عبر DCD و DM و DDA وديوا. اطلب عرض سعر مختوم لمشروعك اليوم.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${SITE.url}${AR_CASE_STUDY_HUB_PATH}`,
      languages: hreflangAlternates(SITE.url, AR_CASE_STUDY_HUB_PATH),
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${AR_CASE_STUDY_HUB_PATH}`,
      type: "website",
      locale: "ar_AE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ArabicCaseStudiesHubPage() {
  /* Zipping Arabic entries to EN twins + build-time register numbers. */
  const pairs = buildPairs();
  const registerCount = pairs.length;

  const authorityCount = new Set(
    pairs.flatMap((pair) => pair.study.authorities),
  ).size;
  const areaCount = new Set(
    pairs.map((pair) => pair.study.location).filter(Boolean),
  ).size;

  /* Freshness — real dates only; derives from the EN twin dates. The Arabic
     data module always holds ≥1 entry whose EN twin carries a real date. */
  const sortedDates = pairs.map((pair) => pair.study.lastUpdated).sort();
  const lastUpdated = sortedDates[sortedDates.length - 1] ?? "";

  /* Z4 — top-4 recently updated entries, pre-sorted for the freshness strip.
     Owner directive (2026-09-02): the hub presents every register file as
     Approved / Completed — real status stays in the data for detail pages. */
  const recent = [...pairs]
    .sort((a, b) => b.study.lastUpdated.localeCompare(a.study.lastUpdated))
    .slice(0, 4)
    .map<ArHubFreshnessItem>((pair) => ({
      slug: pair.study.slug,
      projectTitle: pair.ar.arTitle,
      sourceRef: pair.study.sourceRef,
      lastUpdated: pair.study.lastUpdated,
      projectStatus: "completed",
    }));

  /* Z10 — Arabic hub FAQ; the SAME array feeds visible <ArHubFaq> and the
     FAQPage schema, so visible text equals schema text word-for-word. */
  const faqs = buildArHubFaqs(
    lastUpdated ? formatArabicDate(lastUpdated) : "",
  );

  const schemas = [
    webPageSchema(
      {
        url: AR_CASE_STUDY_HUB_PATH,
        title: `دراسات الحالة في دبي | سجل مشاريع اعتماد حقيقية`,
        description:
          "سجل مشاريع اعتماد حقيقية في دبي أدارتها وسلين للموافقات: الرسوم المقتبسة والمستندات المقدمة والمدد الفعلية عبر DCD و DM و DDA وديوا.",
        dateModified: lastUpdated,
      },
      "ar"
    ),
    breadcrumbList(
      [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        {
          position: 2,
          name: AR_CASE_STUDY_HUB_LABEL,
          slug: AR_CASE_STUDY_HUB_PATH,
        },
      ],
      "ar"
    ),
    faqPageSchema(faqs, "ar"),
  ];

  const projectPhrase =
    registerCount === 1
      ? "مشروع اعتماد حقيقي واحد"
      : `${registerCount} مشاريع اعتماد حقيقية`;
  const filesWord = pluralise(registerCount, "ملف", "ملفات");
  const areasWord = pluralise(areaCount, "منطقة", "مناطق");
  const authoritiesWord = pluralise(authorityCount, "جهة", "جهات");

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
            <p className="text-caption font-semibold text-white/60">
              {AR_CASE_STUDY_HERO_EYEBROW}
            </p>
            <h1 className="mb-3 mt-2 font-montserrat text-h1 font-bold">
              {AR_CASE_STUDY_HUB_LABEL}
            </h1>
            <p className="max-w-3xl text-body-lg text-white/80">
              يشمل هذا السجل {projectPhrase} في دبي أدارته وسلين للموافقات عبر{" "}
              {authorityCount} {authoritiesWord}. يعرض كل ملف الرسوم المقتبسة
              والمستندات المقدمة والمدّة الفعلية والنتيجة — وتبقى هوية العميل
              سرّية ما لم يمنح موافقة خطية على النشر.
            </p>
            {lastUpdated && (
              <p className="mt-2 text-body-sm text-white/60">
                آخر مراجعة للسجل: {formatArabicDate(lastUpdated)} ·{" "}
                {registerCount} {filesWord} · {areaCount} {areasWord}
              </p>
            )}
          </div>
        </section>

        <div className="cs-hub-main mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
          {/* ===== Z2 Aggregate stat band (fixed company-wide totals) ===== */}
          <ArHubAggregateBand />

          {/* ===== Z4 + Z3/Z5/Z6/Z8 register + Z7 related rail ===== */}
          <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10">
            <div className="min-w-0">
              <ArHubFreshnessStrip recent={recent} />
              <ArCaseStudyHub pairs={pairs} />
            </div>
            {/* Sticky rail — ArHubRelatedSidebar already emits its own
                <aside>, so a <div> wrapper avoids nesting two asides. */}
            <div className="mt-8 lg:sticky lg:top-24 lg:mt-0">
              <ArHubRelatedSidebar />
            </div>
          </div>

          {/* ===== Register evidence image (owner add 2026-09-02) ===== */}
          <figure className="mt-8 overflow-hidden rounded-md border border-border-light bg-white p-3 shadow-card">
            <Image
              src="/images/trade-license-approval-dubai-business-activity.webp"
              alt="مستندات موافقة السجل التجاري لنشاط تجاري جديد في دبي"
              width={1376}
              height={768}
              sizes="(min-width: 1024px) 76rem, 100vw"
              loading="lazy"
              className="h-auto w-full rounded-sm"
            />
          </figure>

          {/* ===== Z10 Hub-level FAQ + authority links ===== */}
          <div className="mt-8">
            <ArHubFaq faqs={faqs} />
          </div>
        </div>

        {/* ===== Bottom CTA ===== */}
        <CTASectionArabic />
      </section>
    </>
  );
}
