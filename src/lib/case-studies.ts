/**
 * Case Studies — Schema Generators + Analytics Helpers + Hub Grouping
 *
 * The ONE new library file for the Case Studies mega-plan (Part 0.6 /
 * addendum A.3 — "No parallel lib files — this is locked"). It contains:
 *
 *   1. JSON-LD schema generators (Part 12) — `Article` (author + reviewedBy,
 *      `about` → parent approval page, `isPartOf` Organization), `ImageObject`
 *      per image, and a `caseStudySchemaStack()` convenience that reuses the
 *      shared `webPageSchema` / `faqPageSchema` / `howToSchema` /
 *      `breadcrumbList` generators from `src/lib/schema.ts` (imported
 *      READ-ONLY — mirrors `src/lib/blog-schema.ts`).
 *   2. Analytics helpers (Part 9.1) — thin wrappers around `trackEvent()` from
 *      `src/lib/analytics.ts`. NEVER call `sendGTMEvent` directly. Every event
 *      below is registered in the taxonomy FIRST
 *      (`reference details/analytics-tracking.md` §4.1).
 *   3. Hub grouping / filtering utilities (Part 10) — client-side facets only.
 *
 * All entities connect to the sitewide `#organization` / `#website` refs
 * (master rule §5). NAP comes from `src/lib/constants.ts` — never hardcoded.
 *
 * @see plans/case-studies-mega-plan.md Part 12 — Schema stack
 * @see plans/case-studies-mega-plan.md Part 9.1 — Analytics taxonomy
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md
 */

import { SITE } from "@/lib/constants";
import { localePrefix } from "@/lib/locale";
import { trackEvent } from "@/lib/analytics";
import {
  webPageSchema,
  faqPageSchema,
  howToSchema,
  breadcrumbList,
  type BreadcrumbItem,
} from "@/lib/schema";
import type {
  ApprovalCaseStudy,
  CaseStudyArabicContent,
  CaseStudyFacet,
  CaseStudyFilterOption,
  CaseStudyImage,
} from "@/types/case-study";

/* ── shared helpers ───────────────────────────────────────── */

const BASE = SITE.url.replace(/\/+$/, "");

/** EN hub path — new additive route (`HUB_SLUGS` is untouched). */
export const CASE_STUDIES_HUB_PATH = "/case-studies";

/** Absolute URL for any case-study route (hub or detail). */
export function caseStudyUrl(slug: string, locale: "en" | "ar" = "en"): string {
  const lp = localePrefix(locale);
  return `${BASE}${lp}${CASE_STUDIES_HUB_PATH}${slug ? `/${slug}` : ""}`;
}

/* ============================================================
   PART 12 — SCHEMA GENERATORS
   ============================================================ */

/**
 * ImageObject schema — one per real image.
 * `contentUrl` points at the published WebP; `caption` is emitted only when a
 * visible caption exists (visible text = schema text rule).
 */
export function caseStudyImageObjectSchema(
  image: CaseStudyImage,
  locale: "en" | "ar" = "en",
) {
  const lp = localePrefix(locale);
  const contentUrl = `${BASE}${lp}${image.src.startsWith("/") ? "" : "/"}${image.src}`;
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${contentUrl}#image`,
    url: contentUrl,
    contentUrl,
    ...(image.caption ? { caption: image.caption } : {}),
    width: image.width,
    height: image.height,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
  };
}

export interface CaseStudyArticleSchemaInput {
  /** The case study being rendered (EN twin object). */
  study: ApprovalCaseStudy;
  /** Canonical URL or absolute path (e.g. "/case-studies/{slug}"). */
  url: string;
  /** Title used for the WebPage node (usually `seoTitle`). */
  title: string;
  /** Meta description (140-160 chars, one number + CTA). */
  description: string;
}

/**
 * Article schema — the core node for a case-study page (Part 12).
 *
 * - `author` + `reviewedBy` come from data (inline `Person`, never fabricated).
 * - `about` references the parent approval page
 *   (`/approvals/{primaryApprovalSlug}`) — the authoritative Service entity
 *   that describes the approval. Referencing the page URL (rather than
 *   reconstructing the Service `@id` hash, which depends on the approval
 *   `name`) guarantees the `@id` always resolves to an existing entity in the
 *   approval page's schema graph, and keeps this lib free of the full
 *   approvals dataset (page-weight budget).
 * - `isPartOf` → sitewide `#organization` (per Part 12).
 */
