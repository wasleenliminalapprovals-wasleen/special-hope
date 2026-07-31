/**
 * Business License & Regulatory Registration — /license
 *
 * E-E-A-T trust page that publishes Wasleen Liminal Approval Consultants'
 * DED trade license details publicly for verification. Optimized for:
 *   - Google / Bing: trust signals, schema, BreadcrumbList
 *   - AI search (Google AI Overviews, ChatGPT, Perplexity): direct-answer
 *     block, stats strip, structured table, FAQ
 *   - Due-diligence visitors verifying the company before engaging
 *
 * Schema: WebPage (about → #organization) + BreadcrumbList + FAQPage
 * (see lib/schema.ts licensePageSchemaStack). The Organization credential
 * data itself is injected sitewide by the root layout — NOT duplicated here.
 *
 * @see /plans/license-page-build-plan.md
 * @see reference details/license-page-guide.md
 */

import type { Metadata } from "next";
import { ExternalLink, ShieldCheck, BadgeCheck, Building2, CalendarClock, ScrollText, FileCheck2 } from "lucide-react";
import { SITE, NAP, LICENSE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { licensePageSchemaStack } from "@/lib/schema";
import type { FAQItem } from "@/types";
import FAQBlock from "@/components/sections/FAQBlock";
import LicenseWhatsAppButton from "@/components/sections/LicenseWhatsAppButton";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "DED Licensed Approval Consultants Dubai | Wasleen",
  description:
    "Verify our DED trade license No. 1188577 (DCCI 486012). Wasleen Liminal Approval Consultants — a Dubai-licensed approval consultancy, valid through 2027. Contact us today.",
  alternates: {
    canonical: `${SITE.url}/license`,
    languages: hreflangAlternates(SITE.url, "/license"),
  },
  openGraph: {
    title: "DED Licensed Approval Consultants Dubai | Wasleen",
    description:
      "Verify our DED trade license No. 1188577 (DCCI 486012). Wasleen Liminal Approval Consultants — a Dubai-licensed approval consultancy, valid through 2027.",
    url: `${SITE.url}/license`,
    type: "website",
  },
};

/* ============================================================
   FAQ data — visible text MUST match schema output verbatim
   ============================================================ */

const faqs: FAQItem[] = [
  {
    question: "Is Wasleen Liminal Approval Consultants a licensed company in Dubai?",
    answer:
      "Yes. Wasleen Liminal Approval Consultants holds an active DED trade license (License No. 1188577) issued by the Department of Economy and Tourism (DET), Dubai. The license is valid through 15 September 2027 and our DCCI membership number is 486012.",
  },
  {
    question: "How can I verify your DED trade license number 1188577?",
    answer:
      "You can verify License No. 1188577 through the official DET (formerly DED) license verification portal at app.invest.dubai.ae/search-license. Enter our license number and the search will return our active registration status and company name.",
  },
  {
    question: "Why does Wasleen publish its license details publicly?",
    answer:
      "We publish our license details openly so clients and project stakeholders can complete due diligence before engaging us. A verifiable DED registration is a core for trust and confirms we operate as a formal, accountable legal entity rather than an individual broker.",
  },
  {
    question: "What legal entity type is Wasleen Liminal Approval Consultants?",
    answer:
      "Wasleen Liminal Approval Consultants is registered as an LLC – Single Owner under Dubai law. Our registered office is at Office 401, Darwish Building, Al Qusais, Dubai, and we operate in full compliance with UAE commercial regulations.",
  },
  {
    question: "Do you share license details with clients before starting a project?",
    answer:
      "Yes. We are happy to share a copy of our trade license and DCCI certificate with any client or authority during onboarding. You can request a copy instantly via WhatsApp using the button on this page.",
  },
  {
    question: "How does holding a DED license benefit my project approval process?",
    answer:
      "Authorities such as Dubai Municipality and Dubai Civil Defense route submissions through registered consultancies. A valid DED license lets us act as your registered consultant, submit drawings and applications on your behalf, and liaise with authorities under a formal, accountable entity.",
  },
];

