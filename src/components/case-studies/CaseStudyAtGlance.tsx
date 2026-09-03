/**
 * CaseStudyAtGlance — Section 3: At-a-Glance Table (Part 5.1 #3).
 *
 * Server component. Renders the six key facts as a semantic, AI-friendly
 * `<table>` (with `<th>`): project type, location, authority, quoted fee,
 * status, and source reference. Values come straight from the data model —
 * nothing here is invented.
 *
 * Reuses the shared `CaseStudyTable` primitive (Step 2) so the table stays
 * responsive on 360–390px (horizontal scroll preserved, markup intact).
 */

import type { ApprovalCaseStudy } from "@/types/case-study";
import { CASE_STUDY_STATUS_LABELS } from "@/lib/case-studies";
import CaseStudyTable from "./CaseStudyTable";

interface CaseStudyAtGlanceProps {
  study: ApprovalCaseStudy;
}

export default function CaseStudyAtGlance({ study }: CaseStudyAtGlanceProps) {
  const rows: { attribute: string; value: string; mono?: boolean }[] = [
    { attribute: "Project type", value: study.projectType },
    { attribute: "Location", value: study.location },
    { attribute: "Authority", value: study.authorities.join(", ") },
    { attribute: "Quoted fee", value: study.quotedFee, mono: true },
    { attribute: "Status", value: CASE_STUDY_STATUS_LABELS[study.projectStatus] },
    { attribute: "Source ref", value: study.sourceRef, mono: true },
  ];

  return (
    <section aria-labelledby="case-study-at-a-glance-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <h2
          id="case-study-at-a-glance-heading"
          className="text-h2 font-montserrat font-bold text-heading-text"
        >
          At a Glance
        </h2>
        <p className="mt-3 max-w-2xl text-body text-body-text">
          The core facts of this {study.projectType.toLowerCase()} approval
          engagement at a glance.
        </p>
        <div className="mt-6">
          <CaseStudyTable
            caption="Case study key facts"
            hideCaption
            headers={["Attribute", "Value"]}
            rows={rows.map((row) => [
              <span key="a" className="font-medium text-body-text">
                {row.attribute}
              </span>,
              row.mono ? (
                <span key="v" className="font-mono text-brand-blue">
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
