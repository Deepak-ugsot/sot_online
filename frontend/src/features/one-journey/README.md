# One Journey

"Why buy 10 different courses. One uGSOT Beyond journey." — the section pins and deals
four cards up into a scatter, one at a time, as the reader scrolls.

Sits directly below the Approach section.

## Public API

- `OneJourneySection` — the whole section. The only export routes should use.
- `OneJourneyCard`, `OneJourneyCardTone`, `OneJourneyHeadingCopy` — types.

```tsx
import { OneJourneySection } from "@/features/one-journey";
```

## The deal

Every card starts fully below the deck, unturned and invisible, and rises into its own
resting place — offset, overlapped, and rotated to the angle in its data. They arrive
one at a time because their tweens are staggered along a single timeline, and that
timeline is `scrub`bed to the pin's scroll range: progress is the reader's scroll
position, not elapsed time, so scrolling back rewinds it.

- **Off-stage means off-stage.** Each card's start `y` is
  `deck.clientHeight - card.offsetTop + 48`, and the deck is `lg:overflow-hidden`, so a
  card is genuinely clipped away rather than merely transparent. It is computed in a
  function so `invalidateOnRefresh` re-reads it after a resize instead of baking in a
  number from an unsettled layout.
- **The settle is on the angle, not the position.** The rise uses `power3.out`, which
  decelerates hard but never travels past its target; the overshoot lives on the
  rotation instead (`back.out(2.2)`), so the card springs a degree or two past and
  locks. A single `back.out` on everything overshot the card *out of* the clipped deck
  — for the first card, sitting near the top edge, that meant visibly shaving its
  corner off as it landed.
- **The timeline holds at the end.** Four cards at `0.34` duration, started `0.22`
  apart, finish at `0.88` of the timeline; the remaining tail is a deliberate hold so
  the completed scatter is not snatched away the instant the last card arrives.

## Why the stage is pinned, not the cards

Two earlier builds of this section failed, both for the same reason. GSAP's pin works
by setting `position: fixed`, and inside `#smooth-content` a `fixed` element resolves
against ScrollSmoother's transformed wrapper rather than the viewport — the exact trap
documented on `SmoothScroll` itself, and why `SiteHeader` is rendered outside it.
Pinning individual cards walked straight into it.

`position: sticky` is no escape either: the smoother's wrapper is `overflow: hidden` and
never scrolls, so there is no scrollport for a sticky element to stick to.

What works is the pattern the hero and the approach section already use here: **pin one
full-height stage with `pinSpacing: true`.** With the stage stopped, the heading and the
price hold still for free — they are simply sitting at the top and bottom of something
that is not moving.

## Rotation belongs to GSAP

The angle is a number on the card (`angle: -1.5`), not a `rotate-*` class. The card
rotates *into* its angle as it lands, so GSAP has to own the rotation — and a CSS
`rotate` would be folded into GSAP's transform on the first write anyway, leaving two
owners for one value.

Angles and placements are read off the reference: `-1.5°`, `-2°`, `-6.5°`, `2°`, at
`10% / 27% / 36% / 12%` from the left and `6% / 24% / 40% / 55%` down the deck. Paint
order is explicit (`lg:z-1`…`lg:z-4`) so a later card always lands *over* the one
before it.

**Both ends of that spread are set by the shortest deck, not the tallest.** The deck is
whatever is left of a one-viewport stage after the heading and the footer, so on a 780px
laptop it is only ~400px — and the cards do not shrink with it, because their height is
set by their copy. At the top, a 1.5° turn lifts a ~740px card's corner about 10px above
its box and the deck clips what leaves it, so the first card needs the 6%. At the bottom,
the last card has to clear `deck − card height − its own rotation lift`, which on that
400px deck is 57%; 55% holds there and still reads as the reference's spread on a tall
screen.

The red cards carry the same gradient as the "uGSOT BEYOND" panel in
`features/beyond-college`, so the two red surfaces on the page read as one material.

## Below `lg`

No pin, no scatter, no clipping. A stage one viewport tall cannot hold a two-line
heading, four full-width cards and the footer on a phone, and a card there is the full
column — there is nothing to overlap with, and a turned card would only clip its own
corners. The cards become a plain square column and each rises as it reaches the lower
third of the screen: still one at a time, still scroll-driven.

## Measured

| Viewport | Result                                                                     |
| -------- | -------------------------------------------------------------------------- |
| 1440×900 | 1 pin spacer, stage 900px, section 3060px (900 + 2.4× runway), deck 495px   |
| 1440×900 | Cards absolute at offsets 0/104/198/307; start `y` 543/439/345/236, applied |
| 1512×982 | Landed: nothing clipped — 27px above the first card, 101px below the last   |
| 1440×780 | Landed on the shortest deck (399px): nothing clipped, 15px / 14px to spare  |
| 390×880  | No pin, cards `static`, deck `overflow: visible`, 0 overlaps, no overflow   |

⚠️ **The scrub itself is unverified.** The browser pane in this environment is hidden
and `requestAnimationFrame` never fires in it — a one-second rAF loop timed out after 45
seconds — so ScrollTrigger's ticker never runs and no scripted scroll can advance the
timeline. Both *ends* were checked directly: at rest the cards carry the computed
off-stage transforms and the deck is empty, and forced to their landed values they form
the reference scatter exactly.

If the pace is off, the knobs are `RUNWAY` (viewport multiples of scroll), `CARD_STAGGER`
(how far apart the cards arrive) and `CARD_DURATION` — all at the top of the hook.
