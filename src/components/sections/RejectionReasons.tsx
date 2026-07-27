/**
 * RejectionReasons — Common rejection reasons and solutions.
 *
 * Shows why applications get rejected and how to avoid each issue.
 * Demonstrates E-E-A-T by showing operational depth and experience.
 *
 * @usage
 * ```tsx
 * <RejectionReasons reasons={approval.rejectionReasons} />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Section 8: Rejection reasons
 */

import { XCircle, CheckCircle2 } from "lucide-react";

interface RejectionItem {
  reason: string;
  solution: string;
}

interface RejectionReasonsProps {
  reasons: RejectionItem[];
  className?: string;
}

export default function RejectionReasons({
  reasons,
  className = "",
}: RejectionReasonsProps) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <section className={`bg-light-bg ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Common Rejection Reasons & How to Avoid Them
          </h2>
          <p className="text-body-lg text-body-text mb-8 max-w-3xl">
            Learn from the most frequent reasons approvals get rejected — and
            how we prevent them with our pre-submission audit process.
          </p>

          <div className="space-y-4">
            {reasons.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 rounded-md bg-white border border-border-light shadow-card"
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-uae-red shrink-0">
                    <XCircle size={20} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-body font-montserrat font-bold text-body-text mb-1">
                      {item.reason}
                    </h3>
                    <p className="text-body-sm text-body-text/70">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
