/**
 * ArCaseStudyTimeline — Section 5: Approval Timeline (Arabic /ar/ twin).
 *
 * Client component. Semantics-first Arabic twin of the EN flagship animated SVG
 * diagram (`CaseStudyTimeline`, Part 6.2). Arabic `<text>` embedded inside SVG
 * breaks letter-joining/shaping and RTL flow, so the EN desktop diagram is NOT
 * ported; instead the EN mobile semantic `<ol>` pattern (same data, same click
 * handler, keyboard operable, 44px+ targets) is elevated to ALL breakpoints.
 * The section keeps its position in the 13-section order (Part 5), drives off
 * the same `ar.arTimeline` milestones, and still fires
 * `case_study_diagram_interact` on expand.
 *
 * - Node dates are shared ISO values read from `ar.arTimeline` at render and
 *   localised with `formatArabicDate` (Part 3.2 — never duplicated in data).
 * - Node state is never colour-only (WCAG 1.4.1): every row pairs the icon chip
 *   with a text state label (معتمد / مرفوض / قيد الانتظار).
 * - A status footnote mirrors the EN stamp's honest claim level in Arabic
 *   (`AR_CASE_STUDY_STATUS_LABELS`) with the shared `sourceRef` in mono — and,
 *   unlike the EN SVG stamp, remains crawlable text for AI search engines.
 *
 * @see src/components/case-studies/CaseStudyTimeline.tsx (EN twin, LOCKED)
 * @see src/components/case-studies/ar/ar-labels.ts
 */

"use client";

import { useState } from "react";
import { ChevronDown, CircleCheck, Clock, XCircle } from "lucide-react";
import type {
  ApprovalCaseStudy,
  CaseStudyArabicContent,
  CaseStudyTimelineNode,
} from "@/types/case-study";
import { trackCaseStudyDiagramInteract } from "@/lib/case-studies";
import { AR_CASE_STUDY_STATUS_LABELS, formatArabicDate } from "./ar-labels";

interface ArCaseStudyTimelineProps {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
}

/** Node-level state labels — distinct from the `projectStatus` label map. */
const NODE_STATE_LABEL: Record<CaseStudyTimelineNode["state"], string> = {
  approved: "معتمد",
  rejected: "مرفوض",
  pending: "قيد الانتظار",
};

export default function ArCaseStudyTimeline({ study, ar }: ArCaseStudyTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const nodes: CaseStudyTimelineNode[] =
    ar.arTimeline && ar.arTimeline.length > 0
      ? ar.arTimeline
      : ar.arSolutionSteps.map((step) => ({
          title: step.title,
          detail: step.description,
          state: "approved" as const,
        }));

  const toggleNode = (index: number, title: string) => {
    trackCaseStudyDiagramInteract({ case_slug: study.slug, node: title });
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section aria-labelledby="ar-case-study-timeline-heading" className="cs-data-zone">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="ar-case-study-timeline-heading"
            className="text-h2 font-montserrat font-bold text-heading-text"
          >
            الخط الزمني للموافقة
          </h2>
          <span className="text-caption text-body-text/60">
            انقر على أي خطوة لعرض التفاصيل
          </span>
        </div>

        <ol className="mt-8 space-y-3">
          {nodes.map((node, i) => {
            const isExpanded = expandedIndex === i;
            const Glyph =
              node.state === "approved"
                ? CircleCheck
                : node.state === "rejected"
                  ? XCircle
                  : Clock;
            return (
              <li
                key={node.title}
                className="overflow-hidden rounded-md border border-border-light bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleNode(i, node.title)}
                  aria-expanded={isExpanded}
                  className="flex min-h-[44px] w-full items-center gap-3 px-4 py-3 text-start"
                >
                  <span className="cs-mobile-node-chip shrink-0" aria-hidden="true">
                    <Glyph size={20} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-montserrat text-body font-bold text-heading-text">
                      {node.title}
                    </span>
                    <span className="block text-caption text-body-text/70">
                      {NODE_STATE_LABEL[node.state]}
                      {node.date ? ` · ${formatArabicDate(node.date)}` : ""}
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={`shrink-0 text-brand-blue transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <p className="border-t border-border-light px-4 py-3 text-body-sm text-body-text">
                    {node.detail}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border-light pt-4 text-caption text-body-text/70">
          <span>
            حالة المشروع:{" "}
            <strong className="font-medium text-body-text">
              {AR_CASE_STUDY_STATUS_LABELS[study.projectStatus]}
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{study.sourceRef}</span>
        </p>
      </div>
    </section>
  );
}
