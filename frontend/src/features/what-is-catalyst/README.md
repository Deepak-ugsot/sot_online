# What is uGSOT Catalyst

The one-paragraph answer to what the product *is*, the people who built it, and a hand
fanning out the six things it is made of.

## Public API

- `WhatIsCatalystSection` — the whole section. The only export routes should use.
- `CatalystArtwork`, `CatalystEmployerLogo`, `CatalystHeadingCopy` — shared types.

```tsx
import { WhatIsCatalystSection } from "@/features/what-is-catalyst";
```

Rendered on the landing page directly below `HeroSection` and above
`BeyondCollegeSection`, and in isolation at `/dev/what-is-catalyst`.

## Structure

```text
what-is-catalyst/
├── components/
│   ├── what-is-catalyst-section.tsx     # Layout, copy, the render   ("use client")
│   └── catalyst-employer-marquee.tsx    # The drifting logo band
├── constants/
│   └── what-is-catalyst.constants.ts    # Copy, artwork, logos, selectors
├── hooks/
│   └── use-what-is-catalyst-reveal.ts   # Entrance reveal
├── types/
│   └── what-is-catalyst.types.ts
├── index.ts                             # Public API
└── README.md
```

## Where it sits, and why

The page opens on a claim. This says plainly what the product is, and only then does
"Already chosen your college?" start arguing for it. It is also the first light band
after the dark hero, which is why the render's soft shadows have somewhere to fall.

## The render is positioned, not placed in the grid

At `lg` the artwork is `position: absolute` inside the section's measure. That is the
whole layout, and it is a deliberate choice over the obvious grid build.

The design has the render **larger than the column it nominally occupies**, standing
taller than the copy and starting above where the copy starts. A render in flow can do
neither without dragging the row's height around with it.

The grid version is worse than merely awkward. Put the copy and the logo band in two
rows of a left column, with the render spanning both rows beside them, and CSS hands the
spanning item's extra height to the rows it spans — so the taller the render gets, the
further apart it prises the paragraph and the logos. The gap grows with the artwork,
which is exactly backwards.

Positioned instead, the render is free to be any size, and the copy keeps the interval it
was given (`lg:mt-40`, the design's own) — a fixed number precisely so nothing else can
inflate it.

**The containing block is the `<section>`, not the measure inside it.** That is the one
thing about this layout worth reading twice. The arm has to reach the edge of the
*screen*: the file's own content runs to its right border — the forearm is already cut
there — so wherever the render stops, that flat edge stops with it. Held to the page's
`84rem` measure it stopped 72px short of the window at 1440 (and far further on a wide
monitor), leaving a band of bare grey after the arm that read as a picture which had run
out. Pinned to the section, `lg:right-0` is the window's edge and the same cut reads as
the arm continuing off-screen.

Two consequences follow:

- the inner `84rem` container must **not** be `relative`, or the render resolves against
  the measure again;
- `lg:w-[43%]` is a percentage of the *section*, so the render scales with the window it
  is pinned to. `lg:max-w-[46rem]` stops it becoming a wall of hand on an ultra-wide
  monitor.

`lg:top-5` is a positive offset, and that is the fix for the other failure mode. The
file's top 2% is transparent, so 20px seats the wrist about 30px below the section's
edge with the whole hand inside the band. Pulling it negative sliced the forearm flat
against the section boundary, which reads as a rendering fault rather than as a hand
reaching in.

**Width, offset and the section's own padding are one set of three, not three knobs.**
The file is nearly square, so its width sets its height; the height plus the offset
decide where card 06 lands; and only `lg:py-40` can move the section's floor out of its
way. Enlarging the render without deepening the padding drops the last card out of the
bottom — every step up in the render's size is paid for there. `lg:max-w-[46rem]` is the
same constraint as a ceiling: past roughly 1470px the percentage would ask for a render
taller than the band, so the growth stops rather than the card doing so.

Measured at 1440: the render is 720x664 flush with the window's right edge, the hand is
whole from 5% of the section's height, and the cards run from 14.8% to 90.8%. At 1920
the cap holds it at 736px and the cards end at 92.4%.

`overflow-hidden` on the section is a guard rather than a crop — it catches whatever the
arm overhangs and keeps a render pinned to the viewport's edge from widening the
document by a pixel of rounding.

Below `lg` the container is a flex column and the render goes back into flow, ordered
*between* the paragraph and the logos: the cards are what the paragraph is describing,
and meeting the people who built it before hearing what it does gets the section
backwards.

### The cards are pixels

Every word on those six cards is part of `catalyst_pillars.png` — the tilt, the drop
shadows and the hand are one lit composition, and a CSS rebuild can approximate the fan
but not the hand. The consequence is that the six pillars exist nowhere else in the
section, so the image's `alt` is written out in full rather than left empty. It lives in
the constants file beside the file path, so the two cannot drift apart.

On a phone the render is about 330px wide and the card text is too small to read. The
`alt` carries it for a screen reader; a sighted reader on a small screen gets the
composition and not the six labels. If that matters, the fix is a text list at that
width — not a larger render, which would still be illegible.

## The logo band drifts rather than scrolls

Six marks at a legible height measure past 750px, against roughly 600px of a half-page
column. Something had to give: shrink them until their own type stops being readable,
wrap them onto a second line — which turns a one-line credential into a block — or let
the row run. It runs.

The loop is the same trick the `real-world` ribbons and the `one-program` rails use:
identical tracks side by side, each translated a full `-100%` of its own width, so when
one has slid exactly off the left its neighbour stands precisely where it began. Three
details keep that honest:

- **Three copies, not two.** Each track travels its own full width, so at the end of a
  cycle the remaining `copies - 1` tracks are all that cover the window. The loop is
  seamless only while `(copies - 1) × trackWidth ≥ windowWidth`. The set measures ~770px;
  between `sm` and `lg` this column is the full page width and reaches ~975px, which two
  copies cannot cover and three can.
- **The spacing is the item's own right padding, not a `gap` on the track.** A `gap` sits
  *between* children, so there would be none between the last mark of one copy and the
  first of the next, and the seam would close up once per cycle. On the item, the spacing
  is inside the width the `-100%` is measured from.
- **Only the first copy is content.** The duplicates are `aria-hidden` with empty `alt`s,
  or a screen reader reads the six employers out three times.

Under `prefers-reduced-motion` the duplicates drop out and the remaining copy wraps, so
all six marks are still reachable — a static row would simply be clipped at the column's
edge with the last mark or two unreachable. The edge fades go with them: there is no
longer an edge for anything to cross.

## Copy and assets

All copy is in `constants/`. `catalyst_pillars.png` is the section's own render;
the employer marks come from `public/companyLogo/`, where **every file is 177px tall** —
which is why the band sets one height and lets each width follow, with no per-logo nudge.

Filenames are passed through verbatim. Their capitalisation is load-bearing: macOS
resolves `google.png` where the Linux deploy target does not, so a wrong case here passes
every local check and 404s only in production.
