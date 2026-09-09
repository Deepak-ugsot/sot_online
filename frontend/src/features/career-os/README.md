# Career OS

"Everything In One Place." — an eight-tile card grid on the light ground, three
columns of capabilities with no chrome between them.

Distinct from [`not-another-course`](../not-another-course/README.md), which is the
*other* Career OS section ("A Career Operating System."). The two were named apart
deliberately so neither could shadow the other.

## Public API

- `CareerOsSection` — the whole section. The only export routes should use.
- `CareerOsFeature`, `CareerOsColumn`, `CareerOsIllustrationName`,
  `CareerOsMediaHeight` — shared types.

```tsx
import { CareerOsSection } from "@/features/career-os";
```

## Structure

```text
career-os/
├── components/
│   ├── career-os-section.tsx      # Heading + the three columns  ("use client")
│   ├── career-os-item.tsx         # One capability card (server)
│   └── career-os-illustration.tsx # The eight panel illustrations (server)
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

The layout is a composition, not a feed: the two tall tiles belong together in the
middle, flanked by three short ones on either side. CSS masonry (or a flat list plus
`columns-*`) would reshuffle that on every copy edit, so `careerOsColumns` states the
three stacks directly.

Below `1024px` each column wrapper drops to `display: contents`. That dissolves the
wrapper, and its tiles become direct children of the parent grid — so the same DOM
flows two-up, then one-up, with no duplicate markup for the narrow layouts. The order
in the constant is therefore also the reading order.

Verified: `grid-template-columns` reads three tracks at 1440, two at 900 and 580, and
one at 390, with all eight tiles at the full track width and no page-level horizontal
overflow at any of them.

## The masonry is the panel heights

Nothing sets a card height. Each tile names a `media` height for its illustration panel
(`short` 6rem, `medium` 8.5rem, `tall` 15.65rem), and those are chosen so the middle
column's two tall tiles finish level with the outer columns' three short ones —
measured at **825 / 824 / 825px** at 1440 wide.

The outer columns deliberately carry the same three heights in mirrored order
(`short short medium` against `medium short short`), so they balance against each other
for free whatever the numbers are. That leaves only `tall` to solve for, which is why
it is `15.65rem` rather than a round figure. Change a tile's copy by more than a line
and it wants re-measuring.

## Illustrations are drawn, not written

Each panel is a wireframe of a real product surface — a path in progress, a streak
grid, a leaderboard, a repository tree, the placement curve — built from blocks, bars
and glyphs. Copy belongs to the title and description right beneath; a panel full of
small text competes with them and reads as a screenshot rather than an illustration.
Where a figure survives it is because the number *is* the point (72%, 14, 64%, 92%).

Three panels keep words, and only the ones the tile has nowhere else to say:

- **Connect & Grow** carries the running session's name — a row of faces without it is
  a crowd rather than a community.
- **Contribute** names the parts of a repository a student ends up in, ending on the
  pull requests row picked out in red. Bars here would draw an anonymous list, and
  *which* parts is the whole point.
- **Track** names the goal and how far through it the week is, because "64%" alone is a
  percentage of nothing.

Its portraits — and the two on Compete & Win — come from `careerOsCommunity`, five
256×256 files under `public/assets/community/`. They are **placeholders**: stock
photographs from Unsplash, face-cropped via `fit=facearea` and downloaded rather than
hot-linked, so the tile carries no runtime dependency on an outside host. They are
still real strangers; swapping in real students changes only those five files.

They are DOM and SVG rather than exported images: crisp at any tile width, they pick up
the brand red from the same token as the rest of the page, and eight files cannot go
missing. Every one centres its content, so a panel that is ever cropped crops evenly
top and bottom — verified: no illustration overflows its panel at 1440, 900, 580 or
390.

Track's `+18%` pill is the one illustration on a green, and it is a local hex rather
than a token: the pill is a *comparison*, and in brand red it would read as a warning
rather than as progress. Nothing else on the page needs a positive-delta colour yet.

The placement chart is stretched with `preserveAspectRatio="none"`, so its stroke
carries `vector-effect="non-scaling-stroke"` and its end marker is a positioned element
rather than an SVG circle — a scaled circle would render as an ellipse.

## The reveal

Eight tiles cascade in: `autoAlpha 0 → 1`, `y: 24 → 0`, 0.6s `power2.out`, 0.08
stagger, `once: true`.

Triggered off the **grid**, not the section — the heading block sits well above the
tiles, so the section top clears the trigger line before any of them are visible.

Under reduced motion nothing is registered and nothing is hidden, so the tiles render
in place with no separate static branch to keep in sync.
