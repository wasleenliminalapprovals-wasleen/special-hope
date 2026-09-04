import Link from "next/link";
import { CheckCircle2, CircleDot, Clock3, FileClock } from "lucide-react";
import type { ApprovalCaseStudy } from "@/types/case-study";
import {
  AR_CASE_STUDY_RECENT_LABEL,
  AR_CASE_STUDY_VIEW_REGISTER,
  formatArabicDate,
} from "./ar-labels";

/**
 * ArHubFreshnessStrip — Arabic RTL-safe twin of
 * `src/components/case-studies/HubFreshnessStrip.tsx` (Z4 freshness strip).
 *
 * Sits above the Arabic register grid and lists the top 4 entries by
 * `lastUpdated` desc — a visible E-E-A-T freshness signal ("this register
 * moves"). Renders only real SSR data; the project titles are the native
 * Arabic `ar.arTitle` values and the dates use `formatArabicDate` (ar-AE).
 * `font-mono` is applied ONLY to the Latin `sourceRef` — the Arabic date is
 * plain `text-caption` (Arabic never renders in the mono font, matching the
 * detail-page AR components). Logical `ms-auto` (not physical `ml-auto`)
 * pushes the date and the "View register" link to the inline end in RTL.
 *
 * @see src/components/case-studies/HubFreshnessStrip.tsx (EN twin)
 * @see plans/case-studies-mega-plan.md §19.4.4
 */

export interface ArHubFreshnessItem {
  slug: string;
  /** Native Arabic project title (`ar.arTitle`). */
  projectTitle: string;
  sourceRef: string;
  lastUpdated: string;
  projectStatus: ApprovalCaseStudy["projectStatus"];
}

export interface ArHubFreshnessStripProps {
  /** Top 4 entries by `lastUpdated` desc — pre-sorted by the caller. */
  recent: ArHubFreshnessItem[];
}

/** Tiny status glyph — icon + colour, never colour-only (Part 19.4.5 rule). */
function StatusGlyph({
  status,
}: {
  status: ApprovalCaseStudy["projectStatus"];
}) {
  if (status === "completed") {
    return (
      <CheckCircle2
        size={14}
        strokeWidth={1.75}
        className="shrink-0 text-success-green"
        aria-hidden="true"
      />
    );
  }
  if (status === "in-progress") {
    return (
      <CircleDot
        size={14}
        strokeWidth={1.75}
        className="shrink-0 text-cta-amber"
        aria-hidden="true"
      />
    );
  }
  return (
    <FileClock
      size={14}
      strokeWidth={1.75}
      className="shrink-0 text-body-text/50"
      aria-hidden="true"
    />
  );
}

export default function ArHubFreshnessStrip({
  recent,
}: ArHubFreshnessStripProps) {
  if (recent.length === 0) return null;

  return (
    <section
      aria-labelledby="ar-recently-updated"
      className="rounded-md border border-border-light bg-white p-5 shadow-card"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Clock3
          size={20}
          strokeWidth={1.75}
          className="shrink-0 text-brand-blue"
          aria-hidden="true"
        />
        <h2
          id="ar-recently-updated"
          className="text-h4 font-montserrat font-bold text-heading-text"
        >
          {AR_CASE_STUDY_RECENT_LABEL}
        </h2>
        <Link
          href="/ar/case-studies"
          className="cs-underline-grow ms-auto inline-flex items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover"
        >
          {AR_CASE_STUDY_VIEW_REGISTER}
        </Link>
      </div>

      <p className="mt-2 text-body-sm text-body-text/70">
        أحدث مستندات الإثبات المحدَّثة في السجل.
      </p>

      <ul className="cs-fresh-row mt-4 flex gap-3 overflow-x-auto">
        {recent.map((item) => (
          <li
            key={item.slug}
            className="min-w-[240px] flex-none rounded-md border border-border-light bg-light-bg p-4"
          >
            <div className="flex items-center gap-1.5">
              <StatusGlyph status={item.projectStatus} />
              <span className="font-mono text-caption text-body-text/70">
                {item.sourceRef}
              </span>
              <span className="ms-auto text-caption text-body-text/60">
                {formatArabicDate(item.lastUpdated)}
              </span>
            </div>
            <h3 className="mt-2 font-montserrat text-body font-bold leading-snug text-heading-text">
              <Link
                href={`/ar/case-studies/${item.slug}`}
                className="cs-underline-grow"
              >
                {item.projectTitle}
              </Link>
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
