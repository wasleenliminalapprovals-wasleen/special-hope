/**
 * Shared TypeScript type definitions for the Wasleen Approvals project.
 *
 * All data-layer files (data/approvals.ts, data/guides.ts, data/services.ts)
 * use these interfaces to maintain consistency across the codebase.
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md for SEO content requirements
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md for schema generation rules
 */

/* ============================================================
   Approval Category Enum
   ============================================================ */

export type ApprovalCategory =
  | "government-regulatory"
  | "free-zone"
  | "developer-community"
  | "property-registration"
  | "technical-utility"
  | "trade-food-hospitality"
  | "fit-out-construction"
  | "drawing-documentation";

export const APPROVAL_CATEGORIES: { value: ApprovalCategory; label: string; slug: string }[] = [
  { value: "government-regulatory", label: "Government & Regulatory", slug: "government-regulatory" },
  { value: "free-zone", label: "Free Zone Approvals", slug: "free-zone" },
  { value: "developer-community", label: "Developer & Community", slug: "developer-community" },
  { value: "property-registration", label: "Property & Registration", slug: "property-registration" },
  { value: "technical-utility", label: "Technical & Utility", slug: "technical-utility" },
  { value: "trade-food-hospitality", label: "Trade, Food & Hospitality", slug: "trade-food-hospitality" },
  { value: "fit-out-construction", label: "Fit-Out & Construction", slug: "fit-out-construction" },
  { value: "drawing-documentation", label: "Drawing & Documentation", slug: "drawing-documentation" },
];

/* ============================================================
   FAQ Item
   ============================================================ */

export interface FAQItem {
  /** The question text (must match schema verbatim) */
  question: string;
  /** The answer text (must match schema verbatim) */
  answer: string;
}

/* ============================================================
   Document / Requirement
   ============================================================ */

export interface DocumentRequirement {
  /** Document name (e.g., "Completed application form") */
  document: string;
  /** Description or notes about the document */
  description?: string;
  /** Whether this document is mandatory (default: true) */
  mandatory?: boolean;
}

/* ============================================================
   Process Step (for HowTo schema)
   ============================================================ */

export interface ProcessStep {
  /** Step number (1-based) */
  step: number;
  /** Short title */
  title: string;
  /** Detailed description (must match HowTo schema text) */
  description: string;
}

/* ============================================================
   Timeline / Cost Entry
   ============================================================ */

export interface TimelineEntry {
  /** Stage name (e.g., "Document preparation") */
  stage: string;
  /** Typical duration (e.g., "2-3 business days") */
  duration: string;
  /** Estimated cost range (e.g., "AED 500 - 1,500") */
  cost: string;
  /** Additional notes */
  notes?: string;
}

/* ============================================================
   Rejection Reason
   ============================================================ */

export interface RejectionReason {
  /** The reason (e.g., "Incomplete document set") */
  reason: string;
  /** How to avoid this rejection */
  solution: string;
}

/* ============================================================
   Stats / At-a-Glance Fact
   ============================================================ */

export interface StatFact {
  /** Label (e.g., "Authority") */
  label: string;
  /** Value (e.g., "Dubai Municipality") */
  value: string;
  /** Optional icon name */
  icon?: string;
}

/* ============================================================
   Case Study / Project Reference
   ============================================================ */

export interface CaseStudy {
  /** Project type (e.g., "Villa extension in Al Barsha") */
  projectType: string;
  /** Authority involved */
  authority: string;
  /** Timeline from submission to approval */
  timeline: string;
  /** Key challenge (what made it complex) */
  challenge: string;
  /** Outcome / result */
  outcome: string;
}

/* ============================================================
   Approval Data — Full definition for a single approval page
   ============================================================ */

export interface ApprovalData {
  /** URL slug (e.g., "dubai-municipality-approval") */
  slug: string;
  /** Full page name (e.g., "Dubai Municipality Approval") */
  name: string;
  /** Short name for navigation (e.g., "DM Approval") */
  shortName: string;
  /** Full authority name (e.g., "Dubai Municipality") */
  authorityFull: string;
  /** Authority abbreviation (e.g., "DM") */
  authorityAbbr: string;
  /** Category the approval belongs to */
  category: ApprovalCategory;
  /** Primary keyword for SEO (e.g., "Dubai Municipality approval") */
  primaryKeyword: string;
  /** Secondary / LSI keywords */
  secondaryKeywords: string[];
  /** Typical timeline as a string (e.g., "3-5 business days") */
  typicalTimeline: string;
  /** Typical cost range (e.g., "AED 500 - 3,000") */
  typicalCostRange: string;

