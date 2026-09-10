# Opportunities

"Exclusive Opportunities" — seven cards on a scroll-driven 3D cylinder.

## Public API

- `OpportunitiesSection` — the whole section. The only export routes should use.
- `Opportunity` — shared type.

```tsx
import { OpportunitiesSection } from "@/features/opportunities";
```

## Structure

```text
opportunities/
├── components/
│   ├── opportunities-section.tsx  # Heading, 3D viewport, hint  ("use client")
│   └── opportunity-card.tsx       # One card (server)
├── constants/
│   └── opportunities.constants.ts # Copy, cards, selector map
├── hooks/
│   └── use-opportunities-carousel.ts
├── types/
│   └── opportunities.types.ts
├── utils/
│   └── arc-layout.ts              # The cylinder geometry — pure maths
├── index.ts                       # Public API
└── README.md
```

## The geometry — a true cylinder

`arc-layout.ts` is deliberately separate from the GSAP wiring: given how far a card
sits from the one facing the viewer, it returns where that card belongs in space, and
knows nothing about scroll, timelines or the DOM.

```
x = R·sin θ      z = R·(cos θ − 1)      rotationY = −θ
```

The `x`/`z` pair is what makes it a cylinder rather than a flat fan. `x` follows `sin`
and `z` follows `cos`, so a receding card genuinely moves **away from the viewer**
rather than just sliding sideways. `rotationY` is the negated angle, keeping each card
tangent to the curve — turning to face outward along the cylinder wall instead of
staying parallel to the screen.

| Constant           | Value | Purpose                                             |
| ------------------ | ----- | --------------------------------------------------- |
| `RADIUS`           | 620   | Larger means a flatter, wider arc                   |
| `ANGLE_PER_CARD`   | 26°   | Arc between adjacent cards                          |
| `MAX_ANGLE`        | 130°  | Stops far cards rotating past edge-on and mirroring |
| `SCALE_FALLOFF`    | 0.1   | Shrink per card of distance, floored at `0.5`       |
| `OPACITY_FALLOFF`  | 0.15  | Fade per card of distance, floored at `0.2`         |

`zIndex` is set explicitly (`100 − distance·10`) rather than left to `z`: once cards
overlap — and here they overlap by design — translation depth alone does not resolve
paint order, and the fan would stack the wrong way round.

### The edge bunching is the design

Because `x` follows `sin`, the horizontal step between cards shrinks as the angle
grows. The pair either side of centre sit clear of it; the outermost cards tuck in
**behind** their neighbours. That fanned, overlapping stack is exactly what the
reference shows — "National Hackathons" half-hidden behind "Exclusive Internship
Opportunities", "Open Source Programs" behind "Startup Challenges".

**A previous revision replaced this with evenly-spaced linear positioning** to "fix"
the crowding, complete with a perspective-compensation term that held the projected
gap constant. It produced a uniform row with a clear gap between every pair — tidier
in isolation, and wrong: it lost the fan entirely.

If the arc ever starts looking evenly spread, this is what regressed.

## The carousel

Scroll drives a **floating** centre index from `START_CENTER_INDEX` to the last card.
Because it is fractional rather than stepped, cards glide continuously around the
cylinder instead of snapping between slots.

