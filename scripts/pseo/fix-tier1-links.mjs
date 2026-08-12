// fix-tier1-links.mjs
// One-off pSEO maintenance script: weaves mid-content internal links into the 6 Law 3/2026 Tier-1
// pages (EN + AR stores) so each guide links up to the pillar (mid-content CTA) + 3-4 siblings.
//
// Usage: node scripts/pseo/fix-tier1-links.mjs [--en] [--ar]
//   --en  run only the EN pass
//   --ar  run only the AR pass
//   (no flag = run both)
//
// Each replacement asserts the search substring appears EXACTLY once in the page body
// (non-related sections), so silent mismatches fail loudly instead of corrupting content.
import { readFileSync, writeFileSync } from 'node:fs';

const EN_PATH = 'src/data/pseo/pseo-pages.json';
const AR_PATH = 'src/data/pseo/pseo-pages-ar.json';

// Per-page list of [search, replace]. Search strings are distinctive substrings of the
// generated body text; replacement wraps the natural anchor into a relative markdown link.
const EN_FIXES = {
  'who-needs-quality-safety-certificate-dubai': [
    ['the Quality and Safety Certificate is mandatory',
      'the [Quality and Safety Certificate](/approvals/dubai-building-quality-safety-certificate) is mandatory'],
    ['from the date of their Completion Certificate. This requirement',
      'from the date of their [Completion Certificate](/approvals/dubai-municipality-completion-certificate). This requirement'],
    ['Civil Defence compliance, and CCTV/SIRA compliance',
      '[Civil Defence compliance](/approvals/dubai-civil-defense-approval), and CCTV/SIRA compliance'],
    ['fines ranging from AED 100 to AED 1,000,000 per violation. For repeat',
      'fines ranging from AED 100 to AED 1,000,000 per violation (see our [Law 3 of 2026 fines guide](/guides/law-3-2026-penalties-fines-guide) for a full breakdown). For repeat'],
    ['Our experts ensure your Technical Report meets all requirements and deadlines.',
      'Our experts ensure your Technical Report meets all requirements and deadlines, and can guide you through the [certificate cost in Dubai](/guides/building-safety-certificate-cost-dubai).'],
  ],
  'how-to-get-building-safety-certificate-dubai': [
    ["and compliance is due within 1 year of the law's effective date (extendable)",
      "and compliance is due within [1 year of the law's effective date](/guides/law-3-2026-compliance-deadline-guide) (extendable)"],
    ['ranging from AED 100 to AED 1,000,000 per violation, with a doubled cap',
      'ranging from AED 100 to AED 1,000,000 per violation (see our [Law 3 of 2026 fines guide](/guides/law-3-2026-penalties-fines-guide)), with a doubled cap'],
    ['a refundable security deposit of AED 50,000 is required',
      'a refundable [security deposit of AED 50,000](/guides/building-safety-certificate-cost-dubai) is required'],
  ],
  'building-safety-certificate-cost-dubai': [
    ['the Quality and Safety Certificate is mandatory for buildings',
      'the [Quality and Safety Certificate](/approvals/dubai-building-quality-safety-certificate) is mandatory for buildings'],
    ['the real cost risk comes from non-compliance',
      'the real cost risk comes from [non-compliance](/guides/what-happens-if-you-dont-get-safety-certificate)'],
    ['cladding, electrical/mechanical systems, and Civil Defence compliance',
      'cladding, electrical/mechanical systems, and [Civil Defence compliance](/approvals/dubai-civil-defense-approval)'],
    ['owners have 1 year from the effective date to comply',
      'owners have [1 year from the effective date](/guides/law-3-2026-compliance-deadline-guide) to comply'],
    ['Fines are the most concrete cost in the law',
      '[Fines](/guides/law-3-2026-penalties-fines-guide) are the most concrete cost in the law'],
  ],
  'what-happens-if-you-dont-get-safety-certificate': [
    ['The law sets a broad fine range',
      'The law sets a broad [fine range](/guides/law-3-2026-penalties-fines-guide)'],
    ['a refundable security deposit of AED 50,000 and must be completed',
      'a refundable [security deposit of AED 50,000](/guides/building-safety-certificate-cost-dubai) and must be completed'],
    ['the suspension of building permits',
      'the suspension of [building permits](/approvals/dubai-municipality-building-permit)'],
    ['within the compliance deadline',
      'within the [compliance deadline](/guides/law-3-2026-compliance-deadline-guide)'],
  ],
  'law-3-2026-penalties-fines-guide': [
    ['with a compliance deadline of one year from the effective date',
      'with a [compliance deadline of one year](/guides/law-3-2026-compliance-deadline-guide) from the effective date'],
    ['Buildings aged 20 years or more must obtain the Quality and Safety Certificate',
      '[Buildings aged 20 years or more](/guides/who-needs-quality-safety-certificate-dubai) must obtain the Quality and Safety Certificate'],
    ['it must be at least 20 years old from the Completion Certificate date',
      'it must be at least 20 years old from the [Completion Certificate date](/approvals/dubai-municipality-completion-certificate)'],
    ['security barriers, Civil Defence compliance and CCTV/SIRA compliance',
      'security barriers, [Civil Defence compliance](/approvals/dubai-civil-defense-approval) and CCTV/SIRA compliance'],
    ['a refundable security deposit of AED 50,000, which is returned',
      'a refundable [security deposit of AED 50,000](/guides/building-safety-certificate-cost-dubai), which is returned'],
  ],
  'law-3-2026-compliance-deadline-guide': [
    ['This timeline is critical for owners of buildings completed at least 20 years ago',
      'This timeline is critical for owners of [buildings completed at least 20 years ago](/guides/who-needs-quality-safety-certificate-dubai)'],
    ['helps avoid fines ranging from AED 100 to AED 1,000,000 per violation, with repeat violations',
      'helps avoid fines ranging from AED 100 to AED 1,000,000 per violation (see our [Law 3 of 2026 fines guide](/guides/law-3-2026-penalties-fines-guide)), with repeat violations'],
    ['you must obtain a Quality and Safety Certificate.',
      'you must obtain a Quality and Safety Certificate. See our [step-by-step guide to getting the certificate](/guides/how-to-get-building-safety-certificate-dubai) for the full process.'],
    ['Non-compliance with Law 3 of 2026 can result in significant financial penalties',
      '[Non-compliance](/guides/what-happens-if-you-dont-get-safety-certificate) with Law 3 of 2026 can result in significant financial penalties'],
  ],
};

