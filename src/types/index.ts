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
