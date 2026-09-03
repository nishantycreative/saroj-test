# Saroj Ensemble — SKILL.md

Portable design-system skill for the Saroj Ensemble brand surface (marketing homepage + e-commerce surfaces).

## Brand

Saroj Ensemble — premium Indian ethnic & contemporary wear. Sarees, kurta sets, lehengas, accessories, seasonal gifting. Positioning: bold editorial luxury with real sales-drive — a confident black-and-white foundation, gold as the luxury signal. (Redesign v2.)

## Palette

- Dominant canvas: white `#FFFFFF`; soft bone band `#F4F1EB` used sparingly
- Real black `#0A0A0A` as a genuine secondary background — story, deal strip, styling booking, newsletter, footer (full-bleed black sections, white/gold text)
- Gold `#B08D57` (+ `#C6A15B`, `#8F6F3F`) as a confident accent: solid CTA fill, discount badges, star ratings, active states, dividers, hover states
- Ink: `#0A0A0A` (never gray-black); warm taupe `#5F5A52` secondary text on white; cream `#F5F1E8` text on black

## Type

- Display: Fraunces (serif, variable 100–900) — bold/black-weight headlines, hero, section titles, brand statements. Oversized on purpose.
- Body/UI: Jost (sans) — body, labels, forms, prices
- All-caps labels: 11px/600, letter-spacing 0.2em
- Italic serif for accent flourishes and brand-statement callouts
- Commerce hierarchy on cards: discounted price bold → MRP strikethrough → "% OFF" gold

## Motion

- Unhurried baseline: 0.55–0.8s, easing `cubic-bezier(.22,.68,0,1)`
- Named variants (components/ui/Reveal.tsx): Reveal (fade+rise), ClipReveal (clip-path wipe), WordsReveal (per-word), CountUp, useTilt (cursor-reactive), Ken-Burns scale, scroll-jacked horizontal rail (Lookbook), pinned/sticky image (feature spread), marquee ticker

## Structure

- Token file: `tokens/colors_and_type.css`
- Brand notes: `brand/voice-and-tone.md`, `brand/style-notes.md`
- Live app: project root (Next.js App Router + Tailwind v4 + framer-motion); Tailwind theme tokens mirror this file

## Rules

1. Gold is a highlight and a solid fill — never a large flat background.
2. Alternate white and black sections down the page for real visual rhythm.
3. Headlines are bold and oversized — never light-weight serif.
4. Whitespace over density, but sections must feel alive: badges, tags, ticker, stats.
5. Every placeholder image in the app is marked `TODO_CLIENT_IMAGE` for client-supplied replacements.
