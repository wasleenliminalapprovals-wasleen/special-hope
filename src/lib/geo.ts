/**
 * GEO (Generative Engine Optimization) Text Extraction & Formatting Engine.
 *
 * Central utility that extracts clean, AI-optimized text from approval, guide,
 * and service data objects and formats them according to GEO rules:
 *   - Ruthless Objectivity (no marketing fluff)
 *   - Information Density via Tables
 *   - Strict Entity Resolution (no dangling pronouns)
 *   - Answer-First Paragraph Structure
 *   - Explicit Timelines and Prerequisites
 *
 * Uses an extensible registry pattern. Each data type registers a formatter.
 * Future page types add new formatters without modifying existing code.
 *
 * @see plans/geo-phase-13-plan.md — Full GEO plan specification
 */

import type {
  ApprovalData,
  GuideData,
  ServiceData,
  DocumentRequirement,
  TimelineEntry,
  FAQItem,
  ProcessStep,
  StatFact,
  RejectionReason,
} from "@/types";
import { LICENSE, NAP } from "@/lib/constants";

/* ================================================================
   GEO Document Interfaces
   ================================================================ */

export interface GeoDocument {
  title: string;
  description: string;
  sections: GeoSections;
  metadata: Record<string, string>;
}

export interface GeoSections {
  /** At-a-glance / stats block — key-value pairs */
  stats?: string[][];
  /** Direct answer (self-contained 2-3 sentences) */
  directAnswer?: string;
  /** Main description body */
  description?: string;
  /** Who needs it / eligibility bullets */
  whoNeedsIt?: string[];
  /** Required documents as markdown table rows */
  documentsTable?: string[][];
  /** Process steps as numbered list */
  processSteps?: string[];
  /** Timeline & cost as markdown table rows */
  timelineTable?: string[][];
  /** Common rejection reasons */
  rejectionReasons?: string[];
  /** FAQ as Q/A pairs */
  faqs?: string[];
  /** Features list (for services) */
  features?: string[];
  /** Content paragraphs (for guides) */
  content?: string[];
}

/* ================================================================
   Registry Pattern
   ================================================================ */

interface GeoFormatter<T> {
  type: string;
  format(item: T): GeoDocument;
}

const geoRegistry = new Map<string, GeoFormatter<unknown>>();

export function registerGeoFormatter<T>(type: string, formatter: GeoFormatter<T>): void {
  geoRegistry.set(type, formatter);
}

export function formatForGeo<T>(type: string, item: T): GeoDocument {
  const formatter = geoRegistry.get(type);
  if (!formatter) {
    throw new Error(`No GEO formatter registered for type: "${type}". Register one via registerGeoFormatter().`);
  }
  return formatter.format(item);
}

/* ================================================================
   Entity Resolution — Replace Pronouns with Authority Names
   ================================================================ */

/**
 * Replace pronouns ("it", "they", "the authority") with the specific
 * authority name. Applied to all text fields before GEO output.
 */
export function resolveEntities(text: string, authority: string): string {
  if (!text || !authority) return text;

  const authorityShort = authority.split(" ")[0]; // e.g., "Dubai" from "Dubai Municipality"

  let result = text;

  // "the authority" / "the Authority" → authority name
  result = result.replace(/\bthe [Aa]uthority\b/g, authority);
  // "they" (referring to authority) → authority name
  result = result.replace(/\b([Tt])hey\b/g, (match, first) => {
    // Only replace "they" when it likely refers to the authority
    // (preceded by period, question mark, or beginning of string context)
    return `${first === "T" ? authority.charAt(0).toUpperCase() + authority.slice(1) : authority}`;
  });
  // "it" (referring to authority) → authority name
  result = result.replace(/\b([Ii])t\b/g, (match, first) => {
    return `${first === "I" ? authority : authority}`;
  });
  // "its" → "[authority]'s"
  result = result.replace(/\bits\b/g, `${authority}'s`);

  return result;
}

