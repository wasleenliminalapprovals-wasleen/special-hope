/**
 * Meta Pixel utility — single source of truth for Meta Pixel (facebook.com)
 * tracking events.
 *
 * The base script (loader + `fbq('init', META_PIXEL_ID)`) is injected ONCE in
 * the root layout (`src/app/layout.tsx`) and covers both EN and `/ar` routes.
 * This module holds the `fbq` type declarations and the typed helpers used by
 * `MetaPixelTracker`, the `trackEvent()` bridge in `lib/analytics.ts`, and the
 * `FreeQuoteForm` Lead event.
 *
 * RULES:
 * - NEVER call `window.fbq` directly from a component — always use these helpers.
 * - The base code contains NO inline `fbq('track', 'PageView')` —
 *   `MetaPixelTracker` fires exactly one PageView per route to avoid
 *   double-firing on App Router (SPA) navigation.
 * - PII (email/phone) for Advanced Matching is passed as plaintext — Meta
 *   SHA-256 hashes it automatically (see plan §1).
 *
 * @see plans/meta-pixel-implementation-plan.md
 * @see /reference details/analytics-tracking.md (Section 8 — Meta Pixel)
 */

import { META_PIXEL_ID } from "@/lib/constants";

export { META_PIXEL_ID };

/** Meta standard events used by this site. */
export type MetaEventName = "PageView" | "ViewContent" | "Contact" | "Lead";

/**
 * Per-event custom data forwarded to `fbq('track', event, data)`.
 * Supports the friendly aliases `email`/`phone`/`service` (mapped to Meta's
 * `em`/`ph`/`content_name` in `metaLead`) alongside native Meta keys.
 */
export type MetaEventData = {
  content_name?: string;
  content_type?: string;
  content_category?: string;
  currency?: string;
  value?: number;
  /** Advanced Matching — plaintext email (Meta hashes automatically). */
  em?: string;
  /** Advanced Matching — plaintext phone (Meta hashes automatically). */
  ph?: string;
  /** Friendly alias for `em` (used by FreeQuoteForm). */
  email?: string;
  /** Friendly alias for `ph` (used by FreeQuoteForm). */
  phone?: string;
  /** Friendly alias for `content_name` (used by FreeQuoteForm). */
  service?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    fbq?: (
      command: "init" | "track" | "trackCustom",
      event: string,
      data?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Pending-event queue — buffers Meta events fired BEFORE the pixel base code
 * has loaded.
 *
 * AnalyticsLoader (src/components/analytics/AnalyticsLoader.tsx) defers the
 * base script to idle time (after LCP) instead of lazyOnload, so events fired
 * during hydration — e.g. the PageView/ViewContent from MetaPixelTracker on
 * first mount — would otherwise be silently dropped. `drainFbqQueue()` flushes
 * these once `window.fbq` exists; calls made after the base code loads are
 * forwarded to `fbq` immediately (the base code's own internal queue replays
 * them once fbevents.js loads).
 */
type PendingMetaCall = {
  command: "track";
  event: string;
  data?: Record<string, unknown>;
};

let pendingCalls: PendingMetaCall[] = [];

/**
 * Fire any Meta standard event. Safe no-op when the pixel isn't loaded or the
 * ID is missing — keeps the page functional if Meta's CDN is unreachable.
 */
export function metaEvent(event: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !META_PIXEL_ID) return;
  const fbq = window.fbq;
  if (typeof fbq === "function") {
    fbq("track", event, data);
  } else {
    pendingCalls.push({ command: "track", event, data });
  }
}

/**
 * Flush any events buffered while the pixel base code was deferred. Safe to
 * call at any time — it is a no-op until `window.fbq` exists. Called by
 * AnalyticsLoader immediately after injecting the base code + `fbq('init')`.
 */
export function drainFbqQueue(): void {
  if (typeof window === "undefined") return;
  const fbq = window.fbq;
  if (typeof fbq !== "function") return;
  while (pendingCalls.length > 0) {
    const call = pendingCalls.shift();
    if (call) fbq(call.command, call.event, call.data);
  }
}

/** PageView — fired on every route change by MetaPixelTracker. */
export function metaPageView(): void {
  metaEvent("PageView");
}

/** ViewContent — fired on approval/guide/service content routes (EN + AR). */
export function metaViewContent(data: MetaEventData): void {
  metaEvent("ViewContent", data);
}

/** Contact — WhatsApp / phone / email clicks (forwarded via trackEvent bridge). */
export function metaContact(data: MetaEventData = {}): void {
  metaEvent("Contact", data);
}

/**
 * Lead — used for Advanced Matching (`em`/`ph`) on free-quote success and the
 * license-request micro-conversion.
 *
 * Accepts friendly aliases (`email`, `phone`, `service`) that are mapped to
 * Meta's `em` / `ph` / `content_name` params; any other keys (e.g. native
 * `content_name`, `content_category`, `currency`) pass through untouched.
 */
export function metaLead(data: MetaEventData): void {
  const { email, phone, service, ...rest } = data;
  metaEvent("Lead", {
    ...rest,
    ...(email ? { em: email } : {}),
    ...(phone ? { ph: phone } : {}),
    ...(service ? { content_name: service } : {}),
  });
}