export function caseStudyArticleSchema(
  input: CaseStudyArticleSchemaInput,
  locale: "en" | "ar" = "en",
) {
  const lp = localePrefix(locale);
  const fullUrl = input.url.startsWith("http") ? input.url : `${BASE}${input.url}`;
  const study = input.study;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${fullUrl}#article`,
    headline: study.projectTitle,
    description: input.description,
    author: {
      "@type": "Person",
      name: study.author.name,
      jobTitle: study.author.credential,
      ...(study.author.url ? { sameAs: study.author.url } : {}),
    },
    reviewedBy: {
      "@type": "Person",
      name: study.reviewedBy.name,
      jobTitle: study.reviewedBy.credential,
    },
    datePublished: study.publishedAt,
    dateModified: study.lastUpdated,
    ...(study.images.length > 0
      ? { image: study.images.map((img) => `${BASE}${img.src}`) }
      : {}),
    articleSection: study.sector,
    keywords: study.authorities.join(", "),
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
    about: { "@id": `${BASE}${lp}/approvals/${study.primaryApprovalSlug}` },
    isPartOf: { "@id": `${BASE}${lp}/#organization` },
    publisher: { "@id": `${BASE}${lp}/#organization` },
  };
}

export interface CaseStudySchemaStackInput {
  /** The case study being rendered (EN twin object). */
  study: ApprovalCaseStudy;
  /** Canonical URL or absolute path (e.g. "/case-studies/{slug}"). */
  url: string;
  /** Title used for the WebPage node (usually `seoTitle`). */
  title: string;
  /** Meta description (140-160 chars, one number + CTA). */
  description: string;
  /** Home > Case Studies > This (3 items). */
  breadcrumbs: BreadcrumbItem[];
}

/**
 * Full schema stack for a case-study page (Part 12):
 *   Article + WebPage + (FAQPage?) + (HowTo?) + BreadcrumbList + ImageObject*
 *
 * Returns an array of schema objects ready for stringification (the site's
 * RULE 3 pattern — one `<script type="application/ld+json">` per object).
 * FAQPage / HowTo are emitted only when the section content exists, so visible
 * text stays byte-for-byte identical to schema text.
 */
export function caseStudySchemaStack(
  input: CaseStudySchemaStackInput,
  locale: "en" | "ar" = "en",
): Record<string, unknown>[] {
  const study = input.study;
  const schemas: Record<string, unknown>[] = [
    caseStudyArticleSchema(
      {
        study,
        url: input.url,
        title: input.title,
        description: input.description,
      },
      locale,
    ),
    webPageSchema(
      {
        url: input.url,
        title: input.title,
        description: input.description,
        dateModified: study.lastUpdated,
        aboutRef: `/approvals/${study.primaryApprovalSlug}`,
      },
      locale,
    ),
    breadcrumbList(input.breadcrumbs, locale),
  ];

  if (study.faqs.length > 0) {
    schemas.push(faqPageSchema(study.faqs, locale));
  }

  if (study.solutionSteps.length > 0) {
    schemas.push(howToSchema(study.solutionSteps, locale));
  }

  for (const image of study.images) {
    schemas.push(caseStudyImageObjectSchema(image, locale));
  }

  return schemas;
}

/* ============================================================
   PART 9.1 — ANALYTICS HELPERS (taxonomy §4.1, registered first)
   All calls go through `trackEvent()` — never `sendGTMEvent` directly.
   ============================================================ */

export interface CaseStudyEventBase {
  case_slug: string;
}

/**
 * `case_study_view` — engagement — fires when the hero enters view / 50% scroll.
 * Params: `case_slug`, `authority`.
 */
export function trackCaseStudyView({ case_slug, authority }: CaseStudyEventBase & { authority: string }): void {
  trackEvent({
    action: "case_study_view",
    category: "engagement",
    label: `Case study viewed: ${case_slug}`,
    case_slug,
    authority,
  });
}

/**
 * `case_study_diagram_interact` — engagement — fires on timeline node
 * click/expand. Params: `case_slug`, `node`.
 */
export function trackCaseStudyDiagramInteract({ case_slug, node }: CaseStudyEventBase & { node: string }): void {
  trackEvent({
    action: "case_study_diagram_interact",
    category: "engagement",
    label: `Timeline node: ${node} (${case_slug})`,
    case_slug,
    node,
  });
}

