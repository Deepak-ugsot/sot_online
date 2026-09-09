# Built for Students

"Built for Students Who Want More." — the five conditions of the programme beside a
graduation cap, with the "this is not a shortcut" caveat set low and to the right.

Sits directly above the FAQ, and is the last thing the reader is asked to recognise
themselves in before the questions start.

## Public API

- `BuiltForStudentsSection` — the whole section. The only export routes should use.
- `BuiltForStudentsHeadingLine`, `BuiltForStudentsQualifier`,
  `BuiltForStudentsArtwork`, `BuiltForStudentsClosing` — types.

```tsx
import { BuiltForStudentsSection } from "@/features/built-for-students";
```

## Structure

```text
built-for-students/
├── components/
│   └── built-for-students-section.tsx  # The whole section ("use client")
├── constants/
│   └── built-for-students.constants.ts # Copy, artwork, selectors
├── hooks/
│   └── use-built-for-students-reveal.ts
├── types/
│   └── built-for-students.types.ts
├── index.ts
└── README.md
```

## Three columns, three different anchors

The copy is top-aligned, the artwork is centred, the caveat sits on the row's bottom
line. Each is anchored to a different edge on purpose:

- **The caveat drops.** `lg:self-end` against the grid's `items-start` is the only
  thing that moves, and it lands with its last line level with the last bullet. That
  shared bottom edge is what lets it sit a full column away from the list and still
  read as part of the same section — without it, a short block floating at the top of
  its column reads as an orphan.
- **It is a caveat, not a sixth bullet.** Bottom-aligning it puts white space between
  the list and the claim in the one direction a three-column grid has left; they are
  already as far apart as the measure allows horizontally.
- **The artwork is capped, not stretched.** The render is nearly square, so filling a
  28rem column would make it taller than the five-line list beside it and turn the
  artwork into the subject of the section.

Widths are `5 / 4 / 3` of twelve, read off the reference: the copy runs to about 38% of
the page, the render sits between 42% and 70%, and the caveat takes the last quarter.

## The stair-step

`Built for` / `Students` / `Who Want More.` is three lines with the middle one stepped
in, so the heading is carried as data — three records with an `isIndented` flag —
rather than as three hard-coded spans. Each line has to be its own element anyway
(only the last carries the red), so the shape may as well be something the copy owns
and a component cannot quietly lose.

The step is `1.8em`, not a pixel value: it tracks the heading's own
`clamp(2rem, 4.2vw, 3.5rem)`. At a fixed `px` the indent would swallow the line on a
phone and barely register against the 56px cap.

`More.` is `text-brand` with no `font-accent` — this heading stays in one face, matching
the reference, where the last word changes colour and nothing else.

## The list is a list

Five parallel conditions, marked up as a real `<ul>` with real markers, so a screen
reader announces "list, 5 items" — the same thing the dots say visually. `marker:text-ink`
against `text-ink-muted` copy is deliberate: at full strength the dots are what stop
five short lines reading as one soft paragraph. `list-outside` + `ps-5` keeps a wrapped
line aligned under the first word rather than under its dot.

## Below `lg`

The three stack in reading order — list, artwork, caveat. The artwork centres itself
instead of filling the column: a 788px render blown up to a phone's full width dwarfs
the copy it belongs to, so it is capped at 17rem on a phone and 20rem from `sm`.

## Measured

| Viewport | Result                                                                   |
| -------- | ------------------------------------------------------------------------ |
| 1440×900 | Section 668px. Columns at x 72/625/1068, widths 521/411/300; heading 56px |
| 1440×900 | Caveat and copy share a bottom edge at y 572; no page overflow            |
| 1024×900 | Columns 388/304/220 at x 24/444/780; heading 43px; no overflow            |
| 390×844  | Stacked in DOM order, artwork centred at 250px, `scrollWidth === 390`     |
| Homepage | Renders between `#journey` and `#faqs`, same `surface` ground as both     |

⚠️ **The reveal itself is unverified.** The browser pane in this environment stalls
`requestAnimationFrame`, so GSAP's ticker freezes mid-tween and no scripted scroll
advances it — the same limitation recorded in `features/one-journey`. Both ends were
checked directly instead: at rest the three blocks carry their `from` transforms
(`y: 40 / 32 / 28`, the artwork also at `scale: 0.94`), and forced to their landed
values they produce the layout in the table above. The only console errors on the page
are the documented 404s for the unlicensed Neue Montreal files.
