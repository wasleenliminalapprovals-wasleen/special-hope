/**
 * اتصل بنا (Arabic) — Contact page with phone, WhatsApp, email, and map.
 *
 * Schema: ContactPage + BreadcrumbList + Organization reference with contactPoint
 * Mirrors the English /contact-us page with Arabic content and RTL-safe layout.
 * Note: WhatsAppButton is English-only, so Arabic pages use an inline wa.me anchor
 * (see src/app/ar/page.tsx pattern). SocialIconsRow is locale-neutral (icons only).
 */

import type { Metadata } from "next";
import { SITE, NAP, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { staticPageSchema } from "@/lib/schema";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import SocialIconsRow from "@/components/sections/SocialIconsRow";

/* ============================================================
   Metadata — title is just the label; the ar/layout template
   appends "| وسلين للموافقات" (no duplicate brand suffix).
   ============================================================ */

export const metadata: Metadata = {
  title: AR.breadcrumb.contactUs,
  description:
    "تواصل مع وسلين للموافقات للحصول على استشارة مجانية. اتصل على +971567648220 أو راسلنا عبر واتساب أو البريد الإلكتروني approvals@wasleen.com. نرد خلال ساعتين.",
  alternates: {
    canonical: `${SITE.url}/ar/contact-us`,
    languages: hreflangAlternates(SITE.url, "/ar/contact-us"),
  },
  openGraph: {
    title: `${AR.breadcrumb.contactUs} | ${AR.siteShortName}`,
    description:
      "تواصل مع وسلين ليمينال لاستشارات الموافقات للحصول على خدمات موافقات دبي المتخصصة. استشارة مجانية متاحة.",
  },
};

/* ============================================================
   Contact methods — NAP values stay byte-for-byte consistent
   with the footer, schema and GBP (address kept in English).
   ============================================================ */

const contactMethods = [
  {
    icon: Phone,
    title: "الهاتف",
    value: NAP.phone,
    href: `tel:${NAP.phone}`,
    description: "تحدث مباشرة مع فريقنا",
    ariaLabel: `اتصل بنا على ${NAP.phone}`,
  },
  {
    icon: MessageCircle,
    title: "واتساب",
    value: NAP.whatsapp,
    href: `https://wa.me/${NAP.whatsapp}`,
    description: "أسرع رد — عادة خلال 30 دقيقة",
    ariaLabel: "تواصل معنا عبر واتساب",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: NAP.email,
    href: `mailto:${NAP.email}`,
    description: "نرد خلال ساعتي عمل",
    ariaLabel: `راسلنا على ${NAP.email}`,
  },
  {
    icon: MapPin,
    title: "الموقع",
    value: `${NAP.address.streetAddress}, ${NAP.address.addressLocality}, ${NAP.address.addressRegion}`,
    href: null,
    description: "نخدم جميع مناطق دبي",
    ariaLabel: null,
  },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function ArabicContactUs() {
  /* ── Schema (Arabic) ──────────────────────────────── */
  const schemas = staticPageSchema(
    {
      url: "/ar/contact-us",
      title: AR.breadcrumb.contactUs,
      description:
        "تواصل مع وسلين للموافقات للحصول على استشارة مجانية لموافقات دبي — بلدية دبي، ديوا، الدفاع المدني وهيئة دبي للتطوير.",
      pageType: "ContactPage",
      breadcrumbs: [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.contactUs, slug: "/ar/contact-us" },
      ],
      dateModified: "2026-07-28",
    },
    "ar",
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
          <h1 className="text-h1 font-montserrat text-white mb-4">
            {AR.breadcrumb.contactUs}
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            جاهز لبدء رحلة موافقاتك؟ تواصل معنا وسنرد عليك خلال ساعتين.
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
                تواصل معنا
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
                <a
                  href={`https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(AR.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 flex-1 rounded-md bg-cta-amber text-brand-black font-semibold px-8 py-4 text-body hover:bg-cta-amber-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cta-amber"
                  aria-label={AR.cta.whatsapp}
                >
                  <MessageCircle size={20} strokeWidth={1.75} />
                  {AR.cta.whatsapp}
                </a>

                <a
                  href={`tel:${NAP.phone}`}
                  className="inline-flex items-center justify-center gap-2 flex-1 rounded-md bg-brand-blue text-white font-semibold px-8 py-4 text-body hover:bg-brand-blue-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue"
                  aria-label={`اتصل بنا على ${NAP.phone}`}
                >
                  <Phone size={20} strokeWidth={1.75} />
                  {AR.nav.callNow}
                </a>
              </div>

              {/* ===== Social Media ===== */}
              <div className="mt-10">
                <h3 className="text-h4 font-montserrat text-heading-text mb-4">
                  تابعنا
                </h3>
                <SocialIconsRow variant="contact" />
              </div>
            </div>

            {/* ===== Right: Maps & Info ===== */}
            <div className="space-y-6">
              {/* Map 1 — Main Office */}
              <div>
                <h3 className="text-h4 font-montserrat text-heading-text mb-3 flex items-center gap-2">
                  <MapPin size={18} strokeWidth={1.75} className="text-brand-blue shrink-0" />
                  مكتبنا الرئيسي
                </h3>
                <div className="rounded-md overflow-hidden border border-border-light">
                  <div className="aspect-[4/3] bg-card-bg relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.447891748681!2d55.299419775383804!3d25.255514377673393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f436925673a6f%3A0xdd525a8229093985!2sWasleen%20Technical%20Services%20%E2%80%93%20Pergola%20%26%20Car%20Parking%20Solutions%20in%20Dubai!5e0!3m2!1sen!2sae!4v1785229567827!5m2!1sen!2sae"
                      width="100%"
                      height="100%"
                      className="absolute inset-0 border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="وسلين للخدمات الفنية — موقع المكتب الرئيسي"
                      aria-label="خريطة جوجل تعرض وسلين للخدمات الفنية — حلول البرجولات ومواقف السيارات في دبي"
                    />
                  </div>
                </div>
              </div>

              {/* Map 2 — Showroom */}
              <div>
                <h3 className="text-h4 font-montserrat text-heading-text mb-3 flex items-center gap-2">
                  <MapPin size={18} strokeWidth={1.75} className="text-brand-blue shrink-0" />
                  معرضنا
                </h3>
                <div className="rounded-md overflow-hidden border border-border-light">
                  <div className="aspect-[4/3] bg-card-bg relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1380597540597!2d55.38031657538407!3d25.265940777666803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1176f7006181aff%3A0x734697b9bc64aefe!2sWasleen%20Pergolas%20%26%20CinemaxSky!5e0!3m2!1sen!2sae!4v1785229637998!5m2!1sen!2sae"
                      width="100%"
                      height="100%"
                      className="absolute inset-0 border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="وسلين للبرجولات وسينماكس سكاي — موقع المعرض"
                      aria-label="خريطة جوجل تعرض معرض وسلين للبرجولات وسينماكس سكاي"
                    />
                  </div>
                </div>
              </div>

              {/* ===== Business Hours ===== */}
              <div className="p-6 rounded-md bg-card-bg">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} strokeWidth={1.75} className="text-brand-blue" />
                  <h3 className="text-h4 font-montserrat text-heading-text">
                    {AR.footer.workingHours}
                  </h3>
                </div>
                <div className="space-y-2 text-body-sm text-body-text">
                  <div className="flex justify-between">
                    <span>الأحد &ndash; الخميس</span>
                    <span className="font-medium">٩:٠٠ صباحاً &ndash; ٦:٠٠ مساءً</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الجمعة</span>
                    <span className="font-medium">٩:٠٠ صباحاً &ndash; ١:٠٠ ظهراً</span>
                  </div>
                  <div className="flex justify-between">
                    <span>السبت</span>
                    <span className="font-medium">مغلق</span>
                  </div>
                </div>
                <p className="text-caption text-body-text/80 mt-4 italic">
                  تتم متابعة استفسارات واتساب خارج ساعات العمل.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