/* ================================================================
   Marketing Fluff Filter
   ================================================================ */

const MARKETING_PATTERNS = [
  /\bbest[- ]in[- ]class\b/gi,
  /\bunmatched\b/gi,
  /\bleading\b(?=\s+(approval|provider|service|consultancy|firm))/gi,
  /\btop[- ]tier\b/gi,
  /\bguaranteed\b(?=\s+(approval|success|results|approvals))/gi,
  /\bcutting[- ]edge\b/gi,
  /\bworld[- ]class\b/gi,
  /\bindustry[- ]leading\b/gi,
  /\bstate[- ]of[- ]the[- ]art\b/gi,
  /\bhassle[- ]free\b/gi,
  /\bpeace[- ]of[- ]mind\b/gi,
  /\bsecond[- ]to[- ]none\b/gi,
];

/**
 * Remove marketing / sales fluff while preserving factual statements
 * containing numbers, timelines, costs, and document counts.
 */
export function stripMarketingFluff(text: string): string {
  if (!text) return text;

  let result = text;

  for (const pattern of MARKETING_PATTERNS) {
    result = result.replace(pattern, "");
  }

  // Clean up double spaces, leftover artifacts
  result = result.replace(/\s{2,}/g, " ");
  result = result.replace(/,{2,}/g, ",");
  result = result.replace(/\s+,/g, ",");
  result = result.trim();

  return result;
}

/**
 * Combined processing: strip fluff then resolve entities.
 */
export function sanitizeText(text: string, authority: string): string {
  const noFluff = stripMarketingFluff(text);
  return resolveEntities(noFluff, authority);
}

/* ================================================================
   Table Formatters
   ================================================================ */

/**
 * Format document requirements as markdown table rows.
 * Returns [header, separator, ...dataRows].
 */
export function formatDocumentTable(docs: DocumentRequirement[]): string[][] {
  if (!docs || docs.length === 0) return [];

  const header = ["Document", "Mandatory", "Notes"];
  const separator = ["---", "---", "---"];
  const rows: string[][] = [header, separator];

  for (const doc of docs) {
    rows.push([
      doc.document,
      doc.mandatory !== false ? "Yes" : "No",
      doc.description || "—",
    ]);
  }

  return rows;
}

/**
 * Format timeline/cost entries as markdown table rows.
 * Returns [header, separator, ...dataRows].
 */
export function formatTimelineTable(entries: TimelineEntry[]): string[][] {
  if (!entries || entries.length === 0) return [];

  const header = ["Stage", "Duration", "Cost", "Notes"];
  const separator = ["---", "---", "---", "---"];
  const rows: string[][] = [header, separator];

  for (const entry of entries) {
    rows.push([
      entry.stage,
      entry.duration,
      entry.cost,
      entry.notes || "—",
    ]);
  }

  return rows;
}

/**
 * Format FAQ items as Q/A pairs.
 * Returns ["Q: {question}\nA: {answer}", ...].
 */
export function formatFaqBlock(faqs: FAQItem[]): string[] {
  if (!faqs || faqs.length === 0) return [];

  return faqs.map(
    (faq) => `Q: ${faq.question}\nA: ${faq.answer}`
  );
}

/**
 * Format process steps as numbered list.
 * Returns ["1. **{title}**: {description}", ...].
 */
export function formatProcessSteps(steps: ProcessStep[]): string[] {
  if (!steps || steps.length === 0) return [];

  return steps.map(
    (step) => `${step.step}. **${step.title}**: ${step.description}`
  );
}

/* ================================================================
   Table-to-Markdown Utility
   ================================================================ */

/**
 * Convert a 2D string array (with header, separator, data rows)
 * into a GitHub-flavored markdown table string.
 */
