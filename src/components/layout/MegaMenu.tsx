"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ExternalLink,
  Building2,
  Landmark,
  Users,
  FileCheck,
  Droplets,
  Utensils,
  Sofa,
  PencilRuler,
} from "lucide-react";

/* ============================================================
   Types
   ============================================================ */

type MegaMenuType = "approvals" | "services";

interface MegaMenuProps {
  type: MegaMenuType;
  /** Only used by the mobile-nav to wire open/closed state */
  isOpen?: boolean;
  /** Only used on mobile: toggle function passed by MobileNav */
  onToggle?: () => void;
  /** Desktop: whether this mega menu is the currently hovered/active one */
  isActive?: boolean;
  /** Desktop: called on mouse enter/leave */
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /** Force mobile variant (used inside MobileNav) */
  forceMobile?: boolean;
}

/* ============================================================
   Approval Category Definitions
   ============================================================ */

interface ApprovalCategory {
  title: string;
  slug?: string;
  icon: React.ElementType;
  items: { label: string; href: string }[];
}

const APPROVAL_CATEGORIES: ApprovalCategory[] = [
  {
    title: "Government & Regulatory",
    icon: Landmark,
    items: [
      { label: "Dubai Municipality", href: "/approvals/dubai-municipality-building-permit" },
      { label: "Dubai Civil Defense (DCD)", href: "/approvals/dubai-civil-defense-approval" },
      { label: "DED Approval", href: "/approvals/ded-approval" },
      { label: "RERA Approval", href: "/approvals/rera-permit" },
      { label: "DEWA Approval", href: "/approvals/dewa-approval" },
      { label: "RTA Approval", href: "/approvals/rta-approval" },
      { label: "DDA Approval", href: "/approvals/dda-approval" },
      { label: "Dubai Police", href: "/approvals/dubai-police-approval" },
    ],
  },
  {
    title: "Free Zone Approvals",
    icon: Building2,
    items: [
      { label: "JAFZA Approval", href: "/approvals/jebel-ali-free-zone-approval" },
      { label: "Dubai Silicon Oasis (DSO)", href: "/approvals/dubai-silicon-oasis-approval" },
      { label: "DMCC Approval", href: "/approvals/dmcc-approval" },
      { label: "Dubai South", href: "/approvals/dubai-south-approval" },
      { label: "DIFC Approval", href: "/approvals/difc-approval" },
      { label: "DAFZA Approval", href: "/approvals/dubai-airport-freezone-approval" },
      { label: "Dubai Production City", href: "/approvals/impz-approval" },
    ],
  },
  {
    title: "Developer & Community",
    icon: Users,
    items: [
      { label: "Emaar Approval", href: "/approvals/emaar-community-approval" },
      { label: "Nakheel Approval", href: "/approvals/nakheel-developer-approval" },
      { label: "DAMAC Approval", href: "/approvals/damac-properties-approval" },
      { label: "Dubai Holding", href: "/approvals/dubai-holding-approval" },
      { label: "Community / OA", href: "/approvals/community-approval" },
    ],
  },
  {
    title: "Property & Registration",
    icon: FileCheck,
    items: [
      { label: "Ejari Registration", href: "/approvals/ejari-registration" },
      { label: "Building Completion Cert.", href: "/approvals/dubai-municipality-completion-certificate" },
      { label: "Al Sa'fat Green Building", href: "/approvals/al-safat-green-building-approval" },
    ],
  },
  {
    title: "Technical & Utility",
    icon: Droplets,
    items: [
      { label: "Sewerage & Drainage", href: "/approvals/sewerage-drainage-approval" },
      { label: "Electrical Works", href: "/approvals/electrical-works-approval" },
      { label: "Mezzanine Floor", href: "/approvals/mezzanine-floor-approval" },
      { label: "Public Health", href: "/approvals/public-health-approval" },
    ],
  },
  {
    title: "Trade, Food & Hospitality",
    icon: Utensils,
    items: [
      { label: "DM Food Approval", href: "/approvals/food-control-department-approval" },
      { label: "Restaurant Works", href: "/approvals/restaurant-works-approval" },
    ],
  },
  {
    title: "Fit-Out, Interior & Construction",
    icon: Sofa,
    items: [
      { label: "Interior Works", href: "/approvals/interior-works-approval" },
      { label: "Fit-Out Works", href: "/approvals/interior-fit-out-approval" },
      { label: "Commercial Approval", href: "/approvals/commercial-approval" },
      { label: "Residential Approval", href: "/approvals/residential-approval" },
      { label: "Project Approval", href: "/approvals/project-approval" },
    ],
  },
  {
    title: "Drawing & Documentation",
    icon: PencilRuler,
    items: [
      { label: "2D & 3D Drawings", href: "/approvals/2d-drawing-submission" },
    ],
  },
];

/* ============================================================
   Services Mega Menu Data
   ============================================================ */

interface ServiceItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const SERVICES: ServiceItem[] = [
  { label: "2D Drawings", href: "/services/2d-drawings" },
  { label: "3D Designs", href: "/services/3d-design-visualization" },
  { label: "CAD Drawings", href: "/services/cad-documentation" },
  { label: "Project Management", href: "/services/project-management" },
  { label: "Fit-Outs", href: "/services/fit-outs" },
  { label: "Interior (Wasleen)", href: "https://wasleen.com", isExternal: true },
  { label: "Pergolas", href: "https://www.pergolas.wasleen.com", isExternal: true },
];

/* ============================================================
   Component
   ============================================================ */

