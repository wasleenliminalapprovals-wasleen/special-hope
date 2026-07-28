const fs = require('fs');

function generateFaqs(slug, name, authority) {
  return [
    {
      question: `What documents are required for ${name}?`,
      answer: `The exact document set depends on your project scope, but typically includes the application form, supporting drawings, NOCs from relevant authorities, and identification documents. Contact Wasleen Approvals for a personalized ${slug} document checklist tailored to your project.`
    },
    {
      question: `How much does ${name} cost?`,
      answer: `The cost of ${name} varies based on project size, complexity, and ${authority || 'the relevant authority'}'s fee structure. Government fees typically range from AED 500 to 5,000, with additional service fees for document preparation, engineering reviews, and submission management.`
    },
    {
      question: `Can I apply for ${name} online?`,
      answer: `Most Dubai authorities now offer online application portals for ${slug}. However, the process can be complex with multiple document uploads, payment steps, and technical review stages. Wasleen Approvals manages the entire online submission process on your behalf, ensuring accuracy and completeness.`
    },
    {
      question: `How long is ${name} valid?`,
      answer: `Validity periods for approvals vary by authority and approval type. Most construction-related approvals in Dubai are valid for 60 days to 1 year from the date of issuance. Check your approval certificate for the specific validity period and renewal requirements.`
    },
    {
      question: `What happens if my ${slug} application is rejected?`,
      answer: `If your application is rejected, the authority will provide specific reasons for the decision. Common issues include incomplete documentation, non-compliant drawings, or missing NOCs from other authorities. Wasleen Approvals offers a free initial consultation to identify and resolve rejection issues quickly and efficiently.`
    }
  ];
}

function generateDirectAnswer(slug, name, authority, original) {
  if (!original) return '';
  const wordCount = original.split(/\s+/).filter(w => w.length).length;
  if (wordCount >= 50) return original;
  
  const additions = [
    ` Wasleen Approvals provides end-to-end assistance for your ${slug} application in Dubai.`,
    ` Contact Wasleen Approvals for professional handling of your ${name} application.`,
    ` Our expert team manages the complete ${slug} process from document preparation to final approval.`,
  ];
  
  let needed = 50 - wordCount;
  let addition = '';
  for (const a of additions) {
    addition += a;
    needed -= a.split(/\s+/).filter(w => w.length).length;
    if (needed <= 0) break;
  }
  return original + addition;
}

