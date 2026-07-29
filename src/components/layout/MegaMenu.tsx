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
import { AR } from "@/lib/constants";

/* ============================================================
   Types
   ============================================================ */

type MegaMenuType = "approvals" | "services";

interface MegaMenuProps {
  type: MegaMenuType;
  /** Locale for localized labels & hrefs */
  locale?: "en" | "ar";
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

function getApprovalCategories(locale: "en" | "ar"): ApprovalCategory[] {
  const prefix = locale === "ar" ? "/ar" : "";
  const t = AR.categories;

  const categories: Omit<ApprovalCategory, "icon">[] = [
    {
      title: locale === "ar" ? t["government-regulatory"] : "Government & Regulatory",
      items: [
        { label: "Dubai Municipality", href: `${prefix}/approvals/dubai-municipality-building-permit` },
        { label: "Dubai Civil Defense (DCD)", href: `${prefix}/approvals/dubai-civil-defense-approval` },
        { label: "DED Approval", href: `${prefix}/approvals/ded-approval` },
        { label: "RERA Approval", href: `${prefix}/approvals/rera-permit` },
        { label: "DEWA Approval", href: `${prefix}/approvals/dewa-approval` },
        { label: "RTA Approval", href: `${prefix}/approvals/rta-approval` },
        { label: "DDA Approval", href: `${prefix}/approvals/dda-approval` },
        { label: "Dubai Police", href: `${prefix}/approvals/dubai-police-approval` },
      ],
    },
    {
      title: locale === "ar" ? t["free-zone"] : "Free Zone Approvals",
      items: [
        { label: "JAFZA Approval", href: `${prefix}/approvals/jebel-ali-free-zone-approval` },
        { label: "Dubai Silicon Oasis (DSO)", href: `${prefix}/approvals/dubai-silicon-oasis-approval` },
        { label: "DMCC Approval", href: `${prefix}/approvals/dmcc-approval` },
        { label: "Dubai South", href: `${prefix}/approvals/dubai-south-approval` },
        { label: "DIFC Approval", href: `${prefix}/approvals/difc-approval` },
        { label: "DAFZA Approval", href: `${prefix}/approvals/dubai-airport-freezone-approval` },
        { label: "Dubai Production City", href: `${prefix}/approvals/impz-approval` },
      ],
    },
    {
      title: locale === "ar" ? t["developer-community"] : "Developer & Community",
      items: [
        { label: "Emaar Approval", href: `${prefix}/approvals/emaar-community-approval` },
        { label: "Nakheel Approval", href: `${prefix}/approvals/nakheel-developer-approval` },
        { label: "DAMAC Approval", href: `${prefix}/approvals/damac-properties-approval` },
        { label: "Dubai Holding", href: `${prefix}/approvals/dubai-holding-approval` },
        { label: "Community / OA", href: `${prefix}/approvals/community-approval` },
      ],
    },
    {
      title: locale === "ar" ? t["property-registration"] : "Property & Registration",
      items: [
        { label: "Ejari Registration", href: `${prefix}/approvals/ejari-registration` },
        { label: "Building Completion Cert.", href: `${prefix}/approvals/dubai-municipality-completion-certificate` },
        { label: "Al Sa'fat Green Building", href: `${prefix}/approvals/al-safat-green-building-approval` },
      ],
    },
    {
      title: locale === "ar" ? t["technical-utility"] : "Technical & Utility",
      items: [
        { label: "Sewerage & Drainage", href: `${prefix}/approvals/sewerage-drainage-approval` },
        { label: "Electrical Works", href: `${prefix}/approvals/electrical-works-approval` },
        { label: "Mezzanine Floor", href: `${prefix}/approvals/mezzanine-floor-approval` },
        { label: "Public Health", href: `${prefix}/approvals/public-health-approval` },
      ],
    },
    {
      title: locale === "ar" ? t["trade-food-hospitality"] : "Trade, Food & Hospitality",
      items: [
        { label: "DM Food Approval", href: `${prefix}/approvals/food-control-department-approval` },
        { label: "Restaurant Works", href: `${prefix}/approvals/restaurant-works-approval` },
      ],
    },
    {
      title: locale === "ar" ? t["fit-out-construction"] : "Fit-Out, Interior & Construction",
      items: [
        { label: "Interior Works", href: `${prefix}/approvals/interior-works-approval` },
        { label: "Fit-Out Works", href: `${prefix}/approvals/interior-fit-out-approval` },
        { label: "Commercial Approval", href: `${prefix}/approvals/commercial-approval` },
        { label: "Residential Approval", href: `${prefix}/approvals/residential-approval` },
        { label: "Project Approval", href: `${prefix}/approvals/project-approval` },
      ],
    },
    {
      title: locale === "ar" ? t["drawing-documentation"] : "Drawing & Documentation",
      items: [
        { label: "2D & 3D Drawings", href: `${prefix}/approvals/2d-drawing-submission` },
      ],
    },
  ];

  // Map icons back
  const icons = [Landmark, Building2, Users, FileCheck, Droplets, Utensils, Sofa, PencilRuler];
  return categories.map((cat, i) => ({ ...cat, icon: icons[i] }));
}

/* ============================================================
   Services Mega Menu Data
   ============================================================ */

interface ServiceItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

function getServices(locale: "en" | "ar"): ServiceItem[] {
  const prefix = locale === "ar" ? "/ar" : "";
  return [
    { label: "2D Drawings", href: `${prefix}/services/2d-drawings` },
    { label: "3D Designs", href: `${prefix}/services/3d-design-visualization` },
    { label: "CAD Drawings", href: `${prefix}/services/cad-documentation` },
    { label: "Project Management", href: `${prefix}/services/project-management` },
    { label: "Fit-Outs", href: `${prefix}/services/fit-outs` },
    { label: "Interior (Wasleen)", href: "https://wasleen.com", isExternal: true },
    { label: "Pergolas", href: "https://www.pergolas.wasleen.com", isExternal: true },
  ];
}

/* ============================================================
   Component
   ============================================================ */

export default function MegaMenu({
  type,
  locale = "en",
  isOpen = false,
  onToggle,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
  forceMobile = false,
}: MegaMenuProps) {
  const isApprovals = type === "approvals";
  const categories = getApprovalCategories(locale);
  const services = getServices(locale);

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
            absolute start-1/2 top-full -translate-x-1/2 z-50 mega-menu-dropdown
            transition-all duration-200 ease-out
            ${isActive ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"}
          `}
        >
          <div className="mt-2">
            {/* Arrow */}
            <div className="mx-auto h-3 w-3 rotate-45 bg-white border-s border-t border-border-light" />

            {isApprovals ? (
              <DesktopApprovalsDropdown categories={categories} locale={locale} />
            ) : (
              <DesktopServicesDropdown services={services} />
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
        aria-label={locale === "ar"
          ? (isApprovals ? "تبديل قائمة الموافقات" : "تبديل قائمة الخدمات")
          : (isApprovals ? "Toggle approvals menu" : "Toggle services menu")
        }
      >
        <span>{isApprovals
          ? (locale === "ar" ? AR.nav.approvals : "Approvals")
          : (locale === "ar" ? AR.nav.services : "Services")
        }</span>
        <ChevronDown
          size={18}
          className={`text-body-text transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="bg-light-bg px-4 pb-3">
          {isApprovals ? (
            <MobileApprovalsAccordion categories={categories} locale={locale} />
          ) : (
            <MobileServicesList services={services} />
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Desktop: Approvals (3-column grid)
   ============================================================ */

function DesktopApprovalsDropdown({ categories, locale }: { categories: ApprovalCategory[]; locale: "en" | "ar" }) {
  const prefix = locale === "ar" ? "/ar" : "";

  // Split categories into 3 columns for desktop
  const col1 = categories.slice(0, 3);
  const col2 = categories.slice(3, 6);
  const col3 = categories.slice(6, 8);

  const Column = ({ items }: { items: ApprovalCategory[] }) => (
    <div className="space-y-5">
      {items.map((cat) => (
        <div key={cat.title}>
          <Link
            href={`${prefix}/approvals`}
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
        <Column items={col1} />
        <Column items={col2} />
        <Column items={col3} />
      </div>

      {/* View All link */}
      <div className="mt-6 pt-4 border-t border-border-light text-center">
        <Link
          href={`${prefix}/approvals`}
          className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-blue hover:text-link-blue transition-colors"
        >
          {locale === "ar" ? AR.cta.viewAll : "View All Approvals"}
          <span aria-hidden="true">&larr;</span>
        </Link>
      </div>
    </div>
  );
}

/* ============================================================
   Desktop: Services (simple list)
   ============================================================ */

function DesktopServicesDropdown({ services }: { services: ServiceItem[] }) {
  return (
    <div className="bg-white rounded-lg shadow-dropdown border border-border-light p-5 w-64">
      <ul className="space-y-1">
        {services.map((service) => (
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

function MobileApprovalsAccordion({ categories, locale }: { categories: ApprovalCategory[]; locale: "en" | "ar" }) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const prefix = locale === "ar" ? "/ar" : "";

  const toggleCategory = useCallback((title: string) => {
    setOpenCategory((prev) => (prev === title ? null : title));
  }, []);

  return (
    <div className="space-y-1">
      {categories.map((cat) => {
        const isCatOpen = openCategory === cat.title;
        const Icon = cat.icon;

        return (
          <div key={cat.title} className="border-b border-border-light last:border-b-0">
            <button
              type="button"
              onClick={() => toggleCategory(cat.title)}
              className="flex w-full items-center justify-between gap-2 py-2.5 text-body-sm font-medium text-body-text hover:text-brand-blue transition-colors min-h-[44px]"
              aria-expanded={isCatOpen}
              aria-label={locale === "ar" ? `تبديل ${cat.title}` : `Toggle ${cat.title} approvals`}
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
              <ul className="pb-2 ps-7 space-y-1">
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
        href={`${prefix}/approvals`}
        className="block py-2.5 text-body-sm font-semibold text-brand-blue hover:text-link-blue transition-colors min-h-[44px] flex items-center"
      >
        {locale === "ar" ? `${AR.cta.viewAll} ←` : `View All Approvals →`}
      </Link>
    </div>
  );
}

/* ============================================================
   Mobile: Services (simple list)
   ============================================================ */

function MobileServicesList({ services }: { services: ServiceItem[] }) {
  return (
    <ul className="space-y-0.5">
      {services.map((service) => (
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
