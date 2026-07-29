/**
 * Shared utilities for the DeepSeek localization pipeline.
 *
 * Used by:
 *   - scripts/localize-approvals.js
 *   - scripts/localize-guides.js
 *   - scripts/localize-services.js
 *
 * @see plans/arabic-market-domination-reconciled-plan.md §2.2
 */

const fs = require("fs");
const path = require("path");

/* ── Auto-load .env.local ────────────────────────────────── */
(function loadEnvLocal() {
  const envPath = path.resolve(__dirname, "..", "..", ".env.local");
  try {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      // Strip surrounding quotes if present
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch {
    // .env.local not found — user must set env vars manually
  }
})();

/* ── Paths ───────────────────────────────────────────────── */
const SCRIPTS_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.resolve(SCRIPTS_DIR, "..", "src", "data");
const MANIFEST_PATH = path.join(SCRIPTS_DIR, "translation-manifest.json");
const STAGING_DIR = path.join(SCRIPTS_DIR, "staging");

/* ── DeepSeek Configuration ──────────────────────────────── */
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_MODEL = "deepseek-chat";
const MAX_RETRIES = 5;
const BASE_DELAY_MS = 1000;
const MAX_CONCURRENT = 3;

/* ── System Prompt — Enhanced (Phase 2.1) ────────────────── */
/* Enhanced per plans/arabic-content-overhaul-plan.md §2.2-2.4
 * Native Emirati/Gulf Arabic copywriting, forbidden patterns,
 * required patterns, authority names, and 13-section mandate.
 */
const SYSTEM_PROMPT = `أنت كاتب محتوى أعمال إماراتي/خليجي من الطراز الأول، تكتب بالعربية الفصحى المعاصرة (فصحى العصر) بأسلوب يجمع بين الرسمية المهنية والسلاسة الطبيعية. أنت تعمل لصالح "وسلين ليمينال للاستشارات المعتمدة" — شركة استشارات موافقات مقرها دبي.

مهمتك: توطين المحتوى الإنجليزي التالي إلى اللغة العربية الاحترافية المناسبة لصفحات موافقات دبي. هذه ليست ترجمة — بل إعادة كتابة محلية تبدو كما لو أن المؤلف الأصلي كتبها بالعربية مباشرة.

────────────────────────────────────────────
الأقسام الـ13 — يجب إنتاج محتوى لجميع الأقسام التالية
────────────────────────────────────────────

يحتوي الإدخال الإنجليزي على 13 قسمًا. يجب أن يُنتج الإخراج العربي محتوى لكل قسم:

1. slug — رابط عربي (حروف عربية وشرطات)
2. name — الاسم الكامل للموافقة بالعربية
3. shortName — الاسم المختصر بالعربية
4. authorityFull — الاسم الرسمي الكامل للجهة المختصة
5. authorityAbbr — الاختصار الإنجليزي للجهة مع حاشية عربية
6. primaryKeyword — الكلمة المفتاحية الأساسية بالعربية (هي نفس H1)
7. secondaryKeywords — 3-5 كلمات مفتاحية ثانوية بالعربية
8. directAnswer — إجابة مباشرة جاهزة للاستخراج من محركات الذكاء الاصطناعي (2-3 جمل، مكتفية ذاتياً بالكامل)
9. description — وصف 150-250 كلمة، يبدأ بتعريف الكيان
10. whoNeedsIt — 4-7 نقاط، كل نقطة جملة كاملة بذاتها
11. documents — قائمة المستندات (document + mandatory) مع أسماء وصفوف بالعربية
12. process — 5-8 خطوات (step, title, description) كلها بالعربية
13. timelineTable — جدول زمني وتكاليف (stage, duration, cost, notes) بالعربية
14. rejectionReasons — 3-5 أسباب رفض (reason + solution) بالعربية
15. caseStudy — دراسة حالة (projectType, challenge, solution, outcome) بالعربية
16. whyChooseUs — 3-5 نقاط بأسلوب "نحن في وسلين نضمن..."
17. faqs — 5-8 أسئلة شائعة (question + answer)، كل إجابة 2-3 جمل مكتفية ذاتياً

────────────────────────────────────────────
أسماء الجهات الرسمية — استخدم هذه الصيغ حصراً
────────────────────────────────────────────

- بلدية دبي (DM) — وليس "بلدية دبي"
- الدفاع المدني بدبي (DCD)
- هيئة كهرباء ومياه دبي (ديوا)
- هيئة الطرق والمواصلات بدبي
- مؤسسة دبي العقارية (دبي لاند)
- سلطة منطقة دبي الحرة (دبي الجنوب)
- هيئة الصحة بدبي
- شرطة دبي
- دائرة التنمية السياحية والتجارية المساعدة — دبي (DET)
- دائرة الأراضي والأملاك بدبي
- سلطة دبي للخدمات المالية (DFSA)
- مركز دبي المالي العالمي (DIFC)
- هيئة المعرفة والتنمية البشرية (KHDA)
- جمارك دبي
- غرفة تجارة وصناعة دبي
- المنطقة الحرة لجبل علي (جافزا)
- سلطة مدينة دبي للإنترنت
- سلطة واحة دبي للسيليكون

────────────────────────────────────────────
الأنماط الممنوعة (Forbidden Patterns) — لا تستخدمها أبداً
────────────────────────────────────────────

❌ "يتم إصدارها من قبل" → ✅ "تصدرها الجهة المختصة"
❌ "تقدم وسلين مساعدة شاملة" → ✅ "نحن في وسلين نضمن لك تجربة سلسة"
❌ "موافقة XXX هي تصريح إلزامي" → ✅ "موافقة XXX هي تصريح رسمي يثبت..."
❌ "يتم تقديم جميع المستندات" → ✅ "يقدّم المتقدم جميع المستندات"
❌ "تستغرق المعالجة عادة" → ✅ "تتراوح المدة الزمنية المعتادة بين"
❌ "ما هي موافقة" (لأسئلة FAQ) → ✅ "ما المقصود بموافقة" أو "هل موافقة..."
❌ أي استخدام لـ "click here" أو "learn more" أو "read more"
❌ استخدام الضمائر التي تشير إلى نص خارجي (مثل "كما ذكر أعلاه")
❌ وضع ترجمة إنجليزية بين قوسين بعد المصطلح العربي لأول مرة (ممنوع في المحتوى العربي فقط)

────────────────────────────────────────────
الأنماط المطلوبة (Required Patterns)
────────────────────────────────────────────

✅ "نحن في وسلين نضمن لك..."
✅ "تصدرها الجهة المختصة بعد استيفاء المتطلبات"
✅ "تتراوح المدة الزمنية المعتادة بين... و..."
✅ "من ... إلى ... درهم إماراتي" (لنطاقات الأسعار)
✅ تعريف الجهة بأسمها الرسمي الكامل ثم الاختصار: "الدفاع المدني بدبي (DCD)"
✅ صيغة الأرقام العربية: "5-10 أيام عمل" وليس "5 إلى 10 أيام"
✅ "يُشترط على المتقدم..." للشروط الإلزامية

────────────────────────────────────────────
قواعد الجودة الأساسية
────────────────────────────────────────────

1. ليست ترجمة حرفية — أعد كتابة المحتوى وكأنه كتب بالعربية أصلاً
2. احتفظ بكل وسوم HTML والمتغيرات والأرقام كما هي
3. استخدم لغة أعمال عربية فصحى معتدلة — رسمية ولكن ليست متكلفة
4. كل إجابة في الأسئلة الشائعة (FAQ) يجب أن تكون مكتفية ذاتياً (2-3 جمل، مفهومة بدون سياق)
5. الإجابة المباشرة (directAnswer) يجب أن تكون مكتفية ذاتياً — محركات AI ستستخرجها حرفياً
6. كل نقطة في المصفوفات يجب أن تكون جملة كاملة بذاتها
7. الأرقام: استخدم الصيغة العربية للأرقام (مثال: "من 500 إلى 2,000 درهم إماراتي")
8. للمصطلحات الفنية: استخدم المصطلح العربي المعتمد في سياق حكومة دبي
9. حافظ على جميع عناوين URL ومسارات الملفات وعناوين البريد الإلكتروني وأرقام الهواتف كما هي
10. لا تضع أي نص إنجليزي بين قوسين بعد المصطلحات العربية — هذا المحتوى عربي بحت

────────────────────────────────────────────
أمثلة — الأسلوب المطلوب
────────────────────────────────────────────

❌ أسلوب الترجمة (مرفوض):
"موافقة الدفاع المدني بدبي (DCD) هي تصريح إلزامي للسلامة من الحرائق والسلامة الحياتية مطلوب لجميع مشاريع البناء في دبي."

✅ الأسلوب المحلي الأصيل (مطلوب):
"موافقة الدفاع المدني بدبي (DCD) هي تصريح لا غنى عنه للسلامة من الحرائق، ولا يمكن لأي مشروع بناء في دبي تجاوزه. يشترط الدفاع المدني مراجعة أنظمة الحماية من الحرائق ومخارج الطوارئ وأنظمة الإنذار قبل منح شهادة الإشغال النهائية."

❌ أسلوب الترجمة (مرفوض):
"تقدم وسلين ليمينال للاستشارات المعتمدة مساعدة شاملة للحصول على الموافقات."

✅ الأسلوب المحلي الأصيل (مطلوب):
"نحن في وسلين ليمينال نضمن لك تجربة سلسة ومعالجة احترافية لطلب موافقتك، من تقديم المستندات إلى استلام التصريح النهائي."

❌ أسلوب الترجمة (مرفوض):
"ما هي موافقة الدفاع المدني بدبي؟ موافقة الدفاع المدني بدبي هي تصريح إلزامي للسلامة من الحرائق..."

✅ الأسلوب المحلي الأصيل (مطلوب):
"ما المقصود بموافقة الدفاع المدني بدبي؟ موافقة الدفاع المدني بدبي هي تصريح رسمي يثبت التزام منشأتك باشتراطات السلامة من الحرائق في إمارة دبي، وتصدرها الإدارة المختصة بعد استيفاء جميع المتطلبات."

تنسيق الإخراج: أعد كائن JSON صالحاً بنفس هيكل الإدخال الإنجليزي تماماً، مع استبدال جميع القيم النصية بمحتوى عربي أصيل يتبع القواعد أعلاه.`;

/* ── Manifest Helpers ────────────────────────────────────── */

function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    return { version: 1, approvals: {}, guides: {}, services: {} };
  }
}