function generateDescription(slug, name, authority, category, original) {
  if (!original) return '';
  const wordCount = original.split(/\s+/).filter(w => w.length).length;
  const hasLinks = original.includes('/approvals/') || original.includes('/guides/') || original.includes('/services/');
  
  let additions = [];
  
  const wasleenPara1 = ` Wasleen Approvals has 8+ years of specialized experience securing ${name} for clients across Dubai, including Business Bay, Downtown Dubai, Dubai Marina, JLT, and Al Qusais. Our team of registered engineers and approval specialists understands the specific requirements of each Dubai authority and manages the complete approval lifecycle.`;
  const wasleenPara2 = ` From initial document preparation through submission, query response, and final certificate delivery, we ensure a smooth and efficient ${slug} process. Our pre-submission audit catches 90% of potential rejection issues before they reach the authority, saving you time and money.`;
  
  const categoryLinks = {
    'government-regulatory': ` For comprehensive project support, explore our related services: [DM Building Permit](/approvals/dubai-municipality-building-permit), [DCD Approval](/approvals/dubai-civil-defense-approval), [DEWA Connection](/approvals/dewa-connection-noc), and [RTA Approval](/approvals/rta-approval). Browse all [52+ approval types](/approvals) or visit our [expert guides](/guides).`,
    'free-zone': ` For comprehensive free zone support, explore our related services: [DMCC Approval](/approvals/dmcc-approval), [Dubai South Approval](/approvals/dubai-south-approval), [DIFC Approval](/approvals/difc-approval), and [JAFZA Approval](/approvals/jebel-ali-free-zone-approval). Browse all [52+ approval types](/approvals) or visit our [expert guides](/guides).`,
    'developer-community': ` For comprehensive community approval support, explore: [Emaar Community Approval](/approvals/emaar-community-approval), [Nakheel Approval](/approvals/nakheel-developer-approval), [Damac Approval](/approvals/damac-properties-approval), and [Sobha Approval](/approvals/sobha-realty-approval). Browse all [52+ approval types](/approvals) or visit our [expert guides](/guides).`,
    'property-registration': ` For comprehensive property registration support, explore: [Ejari Registration](/approvals/ejari-registration), [Title Deed Registration](/approvals/title-deed-registration), [RERA Permit](/approvals/rera-permit), and [DLD Registration](/approvals/dubai-land-department-registration). Browse all [52+ approval types](/approvals) or visit our [expert guides](/guides).`,
    'technical-utility': ` For comprehensive utility approval support, explore: [DEWA Approval](/approvals/dewa-approval), [District Cooling](/approvals/district-cooling-approval), [Telecom Connection](/approvals/telecom-connection-approval), and [Sewerage & Drainage](/approvals/sewerage-drainage-approval). Browse all [52+ approval types](/approvals) or visit our [expert guides](/guides).`,
    'trade-food-hospitality': ` For comprehensive trade and hospitality support, explore: [DHA Approval](/approvals/dubai-health-authority-approval), [DTCM Tourism](/approvals/dtcm-tourism-approval), [Food Control](/approvals/food-control-department-approval), and [Entertainment License](/approvals/entertainment-license-approval). Browse all [52+ approval types](/approvals) or visit our [expert guides](/guides).`,
    'fit-out-construction': ` For comprehensive fit-out support, explore: [Interior Fit-Out](/approvals/interior-fit-out-approval), [Change of Usage](/approvals/change-of-usage-permit), [MEP Approval](/approvals/mep-approval), and [Structural Modification](/approvals/structural-modification-permit). Browse all [52+ approval types](/approvals) or visit our [expert guides](/guides).`,
    'drawing-documentation': ` For comprehensive drawing support, explore: [2D Drawing Submission](/services/2d-drawings), [3D Design Approval](/approvals/3d-design-approval), [CAD Certification](/approvals/cad-drawing-certification), and [As-Built Drawings](/approvals/as-built-drawing-approval). Browse all [52+ approval types](/approvals) or visit our [expert guides](/guides).`,
  };
  
  if (wordCount < 100) {
    additions.push(wasleenPara1);
    additions.push(wasleenPara2);
  } else if (wordCount < 150) {
    additions.push(wasleenPara1);
  }
  
  const linkAddition = categoryLinks[category] || ` Browse all [52+ approval types](/approvals) to identify every clearance your project needs, or visit our [expert guides](/guides) for detailed walkthroughs.`;
  
  if (!hasLinks) {
    additions.push(linkAddition);
  } else if (wordCount < 150) {
    additions.push(` For more details on related approvals, browse all [52+ approval types](/approvals) or our [expert guides](/guides).`);
  }
  
  if (additions.length === 0) return original;
  return original + '\\n' + additions.join('\\n');
}

const content = fs.readFileSync('src/data/approvals.ts', 'utf8');
const isWindows = content.includes('\r\n');
const cleanContent = content.replace(/\r\n/g, '\n');
const lines = cleanContent.split('\n');

let output = [];
let i = 0;
let enrichedCount = 0;