  /* ---- Content Sections ---- */

  /** Section 1: Direct answer block — self-contained, quotable by AI */
  directAnswer: string;
  /** Section 2: At-a-glance facts (4 items) */
  stats: StatFact[];
  /** Section 3: What is this approval? (150-250 words) */
  description: string;
  /** Section 4: Who needs this? (bullet points as string list) */
  whoNeedsIt: string[];
  /** Section 5: Documents required table */
  documents: DocumentRequirement[];
  /** Section 6: Process steps (numbered, 5-8 steps) */
  process: ProcessStep[];
  /** Section 7: Timeline & cost table */
  timelineTable: TimelineEntry[];
  /** Section 8: Common rejection reasons */
  rejectionReasons: RejectionReason[];
  /** Section 9: Case reference (anonymized real project) */
  caseStudy: CaseStudy;
  /** Section 10: Why choose us / credentials */
  whyChooseUs: string[];
  /** Section 11: FAQ items (5-8 questions) */
  faqs: FAQItem[];
  /** Section 12: Related approval slugs for internal linking */
  relatedSlugs: string[];

  /** Related guide slugs for cross-linking approval pages to relevant guides */
  relatedGuideSlugs?: string[];

  /**
   * Optional topical images rendered on the approval page. First entry is the
   * Section-1 hero image (priority), second entry renders mid-body. References
   * the image registry (src/data/images.ts).
   */
  images?: ImageAssetRef[];

  /** Last updated date (ISO string, e.g., "2026-03-15") */
  lastUpdated: string;

  /* ---- Arabic Localization ---- */
  /** Arabic content — optional, added for bilingual support */
  ar?: ApprovalArabicContent;
}

/**
 * Arabic content for an approval page.
 * All fields are localized, not translated.
 */
/**
 * Stub entry type for Arabic data files — only slug + Arabic content needed.
 * Used by src/data/approvals-ar.ts during Phase 0/1. In Phase 2, these get
 * merged into the main ApprovalData array via the `ar?` field.
 */
export interface ApprovalArabicEntry {
  slug: string;
  ar: ApprovalArabicContent;
}

export interface ApprovalArabicContent {
  /** Arabic-script slug (e.g., "موافقة-ديوا") */
  slug: string;
  /** Arabic name */
  name: string;
  /** Arabic short name */
  shortName: string;
  /** Arabic authority full name */
  authorityFull: string;
  /** Arabic authority abbreviation */
  authorityAbbr: string;
  /** Arabic primary keyword */
  primaryKeyword: string;
  /** Arabic secondary keywords */
  secondaryKeywords: string[];
  /** Arabic direct answer block */
  directAnswer: string;
  /** Arabic description */
  description: string;
  /** Arabic who-needs-it list */
  whoNeedsIt: string[];
  /** Arabic documents */
  documents: DocumentRequirement[];
  /** Arabic process steps */
  process: ProcessStep[];
  /** Arabic timeline table */
  timelineTable: TimelineEntry[];
  /** Arabic rejection reasons */
  rejectionReasons: RejectionReason[];
  /** Arabic case study */
  caseStudy: CaseStudy | null;
  /** Arabic why-choose-us list */
  whyChooseUs: string[];
  /** Arabic FAQ items */
  faqs: FAQItem[];

  /* ---- Structural Parity Fields ---- */

  /** Section 2: At-a-glance stats with Arabic labels (4 items) */
  stats: StatFact[];
  /** Typical timeline in Arabic (e.g., "5-10 أيام عمل") */
  typicalTimeline: string;
  /** Typical cost range in Arabic (e.g., "من 500 إلى 3,000 درهم") */
  typicalCostRange: string;
}

/* ============================================================
   Guide / Q&A Data
   ============================================================ */

export type GuideType = "hub" | "qa";

export interface GuideData {
  /** URL slug (e.g., "how-long-does-dda-approval-take") */
  slug: string;
  /** Guide type */
  type: GuideType;
  /** Page title / H1 */
  title: string;
  /** Short description for meta / card preview */
  description: string;
  /** Primary keyword for SEO */
  primaryKeyword: string;
  /** Secondary keywords */
  secondaryKeywords: string[];