function saveManifest(manifest) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
}

/* ── Content Hash ────────────────────────────────────────── */

/**
 * Compute a simple hash of all text fields in an English entry.
 * Used to detect changes since last translation.
 */
function computeContentHash(entry, textFields) {
  const parts = textFields.map((field) => {
    const val = entry[field];
    if (typeof val === "string") return val;
    if (Array.isArray(val)) {
      return val
        .map((item) => {
          if (typeof item === "string") return item;
          return JSON.stringify(item);
        })
        .join("||");
    }
    if (typeof val === "object" && val !== null) return JSON.stringify(val);
    return String(val ?? "");
  });
  const str = parts.join("|||");
  // Simple string hash (consistent, no crypto dependency needed)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

/* ── TS File Parsing ─────────────────────────────────────── */

/**
 * Parse a TypeScript data file to extract exported arrays.
 * Works like validate-ar-parity.js but extracts full entries.
 *
 * Returns an array of raw object strings for the given export name.
 */
function parseEntries(filePath, exportName) {
  const raw = fs.readFileSync(filePath, "utf-8");

  // Find the export declaration
  const pattern = new RegExp(
    `export\\s+(?:const|let|var)\\s+${exportName}\\s*:\\s*(?:[^;]+?)\\s*=\\s*\\[`,
    "s"
  );
  const declMatch = raw.match(pattern);
  if (!declMatch) return [];

  const startIdx = declMatch.index + declMatch[0].length;

  // Extract the array content by bracket matching
  const rest = raw.slice(startIdx);
  let depth = 1; // The regex consumed the outer array's opening `[`, so we're already 1 level deep
  let endIdx = 0;
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "[") depth++;
    else if (rest[i] === "]") {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  const arrayContent = rest.slice(0, endIdx);

  // Split into individual object blocks by top-level { }
  const objects = [];
  let objDepth = 0;
  let objStart = -1;
  for (let i = 0; i < arrayContent.length; i++) {
    const ch = arrayContent[i];
    if (ch === "{") {
      if (objDepth === 0) objStart = i;
      objDepth++;
    } else if (ch === "}") {
      objDepth--;
      if (objDepth === 0 && objStart >= 0) {
        objects.push(arrayContent.slice(objStart, i + 1));
        objStart = -1;
      }
    }
  }

  return objects;
}

/**
 * Extract a string field value from an object block string.
 */
function extractField(objStr, fieldName) {
  // Match fieldName: "value" or fieldName: `value` or fieldName: 'value'
  const simple = new RegExp(
    `\\b${fieldName}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`,
    "s"
  );
  let m = objStr.match(simple);
  if (m) return m[1];

  // Template literal (use string concat to avoid backtick-in-template issues)
  var patternStr = "\\b" + fieldName + "\\s*:\\s*`((?:[^`\\\\]|\\\\.)*)`";
  const templ = new RegExp(patternStr, "s");
  m = objStr.match(templ);
  if (m) return m[1];

  return undefined;
}

/**
 * Extract a string array field value from an object block string.
 */
function extractStringArray(objStr, fieldName) {
  const regex = new RegExp(
    `\\b${fieldName}\\s*:\\s*\\[([\\s\\S]*?)\\]`,
    "s"
  );
  const m = objStr.match(regex);
  if (!m) return [];

  // Extract all string values from the array
  const items = [];
  const strRegex = /"((?:[^"\\\\]|\\\\.)*)"/g;
  let sm;
  while ((sm = strRegex.exec(m[1])) !== null) {
    items.push(sm[1]);
  }
  return items;
}

