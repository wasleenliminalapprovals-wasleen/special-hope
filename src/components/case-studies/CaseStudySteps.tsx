/**
 * CaseStudySteps — Section 6: What We Did (Part 5.1 #6).
 *
 * Server component. Renders the solution steps as a semantic `<ol>` whose
 * text mirrors the `HowTo` JSON-LD schema word-for-word (Part 12 / schema
 * stack gate: visible text = schema text). The numbered list is the most
 * AI-parseable structure for step-based queries (Part 3, ChatGPT/Perplexity).
 *
 * Part 18 overrides:
 * - 18.3 — each grid item uses the exact mint→periwinkle gradient
 *   (`#74ebd5 → #ACB6E5`) via `.cs-steps-card` (defined in case-studies.css).
 * - 18.6 — desktop renders a sticky related-pages sidebar rail beside the
 *   reading column; mobile gets a compact block below (CaseStudySidebar).
 * - 18.7 — a data-driven "related services" anchor sentence links to existing
 *   service pages. It lives in a SEPARATE paragraph (outside the `<ol>`) so the
 *   `solutionSteps` descriptions stay byte-identical to the HowTo schema text.
 *
 * The 60–80ms stagger fade is handled by `CaseStudyReveal` + `.cs-stagger`
 * (client wrapper) while the `<ol>` stays in the SSR DOM — numbers remain
 * crawlable without JavaScript.
 */

import Link from "next/link";
import type { ApprovalCaseStudy } from "@/types/case-study";
import { services } from "@/data/services";
import CaseStudyReveal from "./CaseStudyReveal";
import CaseStudySidebar from "./CaseStudySidebar";

interface CaseStudyStepsProps {
  study: ApprovalCaseStudy;
}

export default function CaseStudySteps({ study }: CaseStudyStepsProps) {
  const relatedServices = study.relatedServiceSlugs
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3);

  return (
    <section aria-labelledby="case-study-steps-heading" className="bg-light-bg">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="lg:flex lg:items-start lg:gap-10">
          <div className="cs-reading-col lg:flex-1">
            <h2
              id="case-study-steps-heading"
              className="text-h2 font-montserrat font-bold text-heading-text"
            >
              What We Did
            </h2>
            <p className="mt-3 text-body text-body-text">
              The steps we followed to prepare and submit this approval — from
              drawing review to final submission.
            </p>

            <CaseStudyReveal className="cs-stagger">
              <ol className="mt-8 space-y-4">
                {study.solutionSteps.map((step, index) => (
                  <li
                    key={index}
                    className="cs-steps-card flex gap-4 rounded-md p-5 shadow-card"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-blue font-mono text-body-sm font-medium text-white"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-montserrat text-h4 font-bold text-heading-text">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-body-sm text-body-text">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CaseStudyReveal>

            {relatedServices.length > 0 && (
              <p className="mt-6 text-body-sm text-body-text">
                This project combined our{" "}
                {relatedServices.map((service, index) => (
                  <span key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="cs-underline-grow font-medium text-link-blue"
                    >
                      {service.name}
                    </Link>
                    {index < relatedServices.length - 2
                      ? ", "
                      : index === relatedServices.length - 2
                        ? " and "
                        : ""}
                  </span>
                ))}{" "}
                services to deliver a single, tracked submission from drawings
                through final inspection.
              </p>
            )}
          </div>

          <CaseStudySidebar study={study} />
        </div>
      </div>
    </section>
  );
}
