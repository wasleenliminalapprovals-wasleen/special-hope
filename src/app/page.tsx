/**
 * Homepage — Wasleen Liminal Approval Consultants
 *
 * Section order (from build plan):
 * 1. HeroSection       — H1, animated SVG, CTA buttons
 * 2. TrustStrip        — Authority logos (grayscale)
 * 3. ServiceCategories — 8 category cards with Lucide icons
 * 4. ProcessOverview   — How it works (4 steps)
 * 5. FAQBlock          — Top 6 general questions + FAQPage schema
 * 6. CTASection        — Final CTA (phone, WhatsApp, email)
 *
 * @see /plans/complete-build-plan.md (Phase 6 — Homepage)
 */

import type { Metadata } from "next";
import { SITE, NAP } from "@/lib/constants";
import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import ServiceCategories from "@/components/sections/ServiceCategories";
import ProcessOverview from "@/components/sections/ProcessOverview";
import GeoContentSection from "@/components/sections/GeoContentSection";
import FAQBlock from "@/components/sections/FAQBlock";
import AuthorityUpdates from "@/components/sections/AuthorityUpdates";
import CTASection from "@/components/sections/CTASection";

/* ============================================================
   Homepage Metadata — 54 chars, front-loaded primary keyword
   ============================================================ */

export const metadata: Metadata = {
  title: "Fast-Track Dubai Project Approvals | DM, DDA, DEWA & DCD | Wasleen",
  description:
    "Wasleen Approval Consultants in Al Qusais, Dubai — expert DM, DDA, DEWA & DCD approvals for Business Bay, JLT & all UAE hubs. Contact us today.",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: "Fast-Track Dubai Project Approvals | DM, DDA, DEWA & DCD | Wasleen",
    description:
      "Wasleen Approval Consultants in Al Qusais, Dubai — expert DM, DDA, DEWA & DCD approvals for Business Bay, JLT & all UAE hubs. Contact us today.",
    url: SITE.url,
  },
};

/* ============================================================
   Homepage FAQ items — text matches FAQPage schema exactly
   ============================================================ */

const faqItems = [
  {
    question: "What types of approvals does Wasleen handle in Dubai?",
    answer:
      "Wasleen handles over 52 approval types across Dubai, including Dubai Municipality (DM), Dubai Development Authority (DDA), DEWA, Dubai Civil Defense (DCD), free zone approvals, and more. We cover government, free zone, developer, and technical approvals for all project types.",
  },
  {
    question: "How long does a typical approval take in Dubai?",
    answer:
      "Timelines vary by authority and project complexity. Simple approvals can take 3–5 business days, while complex multi-authority approvals may take 4–8 weeks. We provide a realistic timeline estimate during your free consultation based on your specific project.",
  },
  {
    question: "Do I need a consultant to get my project approved in Dubai?",
    answer:
      "While not legally required for all approvals, working with a consultant like Wasleen significantly reduces delays and rejections. We handle document preparation, submissions, follow-ups, and revisions — saving you weeks of back-and-forth with various authorities.",
  },
  {
    question: "What documents do I need to submit for an approval?",
    answer:
      "Required documents vary by approval type, but generally include: completed application form, NOC from relevant authorities, detailed drawings (2D/3D), structural calculations, tenancy contract or title deed, and valid trade license. We'll provide a complete checklist during your consultation.",
  },
  {
    question: "How much does it cost to get an approval in Dubai?",
    answer:
      "Costs vary by authority and project scope. Government fees range from AED 500–5,000 per approval, while consultant service fees are quoted based on complexity. We provide transparent, all-inclusive pricing with no hidden charges. Contact us for a free quote.",
  },
  {
    question: "What makes Wasleen different from other approval consultants?",
    answer:
      "With 8+ years of experience and 500+ successful projects, Wasleen offers deep expertise across Dubai's regulatory landscape. We provide end-to-end management, transparent pricing, real-time updates, and a proven track record of fast-track approvals. Our team knows exactly how each authority operates.",
  },
];

/* ============================================================
   Homepage Page Component
   ============================================================ */

export default function HomePage() {
  return (
    <>
      {/* ===== 1. Hero Section ===== */}
      <HeroSection />

      {/* ===== 2. Trust Strip ===== */}
      <TrustStrip />

      {/* ===== 3. Service Categories ===== */}
      <ServiceCategories />

      {/* ===== 4. Process Overview ===== */}
      <ProcessOverview />

      {/* ===== 5. SEO/GEO Anchoring Content ===== */}
      <GeoContentSection />

      {/* ===== 6. FAQ Block ===== */}
      <FAQBlock
        title="Frequently Asked Questions About Dubai Approvals"
        items={faqItems}
      />

      {/* ===== 7. Authority Updates ===== */}
      <AuthorityUpdates />

      {/* ===== 8. CTA Section ===== */}
      <CTASection service_slug="homepage" />

      {/* ============================================================
         Homepage JSON-LD Schema
         ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE.url}/#webpage`,
            url: SITE.url,
            name: "Fast-Track Dubai Project Approvals | DM, DDA, DEWA & DCD | Wasleen",
            description:
              "Wasleen Approval Consultants in Al Qusais, Dubai — expert DM, DDA, DEWA & DCD approvals for Business Bay, JLT & all UAE hubs. Contact us today.",
            isPartOf: {
              "@id": `${SITE.url}/#website`,
            },
            about: {
              "@id": `${SITE.url}/#organization`,
            },
            breadcrumb: {
              "@id": `${SITE.url}/#breadcrumb`,
            },
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${SITE.url}/#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE.url,
              },
            ],
          }),
        }}
      />
    </>
  );
}
