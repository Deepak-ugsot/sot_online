# Real World

"Digital By Design. Real-World By Experience." — the claim over two tilted ribbons of the
things students actually do, drifting in opposite directions behind a student.

## Public API

- `RealWorldSection` — the whole section. The only export routes should use.
- `RealWorldExperience`, `RealWorldHeadingCopy`, `RealWorldRibbon` — shared types.

```tsx
import { RealWorldSection } from "@/features/real-world";
```

Rendered on the landing page immediately below `EarlyStartSection`, and in isolation at
`/dev/real-world`.

## Structure

```text
real-world/
├── components/
│   ├── real-world-section.tsx   # Heading, portrait, the ribbon group
│   └── real-world-ribbon.tsx    # One tilted, drifting band
├── constants/
│   └── real-world.constants.ts  # Copy, the experiences, ribbon geometry
├── types/
│   └── real-world.types.ts
├── utils/
│   └── real-world.utils.ts      # Experiences → the segments of one track
├── index.ts                     # Public API
└── README.md
```

## No client JavaScript

The whole device is CSS — two keyframes and a transform — so the section is a Server
Component. It is the only section on the page that animates without shipping anything to
the browser, and worth keeping that way: a scroll-driven version would need GSAP, a ref
and a `"use client"` boundary to produce a drift that is already constant by definition.

## The loop

Each ribbon holds **two identical tracks** side by side and slides the pair by exactly
-100% of one track's width. That moves a track precisely its own measure, which puts its
twin where it began, so the cycle restarts with no visible jump. The same trick the One
Program rails use, and it shares their `marquee-left` / `marquee-right` keyframes in
`globals.css`.

Two things follow, and both are load-bearing:

- **The chips meet flush — no `gap`.** A ribbon is a continuous band, so a gap would break
  it into floating chips; and because a trailing gap sits outside the track's measured
  width, every cycle would land a few pixels short and the band would jolt once per loop.
- **A track has to be at least as wide as the ribbon's visible span.** At the extreme of
  the cycle only one track is covering the screen. The experiences therefore repeat three
  times inside a track — see `TRACK_REPEATS`, which carries the arithmetic. Two repeats
  covers a laptop and starts showing bare background at the right edge of an ultrawide.

## The ribbons are much wider than the stage

A rotated band the width of its container pulls its own corners inside the frame and
leaves a wedge of bare background at each edge. At `135%`, centred, both ends sit outside
the stage at every angle the design uses, so the band reads as passing through rather than
as sitting in. `overflow-hidden` on the section clips it — that rule is the layout, not
hygiene, and removing it puts ribbons across the whole page.

## The colours alternate by position

Black, red, black, red the whole way down. Nothing is drawn between chips — the change of
ground is what separates one label from the next — so a chip's colour is purely a function
of its index and `buildRibbonTrack` computes it. Authoring a colour per experience as well
would let the data and the rendering disagree, with nothing to say which was right.

The parity is read across the **whole track**, not per repeat, which is what keeps the
alternation running through the seam where one repeat meets the next. That holds only
while the list has an even length: an odd one flips the phase on every repeat and puts two
chips of the same colour together where the loop closes. Six experiences today.

## Accessibility

The ribbon group is `aria-hidden`, and the six experiences are given once as `sr-only`
text. Each ribbon repeats the list three times and is then duplicated for the loop, so
left readable this would announce the same six phrases a dozen times over — in an order
that is a function of the animation rather than of the content.

The portrait's `alt` is empty on purpose. It is decorative: it carries nothing the heading
and the list do not already state, so naming it would only put a description of stock
photography between them.

Under `prefers-reduced-motion` the bands simply stop: the animation is the only thing
gated, and a static track is already wide enough to span the stage, so what is left is the
same composition with the ribbons held still.

## Layout notes

- The portrait is the only thing here in normal flow with an intrinsic size, so it sets
  the stage's height — which is what the ribbons' `top` percentages are measured against.
- **The negative top margin on the portrait is the layout.** It and the heading occupy
  opposite sides of the stage and never collide horizontally, so pulling the portrait up
  into the heading's band is what closes the dead space a plain stack would leave. This
  couples the portrait's position to the heading's rendered height, which is stable only
  because the `<br />` fixes the heading at two lines from `lg`.
- At 1440px the composition resolves to the design's own measurements: a 1440x806 stage
  against 1436x796, a 576x691 portrait at x=720 against 570x696 at x=720, and a 203x56
  chip against 200x56.
- The section shares the early-start section's `surface` ground: that section lays out
  *when* a career starts, this one names *what* fills it, and the two read as one light
  band.