  /** The main question (for QAPage schema) — only for type "qa" */
  question?: string;
  /** The accepted answer (for QAPage schema) — only for type "qa" */
  answer?: string;

  /** Full content body (HTML-compatible paragraphs) */
  content: string[];

  /** Slug of the parent approval this guide relates to */
  parentApprovalSlug?: string;
  /** Slug of the parent service this guide relates to */
  parentServiceSlug?: string;

  /** Related guide slugs for internal linking */
  relatedSlugs: string[];

  /** Last updated date (ISO string) */
  lastUpdated: string;

  /* ---- Arabic Localization ---- */
  /** Arabic content — optional, added for bilingual support */
  ar?: GuideArabicContent;
}

/**
 * Arabic content for a guide/Q&A page.
 */
/**
 * Stub entry type for Arabic guide data files.
 */
export interface GuideArabicEntry {
  slug: string;
  ar: GuideArabicContent;
}

export interface GuideArabicContent {
  /** Arabic-script slug */
  slug: string;
  /** Arabic title / H1 */
  title: string;
  /** Arabic description */
  description: string;
  /** Arabic primary keyword */
  primaryKeyword: string;
  /** Arabic secondary keywords */
  secondaryKeywords: string[];
  /** Arabic question (for QAPage schema) */
  question?: string;
  /** Arabic answer (for QAPage schema) */
  answer?: string;
  /** Arabic content paragraphs */
  content: string[];
}

/* ============================================================
   Service Data
   ============================================================ */

export interface ServiceData {
  /** URL slug (e.g., "2d-drawings") */
  slug: string;
  /** Service name (e.g., "2D Drawings") */
  name: string;
  /** Short tagline for cards */
  tagline: string;
  /** Primary keyword */
  primaryKeyword: string;
  /** Secondary keywords */
  secondaryKeywords: string[];

  /** Direct answer / service summary (for AI extraction) */
  directAnswer: string;
  /** Detailed description */
  description: string;
  /** Key features / deliverables (bullet list) */
  features: string[];
  /** Process steps (if applicable) */
  process?: ProcessStep[];
  /** FAQ items */
  faqs: FAQItem[];
  /** Related service slugs */
  relatedSlugs: string[];

  /** Hero image for the service page (above the fold, priority-rendered) */
  image?: ImageAssetRef;
  /** Secondary image placed above the "Step-by-Step Process" section */
  processImage?: ImageAssetRef;

  /** Last updated date (ISO string) */
  lastUpdated: string;

  /* ---- Arabic Localization ---- */
  /** Arabic content — optional, added for bilingual support */
  ar?: ServiceArabicContent;
}

/**
 * Arabic content for a service page.
 */
/**
 * Stub entry type for Arabic service data files.
 */
export interface ServiceArabicEntry {
  slug: string;
  ar: ServiceArabicContent;
}

export interface ServiceArabicContent {
  /** Arabic-script slug */
  slug: string;
  /** Arabic service name */
  name: string;
  /** Arabic tagline */
  tagline: string;
  /** Arabic primary keyword */
  primaryKeyword: string;
  /** Arabic secondary keywords */
  secondaryKeywords: string[];
  /** Arabic direct answer */
  directAnswer: string;
  /** Arabic description */
  description: string;
  /** Arabic features list */
  features: string[];
  /** Arabic process steps */
  process?: ProcessStep[];
  /** Arabic FAQ items */
  faqs: FAQItem[];
}

/* ============================================================
   pSEO Data — Programmatic SEO pages (data/pseo/*)
   ============================================================
   @see plans/pseo-domination-engine-plan.md §3 for the data model
   */

/** The 7 kinds of programmatic SEO pages the engine produces */
export type PseoPageKind =
  | "guide"      // complete step-by-step guide for an authority/process
  | "qa"         // single question + accepted answer (QAPage schema)
  | "checklist"  // documents / steps checklist
  | "cost"       // cost & fees deep-dive
  | "timeline"   // turnaround time deep-dive
  | "compare"    // comparison (e.g., mainland vs free zone)
  | "glossary";  // term definition / terminology entry

/** A single content block inside a PseoSection (ordered, semantic HTML) */
export type PseoBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string }
  | { type: "image"; image: ImageAssetRef };

/** A content section (H2 + ordered blocks) inside a pSEO page */
export interface PseoSection {
  /** Section heading (H2) */
  heading: string;
  /** Optional anchor id for the section (kebab-case) */
  anchor?: string;
  /** Ordered blocks rendered under the heading */
  blocks: PseoBlock[];
}

