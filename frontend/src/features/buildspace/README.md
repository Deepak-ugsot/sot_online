# BuildSpace

"BuildSpace — your engineering playground inside Beyond." The pitch down the left of a dark,
rainbow-washed ground, and a window playing a self-running tour of the BuildSpace product
down the right.

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

## Two columns above 1180px, stacked below it

The copy and the CTA hold the left column; the window — and the narration and chips that
belong to it — hold the right.

**1180 is set by the window, not by the copy.** The canvas scales to whatever width its
column gives it, so a split only pays for itself once the right column is still wide enough
for the mock to read as an application rather than as a thumbnail. Below that the window
takes the full measure with the copy centred above it, which is the composition this section
had throughout.

**The window's track is sized, the window is not.** The columns are
`[minmax(0,1fr) clamp(38rem,52vw,50rem)]`: the ceiling that keeps the mock from growing sits
on the *grid track*, and the copy takes whatever is left. Putting that ceiling on the item
instead — a `max-w-[50rem]` window inside a fluid track — turns the difference into dead
space between the columns; on a 1512 viewport a 72px gap rendered as a 144px hole and the two
halves stopped reading as one composition.

The grid is `items-center`: the copy is much the shorter of the two columns once the window
carries its narration and chips. For that centring to land, nothing in the right column may
reserve height it is not using — which is why the resume countdown is `absolute`.

## The section is dark, and that is the point

This is the page's one dark break between the showcase and the mentors band. BuildSpace is
itself a dark, lime-accented product; on a light ground a mock of it reads as a screenshot
pasted onto a brochure, while on near-black the window reads as a screen that is switched
on. The section stops describing the product and starts showing it.

The ground is near-black (`#08080a`). Over it, all `pointer-events-none`:

1. **The aurora** — one bounded, heavily blurred conic blob hung off the top right, behind
   the card, turning once every 18s.
2. **A light scrim** — a vertical gradient settling the floor and keeping the aurora's lower
   shoulder off the copy.
3. **Film grain** — `bg-grain`, the hero's utility, at 3.5% and un-blended.
4. **Lit top and bottom edges** — hairline gradients on both seams.

This replaced a brand-red corner glow and a set of folded red light beams.

### The palette is muted on purpose

Vercel's own gradients are pale — violet, rose, amber, mint. At full saturation behind a dark
card the effect stops reading as light and starts reading as a novelty rainbow, so every stop
here is softened and the 130px blur does the rest. The card's edge uses the same tones at 70%
opacity, so it looks lit by the glow rather than drawn on top of it.

### The aurora rotates, and getting back to a rotation took a detour

The first attempt drifted two 3000px-wide full-bleed gradients in opposite directions on CSS
keyframes, one of them in `mix-blend-mode: screen`, both pinned with `will-change`. It tore
the page apart — not this section, the whole page, with sections appearing to slide over one
another as it scrolled.

What survived the post-mortem is that the *pattern* was not the problem: the page's own
marquees are CSS transform animations inside the same ScrollSmoother content and have always
been fine. The problem was the scale of it — two enormous layers, a blend mode forcing a
re-blend of the whole section against a backdrop that moves on every scroll frame, and
`will-change` holding all of it resident.

So the aurora is **one bounded element, no blend mode, no `will-change`**, sized to the card
it sits behind and mostly outside the frame so the section clips it to a soft shoulder. The
blur is rasterised once and the cached result is what turns, so the expensive pass never
repeats.

**If tearing ever returns, `.bs-aurora`'s rotation is the first thing to turn off.** The
card's edge animation cannot cause it: see below.

### The card's edge animates without moving anything

`.bs-glow-border` (in `globals.css`) animates `--bs-angle`, a property registered with
`@property` — registration is what makes it interpolate at all, since an unregistered custom
property is only a string to the animation engine and would jump 0 → 360 with nothing in
between.

