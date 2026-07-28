/**
 * About Us — Company story, credentials, and E-E-A-T signals.
 *
 * Schema: AboutPage + BreadcrumbList + Organization reference
 *
 * @see /plans/complete-build-plan.md (Phase 10.1 — About Us)
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md (AboutPage schema)
 */

import type { Metadata } from "next";
import { SITE, NAP } from "@/lib/constants";
import { Shield, Award, Users, BadgeCheck } from "lucide-react";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "About Wasleen Approvals | Dubai Approval Consultants",
  description:
    "Wasleen Liminal Approval Consultants — 8+ years of experience streamlining Dubai approvals. Trusted by 500+ clients for DM, DDA, DEWA & DCD permits.",
  alternates: {
    canonical: `${SITE.url}/about-us`,
  },
  openGraph: {
    title: "About Wasleen Approvals | Dubai Approval Experts",
    description:
      "Learn about Wasleen Liminal Approval Consultants — your trusted partner for Dubai government, free zone, and developer approvals since 2018.",
  },
};

/* ============================================================
   Core values / differentiators
   ============================================================ */

const values = [
  {
    icon: Shield,
    title: "Regulatory Expertise",
    description:
      "Deep knowledge of Dubai's regulatory landscape across DM, DDA, DEWA, DCD, free zones, and developer authorities.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "500+ successful approvals delivered across residential, commercial, and industrial projects in Dubai.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Personal account managers who understand your project and provide real-time updates throughout the process.",
  },
  {
    icon: BadgeCheck,
    title: "End-to-End Service",
    description:
      "From document preparation to final approval delivery — we handle everything so you can focus on your project.",
  },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function AboutUsPage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="bg-brand-blue px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-h1 font-montserrat text-white mb-4">
            About {NAP.companyName}
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            We simplify Dubai's complex approval landscape so you can
            build, operate, and grow with confidence.
          </p>
        </div>
      </section>

      {/* ===== Company Story ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-body text-body-text leading-relaxed">
            <p>
              Wasleen Liminal Approval Consultants was founded to address a
              critical gap in Dubai's project approval ecosystem —
              the complexity, fragmentation, and time-consuming nature of
              navigating multiple regulatory authorities.
            </p>
            <p>
              With over 8 years of hands-on experience in Dubai's
              approval landscape, our team has developed deep relationships
              and procedural understanding across every major authority —
              from Dubai Municipality and DEWA to free zone authorities
              like DSO and DMCC.
            </p>
            <p>
              We've helped 500+ clients — including developers,
              contractors, businesses, and homeowners — successfully
              navigate the approval process, saving them weeks of delays
              and thousands in avoidable penalties.
            </p>
            <p>
              Our mission is simple: make Dubai approvals accessible,
              predictable, and stress-free for every client.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Stats Strip ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">8+</p>
              <p className="text-body-sm text-body-text">Years Experience</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">500+</p>
              <p className="text-body-sm text-body-text">Projects Delivered</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">52+</p>
              <p className="text-body-sm text-body-text">Approval Types</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">15+</p>
              <p className="text-body-sm text-body-text">Authorities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text text-center mb-10">
            Why Choose Wasleen?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="flex gap-4 p-6 rounded-md bg-card-bg"
                >
                  <div className="w-12 h-12 rounded-md bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-h4 font-montserrat text-heading-text mb-2">
                      {value.title}
                    </h3>
                    <p className="text-body-sm text-body-text leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Credentials ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text text-center mb-8">
            Our Credentials
          </h2>
          <div className="space-y-4 text-body text-body-text leading-relaxed">
            <p>
              Wasleen Liminal Approval Consultants is a registered
              consultancy based in Dubai, United Arab Emirates. We operate
              in full compliance with UAE commercial regulations and
              maintain active working relationships with all major
              regulatory authorities.
            </p>
            <p>
              <strong>Registered Address:</strong>{" "}
              {NAP.address.streetAddress}, {NAP.address.addressLocality},{" "}
              {NAP.address.addressRegion}
            </p>
            <p>
              <strong>License:</strong> Professional consultancy — details
              available upon request.
            </p>
            <p className="text-body-sm text-body-text/70 italic">
              * Specific license numbers and registration details are
              available to verified clients during the onboarding process.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
         JSON-LD Schema
         ============================================================ */}

      {/* AboutPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": `${SITE.url}/about-us/#aboutpage`,
            url: `${SITE.url}/about-us`,
            name: "About Wasleen Liminal Approval Consultants",
            description:
              "Wasleen Liminal Approval Consultants — 8+ years of experience streamlining Dubai approvals.",
            mainEntity: {
              "@id": `${SITE.url}/#organization`,
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
            "@id": `${SITE.url}/about-us/#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About Us",
                item: `${SITE.url}/about-us`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
