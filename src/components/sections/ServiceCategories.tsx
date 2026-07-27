/**
 * ServiceCategories — 8 category cards showcasing Dubai approval types.
 *
 * Each card shows a Lucide icon + category name + approval count + link.
 * Used on homepage to help users quickly find their approval type.
 *
 * @see /plans/complete-build-plan.md (Phase 6.3 — Service Categories)
 */

import Card from "@/components/ui/Card";
import {
  Building2,
  Building,
  Home,
  FileText,
  Zap,
  UtensilsCrossed,
  PencilRuler,
  ScrollText,
} from "lucide-react";

const categories = [
  {
    title: "Government & Regulatory",
    slug: "government-regulatory",
    count: 12,
    icon: Building2,
    description: "DM, DCD, RTA & government authority approvals",
  },
  {
    title: "Free Zone Approvals",
    slug: "free-zone",
    count: 8,
    icon: Building,
    description: "DSO, Dubai South, TECOM & free zone permits",
  },
  {
    title: "Developer & Community",
    slug: "developer-community",
    count: 6,
    icon: Home,
    description: "Emaan, Nakheel & developer approvals",
  },
  {
    title: "Property & Registration",
    slug: "property-registration",
    count: 4,
    icon: ScrollText,
    description: "Title deeds, registration & property documents",
  },
  {
    title: "Technical & Utility",
    slug: "technical-utility",
    count: 7,
    icon: Zap,
    description: "DEWA, district cooling & infrastructure connections",
  },
  {
    title: "Trade, Food & Hospitality",
    slug: "trade-food-hospitality",
    count: 5,
    icon: UtensilsCrossed,
    description: "Food safety, trade licenses & hotel permits",
  },
  {
    title: "Fit-Out & Construction",
    slug: "fit-out-construction",
    count: 6,
    icon: PencilRuler,
    description: "Interior fit-out, renovation & building permits",
  },
  {
    title: "Drawing & Documentation",
    slug: "drawing-documentation",
    count: 4,
    icon: FileText,
    description: "2D, 3D, CAD drawings & technical submissions",
  },
];

export default function ServiceCategories() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Approval Services We Handle
          </h2>
          <p className="text-body-lg text-body-text max-w-2xl mx-auto">
            From government permits to technical drawings — we manage every
            approval your project needs in Dubai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.slug}
                icon={<Icon size={24} strokeWidth={1.75} />}
                title={cat.title}
                description={cat.description}
                badge={`${cat.count}+ approvals`}
                href={`/approvals?category=${cat.slug}`}
              />
            );
          })}
        </div>

        <div className="text-center mt-8">
          <a
            href="/approvals"
            className="inline-flex items-center gap-2 text-body font-medium text-link-blue hover:text-brand-blue-hover transition-colors"
          >
            View All 52+ Approval Types &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
