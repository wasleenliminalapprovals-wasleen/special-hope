"use client";

/**
 * CaseStudyTimeline — Section 5: Animated Timeline Diagram (Part 6.2, flagship).
 *
 * Client component. Renders the approval journey as a choreographed diagram:
 *   1. The track draws left→right (stroke-dashoffset full→0, ~1.6s, expo ease).
 *   2. Each node pops in (scale 0→1, spring) at the exact draw fraction the
 *      line reaches its x (`--cs-node-delay` custom property, not inline style).
 *   3. A red "rejected→fixed" node wobbles on entry, then a thin green
 *      checkmark + connecting arrow draw in beside it (~400ms later).
 *   4. The status stamp (APPROVED / IN PROGRESS / QUOTED — always honest,
 *      never implies completion the source does not support) rotates in from
 *      15° as the payoff.
 *   5. Clicking a node fires `case_study_diagram_interact` and expands its
 *      date/document detail. 44px+ touch targets; keyboard operable.
 *   6. State is NEVER color-only (WCAG 1.4.1): glyph + text label per node.
 *   7. SVG only, no animation libraries; `role="img"` + `aria-label`.
 *
 * Layout (Part 7.1): horizontal SVG diagram on lg+; a vertical semantic `<ol>`
 * on mobile (360–390px), both driven by the same data and click handler.
 */

import { useState } from "react";
import { ChevronDown, CircleCheck, Clock, XCircle } from "lucide-react";
import type { ApprovalCaseStudy, CaseStudyTimelineNode, CaseStudyTimelineState } from "@/types/case-study";
import { trackCaseStudyDiagramInteract } from "@/lib/case-studies";
import { useInView } from "./use-in-view";

interface CaseStudyTimelineProps {
  study: ApprovalCaseStudy;
}

const VIEW_W = 1000;
const PAD_X = 100;
const TRACK_Y = 120;
const DRAW_MS = 1600;

/* Part 18.1 — gradient box geometry + per-box incoming choreography. */
const BOX_W = 96;
const BOX_H = 44;
const BOX_R = 8;
const RAISE_Y = 84; // quotation node lifted just above the track
const INCOMING_VARIANTS = ["cs-node-in-a", "cs-node-in-b", "cs-node-in-c", "cs-node-in-d"];

const STATE_LABEL: Record<CaseStudyTimelineState, string> = {
  approved: "Approved",
  rejected: "Rejected",
  pending: "Pending",
};

const STAMP_LABEL: Record<ApprovalCaseStudy["projectStatus"], string> = {
  completed: "APPROVED",
  "in-progress": "IN PROGRESS",
  quoted: "QUOTED",
};

function nodeXs(n: number): number[] {
  if (n <= 1) return [VIEW_W / 2];
  const step = (VIEW_W - PAD_X * 2) / (n - 1);
  return Array.from({ length: n }, (_, i) => PAD_X + i * step);
}

