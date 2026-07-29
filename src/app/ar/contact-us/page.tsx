import type { Metadata } from "next";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { staticPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${AR.breadcrumb.contactUs} | ${AR.siteShortName}`,
  description: "اتصل بوسلين ليمينال لاستشارات الموافقات",
  alternates: {
    canonical: `${SITE.url}/ar/contact-us`,
    languages: hreflangAlternates(SITE.url, "/ar/contact-us"),
  },
};

export default function ArabicContactUs() {
  /* ── Schema (Arabic) ──────────────────────────────── */
  const schemas = staticPageSchema(
    {
      url: "/ar/contact-us",
      title: `${AR.breadcrumb.contactUs} | ${AR.siteShortName}`,
      description: "اتصل بوسلين ليمينال لاستشارات الموافقات",
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
    <div className="min-h-screen py-16 px-4">
      {/* JSON-LD Schema */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <h1 className="text-h1 font-bold text-heading-text mb-8 text-center">
        {AR.breadcrumb.contactUs}
      </h1>
    </div>
  );
}
