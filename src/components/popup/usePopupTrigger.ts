/**
 * usePopupTrigger — trigger engine for the dynamic popup.
 *
 * Registers timer / scroll-depth / exit-intent / scroll-up listeners per the
 * plan's §5 spec and calls `onTrigger(type)` exactly once. No `popstate`
 * interception (explicitly forbidden — no back-button hijack).
 *
 * @see plans/dynamic-popup-implementation-plan.md (§5)
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  POPUP_TIMING,
  type PageType,
  type PopupRuntimeConfig,
  type TriggerType,
} from "@/lib/popup";

export interface UsePopupTriggerOptions {
  pageType: PageType;
  /** Used as a reset key — navigating to a different service page re-arms cleanly. */
  pageSlug: string;
  config: PopupRuntimeConfig;
  enabled: boolean;
  onTrigger: (type: TriggerType) => void;
}

export function usePopupTrigger({
  pageType,
  pageSlug,
  config,
  enabled,
  onTrigger,
}: UsePopupTriggerOptions): { fired: boolean; reset: () => void } {
  const [fired, setFired] = useState(false);
  const firedRef = useRef(false);

  // Keep the latest callback without re-registering listeners.
  const onTriggerRef = useRef(onTrigger);
  onTriggerRef.current = onTrigger;

  const fire = useCallback((type: TriggerType) => {
    if (firedRef.current) return;
    firedRef.current = true;
    setFired(true);
    onTriggerRef.current(type);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const armedAt = Date.now();

    /** Guide hard floor: never fire before 12s (plan §5). */
    const fireIfAllowed = (type: TriggerType) => {
      if (
        pageType === "guide" &&
        Date.now() - armedAt < POPUP_TIMING.guideHardFloorS * 1000
      ) {
        return;
      }
      fire(type);
    };

    /* ---------- Timer trigger ---------- */
    let timerId: ReturnType<typeof setTimeout> | null = null;

    if (pageType === "guide") {
      // Dwell timer for guides (15s); hard floor enforced in fireIfAllowed.
      timerId = setTimeout(
        () => fireIfAllowed("timer"),
        POPUP_TIMING.guideDwellS * 1000,
      );
    } else {
      // Skip the timer if the visitor arrived from the same site (already engaged).
      let isSameSiteReferrer = false;
      try {
        const ref = document.referrer;
        if (ref) {
          isSameSiteReferrer =
            new URL(ref).hostname === window.location.hostname;
        }
      } catch {
        isSameSiteReferrer = false;
      }

      const delayS = isSameSiteReferrer
        ? 0
        : pageType === "service"
          ? config.serviceTimerS
          : pageType === "home" || pageType === "approvals-hub"
            ? POPUP_TIMING.homeTimerS
            : 0;

      if (delayS > 0) {
        timerId = setTimeout(() => fireIfAllowed("timer"), delayS * 1000);
      }
    }

    /* ---------- Scroll listeners ---------- */
    let maxScrollPct = 0;

    const scrollPct = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      return max > 0 ? (window.scrollY / max) * 100 : 100;
    };

    const onScroll = () => {
      const pct = scrollPct();
      maxScrollPct = Math.max(maxScrollPct, pct);

      if (pageType === "guide") {
        if (pct >= POPUP_TIMING.guideScrollPct) fireIfAllowed("scrollDepth");
        return;
      }

      if (pageType === "service") {
        const threshold = config.serviceScrollPct;
        if (!firedRef.current && pct >= threshold) {
          if (pct <= 50) {
            fireIfAllowed("scrollDepth");
          }
          // else: visitor blew past the threshold mid-read — don't interrupt.
        }
      }
    };

    /* ---------- Exit intent (desktop) ---------- */
    const desktopMq = window.matchMedia("(min-width: 768px)");

    const onMouseLeave = (e: MouseEvent) => {
      if (!desktopMq.matches) return;
      if (e.clientY >= POPUP_TIMING.exitIntentY) return;
      if (e.relatedTarget) return; // pointer still inside a child element
      fireIfAllowed("exitIntent");
    };

    /* ---------- Scroll-up (mobile exit-intent equivalent) ---------- */
    let lastY = window.scrollY;

    const onScrollUp = () => {
      if (desktopMq.matches) return; // desktop uses mouse exit instead
      const y = window.scrollY;
      const delta = lastY - y; // positive = scrolled up
      lastY = y;
      const pct = scrollPct();
      if (
        delta > 0 &&
        maxScrollPct >= POPUP_TIMING.scrollUpMinPct &&
        maxScrollPct - pct >= 15
      ) {
        fireIfAllowed("scrollUp");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScrollUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollUp);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [enabled, pageType, pageSlug, config, fire]);

  const reset = useCallback(() => {
    firedRef.current = false;
    setFired(false);
  }, []);

  return { fired, reset };
}
