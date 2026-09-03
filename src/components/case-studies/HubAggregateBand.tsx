/**
 * HubAggregateBand — Z2 aggregate stat band (Part 19 §19.4.2, server).
 *
 * Four mono stat tiles. Per owner directive (2026-09-02) these headline totals
 * are FIXED company-wide marketing figures — Projects scoped 500+, Authorities
 * covered 17+, Combined quoted value 8.9 Million+, Areas served 9 — hardcoded
 * here rather than derived from the 16 register files. The register row-count
 * and these company-wide totals are intentionally different numbers.
 *
 * Each tile carries its own light token gradient — bg-gradient-to-br built
 * from from-, via- and to- token tints over white / card-bg / light-bg —
 * chosen to keep strong contrast against the dark tile text (brand-blue
 * values, body-text labels) — no raw hex, per Part 0.3.
 *
 * Rendered as a `<dl>` with `sr-only` `<dt>` labels so screen readers and AI
 * extractors parse the numbers cleanly. Values are plain static text (no
 * count-up) so the figures are always present in the SSR DOM (Part 11.2 /
 * Part 18.5 gate).
 *
 * Colours come from design-token Tailwind classes only — no raw hex.
 */

import {
  ClipboardList,
  Coins,
  Map,
  ShieldCheck,
} from "lucide-react";

export default function HubAggregateBand() {
  const tiles: {
    icon: typeof ClipboardList;
    label: string;
    value: string;
    bg: string;
  }[] = [
    {
      icon: ClipboardList,
      label: "Projects scoped",
      value: "500+",
      bg: "bg-gradient-to-br from-brand-blue/10 via-card-bg to-white",
    },
    {
      icon: ShieldCheck,
      label: "Authorities covered",
      value: "17+",
      bg: "bg-gradient-to-br from-success-green/10 via-card-bg to-white",
    },
    {
      icon: Coins,
      label: "Combined quoted value",
      value: "8.9 Million+",
      bg: "bg-gradient-to-br from-link-blue/10 via-white to-card-bg",
    },
    {
      icon: Map,
      label: "Areas served",
      value: "9",
      bg: "bg-gradient-to-br from-body-text/10 via-light-bg to-card-bg",
    },
  ];

  return (
    <section aria-label="Register totals" className="mt-8">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.label}
              className={`cs-stat-tile rounded-md border border-border-light p-5 shadow-card ${tile.bg}`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  size={20}
                  strokeWidth={1.75}
                  className="shrink-0 text-brand-blue"
                  aria-hidden="true"
                />
                <dt className="sr-only">{tile.label}</dt>
                <p className="text-caption font-medium uppercase tracking-wide text-body-text/70">
                  {tile.label}
                </p>
              </div>
              <dd className="mt-2 font-mono text-h3 font-medium text-brand-blue">
                {tile.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