/**
 * `case_study_pro_tip_view` — engagement — fires when a Pro Tip enters the
 * viewport. Params: `case_slug`, `tip`.
 */
export function trackCaseStudyProTipView({ case_slug, tip }: CaseStudyEventBase & { tip: string }): void {
  trackEvent({
    action: "case_study_pro_tip_view",
    category: "engagement",
    label: `Pro tip: ${tip} (${case_slug})`,
    case_slug,
    tip,
  });
}

/**
 * `case_study_faq_open` — engagement — fires when an FAQ item opens.
 * Params: `case_slug`, `question`.
 */
export function trackCaseStudyFaqOpen({ case_slug, question }: CaseStudyEventBase & { question: string }): void {
  trackEvent({
    action: "case_study_faq_open",
    category: "engagement",
    label: `FAQ opened: ${question} (${case_slug})`,
    case_slug,
    question,
  });
}

/**
 * `case_study_filter` — engagement — fires when a hub filter is applied.
 * Params: `facet`, `filter_value` (renamed from `value` because the shared
 * `AnalyticsEvent.value` field is typed `number` — see taxonomy §4.1).
 */
export function trackCaseStudyFilter({
  facet,
  value: filterValue,
}: {
  facet: CaseStudyFacet;
  value: string;
}): void {
  trackEvent({
    action: "case_study_filter",
    category: "engagement",
    label: `Filter ${facet}: ${filterValue}`,
    facet,
    filter_value: filterValue,
  });
}

/**
 * `case_study_cta_click` — conversion — fires on any free-quote CTA.
 * Params: `case_slug`, `position` (hero | mid | end).
 */
export function trackCaseStudyCtaClick({ case_slug, position }: CaseStudyEventBase & { position: string }): void {
  trackEvent({
    action: "case_study_cta_click",
    category: "conversion",
    label: `CTA (${position}) — ${case_slug}`,
    case_slug,
    position,
  });
}

/**
 * `case_study_related_click` — navigation — fires when a related card/link is
 * clicked. Params: `case_slug`, `target` (the related URL/slug).
 */
export function trackCaseStudyRelatedClick({ case_slug, target }: CaseStudyEventBase & { target: string }): void {
  trackEvent({
    action: "case_study_related_click",
    category: "navigation",
    label: `Related → ${target} (${case_slug})`,
    case_slug,
    target,
  });
}

/* ============================================================
   PART 10 — HUB GROUPING / FILTERING (client-side only)
   ============================================================ */

/** Human labels for the `status` facet values. */
export const CASE_STUDY_STATUS_LABELS: Record<ApprovalCaseStudy["projectStatus"], string> = {
  quoted: "Quote only",
  "in-progress": "In progress",
  completed: "Approved / Completed",
};

/** Human labels for facet names (used for filter UI / aria). */
export const CASE_STUDY_FACET_LABELS: Record<CaseStudyFacet, string> = {
  authority: "Authority",
  sector: "Sector",
  projectType: "Project type",
  status: "Status",
  location: "Location",
};

/**
 * Build unique filter options from the visible case-study set.
 * `authority` expands each study's `authorities[]` array; every other facet is
 * a single value per study. Options are deduplicated and sorted alphabetically.
 */
