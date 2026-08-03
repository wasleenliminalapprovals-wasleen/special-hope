/**
 * PseoFaqBlock — FAQ accordion for pSEO pages.
 *
 * Reuses the accessible FAQBlock accordion but disables its inline FAQPage
 * schema — the FAQPage JSON-LD is emitted by `pseoSchemaStack()` so the
 * visible text and schema text stay in one place (word-for-word match rule).
 *
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md (FAQPage text must match visible)
 */

import FAQBlock from "@/components/sections/FAQBlock";
import type { FAQItem } from "@/types";

interface PseoFaqBlockProps {
  items: FAQItem[];
}

export default function PseoFaqBlock({ items }: PseoFaqBlockProps) {
  if (!items || items.length === 0) return null;
  return <FAQBlock items={items} includeSchema={false} />;
}
