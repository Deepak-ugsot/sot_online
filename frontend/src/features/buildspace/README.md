# BuildSpace

"Build More. Ship Faster. With BuildSpace." — the pitch over a collage of the product:
five feature cards scattered around a laptop, with a student in front.

## Public API

- `BuildspaceSection` — the whole section. The only export routes should use.
- `BuildspaceCard`, `BuildspaceLayer`, `BuildspaceHeadingCopy`,
  `BuildspaceSubtitleCopy` — shared types.

```tsx
import { BuildspaceSection } from "@/features/buildspace";
```

## Structure

```text
buildspace/
├── components/
│   ├── buildspace-section.tsx   # Heading, then the pinned stage  ("use client")
│   └── buildspace-scene.tsx     # The collage (server)
├── constants/
│   └── buildspace.constants.ts  # Copy, layer coordinates, selector map
├── hooks/
│   └── use-buildspace-reveal.ts # Staggered entrance
├── types/
│   └── buildspace.types.ts
├── index.ts                     # Public API
└── README.md
```

## The scene is one fixed-ratio box

Every layer is placed as a percentage of a scene locked to **1340 / 790**. That ratio
is what lets the arrangement scale as a single composition — a card at `left: 74%`
keeps its place at any width instead of drifting as the container grows. Change the
ratio and the whole collage comes apart.

`relative` on the scene is load-bearing: it is what the absolute layers resolve
against. Without it they escape to the section and every coordinate is wrong — measured
before the fix, the cards sat up to 40% of the scene's height above where they belong.

**Only widths are given; heights follow each image's own ratio.** The reference sizes
its layers with a fixed box plus `object-contain`, which produces the same rendered
rectangle, but a width-only layer needs no height to lay out — so the same numbers keep
working on phones, where the scene stops being a fixed-ratio box at all.

That conversion is why `buildspaceCharacter` carries `left: 33.95 / size: 32.1` rather
than the reference's `left: 31.5 / width: 37`: this portrait fills its box's *height*,
so what actually appears is 32.1% wide, centred on the same 50% axis.

## Responsive behaviour

| Width   | Scene                                                                  |
| ------- | ---------------------------------------------------------------------- |
| ≤640    | overlay dropped — cards on a full-bleed snap rail, laptop then student  |
| 641–900 | overlay, ratio released to a 620px floor, width capped at 1080px        |
| ≥901    | overlay at the full `1340 / 790` ratio, sized off viewport height       |

**The scene is sized off the viewport height, not just a width cap.** From 901px it
lives alone in a full-viewport stage, so the limit that actually binds is vertical:
`min(88rem, 88vh * 1340/790)` is the widest box that still fits, and every layer inside
is a percentage — so that one value scales the whole collage as a piece. At 1440×900
it comes to 1343×792.

Below 901px that cap is overridden back to 1080px. There is no pin and no full-height
stage there, so a vh-derived width would squeeze the scene against a short phone
viewport for no reason.

**`h-screen` on the stage is scoped to 901px and up too.** The wrapped scene is
*taller* than the viewport — measured at 640×900 it overflowed a `h-screen` stage by
133px — so below the pin the stage height is left to its content.

Below 640px the percentages stop working: at phone width they crowd every layer into
an overlapping stack, so the scene becomes an ordinary wrapped flow instead.

### The phone card rail

Dropping the overlay is not enough on its own. Wrapped two-up at 375px each card came
out 133px wide, and all five are dense product screenshots — at that size the UI inside
is unreadable noise and only the label baked into the artwork survives. So below 641px
the `<ul>` stops being `display: contents` and becomes a horizontal snap rail: one card
is `70vw` (263px at 375, capped at `17.5rem` so it does not sprawl by 640), and the
half-visible next card is the affordance that says to keep swiping.

