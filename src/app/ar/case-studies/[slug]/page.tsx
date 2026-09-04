/**
 * Arabic Case Study Detail Page — /ar/case-studies/{slug} (AR twin of /case-studies/{slug})
 *
 * mega-plan Part 19 Step 6d. Server shell that mirrors the EN detail template
 * (`src/app/case-studies/[slug]/page.tsx`) in native Arabic, rendering the 13
 * sections in the SAME order with the SAME schema types (mega-plan line 471:
 * "same 13 sections, same order, same schema types (Arabic text in
 * FAQPage/HowTo)"). The Arabic section twins under
 * `src/components/case-studies/ar/` hold their own native H2s, tables and
 * copy — no English leaks onto this page (Part 10.2).
 *
 * Data pairing (Part 3.2 / gate 11.3): each Arabic entry in `caseStudiesArabic`
 * is zipped to its EN twin by shared `slug`. Shared values (sourceRef,
 * authorities, images, dates, projectStatus, related slugs) are read from the
 * EN twin at render time — never duplicated in Arabic. Arabic-only fields come
 * from the Arabic entry (`ar.*`). Pages exist ONLY for slugs present in
 * `caseStudiesArabic` (today: the pilot; grows file-by-file as Steps 7.1–7.17
 * land).
 *
 * Section order (mirrors EN 13-section template):
 *   1 Hero (direct answer + breadcrumb)    8 Planned vs Actual
 *   2 Stats (4 Arabic facts)               9 Results (+ ProTip 2)
 *   3 At a Glance (Arabic table)           [mid CTA — Part 8]
 *   4 Challenge (+ ProTip 1)              10 FAQ (Arabic accordion)
 *   5 Timeline (Arabic milestones)        11 Related
 *   6 Steps (HowTo <ol>)                  12 Final CTA (CTASectionArabic)
 *   7 Documents (table)                   + Schema (JSON-LD, one script each)
 *
 * Schema stack (Part 12 — visible text = schema text, RULE 3):
 * The EN generators in `src/lib/case-studies.ts` read EN `study` fields
 * (projectTitle, faqs, solutionSteps, author, EN image captions), so they
 * CANNOT produce Arabic visible-text parity at locale "ar". This page
 * therefore composes its OWN Arabic stack from the shared `src/lib/schema.ts`
 * primitives — `webPageSchema` / `breadcrumbList` / `faqPageSchema` /
 * `howToSchema` (all accept Arabic FAQItem[]/ProcessStep[] verbatim) — plus an
 * inline Arabic `Article` (headline/author/articleSection from `ar`) and an
 * inline Arabic `ImageObject` for the visible `placement:"photo"` image
 * (caption = `ar.arPhotoCaption`, only when a visible caption exists). Every
 * schema object is emitted as its own `<script type="application/ld+json">`.
 *
 * Metadata (mega-plan line 472-473): H1 Arabic + keyword front-loaded; meta
 * title 50–60 chars Arabic with the `| وسلين للموافقات` brand suffix appended
 * ONCE via `title: { absolute }` (bypasses the /ar layout template — same
 * pattern as the AR hub `src/app/ar/case-studies/page.tsx` and the EN detail).
 *
 * @see plans/case-studies-mega-plan.md Part 5.1 / Part 8 / Part 12 / Part 19 Step 6d
 * @see src/app/case-studies/[slug]/page.tsx — EN detail template (structure mirror)
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { caseStudiesArabic } from "@/data/case-studies-ar";
import { caseStudyUrl } from "@/lib/case-studies";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates, localePrefix } from "@/lib/locale";
import {
  breadcrumbList,
  faqPageSchema,
  howToSchema,
  webPageSchema,
  type BreadcrumbItem,
} from "@/lib/schema";
import {
  AR_CASE_STUDY_HUB_LABEL,
  AR_CASE_STUDY_HUB_PATH,
} from "@/components/case-studies/ar/ar-labels";

/* ── Case-study styles (design tokens, reveal/choreography) ── */
import "@/components/case-studies/case-studies.css";

/* ── Arabic Section Components (Part 19 — Ar* twins of the EN 12 sections) ── */
import ArCaseStudyHero from "@/components/case-studies/ar/ArCaseStudyHero";
import ArCaseStudyPhoto from "@/components/case-studies/ar/ArCaseStudyPhoto";
import ArCaseStudyStats from "@/components/case-studies/ar/ArCaseStudyStats";
import ArCaseStudyAtGlance from "@/components/case-studies/ar/ArCaseStudyAtGlance";
import ArCaseStudyChallenge from "@/components/case-studies/ar/ArCaseStudyChallenge";
import ArCaseStudyTimeline from "@/components/case-studies/ar/ArCaseStudyTimeline";
import ArCaseStudySteps from "@/components/case-studies/ar/ArCaseStudySteps";
import ArCaseStudyDocuments from "@/components/case-studies/ar/ArCaseStudyDocuments";
import ArCaseStudyBeforeAfter from "@/components/case-studies/ar/ArCaseStudyBeforeAfter";
import ArCaseStudyResults from "@/components/case-studies/ar/ArCaseStudyResults";
import ArCaseStudyFaq from "@/components/case-studies/ar/ArCaseStudyFAQ";
import ArCaseStudyRelated from "@/components/case-studies/ar/ArCaseStudyRelated";
import ArCaseStudyCta from "@/components/case-studies/ar/ArCaseStudyCta";

