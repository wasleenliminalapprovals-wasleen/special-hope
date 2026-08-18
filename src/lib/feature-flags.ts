/**
 * Build-time feature flags.
 *
 * `ABOUT_SIGNATURE_LAYER` is the single switch (Q13) that gates ALL of the
 * About Us "Living Blueprint" signature interactions — A1 cyanotype toggle,
 * A2 scroll-scrubbed hero line, A3 dimension-line stats, A4 physical photo
 * treatment, A5 sheet-number rail, A6 single-use approval stamp, A7 custom
 * drafting-pencil cursor, and A8 linen texture.
 *
 * When `false`, the A1–A8 components render their static fallbacks (or are
 * omitted) so the page degrades gracefully to the base design. The Sheets
 * 01–10 content and the JSON-LD schema stack are NEVER gated — they render
 * in full regardless of this flag.
 *
 * @see plans/about-us-redesign-mega-plan.md §4.3 (Files modified)
 * @see plans/about-us-redesign-mega-plan.md §7 (Q13 — feature flag)
 */

export const ABOUT_SIGNATURE_LAYER = true as const;

/** localStorage key shared across locales so switching locale keeps the theme. */
export const ABOUT_THEME_KEY = "wasleen-about-theme";

/** Dedicated dismissal key for the first-visit toggle pulse (Q4) — never the theme key. */
export const ABOUT_TOGGLE_PULSE_KEY = "wasleen-about-toggle-pulse-seen";