/** Reference to an image from the image registry (src/data/images.ts) */
export interface ImageAssetRef {
  /** Public path, e.g. "/images/dcd-approval-consultants-in-dubai.webp" */
  src: string;
  /** Descriptive alt text (must be unique per page) */
  alt: string;
  /** Optional visible figcaption */
  caption?: string;
  /** Explicit dimensions (prevents CLS) */
  width?: number;
  /** Explicit dimensions (prevents CLS) */
  height?: number;
}

/** Arabic content for a pSEO page — contextual Gulf-Arabic, NOT translation */
export interface PseoArabicContent {
  /** Arabic-script slug */
  slug: string;
  /** Arabic title / H1 */
  title: string;
  /** Arabic meta title (50-60 chars) */
  metaTitle: string;
  /** Arabic meta description (140-160 chars) */
  metaDescription: string;
  /** Arabic primary keyword */
  primaryKeyword: string;
  /** Arabic secondary keywords */
  secondaryKeywords: string[];
  /** Arabic direct answer block */
  directAnswer: string;
  /** Arabic content sections */
  sections: PseoSection[];
  /** Arabic FAQ items */
  faqs: FAQItem[];
}

/** A single generated pSEO page (EN canonical, AR optional) */
export interface PseoPage {
  /** Unique URL slug — deduped against approvals + guides */
  slug: string;
  /** pSEO page kind (drives template + schema stack) */
  kind: PseoPageKind;
  /** Page title / H1 */
  title: string;
  /** Meta title (50-60 chars) */
  metaTitle: string;
  /** Meta description (140-160 chars) */
  metaDescription: string;
  /** Primary keyword for SEO */
  primaryKeyword: string;
  /** Secondary / LSI keywords */
  secondaryKeywords: string[];
  /** Direct answer block — self-contained, quotable by AI engines */
  directAnswer: string;
  /** Ordered H2/H3 sections with tables/lists */
  sections: PseoSection[];
  /** FAQ items (4-8 distinct per page) */
  faqs: FAQItem[];
  /** Related pSEO/approval/guide slugs — dependency-graph + sibling links */
  relatedSlugs: string[];
  /** Image from the image registry (optional) */
  image?: ImageAssetRef;
  /** Slug of the pillar approval page this page links up to */
  parentApprovalSlug?: string;
  /** Date fact sheet was last verified ("pending" until verified) */
  lastVerified: string;
  /** Review state — flagged by the fact gate when numbers are unverified */
  reviewStatus: "auto" | "needs-review";
  /* ---- Arabic Localization ---- */
  /** Arabic content — optional, added for bilingual support */
  ar?: PseoArabicContent;
}

/** Stub entry type for Arabic pSEO data files (parity with approvals-ar pattern) */
export interface PseoArabicEntry {
  slug: string;
  ar: PseoArabicContent;
}

/* ============================================================
   Image Registry (data/images.ts)
   ============================================================ */

/** One image asset in the registry — maps a public/images file to SEO metadata */
export interface ImageAsset {
  /** File name only, e.g. "dcd-approval-consultants-in-dubai.webp" */
  filename: string;
  /** Public path, e.g. "/images/dcd-approval-consultants-in-dubai.webp" */
  src: string;
  /** Descriptive alt text (EN) */
  alt: string;
  /** Visible figcaption (EN) */
  caption?: string;
  /** Topics / authorities this image is suitable for (used for auto-matching) */
  topicTags: string[];
  /** Explicit width (prevents CLS) */
  width?: number;
  /** Explicit height (prevents CLS) */
  height?: number;
  /**
   * "available" = file exists in public/images (safe to render).
   * "planned" = filename reserved in the registry but file not yet created —
   * excluded from auto-matching until flipped to "available".
   */
  status: "available" | "planned";
  /** Arabic-localized alt/caption */
  ar?: {
    alt: string;
    caption?: string;
  };
}

/* ============================================================
   Authority Fact Sheets (data/fact-sheets/*)
   ============================================================
   Single source of truth for verified fees, timelines and documents per
   authority. The pSEO engine is hard-constrained to source every number from
   these sheets — it may never invent new figures. `lastVerified` is the
   human-verification gate: "pending" until the user confirms the numbers.
   @see plans/pseo-domination-engine-plan.md §2 (fact gate)
   */

