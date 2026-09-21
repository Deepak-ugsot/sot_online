# Next Opportunity

"Your Next Opportunity Could Be Anywhere." — what the Internshala ecosystem opens up,
under the upGrad School of Technology × Internshala lockup, in four points beside an
isometric scene of the Internshala search on a laptop.

## Public API

- `NextOpportunitySection` — the whole section. The only export routes should use.
- `NextOpportunityArtwork`, `NextOpportunityBenefit`, `NextOpportunityHeadingCopy`,
  `NextOpportunityLogo` — shared types.

```tsx
import { NextOpportunitySection } from "@/features/next-opportunity";
```

Rendered on the landing page between `NotAnotherCourseSection` and `HackathonsSection`,
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
offers; the hackathons and then the curriculum follow. All share the light `surface`
ground.

## The lockup

Above the heading: our mark, a multiplication sign, theirs. Both marks are the design's
own 1× exports (`upgrad_school_of_technology.png`, `internshala_logo.png`, 49px tall) set
at that height — soft on a high-density screen; vectors are the fix if that matters. The
sign is Lucide's `X` rather than the PNG the design shipped it as, so it stays sharp.

Internshala is lifted 8px off the shared centre, as in the design: its mark is one line
where ours carries "School of Technology" under the wordmark, so centring the boxes sits
it level with that subline. Lifted, the two wordmarks share a line. It is a translate, so
the row's height is unaffected. A screen reader hears "upGrad School of Technology in
partnership with Internshala" — the cross is decoration, so the relationship is in words.

## The render

`internshala_ecosystem.png` (536×520) is a cut-out on transparency with its red panel
drawn in, so it needs no plate. It is capped at its own width — the column is wider at
1440, and filling it would upscale a 1× file — and from `lg` it sits against the
column's end, which puts its right edge on the measure's, as in the design. The reveal
lifts it but never scales it: growing the hard-edged panel about its centre walks that
edge toward the copy before it settles.

## Measurements

Checked against the design at 1440: the heading lines land within 1px, the paragraph
(15px on a `30rem` measure) sets on the design's four lines with each within ~8px of the
design's length, and the benefit rows are 111px apart against the design's 110. The
benefit renders are 56px (the files are 66–69px, so never upscaled), titles 20px medium,
descriptions 15px.

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
render at 56px (48px on a phone), so they are never upscaled.

Each one is `aria-hidden` with an empty `alt`: it is a picture of the thing its own title
names, and describing it would make a screen reader announce "globe", "magnifying glass"
before each heading while teaching the reader nothing a sighted visitor gets from them.

The rows use `items-start`, not `items-center`. These renders are square and the copy
beside them is one or two lines depending on width — centred, an icon drifts down its row
the moment a description wraps, and the four stop sharing a line.

## Copy and assets

All copy is in `constants/`. Artwork lives in `public/assets/next_opportunity/`.
