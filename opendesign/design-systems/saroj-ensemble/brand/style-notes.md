# Style Notes — Saroj Ensemble (Redesign v2)

## Visual foundations

- **Color roles**: white = canvas (most sections); bone `#F4F1EB` = soft bands only (reviews, calculator); black `#0A0A0A` = real section backgrounds (story, deal strip, styling booking, newsletter, footer); gold = action + emphasis — CTA fill, discount badges, stars, dividers, active states; taupe = secondary text on white; cream = text on black.
- **Rhythm**: white and black sections alternate down the page — strong contrast, editorial scroll.
- **Surface treatment**: flat fields, hairline borders in `rgba(black, 0.12)`, hard shadows for floating surfaces (`0 30px 70px -28px rgba(10,10,10,.4)`).
- **Radii**: 0–2px on editorial surfaces; 999px only on pills/swatches.
- **Cards**: image-top cards, bold serif titles, Amazon-style price hierarchy (discounted price bold → MRP strikethrough → gold "% OFF"), star rating + review count, urgency tags.

## Type usage

- Hero: Fraunces black (900), `clamp(2.6rem → 6.5rem)`, tight leading ~0.98, uppercase, word-reveal animation.
- Section titles: Fraunces black (900), `clamp(2rem → 3.25rem)`, tight tracking; eyebrow label: 11px caps, gold, 0.2em tracking.
- Body: Jost 16px/1.7; taupe for meta.
- Brand statement: oversized italic serif on black (Our Story, feature spread).
- Prices: discounted price bold; MRP struck through in taupe; "% OFF" in gold.

## Imagery

- Editorial luxury fashion photography; bold contrast; alternate "view 2" product photos for hover-swap.
- Overlays: bottom-only scrims `linear-gradient(180deg, transparent 35%, rgba(10,10,10,.72))` for caption legibility; minimal top scrims where needed.
- All current images are placeholders from Unsplash, marked `TODO_CLIENT_IMAGE` in `lib/data/*`.

## Motion

- Entrance: fade + 24px rise, 0.7s, `cubic-bezier(.22,.68,0,1)`, staggered per element.
- Headlines: clip-path wipe or per-word staggered rise (hero + major section titles).
- Ken-Burns: slow continuous scale/pan on hero + story imagery.
- Lookbook: scroll-jacked horizontal gallery (vertical scroll drives horizontal travel).
- Feature spread 2: pinned/sticky image, copy scrolls past.
- Ticker: continuous marquee below the hero.
- Hover: product image swaps to alternate view; cursor-reactive tilt on product + category cards; image zoom 1.05–1.06.
- Stats: count-up when trust strip scrolls into view.
- Ambient: store card slow zoom 1.06.

## Component conventions

- Buttons: primary = gold fill / black text (a real "buy now" moment); black = black fill / cream text; secondary = black hairline; hover = gold-light / soft-black. Caps 0.16em, 54–60px tall.
- Inputs: 1px hairline, white fill, focus ring = gold.
- Product card: 4:5 image with hover-swap, tags top-left (gold "% OFF", black urgency/badge), wishlist top-right, quick-add slides up on hover, info row with stars + reviews + price.
- Section rhythm: 112px vertical padding desktop, 64px mobile.
- Icon style: 1.5px stroke, black ink, gold on active.
