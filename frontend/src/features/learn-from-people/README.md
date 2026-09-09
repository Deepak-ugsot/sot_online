# Learn From People

"Learn From People Who Have Done It." — the four kinds of engineer a student is taught
by, as a 2×2 grid of tinted cards, closed by the line naming the network they come from.

## Public API

- `LearnFromPeopleSection` — the whole section. The only export routes should use.
- `LearnFromPeopleHeadingCopy`, `LearnFromPeopleMentor`, `LearnFromPeopleTone` — shared
  types.

```tsx
import { LearnFromPeopleSection } from "@/features/learn-from-people";
```

Rendered on the landing page below `EarlyStartSection`, and in isolation at
`/dev/learn-from-people`.

## Structure

```text
learn-from-people/
├── components/
│   ├── learn-from-people-section.tsx  # Heading, grid, closing  ("use client")
│   └── learn-from-people-card.tsx     # One mentor card
├── constants/
│   └── learn-from-people.constants.ts # Copy, the four profiles, selectors
├── hooks/
│   └── use-learn-from-people-reveal.ts
├── types/
│   └── learn-from-people.types.ts
├── index.ts                           # Public API
└── README.md
```

Artwork lives in `public/assets/learn_from_people/`, one PNG per card.

## Roles, not names

The cards describe the *kind* of engineer a student is taught by. Naming individuals
would tie the page to a roster that changes without the section changing, and every card
would then need a photograph and a permission to use it.

## The tint is a named tone, not a class string

Each mentor carries a `tone` (`crimson` / `azure` / `emerald` / `violet`) and the card
maps it to Tailwind classes in `TONE_CLASSES`. The constants file holds copy, and a
gradient written there would be the one thing in it a copywriter could not safely edit.

The classes are whole static strings because Tailwind cannot build class names at
runtime — `from-${tone}` compiles to nothing. The values are hex rather than palette
steps: these are washes several shades paler than anything in `@theme`, and promoting
four one-off tints to design tokens would invite them to be used as if they were part of
the system.

## The artwork is sized by height, not width

The four PNGs run from a portrait medal (358×402) to a wide laptop scene (472×393). A
shared *width* would render the medal half again as tall as the rest and force its card
taller than the one beside it. A fixed box with `object-contain` lets each illustration
keep its own proportions while every card reads at the same scale, and nothing is
cropped — which a `cover` fit would do to the medal's ribbon.

The box drops to 100px below `sm`. At the `sm` size a phone leaves the copy barely 200px,
which puts "Senior Backend Engineer" on three lines and "Competitive Programming Mentor"
on three more. Shrinking the artwork is the cheaper trade: it is the thing on the card
that loses the least by being smaller.

Every `alt` is empty and every render is `aria-hidden`: each illustration pictures what
its own card heading already says, so describing it would make a screen reader say the
same thing twice.

## The heading's measure is what breaks the line

`37.5rem`, and it is load-bearing. At the `3rem` cap "Learn From People Who" measures
539px and the same line with "Have" added measures 663px, so the block has to sit between
them for the design's break to land after "Who" — 600px is the middle of that band.

There is deliberately **no `text-balance`**: balancing evens the two lines and picks
"Learn From People" / "Who Have Done It." instead. And the break is not forced with a
`\n`, because below the cap the heading wraps to three lines by itself and a hard break
there would strand a fragment.

Both measurements are against the fallback face — Neue Montreal is not redistributable
and 404s in this repo, see `globals.css` — so measure again if that file lands.

## Layout notes

- `78rem` rather than the `72rem` of the sections above it: these are four cards holding
  artwork, not a column of copy, and at the narrower measure the illustrations start
  crowding the text beside them.
- Two columns from `lg`. Below it a card would have to hold its copy and artwork side by
  side in half a phone's width, so the grid collapses to one column and each card keeps
  its internal layout — which is the part that carries the design.
- The cards are a `<ul>`: four parallel profiles rather than a sequence, and marking them
  as a list tells a screen reader how many there are before it starts reading them.
