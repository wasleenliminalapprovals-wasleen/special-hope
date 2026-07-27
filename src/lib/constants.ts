/**
 * Sitewide constants — NAP (Name, Address, Phone) data and shared values.
 * Must remain byte-for-byte consistent with JSON-LD schema, footer, and GBP.
 */

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dubaiapprovalconsultants.com",
  name: "Wasleen Approvals",
  fullName: "Wasleen Liminal Approval Consultants",
  tagline: "Dubai Approvals Made Simple",
  description:
    "Expert Dubai approvals consultancy — DM, DDA, DEWA, DCD & more. Fast-track your project approvals with Wasleen Approvals.",
} as const;

export const NAP = {
  companyName: "Wasleen Liminal Approval Consultants",
  phone: "+971542330837",
  whatsapp: "+971542330837",
  email: "approvals@wasleen.com",
  address: {
    locality: "Dubai",
    region: "Dubai",
    country: "AE",
  },
  areaServed: "Dubai",
} as const;

export const SOCIAL = {
  facebook: "https://facebook.com/wasleenapprovals",
  instagram: "https://instagram.com/wasleenapprovals",
  linkedin: "https://linkedin.com/company/wasleenapprovals",
  twitter: "https://twitter.com/wasleenapprovals",
} as const;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-SJF4WHM8QJ";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
