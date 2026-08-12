import type { FactSheet } from "../../src/types";
import type { GeneratedPseoContent, PseoQueueItem } from "./types";
import {
  getImageByFilename,
  matchImageByAuthority,
  matchImageByTopic,
} from "../../src/data/images";

/**
 * Prompt builders for the pSEO engine.
 *
 * - `buildEnSystemPrompt`  → instructs the model to return the exact
 *   `GeneratedPseoContent` JSON shape (EN).
 * - `buildEnUserPrompt`    → per-item context: kind, keywords, fact sheet,
 *   internal-link targets, word-count target, image note.
 * - `buildArSystemPrompt`  → contextual Gulf/Emirati Arabic instructions
 *   (NOT word-for-word translation).
 * - `buildArUserPrompt`    → same per-item context plus the EN draft so the
 *   model can localize (not translate) it.
 */

const SITE = "https://www.dubaiapprovalconsultants.com";

export const EN_JSON_SHAPE = `{
  "metaTitle": "string (50-60 chars, primary keyword front-loaded, end with '| Wasleen Approvals')",
  "metaDescription": "string (140-160 chars, active voice, one concrete number, ends with a CTA)",
  "primaryKeyword": "the exact primary keyword",
  "secondaryKeywords": ["3-6 LSI/secondary keywords"],
  "directAnswer": "string — 2-3 self-contained sentences that define the topic, state who needs it and the turnaround. Must make sense with ZERO surrounding context (AI engines lift it verbatim).",
  "sections": [
    {
      "heading": "H2 section heading with keyword",
      "anchor": "kebab-case-anchor",
      "blocks": [
        {"type": "paragraph", "text": "..."},
        {"type": "heading", "level": 3, "text": "H3 subheading"},
        {"type": "list", "ordered": true, "items": ["..."]},
        {"type": "table", "headers": ["..."], "rows": [["..."]]},
        {"type": "quote", "text": "..."},
        {"type": "image", "image": {"src": "/images/<one available src, exactly as listed>", "alt": "unique descriptive alt (never 'logo'/'image')", "caption": "optional short caption"}}
      ]
    }
  ],
  "faqs": [
    {"question": "FAQ question", "answer": "2-3 sentence self-contained answer"}
  ]
}`;

function formatFactSheet(sheet: FactSheet | undefined): string {
  if (!sheet) return "(No fact sheet yet for this authority — do not invent fees/timelines. Use ranges and mark figures as indicative.)";
  const lines: string[] = [];
  lines.push(`Authority: ${sheet.name} (${sheet.nameAr})`);
  lines.push(`Official portal: ${sheet.portalUrl}`);
  lines.push(`Fact verification status: ${sheet.lastVerified}`);
  lines.push("");
  lines.push("VERIFIED FEES (only these amounts may be quoted):");
  for (const f of sheet.fees) {
    lines.push(`- ${f.name}: ${f.amount}${f.notes ? ` (${f.notes})` : ""}`);
  }
  lines.push("");
  lines.push("VERIFIED TIMELINES (only these durations may be quoted):");
  for (const t of sheet.timelines) {
    lines.push(`- ${t.stage}: ${t.duration}`);
  }
  lines.push("");
  lines.push("VERIFIED COMMON DOCUMENTS:");
  for (const d of sheet.documents) {
    lines.push(`- ${d.name}${d.notes ? ` (${d.notes})` : ""}`);
  }
  if (sheet.notes) {
    lines.push("");
    lines.push(`Disclaimer: ${sheet.notes}`);
  }
  return lines.join("\n");
}

function formatLinkTargets(relatedApprovalSlugs: string[], parentApprovalSlug?: string): string {
  const targets = new Set<string>([
    ...(parentApprovalSlug ? [parentApprovalSlug] : []),
    ...relatedApprovalSlugs,
  ]);
  return [...targets]
    .map((slug) => `- ${slug} → ${SITE}/approvals/${slug}`)
    .join("\n");
}

