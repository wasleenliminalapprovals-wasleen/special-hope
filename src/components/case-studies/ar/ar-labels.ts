/**
 * Arabic Case Study — Shared Labels + Date Helper
 *
 * Arabic layer for the case-study mega-plan (Part 14 Step 6b.2). The EN
 * label maps live in `src/lib/case-studies.ts` (EN LOCKED) and `AR` constants
 * in `src/lib/constants.ts` (LOCKED — no case-studies label there yet,
 * Part 19.10). This file therefore owns the Arabic strings shared by the
 * `/ar/case-studies` hub (Step 6c), the `/ar/case-studies/[slug]` detail
 * template (Step 6d) and the Arabic section components (Step 6b.3) so the
 * Arabic copy is written once, natively (Part 10.2), and stays identical
 * across every surface.
 *
 * Every string here is authored in Arabic on purpose — the `/ar/` pages must
 * render 100% Arabic visible content. `slug`, `sourceRef` and ISO dates stay
 * shared with the EN twin.
 *
 * @see plans/case-studies-mega-plan.md Part 10.2 — Native Arabic writing
 * @see plans/case-studies-mega-plan.md Part 14 Step 6b
 */

import type {
  ApprovalCaseStudy,
  CaseStudyDocumentRow,
  CaseStudyFacet,
} from "@/types/case-study";

/* ── Hub / breadcrumb ───────────────────────────────────────── */

/** Arabic hub label (breadcrumbs + hub H1). */
export const AR_CASE_STUDY_HUB_LABEL = "دراسات الحالة";

/** Arabic hub route (English slugs kept for parity). */
export const AR_CASE_STUDY_HUB_PATH = "/ar/case-studies";

/** `aria-label` for breadcrumb navigation — matches `/ar/approvals/[slug]`. */
export const AR_CASE_STUDY_BREADCRUMB_LABEL = "مسار التنقل";

/* ── Status facet values — mirrors `CASE_STUDY_STATUS_LABELS` (case-studies.ts) ── */

/** Human Arabic labels for the `projectStatus` claim levels. */
export const AR_CASE_STUDY_STATUS_LABELS: Record<
  ApprovalCaseStudy["projectStatus"],
  string
> = {
  quoted: "عرض سعر فقط",
  "in-progress": "قيد التنفيذ",
  completed: "معتمد / مكتمل",
};

/* ── Facet names — mirrors `CASE_STUDY_FACET_LABELS` (case-studies.ts) ── */

/** Arabic labels for facet names (hub filter UI / aria). */
export const AR_CASE_STUDY_FACET_LABELS: Record<CaseStudyFacet, string> = {
  authority: "الجهة",
  sector: "القطاع",
  projectType: "نوع المشروع",
  status: "الحالة",
  location: "الموقع",
};

/* ── Authority display names ─────────────────────────────────── */

/**
 * English authority strings → Arabic display names. `authorities` are shared
 * with the EN twin and read at render time (Part 3.2 — never duplicated in
 * `src/data/case-studies-ar.ts`); this map localises only the FULL-ENGLISH
 * authority names that would otherwise leak onto the `/ar/` page. Latin
 * acronyms and proper nouns (DDA, DCD, DEWA, RTA, Nakheel, Trakhees…) are the
 * standard entity identifiers already used across the site's Arabic pages, so
 * they pass through unchanged — the entity-first Arabic definition lives in
 * each case's Arabic prose (e.g. "هيئة دبي التنموية (DDA)").
 *
 * @see plans/case-studies-mega-plan.md Part 3.2 / gate 11.3 (100% Arabic)
 */
const AR_AUTHORITY_NAMES: Record<string, string> = {
  "Dubai Civil Defence": "الدفاع المدني بدبي (DCD)",
  "Dubai Municipality": "بلدية دبي",
};

/** Arabic display name for a single EN authority string. */
export function arAuthorityName(authority: string): string {
  return AR_AUTHORITY_NAMES[authority] ?? authority;
}

/** Localised authorities array — preserves the EN ordering. */
export function arAuthoritiesList(authorities: string[]): string[] {
  return authorities.map(arAuthorityName);
}

/** Localised authorities joined as Arabic prose, e.g. "DDA والدفاع المدني بدبي (DCD)". */
export function arAuthoritiesJoined(
  authorities: string[],
  separator = " و ",
): string {
  return arAuthoritiesList(authorities).join(separator);
}

/* ── Document provider badges ───────────────────────────────── */

/** Arabic "who supplied this document" labels for the Documents table. */
export const AR_CASE_STUDY_PROVIDED_BY_LABELS: Record<
  CaseStudyDocumentRow["providedBy"],
  string
> = {
  wasleen: "وسلين",
  client: "العميل",
};

/* ── Date formatting ────────────────────────────────────────── */

/**
 * ISO date → Arabic long date, e.g. "28 يوليو 2026" (ar-AE, UTC).
 * Identical options to `formatArabicBlogDate` (blog-ar.ts) so Arabic dates
 * render consistently sitewide. Arabic-Indic digits are NOT forced — the
 * default `ar-AE` numbering is the pattern already used across the blog.
 */
