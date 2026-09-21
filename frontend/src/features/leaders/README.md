# Leaders

"Built by Leaders Who've Shaped Education and Technology" — the three people behind the
school, as cut-out portraits with their captions set into the corner of each cut.

## Public API

- `LeadersSection` — the whole section. The only export routes should use.
- `Leader`, `LeadersHeadingCopy` — shared types.

```tsx
import { LeadersSection } from "@/features/leaders";
```

Rendered on the landing page directly below `CareerOsSection` ("Everything In One
Place.") and above `FacultySection`, and in isolation at `/dev/leaders`.

## Structure

```text
leaders/
├── components/
│   ├── leaders-section.tsx   # Heading, quote, the row  ("use client")
│   └── leader-card.tsx       # One portrait + caption
├── constants/
│   └── leaders.constants.ts  # Copy, the three leaders, selectors
├── hooks/
│   └── use-leaders-reveal.ts
├── types/
│   └── leaders.types.ts
├── index.ts                  # Public API
└── README.md
```

Portraits live in `public/assets/leaders/`, one 360×571 PNG per leader.

## The captions are text, not pixels

The design exported each card with the name, title and bio baked into the PNG beside the
cut. They were cleared out of the files and are set as text instead, so they stay sharp
at DPR 2, can be selected, and live in the constants with the rest of the copy.

That was safe to do mechanically because the cut is exact: every portrait ends on the
45° line `x + y = 568` of its frame and every caption pixel sits at `x + y ≥ 582`, so
zeroing everything past `575` removed the caption and not one pixel of portrait.

**A replacement portrait has to keep that frame and that cut.** The caption is placed as
percentages of the 360×571 frame (see below), so a file with a different crop puts the
caption on the photo.

## The caption is placed in the portrait's own proportions

`LeaderCard` stacks the image and the `<figcaption>` in one grid cell. The caption's
margins are percentages, and a `margin-top` percentage resolves against the cell's
*width*, so `mt-[112.2%] ml-[49.2%]` lands the name's cap line at the design's y≈409,
x≈177 on the frame at every card width. The type is in `cqw` (the figure is the query
container), so it scales with the portrait and keeps its place in the corner; each size
has a floor, below which it wraps to more lines rather than shrinking further.

Sharing the cell rather than absolutely positioning the caption means a caption that
runs long grows the card instead of spilling out of it.

`mr-[8.2%]` is the bio's measure (~153px on the 360px frame), pinned from both sides by
the design's own line breaks: "Curated 35,000+ career" must fit on one line (151px) and
"Amazon, PayPal, Walmart," must not (156px). All three bios then break exactly where the
design breaks them. Measured against the fallback face — Neue Montreal 404s in this repo,
see `globals.css` — so measure again if that file lands.

## Layout notes

- A wrapping flex rather than a grid, so the two-up tablet layout centres the third
  portrait beneath the first two. From `lg` it is three across with `justify-between`,
  which puts the outer portraits on the `84rem` measure's edges as the design has them.
- The heading's two lines are two blocks, not one run with a `<br>`. A hard break
  strands "Shaped" on a line of its own on a phone, where the first line wraps before
  the break is reached; as blocks each line balances on its own.
- The bottom padding is short on purpose: the faculty section follows on the same ground
  and the design reads the two as one band (~112px between them at 1440).

## Copy

All copy is in `constants/`. Two slips in the exported copy were corrected rather than
carried over: "Ex- CIO" lost its stray space and "Linkedin" became "LinkedIn".

Portrait `alt`s are empty: the name sits beside its portrait in the same `<figure>`, so
describing the photo would have a screen reader say it twice.

## The reveal

The heading block rises in, then the three portraits in reading order (`y: 36 → 0`,
0.12s stagger), triggered off the row rather than the section so a short viewport does
not play them out below the fold. Fires once. Nothing is registered under reduced motion.
