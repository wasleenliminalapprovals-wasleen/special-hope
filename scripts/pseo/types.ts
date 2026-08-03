import type {
  FAQItem,
  PseoArabicContent,
  PseoPage,
  PseoPageKind,
  PseoSection,
} from "../../src/types";

/**
 * Shared types for the pSEO generation engine (scripts/pseo).
 * These mirror/extend src/types for the pipeline only — they are not imported
 * by the Next.js app (which uses src/types directly).
 */

export type QueueStatus = "pending" | "in-progress" | "done" | "failed";

/** One row in scripts/pseo/queue.json */
export interface PseoQueueItem {
  id: string;
  slug: string;
  kind: PseoPageKind;
  title: string;
  authority: string;
  priority: number;
  /** YYYY-MM-DD — earliest date the item may be generated */
  scheduledDate: string;
  status: QueueStatus;
  primaryKeyword: string;
  secondaryKeywords: string[];
  topicTags: string[];
  targetWordCount: number;
  imageHint?: string;
  faqCount: number;
  relatedApprovalSlugs: string[];
  ar: {
    title: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
  };
  attempts?: number;
  lastError?: string;
  generatedAt?: string;
}

export interface PseoQueueFile {
  items: PseoQueueItem[];
}

/**
 * The structured payload DeepSeek must return (EN and AR each get one).
 * Validated against this shape by the quality gate before anything is written.
 */
export interface GeneratedPseoContent {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  directAnswer: string;
  sections: PseoSection[];
  faqs: FAQItem[];
}

/** Result of the automated quality gate. */
export interface QualityReport {
  pass: boolean;
  scores: Record<string, number>;
  failures: string[];
}

/** Fully assembled output for one queue item (EN + AR pair). */
export interface GenerationResult {
  item: PseoQueueItem;
  en: GeneratedPseoContent;
  ar: GeneratedPseoContent;
  quality: QualityReport;
  arabicPass: boolean;
  reviewStatus: "auto" | "needs-review";
  factIssues: string[];
  page: PseoPage;
  arEntry: { slug: string; ar: PseoArabicContent };
}
