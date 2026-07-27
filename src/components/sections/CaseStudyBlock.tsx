/**
 * CaseStudyBlock — Anonymized real project case study.
 *
 * Demonstrates E-E-A-T (Experience) with real project examples.
 * Shows specific challenges and outcomes to build trust.
 *
 * @usage
 * ```tsx
 * <CaseStudyBlock study={approval.caseStudy} />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Section 9: Case studies
 */

import { Briefcase, Building2, Calendar, AlertTriangle, Target } from "lucide-react";

interface CaseStudy {
  projectType: string;
  authority: string;
  timeline: string;
  challenge: string;
  outcome: string;
}

interface CaseStudyBlockProps {
  study: CaseStudy;
  className?: string;
}

export default function CaseStudyBlock({
  study,
  className = "",
}: CaseStudyBlockProps) {
  if (!study) return null;

  return (
    <section className={`bg-white ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Real Project Example
          </h2>
          <p className="text-body-lg text-body-text mb-8 max-w-3xl">
            A real project we handled — demonstrating our experience and
            problem-solving capabilities.
          </p>

          <div className="rounded-md border border-border-light bg-card-bg/30 overflow-hidden">
            {/* Header */}
            <div className="bg-brand-blue px-5 py-3">
              <h3 className="text-body font-montserrat font-bold text-white flex items-center gap-2">
                <Building2 size={18} strokeWidth={1.75} />
                {study.projectType}
              </h3>
            </div>

            {/* Details */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Building2 size={18} strokeWidth={1.75} className="text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-caption font-medium text-body-text/60 uppercase tracking-wide">Authority</p>
                    <p className="text-body-sm font-medium text-body-text">{study.authority}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={18} strokeWidth={1.75} className="text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-caption font-medium text-body-text/60 uppercase tracking-wide">Timeline</p>
                    <p className="text-body-sm font-medium text-body-text">{study.timeline}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle size={18} strokeWidth={1.75} className="text-cta-amber shrink-0 mt-0.5" />
                <div>
                  <p className="text-caption font-medium text-body-text/60 uppercase tracking-wide">Challenge</p>
                  <p className="text-body-sm text-body-text">{study.challenge}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target size={18} strokeWidth={1.75} className="text-success-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-caption font-medium text-body-text/60 uppercase tracking-wide">Outcome</p>
                  <p className="text-body-sm text-body-text">{study.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