**That makes it a paint animation, not a compositor one, and on this page that is the
point.** The element never moves; only its gradient is redrawn, on the same thread
ScrollSmoother runs on. It cannot desync with the smoother the way a transform can.

The ring itself is a `::before` filled edge to edge with the conic gradient, then hollowed by
compositing two masks — one over the content box, one over the padding box — with `exclude`
(`xor` on the WebKit-prefixed pair). What survives is exactly the 1px of `padding`: a
border-shaped window onto a full gradient, which is not something CSS can otherwise do.
`border-radius: inherit` matters, or the ring cuts corners the card does not have.

Both animations are disabled under `prefers-reduced-motion`.


### Nothing over it may use `mix-blend-mode` either

A separate lesson from the same episode, and it still applies now the corner is static. A
blended element cannot be composited on its own — the browser re-blends it against its
backdrop every frame that backdrop moves, and under ScrollSmoother the backdrop moves on
every scroll frame. The second pass shipped as `mix-blend-screen` and the grain as
`mix-blend-overlay`; together they made scrolling through the section stutter well before
the tearing showed up. Both are plain alpha now.

The hero can keep its `overlay` grain: the hero's backdrop does not move.

## The demo is a fixed canvas, scaled

`BuildspaceDemo` renders a **1280x880** canvas and scales it with one `transform` to fit the
screen inside its frame — `53.75rem` / 860px stacked, and whatever the split layout's clamped
track gives it, topping out at `50rem` / 800px.

Every panel inside is real product chrome at real product sizes — 10px labels, 5px
progress bars, a 196px rail. A fluid version would need every one of those to be a
`clamp()`, at which point the proportions drift with the container and it stops looking
like an app. One `scale()` keeps the composition exact and costs nothing: a single
compositor transform, recomputed only on resize.

The canvas never scales *up*. Past 1280px of mount width it would enlarge 10px type into
14px type, which reads as a zoomed screenshot rather than a screen.

`aspect-ratio` on the frame reserves the exact height before the canvas is measured, so
the section never reflows on mount.

### The screen sits in a glass card

Glassmorphism proper — `rgba(20,20,20,0.6)` over `backdrop-filter: blur(20px)` — holding the
framed screen with padding, with the animated rainbow edge described above running round it.

The radii are concentric on purpose, and it is why this keeps a 32px radius rather than the
16px a glass card usually takes: `rounded-[32px]` against `p-3.5` leaves 18px, exactly the
screen frame's own radius inside it. Drop the outer to 16 and the inner corner is rounder
than the outer, which looks broken in a way nobody can name. The mobile pair (28 − 10) lands
on 18 too.

### Two traps in measuring the canvas

- **Measure the screen, not the mount.** Between them sit the card's padding and the frame's
  1px gradient — some 30px the canvas does not get. Measuring the mount puts the canvas's
  right edge under the frame's `overflow-hidden`.
- **The observed node lives in state, not a ref.** A ref plus a `[]`-dependency effect breaks
  silently the moment React *replaces* that node rather than updating it — wrapping the
  screen in another element does exactly that, and a Fast Refresh mid-edit leaves the
  observer watching a detached node that can never resize. The scale then freezes at whatever
  the old tree measured and the canvas renders that many pixels too wide for the rest of the
  session. Keying the effect on the node makes a swap re-run it.

`clientWidth` is deliberate for the initial read: the entrance reveal tweens `scale(0.97)` on
an ancestor, and a transformed rect would report 97% of the true width — wrong in the other
direction and just as sticky.

## Below 901px it is a different component, not a smaller one

At 375px the canvas would scale to 0.29 — 10px labels become 3px and every panel is grey
noise. Nothing about the desktop composition survives the reduction, so phones get
`DemoCompact`: the same seven beats rendered one legible card at a time, each showing the
single thing its chapter is about.

The narration line and chapter chips are desktop-only. The compact card already
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

The glow's bloom is skipped with the rest of the entrance, so it simply renders at full
strength. `useDemoTour` stops on the **AI review, complete** — the chapter that best explains the
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