/* ============================================================
   License details table data (text-only, no certificate image)
   ============================================================ */

const licenseRows: { label: string; value: string }[] = [
  { label: "License No.", value: LICENSE.licenseNumber },
  { label: "Company Name", value: LICENSE.companyName },
  { label: "License Category", value: LICENSE.licenseCategory },
  { label: "Issuing Authority", value: LICENSE.issuingAuthority },
  { label: "Legal Type", value: LICENSE.legalType },
  { label: "Issue Date", value: "15 September 2023" },
  { label: "Expiry Date", value: "15 September 2027" },
  { label: "DCCI Membership", value: LICENSE.dcciMembership },
  { label: "Status", value: LICENSE.status },
  { label: "Registered Address", value: LICENSE.address },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function LicensePage() {
  /* ── Schema: WebPage + BreadcrumbList + FAQPage ────────── */
  const schemas = licensePageSchemaStack(
    {
      url: "/license",
      title: "DED Licensed Approval Consultants Dubai | Wasleen",
      description:
        "Verify Wasleen Liminal Approval Consultants' active DED trade license No. 1188577 (DCCI 486012), valid through 2027.",
      faqs,
      dateModified: "2026-07-31",
    },
    "en",
  );

  return (
    <>
      {/* JSON-LD Schema */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ===== Hero ===== */}
      <section className="bg-brand-blue px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-1.5 mb-5">
            <ShieldCheck size={18} strokeWidth={1.75} />
            <span className="text-caption font-medium uppercase tracking-wide">
              DED Licensed & Regulated
            </span>
          </div>
          <h1 className="text-h1 font-montserrat text-white mb-4">
            DED Licensed Approval Consultants in Dubai
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Wasleen Liminal Approval Consultants is a registered, DET-licensed
            approval consultancy in Dubai — License No. 1188577, DCCI 486012,
            active through 15 September 2027.
          </p>
        </div>
      </section>

      {/* ===== Direct Answer Block (AI-snippet ready) ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-body-lg text-body-text leading-relaxed">
            Wasleen Liminal Approval Consultants (Wasleen Approvals) holds an
            active DED trade license — License No.{" "}
            <strong>{LICENSE.licenseNumber}</strong>, DCCI membership{" "}
            <strong>{LICENSE.dcciMembership}</strong> — issued by the
            Department of Economy and Tourism (DET), Dubai on 15 September 2023
            and valid through 15 September 2027. As a registered LLC – Single
            Owner, we are legally authorized to act as your consultant for
            Dubai Municipality, DDA, DEWA, DCD, and free zone approvals.
          </p>
        </div>
      </section>

      {/* ===== Stats Strip ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">
                {LICENSE.licenseNumber}
              </p>
              <p className="text-body-sm text-body-text">DED License No.</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">
                {LICENSE.dcciMembership}
              </p>
              <p className="text-body-sm text-body-text">DCCI Membership</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">
                LLC – Single Owner
              </p>
              <p className="text-body-sm text-body-text">Legal Type</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-success-green">
                Valid through 2027
              </p>
              <p className="text-body-sm text-body-text">License Status</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== License Details Table ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Our DED Trade License Details
          </h2>
          <p className="text-body text-body-text mb-8">
            The registration details below are published exactly as recorded
            by the Department of Economy and Tourism (DET), Dubai. You can
            independently verify them on the official portal.
          </p>
          <div className="overflow-x-auto rounded-md border border-border-light">
            <table className="w-full text-left text-body-sm">
              <thead>
                <tr className="bg-brand-blue text-white">
                  <th scope="col" className="px-4 py-3 font-medium">
                    Field
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {licenseRows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index % 2 === 0 ? "bg-white" : "bg-card-bg/50"}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-heading-text align-top"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 text-body-text">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-caption text-body-text/70 italic mt-4">
            * Registration details reflect the most recent renewal and are
            subject to change by the issuing authority. Always verify current
            status on the official DET portal.
          </p>
        </div>
      </section>

      {/* ===== Independent Verification ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-4">
            Independently Verify Our License
          </h2>
          <p className="text-body text-body-text leading-relaxed mb-6">
            You do not need to take our word for it. Verify our registration
            directly with the Department of Economy and Tourism (DET), Dubai
            using License No. <strong>{LICENSE.licenseNumber}</strong> on the
            official government portal.
          </p>
          <a
            href={LICENSE.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-body font-medium rounded-md bg-brand-blue text-white hover:bg-brand-blue-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue"
            aria-label="Verify our DED trade license on the official DET portal (opens in a new tab)"
          >
            <ExternalLink size={20} strokeWidth={1.75} />
            Verify License on DET Portal
          </a>
          <p className="text-caption text-body-text/70 mt-4">
            Official portal: app.invest.dubai.ae/search-license
          </p>
        </div>
      </section>

      {/* ===== Licensed Activities ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-4">
            Licensed Business Activities
          </h2>
          <p className="text-body text-body-text mb-6">
            Our DED license authorizes us to provide the following services in
            Dubai, United Arab Emirates:
          </p>
          <ul className="space-y-3">
            {LICENSE.activities.map((activity) => (
              <li
                key={activity}
                className="flex items-start gap-3 bg-card-bg rounded-md px-4 py-3"
              >
                <BadgeCheck
                  size={20}
                  strokeWidth={1.75}
                  className="text-success-green shrink-0 mt-0.5"
                />
                <span className="text-body text-body-text">{activity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-5 rounded-md bg-card-bg">
              <Building2 size={20} strokeWidth={1.75} className="text-brand-blue shrink-0" />
              <div>
                <p className="text-body-sm font-medium text-heading-text mb-1">Registered Entity</p>
                <p className="text-caption text-body-text">LLC – Single Owner, Dubai, UAE</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-md bg-card-bg">
              <CalendarClock size={20} strokeWidth={1.75} className="text-brand-blue shrink-0" />
              <div>
                <p className="text-body-sm font-medium text-heading-text mb-1">License Validity</p>
                <p className="text-caption text-body-text">15 Sep 2023 – 15 Sep 2027</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-md bg-card-bg">
              <FileCheck2 size={20} strokeWidth={1.75} className="text-brand-blue shrink-0" />
              <div>
                <p className="text-body-sm font-medium text-heading-text mb-1">Authorized Liaison</p>
                <p className="text-caption text-body-text">DM, DDA, DEWA, DCD & free zones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <FAQBlock
            title="License & Registration — Frequently Asked Questions"
            subtitle="Answers about our DED trade license, verification, and why we publish these details publicly."
            items={faqs}
            includeSchema={false}
          />
        </div>
      </section>

      {/* ===== CTA — Request License Copy ===== */}
      <section className="bg-brand-blue px-4 py-16 md:px-8 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 font-montserrat text-white mb-4">
            Request a Copy of Our License
          </h2>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Need our trade license or DCCI certificate for your records, bank,
            or authority submission? Message us on WhatsApp and we will send it
            to you immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LicenseWhatsAppButton />
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md border border-white/70 text-white hover:bg-white hover:text-brand-blue transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              aria-label="Go to our contact page"
            >
              <ScrollText size={20} strokeWidth={1.75} />
              Contact Us
            </a>
          </div>
          <p className="text-caption text-white/70 mt-6">
            Phone / WhatsApp: {NAP.phone} · Email: {NAP.email}
          </p>
        </div>
      </section>

      {/* ===== Last updated ===== */}
      <p className="text-center text-caption text-body-text/60 px-4 py-6">
        Last updated: 31 July 2026 · Wasleen Liminal Approval Consultants ·
        Office 401, Darwish Building, Al Qusais, Dubai, UAE
      </p>
    </>
  );
}
