/**
 * CaseStudyBeforeAfter — Section 8: Timeline & Cost Before/After (Part 5.1 #8).
 *
 * Server component. Full-bleed tinted data zone (`.cs-data-zone`) showing the
 * planned (proposed) vs actual (as-built) timeline in a two-column table.
 * Blueprint convention (Part 6.3): planned = dashed brand-blue bar, actual =
 * solid uae-green bar. The bars are decorative (`aria-hidden`); the TRUE values
 * are always plain text in the SSR markup — no JavaScript required to read them.
 *
 * Uses the `CaseStudyTable` primitive (responsive, semantic `<table>`).
 */

import type { ApprovalCaseStudy } from "@/types/case-study";
import CaseStudyTable from "./CaseStudyTable";

interface CaseStudyBeforeAfterProps {
  study: ApprovalCaseStudy;
}

export default function CaseStudyBeforeAfter({ study }: CaseStudyBeforeAfterProps) {
  return (
    <section aria-labelledby="case-study-before-after-heading" className="cs-data-zone">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <h2
          id="case-study-before-after-heading"
          className="text-h2 font-montserrat font-bold text-heading-text"
        >
          Planned vs Actual
        </h2>
        <p className="mt-3 max-w-2xl text-body text-body-text">
          How the quoted timeline compared with what actually happened on this
          engagement.
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-caption text-body-text/80">
          <span className="inline-flex items-center gap-2">
            <span className="cs-bar--planned h-2 w-6 shrink-0 rounded-sm" aria-hidden="true" />
            Proposed (planned)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="cs-bar--actual h-2 w-6 shrink-0 rounded-sm" aria-hidden="true" />
            As-built (actual)
          </span>
        </div>

        <div className="mt-6">
          <CaseStudyTable
            caption="Planned versus actual timeline"
            hideCaption
            headers={["Stage", "Planned", "Actual", "Note"]}
            rows={study.timelineTable.map((row) => [
              <span key="stage" className="font-medium text-body-text">
                {row.stage}
              </span>,
              <span key="planned" className="flex items-center gap-2">
                <span className="cs-bar--planned h-2 w-6 shrink-0 rounded-sm" aria-hidden="true" />
                {row.planned}
              </span>,
              <span key="actual" className="flex items-center gap-2">
                <span className="cs-bar--actual h-2 w-6 shrink-0 rounded-sm" aria-hidden="true" />
                {row.actual}
              </span>,
              <span key="note" className="text-body-text/80">
                {row.note ?? "—"}
              </span>,
            ])}
          />
        </div>
      </div>
    </section>
  );
}