function StateGlyph({ state }: { state: CaseStudyTimelineState }) {
  const cls = {
    approved: "cs-node-glyph--approved",
    rejected: "cs-node-glyph--rejected",
    pending: "cs-node-glyph--pending",
  }[state];

  if (state === "approved") {
    return (
      <path
        d="M -7 1 L -2 6 L 8 -5"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  if (state === "rejected") {
    return (
      <g stroke="currentColor" strokeWidth={3} strokeLinecap="round">
        <line x1={-5} y1={-5} x2={5} y2={5} />
        <line x1={5} y1={-5} x2={-5} y2={5} />
      </g>
    );
  }
  return (
    <g stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <circle r={5.5} fill="none" />
      <line x1={0} y1={0} x2={0} y2={-3.5} />
      <line x1={0} y1={0} x2={2.5} y2={0.5} />
    </g>
  );
}

export default function CaseStudyTimeline({ study }: CaseStudyTimelineProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const nodes: CaseStudyTimelineNode[] =
    study.timeline && study.timeline.length > 0
      ? study.timeline
      : study.solutionSteps.map((step) => ({
          title: step.title,
          detail: step.description,
          state: "approved" as const,
        }));

  const xs = nodeXs(nodes.length);
  const delays = nodes.map((_, i) => Math.round((xs[i] / (VIEW_W - PAD_X * 2)) * DRAW_MS));
  const rejectedIndex = nodes.findIndex((node) => node.state === "rejected");
  const lastDelay = delays.length > 0 ? Math.max(...delays) : 0;

  const toggleNode = (index: number, title: string) => {
    trackCaseStudyDiagramInteract({ case_slug: study.slug, node: title });
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const expanded = expandedIndex !== null ? nodes[expandedIndex] : null;

  return (
    <section aria-labelledby="case-study-timeline-heading" className="cs-data-zone">
      <div ref={ref} className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="case-study-timeline-heading"
            className="text-h2 font-montserrat font-bold text-heading-text"
          >
            The Approval Timeline
          </h2>
          <span className="text-caption text-body-text/60">Tap a step for details</span>
        </div>

        {/* ── Desktop: horizontal SVG diagram ── */}
        <div className="mt-8 hidden lg:block">
          <svg
            viewBox={`0 0 ${VIEW_W} 250`}
            role="img"
            aria-label={`${study.projectTitle}: approval timeline with ${nodes.length} milestones. ${nodes
              .map((n, i) => `${i + 1}. ${n.title} (${STATE_LABEL[n.state]})`)
              .join(" ")}`}
            className="w-full h-auto"
          >
            {/* Gradient fill for the animated blue boxes (Part 18.1) */}
            <defs>
              <linearGradient id="cs-node-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="cs-node-grad-a" />
                <stop offset="100%" className="cs-node-grad-b" />
              </linearGradient>
            </defs>

            {/* Track line — draws left→right once */}
            <path
              d={`M ${PAD_X} ${TRACK_Y} L ${VIEW_W - PAD_X} ${TRACK_Y}`}
              className={`cs-timeline-track ${inView ? "cs-is-visible" : ""}`}
            />

            {/* Rejected→fixed: green connecting arrow + check draw in */}
            {rejectedIndex >= 0 && (
              <g transform={`translate(${xs[rejectedIndex] + 46}, ${TRACK_Y - 34})`}>
                <g
                  className={`cs-timeline-fix ${inView ? "cs-is-visible" : ""}`}
                  style={{ "--cs-node-delay": `${delays[rejectedIndex] + 400}ms` } as React.CSSProperties}
                >
                  <path
                    d="M 0 6 L 20 6 M 14 0 L 20 6 L 14 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 34 0 L 39 6 L 50 -8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            )}

            {/* Nodes — gradient blue boxes with per-box incoming choreography */}
            {nodes.map((node, i) => {
              const raised = i === 0; // quotation node floats above the line
              const nodeY = raised ? TRACK_Y - RAISE_Y : TRACK_Y;
              const variant = INCOMING_VARIANTS[i % INCOMING_VARIANTS.length];
              const nodeCls = [
                "cs-timeline-node",
                "cs-timeline-node--box",
                inView ? "cs-is-visible" : "",
                variant,
              ]
                .filter(Boolean)
                .join(" ");
              const isExpanded = expandedIndex === i;
              return (
                <g key={node.title} transform={`translate(${xs[i]}, ${nodeY})`}>
                  {/* Dashed stem connecting the raised node back to the track */}
                  {raised && (
                    <line
                      x1={0}
                      y1={BOX_H / 2}
                      x2={0}
                      y2={TRACK_Y - nodeY}
                      className={`cs-timeline-stem ${inView ? "cs-is-visible" : ""}`}
                      style={{ "--cs-node-delay": `${delays[i]}ms` } as React.CSSProperties}
                    />
                  )}
                  <g
                    className={nodeCls}
                    style={{ "--cs-node-delay": `${delays[i]}ms` } as React.CSSProperties}
                  >
                    <g
                      role="button"
                      tabIndex={0}
                      aria-label={`${i + 1}. ${node.title} — ${STATE_LABEL[node.state]}`}
                      aria-expanded={isExpanded}
                      onClick={() => toggleNode(i, node.title)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleNode(i, node.title);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {/* 44px+ hit area (invisible) */}
                      <rect
                        x={-BOX_W / 2}
                        y={-BOX_H / 2}
                        width={BOX_W}
                        height={BOX_H}
                        fill="transparent"
                      />
                      <rect
                        x={-BOX_W / 2}
                        y={-BOX_H / 2}
                        width={BOX_W}
                        height={BOX_H}
                        rx={BOX_R}
                        className="cs-node-box"
                        strokeWidth={isExpanded ? 3 : 1.5}
                      />
                      <g className="cs-node-glyph--on-box">
                        <StateGlyph state={node.state} />
                      </g>
                      <text
                        y={BOX_H / 2 + 26}
                        textAnchor="middle"
                        fontSize={14}
                        fontWeight={700}
                        fill="var(--color-body-text)"
                      >
                        {node.title}
                      </text>
                      <text
                        y={BOX_H / 2 + 44}
                        textAnchor="middle"
                        fontSize={12}
                        fill="var(--color-heading-text)"
                      >
                        {raised ? study.sourceRef : STATE_LABEL[node.state]}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}

            {/* Status stamp — honest claim-level payoff.
                Raised above the line so the wider gradient boxes never touch
                it; completed shows a two-line DONE / COMPLETED (Part 18.1). */}
            <g transform={`translate(${VIEW_W / 2}, ${TRACK_Y - 64})`}>
              <g
                className={`cs-stamp ${inView ? "cs-is-visible" : ""}`}
                style={{ "--cs-node-delay": `${lastDelay + 500}ms` } as React.CSSProperties}
              >
                <rect
                  x={-95}
                  y={-40}
                  width={190}
                  height={80}
                  rx={4}
                  fill="none"
                  stroke="var(--color-brand-blue)"
                  strokeWidth={3}
                  opacity={0.85}
                />
                {study.projectStatus === "completed" ? (
                  <>
                    <text textAnchor="middle" y={-4} className="cs-stamp-line--primary">
                      DONE
                    </text>
                    <text textAnchor="middle" y={16} className="cs-stamp-line--secondary">
                      COMPLETED
                    </text>
                  </>
                ) : (
                  <text
                    textAnchor="middle"
                    fontSize={22}
                    fontWeight={800}
                    fill="var(--color-brand-blue)"
                    letterSpacing={4}
                  >
                    {STAMP_LABEL[study.projectStatus]}
                  </text>
                )}
                <text
                  y={34}
                  textAnchor="middle"
                  fontSize={9}
                  fill="var(--color-body-text)"
                  letterSpacing={2}
                >
                  {study.sourceRef}
                </text>
              </g>
            </g>
          </svg>

          {/* Expanded detail panel (desktop) */}
          {expanded && (
            <div
              role="status"
              className="mx-auto mt-6 max-w-2xl rounded-md border border-border-light bg-white p-6"
            >
              <p className="font-montserrat text-h4 font-bold text-heading-text">{expanded.title}</p>
              {expanded.date && (
                <p className="mt-1 font-mono text-caption text-brand-blue">{expanded.date}</p>
              )}
              <p className="mt-3 text-body text-body-text">{expanded.detail}</p>
            </div>
          )}
        </div>

        {/* ── Mobile: vertical semantic list ── */}
        <ol className="mt-8 space-y-3 lg:hidden">
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
                  className="flex min-h-[44px] w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="cs-mobile-node-chip shrink-0" aria-hidden="true">
                    <Glyph size={20} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-montserrat text-body font-bold text-heading-text">
                      {node.title}
                    </span>
                    <span className="block text-caption text-body-text/70">
                      {STATE_LABEL[node.state]}
                      {node.date ? ` · ${node.date}` : ""}
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
      </div>
    </section>
  );
}