/* ============================================================
   Shared URL building
   ============================================================ */

const BASE = SITE.url.replace(/\/+$/, "");
const AR_PREFIX = localePrefix("ar"); // "/ar"

/* ============================================================
   Static Generation
   ============================================================ */

/** Generate a page for every case study that HAS an Arabic twin. Arabic pages
 *  exist only where Arabic content exists (currently the pilot). */
export function generateStaticParams() {
  return caseStudiesArabic.map((ar) => ({ slug: ar.slug }));
}

/* ============================================================
   Meta helpers (Arabic — no English leaks)
   ============================================================ */

/** Brand suffix — appended once, whole meta title capped at 60 chars. */
const BRAND = `| ${AR.siteShortName}`;

/**
 * Keyword front-loaded Arabic meta title (mega-plan line 473: "| وسلين brand
 * suffix convention"). The brand suffix is never cut: when the keyword
 * overflows it is trimmed at a whole-word boundary to keep the full title
 * ≤ 60 chars.
 */
function buildSeoTitle(keyword: string): string {
  const keywordBudget = 60 - BRAND.length - 1; // room for the joining space
  let part = keyword.trim();
  if (part.length > keywordBudget) {
    const slice = part.slice(0, keywordBudget).trimEnd();
    const boundary = slice.lastIndexOf(" ");
    part = boundary >= 20 ? slice.slice(0, boundary).trimEnd() : slice;
  }
  return `${part} ${BRAND}`.substring(0, 60);
}

/* ============================================================
   Dynamic Metadata
   ============================================================ */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ar = caseStudiesArabic.find((c) => c.slug === slug);
  const study = caseStudies.find((s) => s.slug === slug);
  if (!ar || !study) return {};

  // Arabic keyword first, brand once (absolute bypasses the /ar layout's
  // `%s | وسلين للموافقات` template so it is NOT appended a second time).
  const seoTitle = buildSeoTitle(ar.arPrimaryKeyword || ar.arTitle);
  const description = ar.arDescription;

  const canonical = caseStudyUrl(study.slug, "ar");

  // OG image — the case-study hero placeholder shared with the EN twin.
  const heroImage = study.images[0];
  const ogImage = heroImage
    ? {
        url: heroImage.src,
        width: heroImage.width,
        height: heroImage.height,
        alt: heroImage.alt,
      }
    : {
        url: "/images/OG%20Image%202.jpg",
        width: 1200,
        height: 630,
        alt: ar.arTitle,
      };

  return {
    title: { absolute: seoTitle },
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates(SITE.url, `/ar/case-studies/${study.slug}`),
    },
    openGraph: {
      title: seoTitle,
      description: description.substring(0, 160),
      url: canonical,
      type: "article",
      siteName: AR.siteName,
      publishedTime: study.publishedAt,
      modifiedTime: study.lastUpdated,
      locale: "ar_AE",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: description.substring(0, 160),
      images: [ogImage.url],
    },
  };
}

/* ============================================================
   Page Component
   ============================================================ */

