"use client";

import { Moon, Sun } from "lucide-react";
import { useCyanotype } from "./CyanotypeProvider";

/** Locale-appropriate copy + aria-labels fed from about.ts / about-ar.ts (Q2). */
export interface CyanotypeToggleLabels {
  /** aria-label when the current theme is day → action switches to night. */
  toNight: string;
  /** aria-label when the current theme is night → action switches to day. */
  toDay: string;
  /** Visible label for the day state. */
  day: string;
  /** Visible label for the night state. */
  night: string;
}

interface CyanotypeToggleProps {
  labels: CyanotypeToggleLabels;
  /** Extra classes merged onto the button. */
  className?: string;
}

/**
 * CyanotypeToggle — A1 day/night blueprint theme switch (Phase B1a).
 *
 * Client component. Locale-agnostic: every string arrives via the `labels` prop
 * (Arabic strings come from about-ar.ts), so EN and AR share this component.
 *
 * Accessibility (Q2): the button exposes `aria-pressed` (true when the night
 * theme is active) plus a dynamic `aria-label` describing the action it will
 * perform in the current state — never colour-only (icon + text + state).
 *
 * Q4: while the provider reports `pulse === true` the `about-toggle-pulse`
 * class animates a short amber ring (see about.css). Clicking toggles the theme
 * and permanently dismisses the pulse via the dedicated key.
 *
 * Q5: each toggle fires a `theme_toggle` analytics event (in the provider).
 *
 * The button's colours + focus ring live in about.css (`.about-toggle`) so the
 * theme swap crossfades; layout utilities (padding, mono type) are Tailwind.
 */
export default function CyanotypeToggle({
  labels,
  className = "",
}: CyanotypeToggleProps) {
  const { theme, toggleTheme, pulse, setPulseDismissed } = useCyanotype();

  const isNight = theme === "night";
  const actionLabel = isNight ? labels.toDay : labels.toNight;

  return (
    <button
      type="button"
      aria-pressed={isNight}
      aria-label={actionLabel}
      title={actionLabel}
      onClick={() => {
        setPulseDismissed();
        toggleTheme();
      }}
      className={`about-toggle inline-flex items-center gap-2 rounded-md px-3 py-2 font-roboto-mono text-xs uppercase tracking-wider ${
        pulse ? "about-toggle-pulse" : ""
      } ${className}`.trim()}
    >
      {isNight ? (
        <Moon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Sun aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
      )}
      <span aria-hidden="true">{isNight ? labels.night : labels.day}</span>
    </button>
  );
}