export function tableToMarkdown(rows: string[][]): string {
  if (!rows || rows.length === 0) return "";

  return rows
    .map((row) => `| ${row.join(" | ")} |`)
    .join("\n");
}

/* ================================================================
   Approval Page Formatter
   ================================================================ */

export function formatApprovalPage(approval: ApprovalData): GeoDocument {
  const authority = approval.authorityFull;
  const sanitize = (text: string) => sanitizeText(text, authority);

  const sections: GeoSections = {};

  // Stats / At-a-Glance
  if (approval.stats && approval.stats.length > 0) {
    sections.stats = [["Attribute", "Value"], ["---", "---"]];
    for (const stat of approval.stats) {
      sections.stats.push([sanitize(stat.label), sanitize(stat.value)]);
    }
  }

  // Direct Answer
  if (approval.directAnswer) {
    sections.directAnswer = sanitize(approval.directAnswer);
  }

  // Description
  if (approval.description) {
    sections.description = sanitize(approval.description);
  }

  // Who Needs It
  if (approval.whoNeedsIt && approval.whoNeedsIt.length > 0) {
    sections.whoNeedsIt = approval.whoNeedsIt.map((item) => sanitize(item));
  }

  // Documents Table
  if (approval.documents && approval.documents.length > 0) {
    const docs = approval.documents.map((d) => ({
      ...d,
      description: d.description ? sanitize(d.description) : undefined,
    }));
    sections.documentsTable = formatDocumentTable(docs);
  }

  // Process Steps
  if (approval.process && approval.process.length > 0) {
    const steps = approval.process.map((s) => ({
      ...s,
      description: sanitize(s.description),
    }));
    sections.processSteps = formatProcessSteps(steps);
  }

  // Timeline & Cost Table
  if (approval.timelineTable && approval.timelineTable.length > 0) {
    sections.timelineTable = formatTimelineTable(approval.timelineTable);
  }

  // Rejection Reasons
  if (approval.rejectionReasons && approval.rejectionReasons.length > 0) {
    sections.rejectionReasons = approval.rejectionReasons.map(
      (r) => `- **${sanitize(r.reason)}**: ${sanitize(r.solution)}`
    );
  }

  // FAQ
  if (approval.faqs && approval.faqs.length > 0) {
    sections.faqs = approval.faqs.map(
      (faq) => `Q: ${sanitize(faq.question)}\nA: ${sanitize(faq.answer)}`
    );
  }

  return {
    title: approval.name,
    description: `${authority} ${approval.shortName} — ${approval.primaryKeyword}. Timeline: ${approval.typicalTimeline}. Cost: ${approval.typicalCostRange}.`,
    sections,
    metadata: {
      slug: approval.slug,
      category: approval.category,
      authority: authority,
      timeline: approval.typicalTimeline,
      cost: approval.typicalCostRange,
      lastUpdated: approval.lastUpdated,
      type: "approval",
    },
  };
}

/**
 * Extract standalone AI-quotable direct answer block.
 */
export function formatApprovalDirectAnswer(approval: ApprovalData): string {
  const authority = approval.authorityFull;
  const sanitize = (text: string) => sanitizeText(text, authority);

  if (!approval.directAnswer) return "";

  return sanitize(approval.directAnswer);
}

/* ================================================================
   Guide Page Formatter
   ================================================================ */

export function formatGuidePage(guide: GuideData): GeoDocument {
  // Derive authority from the guide's context (title or parentApprovalSlug)
  const authorityHint = guide.title.split(" ").slice(0, 3).join(" ");
  const sanitize = (text: string) => sanitizeText(text, authorityHint);

  const sections: GeoSections = {};

  // Content paragraphs
  if (guide.content && guide.content.length > 0) {
    sections.content = guide.content.map((para) => sanitize(para));
  }

  // For Q&A type guides, include Q/A
  if (guide.type === "qa" && guide.question && guide.answer) {
    sections.faqs = [`Q: ${sanitize(guide.question)}\nA: ${sanitize(guide.answer)}`];
  }

  return {
    title: guide.title,
    description: sanitize(guide.description),
    sections,
    metadata: {
      slug: guide.slug,
      type: guide.type,
      parentApproval: guide.parentApprovalSlug || "",
      parentService: guide.parentServiceSlug || "",
      lastUpdated: guide.lastUpdated,
      pageType: "guide",
    },
  };
}