while (i < lines.length) {
  const line = lines[i];
  
  if (line.match(/^\s{2}\{/)) {
    const entryStart = i;
    let braceCount = 0;
    let entryEnd = -1;
    for (let j = i; j < lines.length; j++) {
      const l = lines[j];
      braceCount += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
      if (braceCount <= 0 && l.match(/^\s{2}\},?$/)) {
        entryEnd = j;
        break;
      }
    }
    
    if (entryEnd === -1) { output.push(line); i++; continue; }
    
    const slug = (() => {
      for (let j = entryStart; j < Math.min(entryStart + 15, entryEnd); j++) {
        const m = lines[j].match(/slug:\s+"([^"]+)"/);
        if (m) return m[1];
      }
      return null;
    })();
    
    if (slug) {
      const entryLines = lines.slice(entryStart, entryEnd + 1);
      const entryText = entryLines.join('\n');
      const hasFaqs = entryText.includes('faqs:');
      const hasDA = entryText.includes('directAnswer:');
      const hasDesc = entryText.includes('description:');
      
      if (hasFaqs && hasDA && hasDesc) {
        let name = '', authorityAbbr = '', category = '';
        for (let j = entryStart; j < Math.min(entryStart + 20, entryEnd); j++) {
          const nm = lines[j].match(/name:\s+"([^"]+)"/);
          if (nm) name = nm[1];
          const auth = lines[j].match(/authorityAbbr:\s+"([^"]+)"/);
          if (auth) authorityAbbr = auth[1];
          const cat = lines[j].match(/category:\s+"([^"]+)"/);
          if (cat) category = cat[1];
        }
        
        const existingFaqCount = (entryText.match(/\n\s{6}question:\s+"/g) || []).length;
        
        // Find property line indices (FIRST occurrence only)
        let daLineIdx = -1, descLineIdx = -1;
        for (let j = 0; j < entryLines.length; j++) {
          if (daLineIdx === -1 && entryLines[j].match(/^\s{4}directAnswer:/)) daLineIdx = entryStart + j;
          if (descLineIdx === -1 && entryLines[j].match(/^\s{4}description:/)) descLineIdx = entryStart + j;
        }
        
        // Find FAQ closing ] - count braces naturally from faqs start
        let faqsEndIdx = -1;
        let foundFaqStart = false;
        let faqBraceCount = 0;
        for (let j = 0; j < entryLines.length; j++) {
          if (!foundFaqStart && entryLines[j].includes('faqs:') && entryLines[j].includes('[')) {
            foundFaqStart = true;
            continue;
          }
          if (foundFaqStart) {
            faqBraceCount += (entryLines[j].match(/\{/g) || []).length;
            faqBraceCount -= (entryLines[j].match(/\}/g) || []).length;
            if (faqBraceCount <= 0 && entryLines[j].includes(']')) {
              faqsEndIdx = entryStart + j;
              break;
            }
          }
        }
        
        const modifiedLines = [...entryLines];
        let hasChanges = false;
        
        // 1. Enrich FAQs
        if (existingFaqCount < 5 && faqsEndIdx >= 0) {
          const newFaqs = generateFaqs(slug, name, authorityAbbr);
          const needed = Math.min(5, 8 - existingFaqCount);
          const localEnd = faqsEndIdx - entryStart;
          
          let lastFaqBrace = localEnd - 1;
          for (let j = localEnd - 1; j >= 0; j--) {
            const line = modifiedLines[j];
            const trimmed = line.trim();
            // Match multi-line format: line is just '}' or '},'
            // Match one-liner format: starts with '      {' and ends with '}' or '},'
            if (trimmed === '}' || trimmed === '},' ||
                (line.startsWith('      {') && (trimmed.endsWith('}') || trimmed.endsWith('},')))) {
              lastFaqBrace = j;
              break;
            }
          }
          
          const lastLineTrimmed = modifiedLines[lastFaqBrace].trim();
          if (lastLineTrimmed.endsWith('}') && !lastLineTrimmed.endsWith('},')) {
            modifiedLines[lastFaqBrace] = modifiedLines[lastFaqBrace].replace(/}$/, '},');
          }
          
          let insertPos = lastFaqBrace + 1;
          for (let f = 0; f < needed; f++) {
            const faqLines = [
              `      {`,
              `        question: "${newFaqs[f].question}",`,
              `        answer: "${newFaqs[f].answer}"`,
              `      }${f < needed - 1 ? ',' : ''}`
            ];
            modifiedLines.splice(insertPos, 0, ...faqLines);
            insertPos += faqLines.length;
          }
          hasChanges = true;
          console.log(`  ${slug}: Added ${needed} FAQs (was ${existingFaqCount})`);
        }
        
        // 2. Enrich directAnswer
        if (daLineIdx >= 0) {
          const localDaIdx = (daLineIdx + 1) - entryStart;
          if (localDaIdx < modifiedLines.length) {
            const valLine = modifiedLines[localDaIdx];
            const m = valLine.match(/^\s+"([^"]+)",?$/);
            if (m) {
              const enriched = generateDirectAnswer(slug, name, authorityAbbr, m[1]);
              if (enriched !== m[1]) {
                modifiedLines[localDaIdx] = valLine.replace(/".*"(,?)$/, `"${enriched}"$1`);
                hasChanges = true;
                console.log(`  ${slug}: DA ${m[1].split(/\s+/).filter(w=>w.length).length}w -> ${enriched.split(/\s+/).filter(w=>w.length).length}w`);
              }
            }
          }
        }
        
        // 3. Enrich description
        if (descLineIdx >= 0) {
          const localDescIdx = (descLineIdx + 1) - entryStart;
          if (localDescIdx < modifiedLines.length) {
            const valLine = modifiedLines[localDescIdx];
            const m = valLine.match(/^\s+"([^"]+)",?$/);
            if (m) {
              const enriched = generateDescription(slug, name, authorityAbbr, category, m[1]);
              if (enriched !== m[1]) {
                modifiedLines[localDescIdx] = valLine.replace(/".*"(,?)$/, `"${enriched}"$1`);
                hasChanges = true;
                const origWc = m[1].split(/\s+/).filter(w=>w.length).length;
                const newWc = enriched.split(/\\n|\s/).filter(w=>w.length).length;
                console.log(`  ${slug}: Desc ${origWc}w -> ${newWc}w`);
              }
            }
          }
        }
        
        if (hasChanges) { output.push(...modifiedLines); enrichedCount++; }
        else { output.push(...entryLines); }
        i = entryEnd + 1;
        continue;
      }
    }
    output.push(line); i++; continue;
  }
  output.push(line); i++;
}