/** A single verified fee/charge line item (indicative until lastVerified set). */
export interface FactSheetFee {
  /** Fee name (e.g., "Building permit fee") */
  name: string;
  /** Fee amount or range in AED (indicative) */
  amount: string;
  /** How the fee is calculated (e.g., "% of construction value") */
  notes?: string;
}

/** A verified required document (common for the authority's approvals). */
export interface FactSheetDocument {
  /** Document name (e.g., "Title deed") */
  name: string;
  /** Notes (e.g., "original + 2 copies", "not older than 3 months") */
  notes?: string;
}

/** A verified stage + duration pair for the authority's standard timeline. */
export interface FactSheetTimeline {
  /** Stage (e.g., "Document review") */
  stage: string;
  /** Duration (e.g., "3-5 business days") */
  duration: string;
}

/** Verified facts for a single authority (DM, DCD, DEWA, ...). */
export interface FactSheet {
  /** Authority key — matches AUTHORITY_BY_APPROVAL values (e.g. "dm") */
  key: string;
  /** Authority name (EN) */
  name: string;
  /** Authority name (AR) */
  nameAr: string;
  /** Official portal / website URL */
  portalUrl: string;
  /**
   * Human-verification gate. "pending" = numbers are indicative and MUST be
   * verified by the user before the page can be marked `reviewStatus: "auto"`.
   */
  lastVerified: string;
  /** Verified fees (AED, indicative) */
  fees: FactSheetFee[];
  /** Verified standard timelines */
  timelines: FactSheetTimeline[];
  /** Verified common required documents */
  documents: FactSheetDocument[];
  /** Notes / disclaimer (regulations change — re-verify annually) */
  notes?: string;
}

/* ============================================================
   Blog Data — Categories, Posts, Sections, Images
   @see plans/blog-pre-build-plan.md §9 Phase 6 (data layer)
   @see plans/blog-categories-topics-urls.md (categories source of truth)
   ============================================================ */

/**
 * Blog category id — the 8 APPROVED categories (A–H) from the categories
 * file (plans/blog-categories-topics-urls.md §3). B, D, F are empty this
 * wave — never force topics into them.
 */
export type BlogCategoryId =
  | "approval-news" // A — Approval News & Regulation Updates
  | "comparisons" // B — Approval Comparisons (EMPTY this wave)
  | "project-journeys" // C — Project-Type Approval Journeys
  | "costs-timelines" // D — Approval Costs & Timeline Stories (EMPTY this wave)
  | "authority-deep-dives" // E — Authority Deep-Dives
  | "rejection-stories" // F — Rejection & Mistake Stories (EMPTY this wave)
  | "free-zones" // G — Free Zones & Developer Communities
  | "docs-drawings"; // H — Documentation & Drawing Insights

/**
 * Publish lifecycle (draft → ready → live, plan §0.5).
 * The index renders everything except `draft` (so `ready` posts are
 * verifiable during the build); ONLY `live` posts enter `sitemap.xml`.
 */
export type BlogStatus = "draft" | "ready" | "live";

/** One approved blog category (categories file §3 — single source of truth). */
export interface BlogCategory {
  /** Stable category id — also the `/blog?category={slug}` filter value. */
  id: BlogCategoryId;
  /** Letter id A–H from the categories file. */
  code: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  /** Display name (EN). */
  name: string;
  /** Short description shown in the ZONE 4 category grid / ZONE 7 silos. */
  description: string;
  /** SEO-friendly slug used for filtering (equals the id). */
  slug: string;
  /** Grid / silo display order (active categories first). */
  order: number;
  /** Example queries the category owns (categories file §3). */
  exampleQueries: string[];
  /** True when the category has approved posts this wave (A/E/G/C/H). */
  active: boolean;
}

/** Where a post image renders on the article page (2–3 per post, varied). */
export type BlogImagePosition = "hero" | "inline" | "end";

/**
 * A single post image — explicit dimensions prevent CLS (plan §0.3 dims gate).
 * Hero assets must be ≥1200px wide (blog set: 1600×900 / 1200×675).
 */
export interface BlogImage {
  /** Public path, e.g. "/images/dubai-approval-consultants-Blogs/.../file.webp" */
  src: string;
  /** Descriptive alt text (never fake) — required for SEO. */
  alt: string;
  /** Placement on the article page (hero / inline / end). */
  position: BlogImagePosition;
  /** Explicit width (next/image, prevents CLS). */
  width: number;
  /** Explicit height (next/image, prevents CLS). */
  height: number;
  /** Optional visible figcaption. */
  caption?: string;
}