The rail bleeds past the stage's gutter — `-mx-6` with `w-[calc(100%+3rem)]` against a
matching inner `px-6` — so it reads as running off the edge of the screen rather than
stopping short inside a box. `scroll-pl-6` puts a snapped card back on that same 24px
gutter; without it a snap lands flush to the viewport edge. The bleed assumes the scene
is full-width below 641px, which it is: every max-width in that band is far wider than
a phone.

The vertical padding on the rail is only there so the scroll container does not clip
each card's drop shadow, and the scrollbar is hidden because a rail of screenshots is
self-evidently swipeable. No `tabIndex` is set: the cards contain nothing focusable, so
browsers already make the scroll container a keyboard-focusable region on their own —
and the element is `display: contents` from 641px up, where a tab stop would have no
box to show focus on.

Two more things are easy to get wrong and were both caught by measuring:

- The student is sized by `max-w`, not `width`. A flex basis outranks `width` on the
  main axis, so `basis-full w-3/5` renders full width — 100% where 60% was wanted.
- The 620px floor is scoped to the 641–900 band. Left unscoped it also applies to the
  phone layout, where the scene should size to its content.

Verified with no horizontal overflow at 375, 640, 641, 800 and 1440; the rail's last
card lands exactly on the 24px gutter at 375; and every card is within 0.1% of its
reference coordinate at 1440.

## Sizing the artwork

Two separate levers, and they do different jobs:

- **The scene box** (above) scales the collage as a whole, but it is capped by viewport
  height — on a 900px-tall window it cannot grow much past `1343×792` without the wide
  `1340 / 790` ratio pushing the bottom off screen.
- **The layer percentages** fill the box's own empty space, which is where the real
  headroom is. The reference's coordinates leave roughly a quarter of the box as margin.

So the artwork was enlarged mostly with the second: cards `1.32×`, student `1.22×`,
laptop `1.10×`, each **about its own centre** — growing from the stored top-left corner
would have slid everything down and right and pulled the ring off centre. At 1440×900
the laptop renders 692px wide, the cards 174–231px, the student 526px.

The three factors differ on purpose. The laptop is the merge target every card has to
stay clear of, so it moves least; `github` is the tightest of the five, and each extra
5% on the laptop costs about that much again in its clearance.

### Scaling alone is not enough — the columns must be re-spaced

Each card grows into the space between it and its neighbour *from both sides*, so
enlarging in place closes the gaps twice as fast as it opens them. At `1.32×` the
`workspace` / `ai-review` gap collapsed from 6.5% of the scene to **0.53%** — about
four pixels at 1440×900, which reads as two cards stuck together.

So positions are re-spaced by column afterwards: the left column runs down a 4–92 band
with an even `7.2%` between cards, the right column takes a wider `14.05%` having only
two, and each column is nudged outward into the slack at the box edge — which buys back
clearance from the laptop as well. Measured at 1440×900 the gaps come to 56px, 57px and
111px, with 33–77px between each card and the laptop.

Three invariants to re-check after touching any of these numbers. All were found by
search, not by eye, and a uniform `1.30×` scale already overlaps:

- no two cards closer than ~7% of the scene (tightest: `workspace` / `ai-review`)
- every card at least 1.5% clear of the laptop (tightest: `github`, at 2.46%)
- the composition inside the box, currently x[2.5, 97.5] y[4.0, 92.0]

## Spacing between the copy and the collage

The stage carries **no top padding** from 901px up. Padding there would clear the 80px
fixed header, but it is equally dead space between the copy and the collage on the way
in, so every pixel shows. It is not needed: centring already drops the scene 54px, and
the scene's top band is empty for a further 64px before the first card, so the artwork
starts at y=118 while pinned — 38px clear of the header.

That clearance is the thing to watch. It shrinks if the scene grows to fill more of the
viewport height, or if the top cards move up.

## Reveal

Heading children stagger in at 0.1s; then the cards pop with a `back.out(1.6)`
overshoot and the larger layers follow on a plainer `power2.out`. Two separate calls
rather than one comma-joined selector: the small cards read well with an overshoot,
while the student at a third of the scene's width looks unsteady with the same bounce.