// AR store entries: { slug, ar: { sections: [...] } }. Links use /ar/approvals and /ar/guides paths.
// Arabic substrings mirror the EN link plan (pillar CTA + siblings) with natural Arabic anchors.
const AR_FIXES = {
  'who-needs-quality-safety-certificate-dubai': [
    ['تُعد شهادة الجودة والسلامة إلزامية للمباني القائمة',
      'تُعد [شهادة الجودة والسلامة](/ar/approvals/dubai-building-quality-safety-certificate) إلزامية للمباني القائمة'],
    ['من تاريخ إصدار شهادة الإنجاز. يسري هذا الالتزام',
      'من تاريخ إصدار [شهادة الإنجاز](/ar/approvals/dubai-municipality-completion-certificate). يسري هذا الالتزام'],
    ['الامتثال لمتطلبات الدفاع المدني وأنظمة كاميرات المراقبة (سيرا)',
      'الامتثال لمتطلبات [الدفاع المدني](/ar/approvals/dubai-civil-defense-approval) وأنظمة كاميرات المراقبة (سيرا)'],
    ['غرامات تتراوح بين 100 درهم ومليون درهم إماراتي عن كل مخالفة',
      'غرامات تتراوح بين 100 درهم ومليون درهم إماراتي عن كل مخالفة ([دليل غرامات قانون 3 لسنة 2026](/ar/guides/law-3-2026-penalties-fines-guide))'],
    ['تأمين بقيمة 50,000 درهم قابلة للاسترداد',
      '[تأمين بقيمة 50,000 درهم](/ar/guides/building-safety-certificate-cost-dubai) قابلة للاسترداد'],
  ],
  'how-to-get-building-safety-certificate-dubai': [
    ['مع مهلة امتثال مدتها سنة واحدة من تاريخ سريان القانون (قابلة للتمديد)',
      'مع [مهلة امتثال مدتها سنة واحدة](/ar/guides/law-3-2026-compliance-deadline-guide) من تاريخ سريان القانون (قابلة للتمديد)'],
    ['تأكد أن تاريخ شهادة إتمام البناء لا يقل عن 20 عاماً',
      'تأكد أن تاريخ [شهادة إتمام البناء](/ar/approvals/dubai-municipality-completion-certificate) لا يقل عن 20 عاماً'],
    ['يجب أن يكون عمرها 20 عاماً على الأقل لتفعيل الشهادة',
      'يجب أن يكون [عمرها 20 عاماً على الأقل](/ar/guides/who-needs-quality-safety-certificate-dubai) لتفعيل الشهادة'],
    ['أما الغرامات على المخالفات فتبدأ من 100 درهم وتصل إلى مليون درهم',
      'أما الغرامات على المخالفات فتبدأ من 100 درهم وتصل إلى مليون درهم ([دليل غرامات قانون 3 لسنة 2026](/ar/guides/law-3-2026-penalties-fines-guide))'],
    ['50,000 درهم إماراتي',
      '[50,000 درهم إماراتي](/ar/guides/building-safety-certificate-cost-dubai)'],
  ],
  'building-safety-certificate-cost-dubai': [
    ['تُعد شهادة الجودة والسلامة إلزامية للمباني التي مضى على إنجازها',
      'تُعد [شهادة الجودة والسلامة](/ar/approvals/dubai-building-quality-safety-certificate) إلزامية للمباني التي مضى على إنجازها'],
    ['يكمن الخطر المالي الحقيقي في عدم الامتثال',
      'يكمن الخطر المالي الحقيقي في [عدم الامتثال](/ar/guides/what-happens-if-you-dont-get-safety-certificate)'],
    ['والامتثال للدفاع المدني. تعتمد رسوم المكتب الهندسي',
      'والامتثال للدفاع المدني ([تفاصيل موافقة الدفاع المدني](/ar/approvals/dubai-civil-defense-approval)). تعتمد رسوم المكتب الهندسي'],
    ['ولدى الملاك سنة واحدة من تاريخ السريان للامتثال (قابلة للتمديد)',
      'ولدى الملاك [سنة واحدة من تاريخ السريان](/ar/guides/law-3-2026-compliance-deadline-guide) للامتثال (قابلة للتمديد)'],
    ['تذكر أن الغرامات تبدأ من 100 درهم وقد تصل إلى مليون درهم',
      'تذكر أن [الغرامات](/ar/guides/law-3-2026-penalties-fines-guide) تبدأ من 100 درهم وقد تصل إلى مليون درهم'],
  ],
  'what-happens-if-you-dont-get-safety-certificate': [
    ['يحدد القانون نطاقًا واسعًا للغرامات',
      'يحدد القانون [نطاقًا واسعًا للغرامات](/ar/guides/law-3-2026-penalties-fines-guide)'],
    ['وديعة تأمين قابلة للاسترداد قدرها 50,000 درهم',
      '[وديعة تأمين قابلة للاسترداد قدرها 50,000 درهم](/ar/guides/building-safety-certificate-cost-dubai)'],
    ['تعليق تصاريح البناء',
      'تعليق [تصاريح البناء](/ar/approvals/dubai-municipality-building-permit)'],
    ['يمنح القانون سنة واحدة من تاريخ سريانه، قابلة للتمديد',
      'يمنح القانون [سنة واحدة من تاريخ سريانه](/ar/guides/law-3-2026-compliance-deadline-guide)، قابلة للتمديد'],
  ],
  'law-3-2026-penalties-fines-guide': [
    ['مع مهلة امتثال تصل إلى سنة من تاريخ نفاذه (قابلة للتمديد)',
      'مع [مهلة امتثال تصل إلى سنة](/ar/guides/law-3-2026-compliance-deadline-guide) من تاريخ نفاذه (قابلة للتمديد)'],
    ['يستهدف القانون المباني القائمة التي مضى على إنجازها 20 عاماً على الأقل',
      'يستهدف القانون [المباني القائمة التي مضى على إنجازها 20 عاماً على الأقل](/ar/guides/who-needs-quality-safety-certificate-dubai)'],
    ['المباني التي يبلغ عمرها 20 عاماً أو أكثر يجب أن تحصل على شهادة جودة وسلامة المباني',
      'المباني التي يبلغ عمرها 20 عاماً أو أكثر يجب أن تحصل على [شهادة جودة وسلامة المباني](/ar/approvals/dubai-building-quality-safety-certificate)'],
    ['يجب أن يكون عمره 20 عاماً على الأقل من تاريخ شهادة الإنجاز',
      'يجب أن يكون عمره 20 عاماً على الأقل من تاريخ [شهادة الإنجاز](/ar/approvals/dubai-municipality-completion-certificate)'],
    ['الامتثال للدفاع المدني، وأنظمة كاميرات المراقبة (سيرا)',
      'الامتثال [للدفاع المدني](/ar/approvals/dubai-civil-defense-approval)، وأنظمة كاميرات المراقبة (سيرا)'],
  ],
  'law-3-2026-compliance-deadline-guide': [
    ['هذا الجدول الزمني حاسم لأي مالك مبنى يزيد عمره عن 20 عاماً',
      'هذا الجدول الزمني حاسم لأي [مالك مبنى يزيد عمره عن 20 عاماً](/ar/guides/who-needs-quality-safety-certificate-dubai)'],
    ['يساعد على تجنب الغرامات التي تتراوح بين 100 درهم ومليون درهم لكل مخالفة',
      'يساعد على تجنب [الغرامات](/ar/guides/law-3-2026-penalties-fines-guide) التي تتراوح بين 100 درهم ومليون درهم لكل مخالفة'],
    ['يجب الحصول على شهادة جودة وسلامة المباني',
      'يجب [الحصول على شهادة جودة وسلامة المباني](/ar/guides/how-to-get-building-safety-certificate-dubai)'],
    ['الغرامات المترتبة على عدم الامتثال للقانون رقم (3) لسنة 2026 بين 100 درهم ومليون درهم لكل مخالفة',
      'الغرامات المترتبة على [عدم الامتثال](/ar/guides/what-happens-if-you-dont-get-safety-certificate) للقانون رقم (3) لسنة 2026 بين 100 درهم ومليون درهم لكل مخالفة'],
  ],
};

