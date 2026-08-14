import type { BlogCategory } from "@/types";

/**
 * Blog categories — single source of truth.
 *
 * Source: plans/blog-categories-topics-urls.md §3 (APPROVED 2026-08-13).
 * The 8 categories (A–H); B, D, F are intentionally EMPTY this wave and are
 * never forced with topics. The `/blog` index renders the ACTIVE categories
 * (A/C/E/G/H) in the ZONE 4 grid and ZONE 7 silos.
 */
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "approval-news",
    code: "A",
    name: "Approval News & Regulation Updates",
    description:
      "What changed? Official circulars, new laws, e-services and launches from Dubai's approval authorities.",
    slug: "approval-news",
    order: 1,
    exampleQueries: [
      "dubai building regulation news 2026",
      "dda circular 667",
      "dewa marafeq",
    ],
    active: true,
  },
  {
    id: "comparisons",
    code: "B",
    name: "Approval Comparisons",
    description:
      "Which is better / how do they differ? Authority vs authority, process vs process. Reserved for future sources.",
    slug: "comparisons",
    order: 6,
    exampleQueries: [],
    active: false,
  },
  {
    id: "project-journeys",
    code: "C",
    name: "Project-Type Approval Journeys",
    description:
      "What is it like for my kind of project? Modular builds, infrastructure and mixed-use journeys.",
    slug: "project-journeys",
    order: 2,
    exampleQueries: ["modular building approval dubai", "new dubai bridges impact"],
    active: true,
  },
  {
    id: "costs-timelines",
    code: "D",
    name: "Approval Costs & Timeline Stories",
    description:
      "Narrative cost and timeline breakdowns from real project stories. Reserved for future sources.",
    slug: "costs-timelines",
    order: 7,
    exampleQueries: [],
    active: false,
  },
  {
    id: "authority-deep-dives",
    code: "E",
    name: "Authority Deep-Dives",
    description:
      "How does this authority actually work? Inside-the-agency looks at Dubai's approval bodies.",
    slug: "authority-deep-dives",
    order: 3,
    exampleQueries: ["dubai municipality building permits agency", "trakhees rules"],
    active: true,
  },
  {
    id: "rejection-stories",
    code: "F",
    name: "Rejection & Mistake Stories",
    description:
      "Editorial case narratives on rejection and lessons learned. Reserved for future sources.",
    slug: "rejection-stories",
    order: 8,
    exampleQueries: [],
    active: false,
  },
  {
    id: "free-zones",
    code: "G",
    name: "Free Zones & Developer Communities",
    description:
      "Zone-specific and community-specific approval angles across Dubai's free zones.",
    slug: "free-zones",
    order: 4,
    exampleQueries: ["jafza modifications noc", "dmcc jlt approvals"],
    active: true,
  },
  {
    id: "docs-drawings",
    code: "H",
    name: "Documentation & Drawing Insights",
    description:
      "Digital submission, BIM/GIS and drawing standards in practice for Dubai projects.",
    slug: "docs-drawings",
    order: 5,
    exampleQueries: ["dubai municipality bim gis"],
    active: true,
  },
];
