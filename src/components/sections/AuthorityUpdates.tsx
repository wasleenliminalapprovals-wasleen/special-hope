/**
 * AuthorityUpdates — "Dubai Approval Authority Updates" section for the homepage.
 *
 * Displays 5 high-priority approval topics with recent regulatory update context.
 * Each card shows authority logo, last-updated date, summary, and a link to the
 * relevant approval page.
 *
 * @see /plans/geo-seo-spiderweb-linking-plan.md (Phase 2, Task 2.4)
 */

import Image from "next/image";
import Link from "next/link";

/* ── Update data ────────────────────────────────────────── */

interface AuthorityUpdateItem {
  name: string;
  logoFilename: string;
  slug: string;
  lastUpdated: string;
  summary: string;
}

const updates: AuthorityUpdateItem[] = [
  {
    name: "Dubai Municipality (DM)",
    logoFilename: "DubaiMuncipalityLogo.png",
    slug: "dubai-municipality-building-permit",
    lastUpdated: "June 2026",
    summary:
      "Dubai Municipality has updated its building code requirements for 2026, introducing enhanced digital submission workflows through the new DM Estidama portal. Projects now require integrated BIM-level documentation for all structural, architectural, and MEP submissions. Our team is fully equipped to prepare and submit DM-compliant drawings under the latest standards.",
  },
  {
    name: "Dubai Civil Defense (DCD)",
    logoFilename: "DCDLogo.png",
    slug: "dubai-civil-defense-approval",
    lastUpdated: "June 2026",
    summary:
      "DCD has streamlined its NOC application process with a new unified fire safety compliance checklist. All fit-out and building completion applications now require pre-approved fire suppression system designs and updated evacuation plan submissions. We guide clients through the revised DCD workflow to ensure first-time NOC approval.",
  },
  {
    name: "DEWA",
    logoFilename: "dewalogo2024.webp",
    slug: "dewa-approval",
    lastUpdated: "May 2026",
    summary:
      "DEWA has mandated smart meter installation for all new commercial and residential connections. The load enhancement process now requires updated electrical single-line diagrams verified through DEWA's e-Services portal. We handle the complete DEWA connection approval, from load assessment to meter installation coordination.",
  },
  {
    name: "Dubai Development Authority (DDA)",
    logoFilename: "logo-DDA-colour.svg",
    slug: "dda-approval",
    lastUpdated: "May 2026",
    summary:
      "DDA has released its 2026 design guidelines for d3, Dubai Internet City, and Dubai Media City, with updated façade treatment standards and enhanced sustainability benchmarks. Fit-out applications in DDA jurisdictions now require MEP coordination drawings and updated NOC formatting. We prepare DDA-compliant submissions for all tech hub tenancies.",
  },
  {
    name: "DMCC & Free Zones",
    logoFilename: "Dubai-Multi-Commodities-Centre-(DMCC)-thumb.png",
    slug: "dmcc-approval",
    lastUpdated: "April 2026",
    summary:
      "DMCC has introduced updated fit-out permit requirements for JLT and Almas Tower, including mandatory fire-rated partitioning for all commercial upgrades. JAFZA has also revised its warehouse modification rules. Our free zone specialists manage DMCC, JAFZA, DAFZA, and all other free zone submissions with authority-specific expertise.",
  },
];

/* ── Component ──────────────────────────────────────────── */

export default function AuthorityUpdates() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
        <h2 className="text-h2 font-montserrat text-heading-text mb-2">
          Dubai Approval Authority Updates
        </h2>
        <p className="text-body text-body-text mb-10 max-w-3xl">
          Stay informed on the latest regulatory changes from Dubai&rsquo;s key approval
          authorities. Our team continuously monitors and adapts to these updates to
          ensure your project submissions remain compliant.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {updates.map((item) => (
            <article
              key={item.slug}
              className="flex flex-col gap-4 p-6 rounded-md bg-white border border-border-light shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-dropdown"
            >
              {/* Authority logo + name */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-md bg-white border border-border-light shrink-0 p-2">
                  <Image
                    src={`/logos/${item.logoFilename}`}
                    alt={`${item.name} logo`}
                    width={48}
                    height={32}
                    className="object-contain"
                    loading="lazy"
                    style={{ maxHeight: "32px" }}
                  />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat text-heading-text">
                    {item.name}
                  </h3>
                  <p className="text-caption font-medium text-body-text/60">
                    Last updated: {item.lastUpdated}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <p className="text-body-sm text-body-text leading-relaxed">
                {item.summary}
              </p>

              {/* CTA link */}
              <Link
                href={`/approvals/${item.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 text-link-blue font-semibold hover:underline text-body-sm"
              >
                Read More &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
