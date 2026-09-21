# Faculty

"Taught by World's Top Tech and Academic Minds" — the people who teach, as a row of
white cards drifting leftward under the heading.

## Public API

- `FacultySection` — the whole section. The only export routes should use.
- `FacultyMember`, `FacultyCompany`, `FacultyHeadingCopy` — shared types.

```tsx
import { FacultySection } from "@/features/faculty";
```

Rendered on the landing page directly below `LeadersSection` and above
`TechScoreSection`, and in isolation at `/dev/faculty`.

## Structure

```text
faculty/
├── components/
│   ├── faculty-section.tsx   # Heading, subtitle, the rail  ("use client")
│   ├── faculty-marquee.tsx   # The drifting row — pure CSS (server)
│   └── faculty-card.tsx      # One card (server)
├── constants/
│   └── faculty.constants.ts  # Copy, companies, the roster, timing, selectors
├── hooks/
│   └── use-faculty-reveal.ts
├── types/
│   └── faculty.types.ts
├── index.ts                  # Public API
└── README.md
```

## The roster is a placeholder

The design repeats one profile — Vishwa Mohan, "CEO of upGrad SOT" — across the whole
row, and that profile is all that was supplied. `facultyMembers` builds four cards from
it. When the real roster lands, write one entry per person there; nothing else changes.
The photo is `public/assets/faculty/vishwa-mohan.webp`, a 1092×1092 cut-out with its red
backdrop drawn in on a transparent ground.

## The row drifts rather than scrolls

It is a CSS marquee, the same trick as the employer marquee, the real-world ribbons and
the One Program rails: identical tracks side by side, each translated a full `-100%` of
its own width, so when one has slid exactly off the left its neighbour is standing where
it began. What keeps it honest:

- **Three copies.** The loop only closes while `(copies − 1) × trackWidth` covers the
  window. Four cards measure ~1,424px against a window of at most 1,296px, which two
  copies would only just cover; three leave room for the roster to shrink to two people.
- **The spacing is each card's own right padding, not a `gap`**, so the last card of one
  copy and the first of the next are spaced like any other pair.
- **Only the first copy is content.** The duplicates are `aria-hidden` and their logos
  drop their `alt`, or a screen reader hears the faculty three times over.
- **The edges are a mask**, not a gradient laid over the cards, so they fade into
  whatever the ground is and nothing on top intercepts the hover.
- **It pauses under the pointer** (`group-hover`, which Tailwind gates behind
  `(hover: hover)`, so a tap never leaves it stuck).

One pass takes `FACULTY_MARQUEE_SECONDS` (40s), about 35px a second at desktop width.

The entrance tween animates the rail's **wrapper**, never the tracks: their `transform`
belongs to the CSS animation, and a tween on the same property would fight it.

### Under reduced motion it becomes a scroller

A stopped marquee is a row clipped mid-card at both ends with most of the faculty out of
reach. So the duplicates and the mask drop out and the window scrolls on its own axis
with snap points — same cards, every one reachable, nothing moving by itself.

## Logos

The four marks come from `public/companyLogo/` — the 177px masters, not the 23px exports
the design shipped. They are the same marks at the same proportions, but a 23px file is
exactly 1× at the size the card sets it and soft on any high-density screen. Every file
in that folder is 177px tall, so the card sets one height and lets each width follow.

They sit in two `max-content` columns rather than a wrapping row: at the card's width a
wrapping row fits three logos and strands the fourth, where the design sets them two by
two. The list is labelled "Has worked at" for assistive tech.

Filenames are passed through verbatim — their capitalisation is load-bearing on the
Linux deploy target.

## Measurements

At 1440 the card is 332×440 against the design's ~331×441: a 284px portrait flush with
the card's top (the file's own transparent headroom is the design's top margin), 20px
side padding, logos at 23px tall. Below `sm` it steps down to 280px wide with 20px logos
so a phone shows one card and the edge of the next.