## Images

Product artwork, in `public/assets/BuildSpace/`. **The folder's capitalisation is
load-bearing** — macOS resolves `buildspace/github.png` just fine while the Linux
deploy target does not, so a wrong case would pass every local check and 404 only in
production.

Each card's visible label is baked into its artwork, so the `alt` text is the only
place that name exists as text a screen reader can reach — which is why the cards are a
`<ul>` with real alt text rather than decorative images. The student is `alt=""`: they
illustrate the copy rather than adding to it.

## The pinned sequence

**The heading is a sibling of the stage, not inside it.** It sits in ordinary flow and
scrolls up and away like any other copy; only the stage below it pins. That is what
makes the collage — and nothing else — hold still. Freezing the heading on screen for
the whole runway instead reads as the page having stalled.

It also fixes what the pin triggers off: the **stage**, not the section. Triggering off
the section would start the pin while the heading was still on screen and the stage
still below the fold, so the scene would jump into place. Off the stage, the pin engages
exactly when the stage reaches the top — by which point the heading has scrolled past.

From **901px up**, with motion allowed, the stage pins for **1.5 viewport heights** and
a scrubbed timeline folds the features into the laptop:

1. The laptop swells to `1.1` across the first 70% of the runway.
2. Each card flies into the laptop's centre, shrinking to `0.1` and fading out.
3. The student rises out of the laptop as the last cards land.

Motion is compressed into the first `0.9` of the pin, with a no-op tail — the same
hold-buffer shape the hero uses, and for the same reason: without it `scrub` would
re-compress an already-scaled timeline and cancel the buffer.

Below 901px there is no pin — a scrubbed pin does not translate to a short, narrow
viewport — so the student simply fades in with the rest of the scene. Under reduced
motion nothing is registered at all and everything renders in place.

### What gives it its character

The numbers in `BUILDSPACE_MERGE` are read off the reference implementation of this
effect, and its defining quality is that the cards **hang almost still and then rush
inward**. Two things produce that, and both are easy to lose in a tidy-up:

- `DURATION` (0.58) is long and `STAGGER` (0.045) is short, so every card is in flight
  at once rather than firing one clean card at a time — the last card starts before the
  first is a third of the way home.
- `power2.in` back-loads each card's own window: halfway through its tween a card has
  covered under a fifth of its distance.

Shorten the duration or flatten the ease and it degrades into an ordinary staggered
fly-out, which is precisely the thing it is not.

The restraint elsewhere is also deliberate. **The heading holds its place through the
entire pin and the scene box is never scaled or translated** — the laptop's slight swell
is the only other movement. That is what keeps the eye on the cards; animating the frame
as well makes the whole composition lurch and the merge stops reading.

`scrub: true` rather than a lag value: the page already runs ScrollSmoother, and a
second smoothing pass on top of it detaches the cards from the wheel.

### Two things that would silently break it

**The merge distances are measured from `offsetLeft`/`offsetTop`, not
`getBoundingClientRect()`.** Those are layout values, so they are immune to the
entrance tween's transform still sitting on the card when the timeline is built. A rect
would be read mid-reveal and every distance would be wrong. They are also wrapped in
functions with `invalidateOnRefresh`, so a resize re-measures instead of keeping
first-paint numbers.

No grow factor is applied to those distances. The laptop scales about its own centre
and the scene box never moves, so the point the cards aim at is the same throughout —
but reintroduce a scale on the scene and every distance needs the factor back.

**The card merge sets `overwrite: false`.** This timeline is built synchronously, while
the card entrance tween still exists and owns opacity/y/scale on the same elements —
its ScrollTrigger simply has not fired yet. GSAP's default auto-overwrite would kill
that tween's hold the instant these are created, and the cards would never reveal at
all. Safe here because the entrance always finishes, in scroll position, well before
this window opens.
