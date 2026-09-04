/**
 * ArCaseStudyFileCard — Arabic Z5 file-stamped register card (server; rendered
 * by the client Arabic hub orchestrator `ArCaseStudyHub`, mega-plan Part 19
 * Step 6c).
 *
 * RTL-safe Arabic twin of `src/components/case-studies/CaseStudyFileCard.tsx`.
 * Each card consumes the shared EN `ApprovalCaseStudy` twin (for `sourceRef`,
 * `lastUpdated`, `authorities`, `slug` — values that must never be duplicated)
 * PLUS its native Arabic `CaseStudyArabicContent` (`ar.arTitle`,
 * `ar.arDescription`, `ar.arProjectType`, `ar.arLocation`, `ar.arSector`,
 * `ar.arQuotedFee`) so every VISIBLE string renders 100% Arabic (Part 10.2 /
 * gate 11.3).
 *
 * Arabic typography rules (locked):
 *   - `font-mono` is reserved for the Latin `sourceRef` ONLY. Arabic dates,
 *     fees and labels render plain `text-*` — never mono (Arabic glyphs).
 *   - Arabic headings keep `font-montserrat` (the font stack falls back for
 *     Arabic glyphs) — consistent across every Arabic twin.
 *   - Logical `ms-auto` (margin-inline-start:auto) pushes the view-story link
 *     to the inline end — the RTL-correct counterpart of EN physical `ml-auto`.
 *   - `ArrowLeft` is the forward arrow in RTL (mirrors EN `ArrowRight`).
 *
 * Owner directive (2026-09-02): the hub presents EVERY file as "معتمد / مكتمل"
 * (constant, not the per-entry status), and each card carries its own light
 * token gradient selected by the hub via the `tone` prop. Detail pages keep
 * the real per-entry status.
 *
 * @see plans/case-studies-mega-plan.md §19.4.5 / Step 6c / gate 11.3
 */

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  EyeOff,
  FileText,
  MapPin,
} from "lucide-react";
import { authorityShortName } from "@/lib/case-studies";
import type {
  ApprovalCaseStudy,
  CaseStudyArabicContent,
} from "@/types/case-study";
import { FILE_CARD_GRADIENTS } from "../CaseStudyFileCard";
import {
  AR_CASE_STUDY_CONSENTED_CLIENT,
  AR_CASE_STUDY_CONFIDENTIAL_PREFIX,
  AR_CASE_STUDY_QUOTE_LABEL,
  AR_CASE_STUDY_STATUS_LABELS,
  AR_CASE_STUDY_VIEW_STORY,
  formatArabicDate,
} from "./ar-labels";

interface ArCaseStudyFileCardProps {
  /** Shared EN twin — `sourceRef`, `lastUpdated`, `authorities`, `slug`. */
  study: ApprovalCaseStudy;
  /** Native Arabic content for this card (100% Arabic visible strings). */
  ar: CaseStudyArabicContent;
  /** Rotates the light background gradient per card (Part 19 revision). */
  tone?: number;
}

/** Hub presentation — owner directive (2026-09-02): every register file shows
 *  "معتمد / مكتمل" (Arabic for "Approved / Completed"). Detail pages keep the
 *  real per-entry status. */
export const AR_APPROVED_LABEL =
  AR_CASE_STUDY_STATUS_LABELS.completed;

/** Status icon + Arabic text label — never colour-only (Part 19.4.5). Hub
 *  shows the fixed Approved / Completed state (owner directive 2026-09-02);
 *  detail pages keep the real per-entry status. */
function StatusLine() {
  return (
    <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-success-green">
      <CheckCircle2
        size={16}
        strokeWidth={1.75}
        className="shrink-0"
        aria-hidden="true"
      />
      {AR_APPROVED_LABEL}
    </span>
  );
}

/** Shortened authority chip — show ≤2 Latin codes, then `+N` (Part 19.4.5).
 *  Codes (DDA, DCD, DM…) are standard entity identifiers already used across
 *  the site's Arabic pages (gate 11.3 exception for Latin acronyms). The
 *  tooltip shows the same compact codes — never the full English authority
 *  names, which must not leak onto the `/ar/` page. */
function AuthorityChip({ authorities }: { authorities: string[] }) {
  const shown = authorities.slice(0, 2).map(authorityShortName).join(" · ");
  const extra = authorities.length - 2;
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-sm border border-border-light px-1.5 py-0.5 text-caption font-medium text-heading-text"
      title={authorities.map(authorityShortName).join(", ")}
    >
      {shown}
      {extra > 0 && <span className="text-body-text/50">+{extra}</span>}
    </span>
  );
}

