/**
 * WhyChooseUs — Credentials and reasons to choose Wasleen.
 *
 * Demonstrates E-E-A-T by showing expertise, experience, and trust signals.
 *
 * @usage
 * ```tsx
 * <WhyChooseUs reasons={approval.whyChooseUs} authorityName="Dubai Municipality" />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Section 10: Why choose us
 */

import { BadgeCheck, Users, FileCheck, Zap } from "lucide-react";

interface WhyChooseUsProps {
  /** List of credential/reason statements */
  reasons: string[];
  /** Authority name for context (e.g., "DM") */
  authorityName?: string;
  className?: string;
}

const icons = [BadgeCheck, Zap, FileCheck, Users];

export default function WhyChooseUs({
  reasons,
  authorityName,
  className = "",
}: WhyChooseUsProps) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <section className={`bg-light-bg ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Why Choose Wasleen Approvals
          </h2>
          {authorityName && (
            <p className="text-body-lg text-body-text mb-8 max-w-3xl">
              We have successfully managed hundreds of {authorityName} approval
              applications. Here's what sets us apart.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light shadow-card"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-card-bg text-brand-blue shrink-0">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <p className="text-body-sm text-body-text pt-1.5">
                    {reason}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