/**
 * Extract an array of objects (with string fields) from an object block.
 * Used for documents, process steps, timelineTable, rejectionReasons, faqs.
 */
function extractObjectArray(objStr, fieldName) {
  const regex = new RegExp(
    `\\b${fieldName}\\s*:\\s*\\[([\\s\\S]*?)\\]`,
    "s"
  );
  const m = objStr.match(regex);
  if (!m) return [];

  const objects = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < m[1].length; i++) {
    const ch = m[1][i];
    if (ch === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && start >= 0) {
        objects.push(m[1].slice(start, i + 1));
        start = -1;
      }
    }
  }
  return objects;
}

/**
 * Extract object field (like caseStudy) - returns all key-value pairs.
 */
function extractObjectField(objStr, fieldName) {
  // Find fieldName: { ... }
  const regex = new RegExp(
    `\\b${fieldName}\\s*:\\s*(\\{[\\s\\S]*?\\})\\s*,`,
    "s"
  );
  const m = objStr.match(regex);
  if (!m) return null;

  // Check for null
  if (m[1].trim() === "null") return null;

  const result = {};
  const kvRegex = /(\w+)\s*:\s*"((?:[^"\\\\]|\\\\.)*)"/g;
  let kv;
  while ((kv = kvRegex.exec(m[1])) !== null) {
    result[kv[1]] = kv[2];
  }
  return result;
}

