# Readiness

"Two years. One serious transformation." — a left-aligned two-line heading over a row
of seven programme-step cards that scroll sideways as the page scrolls down, closing on
a centred line under the row.

Built to the same pattern as the reference's *Introducing Career OS* section: a pinned
horizontal track and alternating card offsets. Values below are read off that build,
not invented.

> The folder is still called `readiness` — it was the "Career Readiness Score" section
> before this content landed on it, and the `#readiness` anchor and `readiness-*`
> selector names are kept so nothing that points at the section has to move.

## Public API

- `ReadinessSection` — the whole section. The only export routes should use.
- `ReadinessStep`, `ReadinessHeadingCopy` — shared types.

```tsx
import { ReadinessSection } from "@/features/readiness";
```

## Structure

```text
readiness/
├── components/
│   ├── readiness-section.tsx  # Heading + viewport/track + closing  ("use client")
│   └── readiness-card.tsx     # One step card (server)
├── constants/
│   └── readiness.constants.ts # Copy, steps, pin threshold, selector map
├── hooks/
│   ├── use-readiness-reveal.ts # Heading + closing entrance
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
`overflow: hidden` over a 2400px track — cards with no way to reach them.
`max-[901px]` and `min-[901px]` tile the axis with no gap and no overlap.

`w-max` on the track is load-bearing. It is what lets the track be wider than the
viewport, and that overflow *is* both the pan distance and the hand-swipe range.

## The row is full-bleed, and the heading is aligned to it

No `max-width` on the viewport: the point of the layout is that cards run off both
edges of the screen, so a centred measure would defeat it. Only the track's own
padding (80px, 24px below the threshold) holds the first and last card off the edge.

**The heading repeats those padding values rather than sitting in a container.** The
design sets it flush with the left edge of the first card, and the only thing that
knows where the first card starts is the track's `px-20` / `px-6`. A centred `max-w`
wrapper — which is what this section used when it was centred copy — would land
somewhere else at every width between the two.

The closing line is the exception: it is centred on the page's own axis
(`mx-auto max-w-[48rem]`), not on the heading's inset, which is how the design closes
the section.

## Card geometry

| | ≥ 901px | ≤ 900px |
| --- | --- | --- |
| Card | 327 × 391 | `min(72vw, 280px)`, at 14:17 |
| Gap | 24px | 16px |
| Track padding | 80px | 24px |
| Section padding | 64 / 80 | 56 / 64 |
| Every second card | dropped 70px | flush |

The 70px drop is what stops seven cards reading as one solid bar. It is dropped below
the threshold, where the row is swiped by hand and the offset would only cost height.
Which cards sit high and which sit low comes from their order in `readinessSteps`.

Below the threshold the card is **sized off the viewport rather than fixed**. A fixed
280px card plus 24px of track padding leaves nothing showing on a 320px screen, and on
a hand-swiped row that peek is the only affordance there is — 72vw always leaves one.
It is capped at the same 280px so a wide phone in landscape does not get one enormous
card, and `aspect-[14/17]` is the 280 × 340 proportion held as the width moves.

Vertical padding comes down with it. 64/80 is measured for a pinned section that has to
fill its viewport *and* fit inside it; below the threshold there is no pin to fill and
80px of surface under the row reads as a hole on a phone. 56/64 keeps the heading and
the first card in one view at 375 × 812.

## The card at rest, and on hover

**Every description is on show at rest.** The design prints all seven at once, and the
row is read as a sequence — a step whose copy only appears under the pointer cannot be
read as part of one. It also puts the touch and pointer renderings back in agreement,
which the previous hover-reveal could only approximate with a
`(hover: hover) and (pointer: fine)` guard around a collapsed `max-height`.

Hover is now polish rather than disclosure: over 450ms a light second scrim deepens the
foot of the card and the title grows from 24px to 26px, while the photo scales to 1.05
over 600ms.

**The scrim is two stacked layers, not one gradient that changes.** Swapping a single
`background-image` between two gradients does not animate reliably — CSS only
interpolates gradients that match stop for stop — so the resting scrim stays put and a
second layer fades in over it on opacity, which always animates.

The resting scrim is deeper than it was when the description was hidden, because it now
has two lines of type to seat rather than one: transparent to 18%, then 30/70/85% black
across the bottom half. Four stops rather than two — the copy sits in the bottom quarter
of the card, so that is where the darkness has to be, but arriving there in one straight
run draws a visible band across the photograph.

**The hover layer is deliberately weak, because the two compound.** It stacks on top of
the resting scrim rather than replacing it, so its own values add — at its first
strength (10% → 90%) the pair reached 98% black at the foot and hovering a card simply
turned the photograph off. Transparent through the top third and topping out at 38%,
the pair lands near 91% under the type and barely touches the middle of the image.

The resting scrim is not optional. These images run from a bright office to a near-black
screen and the copy is white on all of them.

The title's growth is `font-size`, not a transform: it sits in normal flow with the
description beneath it, and scaling would slide it off its own baseline instead of
pushing the copy down with it.

## Images

**These are placeholders.** The section borrows programme photography from
`public/assets/Career/` until its own artwork is cut, each behind a per-card gradient
that fills the card while the photo loads and if it fails.

| Step | Stand-in |
| --- | --- |
| Learn | `Communication.jpg` |
| Code | `Coding.jpg` |
| Build | `Projects.jpg` |
| Compete | `Hackathons.jpg` |
| Contribute | `Communication.jpg` |
| AI-Native | `DSA.jpg` |
| Break Through | `Interviews.jpg` |

There are six usable photographs for seven steps, so **Learn and Contribute share
`Communication.jpg`**. They are four apart and the row never shows more than four cards
at once, so the two are never on screen together — which is the only reason a repeat is
tolerable here. It stops being safe the moment a step is added or reordered.

The art is square at 1080², against 327×391 cards, so it clears DPR 2 with room to
spare and is cropped to portrait by `object-cover`.

**The filename's capitalisation is load-bearing.** `stepImage()` passes it through
verbatim, because macOS resolves `career/coding.jpg` perfectly well while the Linux
deploy target does not — a wrong case would pass every local check and 404 only in
production.

`alt=""` — the title names the step and the description restates it, so the photos are
decorative.

## The reveal

The heading and the closing line fade up (`y: 40 → 0`, 0.9s `power3.out`, 0.15
stagger), triggered at `top 90%` — before the pin engages at `top top`. They sit at
opposite ends of the section but arrive together, which is correct: once a pinned
section is on screen, all of it is.

The cards are deliberately not part of it. They sit in a track the pin transforms
sideways, and a second entrance tween would be competing for the same property the
moment the pin engages. The row arriving from off-screen right is the entrance.

## The pin must fill the viewport — and fit inside it

A pinned section is `position: fixed` at its own natural height, and the pin-spacer
standing in for it is transparent. At the reference's 100/120 padding this section came
out **924px**, so on any display taller than that the page's dark `body` showed through
beneath it — a black band under the cards for the whole length of the pin.

`min-[901px]:min-h-screen` closes that: the section can never be shorter than the
viewport it is fixed to, and `justify-center` spreads the extra height instead of piling
it under the row.

The opposite constraint is what sets the padding. This layout is a two-line heading,
a row 461px tall with its stagger, *and* a closing line — at 80/96 that runs over a
900px-tall window and crops the line the section is building towards, so it comes down
to 64/80.

## The swipe arrow

Below the pin threshold the row carries a `RailScrollArrow`
(`@/components/ui/rail-scroll-arrow`), inset from the right edge and centred on the
card. The row holds nothing but cards and they are all one height, so the viewport's
own centre *is* the card's centre — `top-1/2` is enough here, unlike the gallery, whose
cards carry a title and description under the panel.

`right-4` rather than `right-0` because this rail is full-bleed: at `0` the arrow would
touch the edge of the screen.

It is positioned against a wrapper `div` around the viewport. The section is already
`relative`, but it is `min-h-screen` at the threshold and holds the heading and the
closing line as well — centring the arrow on that would put it nowhere near the row.

The arrow advances by finding the next card past the rail's own `scroll-padding-left`,
so it lands on the same snap position a swipe would.
