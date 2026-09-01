# BuildSpace

"Build More. Ship Faster. With BuildSpace." — the pitch on a dark, red-lit ground, over a
window that plays a self-running tour of the BuildSpace product.

## Public API

- `BuildspaceSection` — the whole section. The only export routes should use.
- `BuildspaceChapter`, `BuildspaceChapterId`, `BuildspaceCtaCopy`,
  `BuildspaceCursorBeat`, `BuildspaceHeadingCopy` — shared types.

```tsx
import { BuildspaceSection } from "@/features/buildspace";
```

## Structure

```text
buildspace/
├── components/
│   ├── buildspace-section.tsx    # Ground, glows, beams, copy, CTA  ("use client")
│   ├── buildspace-demo.tsx       # The scaled canvas + tour wiring  ("use client")
│   └── demo/
│       ├── demo-icon.tsx         # The product mock's icon set
│       ├── demo-chrome.tsx       # Product top bar
│       ├── demo-library.tsx      # Chapter 1: the dashboard
│       ├── demo-workspace.tsx    # Project header, tabs, step rail
│       ├── demo-panels.tsx       # Chapters 2-6: the five workspace panels
│       ├── demo-outro.tsx        # Chapter 7: the sign-off
│       ├── demo-cursor.tsx       # The simulated pointer
│       └── demo-compact.tsx      # The phone tour
├── constants/
│   ├── buildspace.constants.ts   # Copy, chapters, cursor beats
│   └── demo.constants.ts         # Everything the product mock displays
├── hooks/
│   ├── use-buildspace-reveal.ts  # Entrance reveal
│   └── use-demo-tour.ts          # The tour clock
├── types/
│   └── buildspace.types.ts
├── index.ts                      # Public API
└── README.md
```

## The section is dark, and that is the point

This is the page's one dark break between the showcase and the mentors band. BuildSpace is
itself a dark, lime-accented product; on a light ground a mock of it reads as a screenshot
pasted onto a brochure, while on near-black the window reads as a screen that is switched
on. The section stops describing the product and starts showing it.

The ground is `bg-ink-raised` (`#1b1b1f`), which already existed for the ecosystem band.
Over it sit two `pointer-events-none` layers:

1. **Corner glows** — a large brand-red radial bleeding in from the top right, and a much
   fainter one bottom left so that corner is not flat black.
2. **Folded light beams** — a `repeating-linear-gradient` at 115°, masked by a radial from
   the top-right corner.

The beams are broad ribbons, not hairlines, and the gradient *inside* each band is what
makes them read as folded: bright pink-red highlight, down through brand red, into black
before the next band starts. A flat two-stop repeat at this angle reads as hazard stripes
instead. The radial mask keeps them a corner treatment — the pattern is gone by 78% of the
way from the top right, so the beams reach into the section and dissolve rather than
crossing it.

The vertical padding (78 top / 80 bottom) is load-bearing: the corner glow is sized from
the section's *width*, so a shorter section makes the glow fill more of it and the broad
light corner collapses into a sliver.

## The demo is a fixed canvas, scaled

`BuildspaceDemo` renders a **1280x880** canvas and scales it with one `transform` to fit
the mount (capped at `53.75rem` / 860px, so about 0.67).

Every panel inside is real product chrome at real product sizes — 10px labels, 5px
progress bars, a 196px rail. A fluid version would need every one of those to be a
`clamp()`, at which point the proportions drift with the container and it stops looking
like an app. One `scale()` keeps the composition exact and costs nothing: a single
compositor transform, recomputed only on resize.

The canvas never scales *up*. Past 1280px of mount width it would enlarge 10px type into
14px type, which reads as a zoomed screenshot rather than a screen.

`aspect-ratio` on the frame reserves the exact height before the canvas is measured, so
the section never reflows on mount.

## Below 901px it is a different component, not a smaller one

At 375px the canvas would scale to 0.29 — 10px labels become 3px and every panel is grey
noise. Nothing about the desktop composition survives the reduction, so phones get
`DemoCompact`: the same seven beats rendered one legible card at a time, each showing the
single thing its chapter is about.

The outer narration line and chapter chips are desktop-only. The compact card already
prints the chapter title as its own headline and carries progress dots, so on a phone both
would be the same information twice — and the chips are a pointer affordance that would
mostly intercept scrolls under a tall card.