export function formatArabicDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("ar-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ── Hub register — hero, filters, toolbar & empty state (Step 6c) ── */

/** Register hero eyebrow (mono label above the H1). */
export const AR_CASE_STUDY_HERO_EYEBROW = "سجل المشاريع";

/** "All" pill + default facet-select option root word. */
export const AR_CASE_STUDY_ALL_LABEL = "الكل";

/** `aria-label` for the authority filter rail. */
export const AR_CASE_STUDY_FILTER_AUTHORITY_ARIA = "تصفية السجل حسب الجهة";

/**
 * Arabic "show everything for this facet" option labels. Values AND labels
 * are the Arabic `ar` field values themselves, so no EN lib dependency.
 */
export const AR_CASE_STUDY_FILTER_ALL_OPTIONS: Partial<
  Record<CaseStudyFacet, string>
> = {
  sector: "كل القطاعات",
  projectType: "كل أنواع المشاريع",
  location: "كل المواقع",
};

/** Accessible live-region message — "{n} projects in the register". */
export function arRegisterFileCount(count: number): string {
  if (count === 1) return "مشروع واحد في السجل";
  return `${count} مشاريع في السجل`;
}

/** Toolbar — mobile filter pill + desktop "All filters" summary. */
export const AR_CASE_STUDY_FILTER_PILL = "تصفية";
export const AR_CASE_STUDY_ALL_FILTERS_LABEL = "كل عوامل التصفية";
export const AR_CASE_STUDY_CLEAR_FILTERS_LABEL = "مسح كل عوامل التصفية";

/** Empty-state copy when no register files match the active filters. */
export const AR_CASE_STUDY_EMPTY_TITLE = "لا توجد مشاريع مطابقة";
export const AR_CASE_STUDY_EMPTY_HINT =
  "لا يوجد ملف يطابق الجهة وعوامل التصفية المحددة حالياً. جرّب جهة أخرى أو امسح عوامل التصفية.";

/** Empty-state suggestion button — "{count} {authority} projects". */
export function arCaseStudySuggestionLabel(
  count: number,
  authorityLabel: string,
): string {
  return `عرض ${count} مشاريع ${authorityLabel}`;
}

/** Drawer — title + close-button aria label. */
export const AR_CASE_STUDY_DRAWER_TITLE = "تصفية السجل";
export const AR_CASE_STUDY_DRAWER_CLOSE_LABEL = "إغلاق عوامل التصفية";

/* ── Hub file card (Step 6c) ─────────────────────────────────── */

/** Rule caption shown above the card headline (EN "quotation"). */
export const AR_CASE_STUDY_QUOTE_LABEL = "عرض سعر";

/** "View story" link label on each card. */
export const AR_CASE_STUDY_VIEW_STORY = "عرض القصة";

/** Consent footer — client allowed publication (generic, 100% Arabic). */
export const AR_CASE_STUDY_CONSENTED_CLIENT = "بموافقة العميل";

/** Consent footer — anonymised client prefix, followed by `ar.arSector`. */
export const AR_CASE_STUDY_CONFIDENTIAL_PREFIX = "عميل سري — ";

/* ── Hub CTA tile + related sidebar CTA (Step 6c) ────────────── */

/** CTA heading — "Need this approval done?" (shared tile + sidebar). */
export const AR_CASE_STUDY_CTA_TITLE = "هل لديك مشروع تريد اعتماده؟";

/** CTA supporting copy (fixed quote + file-stamped delivery plan). */
export const AR_CASE_STUDY_CTA_BODY =
  "احصل على عرض سعر ثابت وخطة تسليم مختومة بمدة واضحة لمشروعك في دبي.";

/** CTA primary action label (links to `/ar/free-quote`). */
export const AR_CASE_STUDY_CTA_LINK = "اطلب عرض سعر مجاني";

/* ── Hub freshness strip (Step 6c) ───────────────────────────── */

/** "Recently updated" heading. */
export const AR_CASE_STUDY_RECENT_LABEL = "آخر التحديثات";

/** "View register" link label on the freshness strip. */
export const AR_CASE_STUDY_VIEW_REGISTER = "عرض السجل";

/* ── Hub related sidebar (Step 6c) ───────────────────────────── */

/** `aria-label` for the related-resources aside. */
export const AR_CASE_STUDY_RELATED_ASIDE_LABEL = "موارد ذات صلة";

/** Rail box titles (title links to their Arabic hubs). */
export const AR_CASE_STUDY_RELATED_APPROVALS_TITLE = "الموافقات الشائعة";
export const AR_CASE_STUDY_RELATED_GUIDES_TITLE = "الأدلة والأسئلة الشائعة";
export const AR_CASE_STUDY_RELATED_SERVICES_TITLE = "الخدمات";

/** `aria-label` for the get-help CTA box. */
export const AR_CASE_STUDY_RELATED_GET_HELP_LABEL =
  "الحصول على مساعدة في الاعتماد";
