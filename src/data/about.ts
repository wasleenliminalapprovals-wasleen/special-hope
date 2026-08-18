/**
 * About Us content — English (/about-us)
 *
 * "The Living Blueprint" — 11 drawing sheets + Sheet 02b that tell the
 * Wasleen Group story (Interior · Approvals · Pergolas · Digital) through
 * an architectural drawing-set visual language.
 *
 * This file is the SINGLE source of truth for English copy. `about-ar.ts`
 * mirrors it 1:1 (same structure, same images, same numbers) for the
 * `/ar/about-us` parity page. Every string that is visible on the page is
 * also surfaced verbatim in the JSON-LD schema stack (FAQPage, Person,
 * ItemList) — never reword it in the schema.
 *
 * Plan: plans/about-us-redesign-mega-plan.md §2 (copy) / §4.3 (files)
 * Rule: .roo/rules/03-SEO-AI-SEARCH-MASTER.md (visible text = schema text)
 */

/* ────────────────────────────────────────────────────────────
   Types (shared by EN + AR)
   ──────────────────────────────────────────────────────────── */

export type AboutLocale = "en" | "ar";

export interface AboutImage {
  /** Absolute path under /public — e.g. "/images/about-us/...". */
  src: string;
  /** Descriptive, keyword-relevant alt text (never "image" / "logo"). */
  alt: string;
  width: number;
  height: number;
  /** Only the Sheet 02 story image is `priority` (keeps LCP clean). */
  priority?: boolean;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface DivisionStripItem {
  id: "interior" | "approvals" | "pergolas" | "digital";
  label: string;
  /** lucide-react icon name (resolved in the component layer). */
  icon: string;
  youAreHere?: boolean;
  /** Outbound division URL — present only for non-active divisions (rendered as a real <a>). */
  href?: string;
  /** Open the division link in a new tab (external site). */
  external?: boolean;
}

export interface RevisionLogRow {
  rev: string;
  division: string;
  scope: string;
  status: string;
  youAreHere?: boolean;
}

export interface TimelineNode {
  year: string;
  label: string;
}

export interface CraftItem {
  id: string;
  image: AboutImage;
  caption: string;
}

export interface ParcelCard {
  id: "interior" | "approvals" | "pergolas" | "digital";
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  image?: AboutImage;
  /** Approval division keeps an amber border + no photo (visually distinct). */
  youAreHere?: boolean;
  /** Caption (mono) for image-backed parcels. */
  caption?: string;
}

export interface BentoCell {
  id: string;
  image: AboutImage;
  caption: string;
  /** bento span: "large" = 2×2, "wide" = 2×1, "square" = 1×1. */
  size: "large" | "wide" | "square";
  /** ±1–2° physical-photo rotation (A4) — direction mirrors in RTL (Q6). */
  rotation: number;
}

export interface CounterStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface FeaturePoint {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FounderCardData {
  id: string;
  /** Filled from client input — Blocker-4 (§8). */
  name: string;
  role: string;
  image: AboutImage;
  rev: string;
}

export interface DirectoryLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SheetMeta {
  id: string; // "sheet-01" … "sheet-11"
  number: string; // "01" …
  label: string; // mono title-block label, e.g. "OUR STORY"
}

export interface OfficeLocation {
  id: "approval" | "pergola-parking" | "cinemaxsky";
  /** Mono title-block caption above the map, e.g. "OFFICE 01 · APPROVAL CONSULTANTS". */
  caption: string;
  /** Full business name (NAP-identical for the head office). */
  name: string;
  /** Postal address rendered under the card heading. */
  address: string;
  /** Keyless Google Maps embed URL (pb= embed, or ?q=…&output=embed fallback). */
  embedSrc: string;
  /** Outbound directions target (Google Maps place / share / search URL). */
  directionsUrl: string;
}

export interface AboutMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  /** Real change date only (never artificially bumped). */
  dateModified: string;
  canonical: string;
}

export interface AboutContent {
  locale: AboutLocale;
  metadata: AboutMetadata;

  /** Cyanotype theme toggle labels (A1 / Q2) — locale-appropriate aria-labels + visible text. */
  toggle: {
    /** aria-label when the current theme is day → action switches to night. */
    toNight: string;
    /** aria-label when the current theme is night → action switches to day. */
    toDay: string;
    /** Visible label for the day state. */
    day: string;
    /** Visible label for the night state. */
    night: string;
  };

