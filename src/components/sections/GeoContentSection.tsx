/**
 * GeoContentSection — SEO/GEO-optimised content block for the homepage.
 *
 * Provides entity-rich geographic anchoring, authority trust signals, and
 * contextual internal links to key approval pages.
 *
 * @see /plans/geo-seo-spiderweb-linking-plan.md (Phase 2, Task 2.3)
 */

import Link from "next/link";

export default function GeoContentSection() {
  return (
    <section className="bg-light-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
        {/* ===== Section A ===== */}
        <div className="mb-12">
          <h2 className="text-h2 font-montserrat text-heading-text mb-6">
            Trusted Across Dubai's Key Commercial & Residential Hubs
          </h2>

          <div className="space-y-4 text-body text-body-text leading-relaxed max-w-4xl">
            <p>
              Wasleen Liminal Approval Consultants provides end-to-end project approval
              management across all major Dubai jurisdictions&mdash;including
              <strong> Dubai Municipality (DM)</strong>, <strong>Dubai Development Authority (DDA)</strong>,
              <strong> DEWA</strong>, <strong>Dubai Civil Defense (DCD)</strong>, <strong>Trakhees</strong>,
              and every free zone authority in the emirate. Whether you need a building permit,
              a fit-out NOC, a DEWA connection, or a fire safety compliance certificate, our team
              navigates the regulatory process from application to final stamp.
            </p>

            <p>
              From our office in Al Qusais, we serve clients across <strong>Business Bay</strong>,
              <strong> Downtown Dubai</strong>, <strong>Jumeirah Lakes Towers (JLT)</strong>,
              <strong> Sheikh Zayed Road</strong>, <strong>Dubai Marina</strong>,
              <strong> Dubai Silicon Oasis</strong>, <strong>DAFZA</strong>, <strong>JAFZA</strong>,
              <strong> Meydan</strong>, <strong>Al Quoz Industrial</strong>,
              <strong> Dubai South</strong>, and all 50+ communities in between. No matter where
              your project is located, we handle the authority submissions and follow-ups so you
              can focus on construction and operations.
            </p>

            <p>
              Our registered engineers prepare and stamp all DM-compliant drawings in-house. We
              submit directly to <Link href="/approvals/dubai-municipality-building-permit" className="text-link-blue hover:underline font-medium">Dubai Municipality</Link>,
              <Link href="/approvals/dda-approval" className="text-link-blue hover:underline font-medium"> DDA</Link>,
              <Link href="/approvals/dewa-approval" className="text-link-blue hover:underline font-medium"> DEWA</Link>,
              <Link href="/approvals/dubai-civil-defense-approval" className="text-link-blue hover:underline font-medium"> DCD</Link>,
              Trakhees, and all free zone authorities on your behalf&mdash;saving you weeks of
              coordination and eliminating rejection risk from incomplete submissions.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/approvals"
              className="inline-flex items-center gap-1.5 text-link-blue font-semibold hover:underline"
            >
              View all 52+ approval types &rarr;
            </Link>
          </div>
        </div>

        {/* ===== Section B ===== */}
        <div>
          <h2 className="text-h2 font-montserrat text-heading-text mb-6">
            Why Dubai Chooses Wasleen for Project Approvals
          </h2>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-md p-6 text-center border border-border-light shadow-card">
              <p className="text-h1 font-montserrat text-cta-amber">52+</p>
              <p className="text-body-sm text-body-text mt-1">Approval Types Covered</p>
            </div>
            <div className="bg-white rounded-md p-6 text-center border border-border-light shadow-card">
              <p className="text-h1 font-montserrat text-cta-amber">500+</p>
              <p className="text-body-sm text-body-text mt-1">Projects Successfully Delivered</p>
            </div>
            <div className="bg-white rounded-md p-6 text-center border border-border-light shadow-card">
              <p className="text-h1 font-montserrat text-cta-amber">8+</p>
              <p className="text-body-sm text-body-text mt-1">Years of Regulatory Experience</p>
            </div>
            <div className="bg-white rounded-md p-6 text-center border border-border-light shadow-card">
              <p className="text-h1 font-montserrat text-cta-amber">100%</p>
              <p className="text-body-sm text-body-text mt-1">In-House Drawing & Engineering</p>
            </div>
          </div>

          <p className="text-body text-body-text leading-relaxed max-w-3xl">
            Our team of registered engineers, draftspersons, and approval specialists has
            streamlined the approval process for hundreds of clients across Dubai&rsquo;s
            commercial and residential sectors. We combine deep regulatory knowledge with
            efficient document preparation to deliver the fastest possible turnaround times.
            <Link href="/about-us" className="text-link-blue hover:underline font-medium ml-1">
              Learn more about our team &rarr;
            </Link>
          </p>
        </div>

        {/* ===== Section C ===== */}
        <div className="mt-12 pt-12 border-t border-border-light">
          <h2 className="text-h2 font-montserrat text-heading-text mb-6">
            Comprehensive Approval Services Across Every Authority
          </h2>

          <div className="space-y-4 text-body text-body-text leading-relaxed max-w-4xl">
            <p>
              We manage the full spectrum of <Link href="/approvals" className="text-link-blue hover:underline font-medium">Dubai approvals</Link> covering
              government regulatory permits, free zone authorizations, developer community NOCs,
              and technical utility connections. Our <Link href="/approvals/dubai-municipality-building-permit" className="text-link-blue hover:underline font-medium">Dubai Municipality building permit</Link> service
              handles everything from initial drawing submission to final approval, while our
              <Link href="/approvals/dubai-civil-defense-approval" className="text-link-blue hover:underline font-medium"> DCD fire safety approval</Link> team ensures all fire protection systems comply with UAE Fire Code
              requirements. For utility connections, we manage <Link href="/approvals/dewa-approval" className="text-link-blue hover:underline font-medium">DEWA approvals</Link>, meter installations,
              and load enhancement applications across all property types.
            </p>

            <p>
              For businesses in Dubai's free zones, we provide specialized services for
              <Link href="/approvals/dmcc-approval" className="text-link-blue hover:underline font-medium"> DMCC approval</Link> in JLT,
              <Link href="/approvals/dubai-silicon-oasis-approval" className="text-link-blue hover:underline font-medium"> Dubai Silicon Oasis</Link> permits,
              <Link href="/approvals/tecom-approvals" className="text-link-blue hover:underline font-medium"> TECOM</Link> fit-out approvals, and
              <Link href="/approvals/jebel-ali-free-zone-approval" className="text-link-blue hover:underline font-medium"> JAFZA</Link> building permits through the Trakhees portal.
              For master-planned communities, we coordinate community NOCs from
              <Link href="/approvals/emaar-community-approval" className="text-link-blue hover:underline font-medium"> Emaar</Link>,
              <Link href="/approvals/nakheel-developer-approval" className="text-link-blue hover:underline font-medium"> Nakheel</Link>,
              <Link href="/approvals/damac-properties-approval" className="text-link-blue hover:underline font-medium"> Damac</Link>, and
              <Link href="/approvals/dubai-properties-approval" className="text-link-blue hover:underline font-medium"> Dubai Properties</Link> alongside their associated Dubai Municipality building permits and DCD clearances.
              Each approval is handled end-to-end, from document gathering to final certificate delivery.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-1.5 bg-cta-amber hover:bg-cta-amber-hover text-brand-black font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Get Your Free Approval Assessment &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
