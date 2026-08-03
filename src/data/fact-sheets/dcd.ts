import type { FactSheet } from "../../types";

/**
 * Fact sheet — Dubai Civil Defense (DCD)
 * Single source of truth for verified DCD fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current DCD fee schedules before pages are marked "auto".
 */
export const dcdFactSheet: FactSheet = {
  key: "dcd",
  name: "Dubai Civil Defense",
  nameAr: "الدفاع المدني بدبي",
  portalUrl: "https://www.dcd.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Fire & life safety (FLS) plan review fee",
      amount: "≈ AED 1,000–5,000",
      notes: "Tiered by building area and occupancy classification.",
    },
    {
      name: "Civil defense NOC fee",
      amount: "≈ AED 100–500",
      notes: "Per NOC for works/fit-outs under DCD scope.",
    },
    {
      name: "Fire alarm / suppression system approval",
      amount: "≈ AED 500–2,000",
      notes: "Varies by system size and type (sprinkler, FM200, etc.).",
    },
    {
      name: "Final compliance / certificate of completion",
      amount: "≈ AED 500–2,000",
      notes: "After successful inspection sign-off.",
    },
  ],
  timelines: [
    { stage: "Initial application & document check", duration: "1–3 working days" },
    { stage: "Fire & life safety plan review", duration: "5–15 working days" },
    { stage: "NOC issuance", duration: "2–5 working days after approval" },
    { stage: "Site inspection (during / final)", duration: "Within 5 working days of request" },
  ],
  documents: [
    { name: "Dubai Municipality building permit", notes: "Issued / in progress" },
    { name: "Architectural & fire protection drawings", notes: "FLS sheets showing egress, suppression, alarm zones" },
    { name: "Fire & life safety calculations / report", notes: "From certified FLS consultant" },
    { name: "NOC / approval from other authorities", notes: "As applicable to the occupancy" },
    { name: "Application form + applicable fees", notes: "Via DCD / DubaiNow portal" },
  ],
  notes:
    "DCD requirements are occupancy-driven and strictly enforced for fire safety. All figures are indicative until lastVerified is set. Re-verify against dcd.gov.ae before publishing time-sensitive numbers.",
};
