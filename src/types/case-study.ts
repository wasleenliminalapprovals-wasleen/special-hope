/**
 * Case Study Type Definitions (EN + AR)
 *
 * ADDITIVE-ONLY — this is a NEW type declaration file created for the
 * Case Studies mega-plan (plans/case-studies-mega-plan.md). It MUST NEVER
 * modify `src/types/index.ts`. Shared types (`ProcessStep`, `FAQItem`) are
 * imported READ-ONLY from `@/types` — see addendum A.4 of the plan
 * (`ProcessStep` at index.ts:64, `FAQItem` at index.ts:40).
 *
 * @see plans/case-studies-mega-plan.md Part 3 — Data Model
 * @see plans/case-studies-mega-plan.md Part 2 — Consent & data status
 */

import type { ProcessStep, FAQItem } from "@/types";

/* ============================================================
   Image
   ============================================================ */

export interface CaseStudyImage {
  /** `/images/case-studies/{slug}/{file}.webp` or an existing site library image */
  src: string;
  /** Descriptive alt text — never "image" */
  alt: string;
  /** Optional figure caption (matches ImageObject schema caption) */
  caption?: string;
  /** Explicit dimensions to prevent CLS (1600x900 hero, 1200x900 in-article) */
  width: number;
  height: number;
  /**
   * Where the image is used on the page (Part 18.4). `hero` = OG + hero
   * banner, `photo` = post-hero real photo from the site library, `documents`
   * = in-article blueprint/checklist figure. Optional for backward parity.
   */
  placement?: "hero" | "photo" | "documents";
}

/* ============================================================
   Stats / Results chip
   ============================================================ */

export interface CaseStudyStat {
  label: string;
  /** TRUE server-rendered value — count-up is decorative only */
  value: string;
}

/* ============================================================
   Documents table row
   ============================================================ */

export interface CaseStudyDocumentRow {
  document: string;
  description: string;
  /** Who supplies the document */
  providedBy: "client" | "wasleen";
}

/* ============================================================
   Timeline before/after row
   ============================================================ */

export interface CaseStudyTimelineRow {
  stage: string;
  /** Dashed = proposed */
  planned: string;
  /** Solid = as-built */
  actual: string;
  /** Optional annotation */
  note?: string;
}

/* ============================================================
   Pro Tip
   ============================================================ */

export interface CaseStudyProTip {
  title: string;
  body: string;
}

/* ============================================================
   Honest claim-level status (addendum A.1)
   ============================================================
   - `quoted`       → only the quotation exists in source
   - `in-progress`  → owner confirms work underway
   - `completed`    → owner confirms final approval received
   This is the CLAIM level, separate from `publishStatus` (draft/live).
   ============================================================ */

export type CaseStudyStatus = "quoted" | "in-progress" | "completed";

/* ============================================================
   Animated timeline node (Section 5 — Part 6.2 choreography)
   ADDITIVE judgment call: the plan's Part 3.1 model has no field for
   per-node diagram states, yet Part 6.2 #3/#6 and Part 17.2 require a
   red "rejected→fixed" resolution node and non-color-only glyphs. This
   optional `timeline` array on `ApprovalCaseStudy` supplies exactly that.
   When absent, `CaseStudyTimeline` falls back to `solutionSteps` mapped as
   all-"approved" nodes (the HowTo text stays the single source for Section 6).
   ============================================================ */

export type CaseStudyTimelineState = "approved" | "rejected" | "pending";

export interface CaseStudyTimelineNode {
  /** Short node label shown on the diagram */
  title: string;
  /** Detail revealed on click/expand (date/document/outcome) */
  detail: string;
  /** Milestone state — feeds the glyph + choreography */
  state: CaseStudyTimelineState;
  /** Optional ISO date for the milestone */
  date?: string;
}

/* ============================================================
   Author / Reviewer
   ============================================================ */

export interface CaseStudyAuthor {
  name: string;
  credential: string;
  url?: string;
}

export interface CaseStudyReviewer {
  name: string;
  credential: string;
}

/* ============================================================
   EN Case Study — ApprovalCaseStudy (Part 3.1)
   ============================================================ */

