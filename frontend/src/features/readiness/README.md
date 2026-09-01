# Readiness

"Career Readiness Score" — a centred heading over a row of eight metric cards that
scroll sideways as the page scrolls down.

Built to the same pattern as the reference's *Introducing Career OS* section: a pinned
horizontal track, alternating card offsets, and a description that opens on hover.
Values below are read off that build, not invented.

## Public API

- `ReadinessSection` — the whole section. The only export routes should use.
- `ReadinessMetric` — shared type.

```tsx
import { ReadinessSection } from "@/features/readiness";
```

## Structure

```text
readiness/
├── components/
│   ├── readiness-section.tsx  # Heading + viewport/track  ("use client")
│   └── readiness-card.tsx     # One metric card (server)
├── constants/
│   └── readiness.constants.ts # Copy, metrics, pin threshold, selector map
├── hooks/
│   ├── use-readiness-reveal.ts # Heading entrance
│   └── use-readiness-track.ts  # The pin and the sideways pan
├── types/
│   └── readiness.types.ts
├── index.ts                   # Public API
└── README.md
```

## Vertical scroll drives the row horizontally

From `901px` the section pins and the track is panned left by exactly its own
overflow, at `scrub: 0.3`.

**Both the distance and the scroll runway are measured, never assumed.** Card widths
and track padding change with viewport width, so `track.scrollWidth - viewport.clientWidth`
is read off the rendered elements, and read again on every refresh (resize, font load,
image load) through the function forms of `x` and `end` plus `invalidateOnRefresh`.
Making the runway equal the distance is what gives the row its 1:1 feel — a fixed
guess would run fast at one width and slow at another.

Measured at 1440×900: track 2944px against a 1440px viewport, so 1504px of travel and
a 1504px pin runway, and the track sits at `x: -700` exactly 700px into the pin.

Below `READINESS_PIN_MIN_WIDTH` (901), and under reduced motion, **nothing is
registered** — no pin, no scrub, and no inline transform left behind. The viewport's
own `overflow-x: auto` then makes the row a swipeable, snapping scroller. That
fallback lives in the markup rather than a second branch of JSX, so there is only one
row to maintain. The threshold is exported because it has to agree in two places that
cannot see each other: the `min-[901px]:` utilities and the media query the hook
registers.

**The CSS pair is `max-[901px]` / `min-[901px]`, never `max-[900px]`.** Tailwind
compiles `max-[n]` to `width < n`, so `max-[900px]` against `min-[901px]` left 900px
exactly matching neither branch: the hook declined to register, and the viewport stayed
`overflow: hidden` over a 2400px track — 1500px of cards with no way to reach them.
`max-[901px]` and `min-[901px]` tile the axis with no gap and no overlap.

`w-max` on the track is load-bearing. It is what lets the track be wider than the
viewport, and that overflow *is* both the pan distance and the hand-swipe range.

## The row is full-bleed

No `max-width` on the viewport: the point of the layout is that cards run off both
edges of the screen, so a centred measure would defeat it. Only the track's own
padding (80px, 24px below the threshold) holds the first and last card off the edge.

The heading above it keeps the page's shared `84rem` measure.

## Card geometry

| | ≥ 901px | ≤ 900px |
| --- | --- | --- |
| Card | 327 × 391 | `min(72vw, 280px)`, at 14:17 |
| Gap | 24px | 16px |
| Track padding | 80px | 24px |
| Section padding | 80 / 96 | 56 / 64 |
| Every second card | dropped 70px | flush |

The 70px drop is what stops eight cards reading as one solid bar. It is dropped below
the threshold, where the row is swiped by hand and the offset would only cost height.
Which cards sit high and which sit low comes from their order in `readinessMetrics`.

Below the threshold the card is **sized off the viewport rather than fixed**. A fixed
280px card plus 24px of track padding leaves nothing showing on a 320px screen, and on
a hand-swiped row that peek is the only affordance there is — 72vw always leaves one.
It is capped at the same 280px so a wide phone in landscape does not get one enormous
card, and `aspect-[14/17]` is the 280 × 340 proportion held as the width moves.

Vertical padding comes down with it. 80/96 is measured for a pinned section that has to
fill its viewport; below the threshold there is no pin to fill and 96px of surface under
the row reads as a hole on a phone. 56/64 keeps the heading, the CTA and the first card
in one view at 375 × 812.

## The hover reveal

At rest: the photo, a scrim across the bottom, and the label. On hover, three things
move together over 450ms — a second scrim rises from the foot of the card to near its
top, the label grows from 24px to 26px, and the description opens beneath it
(`max-height` 0 → 10rem plus opacity). The photo scales to 1.05 over 600ms.

**The scrim is two stacked layers, not one gradient that changes.** Swapping a single
`background-image` between two gradients does not animate reliably — CSS only
interpolates gradients that match stop for stop — so the resting scrim stays put and a
second layer fades in over it on opacity, which always animates.

Both scrims are kept as light as the type allows — the photograph is the card, and a
scrim heavy enough to be comfortable would flatten it. The resting one starts at 55%
of the card height and tops out at 60% black; the hover one reaches 85% at the very
foot, where the description sits. Neither is optional: these photographs run from
bright snow to near black and the copy is white on all of them.

