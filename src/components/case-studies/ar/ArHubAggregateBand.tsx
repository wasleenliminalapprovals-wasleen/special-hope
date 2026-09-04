/**
 * Arabic Case Study Hub — Aggregate Band (Z2)
 *
 * Arabic twin of `src/components/case-studies/HubAggregateBand.tsx` for the
 * `/ar/case-studies` hub (mega-plan Part 19 Step 6c). Server component, no
 * props. Shows the fixed company-wide totals (500+ / 17+ / 8.9 Million+ / 9)
 * with native Arabic captions — mirrors the EN register band so both locales
 * surface the same authority signals.
 *
 * NOTE: `uppercase`/`tracking-*` are intentionally omitted on Arabic captions —
 * letter-spacing would visually disconnect connected Arabic script.
 *
 * @see plans/case-studies-mega-plan.md Part 19 Z2
 */
import type { LucideIcon } from "lucide-react";
import { ClipboardList, ShieldCheck, Coins, Map } from "lucide-react";

interface BandTile {
  icon: LucideIcon;
  /** Arabic caption (kept concise — captions are short). */
  label: string;
  /** Fixed company-wide value — Latin digits kept for mono parity. */
  value: string;
  bg: string;
}

const TILES: BandTile[] = [
  {
    icon: ClipboardList,
    label: "مشاريع محدّدة النطاق",
    value: "500+",
    bg: "bg-gradient-to-br from-brand-blue/10 via-card-bg to-white",
  },
  {
    icon: ShieldCheck,
    label: "جهات حكومية مغطاة",
    value: "17+",
    bg: "bg-gradient-to-br from-success-green/10 via-white to-card-bg",
  },
  {
    icon: Coins,
    label: "قيمة العروض المجمّعة",
    value: "8.9 مليون+",
    bg: "bg-gradient-to-br from-link-blue/10 via-white to-card-bg",
  },
  {
    icon: Map,
    label: "المناطق المخدومة",
    value: "9",
    bg: "bg-gradient-to-br from-body-text/10 via-light-bg to-card-bg",
  },
];

export default function ArHubAggregateBand() {
  return (
    <section aria-label="إجماليات السجل" className="mt-8">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {TILES.map((tile) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.label}
              className={`cs-stat-tile rounded-md border border-border-light p-5 shadow-card ${tile.bg}`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className="h-5 w-5 text-brand-blue"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <dt className="sr-only">{tile.label}</dt>
                <p className="text-caption font-medium text-body-text/70">
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