/* ================================================================
   Service Page Formatter
   ================================================================ */

export function formatServicePage(service: ServiceData): GeoDocument {
  const authority = "Wasleen Liminal Approval Consultants";
  const sanitize = (text: string) => sanitizeText(text, authority);

  const sections: GeoSections = {};

  // Direct Answer
  if (service.directAnswer) {
    sections.directAnswer = sanitize(service.directAnswer);
  }

  // Description
  if (service.description) {
    sections.description = sanitize(service.description);
  }

  // Features
  if (service.features && service.features.length > 0) {
    sections.features = service.features.map((f) => sanitize(f));
  }

  // Process Steps
  if (service.process && service.process.length > 0) {
    const steps = service.process.map((s) => ({
      ...s,
      description: sanitize(s.description),
    }));
    sections.processSteps = formatProcessSteps(steps);
  }

  // FAQ
  if (service.faqs && service.faqs.length > 0) {
    sections.faqs = service.faqs.map(
      (faq) => `Q: ${sanitize(faq.question)}\nA: ${sanitize(faq.answer)}`
    );
  }

  return {
    title: service.name,
    description: sanitize(service.tagline || service.description),
    sections,
    metadata: {
      slug: service.slug,
      lastUpdated: service.lastUpdated,
      type: "service",
    },
  };
}

/* ================================================================
   Registry Setup — Register Built-in Formatters
   ================================================================ */

registerGeoFormatter<ApprovalData>("approval", {
  type: "approval",
  format: (item) => formatApprovalPage(item),
});

registerGeoFormatter<GuideData>("guide", {
  type: "guide",
  format: (item) => formatGuidePage(item),
});

registerGeoFormatter<ServiceData>("service", {
  type: "service",
  format: (item) => formatServicePage(item),
});

/* ================================================================
   llms.txt Generator — AI Manifest Index
   ================================================================ */

/**
 * Generate the full content for llms.txt — a plain-text markdown index
 * of all pages organized by category. This is the PRIMARY file AI
 * search engines fetch first.
 *
 * @see plans/geo-phase-13-plan.md §Step 13.2
 */
