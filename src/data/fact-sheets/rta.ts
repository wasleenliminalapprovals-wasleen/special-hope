import type { FactSheet } from "../../types";

/**
 * Fact sheet — Roads & Transport Authority (RTA)
 * Single source of truth for verified RTA fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current RTA fee schedules before pages are marked "auto".
 */
export const rtaFactSheet: FactSheet = {
  key: "rta",
  name: "Roads and Transport Authority",
  nameAr: "هيئة الطرق والمواصلات",
  portalUrl: "https://www.rta.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Access / driveway NOC",
      amount: "≈ AED 100–500",
      notes: "For vehicle access onto RTA-controlled roads.",
    },
    {
      name: "Public transport / bus related NOC",
      amount: "≈ AED 200–1,000",
      notes: "Varies by permit type.",
    },
    {
      name: "Advertising / signage coordination (if road-visible)",
      amount: "≈ AED 500–2,000",
      notes: "Outdoor advertising permits.",
    },
    {
      name: "Building near-road coordination fee",
      amount: "Varies by scope",
      notes: "Setback / alignment review for properties fronting RTA roads.",
    },
  ],
  timelines: [
    { stage: "Application & document check", duration: "1–3 working days" },
    { stage: "Engineering / traffic review", duration: "3–10 working days" },
    { stage: "NOC issuance", duration: "2–5 working days after approval" },
  ],
  documents: [
    { name: "Dubai Municipality building permit / drawings", notes: "Site plan showing road frontage" },
    { name: "Traffic impact study", notes: "For larger developments" },
    { name: "Site / location plan", notes: "Showing access points" },
    { name: "Passport / Emirates ID of applicant", notes: "Authorised signatory" },
    { name: "Developer / community NOC", notes: "Where applicable" },
  ],
  notes:
    "RTA NOCs are typically required when a project fronts RTA-controlled roads or impacts traffic. All figures are indicative until lastVerified is set. Re-verify against rta.ae before publishing time-sensitive numbers.",
};
