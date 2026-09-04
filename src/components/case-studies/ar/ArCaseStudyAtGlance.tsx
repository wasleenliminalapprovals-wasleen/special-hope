/**
 * ArCaseStudyAtGlance — Arabic Section 3: لمحة سريعة (case-studies mega-plan
 * Part 5.1 #3 / Step 6b.3).
 *
 * Server component. RTL-safe port of the EN `CaseStudyAtGlance`. Semantic,
 * AI-friendly `<table>` (with `<th>`) of the six key facts. Values come from
 * the Arabic content (`ar.arProjectType`, `ar.arLocation`, `ar.arQuotedFee`)
 * plus SHARED EN facts localised at render: authorities via
 * `arAuthoritiesJoined` (the EN full-English names map to Arabic in
 * `ar-labels.ts` — never leaks English, gate 11.3), status via
 * `AR_CASE_STUDY_STATUS_LABELS`, and the Latin `sourceRef` rendered
 * `font-mono`.
 *
 * Uses the RTL-safe `ArCaseStudyTable` primitive (`text-start`).
 *
 * @see plans/case-studies-mega-plan.md Part 5.1 #3 / Step 6b.3 / gate 11.3
 */

import type {
  ApprovalCaseStudy,
  CaseStudyArabicContent,
} from "@/types/case-study";
import {
  AR_CASE_STUDY_STATUS_LABELS,
  arAuthoritiesJoined,
} from "./ar-labels";
import ArCaseStudyTable from "./ArCaseStudyTable";

interface ArCaseStudyAtGlanceProps {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
}

export default function ArCaseStudyAtGlance({
  study,
  ar,
}: ArCaseStudyAtGlanceProps) {
  const rows: { attribute: string; value: string; code?: boolean; accent?: boolean }[] = [
    { attribute: "نوع المشروع", value: ar.arProjectType },
    { attribute: "الموقع", value: ar.arLocation },
    { attribute: "الجهة", value: arAuthoritiesJoined(study.authorities) },
    { attribute: "الرسوم المعروضة", value: ar.arQuotedFee, accent: true },
    { attribute: "الحالة", value: AR_CASE_STUDY_STATUS_LABELS[study.projectStatus] },
    { attribute: "مرجع المصدر", value: study.sourceRef, code: true },
  ];

  return (
    <section
      aria-labelledby="ar-case-study-at-a-glance-heading"
      className="bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <h2
          id="ar-case-study-at-a-glance-heading"
          className="text-h2 font-montserrat font-bold text-heading-text"
        >
          لمحة سريعة
        </h2>
        <p className="mt-3 max-w-2xl text-body text-body-text">
          أبرز الوقائع الأساسية لمهمة اعتماد {ar.arProjectType} في لمحة واحدة.
        </p>
        <div className="mt-6">
          <ArCaseStudyTable
            caption="أبرز حقائق هذه الحالة"
            hideCaption
            headers={["السمة", "القيمة"]}
            rows={rows.map((row) => [
              <span key="a" className="font-medium text-body-text">
                {row.attribute}
              </span>,
              row.code ? (
                <span key="v" className="font-mono text-brand-blue">
                  {row.value}
                </span>
              ) : row.accent ? (
                <span key="v" className="font-medium text-brand-blue">
                  {row.value}
                </span>
              ) : (
                <span key="v">{row.value}</span>
              ),
            ])}
          />
        </div>
      </div>
    </section>
  );
}
