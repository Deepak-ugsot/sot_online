# Tech Score

"The uGSOT Beyond Tech Score." — one white panel on the light ground, holding the score
itself on the left and the six measurements it is made of on the right.

Sits between [`early-start`](../early-start/README.md) and
[`ecosystem`](../ecosystem/README.md) on the page: the last light section before the
dark ecosystem band.

## Public API

- `TechScoreSection` — the whole section. The only export routes should use.
- `TechScoreDial`, `TechScoreStat`, `TechScoreStatId`, `TechScoreToolName` — shared
  types.

```tsx
import { TechScoreSection } from "@/features/tech-score";
```

## Structure

```text
tech-score/
├── components/
│   ├── tech-score-section.tsx   # Heading + the panel  ("use client")
│   ├── tech-score-ring.tsx      # The score, as a ring (server)
│   ├── tech-score-stat.tsx      # One stat card (server)
│   ├── tech-score-figure.tsx    # The six card figures (server)
│   └── tech-score-marks.tsx     # Third-party tool marks (server)
├── constants/
│   └── tech-score.constants.ts  # Copy, the six stats, selector map
├── hooks/
│   └── use-tech-score-reveal.ts
├── types/
│   └── tech-score.types.ts
├── index.ts                     # Public API
└── README.md
```

## One card, not eight

The dial and the stats are the same claim at two magnifications — the number, then its
working — so they share a single surface with a rule between them. Giving the dial its
own card would make it a seventh sibling and lose the "this is what the 67 is made of"
reading entirely.

The rule is one element that turns with the layout: a horizontal hairline across the
stack, a vertical one between the halves at `lg`. `self-stretch` is what gives it the
column's full height there, since a 1px track has no height of its own to stretch into.

Verified: three stat columns at 1280 and 1440, two from 320 up, with no page-level
horizontal overflow and no tile-level overflow at 320, 390, 560, 1024, 1280.

## The id is the join

`TechScoreStatId` keys three things that have to stay in step — the copy, the plate
glyph, and the figure drawn under it. Letting the constants *name* a glyph would allow a
card to pick an icon that contradicts its own figure; keying all three off one union
means a new card is a type error until every part of it exists.

## Everything lines up because the rows are equal

`auto-rows-fr` on the stat grid forces both rows to the same height, and each card is a
`h-full` column whose figure is pushed to the foot with `mt-auto`. That is what puts the
six graphics on one of two lines across the whole grid.

Without it, "Open-Source Contributions" — the only label that wraps to two lines — would
set its own row taller and pull its neighbours' graphics out of line with the row above.

Each figure also occupies the same fixed band (`4.5rem`), so a chart and a row of chips
sit on the same baseline rather than each sizing to its own content.

## The tile count is set by what the figures need

The stat grid is **two columns from the smallest width and three only at `xl`**, and both
halves of that are measured rather than picked.

One column on a phone gave every tile the full 300px to hold a number and a two-word
label, which read as six slabs stacked down the screen rather than as a breakdown of a
score — 228px per tile, 1935px of panel, 2252px of section at 390. Two columns brings a
tile to 152×145 and the section to 1208px.

Three columns needs more room than `lg` has. At 1024 they come out 140px wide, leaving a
100px content box, and the Open-Source card's four brand chips need 168px — they are
`shrink-0`, so they spilled straight out of the tile. `xl` is the first width where three
columns leave enough: 226px tiles, 186px of content, 18px of slack.

Below `560px` the figure is dropped entirely (`hidden min-[560px]:contents`). A tile's
content box is ~120px there — a chart squeezed into it is a smear, and four brand marks
cannot shrink that far and stay recognisable. It costs no information, since every figure
only ever restated the value printed above it. `contents` rather than `block` at the
breakpoint keeps the figure a direct flex child of the card, so its `mt-auto` still
reaches the foot.

## The ring and the number are one tween

They are the same value at two spellings. Running them on separate timelines would let
the arc land on 67 a frame before or after the digits do — the kind of mismatch a viewer
notices without being able to name it. So a single object is tweened and both are
written from its `onUpdate`.

The arc is **one stroked circle over another, not two arcs**: the track is the full
circle and the progress is the same circle dashed to `value`%, drawn on top. The gap
between the arc's ends is therefore exactly the remainder and can never drift out of
agreement with the printed number.

It animates `strokeDashoffset` rather than a transform, which repaints rather than
composites — so it cannot desync with ScrollSmoother's own transform of the page content
the way a compositor animation can. That failure has already happened once on this page,
in [`buildspace`](../buildspace/README.md).

Under reduced motion nothing is registered and nothing is hidden, so the panel renders
in place with the arc already at the score — no separate static branch to keep in sync.

## The tool marks are placeholders

`TOOL_MARKS` in `tech-score-marks.tsx` carries GitHub, VS Code, GitLab and Vercel as
inline paths. **They are reconstructions and want replacing with the official SVGs
before launch** — the same standing as `career-os`'s stock portraits. They are built
from each mark's published geometry and read correctly at 18px, but only the vendor's
own file is the vendor's own logo.

Swapping them is a change to that map alone: nothing else in the feature names a tool,
and the GitHub mark doubles as the plate glyph on the Open-Source Contributions card
(Lucide dropped its brand icons, so that one cannot come from the icon set).

`plate` and `ink` come in pairs because two of the four are single-colour silhouettes
that need a coloured ground to be recognisable — GitLab's orange, Vercel's black — while
the other two are dark-on-light.

## The figures are drawn, not written

Three cards draw a chart and three draw a row of chips. The chips are **spaced, not
overlapped**: a stack reads as "and N more" — the cohort-strip idiom — where these rows
enumerate every tool, and four marks in four brand colours turn into mush at the seams.

The two curves share one path and differ only in hue, drawn as an S rather than a
straight climb: a line that starts flat, turns, and levels off reads as a trajectory
where a diagonal reads as decoration. They stretch with `preserveAspectRatio="none"`, so
the stroke carries `vector-effect="non-scaling-stroke"` to hold its weight through the
non-uniform scale.

The streak bars are capped at `15rem`. They are `flex-1`, so on the wide card the one-
and two-column layouts hand that tile they would otherwise grow into slabs.

Every figure is `aria-hidden`: each one restates the value and label directly above it.
