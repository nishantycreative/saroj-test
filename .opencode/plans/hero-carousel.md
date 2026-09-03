# Implementation Plan: Homepage Hero — 2D Garment Model Carousel

## Context
Replace the existing homepage hero (a 2-slide Ken Burns/parallax carousel) with a new full-viewport hero carousel displaying 2D photographic garment-model cutouts. Each slide has a different background color, model image, and copy block. Background, ghost text, model positions, and UI copy all crossfade together over 650ms.

## Codebase Adaptation Notes
The prompt specifies "React + TypeScript + Vite + Tailwind CSS" but the actual codebase is **Next.js 16.3.1 (App Router)**. Adaptations:
- Use `next/image` (already used throughout) instead of raw `<img>` — but since hero images are transparent PNGs with `objectFit: contain`, we'll use `<img>` for the model cutouts (Next Image doesn't support `objectPosition: bottom center` well with `contain`).
- Use `next/link` for navigation (consistent with Button component pattern).
- Use `framer-motion` for animations (already the site's motion vocabulary, `useReducedMotion` support built-in).
- Use `lucide-react` as requested (needs to be installed — not currently in project).
- Use Tailwind v4 CSS-first theme tokens from `globals.css` (`--font-display`, `--font-body`, color tokens like `cream`, `gold`, `forest`).

---

## Step 1: Install `lucide-react`
```bash
npm install lucide-react
```

## Step 2: Create Hero Image Directory & Placeholder Images
```bash
mkdir -p public/images/hero
```
**Action needed from user:** Place the 4 transparent PNG files:
- `public/images/hero/hero-saree.png`
- `public/images/hero/hero-anarkali.png`
- `public/images/hero/hero-womens-suit.png`
- `public/images/hero/hero-menswear.png`

## Step 3: Add Missing Collection Categories
File: `lib/data/categories.ts`

Add 3 new entries to `SHOP_CATEGORIES`:
- `{ id: "sarees", labelKey: "nav.mega.sarees", taglineKey: "categories.sarees.tagline", image: "catSarees", headerImage: "headerSarees" }`
- `{ id: "anarkali-suits", labelKey: "nav.mega.anarkali", taglineKey: "categories.anarkali.tagline", image: "catAnarkali", headerImage: "headerAnarkali" }`
- `{ id: "menswear", labelKey: "nav.mega.menswear", taglineKey: "categories.menswear.tagline", image: "catMenswear", headerImage: "headerMenswear" }`

**Note:** This will require corresponding i18n keys and image entries. If images don't exist yet, use existing placeholder images (e.g., `catSuits` for all). The `notFound()` guard in the collections page will be satisfied.

## Step 4: Create New Hero Component
File: `components/sections/HeroCarousel.tsx`

### Structure:
```
"use client"
├── SLIDES data array (4 HeroSlide objects)
├── HeroCarousel component
│   ├── State: activeIndex, isAnimating, isMobile
│   ├── useEffect: image preloading (new Image() × 4)
│   ├── useEffect: resize listener for isMobile
│   ├── navigate('next'|'prev'): animation-locked rotation
│   └── Render:
│       ├── Outer div (bgColor transition, full viewport)
│       ├── Grain overlay (optional SVG noise)
│       ├── Ghost text (giant category label)
│       ├── Top-left "SAROJ ENSEMBLE" brand label
│       ├── Carousel (4 model images, role-based positioning)
│       │   └── Center model wrapped in Link to /collections/{slug}
│       ├── Bottom-left text block (eyebrow, headline, subtext, nav arrows)
│       └── Bottom-right CTA button (Link to /collections/{slug})
```

### Animation approach:
- **CSS transitions** (not framer-motion) for the 650ms crossfade — this matches the prompt's spec and avoids layout thrashing with AnimatePresence on 4 absolute-positioned elements
- `useReducedMotion` check: if true, skip transitions (instant swap)
- `willChange: transform, filter, opacity` on model items
- Background color transition on outer div

### Role-based positioning (per spec):
| Role | Desktop Transform | Mobile Transform | Filter | Opacity |
|---|---|---|---|---|
| center | translateX(-50%) scale(1.68) | translateX(-50%) scale(1.25) | none | 1 |
| left | translateX(-50%) | translateX(-50%) | blur(2px) | 0.85 |
| right | translateX(-50%) | translateX(-50%) | blur(2px) | 0.85 |
| back | translateX(-50%) | translateX(-50%) | blur(4px) | 1 |

### Click behavior:
- Center model → `Link href={/collections/${slug}}` with cursor pointer, hover scale 1.02
- Bottom-right CTA → same Link
- Arrow buttons → `navigate('prev')` / `navigate('next')`

## Step 5: Update Homepage
File: `app/page.tsx`

Replace:
```tsx
import { Hero } from "@/components/sections/Hero";
// ...
<Hero />
```
With:
```tsx
import { HeroCarousel } from "@/components/sections/HeroCarousel";
// ...
<HeroCarousel />
```

Keep the old `Hero.tsx` file intact (not deleted) for easy rollback.

## Step 6: Verify
1. Run `npm run build` (or `next build`) to verify no type errors
2. Visually verify: background crossfade, ghost text, model positioning, blur, nav arrows, CTA links
3. Test mobile layout (< 640px) — models should be smaller, text stacked differently
4. Test reduced-motion: transitions should be instant
5. Click center model → navigates to correct collection page
6. Click CTA → navigates to same collection page

---

## Files Modified
| File | Action |
|---|---|
| `components/sections/HeroCarousel.tsx` | **NEW** — full carousel component |
| `app/page.tsx` | Swap `<Hero />` → `<HeroCarousel />` |
| `lib/data/categories.ts` | Add 3 missing collection slugs |
| `public/images/hero/` | **NEW** directory (user provides images) |

## Files Read-Only (reference)
- `components/sections/Hero.tsx` — old hero (kept for rollback)
- `components/ui/icons.tsx` — existing icon set (used for fallback if lucide fails)
- `components/ui/Button.tsx` — button patterns
- `components/ui/Reveal.tsx` — `EASE_LUX` constant
- `app/globals.css` — theme tokens
