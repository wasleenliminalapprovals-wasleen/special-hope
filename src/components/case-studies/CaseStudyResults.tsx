/**
 * CaseStudyResults — Section 9: Results / Outcome (Part 5.1 #9).
 *
 * Server component. Metric chips render ONLY proven claims from the data model
 * (`study.outcome`) — never invented stats, ratings, or reviews (Part 4
 * "What NEVER to do"). TRUE values are plain text in the SSR markup.
 *
 * Chips pop-fade in with an 80ms stagger (`CaseStudyReveal` + `.cs-pop-stagger`),
 * then Pro Tip 2 (if present) sits beneath via the shared `CaseStudyProTip`.
 */

import type { ApprovalCaseStudy } from "@/types/case-study";
import CaseStudyReveal from "./CaseStudyReveal";
import CaseStudyProTip from "./CaseStudyProTip";

interface CaseStudyResultsProps {
  study: ApprovalCaseStudy;
}

export default function CaseStudyResults({ study }: CaseStudyResultsProps) {
  if (study.outcome.length === 0) return null;

  return (
    <section aria-labelledby="case-study-results-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="cs-reading-col">
          <h2
            id="case-study-results-heading"
            className="text-h2 font-montserrat font-bold text-heading-text"
          >
            Results
          </h2>
          <p className="mt-3 text-body text-body-text">
            What this engagement delivered — limited to what the source documents
            actually support.
          </p>

          <CaseStudyReveal className="cs-pop-stagger">
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {study.outcome.map((chip) => (
                <li
                  key={chip.label}
                  className="rounded-md border border-border-light bg-card-bg p-4"
                >
                  <p className="font-mono text-h3 font-medium leading-tight text-success-green">
                    {chip.value}
                  </p>
                  <p className="mt-1 text-caption font-medium uppercase tracking-wide text-body-text/70">
                    {chip.label}
                  </p>
                </li>
              ))}
            </ul>
          </CaseStudyReveal>

          {study.proTips[1] && (
            <div className="mt-8">
              <CaseStudyProTip slug={study.slug} tip={study.proTips[1]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
