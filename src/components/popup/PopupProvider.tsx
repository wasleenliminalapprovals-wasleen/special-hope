/**
 * PopupProvider — global state machine + arming logic for the dynamic popup.
 *
 * Responsibilities (plan §3, §4, §5, §12):
 * - Resolve page context (type, slug, service name, WhatsApp message, locale).
 * - Gate arming with `canShowPopup()` + `isAllowedToShow()` (Phase-A allowlist)
 *   BEFORE any trigger listener is registered.
 * - Arm the trigger engine (`usePopupTrigger`) only when the gate passes.
 * - Capture-phase click listener suppresses the popup once a visitor engages an
 *   existing conversion path (wa.me link / FloatingWhatsApp button / any form)
 *   — WITHOUT modifying those locked components.
 * - Lazy-mount `<DynamicPopup>` (ssr: false) only after a trigger fires, so zero
 *   popup UI JS ships on initial load.
 * - Fire analytics events via `trackEvent()` from `@/lib/analytics` (never
 *   `sendGTMEvent` directly; no PII is sent to GTM).
 *
 * @see plans/dynamic-popup-implementation-plan.md (§3, §4, §5, §9, §12, §14)
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import {
  POPUP_EVENTS,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  canShowPopup,
  isAllowedToShow,
  isExistingEngagementTarget,
  markPopupDismissed,
  markPopupLeadSubmitted,
  markPopupShownThisSession,
  prettifySlug,
  readPopupConfig,
  resolvePageSlug,
  resolvePageType,
  resolveServiceName,
  type PopupContext as PopupContextData,
  type PopupLocale,
  type PopupRuntimeConfig,
  type TriggerType,
} from "@/lib/popup";
import { usePopupTrigger } from "@/components/popup/usePopupTrigger";

/**
 * Lazy UI — zero popup JS on initial load (plan §7). Only downloaded + rendered
 * after a trigger fires, keeping the eager `PopupProvider` chunk ~3KB.
 */
const DynamicPopup = dynamic(() => import("@/components/popup/DynamicPopup"), {
  ssr: false,
  loading: () => null,
});

export interface PopupProviderValue {
  /** "visible" only after a trigger fires; provider unmounts the UI when hidden. */
  status: "hidden" | "visible";
  /** Which trigger opened it — surfaced in analytics params. */
  triggerType: TriggerType | null;
  /** Fully-resolved page context for copy + Apps Script payload. */
  context: PopupContextData;
  /** GTM-injectable runtime config (A/B variant + timings). */
  config: PopupRuntimeConfig;
  /** Pre-built WhatsApp deep link for the current page. */
  whatsappUrl: string;
  /** Close the popup (marks 7-day dismissal cooldown + fires `popup_close`). */
  close: () => void;
  onWhatsAppClick: () => void;
  onFormToggle: () => void;
  onFormAttempt: () => void;
  onSubmitSuccess: () => void;
  onSubmitError: () => void;
}

const PopupContext = createContext<PopupProviderValue | null>(null);

/** Consumed by DynamicPopup + PopupForm. Throws if used outside the provider. */
export function usePopupProvider(): PopupProviderValue {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error("usePopupProvider must be used within <PopupProvider>");
  }
  return ctx;
}

