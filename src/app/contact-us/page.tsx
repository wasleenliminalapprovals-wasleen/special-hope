/**
 * Contact Us — Contact page with phone, WhatsApp, email, and map.
 *
 * Schema: ContactPage + BreadcrumbList + Organization reference with contactPoint
 *
 * @see /plans/complete-build-plan.md (Phase 10.2 — Contact Us)
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md (ContactPage schema)
 */

import type { Metadata } from "next";
import { SITE, NAP } from "@/lib/constants";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "Contact Wasleen Approvals | Dubai Approval Consultants",
  description:
    "Get in touch with Wasleen Approvals for a free consultation. Call +971542330837, WhatsApp us, or email approvals@wasleen.com. We respond within 2 hours.",
  alternates: {
    canonical: `${SITE.url}/contact-us`,
  },
  openGraph: {
    title: "Contact Wasleen Approvals | Dubai Approval Consultants",
    description:
      "Reach out to Wasleen Liminal Approval Consultants for expert Dubai approval services. Free consultation available.",
  },
};

/* ============================================================
   Contact methods
   ============================================================ */

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    value: NAP.phone,
    href: `tel:${NAP.phone}`,
    description: "Speak directly with our team",
    ariaLabel: `Call us at ${NAP.phone}`,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: NAP.whatsapp,
    href: `https://wa.me/${NAP.whatsapp}`,
    description: "Fastest response — typically within 30 minutes",
    ariaLabel: "Contact us via WhatsApp",
    isWhatsApp: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: NAP.email,
    href: `mailto:${NAP.email}`,
    description: "We respond within 2 business hours",
    ariaLabel: `Email us at ${NAP.email}`,
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dubai, United Arab Emirates",
    href: null,
    description: "Servicing all areas of Dubai",
    ariaLabel: null,
  },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function ContactUsPage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="bg-brand-blue px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-h1 font-montserrat text-white mb-4">
            Contact Us
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ready to start your approval journey? Reach out and we'll
            get back to you within 2 hours.
          </p>
        </div>
      </section>

      {/* ===== Contact Grid ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ===== Left: Contact Methods ===== */}
            <div>
              <h2 className="text-h2 font-montserrat text-heading-text mb-6">
                Get in Touch
              </h2>

              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.title}
                      className="flex gap-4 p-4 rounded-md bg-card-bg"
                    >
                      <div className="w-12 h-12 rounded-md bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-body-text/80 uppercase tracking-wide">
                          {method.title}
                        </p>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="text-body font-medium text-link-blue hover:text-brand-blue-hover transition-colors break-all"
                            {...(method.href.startsWith("http")
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                            aria-label={method.ariaLabel || undefined}
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-body font-medium text-body-text">
                            {method.value}
                          </p>
                        )}
                        <p className="text-body-sm text-body-text/70 mt-1">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ===== CTA Buttons ===== */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <WhatsAppButton
                  service_slug="contact-us"
                  className="flex-1 text-body font-semibold px-8 py-4"
                />

                <a
                  href={`tel:${NAP.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 flex-1 text-body font-semibold px-8 py-4 bg-brand-blue text-white hover:bg-brand-blue-hover focus-visible:ring-brand-blue"
                  aria-label={`Call us at ${NAP.phone}`}
                >
                  <Phone size={20} strokeWidth={1.75} />
                  Call Now
                </a>
              </div>
            </div>

            {/* ===== Right: Map & Info ===== */}
            <div>
              <div className="rounded-md overflow-hidden border border-border-light mb-6">
                {/* Google Map Embed — lazy-loaded */}
                <div className="aspect-[4/3] bg-card-bg relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462563.03244084715!2d54.89801245!3d25.07565885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xb66fad5a8ef7e2e2!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    className="absolute inset-0"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wasleen Approvals — Dubai Office Location"
                    aria-label="Google Map showing Dubai, United Arab Emirates"
                  />
                </div>
              </div>

              {/* ===== Business Hours ===== */}
              <div className="p-6 rounded-md bg-card-bg">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} strokeWidth={1.75} className="text-brand-blue" />
                  <h3 className="text-h4 font-montserrat text-heading-text">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-body-sm text-body-text">
                  <div className="flex justify-between">
                    <span>Sunday &ndash; Thursday</span>
                    <span className="font-medium">9:00 AM &ndash; 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday</span>
                    <span className="font-medium">9:00 AM &ndash; 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-caption text-body-text/80 mt-4 italic">
                  WhatsApp queries are monitored outside business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         JSON-LD Schema
         ============================================================ */}

      {/* ContactPage + ContactPoint Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${SITE.url}/contact-us/#contactpage`,
            url: `${SITE.url}/contact-us`,
            name: "Contact Wasleen Liminal Approval Consultants",
            description:
              "Contact Wasleen Approvals for Dubai approval services.",
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
            "@id": `${SITE.url}/contact-us/#breadcrumb`,
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
                name: "Contact Us",
                item: `${SITE.url}/contact-us`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
