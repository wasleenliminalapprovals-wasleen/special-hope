/**
 * Sitewide constants — NAP (Name, Address, Phone) data and shared values.
 * Must remain byte-for-byte consistent with JSON-LD schema, footer, and GBP.
 */

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dubaiapprovalconsultants.com",
  name: "Wasleen Approvals",
  fullName: "Wasleen Liminal Approval Consultants",
  tagline: "Dubai Approval Consultant Experts",
  description:
    "Expert Dubai approvals consultancy — DM, DDA, DEWA, DCD & more. Fast-track your project approvals with Wasleen Approvals.",
} as const;

export const NAP = {
  companyName: "Wasleen Liminal Approval Consultants",
  phone: "+971542330837",
  whatsapp: "+971542330837",
  email: "approvals@wasleen.com",
  address: {
    streetAddress: "Office 401, Darwish Building",
    addressLocality: "Al Qusais",
    addressRegion: "Dubai",
    addressCountry: "AE",
    postalCode: "",
  },
  areaServed: "Dubai",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/approvalsindubai",
  facebook: "https://www.facebook.com/profile.php?id=61592746433830",
  threads: "https://www.threads.com/@approvalsindubai",
  linkedin: "https://www.linkedin.com/in/wasleen-approvals-64038b425/",
  pinterest: "https://www.pinterest.com/wasleenliminalapprovals/",
  youtube: "https://www.youtube.com/channel/UC0nmieMmOpL4pvzRL98a-2w",
  tiktok: "https://www.tiktok.com/@approvals.in.dubai",
  reddit: "https://www.reddit.com/user/Dubai-Approvals-Team/",
  quora: "https://www.quora.com/profile/Wasleen-Liminal-Approvals",
} as const;

export const LOCALE = {
  default: "en-AE",
  alternatives: ["ar-AE"] as const,
} as const;

/**
 * Pre-filled WhatsApp message sent when users click any WhatsApp CTA.
 * URL-encoded automatically when constructing the wa.me link.
 * Keep professional and action-oriented.
 */
export const WHATSAPP_MESSAGE =
  "Hello Wasleen Liminal Approval Consultants, I have an approval enquiry for my project. Could you please share the next steps?";

/** Hub page slugs for building breadcrumbs and internal links */
export const HUB_SLUGS = {
  approvals: "/approvals",
  guides: "/guides",
  services: "/services",
  aboutUs: "/about-us",
  contactUs: "/contact-us",
} as const;

/** Default SEO metadata used as fallback for pages without custom values */
export const DEFAULT_SEO = {
  title: "Dubai Approvals Expert | DM, DDA, DEWA & DCD | Wasleen",
  description:
    "Expert Dubai approvals consultancy — DM, DDA, DEWA, DCD & more. Fast-track your project approvals with Wasleen Approvals. Contact us today.",
  ogImage: `${SITE.url}/og-image.png`,
  twitterHandle: "@wasleenapprovals",
} as const;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-SJF4WHM8QJ";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
