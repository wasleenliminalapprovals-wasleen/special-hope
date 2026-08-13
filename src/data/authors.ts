/**
 * Author Registry for /guides pages.
 *
 * Single source of truth for guide authors. Drives:
 *   - the JSON-LD `author` @id refs in QAPage schema (via `lib/schema.ts`)
 *   - the sitewide Person entities registered in `lib/site-config.ts`
 *   - the visible author byline on every /guides page (EN + AR)
 *
 * Rules (see plans/gsc-qa-author-schema-fix-plan.md §3.2):
 *   - Person `name` / `titleEn` / `jobTitle` / `sameAs` come ONLY from
 *     `reference details/authors-profile-links.md` (verified LinkedIn/Gravatar).
 *   - NO fabricated stats (years, project counts, PMP, etc.) in schema.
 *   - "organization" maps to the sitewide `#organization` — never a new
 *     Person node for the company.
 *   - `worksFor` always points at this site's #organization (kept in schema.ts).
 *
 * IMPORTANT: Pure data + lookups only — MUST NOT import from `lib/schema.ts`
 * (schema.ts imports this module; importing back would create a circular
 * dependency).
 *
 * @see plans/gsc-qa-author-schema-fix-plan.md §4 (author assignment map)
 */

export type GuideAuthorId = "jamsheed-khalid" | "kavya-ramachandran" | "organization";

export interface GuideAuthor {
  /** Stable author id — also the `#author-{id}` fragment suffix in schema @id */
  id: GuideAuthorId;
  /** English display name (visible byline + Person.name) */
  name: string;
  /** Arabic display name (visible byline on /ar/guides pages) */
  arabicName: string;
  /** English byline title (visible only) */
  titleEn: string;
  /** Arabic byline title (visible only) */
  titleAr: string;
  /** JSON-LD `Person.jobTitle` (schema only) */
  jobTitle: string;
  /** External profile URLs — emitted in `Person.sameAs` (schema only) */
  sameAs?: string[];
}

export const AUTHOR_REGISTRY: Record<GuideAuthorId, GuideAuthor> = {
  "jamsheed-khalid": {
    id: "jamsheed-khalid",
    name: "Jamsheed Khalid",
    arabicName: "جمشيد خالد",
    titleEn: "Senior Fit-Out Consultant",
    titleAr: "مستشار أول للتشطيبات",
    jobTitle: "Senior Fit-Out Consultant & Structural Engineer",
    sameAs: [
      "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
      "https://gravatar.com/jamsheedkhalid",
    ],
  },
  "kavya-ramachandran": {
    id: "kavya-ramachandran",
    name: "Kavya Ramachandran",
    arabicName: "كافيا راماشاندران",
    titleEn: "Interior Designer",
    titleAr: "مصممة داخلية",
    jobTitle: "Interior Designer",
    // No LinkedIn on the source site — Gravatar only (verified).
    sameAs: ["https://gravatar.com/maximumglitter2857dbbf77"],
  },
  organization: {
    id: "organization",
    name: "Wasleen Liminal Approval Consultants",
    arabicName: "وسلين ليمينال لاستشارات الموافقات",
    titleEn: "Approval Consultants",
    titleAr: "استشاريو الموافقات",
    // Maps to the sitewide #organization — no Person node, no sameAs.
    jobTitle: "",
  },
};

/**
 * Explicit slug → author mapping (51 entries).
 *
 * Source of truth: plans/gsc-qa-author-schema-fix-plan.md §4.
 * Any slug NOT listed here resolves to "organization" via getGuideAuthor() —
 * fewer lines, zero risk of a typo corrupting an org page.
 */