export function buildCaseStudyFilterOptions(
  caseStudies: ApprovalCaseStudy[],
): CaseStudyFilterOption[] {
  const options: CaseStudyFilterOption[] = [];

  for (const study of caseStudies) {
    for (const authority of study.authorities) {
      options.push({ facet: "authority", value: authority, label: authority });
    }
    options.push({ facet: "sector", value: study.sector, label: study.sector });
    options.push({ facet: "projectType", value: study.projectType, label: study.projectType });
    options.push({
      facet: "status",
      value: study.projectStatus,
      label: CASE_STUDY_STATUS_LABELS[study.projectStatus],
    });
    options.push({ facet: "location", value: study.location, label: study.location });
  }

  const seen = new Set<string>();
  const unique: CaseStudyFilterOption[] = [];
  for (const option of options) {
    const key = `${option.facet}::${option.value}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(option);
    }
  }

  return unique.sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Apply active hub filters to the visible case-study set.
 * An empty/`null` value on a facet means "all". `authority` matches against the
 * `authorities[]` array; `status` matches `projectStatus`; all others match the
 * exact field value.
 */
export function filterCaseStudies(
  caseStudies: ApprovalCaseStudy[],
  activeFilters: Partial<Record<CaseStudyFacet, string | null>>,
): ApprovalCaseStudy[] {
  return caseStudies.filter((study) => {
    for (const [facet, value] of Object.entries(activeFilters) as [
      CaseStudyFacet,
      string | null,
    ][]) {
      if (!value) continue;
      if (facet === "authority") {
        if (!study.authorities.includes(value)) return false;
      } else if (facet === "status") {
        if (study.projectStatus !== value) return false;
      } else if (study[facet] !== value) {
        return false;
      }
    }
    return true;
  });
}

/* ============================================================
   LLMS.TXT MANIFEST BUILDERS (Step 8 — append-only)
   ============================================================
   Generates the case-study section for the AI manifests. Only
   `publishStatus: "live"` entries are emitted (per the existing
   rule at src/data/blog-posts.ts:12-18). These helpers are the
   sanctioned way to append LIVE case-study URLs to the llms
   route handlers WITHOUT touching src/lib/geo.ts (addendum A.2).
   ============================================================ */

/**
 * llms.txt — index section: one bullet per live case study, matching the
 * one-liner style used by `buildLlmsIndex` in src/lib/geo.ts.
 */
export function buildCaseStudiesLlmsIndex(
  allCaseStudies: ApprovalCaseStudy[]
): string {
  const live = allCaseStudies.filter((s) => s.publishStatus === "live");
  if (live.length === 0) return "";

  const lines: string[] = [];
  lines.push(`## Case Studies — ${live.length} page${live.length === 1 ? "" : "s"}`);
  lines.push("");
  /* Owner decision 2026-09-03 — the main /case-studies hub is listed in
     llms.txt as the section's first entry, before the per-page bullets. */
  lines.push(
    `- [Dubai Approval Case Studies](/case-studies): Hub — register of ${live.length} real Dubai approval projects managed by Wasleen Approvals with quoted fees, documents submitted, authorities and outcomes.`
  );

  for (const study of live) {
    const snippet = study.directAnswer.split(".")[0].trim() + ".";
    lines.push(
      `- [${study.projectTitle}](/case-studies/${study.slug}): ${snippet}`
    );
  }
  lines.push("");

  return lines.join("\n");
}

/**
 * llms-full.txt — full per-page block per live case study, mirroring the
 * structure used by `buildLlmsFull` (Direct Answer → At a Glance → Process
 * Steps → FAQ), so AI agents get the same extraction-grade detail.
 */
export function buildCaseStudiesLlmsFull(
  allCaseStudies: ApprovalCaseStudy[]
): string {
  const live = allCaseStudies.filter((s) => s.publishStatus === "live");
  if (live.length === 0) return "";

  const blocks: string[] = [];

  /* Hub block — owner decision 2026-09-03: the /case-studies hub (the main
     register page) is included in llms-full.txt ahead of the per-page blocks.
     Register entries mirror the data honestly (location, authorities, quoted
     fee, claim-level status); no fabricated outcomes are added. */
  const authorities = [...new Set(live.flatMap((s) => s.authorities))];
  const hub: string[] = [];
  hub.push("---");
  hub.push("## Dubai Approval Case Studies");
  hub.push("> /case-studies");
  hub.push("");
  hub.push("### Direct Answer");
  hub.push("");
  hub.push(
    `${live.length} real Dubai approval projects managed by Wasleen Approvals across ${authorities.length} authorities. Every file shows the quoted fee, the documents submitted and the actual outcome — clients stay anonymous unless they gave written consent.`
  );
  hub.push("");
  hub.push("### Register");
  hub.push("");
  for (const study of live) {
    hub.push(
      `- [${study.projectTitle}](/case-studies/${study.slug}) — ${study.location} · ${study.authorities.join(", ")} · ${study.quotedFee} · ${study.projectStatus}`
    );
  }
  hub.push("");
  blocks.push(hub.join("\n"));

  for (const study of live) {
    const lines: string[] = [];
    lines.push("---");
    lines.push(`## ${study.projectTitle}`);
    lines.push(`> /case-studies/${study.slug}`);
    lines.push("");

    // Direct Answer
    lines.push("### Direct Answer");
    lines.push("");
    lines.push(study.directAnswer);
    lines.push("");

    // At a Glance (stats)
    lines.push("### At a Glance");
    lines.push("");
    lines.push("| Statistic | Value |");
    lines.push("|---|---|");
    for (const stat of study.stats) {
      lines.push(`| ${stat.label} | ${stat.value} |`);
    }
    lines.push("");

    // Challenge
    if (study.challenge) {
      lines.push("### Challenge");
      lines.push("");
      lines.push(study.challenge);
      lines.push("");
    }

    // Process Steps
    if (study.solutionSteps.length > 0) {
      lines.push("### Process Steps");
      lines.push("");
      for (const step of study.solutionSteps) {
        lines.push(`${step.step}. ${step.title} — ${step.description}`);
      }
      lines.push("");
    }

    // FAQ
    if (study.faqs.length > 0) {
      lines.push("### FAQ");
      lines.push("");
      for (const faq of study.faqs) {
        lines.push(`Q: ${faq.question}`);
        lines.push(`A: ${faq.answer}`);
        lines.push("");
      }
    }

    blocks.push(lines.join("\n"));
  }

  return blocks.join("\n");
}

/* ============================================================
   AR llms.txt / llms-full.txt builders (Step 8 continuation —
   Arabic case-study sections for /ar/llms.txt + /ar/llms-full.txt).
   Additive mirror of the EN builders above: LIVE Arabic entries only
   (`publishStatus === "live"` in src/data/case-studies-ar.ts — flipped
   after owner sign-off, Part 17.4). Arabic prose comes from
   `CaseStudyArabicContent` (native writing, Part 10.2); the register's
   few shared numeric fields (authorities, real projectStatus) are read
   from the EN twin matched by slug so the Arabic file stays data-honest.
   `src/lib/geo.ts` is untouched (addendum A.2).
   ============================================================ */

/** Arabic labels for the real per-file `projectStatus` — byte-for-byte the
    visible text on /ar/case-studies/{slug} detail pages
    (`AR_CASE_STUDY_STATUS_LABELS` in src/components/case-studies/ar/
    ar-labels.ts). The hub register presents every file as "معتمد / مكتمل"
    per owner directive 2026-09-02 (display-only) — llms registers always
    carry the real per-entry label, matching the detail pages. */
const ARABIC_CASE_STUDY_STATUS_LABELS: Record<string, string> = {
  quoted: "عرض سعر فقط",
  "in-progress": "قيد التنفيذ",
  completed: "معتمد / مكتمل",
};

/**
 * Arabic llms.txt — index section: one bullet per LIVE Arabic case study,
 * matching the one-liner style of the Arabic index sections in
 * src/app/ar/llms.txt/route.ts and the EN case-study index above.
 */
export function buildArabicCaseStudiesLlmsIndex(
  arCaseStudies: CaseStudyArabicContent[]
): string {
  const live = arCaseStudies.filter((s) => s.publishStatus === "live");
  if (live.length === 0) return "";

  const lines: string[] = [];
  lines.push(`## صفحات دراسات الحالة — ${live.length} صفحة`);
  lines.push("");
  lines.push(
    `- [دراسات الحالة في دبي](/ar/case-studies): الصفحة الرئيسية — سجل ${live.length} مشاريع اعتماد حقيقية في دبي أدارتها وسلين للموافقات مع الرسوم المعروضة والمستندات المقدمة والجهات المعنية والنتائج.`
  );

  for (const study of live) {
    const snippet = study.arDirectAnswer.split(".")[0].trim() + ".";
    lines.push(
      `- [${study.arTitle}](/ar/case-studies/${study.slug}): ${snippet}`
    );
  }
  lines.push("");

  return lines.join("\n");
}

/**
 * Arabic llms-full.txt — hub register block + full per-page Arabic blocks,
 * mirroring the EN `buildCaseStudiesLlmsFull` structure so AI agents get the
 * same extraction-grade Arabic detail.
 */
export function buildArabicCaseStudiesLlmsFull(
  arCaseStudies: CaseStudyArabicContent[],
  enCaseStudies: ApprovalCaseStudy[]
): string {
  const live = arCaseStudies.filter((s) => s.publishStatus === "live");
  if (live.length === 0) return "";

  const enBySlug = new Map(enCaseStudies.map((s) => [s.slug, s]));
  const blocks: string[] = [];

  /* Hub block — mirrors the visible /ar/case-studies register. Register lines
     carry the real per-file status label (like the detail pages); no
     fabricated outcomes are added. */
  const authorities = [
    ...new Set(live.flatMap((s) => enBySlug.get(s.slug)?.authorities ?? [])),
  ];
  const hub: string[] = [];
  hub.push("---");
  hub.push("## دراسات الحالة في دبي");
  hub.push("> /ar/case-studies");
  hub.push("");
  hub.push("### الإجابة المباشرة");
  hub.push("");
  hub.push(
    `${live.length} مشاريع اعتماد حقيقية في دبي أدارتها وسلين للموافقات عبر ${authorities.length} جهات. يعرض كل ملف الرسوم المعروضة والمستندات المقدمة والنتيجة الفعلية — ويبقى العملاء مجهولين إلا بموافقة كتابية صريحة.`
  );
  hub.push("");
  hub.push("### السجل");
  hub.push("");
  for (const study of live) {
    const en = enBySlug.get(study.slug);
    const auth = en ? en.authorities.join(", ") : "";
    const status =
      en ? ARABIC_CASE_STUDY_STATUS_LABELS[en.projectStatus] ?? en.projectStatus : "";
    hub.push(
      `- [${study.arTitle}](/ar/case-studies/${study.slug}) — ${study.arLocation} · ${auth} · ${study.arQuotedFee} · ${status}`
    );
  }
  hub.push("");
  blocks.push(hub.join("\n"));

  for (const study of live) {
    const lines: string[] = [];
    lines.push("---");
    lines.push(`## ${study.arTitle}`);
    lines.push(`> /ar/case-studies/${study.slug}`);
    lines.push("");

    // Direct Answer
    lines.push("### الإجابة المباشرة");
    lines.push("");
    lines.push(study.arDirectAnswer);
    lines.push("");

    // At a Glance (stats)
    lines.push("### لمحة سريعة");
    lines.push("");
    lines.push("| المؤشر | القيمة |");
    lines.push("|---|---|");
    for (const stat of study.arStats) {
      lines.push(`| ${stat.label} | ${stat.value} |`);
    }
    lines.push("");

    // Challenge
    if (study.arChallenge) {
      lines.push("### التحدي");
      lines.push("");
      lines.push(study.arChallenge);
      lines.push("");
    }

    // Process Steps
    if (study.arSolutionSteps.length > 0) {
      lines.push("### خطوات العملية");
      lines.push("");
      for (const step of study.arSolutionSteps) {
        lines.push(`${step.step}. ${step.title} — ${step.description}`);
      }
      lines.push("");
    }

    // FAQ
    if (study.arFaqs.length > 0) {
      lines.push("### الأسئلة الشائعة");
      lines.push("");
      for (const faq of study.arFaqs) {
        lines.push(`س: ${faq.question}`);
        lines.push(`ج: ${faq.answer}`);
        lines.push("");
      }
    }

    blocks.push(lines.join("\n"));
  }

  return blocks.join("\n");
}

/* ============================================================
   PART 19 — HUB REGISTER HELPERS (owner-approved addendum —
   plans/case-studies-mega-plan.md Part 19 / §19.6, §19.9)
   Client-side aggregation, authority rail + hub analytics.
   ============================================================ */

/**
 * Authority display name → compact code for the hub quick-jump rail
 * (Part 19 Z3) and the authority badge on file cards. Keys are the exact
 * strings used in `ApprovalCaseStudy.authorities`. Unknown names fall
 * back to themselves — the register is data-driven, never hardcoded.
 */
export const AUTHORITY_SHORT_NAMES: Record<string, string> = {
  "Dubai Civil Defence": "DCD",
  "Dubai Municipality": "DM",
  DDA: "DDA",
  DEWA: "DEWA",
  Nakheel: "Nakheel",
  Trakhees: "Trakhees",
  RTA: "RTA",
};

/** Display code for any authority string (falls back to the raw name). */
export function authorityShortName(authority: string): string {
  return AUTHORITY_SHORT_NAMES[authority] ?? authority;
}

/**
 * Compact `AED` formatter for the build-time aggregate band (Part 19 Z2).
 * Returns "" for non-finite / non-positive amounts so a stat tile can be
 * hidden honestly instead of rendering "AED 0".
 */
export function formatAED(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return "";
  const round = (n: number) =>
    Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, "");
  if (amount >= 1_000_000) return `AED ${round(amount / 1_000_000)}M`;
  if (amount >= 1_000) return `AED ${round(amount / 1_000)}k`;
  return `AED ${amount.toLocaleString("en-AE")}`;
}