/* ── Arabic File Writing ─────────────────────────────────── */

/**
 * Read existing Arabic stub file and return the array of { slug, ar } entries.
 */
function readArabicFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    // Find the export array and parse its objects
    const regex = /export\s+(?:const|let|var)\s+\w+\s*:\s*(?:[^;]+?)\s*=\s*\[([\s\S]*?)\];/s;
    const m = raw.match(regex);
    if (!m) return [];

    // Parse individual objects
    const objects = [];
    let depth = 0;
    let start = -1;
    for (let i = 0; i < m[1].length; i++) {
      const ch = m[1][i];
      if (ch === "{") {
        if (depth === 0) start = i;
        depth++;
      } else if (ch === "}") {
        depth--;
        if (depth === 0 && start >= 0) {
          objects.push(m[1].slice(start, i + 1));
          start = -1;
        }
      }
    }

    return objects.map((objStr) => {
      const slug = extractField(objStr, "slug");
      return { slug, raw: objStr };
    });
  } catch {
    return [];
  }
}

/**
 * Rebuild the Arabic data file content with updated ar fields.
 *
 * @param {Array} existingEntries - Array of { slug, raw } from readArabicFile
 * @param {Array} updatedEntries - Array of { slug, ar } with new Arabic content
 * @param {string} exportName - The export variable name (e.g., "approvals")
 * @param {string} typeName - The TypeScript type (e.g., "ApprovalArabicEntry")
 * @param {string} headerComment - Comment block for file header
 */
