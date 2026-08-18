"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ABOUT_SIGNATURE_LAYER,
  ABOUT_THEME_KEY,
  ABOUT_TOGGLE_PULSE_KEY,
} from "@/lib/feature-flags";
import { trackEvent } from "@/lib/analytics";

export type AboutTheme = "day" | "night";

interface CyanotypeContextValue {
  theme: AboutTheme;
  /** Flip day ↔ night: persists to localStorage, syncs <html data-theme>, fires `theme_toggle` (Q5). */
  toggleTheme: () => void;
  /** True only on the very first visit while the default night theme is showing (Q4). */
  pulse: boolean;
  /** Dismiss the first-visit pulse permanently via the dedicated key (Q4). */
  setPulseDismissed: () => void;
}

const CyanotypeContext = createContext<CyanotypeContextValue | null>(null);

/**
 * CyanotypeProvider — A1 day/night blueprint theme state (Phase B1a).
 *
 * Client component. SSR-safe: SSR renders the day blueprint by default; the Q1
 * pre-paint inline script in src/app/layout.tsx flips <html data-theme> to
 * night (the first-visit default) from localStorage before first paint, and
 * this provider reconciles React state with the DOM on mount (keeps one source
 * of truth for toggling).
 *
 * Same localStorage key across locales — switching locale keeps the theme.
 *
 * Q4: the first-visit toggle pulse is tracked with the DEDICATED
 * `about-toggle-pulse-seen` key (never the theme key, which is only written on
 * toggle and therefore cannot detect a first visit). It fires once, only on the
 * default night state, and never for reduced-motion users.
 *
 * Q13: when ABOUT_SIGNATURE_LAYER is false the provider is a passthrough (no
 * context) — the page stays on the day blueprint. Content/schema are never gated.
 */
export default function CyanotypeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AboutTheme>("night");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let saved: AboutTheme = "night";
    try {
      const raw = window.localStorage.getItem(ABOUT_THEME_KEY);
      if (raw === "day" || raw === "night") saved = raw;
    } catch {
      /* private mode / blocked storage — stay on night */
    }

    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    let seen = true;
    try {
      seen = window.localStorage.getItem(ABOUT_TOGGLE_PULSE_KEY) === "1";
    } catch {
      /* blocked storage — treat as seen to avoid nagging */
    }
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!seen && saved === "night" && !reducedMotion) {
      setPulse(true);
    }
  }, []);

  const dismissPulse = useCallback(() => {
    try {
      window.localStorage.setItem(ABOUT_TOGGLE_PULSE_KEY, "1");
    } catch {
      /* ignore */
    }
    setPulse(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: AboutTheme = prev === "day" ? "night" : "day";
      try {
        window.localStorage.setItem(ABOUT_THEME_KEY, next);
      } catch {
        /* ignore */
      }
      document.documentElement.setAttribute("data-theme", next);
      trackEvent({
        action: "theme_toggle",
        category: "engagement",
        label: next,
      });
      return next;
    });
    dismissPulse();
  }, [dismissPulse]);

  const value = useMemo(
    () => ({ theme, toggleTheme, pulse, setPulseDismissed: dismissPulse }),
    [theme, toggleTheme, pulse, dismissPulse]
  );

  if (!ABOUT_SIGNATURE_LAYER) {
    // Q13 — A1 gated off: stay on the day blueprint, no context provided.
    return <>{children}</>;
  }

  return (
    <CyanotypeContext.Provider value={value}>
      {children}
    </CyanotypeContext.Provider>
  );
}

/** Access the A1 theme state. Must be rendered inside CyanotypeProvider. */
export function useCyanotype(): CyanotypeContextValue {
  const ctx = useContext(CyanotypeContext);
  if (!ctx) {
    throw new Error("useCyanotype must be used within CyanotypeProvider");
  }
  return ctx;
}