/**
 * Normalised-locality rule (owner-approved §19.12 #4): strip a trailing
 * `, Dubai` (case-insensitive) so `Al Quoz` and `Al Quoz, Dubai` collapse
 * into one area family. Bare `Dubai` stays `Dubai`.
 */
function normaliseArea(location: string): string {
  return location.trim().replace(/,\s*Dubai\s*$/i, "").trim();
}

/**
 * Sorted unique area families served (location strings, never full
 * addresses). Case-insensitive dedupe after `normaliseArea`.
 */
export function distinctAreas(caseStudies: ApprovalCaseStudy[]): string[] {
  const seen = new Map<string, string>();
  for (const study of caseStudies) {
    if (!study.location) continue;
    const canonical = normaliseArea(study.location);
    const key = canonical.toLocaleLowerCase();
    if (!seen.has(key)) seen.set(key, canonical);
  }
  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}

/**
 * Build-time aggregate numbers for the hub stat band (Part 19 §19.6).
 * Everything derives from the data array — nothing is hardcoded (the
 * register will grow to 48; the UI must never assume a fixed count).
 * The combined-value figure only sums entries carrying an explicit
 * numeric `feeAmountAED` (owner-approved optional field) so the headline
 * number is never fabricated by string-parsing display text.
 */
export interface HubAggregateStats {
  projects: number;
  authorities: string[];
  areas: string[];
  /** Sum of numeric `feeAmountAED` across valued entries */
  combinedValue: number;
  /** Count of entries included in `combinedValue` (honesty guard) */
  valuedProjects: number;
  /** Compact label e.g. "AED 155k" — null when no valued entries */
  valueLabel: string | null;
}

