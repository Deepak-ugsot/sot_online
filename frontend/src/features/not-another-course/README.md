# Not Another Course

"Your college determines your campus. It shouldn't determine **your peer group.**" — a
collage of students ringed by the four archetypes they might be, closing on "Ambition is
contagious. Surround yourself with more of it."

**The directory name is historical.** It comes from the section's previous heading, "Not
Another Course. A Career Operating System.", which this replaced wholesale. The name was
kept because renaming a feature touches its directory, every file in it, the section's
`id`, its selector map and the route that imports it — churn with no behavioural payoff.
Rename it in one deliberate pass if it starts to mislead, not as a side effect of a copy
change.

## Public API

- `NotAnotherCourseSection` — the whole section. The only export routes should use.
- `NotAnotherCourseHeadingCopy`, `NotAnotherCoursePeerLabel`, `NotAnotherCourseCorner`,
  `NotAnotherCoursePeerIconName`, `NotAnotherCourseClosingCopy` — shared types.

```tsx
import { NotAnotherCourseSection } from "@/features/not-another-course";
```

## Structure

```text
not-another-course/
├── components/
│   ├── not-another-course-section.tsx  # Heading, composition, sign-off  ("use client")
│   ├── not-another-course-label.tsx    # One floating peer label (server)
│   └── not-another-course-icon.tsx     # The four glyphs (server)
├── constants/
│   └── not-another-course.constants.ts # Copy, labels, media, selector map
├── hooks/
│   └── use-not-another-course-reveal.ts
├── types/
│   └── not-another-course.types.ts
├── index.ts                            # Public API
└── README.md
```

## The labels are markup, not part of the artwork

`peer_group.png` is only the photography and the red arch. Every label around it —
"Coders", "AI Hackers", "Builders", "Open-Source Contributor" — is rendered from
`notAnotherCoursePeerLabels`.

That is the whole reason they are not baked into the render: text in the DOM is
selectable, translatable, readable by a screen reader, and re-typesettable at any width. A
label flattened into a PNG is none of those, and it also fixes the type size to whatever
the export was scaled to.

## The labels overlap the collage — they do not sit beside it

Four columns around the artwork would force a bad trade: either squeeze the collage to
make room, or push the labels out to the page edges. Neither is the design.

The photographs step down toward the middle and leave all four outer corners open, so each
label is lifted out of flow into one of them, reaching a few percent past the edge nearest
it so it reads as pinned to a face rather than floating in the margin. `CORNER_PLACEMENT`
holds the numbers, as **static class strings** — Tailwind scans source text, so a class
built by interpolating `corner` would never be generated and the label would render
unpositioned.

**Widths there are `rem`, not percentages.** The Figma canvas is 2000px wide where this
container is 1376, so a percentage that comfortably fits "DSA, Competitive Programming"
in Figma wraps it to three lines here. Sizing each label to its own text keeps the reading
right; the percentage offsets keep the placement right.

Every number is tied to *this* artwork. Swap `peer_group.png` for a render with different
margins and they all need re-checking.

Below 1100px the overlap has nowhere to go, so the labels drop into a grid under the
collage — one column, two from `sm`. The switch point is set by the content rather than a
Tailwind breakpoint: neither `lg` (1024) nor `xl` (1280) lands close enough to where the
composition stops fitting.

## The GitHub mark is hand-drawn; the other three are Lucide

Lucide dropped its brand glyphs, so `Github` does not exist in the installed version. The
label beside it says "GitHub, GSoC, Communities", and a generic branch or merge icon is a
worse answer than the mark everyone already reads as GitHub — so that one is a path in
`not-another-course-icon.tsx` and the rest come from Lucide, the way
`features/beyond-college` does it.

It is the only filled glyph among four stroked ones. That is invisible at 18px inside four
separate tiles and would only matter if they sat in a row.

## The reveal

`use-not-another-course-reveal.ts` runs one timeline on a `once: true` ScrollTrigger:
heading and subtitle rise, the collage settles up out of a slight shrink, the four labels
arrive from their own sides, and the sign-off lands last.

Each label's direction is read off `data-corner` rather than its class string, which
script cannot introspect. A single tween with a function value rather than one per corner:
all four share every other property, and this keeps the stagger across the set.

**Below 1100px they rise instead of sliding.** There are no corners there — the labels are
grid cells — so a sideways entrance has nowhere to come from, and the right-hand ones'
`x: 40` start state would push the document 40px wider until the trigger fires.

The breakpoint in the hook and the `min-[1100px]:absolute` in the label must stay equal, or
the labels animate along an axis they do not sit on.

## Image

`/assets/peer_group.png`, 894x530, local so `next/image` optimises it at build time.
Intrinsic size is passed rather than `fill`, so the box is reserved from the file's own
ratio and nothing below it jumps as the image loads.

Alt text is real, not `""`: the image carries the section's meaning — a peer group, not
one student — and the surrounding copy does not restate it.

## Copy

Two stray spaces before commas in the Figma labels ("DSA , Competitive programming",
"Products , AI, Systems") were normalised, and the metas title-cased to match "GenAI,
Agents, AI Engineering". Change them in `notAnotherCoursePeerLabels` if the design meant
them literally.

## Verified

At 1512 and 375: labels land in their corners without covering a face, the composition box
stays exactly as tall as the image, and the page has no horizontal overflow.