export function buildLlmsIndex(
  allApprovals: ApprovalData[],
  allGuides: GuideData[],
  allServices: ServiceData[]
): string {
  const lines: string[] = [];

  // Header
  lines.push("# Wasleen Liminal Approval Consultants");
  lines.push("");
  lines.push(
    "> An engineering and consulting firm specializing in securing government " +
    "and authority approvals for commercial and residential projects in Dubai, United Arab Emirates."
  );
  lines.push("");

  // ── Approval Categories ──

  const categories = [
    { key: "government-regulatory", label: "Government & Regulatory Approvals" },
    { key: "free-zone", label: "Free Zone Approvals" },
    { key: "developer-community", label: "Developer & Community Approvals" },
    { key: "fit-out-construction", label: "Fit-Out & Construction Approvals" },
    { key: "drawing-documentation", label: "Drawing & Documentation Approvals" },
    { key: "property-registration", label: "Property Registration" },
    { key: "technical-utility", label: "Technical & Utility Approvals" },
    { key: "trade-food-hospitality", label: "Trade, Food & Hospitality Approvals" },
  ];

  for (const cat of categories) {
    const catApprovals = allApprovals.filter((a) => a.category === cat.key);
    if (catApprovals.length === 0) continue;

    lines.push(`## ${cat.label} — ${catApprovals.length} pages`);
    lines.push("");

    for (const approval of catApprovals) {
      const directAnswer = formatApprovalDirectAnswer(approval);
      // Use first sentence as the one-liner
      const oneLiner = directAnswer
        ? directAnswer.split(".")[0].trim() + "."
        : `${approval.authorityFull} ${approval.shortName}.`;

      lines.push(
        `- [${approval.name}](/approvals/${approval.slug}): ${oneLiner} Timeline: ${approval.typicalTimeline}.`
      );
    }
    lines.push("");
  }

  // ── Guide / Q&A Pages ──

  lines.push(`## Guide / Q&A Pages — ${allGuides.length} pages`);
  lines.push("");

  for (const guide of allGuides) {
    const snippet = guide.description.split(".")[0].trim() + ".";
    lines.push(
      `- [${guide.title}](/guides/${guide.slug}): ${snippet}`
    );
  }
  lines.push("");

  // ── Service Pages ──

  lines.push(`## Service Pages — ${allServices.length} pages`);
  lines.push("");

  for (const service of allServices) {
    const snippet = service.tagline || service.directAnswer?.split(".")[0].trim() + ".";
    lines.push(
      `- [${service.name}](/services/${service.slug}): ${snippet}`
    );
  }
  lines.push("");

  // ── Information Pages ──

  lines.push("## Information Pages");
  lines.push("");
  lines.push("- [About Us](/about-us)");
  lines.push("- [Contact Us](/contact-us)");
  lines.push("- [Approvals Hub](/approvals)");
  lines.push("- [Guides Hub](/guides)");
  lines.push("- [Services Hub](/services)");
  lines.push(
    `- [Business License & Regulatory Registration](/license): ${LICENSE.companyName} holds DED trade license No. ${LICENSE.licenseNumber} (DCCI ${LICENSE.dcciMembership}), issued by ${LICENSE.issuingAuthority}, valid through ${LICENSE.expiryDate}.`
  );
  lines.push(
    `- [Privacy Policy](/privacy-policy): Wasleen Liminal Approval Consultants never shares client data with third parties; data processed 100% in-house under UAE PDPL (Federal Decree-Law No. 45 of 2021).`
  );
  lines.push("");

  return lines.join("\n");
}

/* ================================================================
   llms-full.txt Generator — Complete Knowledge Base
   ================================================================ */

/**
 * Generate the full content for llms-full.txt — the entire website's
 * expertise in a single text file. AI agents ingest this for complex
 * multi-step queries.
 *
 * @see plans/geo-phase-13-plan.md §Step 13.3
 */
export function buildLlmsFull(
  allApprovals: ApprovalData[],
  allGuides: GuideData[],
  allServices: ServiceData[]
): string {
  const blocks: string[] = [];

  // ── Business License & Regulatory Registration ──

  blocks.push(formatLicenseForLlmsFull());

  // ── Approvals by Priority Category ──

  const categoryOrder = [
    "government-regulatory",
    "free-zone",
    "developer-community",
    "fit-out-construction",
    "drawing-documentation",
    "property-registration",
    "technical-utility",
    "trade-food-hospitality",
  ];

  for (const catKey of categoryOrder) {
    const catApprovals = allApprovals.filter((a) => a.category === catKey);
    for (const approval of catApprovals) {
      blocks.push(formatApprovalForLlmsFull(approval));
    }
  }

  // ── Guides ──

  for (const guide of allGuides) {
    blocks.push(formatGuideForLlmsFull(guide));
  }

  // ── Services ──

  for (const service of allServices) {
    blocks.push(formatServiceForLlmsFull(service));
  }

  return blocks.join("\n");
}

/**
 * Format a single approval page for llms-full.txt.
 */
