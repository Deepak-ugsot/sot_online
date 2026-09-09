# One Program

"One Program Instead of Ten." — the claim and the price on the left, the eighteen things
the program replaces drifting past on the right.

## Public API

- `OneProgramSection` — the whole section. The only export routes should use.
- `OneProgramCapability`, `OneProgramCta`, `OneProgramHeadingCopy`, `OneProgramPricing`,
  `OneProgramRail` — shared types.

```tsx
import { OneProgramSection } from "@/features/one-program";
```

Rendered on the landing page below `EcosystemSection`, and in isolation at
`/dev/one-program`.

## Structure

```text
one-program/
├── components/
│   ├── one-program-section.tsx  # Two-column shell             ("use client")
│   ├── one-program-intro.tsx    # Heading, subtitle, price, CTA
│   ├── one-program-rails.tsx    # The three drifting columns
│   └── one-program-card.tsx     # One capability tile
├── constants/
│   └── one-program.constants.ts # Copy, the eighteen capabilities, selectors
├── hooks/
│   └── use-one-program-reveal.ts
├── types/
│   └── one-program.types.ts
├── index.ts                     # Public API
└── README.md
```

Artwork lives in `public/assets/one_program/`, one 188×183 PNG per tile. **The filename
is the capability's `id`**, the same convention the ecosystem collage uses, so a tile and
its icon cannot drift apart.

## The right side is the argument, not a feature list

Reading any single tile is beside the point — the density is what says "ten programs". So
the tiles move on their own rather than waiting to be scrolled into view, and the section
does not try to make all eighteen legible at once.

## How the loop closes

Each rail holds **two identical tracks**. Translating a track a full `-100%` of its own
length moves it exactly its own measure, which puts its twin precisely where it began —
so the cycle restarts with no visible jump. This is the same trick the logo marquee uses
(`marquee-up` / `marquee-down` in `globals.css`, the vertical twins of the existing
`marquee-left` / `marquee-right`), and it holds only while both tracks render the same
tiles.

Two things are load-bearing and easy to undo by accident:

- **The trailing gap belongs to the track, not the rail.** Each track carries `gap-4`
  *and* a trailing `pb-4` (`pr-4` in a row), and the rail between them has no gap at all.
  Move that last gap onto the parent and the repeat length no longer equals the track's
  measure — every cycle lands 16px short, which shows as the whole rail jolting once per
  loop.
- **Six tiles per rail is a minimum, not a round number.** A track has to be at least as
  long as the box it shows through, or the duplicate appears mid-frame and the seam is
  visible. Six clears both the tallest rail height (32rem, against an 839–857px track)
  and the widest phone (a 912px track through ~327px); four would clear neither.

The clone is `aria-hidden`, so a screen reader meets the eighteen capabilities once
rather than thirty-six times.

The middle rail runs `down` against its neighbours' `up`, and all three periods differ
(26s / 22s / 30s). Matched periods put the rails in lockstep, which reads as one block
sliding rather than three rails drifting. The middle one also starts nudged back half a
tile, so the three are not aligned on the first frame — before anything has moved.

The periods are read against **the track's own length**, not the box it shows through: a
rail covers its full measure in `seconds` on either axis, so the same number gives a
comparable speed whether the track is running vertically at ~840px or horizontally at
912px. That is why the mobile rows need no separate set of numbers.

The drift pauses on hover: the labels are short but they are moving, and a reader who has
stopped on one has said what they want.

## The axis flips below `sm`, it does not just get narrower

Three columns sharing a phone's width leave each tile about 100px — enough to render, but
the labels break to three lines and the icons shrink to where the density stops reading as
abundance and starts reading as clutter. Turned on their side the same eighteen tiles get
a full 136px each and scroll through the one dimension a phone has to spare.

It is the same three rails either way — same tiles, same order, same periods. Only
`flex-direction` and the axis of the keyframes change, which is why a rail's `direction`
is one idea expressed on whichever axis is in play: `up` is up in a column and left in a
row, `down` is down and right. Both pairs mean "away from the reading origin" and "back
toward it", so a rail keeps its relationship to its neighbours across the breakpoint.

The tile is therefore sized two ways. In a column it has no width of its own — it takes a
third of the rail area, and the `vw`-aware `clamp`s on its icon and label keep it in
proportion as that third grows. In a row it cannot do that: a horizontal marquee's tiles
have to be `shrink-0`, or the flex algorithm squeezes the whole track down to the viewport
and leaves nothing to scroll. So there it takes a fixed `8.5rem`, the width at which
"Competitive Programming" settles onto two lines rather than three.

## Reduced motion unwinds the device rather than freezing it

A stopped marquee is a rail clipped at both ends by a fade, which reads as broken rather
than as still. So **every moving part is gated behind `motion-safe`** and nothing is left
to override: no animation, no clone, no mask, no fixed height — and the mobile axis flip
does not happen either. What is left at every width is three plain columns of tiles, which
is what the section is underneath.

Gating rather than overriding is the point. The alternative — `motion-reduce:animate-none`
beating `sm:animate-marquee-up` — would rest on how Tailwind happens to sort a responsive
variant against a media variant, which is not a guarantee worth building on. Under
`motion-safe` the rules simply never apply, so there is no cascade to lose.

Falling back to *columns* rather than to stalled rows is what keeps the fallback whole: a
frozen horizontal row would leave four of its six tiles outside the clip with no way to
reach them, while three static columns show all eighteen and fit a 375px viewport without
a scrollbar.

## Layout notes

- Two columns from `lg`, `5fr / 7fr` rather than an even split. The copy column holds a
  capped 26rem measure and stops growing, so an even split leaves a hole between the
  button and the first column of tiles.
- From `sm` the rails are three **equal flex children**, not fixed widths per breakpoint;
  the tiles' `clamp`ed type and icons absorb the width difference. `min-w-0` on each
  column is what lets them shrink — without it "Open Source + GSoC Guidance" sets a floor
  that pushes the three past a narrow viewport.
- All eighteen capabilities are content, so no width drops a rail. Below `sm` they turn
  on their side rather than losing one.
- No `position: sticky` on the intro. The page runs inside GSAP's `ScrollSmoother`, whose
  content wrapper is driven by a `transform` — sticky has no scrollport to resolve
  against in there. The movement in this section comes from the marquee, not from scroll,
  so it does not need one.
- The tiles draw no circle behind their icons: each PNG already carries its own pale-red
  disc, and a second would render as a ring around the first.
- Every icon `alt` is empty and every render is `aria-hidden` — the illustration pictures
  exactly what the label beneath it says.
- The price is a `<p>`, not a heading. It is a figure, not a section of the page, and an
  `<h3>` would put "₹50,000" into the document outline between two real headings.
