/**
 * RevisionLogBlock — Sheet 02 "revision log" title block (client component).
 *
 * Design (plans/about-us-redesign-mega-plan.md Sheet 02, line 70):
 * - Renders the revision history as an animated drawing title block:
 *   rows `REV A · BUILDER · EST. 2013` → `REV B · ENGINEER · IN-HOUSE` →
 *   `REV C · APPROVALS · 52+ TYPES`, finishing with a **static** APPROVED
 *   stamp (success-green). The animated stamp is reserved for Sheet 08 (A6),
 *   so this one is always static.
 * - The plan says "reuse the TitleBlock symbol" but TitleBlock's props
 *   (projectName/drawingTitle/scale/date/revision) cannot express an arbitrary
 *   RevisionLogRow[] model. This component therefore mirrors the title-block
 *   visual language (mono rows, grid columns, crop marks, corner border) with
 *   real HTML rows — critical text stays real DOM for Q10/no-JS — and a single
 *   SVG `<rect>` that acts as the border and draws itself in.
 *
 * Motion (Q10 / reduced-motion safe):
 * - Default render = complete static drawing (solid border, all rows visible,
 *   stamp visible). No-JS, reduced-motion, and pre-hydration all show this.
 * - Once 35% of the block scrolls into view, an IntersectionObserver adds the
 *   `.about-revlog--draw` class; only THEN do CSS keyframes run — the rect
 *   border draws in (stroke-dashoffset) and rows stagger in with `fade-in`.
 * - `prefers-reduced-motion: reduce` is checked in JS (early return, never
 *   adds the class) AND handled again in about.css (belt-and-suspenders).
 *
 * Locale-agnostic: every string (title, rows, approved label) arrives via
 * props from about.ts / about-ar.ts. Uses only logical positioning utilities.
 */

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import type { AboutContent } from "@/data/about";

type RevisionLogRow = AboutContent["story"]["revisionRows"][number];

interface RevisionLogBlockProps {
  /** Localized title — "REVISION LOG" / "سجل المراجعات". */
  revisionTitle: string;
  /** Revision rows (REV / division / scope / status). */
  rows: RevisionLogRow[];
  /** Localized stamp label — "APPROVED" / "معتمد". */
  approvedLabel: string;
}

export default function RevisionLogBlock({
  revisionTitle,
  rows,
  approvedLabel,
}: RevisionLogBlockProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  // `false` is the static-complete default: safe for SSR, no-JS, reduced motion.
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduced motion: never trigger the draw-in. The CSS media block in
    // about.css is the belt; this early-return is the suspenders.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = boxRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDraw(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={`about-revlog relative ${draw ? "about-revlog--draw" : ""}`}
    >
      {/* Drawing border — solid by default; draws in under .about-revlog--draw. */}
      <svg
        aria-hidden="true"
        className="about-revlog-border"
        viewBox="0 0 320 320"
        preserveAspectRatio="none"
      >
        <rect
          className="about-revlog-rect"
          x="1"
          y="1"
          width="318"
          height="318"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          // Perimeter = 4 × 318 = 1272; 1300 > perimeter so a solid dash covers
          // the whole path (no visible gap) in the static state.
          style={{ "--revlog-length": 1300 } as CSSProperties}
        />
      </svg>

      {/* Corner crop marks (shared DraftingFrame convention, RTL-safe). */}
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--tl absolute top-0 start-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--tr absolute top-0 end-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--bl absolute bottom-0 start-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--br absolute bottom-0 end-0"
      />

      <div className="relative p-5 sm:p-6">
        <p className="about-revlog-title font-roboto-mono text-xs uppercase tracking-widest">
          {revisionTitle}
        </p>

        <ul className="about-revlog-rows mt-3">
          {rows.map((row, i) => (
            <li
              key={`${row.rev}-${i}`}
              className="about-revlog-row"
              style={
                { "--revlog-row-delay": `${0.35 + i * 0.22}s` } as CSSProperties
              }
            >
              <span className="about-revlog-rev">{row.rev}</span>
              <span className="about-revlog-desc">
                {row.division}
                <span className="about-revlog-dot" aria-hidden="true">
                  {" "}
                  ·{" "}
                </span>
                {row.scope}
              </span>
              <span className="about-revlog-status">{row.status}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-end">
          <div
            className="about-approved-stamp -rotate-4"
            role="img"
            aria-label={approvedLabel}
          >
            <Check aria-hidden="true" size={14} strokeWidth={2.5} />
            <span>{approvedLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
