import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  FileText,
  PencilRuler,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * HubRelatedSidebar — Z7 related-pages rail (server).
 *
 * Part 19 §19.4.9. "Side boxes for related pages" that sit in the right-hand
 * column on `lg` (sticky) and stack after the grid on mobile. Curated
 * hub-level links (approved in §19.4.9) — every anchor is a real,
 * server-rendered route that exists today. Namespaced `.cs-rail-box`.
 *
 * @see plans/case-studies-mega-plan.md §19.4.9
 */

export interface HubRailLink {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
}

export interface HubRelatedSidebarProps {
  /** Box 1 — top approval pages (+ `/approvals`). */
  approvalLinks?: HubRailLink[];
  /** Box 2 — relevant guides/Q&A (+ `/guides`). */
  guideLinks?: HubRailLink[];
  /** Box 3 — service pages (+ `/services`). */
  serviceLinks?: HubRailLink[];
}

const DEFAULT_APPROVAL_LINKS: HubRailLink[] = [
  { href: "/approvals/dubai-civil-defense-approval", label: "DCD Approval requirements", icon: Building2 },
  { href: "/approvals/dubai-municipality-building-permit", label: "DM Building Permit process", icon: Building2 },
  { href: "/approvals/dda-approval", label: "DDA Approval process", icon: Building2 },
  { href: "/approvals/dewa-load-enhancement", label: "DEWA Load Enhancement", icon: Building2 },
  { href: "/approvals/nakheel-developer-approval", label: "Nakheel Developer Approval", icon: Building2 },
];

const DEFAULT_GUIDE_LINKS: HubRailLink[] = [
  { href: "/guides/how-long-does-dm-building-permit-take", label: "How long does a DM permit take?", icon: FileText },
  { href: "/guides/interior-fit-out-permit-process", label: "Interior fit-out permit process", icon: FileText },
];

const DEFAULT_SERVICE_LINKS: HubRailLink[] = [
  { href: "/services/2d-drawings", label: "2D Drawings service", icon: PencilRuler },
  { href: "/services/approval-management", label: "Approval Management service", icon: PencilRuler },
];

/** One rail box: title (+ optional "all" link) then rows. */
function RailBox({
  title,
  titleHref,
  links,
  ariaLabel,
}: {
  title: string;
  titleHref: string;
  links: HubRailLink[];
  ariaLabel: string;
}) {
  return (
    <section
      aria-label={ariaLabel}
      className="cs-rail-box rounded-md border border-border-light bg-white p-5 shadow-card"
    >
      <h3 className="font-montserrat text-h4 font-bold text-heading-text">
        <Link
          href={titleHref}
          className="cs-underline-grow inline-flex items-center gap-1"
        >
          {title}
          <ArrowUpRight
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      </h3>
      <ul className="mt-3 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-start gap-2 text-body-sm text-body-text hover:text-link-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <link.icon
                size={16}
                strokeWidth={1.75}
                className="mt-0.5 shrink-0 text-brand-blue"
                aria-hidden="true"
              />
              <span className="cs-underline-grow leading-snug">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function HubRelatedSidebar({
  approvalLinks = DEFAULT_APPROVAL_LINKS,
  guideLinks = DEFAULT_GUIDE_LINKS,
  serviceLinks = DEFAULT_SERVICE_LINKS,
}: HubRelatedSidebarProps) {
  return (
    <aside aria-label="Related resources" className="space-y-5">
      <RailBox
        title="Popular approvals"
        titleHref="/approvals"
        links={approvalLinks}
        ariaLabel="Popular approval pages"
      />
      <RailBox
        title="Guides & Q&A"
        titleHref="/guides"
        links={guideLinks}
        ariaLabel="Related guides and Q&A"
      />
      <RailBox
        title="Services"
        titleHref="/services"
        links={serviceLinks}
        ariaLabel="Wasleen services"
      />

      {/* Box 4 — non-amber CTA card (guards the amber-only rule). */}
      <section
        aria-label="Get approval help"
        className="rounded-md border border-border-light bg-card-bg p-5 shadow-card"
      >
        <h3 className="font-montserrat text-h4 font-bold text-heading-text">
          Need this approval done?
        </h3>
        <p className="mt-2 text-body-sm text-body-text/80">
          Get a file-stamped quote and a named approvals manager for your
          Dubai project.
        </p>
        <Link
          href="/free-quote"
          className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-brand-blue px-4 py-2.5 text-body-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          Get a free quote
          <ArrowUpRight
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      </section>
    </aside>
  );
}
