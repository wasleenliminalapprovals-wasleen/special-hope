/**
 * ArCaseStudySteps — Section 6: What We Did (Arabic /ar/ twin).
 *
 * Server component. Arabic RTL-safe twin of `CaseStudySteps` (mega-plan
 * Part 14 Step 6b.3). Renders the solution steps as a semantic `<ol>` whose
 * Arabic text mirrors the Arabic `HowTo` JSON-LD schema word-for-word
 * (Part 12 / schema stack gate: visible text = schema text).
 *
 * - Steps come from `ar.arSolutionSteps` (native Arabic).
 * - The numbered grid items use the same `.cs-steps-card` (mint→periwinkle)
 *   as the EN twin; the step number keeps `font-mono` (Latin digits are
 *   direction-neutral) while the Arabic step title/description never uses it.
 * - Desktop renders the sticky related-pages rail beside the reading column;
 *   mobile gets a compact block below (ArCaseStudySidebar) — resolved against
 *   the ARABIC data so links are real `/ar/` pages with Arabic names.
 * - A data-driven "related services" anchor sentence links to existing Arabic
 *   service pages (`.cs-underline-grow`), joined with Arabic " و ".
 *
 * The 60–80ms stagger fade is handled by `CaseStudyReveal` + `.cs-stagger`
 * (client wrapper) while the `<ol>` stays in the SSR DOM — numbers remain
 * crawlable without JavaScript.
 *
 * @see src/components/case-studies/CaseStudySteps.tsx (EN twin, LOCKED)
 * @see src/data/services-ar.ts
 */

import Link from "next/link";
import type { ApprovalCaseStudy, CaseStudyArabicContent } from "@/types/case-study";
import { services as servicesAr } from "@/data/services-ar";
import CaseStudyReveal from "../CaseStudyReveal";
import ArCaseStudySidebar from "./ArCaseStudySidebar";

interface ArCaseStudyStepsProps {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
}

export default function ArCaseStudySteps({ study, ar }: ArCaseStudyStepsProps) {
  const relatedServices = study.relatedServiceSlugs
    .map((slug) => servicesAr.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3);

  return (
    <section aria-labelledby="ar-case-study-steps-heading" className="bg-light-bg">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="lg:flex lg:items-start lg:gap-10">
          <div className="cs-reading-col lg:flex-1">
            <h2
              id="ar-case-study-steps-heading"
              className="text-h2 font-montserrat font-bold text-heading-text"
            >
              ما قمنا به
            </h2>
            <p className="mt-3 text-body text-body-text">
              الخطوات التي اتبعناها لإعداد هذا الطلب وتقديمه — من مراجعة
              المخططات حتى التقديم النهائي.
            </p>

            <CaseStudyReveal className="cs-stagger">
              <ol className="mt-8 space-y-4">
                {ar.arSolutionSteps.map((step, index) => (
                  <li
                    key={step.step ?? index}
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
                جمع هذا المشروع بين خدماتنا في{" "}
                {relatedServices.map((service, index) => (
                  <span key={service.slug}>
                    <Link
                      href={`/ar/services/${service.slug}`}
                      className="cs-underline-grow font-medium text-link-blue"
                    >
                      {service.ar.name}
                    </Link>
                    {index < relatedServices.length - 1 ? " و " : ""}
                  </span>
                ))}{" "}
                لتقديم طلب واحد مُتتبَّع من المخططات حتى التفتيش النهائي.
              </p>
            )}
          </div>

          <ArCaseStudySidebar study={study} />
        </div>
      </div>
    </section>
  );
}