  /** Sheet rail copy (A5 / Q11) — locale-aware accessible name + per-link aria-label prefix. */
  sheetRail: {
    /** Accessible name for the rail group (rendered on the container). */
    label: string;
    /** Prefix for each per-sheet aria-label, e.g. "Go to sheet 03 — THE GROUP". */
    prefix: string;
  };

  /** Sheet index used by the sheet rail (A5) — order matters. */
  sheets: SheetMeta[];

  /* ── Sheet 01 · Hero ─────────────────────────────────── */
  hero: {
    eyebrow: string;
    h1: string;
    subhead: string;
    ctaPrimary: CtaLink; // WhatsApp
    ctaSecondary: CtaLink; // /approvals
    /** "YOU ARE HERE" marker label for the active division (DivisionStrip). */
    youAreHereLabel: string;
    divisions: DivisionStripItem[];
  };

  /* ── Sheet 02 · Our Story ────────────────────────────── */
  story: {
    heading: string;
    paragraphs: string[];
    revisionTitle: string;
    revisionRows: RevisionLogRow[]; // REV A · BUILDER → REV B · ENGINEER → REV C · APPROVALS
    approvedLabel: string; // "APPROVED" / "معتمد" — rendered on the static stamp in RevisionLogBlock
    timelineTitle: string;
    timeline: TimelineNode[];
    image: AboutImage;
    imageCaption: string;
  };

  /* ── Sheet 02b · The Craft Strip ─────────────────────── */
  craft: {
    heading: string;
    items: CraftItem[];
  };

  /* ── Sheet 03 · The Wasleen Group (Site Plan) ────────── */
  group: {
    heading: string;
    intro: string;
    tableCaption: string;
    tableHeaders: string[];
    tableRows: RevisionLogRow[];
    parcels: ParcelCard[];
    quote: string;
  };

  /* ── Sheet 03b · Selected Work (Physical Photo Bento) ── */
  work: {
    heading: string;
    intro: string;
    cells: BentoCell[];
  };

  /* ── Sheet 04 · Both Sides of the Counter ────────────── */
  bothSides: {
    heading: string;
    points: FeaturePoint[];
  };

  /* ── Sheet 05 · Numbers Band ─────────────────────────── */
  numbers: {
    heading: string;
    stats: CounterStat[];
  };

  /* ── Sheet 06 · Why Choose Wasleen ───────────────────── */
  why: {
    heading: string;
    cards: WhyCard[];
  };

  /* ── Sheet 07 · The People ───────────────────────────── */
  people: {
    heading: string;
    founders: FounderCardData[];
    reviewedBy: string;
  };

  /* ── Sheet 08 · Credentials ──────────────────────────── */
  credentials: {
    heading: string;
    paragraphs: string[];
    /* Locale labels so the shared component stays locale-agnostic while the
       Registered Address renders byte-for-byte from NAP (constants.ts). */
    addressLabel: string;
    licenseKey: string;
    licenseQualifier: string;
    licenseLabel: string;
    licenseHref: string;
    disclaimer: string;
    /* A6 stamp text — "APPROVED" / "معتمد" — rendered on the rubber stamp
       (mirrors the approvedLabel pattern on Sheet 02's revision log). */
    stampLabel: string;
  };

  /* ── Sheet 09 · Closing CTA ──────────────────────────── */
  closing: {
    line: string;
    ctaPrimary: CtaLink; // /free-quote
    ctaWhatsapp: CtaLink;
    ctaPhone: CtaLink;
    directoryTitle: string;
    directory: DirectoryLink[];
  };

  /* ── Sheet 10 · FAQ ──────────────────────────────────── */
  faq: {
    heading: string;
    items: FaqItem[];
  };

