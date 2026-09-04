/**
 * ArCaseStudyChallenge — Arabic Section 4 "التحدي" (case-studies mega-plan
 * Part 5.1 #4 / Step 6b.3).
 *
 * Server component. RTL-safe port of the EN `CaseStudyChallenge`: the E-E-A-T
 * "Experience" narrative. Paragraphs come from `ar.arChallenge` (native
 * Arabic, Part 10.2 — first-person plural "نحن في وسلين", entity-first) and
 * Pro Tip 1 renders beneath via `ArCaseStudyProTip`.
 *
 * @see plans/case-studies-mega-plan.md Part 5.1 #4 / Step 6b.3 / Part 10.2
 */

import type { CaseStudyArabicContent } from "@/types/case-study";
import ArCaseStudyProTip from "./ArCaseStudyProTip";

interface ArCaseStudyChallengeProps {
  ar: CaseStudyArabicContent;
}

function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function ArCaseStudyChallenge({ ar }: ArCaseStudyChallengeProps) {
  const paragraphs = toParagraphs(ar.arChallenge);

  return (
    <section aria-labelledby="ar-case-study-challenge-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="cs-reading-col">
          <h2
            id="ar-case-study-challenge-heading"
            className="text-h2 font-montserrat font-bold text-heading-text"
          >
            التحدي
          </h2>
          <div className="mt-4 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body leading-relaxed text-body-text">
                {paragraph}
              </p>
            ))}
          </div>
          {ar.arProTips[0] && (
            <div className="mt-8">
              <ArCaseStudyProTip slug={ar.slug} tip={ar.arProTips[0]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
