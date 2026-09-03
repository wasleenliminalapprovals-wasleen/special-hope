/**
 * CaseStudyChallenge — Section 4: The Challenge + Pro Tip 1 (Part 5.1 #4).
 *
 * Server component. Renders the challenge narrative (E-E-A-T Experience
 * signal) followed by Pro Tip 1. The narrative is authored per quotation in
 * the data module — never copied between pages. The Pro Tip is the shared
 * `CaseStudyProTip` primitive (right-angled box, corner drafting ticks,
 * amber PRO TIP chip — Part 7.2).
 *
 * Text stays in the DOM immediately; only the Pro Tip fires its view event
 * when it enters the viewport (client primitive).
 */

import type { ApprovalCaseStudy } from "@/types/case-study";
import CaseStudyProTip from "./CaseStudyProTip";

interface CaseStudyChallengeProps {
  study: ApprovalCaseStudy;
}

export default function CaseStudyChallenge({ study }: CaseStudyChallengeProps) {
  const paragraphs = study.challenge
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean);

  return (
    <section aria-labelledby="case-study-challenge-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="cs-reading-col">
          <h2
            id="case-study-challenge-heading"
            className="text-h2 font-montserrat font-bold text-heading-text"
          >
            The Challenge
          </h2>
          <div className="mt-4 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body leading-relaxed text-body-text">
                {paragraph}
              </p>
            ))}
          </div>

          {study.proTips[0] && (
            <div className="mt-8">
              <CaseStudyProTip slug={study.slug} tip={study.proTips[0]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