export function aggregateHubStats(
  caseStudies: ApprovalCaseStudy[],
): HubAggregateStats {
  const authoritySet = new Set<string>();
  const areaSet = new Set<string>();
  let combinedValue = 0;
  let valuedProjects = 0;

  for (const study of caseStudies) {
    for (const authority of study.authorities) authoritySet.add(authority);
    if (study.location) areaSet.add(normaliseArea(study.location));
    const fee = study.feeAmountAED;
    if (typeof fee === "number" && Number.isFinite(fee) && fee > 0) {
      combinedValue += fee;
      valuedProjects += 1;
    }
  }

  const authorities = Array.from(authoritySet).sort((a, b) =>
    a.localeCompare(b),
  );
  const areas = Array.from(areaSet).sort((a, b) => a.localeCompare(b));

  return {
    projects: caseStudies.length,
    authorities,
    areas,
    combinedValue,
    valuedProjects,
    valueLabel: valuedProjects > 0 ? formatAED(combinedValue) : null,
  };
}

/* ============================================================
   PART 19 — HUB ANALYTICS (taxonomy §4.1, registered first)
   All go through `trackEvent()` — never `sendGTMEvent` directly.
   String params ride under non-`value` keys (`AnalyticsEvent.value`
   is typed `number` — see `trackCaseStudyFilter` above).
   ============================================================ */

