# BUILD DIRECTIVE FOR ROO CODE — Bilingual Implementation, Final Decisions
**Read this before writing any code.** This resolves conflicts between the original master plan, the technical addendum, and your own refined plan. Where this directive differs from your refined plan, THIS DIRECTIVE IS AUTHORITATIVE — do not implement the conflicting version.

---

## 🚨 NON-NEGOTIABLE CONSTRAINT #1 — Do not change existing English URLs

**Your refined plan's Phase 1.1 restructures English routes to `/en/...` and redirects `/` → `/en/`. Do not do this.**

Correct architecture:
- English pages stay exactly where they are today: `/`, `/approvals/[slug]`, `/guides/[slug]`, `/services/[slug]`, `/about-us`, `/contact-us` — **zero URL changes, zero redirects, zero re-parenting.**
- Arabic pages are added at `/ar/`, `/ar/approvals/[slug]`, `/ar/guides/[slug]`, `/ar/services/[slug]`, `/ar/about-us`, `/ar/contact-us`.
- This is an **addition to the site, not a migration of it.** Every currently-indexed, currently-ranking English URL must return an identical response (same status code, same content, same performance) before and after this build, at every phase.

### Corrected route architecture
Do not use a `[locale]` segment wrapping both languages symmetrically. Instead:

```
src/app/
├── layout.tsx                        ← existing root layout, UNCHANGED for English
├── page.tsx                          ← existing English homepage, UNCHANGED
├── approvals/[slug]/page.tsx         ← existing, UNCHANGED
├── guides/[slug]/page.tsx            ← existing, UNCHANGED
├── services/[slug]/page.tsx          ← existing, UNCHANGED
├── ar/
│   ├── layout.tsx                    ← NEW — Arabic-specific layout (lang="ar-AE", dir="rtl", Arabic font, Arabic Header/Footer)
│   ├── page.tsx                      ← NEW — Arabic homepage
│   ├── approvals/[slug]/page.tsx     ← NEW
│   ├── guides/[slug]/page.tsx        ← NEW
│   ├── services/[slug]/page.tsx      ← NEW
│   ├── about-us/page.tsx             ← NEW
│   └── contact-us/page.tsx           ← NEW
```

This is simpler than a `[locale]` param approach and, critically, it makes it structurally impossible to accidentally touch the existing English route tree while building Arabic — the two trees are physically separate. Shared logic (schema generators, nav data, locale utils) lives in `src/lib/` and is imported by both trees, not the other way around.

### Corrected middleware
- **No Accept-Language-based auto-redirect.** No redirect of `/` under any condition.
- `middleware.ts` scope is limited to: normalizing `/ar` (no slash) → `/ar/` (301/308), and nothing else on first visit.
- Language switcher (Header + Footer + MobileNav) is the only way a user changes language. On manual switch, set a `NEXT_LOCALE` cookie for UI preference memory only — never use it to auto-redirect the root path.

---

## ✅ Approved from your refined plan (build these as specified)

- **Phase 0**: Bilingual data model as parallel files (`approvals-ar.ts`, `guides-ar.ts`, `services-ar.ts`) — approved, WITH ONE ADDITION below (parity validation).
- **Phase 0.3–0.4**: Arabic font (Noto Sans Arabic or Tajawal — your choice, either is fine) via `next/font`, and the `AR` constants object for UI strings — approved as written.
- **Phase 2**: Keyword research workflow and DeepSeek localization pipeline targeting the actual `.ts` data files — approved as written.
- **Phase 3**: Language switcher, Header/Footer/MobileNav/MegaMenu localization, CSS logical-properties file audit — approved as written.
- **Phase 4**: Locale-aware schema generators, sitemap with `alternates.languages`, robots.ts update, `og:locale` fix — approved as written, but hreflang generation must reference the corrected route structure above (no `/en/` prefix on English URLs).
- **Phase 5**: Arabic GEO content structure, `src/app/ar/llms.txt`, Arabic internal linking — approved as written.
- **Phase 6**: GBP Arabic setup, NAP consistency, social strategy — approved as written (content/ops task, not blocking code).
- **Phase 7–8**: Lighthouse test matrix, pre-launch checklist, monitoring — approved, WITH ONE ADDITION below (regression gate).

---

## ➕ Additions required (not in either prior plan)

### 1. Data parity validation script (prevents silent drift between parallel files)
Build `scripts/validate-ar-parity.js`, run in CI on every PR touching `src/data/*`:
- Confirms every entry in `approvals.ts` has a matching entry in `approvals-ar.ts` (by stable ID, not array index — add a stable `id` field if one doesn't exist, since array-index matching breaks silently if entries are reordered).
- Fails the build if any English entry has no Arabic counterpart, or if an Arabic entry references a slug that doesn't resolve.
- Same for `guides` and `services`.

### 2. English regression gate (this is what prevents "crashing the current site")
Before merging **any** phase to `main`/production:
- Run Lighthouse on a fixed sample of 5 existing English URLs (homepage + 2 approvals + 1 guide + 1 service) and diff against the pre-build baseline. **Any drop of more than 2 points on Performance is a blocking failure**, not a warning.
- Run a link-check / route smoke test confirming every existing English URL still returns 200 with unchanged `<title>`, canonical, and word count (a simple content-hash comparison against the pre-build snapshot is enough — it catches accidental shared-component breakage).
- This gate runs at the end of **every phase**, not just before final launch — catching a regression in Phase 1 is cheap, catching it in Phase 8 after 100+ Arabic pages are built on top of it is expensive.

### 3. Deployment strategy
- All work happens on a feature branch (`feature/arabic-market`), deployed to Vercel preview URLs — never directly to production.
- Merge to production **only after Phase 7 QA passes in full**, as a single deploy that adds the `/ar/` tree — since English routes are untouched by construction (see architecture above), this deploy is additive and carries no regression risk to existing rankings by design, not just by testing.
- Keep the ability to instantly revert (single commit revert) for at least 2 weeks post-launch in case an unforeseen interaction surfaces.

---

## Build sequence (final, gated)

| Phase | Deliverable | Gate to pass before next phase |
|---|---|---|
| 0 | Data model + parity script + fonts + AR constants | Parity script passes on empty/stub Arabic data |
| 1 | `src/app/ar/` route tree + corrected middleware | English regression gate passes; `/ar/` returns 200 with placeholder content |
| 2 | Keyword map + DeepSeek pipeline + populated `-ar.ts` files | Parity script passes on real data; human review sign-off on pricing/legal fields |
| 3 | Language switcher + nav localization + RTL CSS audit | English regression gate passes; manual switcher test both directions on 5 page types |
| 4 | Schema + hreflang + sitemap + robots + og:locale | Google Rich Results Test validates both locales; hreflang reciprocity check (Screaming Frog or equivalent) shows zero errors |
| 5 | GEO structure + llms.txt + internal linking | Spot-check 5 Arabic pages against the answer-first structure rule |
| 6 | GBP + social (ops task, can run in parallel with 3–5) | — |
| 7 | Full Lighthouse matrix + pre-launch checklist | 95+ on all EN and AR page types; English regression gate passes one final time |
| 8 | Merge to production, submit sitemaps to GSC, start monitoring | — |

**Do not skip a gate to save time. A gate failure at Phase 1 costs an hour to fix. The same failure discovered at Phase 8 costs a full re-audit of everything built on top of it.**