  /* ── Sheet 11 · Our Offices ──────────────────────────── */
  offices: {
    heading: string;
    /** Label for the "Get Directions" outbound link on each card. */
    directionsLabel: string;
    officeLocations: OfficeLocation[];
  };
}

/* ────────────────────────────────────────────────────────────
   Images (dims measured with scripts/get-webp-dims.mjs)
   ──────────────────────────────────────────────────────────── */

const IMG = {
  story: {
    src: "/images/about-us/interior-fit-out-project-management-dcd-compliance-dubai-wasleen-interiors-dubai-18.webp",
    alt: "Wasleen interior fit-out project management team reviewing DCD compliance drawings in Dubai",
    width: 1384,
    height: 1040,
    priority: true,
  } satisfies AboutImage,
  craftCnc: {
    src: "/images/about-us/pergola/aluminum-glass-cnc-machining.webp",
    alt: "Aluminium and glass CNC machining inside the Wasleen fabrication factory in Dubai",
    width: 2400,
    height: 1350,
  } satisfies AboutImage,
  craftWind: {
    src: "/images/about-us/pergola/aluminum-glass-wind-load-engineering.webp",
    alt: "Wind-load engineering calculations for aluminium glass structures at Wasleen Dubai",
    width: 1024,
    height: 915,
  } satisfies AboutImage,
  interior: {
    src: "/images/about-us/interior-fitout-company-dubai-wasleen.webp",
    alt: "Luxury villa interior fit-out delivered by Wasleen interior fit-out company in Dubai",
    width: 1920,
    height: 1080,
  } satisfies AboutImage,
  pergolaCarParking: {
    src: "/images/about-us/pergola/pergola-car-parking-ajman.webp",
    alt: "Modern car parking pergola structure built by Wasleen Pergolas in Ajman",
    width: 1384,
    height: 1040,
  } satisfies AboutImage,
  bentoVilla: {
    src: "/images/about-us/residential-interior-fitout-dubai-villa-design-wasleen.webp",
    alt: "Residential villa interior fit-out design completed by Wasleen Interiors in Dubai",
    width: 1920,
    height: 1080,
  } satisfies AboutImage,
  bentoOffice: {
    src: "/images/about-us/commercial-interior-fitout-dubai-office-renovation-wasleen.webp",
    alt: "Commercial office fit-out renovation delivered by Wasleen Interiors in Business Bay, Dubai",
    width: 1920,
    height: 1080,
  } satisfies AboutImage,
  bentoCarport: {
    src: "/images/about-us/pergola/aluminum-car-port-villas.webp",
    alt: "Aluminium carport for villas designed and installed by Wasleen Pergolas in Dubai",
    width: 1384,
    height: 1040,
  } satisfies AboutImage,
  bentoCinema: {
    src: "/images/about-us/luxury-home-cinema-design-dubai-wasleen-interiors-02.webp",
    alt: "Luxury home cinema interior design by Wasleen Interiors and CinemaxSky in Dubai",
    width: 900,
    height: 650,
  } satisfies AboutImage,
  bentoGlazing: {
    src: "/images/about-us/pergola/aluminum-lift-slide-doors-windows.webp",
    alt: "Heavy-duty aluminium lift-slide doors and windows installed by Wasleen in Al Quoz, Dubai",
    width: 1080,
    height: 1080,
  } satisfies AboutImage,
  founder: {
    src: "/images/Wasleen-interiors-fitouts-pergola-company-founder-owner.webp",
    alt: "Founder and owner of Wasleen interiors, fit-outs and pergola company in Dubai",
    width: 784,
    height: 1168,
  } satisfies AboutImage,
  cofounder: {
    src: "/images/Wasleen-interiors-fitouts-pergola-company-cofounder.webp",
    alt: "Co-founder of Wasleen interiors, fit-outs and pergola company in Dubai",
    width: 896,
    height: 1200,
  } satisfies AboutImage,
};

/* ────────────────────────────────────────────────────────────
   English content
   ──────────────────────────────────────────────────────────── */

export const aboutContent: AboutContent = {
  locale: "en",
  metadata: {
    title: "About Wasleen Approvals | Dubai Approval Consultants",
    description:
      "Meet Wasleen Liminal Approval Consultants — a builder-backed team behind 273+ group projects and 500+ Dubai approvals across 52+ types. Contact us today.",
    ogTitle: "About Wasleen Approvals | Dubai Approval Consultants",
    ogDescription:
      "Meet Wasleen Liminal Approval Consultants — a builder-backed team behind 273+ group projects and 500+ Dubai approvals across 52+ types.",
    dateModified: "2026-08-18",
    canonical: "https://www.dubaiapprovalconsultants.com/about-us",
  },

  toggle: {
    toNight: "Switch to night blueprint view",
    toDay: "Switch to day blueprint view",
    day: "Day",
    night: "Night",
  },

  sheetRail: {
    label: "Drawing sheets",
    prefix: "Go to sheet",
  },

  sheets: [
    { id: "sheet-01", number: "01", label: "HERO" },
    { id: "sheet-02", number: "02", label: "OUR STORY" },
    { id: "sheet-02b", number: "02B", label: "THE CRAFT" },
    { id: "sheet-03", number: "03", label: "THE GROUP" },
    { id: "sheet-03b", number: "03B", label: "SELECTED WORK" },
    { id: "sheet-04", number: "04", label: "BOTH SIDES" },
    { id: "sheet-05", number: "05", label: "THE NUMBERS" },
    { id: "sheet-06", number: "06", label: "WHY WASLEEN" },
    { id: "sheet-07", number: "07", label: "THE PEOPLE" },
    { id: "sheet-08", number: "08", label: "CREDENTIALS" },
    { id: "sheet-09", number: "09", label: "CONTACT" },
    { id: "sheet-10", number: "10", label: "FAQ" },
    { id: "sheet-11", number: "11", label: "OFFICES" },
  ],

  /* ── Sheet 01 · Hero ─────────────────────────────────── */
  hero: {
    eyebrow: "PART OF THE WASLEEN GROUP",
    h1: "We don't just know Dubai approvals. We've built the projects that needed them.",
    subhead:
      "Wasleen Liminal Approval Consultants grew out of Wasleen Interior & Fit-Out — 273+ real construction projects that taught us, permit by permit, exactly what Dubai's authorities expect. Today we handle 52+ approval types across every major jurisdiction.",
    ctaPrimary: { label: "Get Free Consultation", href: "https://wa.me/971567648220" },
    ctaSecondary: { label: "Explore Our Approvals", href: "/approvals" },
    youAreHereLabel: "YOU ARE HERE",
    divisions: [
      { id: "interior", label: "Interior", icon: "Home", href: "https://wasleen.com", external: true },
      { id: "approvals", label: "Approvals", icon: "Stamp", youAreHere: true },
      { id: "pergolas", label: "Pergolas", icon: "Sun", href: "https://www.pergolas.wasleen.com", external: true },
      { id: "digital", label: "Digital", icon: "Globe", href: "https://wasleen.com/wasleen-digital", external: true },
    ],
  },

  /* ── Sheet 02 · Our Story ────────────────────────────── */
  story: {
    heading: "How a builder became an approvals consultancy",
    paragraphs: [
      "Wasleen didn't start as an approvals consultancy. It started as a construction and interior fit-out company — the kind that shows up on-site, manages the joinery factory, runs the MEP, and hands over a finished villa or office. Over 273+ projects across Dubai, Abu Dhabi, Sharjah, and Ajman, one thing kept costing our clients more time and money than the build itself: getting a project through Dubai Municipality, DEWA, DCD, and free zone authorities before a single wall could go up.",
      "So we built that expertise in-house — registered engineers who could stamp DM-compliant drawings, a team that understood exactly what a DCD inspector checks for on a fire-safety NOC, relationships with the free zone authorities where our own projects were being built. Eventually that capability became a business of its own: Wasleen Liminal Approval Consultants.",
      "That's the difference between us and a firm that only ever pushes paperwork. We've been the applicant. We've been the contractor waiting on the approval. We know where submissions actually get rejected, because we've had our own drawings rejected — and learned exactly what to fix.",
    ],
    revisionTitle: "REVISION LOG",
    revisionRows: [
      { rev: "REV A", division: "BUILDER", scope: "EST. 2013", status: "INTERIOR" },
      { rev: "REV B", division: "ENGINEER", scope: "IN-HOUSE", status: "DM & DCD" },
      { rev: "REV C", division: "APPROVALS", scope: "52+ TYPES", status: "CURRENT" },
    ],
    approvedLabel: "APPROVED",
    timelineTitle: "GROUP TIMELINE",
    timeline: [
      { year: "2013", label: "INTERIOR" },
      { year: "2018", label: "APPROVALS" },
      { year: "2018", label: "PERGOLAS" },
      { year: "2020", label: "DIGITAL" },
    ],
    image: IMG.story,
    imageCaption: "DCD COMPLIANCE · FIT-OUT PM",
  },

  /* ── Sheet 02b · The Craft Strip ─────────────────────── */
  craft: {
    heading: "Built in-house. Approved in-house.",
    items: [
      {
        id: "factory-floor",
        image: IMG.craftCnc,
        caption: "OUR FACTORY FLOOR · Aluminium & glass fabrication under the same roof",
      },
      {
        id: "wind-load",
        image: IMG.craftWind,
        caption: "WIND-LOAD ENGINEERING · The same calculations behind our structural approvals",
      },
    ],
  },

  /* ── Sheet 03 · The Wasleen Group (Site Plan) ────────── */
  group: {
    heading: "One group, four crafts, one standard",
    intro:
      "Wasleen isn't a single company wearing different names. It's four specialisms that grew out of the same instinct — don't outsource the thing that matters, build the capability yourselves.",
    tableCaption: "GROUP REVISION LOG",
    tableHeaders: ["REV", "DIVISION", "SCOPE", "STATUS"],
    tableRows: [
      {
        rev: "A",
        division: "Wasleen Interior & Fit-Out",
        scope: "Residential & commercial fit-out, MEP, joinery, automation",
        status: "273+ projects · 7 emirates",
      },
      {
        rev: "B",
        division: "Wasleen Pergolas & CinemaxSky",
        scope: "Outdoor architecture, smart pergolas, carports, mezzanines",
        status: "Bioclimatic & smart structures",
      },
      {
        rev: "C",
        division: "Wasleen Liminal Approval Consultants",
        scope: "Government, free zone & developer approvals — 52+ types",
        status: "YOU ARE HERE",
        youAreHere: true,
      },
      {
        rev: "D",
        division: "Wasleen Digital Solutions",
        scope: "Custom-engineered websites for the group and outside clients",
        status: "Newest division",
      },
    ],
    parcels: [
      {
        id: "interior",
        title: "Wasleen Interior & Fit-Out",
        description:
          "Luxury villa and commercial fit-out, MEP, and joinery, delivered across all 7 emirates.",
        href: "https://wasleen.com",
        external: true,
        image: IMG.interior,
        caption: "INTERIOR · WASLEEN.COM",
      },
      {
        id: "approvals",
        title: "Wasleen Liminal Approval Consultants",
        description:
          "Government, free zone, and developer approvals across 52+ categories.",
        youAreHere: true,
      },
      {
        id: "pergolas",
        title: "Wasleen Pergolas & CinemaxSky",
        description:
          "Bioclimatic pergolas, smart outdoor structures, and luxury outdoor cinema design.",
        href: "https://pergolas.wasleen.com",
        external: true,
        image: IMG.pergolaCarParking,
        caption: "PERGOLAS · PERGOLAS.WASLEEN.COM",
      },
      {
        id: "digital",
        title: "Wasleen Digital Solutions",
        description:
          "Custom-engineered, zero-bloat websites built for speed and search visibility.",
        href: "https://wasleen.com/wasleen-digital",
        external: true,
      },
    ],
    quote:
      "Four businesses, one office culture: build it properly in-house, or don't do it at all.",
  },

  /* ── Sheet 03b · Selected Work (Physical Photo Bento) ── */
  work: {
    heading: "The work behind the approvals",
    intro:
      "A selection of projects from across the group — interiors and outdoor structures that moved through the approvals we manage.",
    cells: [
      {
        id: "villa-fitout",
        image: IMG.bentoVilla,
        caption: "PROJECT: VILLA FIT-OUT · DUBAI",
        size: "large",
        rotation: -1.5,
      },
      {
        id: "office-fitout",
        image: IMG.bentoOffice,
        caption: "OFFICE FIT-OUT · BUSINESS BAY",
        size: "square",
        rotation: 1,
      },
      {
        id: "carport",
        image: IMG.bentoCarport,
        caption: "ALUMINIUM CARPORT · VILLA",
        size: "square",
        rotation: -1,
      },
      {
        id: "cinema",
        image: IMG.bentoCinema,
        caption: "LUXURY CINEMA · CINEMAXSKY",
        size: "wide",
        rotation: 1.5,
      },
      {
        id: "glazing",
        image: IMG.bentoGlazing,
        caption: "LIFT-SLIDE GLAZING · AL QUOZ",
        size: "square",
        rotation: -1.25,
      },
    ],
  },

  /* ── Sheet 04 · Both Sides of the Counter ────────────── */
  bothSides: {
    heading: "We've stood on both sides of the counter",
    points: [
      {
        id: "own-drawings",
        icon: "FileCheck",
        title: "We've submitted our own drawings, not just clients'.",
        description:
          "Every DM and DCD submission process we manage for you, we've run for our own live construction sites.",
      },
      {
        id: "inspectors",
        icon: "ClipboardCheck",
        title: "We know what inspectors actually check.",
        description:
          "DCD fire-safety NOCs, DEWA load assessments, DDA fit-out approvals — our own crews have been inspected against these standards, not just read about them.",
      },
      {
        id: "rejections",
        icon: "Construction",
        title: "273+ built projects taught us where approvals go wrong.",
        description:
          "Most rejected submissions fail for the same handful of reasons. We've seen those reasons from the contractor's side of the desk.",
      },
      {
        id: "one-roof",
        icon: "Users",
        title: "One group, four specialisms, one point of contact.",
        description:
          "Approvals and fit-out and outdoor structures and a website that converts — four conversations with people who already work under one roof.",
      },
    ],
  },

  /* ── Sheet 05 · Numbers Band ─────────────────────────── */
  numbers: {
    heading: "Wasleen by the numbers",
    stats: [
      { id: "years", value: 8, suffix: "+", label: "YEARS OF APPROVALS" },
      { id: "approvals", value: 500, suffix: "+", label: "APPROVALS DELIVERED" },
      { id: "projects", value: 273, suffix: "+", label: "GROUP PROJECTS BUILT" },
      { id: "divisions", value: 4, suffix: "", label: "IN-HOUSE DIVISIONS" },
    ],
  },

  /* ── Sheet 06 · Why Choose Wasleen ───────────────────── */
  why: {
    heading: "Why choose Wasleen?",
    cards: [
      {
        id: "regulatory",
        icon: "Shield",
        title: "Regulatory Expertise",
        description:
          "Deep knowledge of Dubai's regulatory landscape across DM, DDA, DEWA, DCD, free zones, and developer authorities.",
      },
      {
        id: "track-record",
        icon: "Award",
        title: "Proven Track Record",
        description:
          "500+ successful approvals delivered across residential, commercial, and industrial projects in Dubai.",
      },
      {
        id: "support",
        icon: "Users",
        title: "Dedicated Support",
        description:
          "Personal account managers who understand your project and provide real-time updates throughout the process.",
      },
      {
        id: "end-to-end",
        icon: "BadgeCheck",
        title: "End-to-End Service",
        description:
          "From document preparation to final approval delivery — we handle everything so you can focus on your project.",
      },
    ],
  },

  /* ── Sheet 07 · The People ───────────────────────────── */
  people: {
    heading: "The people who build the ecosystem",
    founders: [
      {
        id: "founder",
        name: "Jamsheed Khalid",
        role: "FOUNDER & OWNER",
        image: IMG.founder,
        rev: "REV A",
      },
      {
        id: "cofounder",
        name: "Kavya Ramachandran",
        role: "CO-FOUNDER",
        image: IMG.cofounder,
        rev: "REV A",
      },
    ],
    reviewedBy: "Reviewed by Jamsheed Khalid, Founder & Owner",
  },

  /* ── Sheet 08 · Credentials ──────────────────────────── */
  credentials: {
    heading: "Our Credentials",
    paragraphs: [
      "Wasleen Liminal Approval Consultants is a registered consultancy based in Dubai, United Arab Emirates. We operate in full compliance with UAE commercial regulations and maintain active working relationships with all major regulatory authorities.",
    ],
    addressLabel: "Registered Address:",
    licenseKey: "License:",
    licenseQualifier: "Professional consultancy —",
    licenseLabel: "view our DED trade license & verification details",
    licenseHref: "/license",
    disclaimer:
      "* Specific license numbers and registration details are available to verified clients during the onboarding process.",
    stampLabel: "APPROVED",
  },

  /* ── Sheet 09 · Closing CTA ──────────────────────────── */
  closing: {
    line: "One call gets you the whole group — not just one service.",
    ctaPrimary: { label: "Get Free Quote", href: "/free-quote" },
    ctaWhatsapp: { label: "WhatsApp Us", href: "https://wa.me/971567648220" },
    ctaPhone: { label: "Call +971 56 764 8220", href: "tel:+971567648220" },
    directoryTitle: "THE GROUP",
    directory: [
      { id: "interior", label: "Wasleen Interior & Fit-Out", href: "https://wasleen.com", external: true },
      { id: "approvals", label: "Wasleen Liminal Approval Consultants", href: "/approvals" },
      { id: "pergolas", label: "Wasleen Pergolas & CinemaxSky", href: "https://pergolas.wasleen.com", external: true },
      { id: "digital", label: "Wasleen Digital Solutions", href: "https://wasleen.com/wasleen-digital", external: true },
    ],
  },

  /* ── Sheet 10 · FAQ ──────────────────────────────────── */
  faq: {
    heading: "Frequently asked questions about Wasleen",
    items: [
      {
        question: "What is Wasleen Liminal Approval Consultants?",
        answer:
          "Wasleen Liminal Approval Consultants is the approvals division of the Wasleen Group, a Dubai-based construction, interior fit-out, pergola, and digital group. We manage government, free zone, and developer approvals — 52+ types — including Dubai Municipality, DEWA, DCD, and DDA.",
      },
      {
        question: "Is Wasleen a licensed approvals consultancy?",
        answer:
          "Yes. Wasleen Liminal Approval Consultants holds an active DED trade license (No. 1188577) for engineering consultancy, technical drawing, and approval facilitation in Dubai, UAE. [View our license](/license).",
      },
      {
        question: "How is Wasleen different from other approval consultants?",
        answer:
          "We grew out of an interior fit-out and construction business with 273+ built projects. We've submitted our own drawings, run our own construction sites, and been inspected against the same standards we help you meet.",
      },
      {
        question: "Does the Wasleen Group provide services beyond approvals?",
        answer:
          "Yes. The group includes Wasleen Interior & Fit-Out, Wasleen Pergolas & CinemaxSky, and Wasleen Digital Solutions — one point of contact across the four divisions.",
      },
    ],
  },

  /* ── Sheet 11 · Our Offices ──────────────────────────── */
  offices: {
    heading: "Three sites. One group. You're never far from a desk that knows approvals.",
    directionsLabel: "GET DIRECTIONS",
    officeLocations: [
      {
        id: "approval",
        caption: "OFFICE 01 · APPROVAL CONSULTANTS",
        name: "Wasleen Liminal Approval Consultants",
        address: "Office 401, Darwish Building, Al Qusais, Dubai",
        embedSrc:
          "https://www.google.com/maps?q=Office%20401%2C%20Darwish%20Building%2C%20Al%20Qusais%2C%20Dubai&output=embed",
        directionsUrl: "https://maps.app.goo.gl/rXPMW76p6HLcB8zm6",
      },
      {
        id: "pergola-parking",
        caption: "OFFICE 02 · INTERIOR & FITOUT",
        name: "Wasleen Technical Services — Interior & Fitout Solutions",
        address: "Dubai, United Arab Emirates",
        embedSrc:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.447891748681!2d55.299419775383804!3d25.255514377673393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f436925673a6f%3A0xdd525a8229093985!2sWasleen%20Technical%20Services%20%E2%80%93%20Pergola%20%26%20Car%20Parking%20Solutions%20in%20Dubai!5e0!3m2!1sen!2sae!4v1785229567827!5m2!1sen!2sae",
        directionsUrl:
          "https://www.google.com/maps/search/?api=1&query=Wasleen%20Technical%20Services%20Pergola%20%26%20Car%20Parking%20Solutions%20Dubai",
      },
      {
        id: "cinemaxsky",
        caption: "OFFICE 03 · PERGOLAS & CINEMAXSKY",
        name: "Wasleen Pergolas & CinemaxSky",
        address: "Dubai, United Arab Emirates",
        embedSrc:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1380597540597!2d55.38031657538407!3d25.265940777666803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1176f7006181aff%3A0x734697b9bc64aefe!2sWasleen%20Pergolas%20%26%20CinemaxSky!5e0!3m2!1sen!2sae!4v1785229637998!5m2!1sen!2sae",
        directionsUrl:
          "https://www.google.com/maps/search/?api=1&query=Wasleen%20Pergolas%20%26%20CinemaxSky%20Dubai",
      },
    ],
  },
};
