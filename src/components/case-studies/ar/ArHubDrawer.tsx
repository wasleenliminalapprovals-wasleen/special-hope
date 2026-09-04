"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { AR_CASE_STUDY_DRAWER_CLOSE_LABEL } from "./ar-labels";

/**
 * ArHubDrawer — Z9 mobile bottom drawer (client, Arabic twin).
 *
 * Mirror of `src/components/case-studies/HubDrawer.tsx` for the `/ar`
 * case-studies hub. A fixed overlay + slide-up panel (`role="dialog"`,
 * `aria-modal`) that houses the mobile filter controls on small screens
 * (authority quick-jump list → facet selects → Clear all, supplied as
 * `children` by the Arabic hub orchestrator). Behaviour:
 * - Opens with `open`; closes via backdrop tap, the `Close` button, or `Escape`.
 * - Focus moves into the panel on open and returns to the previously focused
 *   element on close.
 * - Body scroll is locked while open.
 * - 44px touch targets on the close control.
 *
 * The panel title is passed in by the caller; the close-button `aria-label`
 * comes from the Arabic label token system so every interactive string is
 * native Arabic.
 *
 * @see plans/case-studies-mega-plan.md §19.4.8
 */

export interface ArHubDrawerProps {
  open: boolean;
  onClose: () => void;
  /** Panel title — also used as the dialog `aria-labelledby` id. */
  title: string;
  /** Body content (authority list, facet selects, Clear all). */
  children: ReactNode;
}

export default function ArHubDrawer({
  open,
  onClose,
  title,
  children,
}: ArHubDrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  // Lock body scroll + move focus in while open; restore on close.
  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => {
        closeRef.current?.focus();
      }, 0);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
        (restoreFocusRef.current as HTMLElement | null)?.focus?.();
      };
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  return (
    <div
      className={`cs-drawer ${open ? "cs-drawer--open" : ""}`}
      onKeyDown={handleKeyDown}
    >
      <div
        className="cs-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="cs-drawer-panel"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border-light px-5 py-4">
          <h2
            id={titleId}
            className="font-montserrat text-h4 font-bold text-heading-text"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={AR_CASE_STUDY_DRAWER_CLOSE_LABEL}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border-light bg-white text-body-text transition-colors hover:border-brand-blue hover:text-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
