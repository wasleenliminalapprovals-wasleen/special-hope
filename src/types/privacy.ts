/**
 * Privacy Policy data types.
 *
 * Shared by the EN (/privacy-policy) and AR (/ar/privacy-policy) pages via the
 * common PrivacyPolicyPage component. The structure guarantees 1:1 parity
 * between the English and Arabic documents (required for hreflang/schema
 * parity) while allowing fully native, context-appropriate copy per locale.
 *
 * @see plans/privacy-policy-build-plan.md
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md (FAQPage schema rules)
 */

import type { FAQItem } from "@/types";

/** A single row in a data table — one string per column. */
export interface PrivacyTableRow {
  cells: string[];
}

/**
 * A data-dense table (AI/GEO requirement — AI models parse HTML tables well).
 * Used for "Information We Collect" and "How We Use Your Information / Legal Basis".
 */
export interface PrivacyTable {
  /** Anchor-friendly unique id. */
  id: string;
  /** Optional <caption> shown above the table. */
  caption?: string;
  /** Column headers (rendered in <thead>). */
  headers: string[];
  /** Body rows (rendered in <tbody>). */
  rows: PrivacyTableRow[];
}

/** An inline link used inside a section body (E-E-A-T / authority links). */
export interface PrivacyInlineLink {
  label: string;
  href: string;
  external?: boolean;
}

/** A highlighted callout card (pillar section + important notices). */
export interface PrivacyCallout {
  title: string;
  body: string;
}

/** A single bullet list block within a section. */
export interface PrivacyListBlock {
  /** Optional lead-in sentence before the list. */
  intro?: string;
  items: string[];
}

/** A single anchorable section of the policy. */
export interface PrivacySection {
  /** Anchor id used by the sidebar TOC (e.g. "no-third-party-sharing"). */
  id: string;
  /** Section heading (rendered as <h2>). */
  heading: string;
  /** Shorter label for the sidebar TOC (falls back to `heading`). */
  sidebarLabel?: string;
  /** Body paragraphs. */
  paragraphs: string[];
  /** Optional bullet list blocks. */
  lists?: PrivacyListBlock[];
  /** Optional data table. */
  table?: PrivacyTable;
  /** Optional highlighted callout card. */
  callout?: PrivacyCallout;
  /** Optional inline links. */
  links?: PrivacyInlineLink[];
}

/** A stat used in the stats strip (numbers are the most-quoted by AI engines). */
export interface PrivacyStat {
  label: string;
  value: string;
}

/** A related-page link shown in the internal-linking block (Section 12). */
export interface PrivacyRelatedLink {
  label: string;
  href: string;
  description: string;
}

/** Complete localized privacy policy content. */
export interface PrivacyContent {
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  badgeLabel: string;
  h1: string;
  /** Self-contained direct-answer block (liftable verbatim by AI engines). */
  directAnswer: string;
  lastUpdatedLabel: string;
  /** Visible date — MUST match schema `dateModified` exactly. */
  lastUpdated: string;
  stats: PrivacyStat[];
  sections: PrivacySection[];
  /** FAQ items — visible text MUST match FAQPage schema verbatim. */
  faqs: FAQItem[];
  faqTitle: string;
  faqSubtitle?: string;
  contactTitle: string;
  contactBody: string;
  contactCtaLabel: string;
  callCtaLabel: string;
  whatsappCtaLabel: string;
  /** Pre-filled WhatsApp message (must reference the privacy topic). */
  whatsappMessage: string;
  /** Standard disclaimer shown beneath every table. */
  disclaimer: string;
  sidebarAriaLabel: string;
  breadcrumbLabel: string;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: PrivacyRelatedLink[];
}