The label's growth is `font-size`, not a transform: it sits in normal flow with the
description beneath it, and scaling would slide it off its own baseline instead of
pushing the copy down with it.

`max-height` rather than height because there is no transition to `auto`; `max-h-40`
is a ceiling the copy fits under, not a measured height.

The description stays in the DOM and un-hidden throughout — only its wrapper's height
moves — so screen readers reach it whether or not the reveal ever plays.

**The collapsed state is gated on `(hover: hover) and (pointer: fine)`.** Without that
guard a touch device would render every description shut with no way to open it; gated
this way, touch gets them open from the start. Tailwind's own `group-hover` is already
`(hover: hover)`-gated, so it re-opens the wrap on exactly the devices the guard
collapses it on.

That gate is written out as a full literal class, not composed from a shared prefix
constant. Tailwind scans source text for whole class names, so an interpolated variant
is never generated and the rule silently does not exist — which is exactly what
happened on the first attempt here.

## Images

Programme photography in `public/assets/Career/`, behind a per-card gradient that
fills the card while the photo loads and if it fails.

The square art is 1080², against 327×391 cards, so it clears DPR 2 with room to spare.
**`Resume.jpg` is the exception at 1080×540** — it was cut for a double-width card the
row layout no longer has, so it is cropped hard to portrait and only just clears DPR 2
vertically. Worth re-cutting square.

**The filename's capitalisation is load-bearing.** `careerImage()` passes it through
verbatim, because macOS resolves `career/coding.jpg` perfectly well while the Linux
deploy target does not — a wrong case would pass every local check and 404 only in
production.

`alt=""` — the label names the metric and the description restates it, so the photos
are decorative.

## The reveal

The heading block and the CTA fade up (`y: 40 → 0`, 0.9s `power3.out`, 0.15 stagger),
triggered at `top 90%` — before the pin engages at `top top`.

The cards are deliberately not part of it. They sit in a track the pin transforms
sideways, and a second entrance tween would be competing for the same property the
moment the pin engages. The row arriving from off-screen right is the entrance.

## Verified

At 1440×900: 8 cards at 327×391, 70px drop on every second card, 1504px of travel, the
pin engaging (`position: fixed`, spacer padded 1504px) and the track panning 1:1. At
1440×1200: the pinned section fills the viewport exactly, with no dark gap beneath it.
At 800×900: cards 280×340, no drop, `overflow-x: auto` and scrollable, no pin
registered. No page-level horizontal overflow at any width, and all eight photos load.

At 375×812: card 270×328 with the next one peeking 65px, section 710px, and the
heading, subtitle, CTA and first card all in one view. At 320×720: card 230×280, the
section 661px, nothing in it escaping the 320px viewport, and the track's trailing 24px
still there at the end of the scroll. At 900×800 and 901×800, either side of the
threshold: 900 scrolls and snaps with 280px cards, 901 is `overflow: hidden` with 327px
cards and the pin engaged.

Card rest state confirmed in-browser: resting scrim at opacity 1, hover scrim at 0,
label 24px/700, description 14px at `max-height: 0` and `opacity: 0` — with all four
`group-hover` rules present in the compiled CSS.

Type sized against the narrowest card rather than the widest: the longest label
("Mock Interviews") measures 197px at its 26px hover size with 240px of room on the
280px card, so it never wraps as it grows; the longest description reaches 61px open,
well under the 10rem ceiling, and the fully-open body is 141px inside a 340px card.

## The pin must fill the viewport

A pinned section is `position: fixed` at its own natural height, and the pin-spacer
standing in for it is transparent. At the reference's 100/120 padding this section came
out **924px**, so on any display taller than that the page's dark `body` showed through
beneath it — a black band under the cards for the whole length of the pin.

Two changes close it: `min-[901px]:min-h-screen` so the section can never be shorter
than the viewport it is fixed to, and `justify-center` so the extra height spreads
instead of piling under the row. Padding also comes down to 80/96, which brings the
natural height under a 900px window rather than 24px over it.

Verified at 1440×1200 mid-pin: `position: fixed`, section rect 0 → 1200 against a
1200px viewport, and hit-testing at the top, middle and bottom of the screen all lands
inside the section.

## The swipe arrow

Below the pin threshold the row carries a `RailScrollArrow`
(`@/components/ui/rail-scroll-arrow`), inset from the right edge and centred on the
card. The row holds nothing but cards and they are all one height, so the viewport's
own centre *is* the card's centre — `top-1/2` is enough here, unlike the gallery, whose
cards carry a title and description under the panel.

`right-4` rather than `right-0` because this rail is full-bleed: at `0` the arrow would
touch the edge of the screen.

It is positioned against a wrapper `div` added around the viewport. The section is
already `relative`, but it is `min-h-screen` at the threshold and holds the heading and
CTA as well — centring the arrow on that would put it nowhere near the row.

The arrow advances by finding the next card past the rail's own `scroll-padding-left`,
so it lands on the same snap position a swipe would. Measured on an 8-card row at
412px: seven steps of 296px (280px card + 16px gap) reaching the exact end of the
scroll range.
