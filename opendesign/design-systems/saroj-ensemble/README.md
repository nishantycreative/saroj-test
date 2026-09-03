# Saroj Ensemble — Design System

Design system for Saroj Ensemble, a premium Indian ethnic-wear e-commerce brand (sarees, kurta sets, lehengas, accessories). **Redesign v2:** bold black-and-white editorial foundation with gold as the luxury signal — white-dominant canvas, real black section backgrounds, confident gold fills, oversized Fraunces headlines, sales-driven product cards.

## Tokens

- [`tokens/colors_and_type.css`](tokens/colors_and_type.css) — canonical color + type + motion tokens (raw + semantic)

## Brand docs

- [`brand/voice-and-tone.md`](brand/voice-and-tone.md)
- [`brand/style-notes.md`](brand/style-notes.md)

## Source of truth

Derived from the client's redesign brief (v2, 2026): bold editorial direction referencing duchesskumari.com (art direction), amazon.in (commerce mechanics: MRP/discount/stars/urgency), fabcurate.com (Indian D2C energy). Palette = white / black / champagne-gold. Display serif = Fraunces (self-hosted, variable 100–900); body = Jost. No logo file supplied yet — logo is a placeholder wordmark pending client asset.

## Usage in Phase 2/3

Phase 2 (interactions) and Phase 3 (Shopify wiring) should consume tokens from `tokens/colors_and_type.css` rather than re-deriving the palette. The app lives at the project root (Next.js + Tailwind v4 + framer-motion); Tailwind theme tokens mirror this file. Motion variants live in `components/ui/Reveal.tsx`.
