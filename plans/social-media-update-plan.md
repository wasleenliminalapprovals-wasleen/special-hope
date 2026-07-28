# Social Media Update Plan

**Goal:** Replace outdated social media links with correct profiles from `reference/details/Social media profiles.txt` across Footer and Contact Us page, with all 9 platforms displayed.

---

## 1. Updated Social Media Constants (`src/lib/constants.ts`)

Replace the existing `SOCIAL` object with all 9 platforms:

```typescript
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
```

**Remove** the old `twitter` key (replaced by Threads/X alternatives).

---

## 2. Icon Strategy

| Platform | Lucide Icon Available | Icon to Use |
|---|---|---|
| Instagram | ✅ `Instagram` | `Instagram` from lucide-react |
| Facebook | ✅ `Facebook` | `Facebook` from lucide-react |
| Threads | ❌ | Custom SVG — Threads logo (simple "at" style icon) |
| LinkedIn | ✅ `Linkedin` | `Linkedin` from lucide-react |
| Pinterest | ❌ | Custom SVG — Pinterest "P" logo |
| YouTube | ✅ `Youtube` | `Youtube` from lucide-react |
| TikTok | ❌ | Custom SVG — TikTok music note logo |
| Reddit | ❌ | Custom SVG — Reddit alien head simplified |
| Quora | ❌ | Custom SVG — Quora "Q" logo |

### Custom SVG Design Principles

Each custom SVG will be:
- **24x24 viewBox** to match lucide-react icon sizing
- **`currentColor` fill/stroke** to inherit parent text color
- **`strokeWidth={1.75}`** consistent with sitewide icon stroke
- **Minimal, recognizable** — simple geometric representation of the brand mark

---

## 3. Footer Changes (`src/components/layout/Footer.tsx`)

### 3a. Update Imports

Replace the current social icon imports:

```typescript
// REMOVE these:
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

// ADD these:
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
```

### 3b. Create a `SocialIcons` Component

Create a reusable `SocialIcons` component (inline within Footer.tsx or as a shared component) that renders all 9 social links. This avoids repeating the custom SVG definitions.

**Design details:**
- Horizontal flex row with centered icons
- Each icon: `w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200`
- All wrapped in `<a>` tags with `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label`
- Icons are `size={16}` matching current footer icon sizing

### 3c. Replace `SOCIAL_LINKS` Array

```typescript
const SOCIAL_LINKS = [
  { label: "Facebook", href: SOCIAL.facebook, icon: Facebook },
  { label: "Instagram", href: SOCIAL.instagram, icon: Instagram },
  { label: "Threads", href: SOCIAL.threads, icon: ThreadsIcon },       // custom SVG
  { label: "LinkedIn", href: SOCIAL.linkedin, icon: Linkedin },
  { label: "Pinterest", href: SOCIAL.pinterest, icon: PinterestIcon }, // custom SVG
  { label: "YouTube", href: SOCIAL.youtube, icon: Youtube },
  { label: "TikTok", href: SOCIAL.tiktok, icon: TikTokIcon },          // custom SVG
  { label: "Reddit", href: SOCIAL.reddit, icon: RedditIcon },          // custom SVG
  { label: "Quora", href: SOCIAL.quora, icon: QuoraIcon },             // custom SVG
];
```

### 3d. Update `FooterCompanyColumn` 

Replace the inline social icons rendering loop with the new `SOCIAL_LINKS` array. The rendering pattern stays the same (loop over `SOCIAL_LINKS`).

### 3e. Custom SVG Icons

Define simple inline SVG components for the 5 missing platforms:

**ThreadsIcon** — Simple "at" symbol with a circle
```tsx
function ThreadsIcon({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8c-2.5 0-4 1.5-4 4s1.5 4 4 4c2 0 3-1 3-2.5S14 11 12 11c-1 0-1.5.5-1.5 1.5s.5 1.5 1.5 1.5" />
    </svg>
  );
}
```

**PinterestIcon** — Stylized "P"
```tsx
function PinterestIcon({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h4m0 0h4m-4 0v6" />
      <path d="M10 8c1-1 2.5-1 3 0s.5 1.5 0 2c-.5.5-2 1-2 1" />
    </svg>
  );
}
```

**TikTokIcon** — Music note
```tsx
function TikTokIcon({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path d="M15 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path d="M15 16V6" />
      <path d="M9 16V8" />
      <path d="M15 6c2 0 3-1 3-3" />
    </svg>
  );
}
```

