/**
 * ArCaseStudyBeforeAfter — Section 8: Timeline & Cost Planned vs Actual
 * (Arabic /ar/ twin).
 *
 * Server component. Arabic RTL-safe twin of `CaseStudyBeforeAfter`
 * (mega-plan Part 14 Step 6b.3). Full-bleed tinted data zone (`.cs-data-zone`)
 * comparing the quoted (planned) timeline with what actually happened. The
 * blueprint legend and table bars use the same classes as the EN twin —
 * planned = dashed brand-blue bar, actual = solid uae-green bar. The bars are
 * decorative (`aria-hidden`); the TRUE values are always plain Arabic text in
 * the SSR markup (AI parseable, no JavaScript required).
 *
 * The stage / planned / actual / note cells come from `arTimelineTable`
 * (native Arabic). Uses the `ArCaseStudyTable` primitive (RTL-safe).
 *
 * @see src/components/case-studies/CaseStudyBeforeAfter.tsx (EN twin, LOCKED)
 * @see src/components/case-studies/ar/ArCaseStudyTable.tsx
 */

import type { CaseStudyArabicContent } from "@/types/case-study";
import ArCaseStudyTable from "./ArCaseStudyTable";

interface ArCaseStudyBeforeAfterProps {
  ar: CaseStudyArabicContent;
}

export default function ArCaseStudyBeforeAfter({
  ar,
}: ArCaseStudyBeforeAfterProps) {
  if (ar.arTimelineTable.length === 0) return null;

  return (
    <section
      aria-labelledby="ar-case-study-before-after-heading"
      className="cs-data-zone"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <h2
          id="ar-case-study-before-after-heading"
          className="text-h2 font-montserrat font-bold text-heading-text"
        >
          المخطط مقابل الفعلي
        </h2>
        <p className="mt-3 max-w-2xl text-body text-body-text">
          كيف قورن الجدول الزمني المُشار إليه في العرض بما حدث فعلياً في هذا
          التعاقد.
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-caption text-body-text/80">
          <span className="inline-flex items-center gap-2">
            <span className="cs-bar--planned h-2 w-6 shrink-0 rounded-sm" aria-hidden="true" />
            المقترح (المخطط)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="cs-bar--actual h-2 w-6 shrink-0 rounded-sm" aria-hidden="true" />
            المنفّذ (الفعلي)
          </span>
        </div>

        <div className="mt-6">
          <ArCaseStudyTable
            caption="المخطط مقابل الجدول الزمني الفعلي"
            hideCaption
            headers={["المرحلة", "المخطط", "الفعلي", "ملاحظة"]}
            rows={ar.arTimelineTable.map((row) => [
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