function rebuildArabicFileContent(
  existingEntries,
  updatedEntries,
  exportName,
  typeName,
  headerComment
) {
  const updatedMap = new Map(updatedEntries.map((e) => [e.slug, e.ar]));

  const lines = [
    "/**",
    ` * ${headerComment}`,
  ];
  if (headerComment.includes("Stub")) {
    lines.push(
      " * All Arabic strings are placeholders. Replace with DeepSeek-localized content."
    );
  }
  lines.push(
    " *",
    ` * @see src/data/${exportName === "approvals" ? "approvals" : exportName}.ts for English source`,
    " * @see plans/arabic-market-domination-reconciled-plan.md §0.2",
    " */",
    "",
    `import type { ${typeName} } from "@/types";`,
    "",
    `export const ${exportName}: ${typeName}[] = [`,
  );

  for (const existing of existingEntries) {
    const ar = updatedMap.get(existing.slug);
    if (ar) {
      // Generate a clean slug-only entry with fully populated ar field
      lines.push("  {");
      lines.push(`    slug: "${existing.slug}",`);
      lines.push("    ar: " + JSON.stringify(ar, null, 4));
      lines.push("  },");
    } else {
      // Keep existing raw entry
      lines.push("  " + existing.raw + ",");
    }
  }

  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

/* ── DeepSeek API ────────────────────────────────────────── */

/**
 * Call the DeepSeek API with rate limiting and exponential backoff.
 *
 * @param {string} systemPrompt - System prompt
 * @param {string} userContent - JSON payload to localize
 * @param {number} retryCount - Current retry attempt (internal)
 * @returns {Promise<object>} Parsed JSON response
 */
async function callDeepSeek(systemPrompt, userContent, retryCount = 0) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error(
      "DEEPSEEK_API_KEY environment variable not set. " +
        "Add it to .env.local: DEEPSEEK_API_KEY=sk-..."
    );
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      temperature: 0.3,
      max_tokens: 8192,
    }),
  });

  if (response.status === 429) {
    // Rate limited — exponential backoff
    if (retryCount >= MAX_RETRIES) {
      throw new Error("Rate limited after max retries");
    }
    const delay = BASE_DELAY_MS * Math.pow(2, retryCount) + Math.random() * 1000;
    console.log(`  ⏳ Rate limited. Retrying in ${Math.round(delay / 1000)}s...`);
    await new Promise((r) => setTimeout(r, delay));
    return callDeepSeek(systemPrompt, userContent, retryCount + 1);
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from DeepSeek");
  }

  // Extract JSON from response (handle markdown-wrapped JSON)
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || content.match(/{[\s\S]*}/);
  const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;

  try {
    return JSON.parse(jsonStr);
  } catch {
    throw new Error(`Failed to parse DeepSeek response as JSON:\n${content.slice(0, 500)}`);
  }
}

/* ── Rate-Limited Queue ──────────────────────────────────── */

/**
 * Process items with a concurrency limit and optional progress reporting.
 *
 * @param {Array} items - Items to process
 * @param {Function} processor - Async function(item, index) => result
 * @param {number} concurrency - Max concurrent operations
 * @returns {Promise<Array>} Results in original order
 */
async function processQueue(items, processor, concurrency = MAX_CONCURRENT) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      console.log(`  [${index + 1}/${items.length}] Processing...`);
      try {
        results[index] = await processor(items[index], index);
        console.log(`  ✅ [${index + 1}/${items.length}] Complete`);
      } catch (err) {
        console.error(`  ❌ [${index + 1}/${items.length}] Failed: ${err.message}`);
        results[index] = { error: err.message, slug: items[index].slug };
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);

  return results;
}

/* ── Staging Helpers ─────────────────────────────────────── */

function ensureStagingDir() {
  fs.mkdirSync(STAGING_DIR, { recursive: true });
  return STAGING_DIR;
}

/* ── Exports ─────────────────────────────────────────────── */

module.exports = {
  // Constants
  DATA_DIR,
  SCRIPTS_DIR,
  STAGING_DIR,
  SYSTEM_PROMPT,
  DEEPSEEK_API_URL,
  DEEPSEEK_MODEL,
  MAX_RETRIES,
  BASE_DELAY_MS,
  MAX_CONCURRENT,

  // Helpers
  loadManifest,
  saveManifest,
  computeContentHash,
  parseEntries,
  extractField,
  extractStringArray,
  extractObjectArray,
  extractObjectField,
  readArabicFile,
  rebuildArabicFileContent,

  // API
  callDeepSeek,

  // Queue
  processQueue,

  // Staging
  ensureStagingDir,
};
