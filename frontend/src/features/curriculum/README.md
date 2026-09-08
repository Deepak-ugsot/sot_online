# Curriculum

"A curriculum built around how engineers actually learn." — the four semesters as an
accordion on small screens and a tabbed panel from `lg` up, each showing its projects, the
skills it builds, and every module it teaches.

## Public API

- `CurriculumSection` — the whole section. The only export routes should use.
- `CurriculumHeadingCopy`, `CurriculumProject`, `CurriculumSemester` — shared types.

```tsx
import { CurriculumSection } from "@/features/curriculum";
```

## Structure

```text
curriculum/
├── components/
│   ├── curriculum-section.tsx    # Heading, the grid, open semester  ("use client")
│   ├── curriculum-header.tsx     # One accordion row / tab           ("use client")
│   ├── curriculum-projects.tsx   # The project rail                  ("use client")
│   └── curriculum-subjects.tsx   # Skill pills + "All Subjects"
├── constants/
│   └── curriculum.constants.ts   # Copy and all four semesters
├── hooks/
│   └── use-curriculum-reveal.ts  # Entrance reveal
├── types/
│   └── curriculum.types.ts
├── index.ts                      # Public API
└── README.md
```

## This section owns `#curriculum`

The header's primary nav has linked to `#curriculum` since the site was built, with nothing
on the page answering to it — the link scrolled nowhere. It resolves here. Renaming this
section's `id` breaks that nav item, so `site.config.ts` has to move with it.

## Accordion and tabs are the same DOM, rearranged by one grid

The panel sits **between** the headers in source order, immediately after the open one.
That is exactly accordion order, and a single-column grid gives it for free. From `lg` the
grid becomes four columns, every header is pinned to row 1 and its own column, and the panel
is placed explicitly in row 2 spanning all four — a row of tabs above one panel.

Nothing is rendered twice and there is no media-query hook. Both alternatives are worse:

| Approach | Cost |
| --- | --- |
| Render both, `lg:hidden` one | Duplicates the whole panel — four project cards and their artwork — in the markup |
| `matchMedia` hook | A wrong-layout first paint on every load |

**Each header is pinned to `lg:col-start-N` explicitly.** With only `row-start-1` on the
headers, the auto-placement cursor steps over the columns the panel occupies and pushes the
later headers out of the row — because the panel is a sibling sitting between them. The
columns are written out as static strings in `COLUMN` since Tailwind cannot build class
names at runtime.

`overflow-hidden` on the panel wrapper is load-bearing rather than tidiness — the open
header is a solid red block running into the card's corners, and without clipping it squares
them off against the card's own radius.

## One semester is always open

There is no collapse-to-nothing state. The desktop layout shares this state, and a fully
collapsed accordion would leave it showing a row of tabs above an empty panel.

## Semantics are a disclosure, not a tablist

ARIA roles cannot change at a breakpoint, so `role="tab"` — accurate for the desktop row —
would be wrong on the phone layout. A `tablist` also may not contain its panel, which the
accordion ordering forces it to.

`aria-expanded` + `aria-controls` on each header, with the panel as a labelled `region`,
describes both layouts truthfully: four buttons, each revealing the same region. It also
keeps all four headers in the tab order, which is what a keyboard user expects of an
accordion, and needs no custom arrow-key handling.

## Only the open panel exists, and it remounts

`key={open.id}` is doing real work, not just satisfying React:

- **The project rail resets to its start.** Without the remount, a viewer who had scrolled
  to the last project of Semester 1 would land mid-rail in Semester 2, with the first two
  cards already scrolled off.
- **Focus inside the outgoing panel goes with it**, rather than being left on a node that
  no longer represents anything.

Because the panel remounts, nothing inside it needs its own reset logic — which is why
`CurriculumProjects` takes no semester id.

## The project rail

A rail rather than a grid, and the overflow is the affordance. Three semesters carry four
projects and one carries three; a four-up grid would shrink the artwork to a thumbnail, and
a two-row grid would push the skills and subjects below the fold.

`RailScrollArrow` is shared with the gallery and readiness rows and **measures** whether it
is needed, so Semester 3's three cards — which fit without scrolling — get no arrow without
this file knowing that.

**The card width lives in `--curriculum-card` and the arrow's offset is calculated from
it.** The arrow sits on the artwork's centre, and the artwork's height is derived from the
card width (`card − 1.5rem` of padding, at `358/566`) — so hand-tuned `top` values per
breakpoint drift out of true the next time a card is resized. One variable and one `calc()`
keep them in step:

```
top: calc(0.75rem + (var(--curriculum-card) - 1.5rem) * 0.3163)
```

`0.75rem` is the padding above the image and `0.3163` is `358/566/2`. Verified centred to
0px at every breakpoint.

## "All Subjects" is a grid, not CSS columns

The design pairs each subject with the one beside it — Python next to Web Essentials, Maths
next to DSA — so the list is stored in that row order and the layout must honour it.
`columns-2` fills *down*: it would pour the first four into the left column and the rest
into the right, silently re-pairing every row against the approved design. An odd count just
leaves the last cell empty, which is what Semester 1's seven do.

## Artwork

`public/assets/curriculum_project/`, 15 files, every one 566×358 — which is why the cards
share one `aspect-[566/358]` box and `object-cover` never actually crops. That ratio is a
literal in `curriculum-projects.tsx` because a Tailwind arbitrary value cannot read a
constant; re-exporting the artwork at another size means moving both.

**Filenames are passed through verbatim, spaces, ampersands and parentheses included.** Two
things make that safe: `next/image` percent-encodes the path into its own `url` query
parameter, so pre-encoding here would double-encode and 404; and the capitalisation is
load-bearing, because macOS resolves `(LSAMS).png` and `(lsams).png` alike while the Linux
deploy target does not.

## Copy

Semester 1 is transcribed from the approved design. Semesters 2–4 are written to the same
shape against the supplied artwork.

Two typos in the design are **corrected** rather than reproduced:

| Design | Here |
| --- | --- |
| `SubjectsProgramming Foundations (Python)` | `Programming Foundations (Python)` |
| `Web Essentials (HTML ,CSS & Tailwind CSS)` | `Web Essentials (HTML, CSS & Tailwind CSS)` |

The first is the panel's own "Subjects" heading concatenated onto the first entry.

## Why there is no pin

The panel is a control the reader operates. Scroll-driven motion on something being clicked
fights the interaction — the card would still be settling while its headers are being
pressed — so the reveal is a one-shot entrance and nothing else.