export default function ArCaseStudyFileCard({
  study,
  ar,
  tone = 0,
}: ArCaseStudyFileCardProps) {
  const gradient = FILE_CARD_GRADIENTS[tone % FILE_CARD_GRADIENTS.length];
  const cardHref = `/ar/case-studies/${study.slug}`;
  /** Arabic headline — the actual fee figure, not "read more". Rendered as
   *  plain text (Arabic fee mixes Latin digits + Arabic currency words — never
   *  mono). Falls back to the Arabic project type. */
  const headline = ar.arQuotedFee || ar.arProjectType;
  const claimCaption = AR_APPROVED_LABEL;

  return (
    <article
      className={`cs-file-card cs-card-lift flex h-full flex-col rounded-md border border-border-light p-6 shadow-card ${gradient}`}
    >
      {/* ---- Header: mono source ref + authority chip ---- */}
      <header className="flex items-start justify-between gap-3">
        <span className="flex min-w-0 items-center gap-1.5 font-mono text-caption text-body-text/70">
          <FileText
            size={14}
            strokeWidth={1.75}
            className="shrink-0 text-body-text/50"
            aria-hidden="true"
          />
          <span className="truncate">{study.sourceRef}</span>
        </span>
        <AuthorityChip authorities={study.authorities} />
      </header>

      {/* ---- Status: icon + label, never colour-only ---- */}
      <div className="mt-3">
        <StatusLine />
      </div>

      {/* ---- Arabic title + Arabic description ---- */}
      <h3 className="mt-3 font-montserrat text-h4 font-bold leading-snug text-heading-text">
        <Link href={cardHref} className="cs-underline-grow">
          {ar.arTitle}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-body-sm text-body-text/80">
        {ar.arDescription}
      </p>

      {/* ---- Headline stat: the actual fee, not "read more" ---- */}
      <p className="mt-4 text-h4 font-medium text-brand-blue">{headline}</p>

      {/* ---- Mini meta rows (Arabic values; dt labels sr-only) ---- */}
      <dl className="mt-4 space-y-1.5 text-body-sm text-body-text">
        <div className="flex items-center gap-2">
          <MapPin
            size={16}
            strokeWidth={1.75}
            className="shrink-0 text-body-text/60"
            aria-hidden="true"
          />
          <dt className="sr-only">الموقع</dt>
          <dd className="truncate">{ar.arLocation}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase
            size={16}
            strokeWidth={1.75}
            className="shrink-0 text-body-text/60"
            aria-hidden="true"
          />
          <dt className="sr-only">نوع المشروع</dt>
          <dd className="truncate">{ar.arProjectType}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CalendarClock
            size={16}
            strokeWidth={1.75}
            className="shrink-0 text-body-text/60"
            aria-hidden="true"
          />
          <dt className="sr-only">آخر تحديث</dt>
          <dd>{formatArabicDate(study.lastUpdated)}</dd>
        </div>
      </dl>

      {/* ---- File rule: dashed quotation → solid build (echoes Part 6.3).
             Arabic captions render plain text — never mono. ---- */}
      <div className="mt-4">
        <div className="cs-file-rule" aria-hidden="true">
          <span className="cs-rule--quote" />
          <span className="cs-rule--build" />
        </div>
        <div className="mt-1.5 flex justify-between text-caption text-body-text/60">
          <span>{AR_CASE_STUDY_QUOTE_LABEL}</span>
          <span>{claimCaption}</span>
        </div>
      </div>

      {/* ---- Footer: redaction signature / consent + view link ---- */}
      <footer className="mt-auto flex items-center gap-2 pt-4">
        <span className="flex min-w-0 items-center gap-1.5 text-caption text-body-text/60">
          {study.consentGranted ? (
            <CheckCircle2
              size={16}
              strokeWidth={1.75}
              className="shrink-0 text-success-green"
              aria-hidden="true"
            />
          ) : (
            <span className="cs-redact-glyph shrink-0 text-body-text/50">
              <EyeOff
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
          )}
          <span
            className="truncate"
            title={
              study.consentGranted
                ? AR_CASE_STUDY_CONSENTED_CLIENT
                : `${AR_CASE_STUDY_CONFIDENTIAL_PREFIX}${ar.arSector}`
            }
          >
            {study.consentGranted
              ? AR_CASE_STUDY_CONSENTED_CLIENT
              : `${AR_CASE_STUDY_CONFIDENTIAL_PREFIX}${ar.arSector}`}
          </span>
        </span>

        <Link
          href={cardHref}
          className="ms-auto inline-flex shrink-0 items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          {AR_CASE_STUDY_VIEW_STORY}
          <span className="cs-arrow-shift">
            <ArrowLeft
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>
          <span className="sr-only"> لـ {ar.arTitle}</span>
        </Link>
      </footer>
    </article>
  );
}
