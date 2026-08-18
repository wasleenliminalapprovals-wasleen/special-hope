"use client";

/**
 * ParcelGrid — Sheet 03 "The Wasleen Group" site-plan section.
 *
 * Design (plans/about-us-redesign-mega-plan.md Sheet 03, lines 82-101):
 * - Revision-log table (real `<table>`, Roboto Mono) — rendered by
 *   RevisionLogTable.tsx inside a `.about-revlog-table-box` framing.
 * - Parcel grid: four division cards — Interior (image → wasleen.com),
 *   Approvals (icon-based, amber border, "You are here", no photo),
 *   Pergolas (image → pergolas.wasleen.com), Digital (icon-based, no
 *   number claimed). Each card carries drafting crop marks and a
 *   border-draw reveal on hover (SVG rect, dashoffset → 0).
 * - Closing pull-quote H3 (blockquote wrapper) — the group culture line.
 *
 * Interactivity is additive-only: each card's link is a real, server-
 * rendered `<a href>` (Q10 / no-JS safe) with target=_blank + rel=noopener
 * for external destinations; `trackEvent` fires `outbound_click` with the
 * `division` id (interior | pergolas | digital) exactly once per click.
 * The Approvals card has no href — it is the "you are here" cell.
 *
 * Client component ("use client") only because of `trackEvent`; the DOM
 * structure is otherwise static and RTL-safe (logical utilities only).
 *
 * Locale-agnostic: `group`, `sheet` and `youAreHereLabel` arrive as props
 * from about.ts / about-ar.ts, so the same file drives both locales.
 */

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Stamp, Code2, ExternalLink } from "lucide-react";
import type { AboutContent, SheetMeta, ParcelCard } from "@/data/about";
import { trackEvent } from "@/lib/analytics";
import RevisionLogTable from "@/components/about/RevisionLogTable";

type GroupContent = AboutContent["group"];

/** Icon-backed parcels (no photo) → lucide icon resolved here, not in data. */
const PARCEL_ICONS: Record<string, LucideIcon> = {
  approvals: Stamp,
  digital: Code2,
};

interface ParcelGridProps {
  group: GroupContent;
  /** Sheet meta for sheet-03 (id / number / label). */
  sheet: SheetMeta;
  /** Localized active marker label — "YOU ARE HERE" / "أنت هنا". */
  youAreHereLabel: string;
}

/** Single parcel card — image or icon header, body, outbound link / here-marker. */
function ParcelCard({
  parcel,
  youAreHereLabel,
}: {
  parcel: ParcelCard;
  youAreHereLabel: string;
}) {
  const Icon = PARCEL_ICONS[parcel.id] ?? Stamp;
  const active = Boolean(parcel.youAreHere);
  const isExternal = Boolean(parcel.href && parcel.external);
  // Visible link text: mono caption for image parcels, else derived host+path
  // (digital has no caption — "wasleen.com/wasleen-digital").
  const linkLabel = parcel.caption
    ? parcel.caption
    : parcel.href
      ? parcel.href.replace(/^https?:\/\//, "")
      : "";

  return (
    <article
      aria-current={active ? "true" : undefined}
      className={`about-parcel relative flex flex-col overflow-hidden ${
        active ? "about-parcel--active" : ""
      }`.trim()}
    >
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--tl absolute top-0 start-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--tr absolute top-0 end-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--bl absolute bottom-0 start-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--br absolute bottom-0 end-0"
      />

      {/* Border-draw reveal (hidden at rest, drawn on hover / always on active). */}
      <svg
        aria-hidden="true"
        className="about-parcel-rect absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          fill="none"
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
        />
      </svg>

      {parcel.image ? (
        <div className="about-parcel-media">
          <Image
            src={parcel.image.src}
            alt={parcel.image.alt}
            width={parcel.image.width}
            height={parcel.image.height}
            loading="lazy"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-[16/10] h-auto w-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`about-parcel-icon ${
            active ? "about-parcel-icon--active" : ""
          }`.trim()}
        >
          <Icon aria-hidden="true" size={40} strokeWidth={1.5} />
        </div>
      )}

      <div className="about-parcel-body flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-montserrat text-h4 font-bold leading-tight text-(--about-heading)">
          {parcel.title}
        </h3>
        <p className="text-body-sm leading-relaxed text-(--about-ink-soft)">
          {parcel.description}
        </p>

        <div className="mt-auto pt-4">
          {active ? (
            <span className="about-parcel-here">
              <span aria-hidden="true" className="about-here-dot" />
              <span>{youAreHereLabel}</span>
            </span>
          ) : parcel.href ? (
            <a
              href={parcel.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener" : undefined}
              onClick={() =>
                trackEvent({
                  action: "outbound_click",
                  category: "navigation",
                  label: parcel.title,
                  division: parcel.id,
                })
              }
              className="about-parcel-link"
            >
              <span className="about-parcel-link-text">{linkLabel}</span>
              {isExternal && (
                <ExternalLink
                  aria-hidden="true"
                  size={14}
                  strokeWidth={1.75}
                  className="about-parcel-link-icon"
                />
              )}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ParcelGrid({
  group,
  sheet,
  youAreHereLabel,
}: ParcelGridProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-group-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>

        <h2
          id="about-group-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {group.heading}
        </h2>

        <p className="mt-4 max-w-2xl text-body leading-relaxed text-(--about-ink-soft)">
          {group.intro}
        </p>

        <div className="about-revlog-table-box mt-10">
          <RevisionLogTable
            caption={group.tableCaption}
            headers={group.tableHeaders}
            rows={group.tableRows}
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {group.parcels.map((parcel) => (
            <ParcelCard
              key={parcel.id}
              parcel={parcel}
              youAreHereLabel={youAreHereLabel}
            />
          ))}
        </div>

        <blockquote className="about-parcel-quote mt-10 text-center">
          <h3 className="font-montserrat text-h4 font-bold leading-snug text-(--about-heading)">
            “{group.quote}”
          </h3>
        </blockquote>
      </div>
    </section>
  );
}
