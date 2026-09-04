"use client";

/**
 * ArCaseStudyDocuments — Section 7: Documents & Requirements (Arabic /ar/ twin).
 *
 * Arabic RTL-safe twin of `CaseStudyDocuments` (mega-plan Part 14 Step 6b.3).
 * Native-Arabic copy is authored in `case-studies-ar.ts` (`arDocumentsTable`);
 * the document `providedBy` claim level is part of each Arabic row (Arabic
 * labels come from `AR_CASE_STUDY_PROVIDED_BY_LABELS`). The authorities in the
 * intro are localised at render time via `arAuthoritiesJoined` — never read
 * from an English string on the `/ar/` page.
 *
 * Uses the `ArCaseStudyTable` primitive (RTL-safe) with the additive
 * `tableClassName` prop so `.cs-doc-rows` lands on the `<table>` and the
 * viewport-triggered row-reveal / check-draw animation works identically to
 * the EN twin. `prefers-reduced-motion` renders instantly (CSS).
 *
 * @see src/components/case-studies/CaseStudyDocuments.tsx (EN twin, LOCKED)
 * @see src/components/case-studies/ar/ArCaseStudyTable.tsx
 * @see src/components/case-studies/ar/ar-labels.ts
 */

import type { ApprovalCaseStudy, CaseStudyArabicContent } from "@/types/case-study";
import Badge from "@/components/ui/Badge";
import ArCaseStudyTable from "./ArCaseStudyTable";
import { useInView } from "../use-in-view";
import {
  AR_CASE_STUDY_PROVIDED_BY_LABELS,
  arAuthoritiesJoined,
} from "./ar-labels";

interface ArCaseStudyDocumentsProps {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
}

export default function ArCaseStudyDocuments({
  study,
  ar,
}: ArCaseStudyDocumentsProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  if (ar.arDocumentsTable.length === 0) return null;

  return (
    <section aria-labelledby="ar-case-study-documents-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <h2
          id="ar-case-study-documents-heading"
          className="text-h2 font-montserrat font-bold text-heading-text"
        >
          المستندات والمتطلبات
        </h2>
        <p className="mt-3 max-w-2xl text-body text-body-text">
          المستندات التي أُعدّت أو جُمعت لهذا التقديم إلى{" "}
          {arAuthoritiesJoined(study.authorities)}، ومن وفّر كل مستند منها.
        </p>

        <div ref={ref} className="mt-6">
          <ArCaseStudyTable
            tableClassName={`cs-doc-rows ${inView ? "cs-is-visible" : ""}`.trim()}
            caption="مستندات ومتطلبات هذه الموافقة"
            hideCaption
            headers={["", "المستند", "الوصف", "من قدّمه"]}
            rows={ar.arDocumentsTable.map((row) => [
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
                  {AR_CASE_STUDY_PROVIDED_BY_LABELS[row.providedBy]}
                </Badge>
              </span>,
            ])}
          />
        </div>

        <p className="mt-4 max-w-2xl text-caption text-body-text/70">
          تتغير المتطلبات مع تحديث الجهات للوائحها. أكّد قائمة المستندات الحالية
          معنا قبل التقديم — تعكس هذه الحالة المستندات المطلوبة وقت هذا التعاقد.
        </p>
      </div>
    </section>
  );
}
