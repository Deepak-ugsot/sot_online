# Ecosystem

"Built by upGrad School of Technology. Designed To Reach Beyond The Campus." — a dark
band holding a fanned collage of the group's six brands, the figures behind them, and a
closing line naming the ecosystem once more.

The heading is three parts, not two: `lead` and `tail` in white with `accent`
("upGrad School of Technology.") in brand red partway through the first sentence. `tail`
carries the line break as a `\n` so the break lives with the copy rather than as a
`<br />` in JSX, and it is disabled below `sm` where the line wraps naturally anyway.

## Public API

- `EcosystemSection` — the whole section. The only export routes should use.
- `EcosystemLogo`, `EcosystemStat`, `EcosystemHeadingCopy` — shared types.

```tsx
import { EcosystemSection } from "@/features/ecosystem";
```

## Structure

```text
ecosystem/
├── components/
│   ├── ecosystem-section.tsx   # Heading + the two blocks  ("use client")
│   ├── ecosystem-collage.tsx   # The fanned brand cards (server)
│   └── ecosystem-stats.tsx     # The figures (server)
├── constants/
│   └── ecosystem.constants.ts  # Copy, logo + stat data, selector map
├── hooks/
│   ├── use-ecosystem-reveal.ts # Staggered entrance
│   └── use-ecosystem-tilt.ts   # 3D hover tilt
├── types/
│   └── ecosystem.types.ts
├── index.ts                    # Public API
└── README.md
```

## The fan is data, not layout

Each card carries its own angle in the data (`rotation`), handed to CSS as a
`--rotate` custom property — a plain number, multiplied by the wrapper's `--fan` and
by `1deg` at the point of use, so the whole fan can be eased off on a phone without a
second set of angles in the data. Cards overlap by 14px and paint in DOM order, so each
sits over the one before it — **reordering `ecosystemLogos` re-stacks the fan.**

**A negative angle leans the card inward, a positive one outward.** Left to right:
`-27°, 18°, 12°, -13°, -3°, -8°` — in, out, out, then inward for the last three, so
the row opens up through the middle and closes at both ends.

### The one trap worth knowing about

**The angle is applied through `transform`, never the standalone CSS `rotate`
property.** The hover tilt animates the card's transform matrix; a standalone
`rotate` would *compose* with that rather than be replaced by it, and every hovered
card would come out rotated twice. Keeping the base angle in `transform` means GSAP
simply takes ownership of it, while `--rotate` stays readable so the tilt can return
the card to its own angle on `pointerleave` — not to 0, which would flatten the
collage one card at a time as the cursor crossed it.

For the same reason the reveal animates the collage **wrapper**, never the cards: a
card's `y` would overwrite its transform and silently drop the rotation. Same split
the mentors marquee uses.

## Two hooks, because they gate differently

| Hook                 | Runs when                                         |
| -------------------- | ------------------------------------------------- |
| `useEcosystemReveal` | `prefers-reduced-motion: no-preference`           |
| `useEcosystemTilt`   | …and `(hover: hover)` — a real pointer, not touch |

`(hover: hover)` matters: on touch, `pointermove` fires on tap and would leave a card
frozen mid-tilt with no `pointerleave` to reset it.

**Reveal** — heading children stagger in at 0.1s, then the collage and the figures
each fade and rise as they reach the viewport. Every block is triggered off itself
rather than the section, because the section top clears the trigger line long before
the lower blocks are on screen.

**Tilt** — up to 14° toward the cursor via `gsap.quickTo`, with a 1.12 scale and a
14px lift, all 0.4s `power2.out`. The hovered card is raised to `z-index: 10` so it
clears the two it overlaps.

`scaleX`/`scaleY`, not `scale`: GSAP routes the `scale` alias through the standalone
native CSS property, which does not compose with the transform matrix these cards
already carry — it silently fails to animate.

## Responsive behaviour

| Width       | Collage                                    | Figures                       |
| ----------- | ------------------------------------------ | ----------------------------- |
| Below 600   | 3 per row, cards `26vw`, fan at half       | 2 columns, last one spans both|
| 600–900     | wraps at 150px, fan at three-quarters      | 4 columns from 768, no rules  |
| 901–1279    | one row, 14px overlap, full fan            | 4 columns, no rules           |
| `xl` (1280) | one row, 14px overlap, full fan            | 7 columns with rules          |

### The collage shrinks and the fan eases off, together