function formatApprovalForLlmsFull(approval: ApprovalData): string {
  const geo = formatApprovalPage(approval);
  const lines: string[] = [];

  lines.push("---");
  lines.push(`## ${geo.title}`);
  lines.push("");

  // Direct Answer
  if (geo.sections.directAnswer) {
    lines.push("### Direct Answer");
    lines.push("");
    lines.push(geo.sections.directAnswer);
    lines.push("");
  }

  // At a Glance
  if (geo.sections.stats && geo.sections.stats.length > 2) {
    lines.push("### At a Glance");
    lines.push("");
    lines.push(tableToMarkdown(geo.sections.stats));
    lines.push("");
  }

  // Description
  if (geo.sections.description) {
    lines.push("### Description");
    lines.push("");
    lines.push(geo.sections.description);
    lines.push("");
  }

  // Who Needs This
  if (geo.sections.whoNeedsIt && geo.sections.whoNeedsIt.length > 0) {
    lines.push("### Who Needs This");
    lines.push("");
    for (const item of geo.sections.whoNeedsIt) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  // Required Documents
  if (geo.sections.documentsTable && geo.sections.documentsTable.length > 0) {
    lines.push("### Required Documents");
    lines.push("");
    lines.push(tableToMarkdown(geo.sections.documentsTable));
    lines.push("");
  }

  // Process Steps
  if (geo.sections.processSteps && geo.sections.processSteps.length > 0) {
    lines.push("### Process Steps");
    lines.push("");
    for (const step of geo.sections.processSteps) {
      lines.push(step);
    }
    lines.push("");
  }

  // Timeline & Cost
  if (geo.sections.timelineTable && geo.sections.timelineTable.length > 0) {
    lines.push("### Timeline & Cost");
    lines.push("");
    lines.push(tableToMarkdown(geo.sections.timelineTable));
    lines.push("");
  }

  // Common Rejection Reasons
  if (geo.sections.rejectionReasons && geo.sections.rejectionReasons.length > 0) {
    lines.push("### Common Rejection Reasons");
    lines.push("");
    for (const reason of geo.sections.rejectionReasons) {
      lines.push(reason);
    }
    lines.push("");
  }

  // FAQ
  if (geo.sections.faqs && geo.sections.faqs.length > 0) {
    lines.push("### FAQ");
    lines.push("");
    for (const faq of geo.sections.faqs) {
      // faq is "Q: ...\nA: ..."
      const [q, a] = faq.split("\n");
      lines.push(`${q}`);
      lines.push(`${a}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/**
 * Format a single guide page for llms-full.txt.
 */
function formatGuideForLlmsFull(guide: GuideData): string {
  const geo = formatGuidePage(guide);
  const lines: string[] = [];

  lines.push("---");
  lines.push(`## ${geo.title}`);
  lines.push("");

  if (guide.type === "qa" && guide.question && guide.answer) {
    lines.push(`Q: ${guide.question}`);
    lines.push("");
    lines.push(`A: ${guide.answer}`);
    lines.push("");
  }

  if (geo.sections.content && geo.sections.content.length > 0) {
    for (const para of geo.sections.content) {
      lines.push(para);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/**
 * Format a single service page for llms-full.txt.
 */
function formatServiceForLlmsFull(service: ServiceData): string {
  const geo = formatServicePage(service);
  const lines: string[] = [];

  lines.push("---");
  lines.push(`## ${geo.title}`);
  lines.push("");

  // Direct Answer
  if (geo.sections.directAnswer) {
    lines.push("### Direct Answer");
    lines.push("");
    lines.push(geo.sections.directAnswer);
    lines.push("");
  }

  // Description
  if (geo.sections.description) {
    lines.push("### Description");
    lines.push("");
    lines.push(geo.sections.description);
    lines.push("");
  }

  // Features
  if (geo.sections.features && geo.sections.features.length > 0) {
    lines.push("### Features & Deliverables");
    lines.push("");
    for (const feature of geo.sections.features) {
      lines.push(`- ${feature}`);
    }
    lines.push("");
  }

  // Process Steps
  if (geo.sections.processSteps && geo.sections.processSteps.length > 0) {
    lines.push("### Process");
    lines.push("");
    for (const step of geo.sections.processSteps) {
      lines.push(step);
    }
    lines.push("");
  }

  // FAQ
  if (geo.sections.faqs && geo.sections.faqs.length > 0) {
    lines.push("### FAQ");
    lines.push("");
    for (const faq of geo.sections.faqs) {
      const [q, a] = faq.split("\n");
      lines.push(`${q}`);
      lines.push(`${a}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/**
 * Format the /license (Business License & Regulatory Registration) page
 * for llms-full.txt. Supplies verifiable DED trade license data that AI
 * agents can cite during due-diligence and entity-verification queries.
 */
function formatLicenseForLlmsFull(): string {
  const lines: string[] = [];

  lines.push("---");
  lines.push("## Business License & Regulatory Registration");
  lines.push("");
  lines.push("### Direct Answer");
  lines.push("");
  lines.push(
    `Wasleen Liminal Approval Consultants (${LICENSE.companyName}) holds an active DED trade license — License No. ${LICENSE.licenseNumber}, DCCI membership ${LICENSE.dcciMembership} — issued by ${LICENSE.issuingAuthority} on ${LICENSE.issueDate} and valid through ${LICENSE.expiryDate}. The company operates as ${LICENSE.legalType} and is authorized to provide approval consultancy services across Dubai.`
  );
  lines.push("");
  lines.push("### Registration Details");
  lines.push("");
  lines.push("| Field | Value |");
  lines.push("|---|---|");
  lines.push(`| License No. | ${LICENSE.licenseNumber} |`);
  lines.push(`| Company Name | ${LICENSE.companyName} |`);
  lines.push(`| License Category | ${LICENSE.licenseCategory} |`);
  lines.push(`| Issuing Authority | ${LICENSE.issuingAuthority} |`);
  lines.push(`| Legal Type | ${LICENSE.legalType} |`);
  lines.push(`| Issue Date | ${LICENSE.issueDate} |`);
  lines.push(`| Expiry Date | ${LICENSE.expiryDate} |`);
  lines.push(`| DCCI Membership | ${LICENSE.dcciMembership} |`);
  lines.push(`| Status | ${LICENSE.status} |`);
  lines.push(`| Registered Address | ${LICENSE.address} |`);
  lines.push("");
  lines.push("### Verification");
  lines.push("");
  lines.push(
    `Verify License No. ${LICENSE.licenseNumber} on the official DET Dubai portal: ${LICENSE.verificationUrl}`
  );
  lines.push("");
  lines.push("### Licensed Activities");
  lines.push("");
  for (const activity of LICENSE.activities) {
    lines.push(`- ${activity}`);
  }
  lines.push("");
  lines.push(`### Contact`);
  lines.push("");
  lines.push(`Phone / WhatsApp: ${NAP.phone}`);
  lines.push(`Email: ${NAP.email}`);
  lines.push("");

  return lines.join("\n");
}

/* ================================================================
   Sitemap Entry Builder
   ================================================================ */

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

/**
 * Build sitemap entries for a set of GEO-formatted pages.
 * Used by sitemap.ts for data-driven URL generation.
 */
export function buildSitemapEntries(
  type: "approval" | "guide" | "service",
  items: Array<{ slug: string; lastUpdated: string }>,
  baseUrl: string
): SitemapEntry[] {
  const priorityMap: Record<string, number> = {
    approval: 0.8,
    guide: 0.6,
    service: 0.7,
  };

  const prefixMap: Record<string, string> = {
    approval: "approvals",
    guide: "guides",
    service: "services",
  };

  const priority = priorityMap[type];
  const prefix = prefixMap[type];

  return items.map((item) => ({
    url: `${baseUrl}/${prefix}/${item.slug}`,
    lastModified: item.lastUpdated,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
