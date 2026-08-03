/**
 * Regulatory Dependency Graph — the internal-link mesh.
 *
 * Maps every approval to its direct prerequisites (the approvals that must
 * usually be obtained first) and, by inversion, the approvals it unlocks.
 * This powers the pSEO engine's `relatedSlugs` generation so every page links
 * to the correct 3–5 sibling/upstream/downstream approvals (entity web hub).
 *
 * Every slug referenced here MUST exist in `src/data/approvals.ts` — validated
 * by `validateDependencyGraph()` (throw on broken reference at build time).
 *
 * @see plans/pseo-domination-engine-plan.md §internal linking
 */
import type { ApprovalCategory } from "@/types";
import { approvals } from "./approvals";

/**
 * approval slug → direct prerequisite approval slugs.
 * "Prerequisite" = the approval a responsible consultant usually obtains before
 * the target approval can be approved (NOC-first ordering in Dubai).
 */
export const DEPENDENCY_GRAPH: Record<string, string[]> = {
  /* ---- DM / Government & Regulatory ---- */
  "dubai-municipality-building-permit": [
    "dubai-municipality-preliminary-building-permit",
    "dewa-connection-noc",
    "sewerage-drainage-approval",
    "telecom-connection-approval",
    "district-cooling-approval",
    "dubai-civil-defense-noc",
    "al-safat-green-building-approval",
    "2d-drawing-submission",
    "3d-design-approval",
    "cad-drawing-certification",
    "title-deed-registration",
  ],
  "dubai-civil-defense-approval": [
    "2d-drawing-submission",
    "mep-approval",
    "electrical-works-approval",
  ],
  "dubai-municipality-noc": ["title-deed-registration", "community-approval"],
  "rta-approval": ["dewa-connection-noc", "dubai-municipality-building-permit"],
  "dubai-municipality-health-safety-approval": ["ded-approval"],
  "dubai-municipality-environmental-compliance": [
    "dubai-municipality-health-safety-approval",
    "ded-approval",
  ],
  "dubai-municipality-signage-approval": [
    "ded-approval",
    "dubai-municipality-building-permit",
    "interior-fit-out-approval",
  ],
  "dubai-municipality-civil-defense-noc": [
    "dubai-civil-defense-approval",
    "interior-fit-out-approval",
  ],
  "dubai-municipality-completion-certificate": [
    "dubai-municipality-building-permit",
    "dubai-municipality-civil-defense-noc",
    "dewa-connection-noc",
    "sewerage-drainage-approval",
    "as-built-drawing-approval",
    "al-safat-green-building-approval",
  ],
  "dubai-municipality-preliminary-building-permit": [
    "title-deed-registration",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
    "2d-drawing-submission",
  ],
  "dubai-municipality-demolition-permit": [
    "title-deed-registration",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "dubai-municipality-excavation-permit": [
    "dubai-municipality-building-permit",
    "rta-approval",
    "dewa-connection-noc",
  ],

  /* ---- Free Zones ---- */
  "dubai-silicon-oasis-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
    "interior-fit-out-approval",
  ],
  "dubai-south-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "tecom-approvals": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "jebel-ali-free-zone-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "dubai-airport-freezone-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "dubai-knowledge-park-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "dmcc-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "dubai-science-park-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "impz-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "difc-approval": [
    "community-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],

  /* ---- Developer / Community ---- */
  "emaar-community-approval": ["community-approval", "title-deed-registration"],
  "nakheel-developer-approval": ["community-approval", "title-deed-registration"],
  "dubai-properties-approval": ["community-approval", "title-deed-registration"],
  "damac-properties-approval": ["community-approval", "title-deed-registration"],
  "meraas-holding-approval": ["community-approval", "title-deed-registration"],
  "sobha-realty-approval": ["community-approval", "title-deed-registration"],
  "dubai-holding-approval": ["community-approval", "title-deed-registration"],

  /* ---- Property / Registration ---- */
  "dubai-land-department-registration": ["title-deed-registration"],
  "ejari-registration": ["title-deed-registration", "ded-approval"],
  "title-deed-registration": ["dubai-land-department-registration"],
  "rera-permit": ["title-deed-registration", "ejari-registration"],

  /* ---- Technical / Utility ---- */
  "dewa-approval": [
    "title-deed-registration",
    "ejari-registration",
    "dubai-municipality-noc",
  ],
  "dewa-connection-noc": [
    "title-deed-registration",
    "dubai-municipality-noc",
    "dewa-approval",
  ],
  "district-cooling-approval": ["dewa-approval", "dewa-connection-noc"],
  "dewa-meter-installation": [
    "dewa-approval",
    "dewa-connection-noc",
    "electrical-works-approval",
  ],
  "dewa-load-enhancement": ["dewa-approval", "dewa-connection-noc", "mep-approval"],
  "telecom-connection-approval": ["title-deed-registration", "dubai-municipality-noc"],
  "dewa-temporary-power-connection": [
    "dewa-approval",
    "dubai-municipality-building-permit",
  ],
  "sewerage-drainage-approval": [
    "title-deed-registration",
    "dubai-municipality-noc",
    "mep-approval",
  ],

  /* ---- Trade / Food / Hospitality ---- */
  "food-control-department-approval": [
    "ded-approval",
    "dubai-municipality-health-safety-approval",
    "interior-fit-out-approval",
  ],
  "dtcm-tourism-approval": [
    "ded-approval",
    "dubai-municipality-health-safety-approval",
  ],
  "dubai-health-authority-approval": [
    "ded-approval",
    "dubai-municipality-health-safety-approval",
    "interior-fit-out-approval",
  ],
  "public-health-approval": [
    "dubai-municipality-health-safety-approval",
    "ded-approval",
  ],
  "entertainment-license-approval": [
    "ded-approval",
    "dubai-police-approval",
    "dubai-municipality-health-safety-approval",
  ],
  "restaurant-works-approval": [
    "food-control-department-approval",
    "interior-fit-out-approval",
    "dubai-civil-defense-noc",
    "dewa-connection-noc",
    "ded-approval",
  ],

  /* ---- Fit-Out / Construction ---- */
  "interior-fit-out-approval": [
    "dubai-municipality-noc",
    "dubai-civil-defense-noc",
    "dewa-connection-noc",
    "2d-drawing-submission",
    "community-approval",
    "mep-approval",
  ],
  "change-of-usage-permit": [
    "interior-fit-out-approval",
    "ded-approval",
    "dubai-municipality-noc",
  ],
  "structural-modification-permit": [
    "dubai-municipality-building-permit",
    "2d-drawing-submission",
    "dubai-civil-defense-noc",
  ],
  "refurbishment-permit": ["interior-fit-out-approval", "dewa-connection-noc"],
  "partition-ceiling-approval": [
    "interior-fit-out-approval",
    "mep-approval",
    "2d-drawing-submission",
  ],
  "mep-approval": [
    "interior-fit-out-approval",
    "2d-drawing-submission",
    "dewa-approval",
  ],
  "electrical-works-approval": [
    "mep-approval",
    "dewa-approval",
    "2d-drawing-submission",
  ],
  "mezzanine-floor-approval": [
    "structural-modification-permit",
    "dubai-civil-defense-noc",
    "mep-approval",
    "2d-drawing-submission",
  ],
  "interior-works-approval": [
    "interior-fit-out-approval",
    "mep-approval",
    "2d-drawing-submission",
  ],
  "commercial-approval": [
    "interior-fit-out-approval",
    "ded-approval",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "residential-approval": [
    "interior-fit-out-approval",
    "dubai-civil-defense-noc",
    "dewa-connection-noc",
    "community-approval",
  ],
  "project-approval": [
    "dubai-municipality-building-permit",
    "dubai-municipality-preliminary-building-permit",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
    "2d-drawing-submission",
    "al-safat-green-building-approval",
    "mep-approval",
  ],

  /* ---- Drawing / Documentation ---- */
  "2d-drawing-submission": ["title-deed-registration", "dubai-municipality-noc"],
  "3d-design-approval": ["2d-drawing-submission", "dubai-municipality-noc"],
  "cad-drawing-certification": ["2d-drawing-submission"],
  "as-built-drawing-approval": [
    "dubai-municipality-building-permit",
    "interior-fit-out-approval",
  ],

  /* ---- Business / Economic ---- */
  "ded-approval": ["title-deed-registration", "ejari-registration"],
  "dda-approval": [
    "community-approval",
    "title-deed-registration",
    "dewa-connection-noc",
    "dubai-civil-defense-noc",
  ],
  "dubai-police-approval": ["ded-approval", "dubai-municipality-noc"],
  "community-approval": ["title-deed-registration", "ejari-registration"],
  "al-safat-green-building-approval": [
    "dubai-municipality-building-permit",
    "mep-approval",
  ],
};

/**
 * approval slug → responsible authority (short name).
 * Used by the engine to pick the right fact sheet and match topic images.
 */
export const AUTHORITY_BY_APPROVAL: Record<string, string> = {
  /* Dubai Municipality */
  "dubai-municipality-building-permit": "dm",
  "dubai-municipality-noc": "dm",
  "dubai-municipality-health-safety-approval": "dm",
  "dubai-municipality-environmental-compliance": "dm",
  "dubai-municipality-signage-approval": "dm",
  "dubai-municipality-completion-certificate": "dm",
  "dubai-municipality-preliminary-building-permit": "dm",
  "dubai-municipality-demolition-permit": "dm",
  "dubai-municipality-excavation-permit": "dm",
  "food-control-department-approval": "dm-food",
  "public-health-approval": "dm",
  "interior-fit-out-approval": "dm",
  "change-of-usage-permit": "dm",
  "structural-modification-permit": "dm",
  "refurbishment-permit": "dm",
  "partition-ceiling-approval": "dm",
  "mep-approval": "dm",
  "2d-drawing-submission": "dm",
  "3d-design-approval": "dm",
  "cad-drawing-certification": "dm",
  "as-built-drawing-approval": "dm",
  "al-safat-green-building-approval": "dm",
  "sewerage-drainage-approval": "dm",
  "electrical-works-approval": "dm",
  "mezzanine-floor-approval": "dm",
  "restaurant-works-approval": "dm",
  "interior-works-approval": "dm",
  "commercial-approval": "dm",
  "residential-approval": "dm",
  "project-approval": "dm",

  /* Civil Defense */
  "dubai-civil-defense-approval": "dcd",
  "dubai-municipality-civil-defense-noc": "dcd",

  /* RTA */
  "rta-approval": "rta",

  /* DEWA / utilities */
  "dewa-approval": "dewa",
  "dewa-connection-noc": "dewa",
  "dewa-meter-installation": "dewa",
  "dewa-load-enhancement": "dewa",
  "dewa-temporary-power-connection": "dewa",
  "district-cooling-approval": "empower",
  "telecom-connection-approval": "etisalat-du",

  /* Free zones */
  "dubai-silicon-oasis-approval": "dso",
  "dubai-south-approval": "dubai-south",
  "tecom-approvals": "tecom",
  "jebel-ali-free-zone-approval": "jafza",
  "dubai-airport-freezone-approval": "dafza",
  "dubai-knowledge-park-approval": "dkp",
  "dmcc-approval": "dmcc",
  "dubai-science-park-approval": "dsp",
  "impz-approval": "impz",
  "difc-approval": "difc",

  /* Developers */
  "emaar-community-approval": "emaar",
  "nakheel-developer-approval": "nakheel",
  "dubai-properties-approval": "dubai-properties",
  "damac-properties-approval": "damac",
  "meraas-holding-approval": "meraas",
  "sobha-realty-approval": "sobha",
  "dubai-holding-approval": "dubai-holding",

  /* Property / registration */
  "dubai-land-department-registration": "dld",
  "title-deed-registration": "dld",
  "ejari-registration": "rera",
  "rera-permit": "rera",

  /* Business / trade / tourism / health / police */
  "ded-approval": "ded",
  "dda-approval": "dda",
  "dubai-police-approval": "dubai-police",
  "dtcm-tourism-approval": "dtcm",
  "dubai-health-authority-approval": "dha",
  "entertainment-license-approval": "dtcm",
  "community-approval": "community",
};

/* ============================================================
   Helpers
   ============================================================ */

/** Direct prerequisites (approvals usually obtained first). */
export function getPrerequisites(slug: string): string[] {
  return DEPENDENCY_GRAPH[slug] ?? [];
}

/** Approvals that list `slug` as a prerequisite (inverse of the graph). */
export function getDependents(slug: string): string[] {
  return Object.entries(DEPENDENCY_GRAPH)
    .filter(([, prereqs]) => prereqs.includes(slug))
    .map(([key]) => key);
}

/** Responsible authority short name for an approval. */
export function getAuthorityForApproval(slug: string): string | undefined {
  return AUTHORITY_BY_APPROVAL[slug];
}

/**
 * Merge prerequisites + dependents into a deduped list of related approval
 * slugs (the internal-link mesh). Callers slice to 3–5 for page placement.
 */
export function getRelatedApprovals(slug: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (s: string) => {
    if (s !== slug && !seen.has(s)) {
      seen.add(s);
      out.push(s);
    }
  };
  getPrerequisites(slug).forEach(push);
  getDependents(slug).forEach(push);
  return out;
}

/**
 * Validate the graph against the actual approvals data.
 * Returns broken references (slugs in the graph that do not exist in
 * `src/data/approvals.ts`). Throws if `strict` is true.
 */
export function validateDependencyGraph(strict = false): string[] {
  const valid = new Set(approvals.map((a) => a.slug));
  const broken = new Set<string>();

  for (const [slug, prereqs] of Object.entries(DEPENDENCY_GRAPH)) {
    if (!valid.has(slug)) broken.add(slug);
    for (const p of prereqs) {
      if (!valid.has(p)) broken.add(p);
    }
  }
  const list = [...broken];
  if (strict && list.length > 0) {
    throw new Error(
      `Dependency graph references missing approvals: ${list.join(", ")}`
    );
  }
  return list;
}

/** Category lookup for an approval (from the approvals data file). */
export function getApprovalCategory(slug: string): ApprovalCategory | undefined {
  return approvals.find((a) => a.slug === slug)?.category;
}