**The card is fluid below its 150px cap (`clamp(5rem, 26vw, 9.375rem)`) so three fit
across a phone.** At a flat 150px only two fit on a 375px screen, so the six came down
as a 2×3 block over 520px tall — and because a rotated square's bounding box is wider
than the square, each card's corners then cut into both the card beside it and the row
above.

**The fan angle is scaled by `--fan` on the wrapper: half below 600px, three-quarters
to 900px, full from 901px.** The scatter is what the collage is for, but -27° on a 96px
card reads as a pile rather than a fan, and the swing is what drives the corners into
their neighbours. The angles stay in the data as plain numbers and CSS multiplies them
— the tilt hook reads `--rotate` and `--fan` and composes them the same way, so a
desktop window dragged narrow still returns a hovered card to the angle it is actually
resting at.

**8px of column gap below 360px, 12px above.** At 12px the third card wraps by a single
pixel on a 320px screen and the whole fan falls back into the 2×3 block.

The border and radius come down with the card (`4px`/`22px` → `3px`/`14px`) so a 96px
card is not framed like a 150px one, and the section's own band eases from 100/120px of
padding to 72/96px below 700px — the same breakpoint the dashboard section uses.

### The figures

**The rules only appear once all seven figures are on one row.** While the grid wraps,
a left-hand rule would fall down the middle of a row rather than between two
neighbours.

**Seven columns wait for `xl` because that is where the container stops growing.** At
1280px each column is 176px, the first width that clears the widest figure ("3000+",
136px at full size) plus its padding — measured slack 8px. Showing seven any earlier
pushed that figure out over its own rule.

The figure is fluid (`clamp(2rem, 6vw, 2.5rem)`) for the same reason: a flat 40px
overflows a half-width column on the narrowest phones. It eases down to 32px there and
is back at its designed 40px from 667px up, before the grid ever reaches four columns.

**Seven items over two columns leave an orphan, so the last one spans the row.** Left
in a single column it sat under the left-hand figure with a hole beside it, reading as
a dropped cell rather than the end of the list.

**The pair is packed to the top of its cell (`justify-end` on a reversed column).**
"Corporate clients trained annually" wraps to two lines and used to push its own figure
out of step with the one beside it; pinning the figures to a shared line lets the long
label grow downward instead. It settles the `xl` row for the same reason.

Verified with no horizontal overflow and every figure inside its column at 320, 360,
375, 390, 768, 1024, 1100, 1280 and 1440.

## Images

Brand artwork, in `public/assets/ecosystem/`. **The filename is the logo's `id`**, the
same convention the showcase uses, so a card and its artwork cannot drift apart.

They are small transparent PNGs (74–124px wide), served as-is rather than through a
responsive ladder. Each carries its brand name as `alt` — unlike the mentors marquee,
this is a short static set that is genuinely part of the content.

**Each logo is scaled to the card's whole 118px content box, not left at its natural
size.** The artwork ranges from 74px to 124px wide, so left intrinsic the smaller
marks sat lost inside the card while the wider ones filled it — the six read at
noticeably different weights. `object-contain` keeps every aspect ratio while making
them consistent.

The four wide marks are still being scaled *down* to fit. `upgrad.png` (74×87) and
`upgrad_enterprise.png` (90×90) are the two that scale up, by 1.36× and 1.31× — fine
at 1× but soft on a retina display. Re-exporting just those two at ~250px on their
long edge would clear it; nothing in the code needs to change.

## Relationship to the reference

Matches the reference implementation measurement for measurement: section background
`#0a0a0b`, container `1280px` at `100px 24px 120px` with a `60px` gap, heading block
`892px` / `24px` gap, title `clamp(30px, 3.8vw, 52px)`, subtitle
`clamp(16px, 1.8vw, 24px)`, cards `150×150` / `22px` radius / `4px` border / `22px`
padding, `-14px` overlap, figures `40px` semibold in brand red over `16px` white
labels.

**Deliberate deviations:**

- **The figures are a static grid with rules, not a marquee.** The reference scrolls
  them on a 22s loop; the design this was built from shows a settled row divided by
  rules, and the page already carries two marquees directly above this section.
- **The figures are a `<dl>`** — each is a term and its value — with the label first
  in the DOM and `flex-col-reverse` putting the figure on top, so a screen reader
  announces "Learners, 10 M+".
- The collage is a `<ul>` with real `alt` text; the reference leaves the logos
  decorative.