export default function MegaMenu({
  type,
  isOpen = false,
  onToggle,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
  forceMobile = false,
}: MegaMenuProps) {
  const isApprovals = type === "approvals";

  /* ── Desktop render ── */
  if (!forceMobile) {
    return (
      <div
        className="relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Desktop dropdown */}
        <div
          className={`
            absolute left-1/2 top-full -translate-x-1/2 z-50
            transition-all duration-200 ease-out
            ${isActive ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"}
          `}
        >
          <div className="mt-2">
            {/* Arrow */}
            <div className="mx-auto h-3 w-3 rotate-45 bg-white border-l border-t border-border-light" />

            {isApprovals ? (
              <DesktopApprovalsDropdown />
            ) : (
              <DesktopServicesDropdown />
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Mobile / accordion render ── */
  return (
    <div className="border-b border-border-light">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-body-sm font-medium text-body-text hover:text-brand-blue transition-colors"
        aria-expanded={isOpen}
        aria-label={isApprovals ? "Toggle approvals menu" : "Toggle services menu"}
      >
        <span>{isApprovals ? "Approvals" : "Services"}</span>
        <ChevronDown
          size={18}
          className={`text-body-text transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="bg-light-bg px-4 pb-3">
          {isApprovals ? (
            <MobileApprovalsAccordion />
          ) : (
            <MobileServicesList />
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Desktop: Approvals (3-column grid)
   ============================================================ */

function DesktopApprovalsDropdown() {
  // Split categories into 3 columns for desktop
  const col1 = APPROVAL_CATEGORIES.slice(0, 3);
  const col2 = APPROVAL_CATEGORIES.slice(3, 6);
  const col3 = APPROVAL_CATEGORIES.slice(6, 8);

  const Column = ({ categories }: { categories: ApprovalCategory[] }) => (
    <div className="space-y-5">
      {categories.map((cat) => (
        <div key={cat.title}>
          <Link
            href="/approvals"
            className="flex items-center gap-2 text-body-sm font-bold text-heading-text hover:text-link-blue transition-colors mb-2"
          >
            <cat.icon size={16} strokeWidth={1.75} />
            <span>{cat.title}</span>
          </Link>
          <ul className="space-y-1">
            {cat.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-body-sm text-body-text hover:text-link-blue transition-colors py-0.5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-dropdown border border-border-light p-6 w-[780px] max-w-[90vw]">
      <div className="grid grid-cols-3 gap-8">
        <Column categories={col1} />
        <Column categories={col2} />
        <Column categories={col3} />
      </div>

      {/* View All link */}
      <div className="mt-6 pt-4 border-t border-border-light text-center">
        <Link
          href="/approvals"
          className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-blue hover:text-link-blue transition-colors"
        >
          View All Approvals
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

/* ============================================================
   Desktop: Services (simple list)
   ============================================================ */

function DesktopServicesDropdown() {
  return (
    <div className="bg-white rounded-lg shadow-dropdown border border-border-light p-5 w-64">
      <ul className="space-y-1">
        {SERVICES.map((service) => (
          <li key={service.href}>
            {service.isExternal ? (
              <a
                href={service.href}
                rel="noopener"
                target="_self"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-body-sm text-body-text hover:bg-card-bg hover:text-brand-blue transition-colors"
              >
                <span>{service.label}</span>
                <ExternalLink size={14} strokeWidth={1.75} className="text-body-text/50" />
              </a>
            ) : (
              <Link
                href={service.href}
                className="block rounded-md px-3 py-2 text-body-sm text-body-text hover:bg-card-bg hover:text-brand-blue transition-colors"
              >
                {service.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   Mobile: Approvals (accordion within accordion)
   ============================================================ */

function MobileApprovalsAccordion() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = useCallback((title: string) => {
    setOpenCategory((prev) => (prev === title ? null : title));
  }, []);

  return (
    <div className="space-y-1">
      {APPROVAL_CATEGORIES.map((cat) => {
        const isCatOpen = openCategory === cat.title;
        const Icon = cat.icon;

        return (
          <div key={cat.title} className="border-b border-border-light last:border-b-0">
            <button
              type="button"
              onClick={() => toggleCategory(cat.title)}
              className="flex w-full items-center justify-between gap-2 py-2.5 text-body-sm font-medium text-body-text hover:text-brand-blue transition-colors min-h-[44px]"
              aria-expanded={isCatOpen}
              aria-label={`Toggle ${cat.title} approvals`}
            >
              <span className="flex items-center gap-2">
                <Icon size={16} strokeWidth={1.75} className="text-brand-blue shrink-0" />
                <span>{cat.title}</span>
              </span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-body-text transition-transform duration-200 ${isCatOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCatOpen && (
              <ul className="pb-2 pl-7 space-y-1">
                {cat.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-1.5 text-body-sm text-body-text hover:text-link-blue transition-colors min-h-[36px] flex items-center"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {/* View All link */}
      <Link
        href="/approvals"
        className="block py-2.5 text-body-sm font-semibold text-brand-blue hover:text-link-blue transition-colors min-h-[44px] flex items-center"
      >
        View All Approvals &rarr;
      </Link>
    </div>
  );
}

/* ============================================================
   Mobile: Services (simple list)
   ============================================================ */

function MobileServicesList() {
  return (
    <ul className="space-y-0.5">
      {SERVICES.map((service) => (
        <li key={service.href}>
          {service.isExternal ? (
            <a
              href={service.href}
              rel="noopener"
              target="_self"
              className="flex items-center gap-2 py-2.5 text-body-sm text-body-text hover:text-link-blue transition-colors min-h-[44px]"
            >
              <span>{service.label}</span>
              <ExternalLink size={14} strokeWidth={1.75} className="text-body-text/50" />
            </a>
          ) : (
            <Link
              href={service.href}
              className="block py-2.5 text-body-sm text-body-text hover:text-link-blue transition-colors min-h-[44px] flex items-center"
            >
              {service.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