/** Candidate in-body image srcs (available assets only) the model may reference
 *  in an image block. Deduplicated; falls back to the generic pool via matchers. */
function formatAvailableImages(item: PseoQueueItem): string {
  const srcs = new Set<string>();
  const add = (img: { src?: string } | undefined) => {
    if (img?.src) srcs.add(img.src);
  };
  add(item.imageHint ? getImageByFilename(item.imageHint) : undefined);
  add(matchImageByAuthority(item.authority));
  add(matchImageByTopic(item.topicTags));
  if (srcs.size === 0) return "(none — omit the in-body image block)";
  return [...srcs].map((src) => `- ${src}`).join("\n");
}

export function buildEnSystemPrompt(): string {
  return `You are a senior SEO content writer for Wasleen Approvals, Dubai's approval-consultancy experts (dubaiapprovalconsultants.com). You write factual, E-E-A-T content that ranks #1 on Google AND gets quoted verbatim by AI answer engines (Google AI Overviews, ChatGPT Search, Perplexity).

HARD RULES:
1. Return ONLY a valid JSON object — no markdown, no prose outside the JSON. Shape:
${EN_JSON_SHAPE}
2. FACTS ONLY FROM THE FACT SHEET. Every fee, timeline, and document MUST come from the verified fact sheet provided. If a number is not in the fact sheet, DO NOT invent it — omit it or describe it as "indicative" / "varies".
3. Each FAQ answer is 2-3 sentences, self-contained, complete on its own.
4. Use semantic structure: H2 for sections, H3 for subsections, tables for fees/timelines/documents, ordered lists for steps.
5. Embed at least 3 real internal links using DESCRIPTIVE anchor text (never "click here" or "learn more"). Use the link targets provided verbatim.
6. Every ~150-200 words include one concrete, quotable fact (number, duration, or document).
7. Tone: confident, precise, Emirati-professional. Never fabricate stats, reviews, ratings, or awards.
8. metaTitle 50-60 chars; metaDescription 140-160 chars.
9. Write for extraction: tables and lists over long prose.
10. Include EXACTLY ONE in-body image block ({"type": "image", ...}) inside the most relevant section (next to the process/checklist table, the fines table, or a related subsection). Its "src" MUST be one of the AVAILABLE IMAGE SRCS listed in the user prompt — never invent a src. Give it a unique, descriptive alt (never "logo"/"image") and omit width/height (the renderer supplies safe dimensions). If the user prompt lists no available srcs, omit the image block entirely.`;
}

export function buildEnUserPrompt(item: PseoQueueItem, sheet: FactSheet | undefined): string {
  return `Generate a ${item.kind.toUpperCase()} page.

TITLE (H1): ${item.title}
PRIMARY KEYWORD: ${item.primaryKeyword}
SECONDARY KEYWORDS: ${item.secondaryKeywords.join(", ")}
TOPIC TAGS: ${item.topicTags.join(", ")}
TARGET WORD COUNT: ~${item.targetWordCount} words (body text only)
NUMBER OF FAQS: ${Math.max(item.faqCount, 4)} (minimum 4 required)
AUTHORITY: ${item.authority}

FACT SHEET (SOURCE OF ALL NUMBERS):
${formatFactSheet(sheet)}

AVAILABLE INTERNAL LINK TARGETS (use at least 3, verbatim, descriptive anchor text):
${formatLinkTargets(item.relatedApprovalSlugs)}

AVAILABLE IMAGE SRCS (for the single in-body image block — use ONLY these, verbatim):
${formatAvailableImages(item)}

Return the complete JSON object for this page.`;
}

/* ============================================================
   ARABIC — contextual Gulf/Emirati, NOT translation
   ============================================================ */

export const AR_JSON_SHAPE = EN_JSON_SHAPE;

