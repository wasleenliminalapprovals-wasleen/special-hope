"use client";

/**
 * CaseStudyDocuments — Section 7: Documents & Requirements (Part 5.1 #7).
 *
 * Semantic `<table>` (document / description / provided-by) — the structure AI
 * answer engines parse cleanly. A disclaimer note sits beneath the table
 * (Part 4: regulations change; never present requirements as immutable).
 *
 * Animation: rows fade/rise in 60ms apart once the table enters the viewport
 * and each required-document checkmark draws on at the same delay (Part 6.3).
 * True content is always in the SSR DOM — the reveal is visual only.
 *
 * Uses the `CaseStudyTable` primitive with the additive `tableClassName` prop
 * so `.cs-doc-rows` lands on the `<table>` (selector: rows are direct `<tr>`
 * children of `<tbody>`). `prefers-reduced-motion` renders instantly.
 */

import type { ApprovalCaseStudy } from "@/types/case-study";
import Badge from "@/components/ui/Badge";
import CaseStudyTable from "./CaseStudyTable";
import { useInView } from "./use-in-view";

interface CaseStudyDocumentsProps {
  study: ApprovalCaseStudy;
}

export default function CaseStudyDocuments({ study }: CaseStudyDocumentsProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section aria-labelledby="case-study-documents-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <h2
          id="case-study-documents-heading"
          className="text-h2 font-montserrat font-bold text-heading-text"
        >
          Documents & Requirements
        </h2>
        <p className="mt-3 max-w-2xl text-body text-body-text">
          The documents prepared or collected for this {study.authorities.join(" & ")}{" "}
          submission, and who supplied each one.
        </p>

        <div ref={ref} className="mt-6">
          <CaseStudyTable
            tableClassName={`cs-doc-rows ${inView ? "cs-is-visible" : ""}`.trim()}
            caption="Documents and requirements for this approval"
            hideCaption
            headers={["", "Document", "Description", "Provided by"]}
            rows={study.documentsTable.map((row) => [
              <span key="check" className="inline-flex items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="cs-doc-check"
                >
                  <path d="M 4 10.5 L 8.5 15 L 16 5.5" />
                </svg>
              </span>,
              <span key="doc" className="font-medium text-body-text">
                {row.document}
              </span>,
              <span key="desc" className="text-body-text/90">
                {row.description}
              </span>,
              <span key="by">
                <Badge variant={row.providedBy === "wasleen" ? "success" : "outline"}>
                  {row.providedBy === "wasleen" ? "Wasleen" : "Client"}
                </Badge>
              </span>,
            ])}
          />
        </div>

        <p className="mt-4 max-w-2xl text-caption text-body-text/70">
          Requirements change as authorities update their regulations. Confirm the
          current document list with us before submitting — this case reflects the
          documents required at the time of this engagement.
        </p>
      </div>
    </section>
  );
}
