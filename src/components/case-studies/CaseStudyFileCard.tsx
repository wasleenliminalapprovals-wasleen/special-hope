import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  EyeOff,
  FileText,
  MapPin,
} from "lucide-react";
import { authorityShortName } from "@/lib/case-studies";
import type { ApprovalCaseStudy } from "@/types/case-study";

/**
 * CaseStudyFileCard — Z5 file-stamped register card (server; rendered by the
 * client hub orchestrator).
 *
 * Part 19 §19.4.5. A stamped dossier card — NOT a blog thumbnail:
 * mono source ref in the top-left corner, shortened authority chip top-right,
 * headline fee as the actual figure (never "read more"), icon + text status
 * (never colour-only), a dashed-quotation → solid-build file rule, and a
 * redaction glyph + `Confidential client — {sector}` on anonymised entries.
 *
 * Owner directive (2026-09-02): the hub presents EVERY file as "Approved /
 * Completed" (constant, not the per-entry status), and each card carries its
 * own light token gradient selected by the hub via the `tone` prop. Detail
 * pages keep the real per-entry status.
 *
 * @see plans/case-studies-mega-plan.md §19.4.5
 */

interface CaseStudyFileCardProps {
  study: ApprovalCaseStudy;
  /** Rotates the light background gradient per card (Part 19 revision). */
  tone?: number;
}

/** Hub presentation — owner directive (2026-09-02): every register file shows
 *  "Approved / Completed". Detail pages keep the real per-entry status. */
export const APPROVED_LABEL = "Approved / Completed";

/** Light per-card token gradients, rotated by the hub via `tone`. Each is a
 *  pale tint so the dark card text keeps strong contrast — no raw hex. */
export const FILE_CARD_GRADIENTS = [
  "bg-gradient-to-br from-brand-blue/10 via-card-bg to-white",
  "bg-gradient-to-br from-success-green/10 via-card-bg to-white",
  "bg-gradient-to-br from-link-blue/10 via-white to-card-bg",
  "bg-gradient-to-br from-body-text/10 via-light-bg to-card-bg",
  "bg-gradient-to-br from-brand-blue-hover/20 via-card-bg to-light-bg",
  "bg-gradient-to-br from-link-blue/20 via-card-bg to-white",
  "bg-gradient-to-br from-brand-blue/20 via-light-bg to-card-bg",
  "bg-gradient-to-br from-success-green/20 via-light-bg to-card-bg",
] as const;

/** en-GB, UTC-stable date (mirrors the detail-page formatDate helper). */
function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Status icon + text label — never colour-only (Part 19.4.5). Hub shows the
 *  fixed Approved / Completed state (owner directive 2026-09-02); detail pages
 *  keep the real per-entry status. */
function StatusLine() {
  return (
    <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-success-green">
      <CheckCircle2
        size={16}
        strokeWidth={1.75}
        className="shrink-0"
        aria-hidden="true"
      />
      {APPROVED_LABEL}
    </span>
  );
}

/** Shortened authority chip — show ≤2 codes, then `+N` (Part 19.4.5). */
function AuthorityChip({ authorities }: { authorities: string[] }) {
  const shown = authorities.slice(0, 2).map(authorityShortName).join(" · ");
  const extra = authorities.length - 2;
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-sm border border-border-light px-1.5 py-0.5 text-caption font-medium text-heading-text"
      title={authorities.join(", ")}
    >
      {shown}
      {extra > 0 && <span className="text-body-text/50">+{extra}</span>}
    </span>
  );
}

export default function CaseStudyFileCard({
  study,
  tone = 0,
}: CaseStudyFileCardProps) {
  const gradient = FILE_CARD_GRADIENTS[tone % FILE_CARD_GRADIENTS.length];
  const cardHref = `/case-studies/${study.slug}`;
  const headline = study.quotedFee || study.projectType;
  const claimCaption = APPROVED_LABEL;

  return (
    <article className={`cs-file-card cs-card-lift flex h-full flex-col rounded-md border border-border-light p-6 shadow-card ${gradient}`}>
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

      {/* ---- Title + description ---- */}
      <h3 className="mt-3 font-montserrat text-h4 font-bold leading-snug text-heading-text">
        <Link href={cardHref} className="cs-underline-grow">
          {study.projectTitle}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-body-sm text-body-text/80">
        {study.description}
      </p>

      {/* ---- Headline stat: the actual fee, not "read more" ---- */}
      <p className="mt-4 font-mono text-h4 font-medium text-brand-blue">
        {headline}
      </p>

      {/* ---- Mini meta rows ---- */}
      <dl className="mt-4 space-y-1.5 text-body-sm text-body-text">
        <div className="flex items-center gap-2">
          <MapPin
            size={16}
            strokeWidth={1.75}
            className="shrink-0 text-body-text/60"
            aria-hidden="true"
          />
          <dt className="sr-only">Location</dt>
          <dd className="truncate">{study.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase
            size={16}
            strokeWidth={1.75}
            className="shrink-0 text-body-text/60"
            aria-hidden="true"
          />
          <dt className="sr-only">Project type</dt>
          <dd className="truncate">{study.projectType}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CalendarClock
            size={16}
            strokeWidth={1.75}
            className="shrink-0 text-body-text/60"
            aria-hidden="true"
          />
          <dt className="sr-only">Last updated</dt>
          <dd>{formatDate(study.lastUpdated)}</dd>
        </div>
      </dl>

      {/* ---- File rule: dashed quotation → solid build (echoes Part 6.3) ---- */}
      <div className="mt-4">
        <div className="cs-file-rule" aria-hidden="true">
          <span className="cs-rule--quote" />
          <span className="cs-rule--build" />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-caption text-body-text/60">
          <span>quotation</span>
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
          <span className="truncate" title={study.consentGranted ? study.clientLabel : `Confidential client — ${study.sector}`}>
            {study.consentGranted
              ? study.clientLabel
              : `Confidential client — ${study.sector}`}
          </span>
        </span>

        <Link
          href={cardHref}
          className="ml-auto inline-flex shrink-0 items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          View story
          <span className="cs-arrow-shift">
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>
          <span className="sr-only"> for {study.projectTitle}</span>
        </Link>
      </footer>
    </article>
  );
}