export default function PopupProvider() {
  const pathname = usePathname() ?? "/";

  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"hidden" | "visible">("hidden");
  const [triggerType, setTriggerType] = useState<TriggerType | null>(null);
  const [armed, setArmed] = useState(false);
  const [config] = useState<PopupRuntimeConfig>(readPopupConfig);

  const openedAtRef = useRef(0);
  const submittedRef = useRef(false);
  const prevPathnameRef = useRef(pathname);

  /* ---------- 1. Client mount — allow gating with browser-only APIs ---------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- 2. Resolve page context from the current pathname ---------- */
  const pageType = useMemo(() => resolvePageType(pathname), [pathname]);
  const pageSlug = useMemo(() => resolvePageSlug(pathname), [pathname]);
  const locale: PopupLocale = pathname.startsWith("/ar") ? "ar" : "en";

  const serviceName = useMemo(
    () => resolveServiceName(pageType, pageSlug),
    [pageType, pageSlug],
  );

  const topic = useMemo(
    () =>
      pageType === "guide"
        ? prettifySlug(pageSlug)
        : pageType === "service"
          ? serviceName
          : "",
    [pageType, pageSlug, serviceName],
  );

  const whatsappMessage = useMemo(
    () => buildWhatsAppMessage(pageType, serviceName, topic, locale),
    [pageType, serviceName, topic, locale],
  );

  const popupContext: PopupContextData = useMemo(
    () => ({
      pageType,
      pageSlug,
      serviceName,
      serviceInterest: pageType === "service" ? serviceName : "",
      locale,
      whatsappMessage,
    }),
    [pageType, pageSlug, serviceName, locale, whatsappMessage],
  );

  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(popupContext.whatsappMessage),
    [popupContext.whatsappMessage],
  );

  /* ---------- 3. Hide the popup if the visitor navigates away (SPA) ---------- */
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setStatus("hidden");
    }
  }, [pathname]);

  /* ---------- 4. Arm only when the gate passes for the CURRENT page ---------- */
  useEffect(() => {
    if (!mounted) return;
    if (!isAllowedToShow(pageType, pageSlug)) {
      setArmed(false);
      return;
    }
    setArmed(canShowPopup());
  }, [mounted, pageType, pageSlug]);

  /* ---------- 5. Suppress once the visitor engages an existing conversion path ---------- */
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (isExistingEngagementTarget(e.target)) {
        markPopupShownThisSession();
        setArmed(false);
      }
    };
    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  /* ---------- 6. Trigger callback — show + track (re-checks gate at fire time) ---------- */
  const handleTrigger = useCallback(
    (type: TriggerType) => {
      // Re-check: the visitor may have engaged a conversion path (FloatingWhatsApp
      // / FreeQuoteForm) between arming and the trigger — never interrupt them.
      if (!canShowPopup()) return;

      markPopupShownThisSession();
      openedAtRef.current = Date.now();
      submittedRef.current = false;
      setTriggerType(type);
      setStatus("visible");

      trackEvent({
        action: POPUP_EVENTS.view,
        category: "popup",
        label: type,
        trigger: type,
        page_type: pageType,
        page_slug: pageSlug || undefined,
        service_slug: pageType === "service" ? pageSlug : undefined,
      });
    },
    [pageType, pageSlug],
  );

  usePopupTrigger({
    pageType,
    pageSlug,
    config,
    enabled: armed && status === "hidden",
    onTrigger: handleTrigger,
  });

  /* ---------- 7. UI callbacks (analytics only — no PII) ---------- */
  const close = useCallback(() => {
    if (status !== "visible") return;
    const openMs = Date.now() - (openedAtRef.current || Date.now());
    setStatus("hidden");
    markPopupDismissed();
    trackEvent({
      action: POPUP_EVENTS.close,
      category: "popup",
      label: submittedRef.current ? "post-submit" : "dismiss",
      time_open_ms: openMs,
      trigger: triggerType ?? undefined,
      page_type: pageType,
      page_slug: pageSlug || undefined,
    });
  }, [status, triggerType, pageType, pageSlug]);

  const onWhatsAppClick = useCallback(() => {
    trackEvent({
      action: POPUP_EVENTS.whatsappClick,
      category: "popup",
      label: "whatsapp-cta",
      variant: config.variant,
      trigger: triggerType ?? undefined,
      page_type: pageType,
      page_slug: pageSlug || undefined,
      service_slug: pageType === "service" ? pageSlug : undefined,
    });
  }, [config.variant, triggerType, pageType, pageSlug]);

  const onFormToggle = useCallback(() => {
    trackEvent({
      action: POPUP_EVENTS.formToggle,
      category: "popup",
      label: "form-toggle",
      variant: config.variant,
      page_type: pageType,
      page_slug: pageSlug || undefined,
    });
  }, [config.variant, pageType, pageSlug]);

  const onFormAttempt = useCallback(() => {
    trackEvent({
      action: POPUP_EVENTS.formAttempt,
      category: "popup",
      label: "form-attempt",
      page_type: pageType,
      page_slug: pageSlug || undefined,
    });
  }, [pageType, pageSlug]);

  const onSubmitSuccess = useCallback(() => {
    submittedRef.current = true;
    markPopupLeadSubmitted();
    trackEvent({
      action: POPUP_EVENTS.submitSuccess,
      category: "popup",
      label: "form-submit-success",
      page_type: pageType,
      page_slug: pageSlug || undefined,
      service_slug: pageType === "service" ? pageSlug : undefined,
    });
  }, [pageType, pageSlug]);

  const onSubmitError = useCallback(() => {
    trackEvent({
      action: POPUP_EVENTS.submitError,
      category: "popup",
      label: "form-submit-error",
      page_type: pageType,
      page_slug: pageSlug || undefined,
    });
  }, [pageType, pageSlug]);

  const value = useMemo<PopupProviderValue>(
    () => ({
      status,
      triggerType,
      context: popupContext,
      config,
      whatsappUrl,
      close,
      onWhatsAppClick,
      onFormToggle,
      onFormAttempt,
      onSubmitSuccess,
      onSubmitError,
    }),
    [
      status,
      triggerType,
      popupContext,
      config,
      whatsappUrl,
      close,
      onWhatsAppClick,
      onFormToggle,
      onFormAttempt,
      onSubmitSuccess,
      onSubmitError,
    ],
  );

  return (
    <PopupContext.Provider value={value}>
      {status === "visible" ? <DynamicPopup /> : null}
    </PopupContext.Provider>
  );
}
