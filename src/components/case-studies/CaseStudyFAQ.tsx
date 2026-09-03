"use client";

/**
 * CaseStudyFAQ — Section 10: FAQ (Part 5.1 #10).
 *
 * CSS-only accordion: `.cs-accordion-body` uses `grid-template-rows: 0fr → 1fr`
 * (motion in case-studies.css, `prefers-reduced-motion` safe). Each answer is
 * 2–3 self-contained sentences and is BYTE-FOR-BYTE identical to the FAQPage
 * JSON-LD generated in `src/lib/case-studies.ts` (Part 12 gate).
 *
 * Fires `case_study_faq_open` when a question is opened (analytics helper).
 * Semantic buttons with `aria-expanded` / `aria-controls` for accessibility.
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ApprovalCaseStudy } from "@/types/case-study";
import { trackCaseStudyFaqOpen } from "@/lib/case-studies";

interface CaseStudyFAQProps {
  study: ApprovalCaseStudy;
}

export default function CaseStudyFAQ({ study }: CaseStudyFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number, question: string) => {
    trackCaseStudyFaqOpen({ case_slug: study.slug, question });
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (study.faqs.length === 0) return null;

  return (
    <section aria-labelledby="case-study-faq-heading" className="bg-light-bg">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="cs-reading-col">
          <h2
            id="case-study-faq-heading"
            className="text-h2 font-montserrat font-bold text-heading-text"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-body text-body-text">
            Common questions about {study.authorities.join(" & ")} approvals like this one.
          </p>

          <div className="mt-8 space-y-3">
            {study.faqs.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`cs-accordion-item rounded-md ${open ? "cs-open" : ""}`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`case-study-faq-btn-${index}`}
                      aria-expanded={open}
                      aria-controls={`case-study-faq-panel-${index}`}
                      onClick={() => toggle(index, faq.question)}
                      className="flex w-full min-h-[44px] items-center justify-between gap-4 px-4 py-3 text-left"
                    >
                      <span className="font-montserrat text-h4 font-bold text-heading-text">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={20}
                        strokeWidth={1.75}
                        aria-hidden="true"
                        className="cs-accordion-icon shrink-0 text-brand-blue"
                      />
                    </button>
                  </h3>
                  <div
                    id={`case-study-faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`case-study-faq-btn-${index}`}
                    className="cs-accordion-body"
                  >
                    <div className="cs-accordion-inner">
                      <p className="px-4 pb-4 text-body text-body-text">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