export const GUIDE_AUTHORS: Record<string, GuideAuthorId> = {
  /* ── Jamsheed Khalid — engineering / Law 3 of 2026 / structural (39) ── */

  // pSEO kind:"qa" (25)
  "dm-building-permit-validity-period": "jamsheed-khalid",
  "who-needs-quality-safety-certificate-dubai": "jamsheed-khalid",
  "what-happens-if-you-dont-get-safety-certificate": "jamsheed-khalid",
  "why-dubai-introduced-building-safety-law-2026": "jamsheed-khalid",
  "law-3-2026-key-changes-explained": "jamsheed-khalid",
  "quality-safety-certificate-validity-renewal": "jamsheed-khalid",
  "documents-required-quality-safety-certificate": "jamsheed-khalid",
  "building-inspection-process-law-3-2026": "jamsheed-khalid",
  "law-3-2026-free-zone-buildings-guide": "jamsheed-khalid",
  "jointly-owned-property-owners-safety-certificate": "jamsheed-khalid",
  "how-to-choose-licensed-engineering-office-dubai": "jamsheed-khalid",
  "law-3-2026-appeal-process-guide": "jamsheed-khalid",
  "repeat-violation-penalties-law-3-2026": "jamsheed-khalid",
  "building-permit-suspension-law-3-2026": "jamsheed-khalid",
  "contractor-responsibilities-law-3-2026": "jamsheed-khalid",
  "building-management-obligations-law-3-2026": "jamsheed-khalid",
  "landlord-obligations-building-safety-law-2026": "jamsheed-khalid",
  "tenant-rights-demolition-law-3-2026": "jamsheed-khalid",
  "mep-systems-law-3-2026-compliance": "jamsheed-khalid",
  "property-investors-law-3-2026-impact": "jamsheed-khalid",
  "buying-property-without-safety-certificate-dubai": "jamsheed-khalid",
  "dubai-municipality-digital-building-portal": "jamsheed-khalid",
  "dubai-building-safety-law-tenant-guide": "jamsheed-khalid",
  "buildings-over-40-years-safety-certificate": "jamsheed-khalid",
  "engineering-office-responsibilities-law-3-2026": "jamsheed-khalid",

  // pSEO non-qa (11)
  "dm-building-permit-complete-guide": "jamsheed-khalid",
  "how-to-get-building-safety-certificate-dubai": "jamsheed-khalid",
  "law-3-2026-penalties-fines-guide": "jamsheed-khalid",
  "dubai-law-3-2026-complete-guide": "jamsheed-khalid",
  "building-maintenance-obligations-law-3-2026": "jamsheed-khalid",
  "law-3-2026-faq": "jamsheed-khalid",
  "building-safety-certificate-cost-dubai": "jamsheed-khalid",
  "law-3-2026-compliance-deadline-guide": "jamsheed-khalid",
  "building-safety-certificate-compliance-checklist": "jamsheed-khalid",
  "old-vs-new-building-safety-regulations-dubai": "jamsheed-khalid",
  "quality-safety-certificate-vs-completion-certificate-dubai": "jamsheed-khalid",

  // guides.ts type:"qa" (3)
  "how-long-does-dm-building-permit-take": "jamsheed-khalid",
  "change-of-usage-permit-guide": "jamsheed-khalid",
  "structural-modification-approval-guide": "jamsheed-khalid",

  /* ── Kavya Ramachandran — design / fit-out / drawings (12) ── */

  // pSEO (2)
  "dda-fit-out-permit-documents": "kavya-ramachandran",
  "dda-fit-out-approval-complete-guide": "kavya-ramachandran",

  // guides.ts type:"qa" (10)
  "dm-noc-for-renovation-guide": "kavya-ramachandran",
  "dso-fit-out-approval-guide": "kavya-ramachandran",
  "dubai-south-design-guidelines": "kavya-ramachandran",
  "dmcc-free-zone-approval-process": "kavya-ramachandran",
  "nakheel-renovation-approval-process": "kavya-ramachandran",
  "emaar-community-design-guidelines": "kavya-ramachandran",
  "interior-fit-out-permit-process": "kavya-ramachandran",
  "cad-drawing-standards-dubai-guide": "kavya-ramachandran",
  "as-built-drawing-requirements": "kavya-ramachandran",
  "3d-design-submission-guide": "kavya-ramachandran",
};

/**
 * Resolve the author for a guide slug.
 * Missing/unknown slugs fall back to the "organization" (company) author.
 */
export function getGuideAuthor(slug: string): GuideAuthor {
  return AUTHOR_REGISTRY[GUIDE_AUTHORS[slug] ?? "organization"];
}
