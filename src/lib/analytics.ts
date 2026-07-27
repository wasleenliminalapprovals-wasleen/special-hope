/**
 * Central analytics utility — single source of truth for all GTM events.
 *
 * RULES (from .roo/rules/analytics-tracking.md):
 * - NEVER call `sendGTMEvent` directly from a component — always use `trackEvent()`
 * - NEVER invent a new event name without adding it to the taxonomy first
 * - Events that exist in code but have no matching GTM trigger silently go nowhere
 *
 * @see /reference details/analytics-tracking.md (Section 4 — Event Taxonomy)
 */

import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Every analytics event follows this shape.
 * `action` maps to the GTM Custom Event trigger name.
 */
export type AnalyticsEvent = {
  /** Event name (e.g. "cta_click", "generate_lead") — must match a GTM trigger */
  action: string;
  /** High-level category (e.g. "engagement", "lead", "contact", "navigation") */
  category: string;
  /** Human-readable label for the element interacted with */
  label?: string;
  /** Numeric value (e.g. form field count, fee amount) */
  value?: number;
  /** Additional arbitrary parameters (service_slug, method, question_text, etc.) */
  [key: string]: unknown;
};

/**
 * Fire a GTM dataLayer push event.
 *
 * @example
 * ```tsx
 * import { trackEvent } from "@/lib/analytics";
 *
 * <button
 *   onClick={() => trackEvent({
 *     action: "cta_click",
 *     category: "engagement",
 *     label: "Get Free Consultation",
 *     service_slug: "dubai-civil-defense-approval",
 *   })}
 * >
 *   Get Free Consultation
 * </button>
 * ```
 */
export function trackEvent({
  action,
  category,
  label,
  value,
  ...rest
}: AnalyticsEvent): void {
  sendGTMEvent({
    event: action,
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
}
