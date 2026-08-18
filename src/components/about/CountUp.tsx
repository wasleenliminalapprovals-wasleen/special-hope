/**
 * CountUp — Sheet 05 animated counter.
 * Plan: plans/about-us-redesign-mega-plan.md §4.1 / §9 Phase B (B3)
 *
 * ~1KB. rAF-driven ease-out count from 0 → value, started once when
 * the element scrolls into view (IntersectionObserver), then the
 * observer is disconnected so it runs exactly once.
 *
 * - Numbers stay REAL DOM text: the final value is server-rendered, so
 *   no-JS (Q10), screen readers and AI-search all parse the real
 *   number from the HTML; JS then animates by writing textContent
 *   directly (no per-frame React re-renders).
 * - `prefers-reduced-motion` (or a missing IntersectionObserver) leaves
 *   the server-rendered final value untouched — no animation.
 */
"use client";

import { useEffect, useRef } from "react";

export interface CountUpProps {
  /** Final integer the counter animates up to (rendered as real DOM text). */
  value: number;
  /** Animation length in ms (default 1600). */
  duration?: number;
  /** Extra classes for the <span> holding the number. */
  className?: string;
}

export default function CountUp({ value, duration = 1600, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined" || value === 0) return;

    let raf = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = String(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(step);
      else el.textContent = String(value);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          el.textContent = "0";
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