/** A contextual internal link to a money page (2–4 per post, descriptive anchor). */
export interface BlogLinkOut {
  /** Relative href to the money page (approval/guide/service). */
  href: string;
  /** Descriptive anchor text — never "click here". */
  label: string;
}

/** Ordered content blocks for a post body (13-section anatomy, filled in Phase 7). */
export type BlogSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string }
  | { type: "image"; image: BlogImage }
  | { type: "expert-insight"; text: string };

/** Blog FAQ item — visible text mirrors FAQPage schema word-for-word. */
export interface BlogFAQ {
  question: string;
  answer: string;
}

/**
 * One stat fact for the article §5.4 stats strip (4–5 per post).
 * Values MUST come from real, verifiable data — never fabricated (master
 * rule §4: no fake numbers). Phase 7 writers fill these per post.
 */
export interface BlogStat {
  /** Short compact value — e.g. "5–7 days", "AED 1,500+", "52 approvals". */
  value: string;
  /** Short label under the value — e.g. "DM approval timeline". */
  label: string;
}

/** One approved blog post (19 EN + 19 AR = 38 URLs, categories file §4). */
export interface BlogPost {
  /** URL slug (e.g., "dubai-building-regulations-2026-updates"). */
  slug: string;
  /** Category this post belongs to. */
  categoryId: BlogCategoryId;
  /** Page title / H1. */
  title: string;
  /**
   * Meta title base — keyword front-loaded; the blog layout template appends
   * " | Wasleen Approvals" so the stored value stays ≤ ~41 chars (final ≤60).
   */
  seoTitle: string;
  /** Meta description — 140–160 chars, one concrete number, CTA. */
  description: string;
  /** Direct-answer lead — 2–3 sentences, quotable in isolation (AI extraction). */
  lead: string;
  /** Full content body (13-section anatomy — populated in Phase 7). */
  body: BlogSection[];
  /** FAQ block (5–8) — mirrors FAQPage schema. Populated in Phase 7. */
  faqs: BlogFAQ[];
  /** Topic tags (3–4 per post). */
  tags: string[];
  /** Author from the verified registry (src/data/authors.ts — plan §0.2). */
  authorId: "jamsheed-khalid" | "kavya-ramachandran" | "organization";
  /** Optional reviewer — same registry (E-E-A-T review line). */
  reviewerId?: "jamsheed-khalid" | "kavya-ramachandran" | "organization";
  /** Estimated read time in minutes. */
  readTime: number;
  /** Actual live URL date (ISO) — stamped by PM at publish (plan §0.4). */
  publishedAt: string;
  /** Last updated date (ISO) — visible "last updated" = dateModified. */
  lastUpdated: string;
  /** Publish lifecycle (draft → ready → live). */
  status: BlogStatus;
  /** 2–3 images, varied positions. Phase 7 fills fully; index uses hero images. */
  images: BlogImage[];
  /** 2–4 contextual money-page links (descriptive anchors). */
  linkOuts: BlogLinkOut[];
  /** 1–2 sibling blog post slugs for internal linking. */
  relatedPostSlugs: string[];
  /** ZONE 3 featured pick (single post). */
  featured?: boolean;
  /** ZONE 6 trending pick. */
  trending?: boolean;
  /** 4–5 facts for the §5.4 stats strip — real data, never fabricated. */
  stats?: BlogStat[];
}

/** Arabic content for a blog post — native-Arabic SEO rewrite, NOT translation. */
export interface BlogArabicContent {
  /** Arabic-script slug (mirrors English: /ar/blog/{slug}). */
  slug: string;
  /** Arabic title / H1. */
  title: string;
  /** Arabic meta title base. */
  seoTitle: string;
  /** Arabic meta description. */
  description: string;
  /** Arabic direct-answer lead. */
  lead: string;
  /** Arabic content body. */
  body: BlogSection[];
  /** Arabic FAQ block. */
  faqs: BlogFAQ[];
  /** Arabic topic tags. */
  tags: string[];
}

/** Stub entry type for Arabic blog data files (parity with approvals-ar pattern). */
export interface BlogArabicEntry {
  slug: string;
  ar: BlogArabicContent;
}
