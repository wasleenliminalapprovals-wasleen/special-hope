/**
 * Accordion — Accessible, progressively-enhanced accordion component.
 *
 * Features:
 * - Keyboard accessible (Enter/Space to toggle)
 * - aria-expanded / aria-controls for screen readers
 * - CSS-only animation (max-height transition)
 * - Optional single or multi-item expansion
 *
 * @usage
 * ```tsx
 * <Accordion items={[
 *   { title: "What is DM Approval?", content: "..." },
 *   { title: "How long does it take?", content: "..." },
 * ]} />
 * ```
 */

"use client";

import { useState, useCallback, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  /** Unique identifier (defaults to index if not provided) */
  id?: string;
  /** Visible question / heading text */
  title: string;
  /** Content rendered when expanded */
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open at once (default: false) */
  allowMultiple?: boolean;
  /** Index of initially expanded item (or array if allowMultiple) */
  defaultOpenIndex?: number | number[];
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIndex,
  className = "",
}: AccordionProps) {
  const initialOpen = Array.isArray(defaultOpenIndex)
    ? new Set(defaultOpenIndex)
    : defaultOpenIndex !== undefined
      ? new Set([defaultOpenIndex])
      : new Set<number>();

  const [openIndexes, setOpenIndexes] = useState<Set<number>>(initialOpen);

  const toggle = useCallback(
    (index: number) => {
      setOpenIndexes((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) {
            // Close all others
            next.clear();
          }
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  if (!items || items.length === 0) return null;

  return (
    <div className={`divide-y divide-border-light ${className}`.trim()}>
      {items.map((item, index) => {
        const isOpen = openIndexes.has(index);
        const panelId = `accordion-panel-${item.id ?? index}`;
        const buttonId = `accordion-button-${item.id ?? index}`;

        return (
          <div key={item.id ?? index}>
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between py-4 text-left text-body font-medium text-heading-text hover:text-brand-blue-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-sm"
              >
                <span>{item.title}</span>
                <ChevronDown
                  size={20}
                  strokeWidth={1.75}
                  className={`shrink-0 text-body-text transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="overflow-hidden transition-all duration-200 ease-out"
            >
              <div className="pb-4 text-body-sm text-body-text leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
