/**
 * ArCaseStudyResults — Arabic Section 9 "النتائج" (case-studies mega-plan
 * Part 5.1 #9 / Step 6b.3).
 *
 * Server component. RTL-safe port of the EN `CaseStudyResults`. Metric chips
 * render ONLY proven claims authored in `ar.arOutcome` (native Arabic,
 * Part 10.2) — never invented stats, ratings, or reviews (Part 4 "What NEVER
 * to do"). TRUE values are plain text in the SSR markup. `font-mono` is not
 * used for the values because they carry Arabic text — Arabic renders with the
 * default (Roboto → system-ui) stack. Pro Tip 2 (`ar.arProTips[1]`) sits
 * beneath via `ArCaseStudyProTip`.
 *
 * @see plans/case-studies-mega-plan.md Part 5.1 #9 / Step 6b.3 / Part 4
 */

import type { CaseStudyArabicContent } from "@/types/case-study";
import CaseStudyReveal from "../CaseStudyReveal";
import ArCaseStudyProTip from "./ArCaseStudyProTip";

interface ArCaseStudyResultsProps {
  ar: CaseStudyArabicContent;
}

export default function ArCaseStudyResults({ ar }: ArCaseStudyResultsProps) {
  if (ar.arOutcome.length === 0) return null;

  return (
    <section aria-labelledby="ar-case-study-results-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="cs-reading-col">
          <h2
            id="ar-case-study-results-heading"
            className="text-h2 font-montserrat font-bold text-heading-text"
          >
            النتائج
          </h2>
          <p className="mt-3 text-body text-body-text">
            ما حقّقته هذه المهمة — مقتصراً على ما تثبته مستندات المصدر فعلياً.
          </p>

          <CaseStudyReveal className="cs-pop-stagger">
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {ar.arOutcome.map((chip) => (
                <li
                  key={chip.label}
                  className="rounded-md border border-border-light bg-card-bg p-4"
                >
                  <p className="text-h3 font-medium leading-tight text-success-green">
                    {chip.value}
                  </p>
                  <p className="mt-1 text-caption font-medium tracking-wide text-body-text/70">
                    {chip.label}
                  </p>
                </li>
              ))}
            </ul>
          </CaseStudyReveal>

          {ar.arProTips[1] && (
            <div className="mt-8">
              <ArCaseStudyProTip slug={ar.slug} tip={ar.arProTips[1]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