function collectTexts(sections) {
  const texts = [];
  const walk = (b) => {
    if (!b || typeof b !== 'object') return;
    if (typeof b.text === 'string') texts.push(b.text);
    if (Array.isArray(b.items)) for (const it of b.items) walk({ text: it });
    if (Array.isArray(b.rows)) for (const row of b.rows) for (const cell of row) walk({ text: cell });
  };
  for (const sec of sections) for (const b of sec.blocks || []) walk(b);
  return texts;
}

function applyFixes(sections, fixes) {
  const apply = (b) => {
    if (!b || typeof b !== 'object') return;
    if (typeof b.text === 'string') {
      for (const [s, r] of fixes) b.text = b.text.split(s).join(r);
    }
    if (Array.isArray(b.items)) {
      for (let i = 0; i < b.items.length; i++) {
        for (const [s, r] of fixes) b.items[i] = b.items[i].split(s).join(r);
      }
    }
    if (Array.isArray(b.rows)) {
      for (const row of b.rows) {
        for (let c = 0; c < row.length; c++) {
          for (const [s, r] of fixes) row[c] = row[c].split(s).join(r);
        }
      }
    }
  };
  for (const sec of sections) for (const b of sec.blocks || []) apply(b);
}

// ---- EN ----
const MODE = process.argv[2] || 'both';
if (MODE === 'both' || MODE === '--en') {
  const enData = JSON.parse(readFileSync(EN_PATH, 'utf8'));
  let enFixed = 0;
  for (const entry of enData) {
    const fixes = EN_FIXES[entry.slug];
    if (!fixes || fixes.length === 0) continue;
    const texts = collectTexts(entry.sections);
    for (const [s] of fixes) {
      const count = texts.filter((t) => t.includes(s)).length;
      if (count !== 1) throw new Error(`[EN:${entry.slug}] expected exactly 1 match for: ${s} (got ${count})`);
    }
    applyFixes(entry.sections, fixes);
    enFixed++;
  }
  writeFileSync(EN_PATH, JSON.stringify(enData, null, 2) + '\n', 'utf8');
  console.log(`EN: patched ${enFixed} pages -> ${EN_PATH}`);
}

// ---- AR ----
if (MODE === 'both' || MODE === '--ar') {
  const arData = JSON.parse(readFileSync(AR_PATH, 'utf8'));
  let arFixed = 0;
  for (const entry of arData) {
    const fixes = AR_FIXES[entry.slug];
    if (!fixes || fixes.length === 0) continue;
    const texts = collectTexts(entry.ar.sections);
    for (const [s] of fixes) {
      const count = texts.filter((t) => t.includes(s)).length;
      if (count !== 1) throw new Error(`[AR:${entry.slug}] expected exactly 1 match for: ${s} (got ${count})`);
    }
    applyFixes(entry.ar.sections, fixes);
    arFixed++;
  }
  writeFileSync(AR_PATH, JSON.stringify(arData, null, 2) + '\n', 'utf8');
  console.log(`AR: patched ${arFixed} pages -> ${AR_PATH}`);
}
