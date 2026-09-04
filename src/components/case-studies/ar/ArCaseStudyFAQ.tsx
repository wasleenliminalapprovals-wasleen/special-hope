"use client";

/**
 * ArCaseStudyFAQ — Section 10: FAQ (Arabic /ar/ twin).
 *
 * Client component. Arabic RTL-safe twin of `CaseStudyFAQ` (mega-plan Part 14
 * Step 6b.3). The questions/answers come from `ar.arFaqs` (native Arabic) and
 * are BYTE-FOR-BYTE identical to the FAQPage JSON-LD the `/ar/` detail
 * template generates (Part 12 gate — visible text = schema text).
 *
 * CSS-only accordion (`.cs-accordion-*` in case-studies.css), shared with the
 * EN twin. RTL fix: the toggle button uses `text-start` (logical) instead of
 * the EN `text-left` so the Arabic label aligns to the right edge.
 *
 * Fires `case_study_faq_open` with the Arabic question as the event value.
 * Semantic buttons with `aria-expanded` / `aria-controls`.
 *
 * @see src/components/case-studies/CaseStudyFAQ.tsx (EN twin, LOCKED)
 * @see src/components/case-studies/ar/ar-labels.ts
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ApprovalCaseStudy, CaseStudyArabicContent } from "@/types/case-study";
import { trackCaseStudyFaqOpen } from "@/lib/case-studies";
import { arAuthoritiesJoined } from "./ar-labels";

interface ArCaseStudyFAQProps {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
}

export default function ArCaseStudyFAQ({ study, ar }: ArCaseStudyFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number, question: string) => {
    trackCaseStudyFaqOpen({ case_slug: study.slug, question });
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (ar.arFaqs.length === 0) return null;

  return (
    <section aria-labelledby="ar-case-study-faq-heading" className="bg-light-bg">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="cs-reading-col">
          <h2
            id="ar-case-study-faq-heading"
            className="text-h2 font-montserrat font-bold text-heading-text"
          >
            الأسئلة الشائعة
          </h2>
          <p className="mt-3 text-body text-body-text">
            أسئلة شائعة عن موافقات {arAuthoritiesJoined(study.authorities)} من
            هذا النوع.
          </p>

          <div className="mt-8 space-y-3">
            {ar.arFaqs.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`cs-accordion-item rounded-md ${open ? "cs-open" : ""}`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`ar-case-study-faq-btn-${index}`}
                      aria-expanded={open}
                      aria-controls={`ar-case-study-faq-panel-${index}`}
                      onClick={() => toggle(index, faq.question)}
                      className="flex w-full min-h-[44px] items-center justify-between gap-4 px-4 py-3 text-start"
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
                    id={`ar-case-study-faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`ar-case-study-faq-btn-${index}`}
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