## Every panel is a pure function of the clock

`useDemoTour` publishes `{ index, progress }`. Each panel derives its whole animated state
from `progress` — a character count, a number of revealed score rows, whether the submit
has landed — with **no panel-local state and no timers anywhere**.

That is what lets the tour be paused, resumed and jumped around: any position renders
correctly on the first frame. `phase(progress, start, end)` re-scales `progress` into a
window so one number can sequence several things across a chapter.

Two consequences worth knowing:

- **The tour publishes at ~16fps, not 60.** The fastest thing driven off `progress` is the
  answer typing itself out, at roughly a character every 40ms. Anything genuinely
  continuous — score bars, the milestone bar, cursor travel — is a CSS transition on a
  value that only changes when a discrete reveal fires, so it stays on the compositor
  regardless of how coarsely the clock ticks.
- **Nothing publishes while parked.** Off screen or held, the loop skips `publish`
  entirely. `publish` builds a fresh object each call, so React cannot bail out on an
  equal value, and a throttled publish would re-render the whole canvas every 62ms for the
  whole time nobody is looking at it. `hold`, `release` and `goTo` each force one publish.

Playback is gated on an `IntersectionObserver`: the section is deep in a long page, and
without it the tour would animate a canvas nobody is watching — and a viewer scrolling
back would arrive mid-sentence in whichever chapter the clock had reached.

## Two orderings that have to agree

`buildspaceChapters` and `demoSteps` are separate arrays, and the rail is the tour's spine
— the viewer reads progress from how far down it the highlight has moved. A step that
comes later in `demoSteps` than its chapter does in `buildspaceChapters` sends the
highlight *backwards* mid-tour and re-locks a step just watched being completed.

This is why **Build sits before GitHub** in the rail, unlike the real product: the tour
builds the milestone first, then shows the commits it produced.

`buildspaceCursorBeats` is indexed to match `buildspaceChapters` too. Its coordinates are
hand-placed against the rendered canvas rather than measured — measuring a target every
frame is a layout read inside the tour loop, for a pointer that only needs to be near the
right button. The trade is that moving a panel's controls means re-checking the beat that
clicks them.

## Design tokens live in `globals.css`, scoped to `.bsd-root`

The product mock is a different design system from this site: lime accent, four levels of
dark surface, its own typeface. Its tokens are scoped to `.bsd-root` rather than added to
`@theme` — promoting them would put `bg-bsd-lime` on every element on the site and invite
the product's palette to leak into the marketing pages.

`.bsd-caret` (the blinking insertion point) and `.bsd-shimmer` live there too, since both
need keyframes.

## Why there is no pin

The collage this replaced scrubbed a fold-into-the-laptop sequence across a
viewport-and-a-half of pinned scroll, because static artwork needed the scroll to give it
something to do. The window plays a tour on a clock of its own; pinning the page over it
would put two competing motions on screen and hand the viewer's scroll to the one they are
not watching. The reveal is now a one-shot entrance and nothing else.

## Reduced motion

`useDemoTour` stops on the **AI review, complete** — the chapter that best explains the
product in one still frame, and unlike the plan or the ship form it does not depend on an
animation having run to make sense. The chapter chips still work; they just do not start a
clock. The entrance reveal is skipped entirely by `gsap.matchMedia`.

## The mock's data is invented

Everything in `demo.constants.ts` is fabricated product data for a marketing surface — no
request is made and nothing is real.

The project is the **e-commerce build** on purpose: every workspace panel is about a cart
and products API (`cartflow-api`, "Milestone 3: Cart & Products API", the guest-cart schema
question), so the project being opened has to be the one that work belongs to, or the tour
contradicts itself between the first chapter and the rest.

## Gotchas

- **`CHART.width` must equal the chart card's real inner width** (1008 = canvas 1280 −
  rail 196 − panel gutters 2×24 − card padding 2×14). The `<svg>` is `w-full` with a fixed
  height, so the default `preserveAspectRatio` letterboxes a narrower viewBox: the line
  renders centred with dead margins and the month labels no longer sit under their points.
- **The commit line is drawn with `stroke-dasharray`, not by rebuilding `d`.** One length
  and one offset animate on the compositor; recomputing the path per frame re-rasterises
  it and is the usual reason a chart like this stutters.
