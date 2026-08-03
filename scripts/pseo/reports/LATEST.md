# pSEO Weekly Review — 2026-08-02

Generated 2026-08-02T21:06:36.746Z (UTC). Cadence: **once per week**, ~15-20 minutes.

## 1. Summary

| Metric | Count |
|---|---|
| Total pSEO pages published | 0 |
| Verified (auto) | 0 |
| **Needs review** (unverified figures) | **0** |
| Unresolved fact-review items | 0 |

| Kind | Pages |
|---|---|

## 2. Pages flagged for fact review

No pages are currently flagged. Every published page passed the fact gate against a verified fact sheet. ✅

## 3. Unresolved fact-review items (from scripts/pseo/fact-review.md)

None. All previously flagged figures have been checked off. ✅

## 4. How to resolve (weekly workflow)

1. Open each flagged URL and check the figure against the official authority portal.
2. If the figure is correct, update the authority fact sheet (`src/data/fact-sheets/{authority}.ts`) so future pages reuse it.
3. Mark the page verified: `npx tsx scripts/pseo/weekly-report.ts --verify <slug>`
4. Check off the matching `- [ ]` item in `scripts/pseo/fact-review.md`.
5. Re-run this script (`npm run pseo:report`) to regenerate the report.

---
_Automated report from the pSEO domination engine. See plans/pseo-domination-engine-plan.md._
