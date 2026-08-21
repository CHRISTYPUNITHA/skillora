# CodeCraft — Design Spec (Figma Handoff)

Use this alongside `codecraft-prototype.html` to rebuild the 9 screens as real Figma frames. Set these up as **Local Styles / Variables** first — every screen reuses the same tokens.

## 1. Color Styles

| Token | Hex | Usage |
|---|---|---|
| `navy/950` | `#0B0A24` | Darkest background edge (hero gradient end) |
| `navy/900` | `#100D2E` | Dark nav bar, hero background, auth background |
| `navy/800` | `#181637` | "Why CodeCraft" section bg |
| `purple/600` | `#6C4CF0` | Button gradient end, brand mark |
| `purple/500` | `#7C5CFC` | Primary buttons, links, active tab, progress bars |
| `purple/400` | `#9B87FF` | Headline highlight word ("next product") |
| `purple/50` | `#F1EEFF` | Icon chip backgrounds, active list item bg |
| `teal/400` | `#33D9E8` | Code icon accent (hero) |
| `green/500` | `#22C55E` | Success check circle, "included" checkmarks |
| `green/50` | `#EAFBF1` | KPI icon chip bg |
| `amber/400` | `#FB923C` | "Best Seller" badge, streak flame |
| `gray/25` | `#F7F8FA` | — |
| `gray/50` | `#F5F6FA` | App page background (light pages) |
| `gray/100` | `#EEF0F5` | Dividers, progress track bg |
| `gray/200` | `#E4E7EE` | Card borders, input borders |
| `gray/300` | `#D3D7E1` | Outline button border |
| `gray/500` | `#8A8FA3` | Secondary text |
| `gray/600` | `#5F6478` | Body text on light bg |
| `gray/800` | `#2B2D42` | Outline button text |
| `gray/900` | `#15162A` | Headings on light bg |
| `white` | `#FFFFFF` | Card fills |

**Gradients**
- Primary button: linear 180°, `purple/500 → purple/600`
- Hero background: radial from top-left, `#1A1650 → navy/900 → navy/950`
- Course thumbnail (default): linear 135°, `navy/900 → purple/600`
- Course thumbnail (green variant): linear 135°, `#0E3B2E → #14B87F`
- Course thumbnail (amber variant): linear 135°, `#3B2A0E → #E8A33D`

## 2. Typography

Base family: **Inter** (fallback: SF Pro / system-ui). All weights via Inter: Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800.

| Style name | Size | Weight | Line height | Use |
|---|---|---|---|---|
| Display/H1 | 30px | 800 | 1.15 | Hero headline |
| H2 | 22–28px | 800 | 1.2 | Page titles (Explore Courses, My Learning) |
| H3 | 17–19px | 800 | 1.25 | Card/section titles, course detail title |
| Body/Base | 13px | 400–500 | 1.5 | Paragraph copy |
| Body/Small | 11–12px | 400–500 | 1.4 | Descriptions, meta text |
| Caption | 10–10.5px | 500–600 | 1.3 | Timestamps, tags, badges |
| Label | 11px | 600 | 1.3 | Form field labels |
| Button | 13px | 600 | 1 | All button text |
| Eyebrow/Tag | 10px | 700 | 1 | "BEGINNER TO INTERMEDIATE" uppercase tags |

## 3. Spacing & Layout

- Base unit: **4px**. Common gaps: 4 / 8 / 10 / 12 / 14 / 16 / 20 / 24 / 28.
- Card padding: 12–16px.
- Section padding (desktop frame): 20–24px horizontal.
- Corner radius: `sm=8px` (buttons, inputs, chips) · `md=12px` (cards, thumbnails) · `lg=16px` (page-level cards, auth card, modal) · `full` (pills, avatar, progress bar).
- Card shadow: `0 1px 2px rgba(20,20,43,0.04), 0 4px 16px rgba(20,20,43,0.06)`.
- Button shadow (primary): `0 8px 24px rgba(76,60,180,0.16)`.
- Grid: 3-column card grids use 14–16px gutter; auth/checkout use 2-column 50/50 or 60/40 splits.

## 4. Components to build as Figma components (with variants)

1. **Navbar** — variants: `dark` (landing) / `light` (app pages). Props: active nav item.
2. **Button** — variants: `primary`, `outline`, `outline-dark`; sizes: `default`, `sm`. States: default/hover/disabled.
3. **Course Card** — thumbnail (3 gradient variants), tag, title, description, meta row (duration/lessons), price, CTA.
4. **Input Field** — label + text field, default/focus/error states.
5. **KPI / Stat Card** — icon chip, number, label. Used on Dashboard and Hero stats.
6. **Progress Bar** — track + fill, used in course cards and continue-learning.
7. **Circular Progress Ring** — used in My Learning summary (conic gradient, 53% example).
8. **Badge/Pill** — `Best Seller` (amber), streak flame chip, tab active indicator.
9. **List Item (lesson row)** — index, title, duration, active/current state (purple/50 bg + purple/600 text).
10. **Card / Panel** — generic white card, 1px `gray/200` border, `md` radius, used across checkout, receipt, pricing.

## 5. Screens (9 total) — structure notes

1. **Landing Page** — dark navbar → hero (headline + CTA + visual panel + 3 stats) → dark "Why CodeCraft" 3-card row.
2. **Courses Page** — light navbar → page header + search/filter row → 3-column course card grid.
3. **Course Details Page** — back link → 2-column: (hero banner + tabs + "what you'll learn" grid) / (sticky price card).
4. **Auth Pages** — dark full-bleed background, centered white card (max-width ~360px), toggle between Sign In / Sign Up.
5. **Checkout Page** — page header → 2-column: order summary card / payment details card with CTA + card-brand icons.
6. **Payment Success Page** — centered success icon + message → receipt card → 2 action buttons.
7. **Dashboard Page** — light navbar → greeting → 4-column KPI row → 2-column (continue learning / recent activity).
8. **My Learning Page** — light navbar → title → 2-column: enrolled course list (with progress bars) / progress ring summary card.
9. **Course Player Page** — minimal top bar → 2-column: video player + lesson info / scrollable lesson list sidebar (active lesson highlighted).

## 6. How to bring this into Figma fastest

- **Option A (recommended):** Install the community plugin **"html.to.design"**, paste in `codecraft-prototype.html`, and it will generate real Figma layers/auto-layout frames you can then clean up against the tokens above.
- **Option B:** Build the tokens as Figma Variables first (colors + spacing + radius), assemble the 10 components in section 4, then lay out each of the 9 screens using the structure notes in section 5 — this gives the cleanest, most editable file.
- Either way, use **Auto Layout** for every card/row so the file resizes cleanly, and turn the 10 components into real Figma Components (not just grouped frames) so instances stay in sync.
