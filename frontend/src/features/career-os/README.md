# Career OS

"Introducing Career OS" — a seven-tile card grid on the light ground: six capability
tiles arranged around one red call to action.

Distinct from [`not-another-course`](../not-another-course/README.md), which is the
*other* Career OS section ("A Career Operating System."). The two were named apart
deliberately so neither could shadow the other.

## Public API

- `CareerOsSection` — the whole section. The only export routes should use.
- `CareerOsTile`, `CareerOsFeature`, `CareerOsSpotlight`, `CareerOsColumn`,
  `CareerOsIllustrationName`, `CareerOsMediaHeight` — shared types.

```tsx
import { CareerOsSection } from "@/features/career-os";
```

## Structure

```text
career-os/
├── components/
│   ├── career-os-section.tsx      # Heading + the three columns  ("use client")
│   ├── career-os-item.tsx         # One capability card (server)
│   ├── career-os-spotlight.tsx    # The red CTA card (server)
│   └── career-os-illustration.tsx # The six panel illustrations (server)
├── constants/
│   └── career-os.constants.ts     # Copy, the columns, selector map
├── hooks/
│   └── use-career-os-reveal.ts
├── types/
│   └── career-os.types.ts
├── index.ts                       # Public API
└── README.md
```

## Columns are written out, not computed

The layout is a composition, not a feed: the spotlight has to land in the third column
beside the two tall tiles, and the three short tiles have to stack three-up in the
middle. CSS masonry (or a flat list plus `columns-*`) would reshuffle that on every
copy edit, so `careerOsColumns` states the three stacks directly.

Below `1024px` each column wrapper drops to `display: contents`. That dissolves the
wrapper, and its tiles become direct children of the parent grid — so the same DOM
flows two-up, then one-up, with no duplicate markup for the narrow layouts. The order
in the constant is therefore also the reading order.

Verified: `grid-template-columns` reads three tracks at 1440, two at 900 and one at
390, with all seven tiles at the full track width and no page-level horizontal
overflow at any of them.

## The masonry is the panel heights

Nothing sets a card height. Each tile names a `media` height for its illustration panel
(`short` 6rem, `medium` 9.5rem, `tall` 16.2rem), and those are chosen so the outer
columns' two tall tiles finish level with the middle column's three short ones —
measured at **1282 / 1281 / 1282px** at 1440 wide.

`tall` is `16.2rem` rather than a round number for exactly that reason. Change a tile's
copy by more than a line and these want re-measuring.

The spotlight carries `lg:flex-1`: it is the one tile whose height is free, so it takes
up whatever slack its column has and keeps the third column's bottom pinned to its
neighbours'. `justify-between` then holds the badge at the top and the copy at the
bottom however tall it lands — the gap between them is the design.

## Illustrations are drawn, not written

Each panel is a wireframe of a real product surface — a path in progress, a streak
grid, a podium, the placement curve — built from blocks, bars and glyphs. Copy belongs
to the title and description right beneath the panel; a panel full of small text
competes with them and reads as a screenshot rather than an illustration. At most one
figure survives per panel, where the number *is* the point (72%, 14, 92%).

Connect & Grow is the exception, and deliberately so: it carries the running session's
name, because a row of faces without it is a crowd rather than a community, and the
tile has nowhere else to say it.

Its portraits — and the two on Compete & Win — come from `careerOsCommunity`, five
256×256 files under `public/assets/community/`. They are **placeholders**: stock
photographs from Unsplash, face-cropped via `fit=facearea` and downloaded rather than
hot-linked, so the tile carries no runtime dependency on an outside host. They are
still real strangers; swapping in real students changes only those five files.

They are DOM and SVG rather than exported images: crisp at any tile width, they pick up
the brand red from the same token as the rest of the page, and six files cannot go
missing. Every one centres its content, so a panel that is ever cropped crops evenly
top and bottom — verified: no illustration overflows its panel at 1440, 900 or 390.

The placement chart is stretched with `preserveAspectRatio="none"`, so its stroke
carries `vector-effect="non-scaling-stroke"` and its end marker is a positioned element
rather than an SVG circle — a scaled circle would render as an ellipse.

Avatars are drawn silhouettes on a fixed five-tone palette, not photographs: the tiles
illustrate a cohort, and stock faces would read as specific (unnamed) people.

## The reveal

Seven tiles cascade in: `autoAlpha 0 → 1`, `y: 24 → 0`, 0.6s `power2.out`, 0.08
stagger, `once: true`.

Triggered off the **grid**, not the section — the heading block sits well above the
tiles, so the section top clears the trigger line before any of them are visible.

Under reduced motion nothing is registered and nothing is hidden, so the tiles render
in place with no separate static branch to keep in sync.
