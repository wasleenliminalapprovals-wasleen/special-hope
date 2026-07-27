/**
 * ProcessStepsBlock — Numbered process steps for approval pages.
 *
 * Displays a step-by-step guide to the approval process with numbered
 * circles. Content must match HowTo schema text word-for-word.
 *
 * @usage
 * ```tsx
 * <ProcessStepsBlock steps={approval.process} />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Section 6: Process steps
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md — HowTo schema
 */

import { ArrowDown } from "lucide-react";
import type { ProcessStep } from "@/types";

interface ProcessStepsBlockProps {
  steps: ProcessStep[];
  className?: string;
}

export default function ProcessStepsBlock({
  steps,
  className = "",
}: ProcessStepsBlockProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className={`bg-white ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Step-by-Step Process
          </h2>
          <p className="text-body-lg text-body-text mb-10 max-w-3xl">
            Here's exactly how we manage your approval from start to finish.
            Each step is handled by our experienced team.
          </p>

          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-border-light hidden md:block"
              aria-hidden="true"
            />

            <ol className="space-y-8 md:space-y-0">
              {steps.map((step) => (
                <li key={step.step} className="md:flex md:gap-6 md:pb-8">
                  {/* Step number */}
                  <div className="flex md:flex-col items-center md:items-start mb-4 md:mb-0 md:w-16 shrink-0">
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-montserrat font-bold text-body">
                      {step.step}
                    </div>
                    {/* Mobile connector */}
                    {step.step < steps.length && (
                      <div className="md:hidden ml-4" aria-hidden="true">
                        <ArrowDown size={20} strokeWidth={1.75} className="text-border-light" />
                      </div>
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 md:pt-2">
                    <h3 className="text-h4 font-montserrat text-heading-text mb-2">
                      {step.title}
                    </h3>
                    <p className="text-body text-body-text leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