export function buildArSystemPrompt(): string {
  return `أنت كاتب محتوى SEO عربي خبير لدى "وسلين للاستشارات" (Wasleen Approvals) في دبي. تكتب محتوى عربياً فصيحاً بلهجة خليجية/إماراتية معاصرة، يظهر في نتائج جوجل العربية وفي محركات البحث الذكية (Google AI Overviews و ChatGPT Search و Perplexity).

قواعد صارمة:
1. أعد ONLY كائن JSON صالحاً، بلا أي نص خارج JSON. الشكل:
${AR_JSON_SHAPE}
2. هذه ليست ترجمة حرفية من الإنجليزية إطلاقاً. أعد كتابة المحتوى بالعربية كأنه كُتب أصلاً بالعربية، بأسلوب سياقي خليجي. استخدم المصطلحات المعتمدة في دبي/الإمارات مثل: "بلدية دبي"، "شهادة عدم ممانعة"، "تصريح البناء"، "الدفاع المدني"، "هيئة كهرباء ومياه دبي"، "عقد الإيجار الإلكتروني (الإيجاري)".
3. كل الأرقام (الرسوم، المدد، المستندات) من صحيفة الحقائق المرفقة فقط — لا تخترع أرقاماً. إن لم يرد الرقم في الصحيفة، احذفه أو صفه بأنه "تقريبي/يختلف".
4. كل إجابة سؤال شائعة (FAQ) من 2-3 جمل، مكتملة بذاتها.
5. استخدم بنية دلالية: H2 للأقسام، H3 للأقسام الفرعية، جداول للرسوم/المدد/المستندات، قوائم مرقّمة للخطوات.
6. ادمج 3 روابط داخلية حقيقية على الأقل بنصوص وصفية (لا "اضغط هنا").
7. كل 150-200 كلمة، ضع حقيقة ملموسة قابلة للاقتباس (رقم، مدة، مستند).
8. النبرة: مهنية، دقيقة، عربية فصيحة بمسحة خليجية، بلا حشو تسويقي.
9. عنوان الميتا 50-60 حرفاً؛ وصف الميتا 140-160 حرفاً.
10. اتجاه النص عربي (RTL) طبيعي، وعلامات الترقيم عربية سليمة.
11. أضف كتلة صورة واحدة بالضبط داخل القسم الأنسب (قرب جدول المستندات/الخطوات أو جدول الرسوم). يجب أن يكون حقل src مطابقاً حرفياً لأحد عناوين الصور المتاحة (AVAILABLE IMAGE SRCS) المرفقة في رسالة المستخدم — لا تخترع أي src، ولا تضع أبعاداً (width/height)؛ الموقع يضيفها تلقائياً. إن لم توجد صور متاحة، احذف كتلة الصورة تماماً.`;
}

export function buildArUserPrompt(
  item: PseoQueueItem,
  sheet: FactSheet | undefined,
  enDraft: string
): string {
  return `أنشئ صفحة عربية من نوع ${item.kind.toUpperCase()}.

العنوان (H1): ${item.ar.title}
الكلمة المفتاحية الأساسية: ${item.ar.primaryKeyword}
كلمات مفتاحية ثانوية: ${item.ar.secondaryKeywords.join("، ")}
الوسوم: ${item.topicTags.join("، ")}
عدد الكلمات المستهدف: نحو ${Math.round(item.targetWordCount * 0.8)} كلمة (النص فقط)
عدد الأسئلة الشائعة: ${Math.max(item.faqCount, 4)} (4 على الأقل)
الجهة: ${sheet?.nameAr ?? item.authority}

صحيفة الحقائق (مصدر كل الأرقام):
${formatFactSheet(sheet)}

الروابط الداخلية المتاحة (استخدم 3 على الأقل بنصوص وصفية):
${formatLinkTargets(item.relatedApprovalSlugs)}

عناوين الصور المتاحة (لكتلة الصورة الواحدة داخل النص — استخدمها حرفياً فقط):
${formatAvailableImages(item)}

المسودة الإنجليزية (للاستئناس فقط — أعد الكتابة بالعربية السياقية، لا تترجم حرفياً):
---
${enDraft.slice(0, 6000)}
---

أعد كائن JSON الكامل لهذه الصفحة.`;
}
