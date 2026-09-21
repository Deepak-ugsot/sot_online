# Learning Routine

"Here's what 24 months will look like" — the class model: the routine as a cycle on a
dark card, and its four parts (live classes, daily revision, daily doubt clearing, weekly
tests) spelled out beside it.

## Public API

- `LearningRoutineSection` — the whole section. The only export routes should use.
- `LearningRoutineArtwork`, `LearningRoutineHeadingCopy`, `LearningRoutineItem` — shared
  types.

```tsx
import { LearningRoutineSection } from "@/features/learning-routine";
```

Rendered on the landing page directly below `CurriculumSection` and above
`LearnFromPeopleSection`, and in isolation at `/dev/learning-routine`.

## Structure

```text
learning-routine/
├── components/
│   ├── learning-routine-section.tsx  # Heading row, card, the four parts ("use client")
│   └── learning-routine-item.tsx     # One render + title + line (server)
├── constants/
│   └── learning-routine.constants.ts # Copy, the four parts, artwork, selectors
├── hooks/
│   └── use-learning-routine-reveal.ts
├── types/
│   └── learning-routine.types.ts
├── index.ts                          # Public API
└── README.md
```

Artwork lives in `public/assets/learning-routine/`.

## The card is one image

`learning-routine.png` (559×371) is the design's own export, labels and all, set at that
size. Its text is pixels — hence a written-out `alt` — and a little soft on a high-density
screen. Rebuilding it as DOM and SVG, the way the Career OS tiles are drawn, is the fix if
that matters.

## Layout

Two rows, each split at `lg`: heading against subtitle, then card against the four parts,
each pair centred on the other as the design sets them.

The card's track is `1fr` against the parts' `1.1fr`, with the card capped at its file's
559px: at 1440 the card gets its own size and each part's copy the ~200px it has in the
design. The parts are one column between `lg` and `xl`, where two would leave each title
about 120px beside its render.

The part renders are four heights (56–67px) at one width, so each sits in a fixed 95px
box and the row is `items-center` — every title starts on the same line down the column.

The top padding is short (`pt-10`) because the curriculum's own `pb-20` stands above it:
together they leave ~196px from the curriculum's last line to this heading at 1440, the
interval the design keeps between sections.

## Copy

All copy is in `constants/`. The design's "350+ Live Classess" is corrected to "Classes".

## The reveal

Heading row, then the card, then the four parts in reading order — each on its own
trigger, so a short viewport cannot play them out below the fold. Fires once. Nothing is
registered under reduced motion.