export default async function ArabicCaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ar = caseStudiesArabic.find((c) => c.slug === slug);
  const study = caseStudies.find((s) => s.slug === slug);
  if (!ar || !study) notFound();

  const canonical = caseStudyUrl(study.slug, "ar");

  /* ── Breadcrumbs (visible in hero + BreadcrumbList schema) ──
     NOTE: `crumb()` in lib/schema.ts does NOT locale-prefix item slugs, so
     every Arabic slug below carries the full `/ar` prefix. */
  const breadcrumbs: BreadcrumbItem[] = [
    { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
    { position: 2, name: AR_CASE_STUDY_HUB_LABEL, slug: AR_CASE_STUDY_HUB_PATH },
    {
      position: 3,
      name: ar.arTitle,
      slug: `/ar/case-studies/${study.slug}`,
    },
  ];

  /* ── Arabic Article — inline (lib/case-studies.ts reads EN fields only, so
     the EN generator cannot produce Arabic visible-text parity at "ar"). All
     text below comes from `ar`; dates/images are shared with the EN twin. ── */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: ar.arTitle,
    description: ar.arDescription,
    author: {
      "@type": "Person",
      name: ar.arAuthor.name,
      jobTitle: ar.arAuthor.credential,
      ...(ar.arAuthor.url ? { sameAs: ar.arAuthor.url } : {}),
    },
    reviewedBy: {
      "@type": "Person",
      name: ar.arReviewedBy.name,
      jobTitle: ar.arReviewedBy.credential,
    },
    datePublished: study.publishedAt,
    dateModified: study.lastUpdated,
    ...(study.images.length > 0
      ? { image: study.images.map((img) => `${BASE}${img.src}`) }
      : {}),
    articleSection: ar.arSector,
    keywords: [ar.arPrimaryKeyword, ...ar.arSecondaryKeywords, ar.arSector].join(", "),
    inLanguage: "ar-AE",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    about: { "@id": `${BASE}${AR_PREFIX}/approvals/${study.primaryApprovalSlug}` },
    isPartOf: { "@id": `${BASE}${AR_PREFIX}/#organization` },
    publisher: { "@id": `${BASE}${AR_PREFIX}/#organization` },
  };

  /* ── Arabic schema stack — one JSON-LD script per object (RULE 3). ── */
  const schemas: Record<string, unknown>[] = [
    articleSchema,
    webPageSchema(
      {
        url: canonical,
        title: ar.arPrimaryKeyword || ar.arTitle,
        description: ar.arDescription,
        dateModified: study.lastUpdated,
        aboutRef: `/approvals/${study.primaryApprovalSlug}`,
      },
      "ar",
    ),
    breadcrumbList(breadcrumbs, "ar"),
  ];

  // FAQPage mirrors the visible Arabic FAQ block word-for-word.
  if (ar.arFaqs.length > 0) {
    schemas.push(faqPageSchema(ar.arFaqs, "ar"));
  }

  // HowTo mirrors the visible Arabic Steps (Section 6) list word-for-word.
  if (ar.arSolutionSteps.length > 0) {
    schemas.push(howToSchema(ar.arSolutionSteps, "ar"));
  }

  // ImageObject for the ONE visible post-hero photo. The `src` is shared with
  // the EN twin; the caption is emitted only when an Arabic caption is visible
  // (visible text = schema text — the EN caption must never leak onto /ar).
  const photo = study.images.find((img) => img.placement === "photo");
  if (photo) {
    const contentUrl = `${BASE}${AR_PREFIX}${photo.src.startsWith("/") ? "" : "/"}${photo.src}`;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": `${contentUrl}#image`,
      url: contentUrl,
      contentUrl,
      ...(ar.arPhotoCaption ? { caption: ar.arPhotoCaption } : {}),
      width: photo.width,
      height: photo.height,
      inLanguage: "ar-AE",
    });
  }

  /* ── Render (13 sections, EN Part 5.1 order) ────────────────── */

  return (
    <>
      {/* Schema (Section 13) — RULE 3, one script per object */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Section 1 — Hero / Direct Answer (breadcrumb + Arabic H1 + status chip) */}
      <ArCaseStudyHero study={study} ar={ar} breadcrumbs={breadcrumbs} />

      {/* Section 1.5 — Post-hero real photo (Arabic alt/caption twin) */}
      <ArCaseStudyPhoto study={study} ar={ar} />

      {/* Section 2 — Stats Strip (4 Arabic facts: authority, quoted fee, scope, status) */}
      <ArCaseStudyStats stats={ar.arStats} />

      {/* Section 3 — At a Glance (Arabic table) */}
      <ArCaseStudyAtGlance study={study} ar={ar} />

      {/* Section 4 — The Challenge (+ Arabic ProTip 1) */}
      <ArCaseStudyChallenge ar={ar} />

      {/* Section 5 — Timeline (Arabic milestones) */}
      <ArCaseStudyTimeline study={study} ar={ar} />

      {/* Section 6 — What We Did (Arabic HowTo <ol>) */}
      <ArCaseStudySteps study={study} ar={ar} />

      {/* Section 7 — Documents & Requirements (Arabic table) */}
      <ArCaseStudyDocuments study={study} ar={ar} />

      {/* Section 8 — Planned vs Actual (Arabic before/after table) */}
      <ArCaseStudyBeforeAfter ar={ar} />

      {/* Section 9 — Results (+ Arabic ProTip 2) */}
      <ArCaseStudyResults ar={ar} />

      {/* Mid-page CTA (Part 8 — fires case_study_cta_click position=mid) */}
      <ArCaseStudyCta study={study} ar={ar} position="mid" />

      {/* Section 10 — FAQ (Arabic accordion) */}
      <ArCaseStudyFaq study={study} ar={ar} />

      {/* Section 11 — Related (Arabic cards + approval/guide links) */}
      <ArCaseStudyRelated study={study} />

      {/* Section 12 — Final CTA (reuses CTASectionArabic) */}
      <ArCaseStudyCta study={study} ar={ar} position="end" />
    </>
  );
}
