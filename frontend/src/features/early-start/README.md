# Early Start

"Your Career Doesn't Start In Final Year." — the six stages of a career on a timeline
whose rail is drawn by the reader's scroll, with the section's claim and its CTA on a red
card beside it.

## Public API

- `EarlyStartSection` — the whole section. The only export routes should use.
- `EarlyStartCalloutCopy`, `EarlyStartHeadingCopy`, `EarlyStartStep` — shared types.

```tsx
import { EarlyStartSection } from "@/features/early-start";
```

Rendered on the landing page immediately below `CurriculumSection`, and in isolation at
`/dev/early-start`.

## Structure

```text
early-start/
├── components/
│   ├── early-start-section.tsx    # Heading, the two columns   ("use client")
│   ├── early-start-timeline.tsx   # The six stages and the SVG rail
│   └── early-start-callout.tsx    # Red card + CTA
├── constants/
│   └── early-start.constants.ts   # Copy, the stages, selectors
├── hooks/
│   └── use-early-start-reveal.ts  # Entrance reveal + scroll-drawn rail
├── types/
│   └── early-start.types.ts
├── index.ts                       # Public API
└── README.md
```

## The rail is drawn per step, not as one line down the list

Each step owns the rail segment **below its own dot**. The obvious alternative — one
absolutely-positioned line inside the list — has to know where the first and last
markers sit, an offset that moves with the type scale at every breakpoint and would have
to be re-measured in JS to stay exact. Doing it per step makes the geometry pure layout:
the segment is a flex child filling whatever space is left between one dot and the next,
at every width, with nothing measured.

Two consequences follow:

- **The vertical rhythm is padding on the text column, not a `gap` on the list.** A gap
  sits outside every row's content box, so the marker column would stop short of it and
  the rail would break between every step.
- **The segment is a `div` that flexes, with the `<svg>` absolutely filling it.** The SVG
  cannot be the flex child itself: it is a replaced element carrying an intrinsic
  150×150, and that intrinsic height is what the column measures its own content-based
  height from — so the column sizes itself *from* the segment and stands 150px tall in
  every row. `flex-1`, `min-h-0` and an explicit `height: 0` all fail here, because they
  change how the item is flexed rather than what it contributes to the measurement that
  decides the space being flexed. Taking the SVG out of flow removes the contribution.

## The line is drawn by scroll, one segment at a time

The rail is scrubbed, not played: `useEarlyStartReveal` puts every segment in one GSAP
timeline tied to the list's scroll position, so the line advances and retreats with the
reader.

Each segment is an SVG `<line>` with `pathLength={1}`, which restates its length as one
unit whatever its real height. One `stroke-dasharray` of `1` therefore covers any
segment — the dash is the whole line, the gap after it is the whole line — so a
`stroke-dashoffset` of 1 hides it and 0 draws it in full, and the same tween works on a
68px segment and a 92px one. The segments are drawn by default and only the hook takes
them away, so the rail is complete for a reader whose JS never runs.

The SVG carries no `viewBox`, so its user units are its own CSS pixels: `y2="100%"` is
exactly the height the box was given and the 1px stroke renders at 1px. A `viewBox` would
need `preserveAspectRatio="none"`, and the non-uniform scale that follows distorts both
the stroke weight and the dash pattern.

**Segment heights set the pacing.** Rows are not the same height — a two-line title or a
three-line description makes some segments half again as long as others — so equal
durations would make the line speed up and slow down as it passed through them. Each
segment gets a share of the timeline proportional to its measured height instead, which
is what keeps the draw tracking the scroll at a constant rate. That measurement is the
only thing here that can go stale, and it costs nothing when it does: the rail's geometry
is pure layout, so a resize can never break the line — at worst the pacing drifts a few
percent from a re-wrapped row, which is invisible against a scrub.

**It is the copy that animates, not the row.** A step's dot and its rail segment are in
the same `<li>`, so translating the row would carry the segment with it and break the
line every time a step arrived. The tween targets the text column only.

The heading and the card stay one-shot entrances — they are single blocks, and a scrub
has nothing in them to reveal progressively.

Under `prefers-reduced-motion` nothing is registered, so every element renders in place
with the rail drawn.

## The CTA is hand-rolled rather than `CtaButton`

Every variant of the shared button resolves its hover to brand red — `hover:bg-brand`,
or white-to-red for the footer's — which on this brand-red card would dissolve the
button into its own background at exactly the moment the pointer is on it. The treatment
is otherwise the same two-tone pill the buildspace section uses, for the same reason it
hand-rolls its own.

If a third section ever needs a CTA on a brand-red ground, that is the point to add an
`on-brand` variant to `CtaButton` rather than to copy this a third time.

## Layout notes

- The columns split only at `lg`. Below it the card would sit in a column too narrow for
  its claim to hold a sensible measure, so it drops beneath the timeline — which is also
  the reading order, since the card is the conclusion the list argues toward.
- The grid is `items-start`: stretched, the card would grow to the height of a six-step
  timeline and strand its CTA in the middle of an empty red field.
- The section shares the curriculum section's `surface` ground, `72rem` measure and
  gutters on purpose — the two read as one light band before the dark ecosystem section.
