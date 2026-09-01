# Showcase

"Build Projects That Matter" — a continuously scrolling strip of seven project cards
on the light ground, pausing while the pointer is over it.

## Public API

- `ShowcaseSection` — the whole section. The only export routes should use.
- `ShowcaseProject`, `ShowcaseHeadingCopy` — shared types.

```tsx
import { ShowcaseSection } from "@/features/showcase";
```

## Structure

```text
showcase/
├── components/
│   ├── showcase-section.tsx   # Heading + marquee  ("use client")
│   └── showcase-card.tsx      # One project card (server)
├── constants/
│   └── showcase.constants.ts  # Copy, project data, marquee speed, selector map
├── hooks/
│   └── use-showcase-reveal.ts # Staggered entrance
├── types/
│   └── showcase.types.ts
├── index.ts                   # Public API
└── README.md
```

## The marquee

Two identical tracks sit side by side inside an `overflow-hidden` viewport. Each
translates a full **-100% of its own width** over 26s, linear, forever — so as one
leaves the frame its twin arrives at exactly the position the first started from and
the loop restarts with no visible seam. Both tracks must render the same cards for
that to hold, which is why the duplicate is generated from the same
`showcaseProjects` list rather than written out separately.

It reuses the **`marquee-left` keyframes from the mentors feature** rather than
declaring a second identical pair; the per-section speed comes from an inline
`animation-duration`, which outranks the duration baked into the utility's
`animation` shorthand.

`SHOWCASE_MARQUEE_SECONDS` is a duration, not a speed, so the loop keeps its timing
when the cards shrink on small screens — the shorter track simply covers its own
width in the same 26s. At the desktop footprint that works out to 77px/s.

**Pause on hover** is a plain CSS `:hover` on the viewport (`group` →
`group-hover:[animation-play-state:paused]`), so a card can actually be read. No JS
involved, and nothing to reset if the pointer leaves the page mid-hover.

**Edges** are masked to transparent over the first and last 64px, so cards fade out
instead of being chopped off by the overflow boundary — **24px below 601px**. The
ramp is a `--showcase-edge` custom property switched at that breakpoint, which is why
the mask itself is applied inline rather than as a utility class.

64px is right against a 1296px strip and wrong against a phone: inside the 327px
viewport of a 375px screen it leaves 199px of clear space for a 220px card, so every
card on screen is partly faded and no caption is ever fully legible. At 24px a whole
card stands clear from 320px up.

## Accessibility and reduced motion

The duplicate track is `aria-hidden` — its cards repeat copy the first track has
already announced. Under `prefers-reduced-motion: reduce` it is dropped entirely
(there is no loop left to close) and the animation stops; the viewport then becomes
`overflow-x: auto` so the remaining seven cards can be scrolled by hand rather than
silently cropped. Same treatment as the mentors marquee.

`alt=""` marks the artwork decorative, and that stays correct: each card's meaning is
carried by its title and description, so alt text would only repeat what a screen
reader has already announced.

**Reveal** — `autoAlpha 0 → 1`, `y: 28 → 0`, 0.6s `power2.out`, 0.08 stagger,
triggered at `top 85%` of the viewport, once. It animates each card's own `y` while
the marquee translates the *track* around them, so the two never write to the same
element's transform. Both tracks are animated, duplicate included: the set that is
hidden and the set that is revealed have to be the same one, or the duplicate would
sit at full opacity while the original was still fading up.

## Sizing

Every card is one footprint — **262×260**, stepping down to **220×218** at ≤600px.
A single size is what lets the row read as an even, continuously moving strip; the
earlier fanned arch depended on varying heights and a bottom-aligned row, neither of
which survives a marquee.

The heading and paragraph sit side by side from **1025px** up (297px / 557px inside
an 898px block) and stack below it, where the paragraph also drops the 14px optical
nudge that only makes sense alongside the heading.

The block's vertical rhythm steps down at the same **601px** the cards do: `100px`
padding and a `60px` gap become **`72px` / `40px`**, matching what dashboard and
not-another-course do on a phone. The title's clamp floor is `30px` rather than the
reference's `34px` — below 850px the clamp is pinned to its minimum, and 34px was the
largest heading any light section set there.

## Images

Real project artwork, in `public/assets/project/`.

**The filename is the project's `id`** — `ai-interview.jpg`, `chat.jpg`, and so on.
Nothing maps one to the other, so a card and its image cannot drift apart: adding a
project means dropping `<id>.jpg` in beside the others, and `showcaseImage(id)` in the
constants finds it.

| | Supplied | Shipped |
| ---------- | ---------- | ---------- |
| Dimensions | 1080×1500 | **600×833** |
| Per file | 611KB–1.1MB | **51–93KB** |
| Total | 6.7MB | **532KB** |

The art is portrait (0.72) and the card is close to square, so `object-cover` now
crops to roughly the middle of each image — which is where the app screens sit. 600px
of width still clears DPR 2 for a 262px card; Next's optimizer serves the `384w` /
`640w` variants in practice.

## Relationship to the reference

Matches the reference implementation measurement for measurement **at desktop width**:
section background `#f3f4f6`, `100px 24px` padding with a `60px` gap, heading block
`898px` / `44px`, title `clamp(34px, 4vw, 52px)` at `1.15`, paragraph
`clamp(16px, 1.6vw, 20px)` at `1.5`, cards `262×260` / `16px` radius, track gap
`24px`, `64px` edge mask.

**Deliberate deviations:**

- **Container `84rem`, not the reference's `80rem`.** This section and the mentors
  marquee share a background and sit directly on top of each other, so their strips
  have to start and end on the same two lines. `84rem` + `px-6` is what mentors uses.
  Verified aligned at 900, 1440 and 1600: both strips share an edge to the pixel.
- **26s per pass, not 32s.** The logo marquee below runs its rows at 36–48s over
  wider tracks, and the cards at the reference's 32s read as sluggish beside it.
- The title keeps the shared `type-heading` utility, so its tracking is `-0.0104em`
  against the reference's `-0.01em` — a 0.02px difference at 52px, in exchange for
  one heading definition across the site.
- The duplicate track is `aria-hidden` and dropped under reduced motion; the
  reference leaves it announced and simply stops the animation.
- **The strip is tuned for phones below 601px** — a narrower edge mask, a `30px`
  heading floor, and tighter section padding. The reference ships one set of figures
  at every width, which leaves the strip unreadable on a 375px screen.
