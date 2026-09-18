# Next Opportunity

"Your Next Opportunity Could Be Anywhere." — what the Internshala ecosystem opens up, in
four points, beside an astronaut holding the brand's board over the globe.

## Public API

- `NextOpportunitySection` — the whole section. The only export routes should use.
- `NextOpportunityArtwork`, `NextOpportunityBenefit`, `NextOpportunityHeadingCopy` —
  shared types.

```tsx
import { NextOpportunitySection } from "@/features/next-opportunity";
```

Rendered on the landing page between `NotAnotherCourseSection` and `CurriculumSection`,
and in isolation at `/dev/next-opportunity`.

## Structure

```text
next-opportunity/
├── components/
│   ├── next-opportunity-section.tsx    # Layout, heading, the render   ("use client")
│   └── next-opportunity-benefit.tsx    # One render + claim + support line
├── constants/
│   └── next-opportunity.constants.ts   # Copy, the four benefits, artwork, selectors
├── hooks/
│   └── use-next-opportunity-reveal.ts  # Entrance reveal
├── types/
│   └── next-opportunity.types.ts
├── index.ts                            # Public API
└── README.md
```

## Where it sits, and why

The page has just finished saying what the programme is *not*. This is the first thing it
offers before the syllabus itself, and the curriculum follows directly. All three share
the light `surface` ground, so they read as one band the curriculum closes.

## The section's background is load-bearing

`internshala_astronaut.png` **is not a cut-out**. Its ground is a flat plate whose
dominant pixel is `#f3f4f6` — exactly `--color-surface` — with a couple of values of
noise either side. That is what lets the render sit on the page with no plate, no
rounding and no shadow of its own, and it is why:

- the section must stay `bg-surface`. Any other background and the render becomes a
  visible rectangle;
- the reveal lifts it but never **scales** it. Scaling about its centre walks the plate's
  edges over the copy beside it before settling — invisible on a transparent render, a
  moving rectangle on this one.

The gutter between the two columns is narrow (`lg:gap-8`) for the same reason: the
astronaut sits well inside its own plate, so the picture already carries its margin. A
full-size gutter on top of that reads as a hole, and takes width out of the copy column,
which is the one that needs it.

## The heading's line break is data

`NextOpportunityHeadingCopy` carries the break as `lead` / `trail` / `accent` rather than
leaving it to the measure. "Your Next Opportunity Could Be Anywhere." is short enough that
a column a little wider or narrower moves the break from after "Opportunity" to after
"Could" — and that second reading strands "Be Anywhere." as a fragment. The second line is
a `<span className="block">` rather than a `<br>`, so the two halves can never be reflowed
into one at a width where they happen to fit.

## The benefit renders are illustrations, not icons

The four PNGs are lit, carry their own red accent marks, and are not drawn on the grid or
at the weight any Lucide glyph uses — so they cannot be swapped for one, the way
`features/beyond-college` swapped its hand-drawn set. They are 66–69px in the file and
render at 40px, so they are never upscaled.

Each one is `aria-hidden` with an empty `alt`: it is a picture of the thing its own title
names, and describing it would make a screen reader announce "globe", "magnifying glass"
before each heading while teaching the reader nothing a sighted visitor gets from them.

The rows use `items-start`, not `items-center`. These renders are square and the copy
beside them is one or two lines depending on width — centred, an icon drifts down its row
the moment a description wraps, and the four stop sharing a line.

## Copy and assets

All copy is in `constants/`. Artwork lives in `public/assets/next_opportunity/`.

The Internshala board is part of the render, so the brand is credited by the artwork
rather than by a logo of our own — the same claim `features/early-start` makes by setting
the wordmark inline in its subtitle. If the brand ships a new mark, both places change
together.