**RedditIcon** — Simplified alien
```tsx
function RedditIcon({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="6" />
      <circle cx="9" cy="13" r="1" fill="currentColor" />
      <circle cx="15" cy="13" r="1" fill="currentColor" />
      <path d="M12 16c-1 0-1.5-.5-1.5-1" />
      <path d="M12 8c2-2 5.5-1.5 5.5.5" />
      <path d="M12 8c-2-2-5.5-1.5-5.5.5" />
    </svg>
  );
}
```

**QuoraIcon** — Stylized "Q"
```tsx
function QuoraIcon({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M14 16c.5 0 1-.5 1-1.5s-.5-2-1.5-2.5" />
      <path d="M10 8c3 0 4 1.5 4 3s-1 3-4 3" />
      <path d="M16 18l-1.5-3" />
    </svg>
  );
}
```

---

## 4. Contact Us Page Changes (`src/app/contact-us/page.tsx`)

### 4a. Add Social Media Section

After the CTA buttons block (lines 147-161), add a social media section:

```tsx
{/* ===== Social Media ===== */}
<div className="mt-10">
  <h3 className="text-h4 font-montserrat text-heading-text mb-4">
    Follow Us
  </h3>
  <div className="flex flex-wrap gap-3">
    {SOCIAL_LINKS.map((social) => (
      <a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-12 h-12 rounded-full bg-card-bg text-body-text/70 hover:bg-brand-blue hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label={`Follow us on ${social.label}`}
      >
        <social.icon size={20} strokeWidth={1.75} />
      </a>
    ))}
  </div>
</div>
```

### 4b. Animated/Hover Effects Details

| Effect | Implementation |
|---|---|
| Scale up | `hover:scale-110` — grows 10% on hover |
| Color shift | `hover:bg-brand-blue hover:text-white` — blue background with white icon |
| Shadow | `hover:shadow-lg` — elevated shadow on hover |
| Smooth transition | `transition-all duration-300` — 300ms ease for all properties |
| Group effect | `group` — future-proof for tooltip or child effects |

### 4c. Import Changes

The Contact Us page is a server component (exports `metadata`). Since it uses icons and JSX rendering, the social icons and custom SVGs need to be either:
- Inline in the same file (simpler, no `"use client"` needed for static SVG)
- Imported from a shared component

**Recommendation:** Extract `SocialIconsRow` into a shared component at `src/components/sections/SocialIconsRow.tsx` that can be used by both Footer and Contact Us page. This keeps the custom SVG definitions in one place.

---

## 5. Shared Component: `SocialIconsRow.tsx`

Create `src/components/sections/SocialIconsRow.tsx`:

- Exports `SocialIconsRow` component accepting props: `variant` ("footer" | "contact")
- Contains all 9 social icon definitions with platform → component mapping
- Renders differently based on variant:
  - `footer`: white-on-blue, small icons (16px), 9x9 rounded circles
  - `contact`: card-bg background, larger (20px), 12x12 rounded circles, hover effects
- `"use client"` only if interactivity is needed (not needed for static anchors)

This avoids duplicating the 5 custom SVG components across two files.

---

## 6. Files Modified

| File | Change Summary |
|---|---|
| `src/lib/constants.ts` | Replace `SOCIAL` with all 9 platforms + correct URLs; remove `twitter` |
| `src/components/sections/SocialIconsRow.tsx` | **NEW** — Shared component with all 9 social icons + custom SVGs |
| `src/components/layout/Footer.tsx` | Replace `SOCIAL_LINKS` array; use `SocialIconsRow` component; remove old inline icons |
| `src/app/contact-us/page.tsx` | Add social media section below CTA buttons with hover animations |

---

## 7. Implementation Order

1. Update `src/lib/constants.ts` with new SOCIAL object
2. Create `src/components/sections/SocialIconsRow.tsx` with all icon definitions
3. Update `src/components/layout/Footer.tsx` to use new component
4. Update `src/app/contact-us/page.tsx` to add social section
5. Verify build succeeds with `npm run build`

---

## 8. Visual Mockup

### Footer (Company Column)
```
[icon] WASLEEN LIMINAL
       APPROVAL CONSULTANTS

Dubai's trusted approvals consultancy...

[fb] [ig] [th] [in] [pi] [yt] [tt] [rd] [qu]
```

### Contact Us Page (below CTA buttons)
```
[WhatsApp Us]  [Call Now]

Follow Us
[fb] [ig] [th] [in] [pi] [yt] [tt] [rd] [qu]
```
(Icons displayed in a horizontal flex-wrap row with hover scale+color effects)
