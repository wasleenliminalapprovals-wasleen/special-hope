"use client";

/**
 * ScrollReveal — App Router-safe scroll reveal driver.
 *
 * Why this exists:
 * The blog's `.fade-in` / `.reveal` elements start at `opacity: 0` and only
 * appear once `.is-visible` is added. Previously that class was added by an
 * inline `<script>` IIFE (IntersectionObserver) injected per page. Inline
 * scripts inside Server Components are NOT re-executed on client-side (soft)
 * navigation, so heroes stayed hidden after `next/link` transitions and only
 * appeared on a full reload.
 *
 * This client component runs on every route change, observes every
 * `.fade-in` / `.reveal` element (current + future), and reveals them as they
 * enter the viewport. It is a progressive enhancement: above-the-fold content
 * no longer depends on JS (Fix 1 removed `fade-in` from the post hero/image/
 * stats), so if JS fails the page still renders fully.
 *
 * Implementation notes:
 * - Queries only elements NOT already `.is-visible` → idempotent alongside
 *   the per-page inline IIFEs on a full page load.
 * - A MutationObserver (debounced via requestAnimationFrame) catches elements
 *   added after mount: soft navigations into /blog, category-filter swaps,
 *   "load more" expansions — cases where the layout persists and no new
 *   inline script runs.
 * - Respects `prefers-reduced-motion` (the CSS already forces opacity 1).
 * - IntersectionObserver fires its initial callback on observe(), so anything
 *   already in the viewport reveals immediately without scrolling.
 */

import { useEffect } from "react";

const REVEAL_SELECTOR = ".fade-in:not(.is-visible), .reveal:not(.is-visible)";

export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let rafId = 0;

    const reveal = (el: Element) => {
      el.classList.add("is-visible");
    };

    const scanAndObserve = () => {
      if (!io) return;
      document
        .querySelectorAll(REVEAL_SELECTOR)
        .forEach((el) => io!.observe(el));
    };

    const scheduleRescan = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(scanAndObserve);
    };

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io!.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
    }

    // First pass: reveal current above-fold content + observe the rest.
    scanAndObserve();

    // Safety net: reveal anything already in the viewport even if the
    // observer above missed it (e.g., elements added mid-scroll).
    if (io) {
      document
        .querySelectorAll(REVEAL_SELECTOR)
        .forEach((el) => io.observe(el));
    }

    // MutationObserver: keep revealing elements added by soft navigations,
    // category filter changes, and "load more" expansions.
    if ("MutationObserver" in window) {
      mo = new MutationObserver(scheduleRescan);
      mo.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);

  return null;
}
