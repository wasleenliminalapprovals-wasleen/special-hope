import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { staticPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${AR.breadcrumb.aboutUs} | ${AR.siteShortName}`,
  description: "من نحن — وسلين ليمينال لاستشارات الموافقات",
  alternates: {
    canonical: `${SITE.url}/ar/about-us`,
    languages: hreflangAlternates(SITE.url, "/ar/about-us"),
  },
};

export default function ArabicAboutUs() {
  /* ── Schema (Arabic) ──────────────────────────────── */
  const schemas = staticPageSchema(
    {
      url: "/ar/about-us",
      title: `${AR.breadcrumb.aboutUs} | ${AR.siteShortName}`,
      description: "من نحن — وسلين ليمينال لاستشارات الموافقات",
      pageType: "AboutPage",
      breadcrumbs: [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.aboutUs, slug: "/ar/about-us" },
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
        {AR.breadcrumb.aboutUs}
      </h1>
      <p className="text-center mb-8">
        <Link
          href="/ar/license"
          className="inline-flex items-center gap-2 text-link-blue hover:underline"
          aria-label="التحقق من الرخصة التجارية لوسلين ليمينال لاستشارات الموافقات"
        >
          <ShieldCheck size={18} strokeWidth={1.75} />
          {AR.license.title} — عرض تفاصيل الرخصة والتحقق
        </Link>
      </p>
    </div>
  );
}
