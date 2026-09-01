/**
 * AnalyticsLoader — manages third-party analytics (GTM + Meta Pixel) loading.
 * GTM is injected at NORMAL timing (NOT deferred to idle — see injectGtm
 * docstring for why). The Meta Pixel base code is deferred until the main
 * thread is idle, i.e. AFTER first paint / LCP.
 *
 * Previously GTM and the Meta Pixel base script were loaded with
 * `next/script` `strategy="lazyOnload"`, which still parses and executes them
 * on the main thread right after the `load` event — inflating Total Blocking
 * Time on mobile. This component instead schedules injection via
 * `requestIdleCallback` (with a `timeout` fallback so it always fires even if
 * the thread never goes idle), keeping ~145 KiB of third-party JS off the
 * critical path.
 *
 * SAFETY:
 * - Injection is idempotent: guarded by a module-level ref AND a DOM
 *   existence check, so the scripts are appended exactly once per session.
 * - No-JS browsers are unaffected — the `<noscript>` fallbacks for both GTM
 *   and the Meta Pixel remain server-rendered in `src/app/layout.tsx`.
 * - GTM/GA4 events pushed before GTM loads are buffered by the early
 *   `window.dataLayer` init in the root layout and replayed by gtm.js.
 * - Meta events fired before the pixel base code loads (e.g. PageView during
 *   hydration) are buffered by `meta-pixel.ts`'s pending queue and flushed
 *   via `drainFbqQueue()`.
 *
 * Mount this ONCE in `src/app/layout.tsx` inside `<body>` (which already
 * wraps `/ar` routes) — never in `src/app/ar/layout.tsx`.
 *
 * @see plans/performance-fixes-round-2.md (Fix 3)
 * @see plans/meta-pixel-implementation-plan.md
 */
"use client";

import { useEffect, useRef } from "react";
import { drainFbqQueue } from "@/lib/meta-pixel";

/**
 * Inject the Google Tag Manager container script. The official GTM snippet is
 * asynchronous and never blocks rendering.
 *
 * IMPORTANT: GTM must load at NORMAL timing — NOT deferred to idle. Deferring
 * gtm.js to idle causes the GA4 Configuration tag (__googtag, tag 5) to throw
 * a tag error (TE2) on gtm.init, so the container-mode gtag.js never receives
 * its config command and the GA4 client never initializes (no collect, gaGlobal
 * stays null). This was diagnosed in Phase 1: commit ae6afb4 deferred GTM to
 * idle here while also removing the direct gtag.js that had been masking the
 * failure. Test 16 proved the same GTM + GA4 container collects correctly when
 * gtm.js loads at normal timing.
 */
function injectGtm(gtmId: string): void {
  if (!gtmId) return;
  if (document.getElementById("gtm-script")) return; // already appended
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
}

/**
 * Inject the Meta Pixel base code (loader + `fbq('init')`). Inline scripts
 * execute synchronously on append, so `window.fbq` exists and `init` has been
 * queued immediately afterwards — at which point `drainFbqQueue()` can flush
 * any events buffered during hydration.
 */
function injectMetaPixel(metaPixelId: string): void {
  if (!metaPixelId) return;
  if (document.getElementById("meta-pixel-init")) {
    drainFbqQueue();
    return;
  }
  const script = document.createElement("script");
  script.id = "meta-pixel-init";
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${metaPixelId}');
  `;
  document.head.appendChild(script);
  drainFbqQueue();
}

export default function AnalyticsLoader({
  gtmId,
  metaPixelId,
}: {
  gtmId: string;
  metaPixelId: string;
}) {
  // Module-lifetime guard: even if this component remounts (e.g. React
  // StrictMode double-invoke in dev), the Meta Pixel script is only injected
  // once. (injectGtm/injectMetaPixel also self-guard via DOM id checks.)
  const injectedRef = useRef(false);

  // GTM — injected immediately at NORMAL timing. Must NOT be idle-deferred:
  // deferred idle loading breaks the GA4 Configuration tag (see injectGtm
  // docstring). This is the Phase 3 fix for the Aug 13 GA4 outage.
  useEffect(() => {
    injectGtm(gtmId);
  }, [gtmId]);

  // Meta Pixel — kept deferred to idle (non-critical, does not depend on GTM
  // timing). Unchanged from the original design.
  useEffect(() => {
    let cancelled = false;

    const injectMeta = () => {
      if (cancelled || injectedRef.current) return;
      injectedRef.current = true;
      injectMetaPixel(metaPixelId);
    };

    // Match the project's established requestIdleCallback pattern
    // (see src/components/sections/HeroSection.tsx).
    type IdleWindow = Window & {
      requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback: (handle: number) => void;
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const w = window as IdleWindow;
      const handle = w.requestIdleCallback(injectMeta, { timeout: 2500 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback(handle);
      };
    }

    const timer = globalThis.setTimeout(injectMeta, 2500);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(timer);
    };
  }, [metaPixelId]);

  return null;
}
