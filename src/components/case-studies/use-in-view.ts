"use client";

/**
 * useInView — one-shot viewport reveal hook (Case Studies animation system).
 *
 * Every entrance fires ONCE per page load (Part 6.1) and never re-triggers on
 * scroll direction changes: the observer disconnects on first intersect and
 * `inView` stays true. `prefers-reduced-motion: reduce` is handled in CSS —
 * the final state renders instantly while interactive controls stay usable.
 *
 * A hook is the one piece of JS that drives the CSS choreography; all visual
 * motion lives in `case-studies.css` (motion tokens, no animation libraries).
 */
import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (ancient/SSR fallback) → show final state.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect(); // once per page load
            break;
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
