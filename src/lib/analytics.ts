/**
 * Central analytics utility — single source of truth for all GTM events.
 *
 * RULES (from .roo/rules/analytics-tracking.md):
 * - NEVER call `sendGTMEvent` directly from a component — always use `trackEvent()`
 * - NEVER invent a new event name without adding it to the taxonomy first
 * - Events that exist in code but have no matching GTM trigger silently go nowhere
 *
 * Meta Pixel bridge: `trackEvent()` also forwards qualifying interactions to the
 * Meta Pixel (see Section 8 in /reference details/analytics-tracking.md) so the
 * 7+ components that call `trackEvent()` need zero edits. PII (email/phone) is
 * NEVER routed through GTM — it goes only via `metaLead()` directly.
 *
 * @see /reference details/analytics-tracking.md (Section 4 — Event Taxonomy)
 * @see /reference details/analytics-tracking.md (Section 8 — Meta Pixel)
 */

import { sendGTMEvent } from "@next/third-parties/google";
import { metaContact, metaLead } from "@/lib/meta-pixel";

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

  // Meta Pixel bridge — forwards qualifying interactions to fbq without
  // requiring edits in the components that call trackEvent(). PII is never
  // passed here; the free-quote Lead with Advanced Matching (em/ph) is sent
  // directly from FreeQuoteForm via metaLead().
  if (action === "contact_click") {
    const method = typeof rest.method === "string" ? rest.method : "";
    if (method === "whatsapp" || method === "phone" || method === "email") {
      metaContact({ content_name: method });
    }
  } else if (action === "whatsapp_license_request") {
    metaLead({ content_name: "license_request" });
  }
}
