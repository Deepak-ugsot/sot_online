# Mentors

"Learn From The Best" — a centred heading above three rows of company logos scrolling
in alternating directions.

## Public API

- `MentorsSection` — the whole section. The only export routes should use.
- `CompanyLogo`, `MarqueeDirection`, `MentorsMarqueeRow` — shared types.

```tsx
import { MentorsSection } from "@/features/mentors";
```

## Structure

```text
mentors/
├── components/
│   ├── mentors-section.tsx      # Heading + marquee  ("use client")
│   └── mentors-marquee-row.tsx  # One scrolling strip (server)
├── constants/
│   └── mentors.constants.ts     # Copy, logo rows, selector map
├── hooks/
│   └── use-mentors-reveal.ts    # GSAP scroll-into-view entrance
├── types/
│   └── mentors.types.ts
├── index.ts                     # Public API
└── README.md
```

## The marquee is CSS, the entrance is GSAP

These are two separate animations on **two separate elements**, deliberately:

| What                    | Driven by | Element             |
| ----------------------- | --------- | ------------------- |
| Continuous horizontal scroll | CSS `@keyframes` | each track    |
| One-shot fade-and-rise entrance | GSAP     | the marquee wrapper |

If both touched the same node they would fight over `transform` — the entrance would
stamp on the scroll position every frame. Splitting them across wrapper and tracks
means the marquee can keep looping from page load while the wrapper animates in
independently.

### Why each row has two identical tracks

A track translates a full `-100%` of **its own width**. At that point it has moved
exactly off-frame and its twin sits precisely where the first started — so the
animation restarts with no visible jump.

This only holds while both tracks render the same logos. Change one and the seam
appears. The duplicate is dropped entirely under reduced motion, where it would
otherwise just list every company twice.

### Row speeds

42s / 36s / 48s, alternating direction. The differing durations are the point —
identical speeds would let the rows stay in step and read as one moving block instead
of three.

Those are the **desktop** figures. A track is only as wide as its contents, so the
smaller logos and gaps below 901px shorten it — to roughly two thirds by 375px. Held
at the same duration the strip would crawl: the distance fell but the time did not.
Each breakpoint scales the duration by the same factor the track shrank by (0.66 /
0.83 / 1), so the logos travel at about **41px per second at every width**.

The row's own duration therefore arrives as a unitless `--marquee-seconds` custom
property and is turned into a duration by an arbitrary-value class per breakpoint —
`calc(var(--marquee-seconds)*0.66s)` and friends. It cannot be an inline
`animation-duration`, as it once was: inline styles outrank every media query, so the
breakpoints would never take.

### Entrance

| Target   | Trigger       | Start     | Motion             | Timing            |
| -------- | ------------- | --------- | ------------------ | ----------------- |
| Heading  | the section   | `top 90%` | fade + `y: 55 → 0` | 0.9s `power3.out` |
| Marquee  | the marquee   | `top 92%` | fade + `y: 30 → 0` | 1s `power2.out`   |

The marquee triggers off itself, not the section: on tall viewports the section top
can clear the trigger line while the logo rows are still below the fold.

## Accessibility

The marquee is `aria-hidden`. It loops forever and renders every logo twice, so
exposing it would have a screen reader announce each company repeatedly with no way
to reach the end.

In its place, a visually-hidden sentence lists every company once — **generated from
the same `mentorsMarqueeRows` data**, so it cannot drift out of sync when logos are
added or removed. Individual `<img>` elements carry `alt=""` accordingly.

Under reduced motion the animation stops and each row becomes horizontally
scrollable, so the logos stay reachable rather than being silently cropped at the
overflow boundary.

## Logos

29 files in `public/companyLogo/`. Every one is **177px tall**, which is what lets a
single `h-10 w-auto` put them all on a consistent optical baseline. Intrinsic width is
carried per-logo so `next/image` reserves the right box and nothing shifts on load.

## Width and scale

The marquee is **constrained to `max-w-7xl` (80rem), centred**, rather than running
full-bleed. Each row's edge mask fades the logos out against that boundary, so on a
wide display it reads as a contained band instead of spilling off both sides of the
screen. Measured at 1680px: 1280px wide with 200px clear on each side.

Logos render at `h-10` (40px) on desktop. Note this is a deviation from the reference,
which uses 48px full-bleed.

## Responsive behaviour

Two breakpoints, both mobile-first, matching the ladder the rest of the site uses.

| Width      | Logo | Gap  | Row gutter | Section padding | Edge fade | Heading      |
| ---------- | ---- | ---- | ---------- | --------------- | --------- | ------------ |
| ≤640       | 28px | 32px | none       | 64px            | 14%       | 26 → 30px    |
| 641–900    | 36px | 44px | 24px       | 80px            | 8%        | 30 → 40px    |
| ≥901       | 40px | 56px | 24px       | 100px           | 8%        | 30 → 40px    |

**Logos and gaps shrink together.** At 375px a 40px logo separated by a 56px gap puts
barely two companies on screen at once, which reads as a near-empty strip rather than
a crowd. At 28px and 32px, four fit.

**The gutter is dropped below 641px.** There is no spare width to give away there —
24px on each side of a 375px screen is a seventh of the strip — and the rows already
fade themselves out at the edges, so the band can run to the bezel. The heading keeps
its gutter; text does have to stay off the edge.

**The edge fade is a percentage, so it has to grow as the row narrows.** 8% of a
1280px row is a generous 100px ramp; 8% of a 375px one is 30px, which cuts rather than
fades — and on mobile the fade is the only thing between a logo and the screen edge.
14% restores a comparable ramp.

**The heading takes a second clamp rather than a wider one.** The desktop clamp is
unchanged and still tops out at 40px; the mobile clamp only ever shrinks the heading
*below* 375px, where "Learn From The Best" would otherwise wrap to two lines. At 320px
it lands at 26px on one line.

`pr` on each track always equals that breakpoint's gap: it is the space between the
last logo of one track and the first of its twin, so any mismatch shows up as a
stutter at the seam.

## Verified

3 rows × 2 tracks, 29 logos per pass (58 images), all loading, at every width below.
`#mentors` itself never scrolls horizontally at any of them.

| Width | Section height | Logo | Track gap | Row 1 duration |
| ----- | -------------- | ---- | --------- | -------------- |
| 320   | 445px          | 28px | 32px      | 27.72s         |
| 375   | 432px          | 28px | 32px      | 27.72s         |
| 768   | 492px          | 36px | 44px      | 34.86s         |
| 1440  | 598px          | 40px | 56px      | 42s            |

The 1440 row is the pre-existing desktop layout, unchanged to the pixel.

**A caveat on the page as a whole:** the document scrolls ~66px wider than the
viewport at mobile widths. This predates these changes and comes from the header, not
from here — `html { overflow: clip }` is what keeps it invisible.
