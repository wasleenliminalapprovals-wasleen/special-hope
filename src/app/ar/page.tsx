import type { Metadata } from "next";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { homepageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${AR.tagline} | ${AR.siteShortName}`,
  description: AR.description,
  alternates: {
    canonical: `${SITE.url}/ar`,
    languages: hreflangAlternates(SITE.url, "/ar"),
  },
};

export default function ArabicHomePage() {
  /* ── Schema (Arabic) ──────────────────────────────── */
  const schemas = homepageSchema(
    {
      title: `${AR.tagline} | ${AR.siteShortName}`,
      description: AR.description,
      dateModified: "2026-07-28",
    },
    "ar",
  );

  return (
    <div className="min-h-screen">
      {/* JSON-LD Schema */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <section className="bg-brand-blue text-white py-16 px-4 text-center">
        <h1 className="text-h1 font-bold mb-4">{AR.tagline}</h1>
        <p className="text-body-lg max-w-3xl mx-auto">{AR.description}</p>
      </section>
    </div>
  );
}
