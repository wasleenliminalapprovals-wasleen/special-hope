/**
 * ServicesBridgeArabic — Arabic variant of ZONE 10 (plan §5, C-AR §9).
 *
 * Mirrors `ServicesBridge.tsx` but sources Arabic names/taglines from
 * `@/data/services-ar` (`ar.name` / `ar.tagline`) and links to the Arabic
 * service pages (`/ar/services/{slug}`). Icon map and bridge order match EN.
 *
 * @see src/components/blog/ServicesBridge.tsx (EN source)
 */

import Link from "next/link";
import {
  ClipboardCheck,
  DraftingCompass,
  FileCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services-ar";

/** Icon per service slug (lucide-react, strokeWidth 1.75 — icon rules). */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "approval-management": ClipboardCheck,
  "document-clearing": FileCheck,
  "project-management": Workflow,
  "cad-documentation": DraftingCompass,
};

/** Bridge order — the 4 services surfaced on the blog index. */
const BRIDGE_SLUGS = [
  "approval-management",
  "document-clearing",
  "project-management",
  "cad-documentation",
] as const;

export default function ServicesBridgeArabic() {
  const bridgeServices = services.filter((s) =>
    (BRIDGE_SLUGS as readonly string[]).includes(s.slug),
  );
  if (bridgeServices.length === 0) return null;

  return (
    <section className="srv-zone" aria-labelledby="srv-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">خدماتنا</p>
          <h2 id="srv-heading" className="zone-title">
            الموافقات، مُدارة من البداية إلى النهاية
          </h2>
        </div>

        <div className="blog-tile-grid srv-grid fade-in">
          {bridgeServices.map((service) => {
            const Icon = SERVICE_ICONS[service.slug];
            return (
              <article key={service.slug} className="srv-card blog-accent-edge">
                {Icon ? (
                  <span className="srv-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                ) : null}
                <h3 className="srv-title">{service.ar.name}</h3>
                <p className="srv-desc">{service.ar.tagline}</p>
                <Link className="btn-quote" href={`/ar/services/${service.slug}`}>
                  استكشف الخدمة
                  <span aria-hidden="true"> ←</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
