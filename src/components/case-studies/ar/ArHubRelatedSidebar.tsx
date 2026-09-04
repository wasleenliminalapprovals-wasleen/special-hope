import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  FileText,
  PencilRuler,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { guides as guidesAr } from "@/data/guides-ar";
import { services as servicesAr } from "@/data/services-ar";
import {
  AR_CASE_STUDY_CTA_BODY,
  AR_CASE_STUDY_CTA_LINK,
  AR_CASE_STUDY_CTA_TITLE,
  AR_CASE_STUDY_RELATED_APPROVALS_TITLE,
  AR_CASE_STUDY_RELATED_ASIDE_LABEL,
  AR_CASE_STUDY_RELATED_GET_HELP_LABEL,
  AR_CASE_STUDY_RELATED_GUIDES_TITLE,
  AR_CASE_STUDY_RELATED_SERVICES_TITLE,
} from "./ar-labels";

/**
 * ArHubRelatedSidebar — Arabic RTL-safe twin of
 * `src/components/case-studies/HubRelatedSidebar.tsx` (Z7 related-pages rail).
 *
 * Curated hub-level Arabic links, resolved against the ARABIC data modules
 * (`approvals-ar.ts`, `guides-ar.ts`, `services-ar.ts`) by their canonical
 * English top-level slug — so every anchor is a real, server-rendered
 * `/ar/approvals|guides|services/{slug}` route (never a 404) and the anchor
 * text is the native Arabic page name (no English leaks onto the `/ar/`
 * page). `ArrowLeft` is the RTL forward arrow for the title-hub links and the
 * CTA button. The amber CTA lives in `ArHubCtaTile` only — this sidebar CTA
 * is a non-amber `bg-card-bg` card that guards the amber-only-CTA rule.
 *
 * @see src/components/case-studies/HubRelatedSidebar.tsx (EN twin)
 * @see plans/case-studies-mega-plan.md §19.4.9
 */

export interface ArHubRailLink {
  href: string;
  /** Native Arabic anchor text (resolved from the Arabic data modules). */
  label: string;
  icon: LucideIcon;
  external?: boolean;
}

export interface ArHubRelatedSidebarProps {
  /** Box 1 — top approval pages (+ `/ar/approvals`). */
  approvalLinks?: ArHubRailLink[];
  /** Box 2 — relevant guides/Q&A (+ `/ar/guides`). */
  guideLinks?: ArHubRailLink[];
  /** Box 3 — service pages (+ `/ar/services`). */
  serviceLinks?: ArHubRailLink[];
}

/** Resolve approval slugs → Arabic rail links (only entries that exist). */
function resolveApprovalLinks(slugs: string[]): ArHubRailLink[] {
  return slugs
    .map((slug) => approvalsAr.find((a) => a.slug === slug))
    .filter((a): a is (typeof approvalsAr)[number] => Boolean(a))
    .map((a) => ({
      href: `/ar/approvals/${a.slug}`,
      label: a.ar.name,
      icon: Building2,
    }));
}

/** Resolve guide slugs → Arabic rail links (only entries that exist). */
function resolveGuideLinks(slugs: string[]): ArHubRailLink[] {
  return slugs
    .map((slug) => guidesAr.find((g) => g.slug === slug))
    .filter((g): g is (typeof guidesAr)[number] => Boolean(g))
    .map((g) => ({
      href: `/ar/guides/${g.slug}`,
      label: g.ar.title,
      icon: FileText,
    }));
}

/** Resolve service slugs → Arabic rail links (only entries that exist). */
function resolveServiceLinks(slugs: string[]): ArHubRailLink[] {
  return slugs
    .map((slug) => servicesAr.find((s) => s.slug === slug))
    .filter((s): s is (typeof servicesAr)[number] => Boolean(s))
    .map((s) => ({
      href: `/ar/services/${s.slug}`,
      label: s.ar.name,
      icon: PencilRuler,
    }));
}

/* Curated defaults mirroring the EN twin (Part 19 §19.4.9). */
const AR_DEFAULT_APPROVAL_LINKS: ArHubRailLink[] = resolveApprovalLinks([
  "dubai-civil-defense-approval",
  "dubai-municipality-building-permit",
  "dda-approval",
  "dewa-load-enhancement",
  "nakheel-developer-approval",
]);

const AR_DEFAULT_GUIDE_LINKS: ArHubRailLink[] = resolveGuideLinks([
  "how-long-does-dm-building-permit-take",
  "interior-fit-out-permit-process",
]);

const AR_DEFAULT_SERVICE_LINKS: ArHubRailLink[] = resolveServiceLinks([
  "2d-drawings",
  "approval-management",
]);

/** One rail box: title (+ optional "all" link) then rows. */
function RailBox({
  title,
  titleHref,
  links,
  ariaLabel,
}: {
  title: string;
  titleHref: string;
  links: ArHubRailLink[];
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
          <ArrowLeft
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

export default function ArHubRelatedSidebar({
  approvalLinks = AR_DEFAULT_APPROVAL_LINKS,
  guideLinks = AR_DEFAULT_GUIDE_LINKS,
  serviceLinks = AR_DEFAULT_SERVICE_LINKS,
}: ArHubRelatedSidebarProps) {
  return (
    <aside aria-label={AR_CASE_STUDY_RELATED_ASIDE_LABEL} className="space-y-5">
      <RailBox
        title={AR_CASE_STUDY_RELATED_APPROVALS_TITLE}
        titleHref="/ar/approvals"
        links={approvalLinks}
        ariaLabel="صفحات الموافقات الشائعة"
      />
      <RailBox
        title={AR_CASE_STUDY_RELATED_GUIDES_TITLE}
        titleHref="/ar/guides"
        links={guideLinks}
        ariaLabel="الأدلة والأسئلة الشائعة ذات الصلة"
      />
      <RailBox
        title={AR_CASE_STUDY_RELATED_SERVICES_TITLE}
        titleHref="/ar/services"
        links={serviceLinks}
        ariaLabel="خدمات وسلين"
      />

      {/* Box 4 — non-amber CTA card (guards the amber-only rule). */}
      <section
        aria-label={AR_CASE_STUDY_RELATED_GET_HELP_LABEL}
        className="rounded-md border border-border-light bg-card-bg p-5 shadow-card"
      >
        <h3 className="font-montserrat text-h4 font-bold text-heading-text">
          {AR_CASE_STUDY_CTA_TITLE}
        </h3>
        <p className="mt-2 text-body-sm text-body-text/80">
          {AR_CASE_STUDY_CTA_BODY}
        </p>
        <Link
          href="/ar/free-quote"
          className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-brand-blue px-4 py-2.5 text-body-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          {AR_CASE_STUDY_CTA_LINK}
          <ArrowLeft
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      </section>
    </aside>
  );
}
