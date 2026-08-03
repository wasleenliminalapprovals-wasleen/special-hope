import type { FactSheet } from "../../types";

/**
 * Fact sheet — RERA / Ejari registration
 * Single source of truth for verified RERA-Ejari fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current RERA/DLD fee schedules before pages are marked "auto".
 */
export const reraFactSheet: FactSheet = {
  key: "rera",
  name: "Real Estate Regulatory Agency (RERA) — Ejari",
  nameAr: "مؤسسة التنظيم العقاري — إيجاري",
  portalUrl: "https://dubailand.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Ejari registration",
      amount: "≈ AED 220 + knowledge & innovation dirham",
      notes: "Per tenancy contract; re-registration on renewal.",
    },
    {
      name: "Ejari renewal",
      amount: "≈ AED 150–220",
      notes: "On contract renewal, subject to RERA schedule.",
    },
    {
      name: "RERA permit (real estate / property)",
      amount: "Varies by permit type",
      notes: "For developers, brokers and owners' association matters.",
    },
  ],
  timelines: [
    { stage: "Submission via Ejari portal / typing centre", duration: "Same day" },
    { stage: "Validation & registration", duration: "1–2 working days" },
    { stage: "Issuance of Ejari certificate", duration: "Immediate on approval" },
  ],
  documents: [
    { name: "Valid tenancy contract (signed by both parties)", notes: "Original + copy" },
    { name: "Title deed copy (for landlord)", notes: "Or registered lease" },
    { name: "Emirates ID / passport of tenant & landlord", notes: "Copies" },
    { name: "DEWA bill / property ownership confirmation", notes: "As required by portal" },
    { name: "Knowledge dirham receipt", notes: "Paid at submission" },
  ],
  notes:
    "Ejari is the mandatory tenancy registration that DEWA, DM and licensing authorities cross-check. All figures are indicative until lastVerified is set. Re-verify against dubailand.gov.ae / RERA before publishing time-sensitive numbers.",
};
