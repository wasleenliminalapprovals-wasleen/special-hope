"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import WasleenIcon from "@/components/logo/WasleenIcon";
import SocialIconsRow from "@/components/sections/SocialIconsRow";
import { NAP, SITE } from "@/lib/constants";

/* ============================================================
   Footer — 5-column on desktop, single-column accordion on mobile
   ============================================================ */

/* ── Service links (mirrors header Services mega menu) ── */
const SERVICES = [
  { label: "2D Drawings", href: "/services/2d-drawings" },
  { label: "3D Design & Visualization", href: "/services/3d-design-visualization" },
  { label: "CAD Documentation", href: "/services/cad-documentation" },
  { label: "Approval Management", href: "/services/approval-management" },
  { label: "Document Clearing", href: "/services/document-clearing" },
  { label: "Interior (Wasleen)", href: "https://wasleen.com", isExternal: true },
  { label: "Pergolas", href: "https://www.pergolas.wasleen.com", isExternal: true },
];

/* ── Approval categories for footer columns ── */
const GOV_APPROVALS = [
  { label: "Dubai Municipality", href: "/approvals/dubai-municipality-building-permit" },
  { label: "Dubai Civil Defense (DCD)", href: "/approvals/dubai-civil-defense-approval" },
  { label: "DEWA Approval", href: "/approvals/dewa-approval" },
  { label: "DDA Approval", href: "/approvals/dda-approval" },
  { label: "RTA Approval", href: "/approvals/rta-approval" },
  { label: "Dubai Police", href: "/approvals/dubai-police-approval" },
];

const FREE_ZONE_APPROVALS = [
  { label: "JAFZA Approval", href: "/approvals/jebel-ali-free-zone-approval" },
  { label: "DMCC Approval", href: "/approvals/dmcc-approval" },
  { label: "Dubai South", href: "/approvals/dubai-south-approval" },
  { label: "DIFC Approval", href: "/approvals/difc-approval" },
  { label: "DSO Approval", href: "/approvals/dubai-silicon-oasis-approval" },
  { label: "DAFZA Approval", href: "/approvals/dubai-airport-freezone-approval" },
];

const FITOUT_APPROVALS = [
  { label: "Interior Works", href: "/approvals/interior-works-approval" },
  { label: "Fit-Out Works", href: "/approvals/interior-fit-out-approval" },
  { label: "Ejari Registration", href: "/approvals/ejari-registration" },
  { label: "Commercial Approval", href: "/approvals/commercial-approval" },
  { label: "Building Completion Cert.", href: "/approvals/dubai-municipality-completion-certificate" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Desktop: 5-column grid ── */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Col 1: Company info */}
          <FooterCompanyColumn />

          {/* Col 2: Services */}
          <FooterLinksColumn title="Services" links={SERVICES} />

          {/* Col 3: Government & Regulatory */}
          <FooterLinksColumn
            title="Government Approvals"
            links={GOV_APPROVALS}
            viewAllHref="/approvals"
          />

          {/* Col 4: Free Zone + Fit-Out */}
          <div className="space-y-8">
            <FooterLinksColumn
              title="Free Zone Approvals"
              links={FREE_ZONE_APPROVALS}
              viewAllHref="/approvals"
            />
            <FooterLinksColumn
              title="Fit-Out & Interior"
              links={FITOUT_APPROVALS}
              viewAllHref="/approvals"
            />
          </div>

          {/* Col 5: Company & Contact */}
          <FooterContactColumn />
        </div>

        {/* ── Mobile: accordion sections ── */}
        <div className="lg:hidden space-y-0">
          {/* Company info (always visible) */}
          <div className="pb-6 border-b border-white/20 mb-0">
            <FooterCompanyColumn />
          </div>

          <MobileAccordionSection title="Services" links={SERVICES} />
          <MobileAccordionSection title="Government Approvals" links={GOV_APPROVALS} viewAllHref="/approvals" />
          <MobileAccordionSection title="Free Zone Approvals" links={FREE_ZONE_APPROVALS} viewAllHref="/approvals" />
          <MobileAccordionSection title="Fit-Out & Interior" links={FITOUT_APPROVALS} viewAllHref="/approvals" />
          <MobileAccordionSection title="Company & Contact" isContactSection />
        </div>

        {/* ── Maps section ── */}
        <div className="mt-10">
          <p className="text-caption font-medium text-white/70 uppercase tracking-wider mb-3">
            Our Locations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Map 1 — Main Office */}
            <div className="rounded-lg overflow-hidden border border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.447891748681!2d55.299419775383804!3d25.255514377673393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f436925673a6f%3A0xdd525a8229093985!2sWasleen%20Technical%20Services%20%E2%80%93%20Pergola%20%26%20Car%20Parking%20Solutions%20in%20Dubai!5e0!3m2!1sen!2sae!4v1785229567827!5m2!1sen!2sae"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Wasleen Technical Services — Main Office"
                aria-label="Google Map showing Wasleen Technical Services — Main Office"
                className="md:h-[180px] h-[160px]"
              />
            </div>

            {/* Map 2 — Showroom */}
            <div className="rounded-lg overflow-hidden border border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1380597540597!2d55.38031657538407!3d25.265940777666803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1176f7006181aff%3A0x734697b9bc64aefe!2sWasleen%20Pergolas%20%26%20CinemaxSky!5e0!3m2!1sen!2sae!4v1785229637998!5m2!1sen!2sae"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Wasleen Pergolas & CinemaxSky — Showroom"
                aria-label="Google Map showing Wasleen Pergolas & CinemaxSky Showroom"
                className="md:h-[180px] h-[160px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-caption text-white/70">
          <span>Designed by Wasleen Digital Labs</span>
          <span>&copy; {currentYear} {NAP.companyName}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Sub-Components
   ============================================================ */

