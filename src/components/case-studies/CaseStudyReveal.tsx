"use client";

/**
 * CaseStudyReveal — reveal-once wrapper for server-rendered sections.
 *
 * The shared `case-studies.css` reveal system (`.cs-reveal`, `.cs-stagger`,
 * `.cs-pop-stagger`) hides its targets (`opacity: 0`) until `.cs-is-visible`
 * is added. Server components cannot toggle that class themselves, so every
 * server-rendered section that uses a staggered/crossfade entrance wraps its
 * animated container in this thin client component.
 *
 * - Adds `.cs-reveal` + `.cs-is-visible` on intersection (once per page load).
 * - `className` passes through so callers add `cs-stagger` / `cs-pop-stagger`.
 * - Text stays in the DOM immediately (SSR) — the animation is purely visual,
 *   satisfying the Part 11.2 gate ("true numbers server-rendered").
 * - `prefers-reduced-motion: reduce` renders the final state instantly
 *   (handled in case-studies.css).
 *
 * This is an ADDITIVE shared primitive (mega-plan Part 5.1/6) — it does not
 * touch any existing file.
 */

import type { ReactNode } from "react";
import { useInView } from "./use-in-view";

interface CaseStudyRevealProps {
  children: ReactNode;
  /** Extra classes — typically `cs-stagger` or `cs-pop-stagger`. */
  className?: string;
}

export default function CaseStudyReveal({ children, className = "" }: CaseStudyRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`cs-reveal ${inView ? "cs-is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