/**
 * `case_study_hub_authority_jump` — engagement — fires when a quick-jump
 * authority pill is selected in the hub rail (Z3) or the mobile drawer.
 * Params: `authority`.
 */
export function trackCaseStudyHubAuthorityJump({
  authority,
}: {
  authority: string;
}): void {
  trackEvent({
    action: "case_study_hub_authority_jump",
    category: "engagement",
    label: `Hub authority jump: ${authority}`,
    authority,
  });
}

/**
 * `case_study_hub_cta` — conversion — fires on the amber pattern-break CTA
 * tile inside the grid rhythm (Z6) or the related-rail CTA (Z7).
 * Params: `position` (pattern-break-tile | rail-card).
 */
export function trackCaseStudyHubCta({ position }: { position: string }): void {
  trackEvent({
    action: "case_study_hub_cta",
    category: "conversion",
    label: `Hub CTA (${position})`,
    position,
  });
}

/**
 * `case_study_hub_empty_suggest` — engagement — fires when a user applies a
 * smart empty-state suggestion (Z8). Params: `suggested_authority`.
 */
export function trackCaseStudyHubEmptySuggest({
  suggested_authority,
}: {
  suggested_authority: string;
}): void {
  trackEvent({
    action: "case_study_hub_empty_suggest",
    category: "engagement",
    label: `Empty-state suggestion: ${suggested_authority}`,
    suggested_authority,
  });
}
