"use client";

/**
 * PrivacySidebar — Sticky scrollspy table of contents for the privacy policy.
 *
 * - Desktop: sticky vertical category list (`lg:sticky`, `border-e`) that
 *   highlights the currently visible section via IntersectionObserver.
 * - Mobile-first (360–390px): the same links become a horizontal, scrollable
 *   chip row above the content.
 * - Every link is a real `<a href="#id">` anchor (no JS-only navigation) with
 *   `aria-current` on the active item.
 * - Direction handled with CSS logical properties (`border-e`, `ps-`, `pe-`,
 *   `text-start`) so it auto-flips in RTL — no `if (locale === "ar")` layout
 *   conditionals.
 *
 * @see plans/privacy-policy-build-plan.md §6
 * @see .roo/rules/00-PROJECT-MASTER-RULE.md (accessibility, real anchors)
 */

import { useEffect, useState } from "react";

export interface PrivacySidebarItem {
  /** Anchor id of the target section (must exist in the DOM). */
  id: string;
  /** Visible label. */
  label: string;
}

interface PrivacySidebarProps {
  items: PrivacySidebarItem[];
  /** Accessible name for the <nav> landmark. */
  ariaLabel: string;
}

export default function PrivacySidebar({ items, ariaLabel }: PrivacySidebarProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    // Guard for environments without IntersectionObserver (e.g. older browsers).
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Only sections currently intersecting the viewport band.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="lg:w-72 lg:shrink-0 lg:border-e lg:border-border-light lg:pe-6">
      <nav aria-label={ariaLabel} className="lg:sticky lg:top-24">
        {/* Mobile: horizontal chip row / Desktop: vertical sticky list */}
        <ul className="flex gap-2 overflow-x-auto pb-3 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 lg:pe-2 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="shrink-0 lg:shrink">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center whitespace-nowrap rounded-md px-3 py-2 text-body-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 lg:whitespace-normal lg:border-s-2 ${
                    isActive
                      ? "bg-card-bg font-semibold text-brand-blue border-s-2 border-brand-blue"
                      : "border-s-2 border-transparent text-body-text hover:bg-card-bg/60 hover:text-brand-blue"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
