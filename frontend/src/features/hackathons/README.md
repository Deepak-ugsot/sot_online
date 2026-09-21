# Hackathons

"Build. Compete. Win. ₹20 Lakhs" — the hackathons and coding competitions that run
every six months, beside a student in a headset that says "Hack. Build. Solve. Win."

## Public API

- `HackathonsSection` — the whole section. The only export routes should use.
- `HackathonsHeadingCopy`, `HackathonsCadence`, `HackathonsArtwork` — shared types.

```tsx
import { HackathonsSection } from "@/features/hackathons";
```

Rendered on the landing page directly below `NextOpportunitySection` and above
`CurriculumSection`, and in isolation at `/dev/hackathons`. Distinct from
[`compete`](../compete/README.md) ("Don't just learn to code. Compete."), which is why it
is named for what it is rather than for its verb.

## Structure

```text
hackathons/
├── components/
│   └── hackathons-section.tsx   # Headline, copy, the figure  ("use client")
├── constants/
│   └── hackathons.constants.ts  # Copy, artwork, selectors
├── hooks/
│   └── use-hackathons-reveal.ts
├── types/
│   └── hackathons.types.ts
├── index.ts                     # Public API
└── README.md
```

The figure is `public/assets/hackathons/student-headset.png`, a 520×617 cut-out on
transparency that fades out at its own foot — it gets no plate, box or shadow.

## Layout

From `lg` the copy and the figure **share one grid cell** rather than two columns. The
design's paragraph runs past where the figure's box begins, which only works because the
file's left fifth is empty transparency. Each keeps its own alignment in the cell (copy
to the start, figure to the end, both centred), the copy is layered above, and the
copy's measure (`56%`, then `71%` from `xl`) is what keeps the text off the figure.

The figure is lowered 24px with `top-6` rather than a margin, so it sits a little below
the copy as in the design without growing the row. From `1392px` it also steps 40px past
the measure's right edge, where the design stands it — the first width at which the
gutter is wide enough that the shoulder's fade cannot be clipped by the window.

### Spacing

The padding is thin on purpose (`lg:pt-0 lg:pb-7`). The design keeps the section close to
its neighbours — ~198px from next-opportunity's last line to "Build." and ~195px from
"Real rewards." to the curriculum heading at 1440 — and most of that already comes from
next-opportunity's `pb-24`, the curriculum's `pt-20`, and the figure standing taller than
the copy. Measured: 202px and 195px.

## Typography

Measured against the design at 1440 (every line within ~3px of it):

- The headline is `4rem`, not the design's nominal size: the fallback face (Neue Montreal
  404s in this repo) sets wider, and this is where the first line matches the design's
  height. It still runs ~6% wide — that is the face.
- The "Win." + prize row is sized in `em` of the headline, so the pair keeps its
  proportions down the clamp: 563×107 against the design's 564×108.
- Body lines are 22px — the size at which the first sentence matches the design's width.
- The design's charcoal body colour (`#1e2022`) is `text-ink/90` on this ground.

The paragraph and the closing lines are one string per line in the constants: the design
breaks between sentences, not wherever the measure falls.

## The reveal

Headline, paragraph and cadence rise in on a stagger; the prize plate is uncovered left to
right with `clip-path` (scaling it would squash the text inside it); the figure rises on
its own trigger. Fires once. Nothing is registered under reduced motion.
