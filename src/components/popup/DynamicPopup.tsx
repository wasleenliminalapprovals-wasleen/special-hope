/**
 * DynamicPopup — lazy-loaded popup UI (mobile bottom sheet + desktop modal).
 *
 * Loaded via `next/dynamic` (ssr: false) by PopupProvider ONLY after a trigger
 * fires, so zero popup UI JS ships on initial load (plan §7).
 *
 * Design (plan §6):
 * - Single responsive card: mobile = bottom sheet (`rounded-t-2xl`,
 *   `max-h-[78dvh]`, drag handle); desktop (≥768px) = centered modal
 *   (`max-w-[440px]`, `rounded-xl`, `animate-fade-in`).
 * - One shared backdrop at `z-[69]` (tap/click to dismiss); card at `z-[70]`,
 *   above the `z-50` FloatingWhatsApp button.
 * - WhatsApp-first primary CTA (`bg-[#25D366]`) with inline form toggle;
 *   `config.variant === "form-primary"` flips the order (GTM A/B).
 * - Full a11y (plan §11): `role="dialog"`, `aria-modal`, `aria-labelledby`,
 *   focus trap, ESC to close, initial focus inside, focus restored on close.
 * - Mobile keyboard guard: `visualViewport` resize offsets the sheet above the
 *   keyboard via a CSS variable consumed by a Tailwind arbitrary class (the
 *   only JS-driven style is that CSS custom property — required because the
 *   offset is dynamic and cannot be a static class).
 * - Motion is calm (240ms) and respects `prefers-reduced-motion`.
 *
 * @see plans/dynamic-popup-implementation-plan.md (§6, §7, §11)
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Clock,
  MessageCircle,
  PenLine,
  ShieldCheck,
  X,
} from "lucide-react";
import { POPUP_COPY } from "@/lib/popup";
import PopupForm from "@/components/popup/PopupForm";
import { usePopupProvider } from "@/components/popup/PopupProvider";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export default function DynamicPopup() {
  const {
    context,
    config,
    whatsappUrl,
    close,
    onWhatsAppClick,
    onFormToggle,
  } = usePopupProvider();

  const t = POPUP_COPY[context.locale].base;
  const pageCopy = POPUP_COPY[context.locale].pages[context.pageType];
  const service = context.serviceName || "your approval";

  const headline = (pageCopy?.headline ?? "").replace(/\{service\}/g, service);
  const subheadline = (pageCopy?.subheadline ?? "").replace(
    /\{service\}/g,
    service,
  );

  // GTM A/B variant — form-first vs WhatsApp-first (plan §5).
  const formFirst = config.variant === "form-primary";
  const [showForm, setShowForm] = useState(formFirst);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleFormToggle = useCallback(() => {
    setShowForm(true);
    onFormToggle();
  }, [onFormToggle]);

  /* ---------- Focus trap + ESC + focus restore (plan §11) ---------- */
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const getFocusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    const firstFocusable = getFocusables()[0];
    (firstFocusable ?? root).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const els = getFocusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [close]);

  /* ---------- Mobile keyboard guard — sheet sits above the keyboard ---------- */
  useEffect(() => {
    const sheet = contentRef.current;
    if (!sheet || typeof window === "undefined") return;
    const vv = window.visualViewport;
    if (!vv) return;

    const onViewportResize = () => {
      // Only a CSS custom property is set via JS — consumed by a Tailwind
      // arbitrary class, so we never write inline layout styles.
      const offset = Math.max(0, window.innerHeight - vv.height);
      sheet.style.setProperty("--popup-kb-offset", `${offset}px`);
    };

    vv.addEventListener("resize", onViewportResize);
    onViewportResize();
    return () => vv.removeEventListener("resize", onViewportResize);
  }, []);

  /* ---------- Shared card content (rendered once, responsive shell below) ---------- */
  return (
    <>
      {/* Backdrop — tap/click to dismiss (z-[69], below the card) */}
      <button
        type="button"
        aria-label={t.ariaClose}
        onClick={close}
        className="fixed inset-0 z-[69] cursor-pointer bg-black/45 focus:outline-none"
        tabIndex={-1}
      />

      {/*
        Responsive shell:
        - Mobile: `items-end` pins the card to the bottom (bottom sheet).
        - Desktop: `md:items-center` centers the card (modal).
        The shell is pointer-events-none so clicks outside the card reach the
        backdrop; the card re-enables pointer events.
      */}
      <div className="pointer-events-none fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
        <div
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-headline"
          className="pointer-events-auto relative flex max-h-[78dvh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-2xl bg-white shadow-dropdown animate-popup-sheet-up translate-y-[calc(-1*var(--popup-kb-offset,0px))] md:max-w-[440px] md:rounded-xl md:animate-fade-in"
        >
          {/* Drag handle — mobile only (decorative affordance) */}
          <div className="flex justify-center pt-3 md:hidden" aria-hidden="true">
            <span className="h-1 w-10 rounded-full bg-body-text/15" />
          </div>

          {/* Header row */}
          <div className="flex items-start justify-between gap-4 px-5 pt-3 md:px-6 md:pt-5">
            <span className="rounded-sm bg-card-bg px-2 py-1 text-caption font-bold uppercase tracking-wider text-brand-blue">
              {t.eyebrow}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label={t.ariaClose}
              className="flex h-11 w-11 items-center justify-center rounded-md text-body-text transition-colors hover:bg-card-bg hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:h-8 md:w-8"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          {/* Headline + subheadline */}
          <div className="px-5 pt-3 md:px-6">
            <h2
              id="popup-headline"
              className="text-h3 font-bold text-heading-text md:text-h2"
            >
              {headline}
            </h2>
            <p className="mt-1.5 text-body-sm text-body-text">{subheadline}</p>
          </div>

          {/* Primary content — WhatsApp-first or form-first (variant) */}
          <div className="px-5 pb-6 pt-4 md:px-6">
            {formFirst ? (
              <div className="animate-fade-in">
                <PopupForm />
              </div>
            ) : (
              <>
                {/* PRIMARY CTA — WhatsApp (existing precedent: bg-[#25D366]) */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onWhatsAppClick}
                  aria-label={t.ariaWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3.5 text-body-sm font-bold text-white shadow-card transition-colors hover:bg-[#20BD5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <MessageCircle
                    size={20}
                    strokeWidth={1.75}
                    className="animate-pulse motion-reduce:animate-none"
                  />
                  {t.whatsappCta}
                </a>
                <p className="mt-1.5 text-center text-caption text-body-text/70">
                  {t.whatsappMicrocopy}
                </p>

                {/* Divider */}
                <div
                  className="my-4 flex items-center gap-3 text-caption uppercase tracking-wide text-body-text/50"
                  aria-hidden="true"
                >
                  <span className="h-px flex-1 bg-border-light" />
                  or
                  <span className="h-px flex-1 bg-border-light" />
                </div>

                {/* Secondary — inline form toggle */}
                {showForm ? (
                  <div className="animate-fade-in">
                    <PopupForm />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleFormToggle}
                    aria-label={t.ariaFormToggle}
                    className="mx-auto flex items-center gap-1.5 rounded-md text-body-sm font-medium text-link-blue underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <PenLine size={18} strokeWidth={1.75} />
                    {t.formToggle}
                  </button>
                )}
              </>
            )}

            {/* Trust row — real verified stats only */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-caption text-body-text/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck
                  size={16}
                  strokeWidth={1.75}
                  className="text-success-green"
                />
                {t.trustLine}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} strokeWidth={1.75} className="text-brand-blue" />
                {t.trustLine2}
              </span>
            </div>

            {/* Dismiss */}
            <button
              type="button"
              onClick={close}
              className="mt-4 w-full rounded-md text-center text-body-sm text-body-text/60 transition-colors hover:text-body-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {t.dismiss}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