const outputContent = output.join('\n');
const finalContent = isWindows ? outputContent.replace(/\n/g, '\r\n') : outputContent;
// Write to a temp file first, then copy to approvals.ts
fs.writeFileSync('src/data/approvals-enriched.ts', finalContent);
// Copy to approvals.ts
fs.copyFileSync('src/data/approvals-enriched.ts', 'src/data/approvals.ts');
console.log(`\nDone! Enriched ${enrichedCount} approval entries.`);

// Validation
const vContent = fs.readFileSync('src/data/approvals.ts', 'utf8').replace(/\r\n/g, '\n');
const vSections = vContent.split(/\n  \{/);
let vResults = [];
for (const s of vSections) {
  const slugMatch = s.match(/slug:\s+"([^"]+)"/);
  if (!slugMatch || slugMatch[1].includes('function')) continue;
  const slug = slugMatch[1];
  const entryLevelFaqs = (s.match(/\n\s{6}question:\s+"/g) || []).length;
  const daMatch = s.match(/\n\s{4}directAnswer:\n\s+"([^"]+)"/);
  const daWords = daMatch ? daMatch[1].split(/\s+/).filter(w => w.length).length : 0;
  const descMatch = s.match(/\n\s{4}description:\n\s+"([^"]+)"/);
  const descWords = descMatch ? descMatch[1].split(/\\n|\s/).filter(w => w.length).length : 0;
  const hasLinks = s.includes('/approvals/') || s.includes('/guides/') || s.includes('/services/');
  vResults.push({ slug, faqCount: entryLevelFaqs, daWords, descWords, hasLinks });
}

console.log(`\n=== VALIDATION ===`);
console.log(`Total parsed: ${vResults.length}`);
console.log(`<5 FAQs: ${vResults.filter(r => r.faqCount < 5).length}`);
console.log(`<50 DA: ${vResults.filter(r => r.daWords < 50).length}`);
console.log(`<150 Desc: ${vResults.filter(r => r.descWords < 150).length}`);
console.log(`No links: ${vResults.filter(r => !r.hasLinks).length}`);
