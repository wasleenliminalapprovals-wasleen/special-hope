/**
 * ServicesBridge — ZONE 10 of the blog index (plan §5).
 *
 * Server component. Bridges the blog into the 4 core paid services:
 * Approval Management, Document Clearing, Project Management and CAD
 * Documentation (selected from the `services` data array by slug).
 *   - `.blog-tile-grid srv-grid` — 1px-gap tile grid (same signature as the
 *     category grid), each card on `.blog-accent-edge` hover.
 *   - `.srv-icon` — lucide icon in an accent tile (`.srv-card` light
 *     background), fixed 20–24px with `strokeWidth={1.75}` per the icon rules.
 *   - `.btn-quote` — real `<Link>` to `/services/{slug}` styled as the
 *     gradient quote button (grad-accent fill → lift + glow).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 10)
 */

import Link from "next/link";
import {
  ClipboardCheck,
  DraftingCompass,
  FileCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";

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

export default function ServicesBridge() {
  const bridgeServices = services.filter((s) =>
    (BRIDGE_SLUGS as readonly string[]).includes(s.slug)
  );
  if (bridgeServices.length === 0) return null;

  return (
    <section className="srv-zone" aria-labelledby="srv-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">Our services</p>
          <h2 id="srv-heading" className="zone-title">
            Approvals, handled end-to-end
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
                <h3 className="srv-title">{service.name}</h3>
                <p className="srv-desc">{service.tagline}</p>
                <Link className="btn-quote" href={`/services/${service.slug}`}>
                  Explore service
                  <span aria-hidden="true"> →</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