**It rests on the second card, not the first.** Centring card 0 put every other card
on one side of it — the left half of the stage sat empty while the rest bunched into
the right, which read as a section already scrolled rather than one waiting to be.
Resting on index 1 opens with a balanced trio: measured at 1440, the centre card sits
at x=720 (the stage's exact midline) with its neighbours at 422 and 1018, ±298px
either side.

The scroll range starts from the same index, so the opening frame is a real position
on the cylinder rather than a pose the first scroll snaps away from. The trade is that
card 0 is never the one facing the viewer — one position out it is still at 90% scale
and fully readable, which is the point of resting between cards rather than on the
end.

The arc is recomputed in ScrollTrigger's `onUpdate` rather than tweened. Every card's
position derives from one shared scalar, so recalculating them all together is both
simpler and cheaper than one tween per card. The timeline itself animates nothing —
it exists to give `scrub` something to drive and to hold the pin open.

Pin runway is `2.2 × viewport height`, with the same `CONTENT_END = 0.85` hold buffer
as the other pinned sections.

## Reduced motion falls back to a plain scroller

The arc drops its absolute positioning and becomes a flex row, the viewport becomes a
normal `overflow-x` container, and perspective switches off.

**That only works because the hook writes no inline transforms in that mode.** Nothing
is registered under reduced motion — no pin, no timeline, and crucially no `gsap.set`
— so the CSS fallback is free to lay the cards out in normal flow. If the arc were
positioned eagerly outside the `matchMedia` branch, the fallback would fight it.

## Card sizing

Cards are **260×400** at `768px` and up (200×308 below), on a 0.65 ratio.

Width is the design's original 260px; only the height is taller than the reference's
360px. A wider trial at 320px was walked back — it dominated the section.

**Size and `RADIUS` move together.** The neighbouring card sits `RADIUS · sin(26°)`
away — 272px at `RADIUS = 620` — so a wider card at the same radius eats into that
step and the arc closes up. A 320px trial was walked back for exactly that reason: it
both dominated the section and needed the radius widened to stay readable.

**Each dimension is `min(px, vh)`**, so on a short viewport the card shrinks rather
than being cropped by the arc's overflow. Both axes use the same ratio, so the card
keeps its proportions as it scales. The arc viewport is kept a little taller than that
ceiling at every height, so there is always clearance.

## Cards are centred by negative margin, not transform

Each card is absolutely positioned at the arc's origin and pulled back by half its own
size. A `-translate-1/2` would be the usual way, but the carousel rewrites `transform`
on every frame and would overwrite it. Margins stay out of that fight.

The size is declared once as `--card-w` / `--card-h` and the margins are derived with
`calc(var(--card-h) / 2)`, so the two cannot drift apart when the size changes.

## Verified

At 1440×900 the section measures **3230px**, matching
`viewport + (viewport × 2.2) / 0.85` exactly — the reference's 2583px is the same
formula at its 720px viewport.

Adjacent-pair spacing measured against real DOM boxes (negative = overlap):

| Centre index | Gaps (px)               | Pattern                              |
| ------------ | ----------------------- | ------------------------------------ |
| 0            | 7, −91, −140, −123, −114 | clear beside centre, stacked outward |
| 2            | −91, 7, 7, −91, −140     | matches the reference exactly        |

(Index 0 is no longer the resting position — see **The carousel** — but the row is
kept because it is the clearest illustration of the lopsidedness that motivated the
change.)

At centre index 2 the pattern is `overlap, gap, gap, overlap, overlap` — identical to
the reference screenshot. That asymmetry is the signature of the cylinder: a uniform
set of gaps means the geometry has regressed to linear spacing.

No page-level horizontal overflow; the outermost cards are clipped by the viewport's
`overflow-hidden`, which is intended.

## Card height, and why the image panel can shrink

The card is `min(26rem, 48vh)` tall against a width of `min(18.33rem, 33.8vh)`. The
**width** is on a leash — it carries the same 1.128 factor as `RADIUS` in `arc-layout`
and the two must move together — but the **height** is not: nothing in the arc geometry
depends on it, so it can be tuned on its own. It came down from `28.2rem / 52vh` for a
shorter, less portrait card.

The `48vh` ceiling is set by the arc viewport's own `50vh`, which the card has to fit
inside.

The image panel is `58%` of the card but is **allowed to shrink**, with the copy below
it `flex-none`. Without that, a short viewport clipped the description: at 620px the
card falls to its `vh` ceiling of 298px, leaving 125px under a fixed 58% panel where
the longest copy needs 167. The card's `overflow-hidden` swallowed the difference
silently. (That predates the height change — at `52vh` it started below ~765px of
viewport height rather than ~829px — but the shorter card would have deepened it.)

Flexbox only shrinks the panel when the two would otherwise exceed the card, which on
any normal window they do not. Measured at 900px: every one of the six cards holds the
panel at exactly **241px of 416 — 58%** — while their copy varies from 106 to 148px, so
the set still reads as one. At 620px the panel gives up height per card instead, which
is the right trade against losing a line of text.

## The stage has to clear the fixed header

The stage is a full-viewport box that centres its contents, and the site header is
fixed over its top 79px (72px on mobile). Padding the stage is what keeps the heading
out from under the nav — but **centring alone is not enough**. `justify-center` only
centres while the content fits; once heading + arc + hint + gaps exceed the space left
below the padding, the block starts at the content-box top instead and the heading
lands hard against the nav.

So the padding is a guaranteed floor — `112px − 79px = 33px` of clearance whatever
happens — and the arc and gaps are sized so the content genuinely fits:

```text
0.50H (arc) + 127px (heading) + 0.045H (one gap) + 112px (padding) ≤ H
→ holds from H ≈ 525px
```

At the previous `55vh` arc and `6vh` gaps it needed 748px, which is why shorter
laptop windows collided. Removing the "Scroll to explore" hint took another ~60px
(its own height plus a gap) out of the budget.

Measured: at 820px viewport, 81px of slack and 74px of clearance below the header; at
700px, 32px slack and 49px clearance; at 620px, slack falls to exactly 0 and the
clearance sits at the 33px floor the padding guarantees.