function FooterCompanyColumn() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <WasleenIcon size={40} />
        <div>
          <p className="text-body-sm font-bold text-white leading-tight">
            WASLEEN <span className="text-red-300">LIMINAL</span>
          </p>
          <p className="text-caption text-white/70 leading-tight -tracking-tight">
            APPROVAL CONSULTANTS
          </p>
        </div>
      </div>
      <p className="text-body-sm text-white/80 leading-relaxed">
        Dubai's trusted approvals consultancy. We fast-track project approvals
        across Dubai Municipality, DDA, DEWA, DCD, and all free zone authorities
        — saving you time, cost, and compliance risk.
      </p>
      <SocialIconsRow variant="footer" />
    </div>
  );
}

interface FooterLinksColumnProps {
  title: string;
  links: { label: string; href: string; isExternal?: boolean }[];
  viewAllHref?: string;
}

function FooterLinksColumn({ title, links, viewAllHref }: FooterLinksColumnProps) {
  return (
    <div>
      <h3 className="text-body-sm font-bold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            {link.isExternal ? (
              <a
                href={link.href}
                rel="noopener"
                target="_self"
                className="flex items-center gap-1.5 text-body-sm text-white/70 hover:text-white transition-colors"
              >
                <span>{link.label}</span>
                <ExternalLink size={12} strokeWidth={1.75} className="shrink-0" />
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-body-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
        {viewAllHref && (
          <li>
            <Link
              href={viewAllHref}
              className="text-body-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
              View All &rarr;
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

function FooterContactColumn() {
  return (
    <div>
      <h3 className="text-body-sm font-bold text-white mb-3">Company & Contact</h3>
      <ul className="space-y-3">
        <li>
          <Link href="/about-us" className="text-body-sm text-white/70 hover:text-white transition-colors">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/contact-us" className="text-body-sm text-white/70 hover:text-white transition-colors">
            Contact Us
          </Link>
        </li>
        <li>
          <Link href="/guides" className="text-body-sm text-white/70 hover:text-white transition-colors">
            Guides & Q&A
          </Link>
        </li>
        <li>
          <a
            href={`tel:${NAP.phone}`}
            className="flex items-center gap-2 text-body-sm text-white/70 hover:text-white transition-colors"
            aria-label={`Call us at ${NAP.phone}`}
          >
            <Phone size={14} strokeWidth={1.75} className="shrink-0" />
            <span>{NAP.phone}</span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${NAP.email}`}
            className="flex items-center gap-2 text-body-sm text-white/70 hover:text-white transition-colors"
            aria-label={`Email us at ${NAP.email}`}
          >
            <Mail size={14} strokeWidth={1.75} className="shrink-0" />
            <span>{NAP.email}</span>
          </a>
        </li>
        <li>
          <div className="flex items-start gap-2 text-body-sm text-white/70">
            <MapPin size={14} strokeWidth={1.75} className="shrink-0 mt-0.5" />
            <span>
              {NAP.address.streetAddress}, {NAP.address.addressLocality}, {NAP.address.addressRegion}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

/* ============================================================
   Mobile Accordion Section
   ============================================================ */

interface MobileAccordionSectionProps {
  title: string;
  links?: { label: string; href: string; isExternal?: boolean }[];
  viewAllHref?: string;
  isContactSection?: boolean;
}

function MobileAccordionSection({
  title,
  links,
  viewAllHref,
  isContactSection,
}: MobileAccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-3.5 text-body-sm font-bold text-white transition-colors min-h-[44px]"
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} section`}
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-white/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="pb-4">
          {isContactSection ? (
            <FooterContactColumn />
          ) : (
            <ul className="space-y-2 pl-1">
              {links?.map((link) => (
                <li key={link.href}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      rel="noopener"
                      target="_self"
                      className="flex items-center gap-1.5 text-body-sm text-white/70 hover:text-white transition-colors py-1"
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={12} strokeWidth={1.75} className="shrink-0" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-body-sm text-white/70 hover:text-white transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              {viewAllHref && (
                <li>
                  <Link
                    href={viewAllHref}
                    className="inline-block text-body-sm font-semibold text-white/80 hover:text-white transition-colors py-1"
                  >
                    View All &rarr;
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