export interface ApprovalCaseStudy {
  /** Stable slug: {project-type}-{location}-{authority}-approval */
  slug: string;
  /** H1, keyword front-loaded, <=60 chars */
  projectTitle: string;
  /** Base title; template appends " | Wasleen Approvals" */
  seoTitle: string;
  /** 140-160 chars, one concrete number + CTA */
  description: string;
  /** e.g. "LML/QTN/1114R1" */
  sourceRef: string;
  /** Real client name published ONLY with confirmed written consent */
  consentGranted: boolean;
  /** Anonymized or consented label */
  clientLabel: string;
  /** Honest claim level from source + owner confirmation */
  projectStatus: CaseStudyStatus;
  /** From SUBJECT */
  authorities: string[];
  /** Explicit `about` target -> /approvals/{slug} */
  primaryApprovalSlug: string;
  projectType: string;
  /** Area only, never full address */
  location: string;
  sector: string;
  /** 2-3 self-contained sentences (GEO-liftable verbatim) */
  directAnswer: string;
  /** 4 facts: authority, quoted fee, scope, status */
  stats: CaseStudyStat[];
  /** Narrative — E-E-A-T Experience */
  challenge: string;
  /** Mirrors HowTo schema text word-for-word */
  solutionSteps: ProcessStep[];
  /**
   * Animated timeline nodes (Section 5). Optional — falls back to
   * `solutionSteps` (all "approved") when absent. See CaseStudyTimelineNode.
   */
  timeline?: CaseStudyTimelineNode[];
  documentsTable: CaseStudyDocumentRow[];
  /** Before/after planned vs actual */
  timelineTable: CaseStudyTimelineRow[];
  /** Exact from PDF */
  quotedFee: string;
  /**
   * Optional numeric AED value (owner-approved Part 19 addendum). Feeds the
   * build-time combined-quoted-value aggregate on the hub (Part 19 §19.6).
   * Visible display stays on `quotedFee`; this number is never fabricated
   * by string-parsing display text — only populated when the owner has an
   * exact figure to record.
   */
  feeAmountAED?: number;
  /** Scope line items verbatim from PDF */
  feeIncluded: string[];
  /** Max 2 */
  proTips: CaseStudyProTip[];
  /** Results chips — only proven claims */
  outcome: CaseStudyStat[];
  /** Visible text = FAQPage schema text word-for-word */
  faqs: FAQItem[];
  images: CaseStudyImage[];
  relatedApprovalSlugs: string[];
  relatedGuideSlugs: string[];
  /** Service pages linked via sentence anchors + sidebar (Part 18.6 / 18.7) */
  relatedServiceSlugs: string[];
  relatedCaseStudySlugs: string[];
  author: CaseStudyAuthor;
  reviewedBy: CaseStudyReviewer;
  /** Real ISO date (default = quotation date, never > live date) */
  publishedAt: string;
  /** Real ISO date, matches visible date */
  lastUpdated: string;
  /** Only `live` enters sitemap + llms.txt */
  publishStatus: "draft" | "live";
}

/* ============================================================
   Arabic Case Study — CaseStudyArabicContent (Part 3.2)
   ============================================================
   Mirrors the EN shape with native Arabic strings. `sourceRef`,
   ISO dates and `slug` are shared with the EN twin; every string
   that is VISIBLE on the `/ar/` page is authored in Arabic here so
   the page renders 100% Arabic (native writing, Part 10.2) —
   including the prose "fact values" that EN Sections 2 (Stats), 3
   (At a Glance) and 5 (Timeline) and the AR hub cards display.
   ============================================================ */

export interface CaseStudyArabicContent {
  /** Same stable slug as the EN twin */
  slug: string;
  /** Same source ref as the EN twin (parity key) */
  sourceRef: string;
  publishStatus: "draft" | "live";
  arTitle: string;
  arDirectAnswer: string;

  /* --- Arabic fact values (AR Section 3 "At a Glance" + hub cards) --- */
  /** Arabic for EN `projectType` (e.g. "تشطيب مركز أعمال") */
  arProjectType: string;
  /** Arabic for EN `location` (e.g. "دبي إنترنت سيتي") */
  arLocation: string;
  /** Arabic for EN `sector` (e.g. "تجاري") */
  arSector: string;
  /** Arabic display of the quoted fee (e.g. "14,000 درهم إماراتي") */
  arQuotedFee: string;

  /* --- Arabic 4-fact strip (AR Section 2 — mirrors EN `stats`) --- */
  arStats: CaseStudyStat[];

  arChallenge: string;
  arSolutionSteps: ProcessStep[];

  /* --- Arabic animated-timeline milestones (AR Section 5) ---
     Mirrors the optional EN `timeline` node array with Arabic
     `title`/`detail` so the diagram text stays native. */
  arTimeline: CaseStudyTimelineNode[];

  arDocumentsTable: CaseStudyDocumentRow[];
  arTimelineTable: CaseStudyTimelineRow[];
  arProTips: CaseStudyProTip[];
  arOutcome: CaseStudyStat[];
  arFaqs: FAQItem[];
  /** Optional Arabic `alt` for the `placement:"photo"` image. The photo `src`
      is shared with the EN twin (images are read at render — Part 3.2); its
      alt/caption prose is authored natively here so the `/ar/` page stays
      Arabic. Falls back to the EN `alt` when absent. */
  arPhotoAlt?: string;
  /** Optional Arabic caption beneath the post-hero photo. When absent the
      Arabic Photo twin renders the image without a figcaption — the EN
      caption is English and must never leak onto the `/ar/` page. */
  arPhotoCaption?: string;
  arDescription: string;
  arPrimaryKeyword: string;
  arSecondaryKeywords: string[];
  arAuthor: CaseStudyAuthor;
  arReviewedBy: CaseStudyReviewer;
}

/* ============================================================
   Hub grouping / filter facet (client-side only)
   ============================================================ */

export type CaseStudyFacet = "authority" | "sector" | "projectType" | "status" | "location";

export interface CaseStudyFilterOption {
  facet: CaseStudyFacet;
  value: string;
  label: string;
}
