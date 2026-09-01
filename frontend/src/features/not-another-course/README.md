# Not Another Course

"Not Another Course. A Career Operating System." — a centred heading over the product
collage, with a caption tucked into each of the artwork's open corners.

Named after its own heading rather than "Career OS", because the reference has a
*separate* "Introducing Career OS" feature-grid section further down the page. Keeping
the names distinct avoids a collision when that one is built.

## Public API

- `NotAnotherCourseSection` — the whole section. The only export routes should use.
- `NotAnotherCourseHeadingCopy`, `NotAnotherCourseCaption` — shared types.

```tsx
import { NotAnotherCourseSection } from "@/features/not-another-course";
```

## Structure

```text
not-another-course/
├── components/
│   ├── not-another-course-section.tsx  # Heading + composition  ("use client")
│   └── not-another-course-caption.tsx  # One flanking caption (server)
├── constants/
│   └── not-another-course.constants.ts # Copy, media, selector map
├── hooks/
│   └── use-not-another-course-reveal.ts
├── types/
│   └── not-another-course.types.ts
├── index.ts                            # Public API
└── README.md
```

## The captions overlap the collage — they do not sit beside it

Three columns would have forced a bad trade: either squeeze the artwork to make room,
or push the captions out to the page edges. Neither is the design.

`course.png` has **empty bottom-left and top-right corners**, so the captions are lifted
out of flow into those instead. The collage takes the middle **65%** of the composition,
leaving **28%** either side, and each caption overlaps the image's *box* without ever
touching its *content*:

| Caption | Spans (composition) | Sits over | Nearest artwork |
| ------- | ------------------- | --------- | --------------- |
| left    | x 0–28%, y 68–90%   | image-local x 0–16% | red shape starts at 33% |
| right   | x 72–100%, y 13–30% | image-local x 84–100% | code panel ends at 80% |

**Those numbers are tied to this render.** Swap `course.png` for artwork with different
margins and both need re-checking — nothing enforces the clearance at runtime.

Placement lives in `SIDE_PLACEMENT` as a lookup of **static class strings**, not a
template built from `side`. Tailwind scans source text: an interpolated class is never
generated, and the caption would render unpositioned.

Below **1100px** the overlap has no room to read, so both captions drop into ordinary
flow beneath the collage. That switch point is set by the content rather than a Tailwind
breakpoint — neither `lg` (1024) nor `xl` (1280) lands close enough.

## Heading line breaks are data, not measurement

The design breaks the heading in two: **"Not Another Course. A Career" / "Operating
System."** Only the closing phrase is accented.

The reference gets that break from a `max-width` on the line. That only lands for the
exact typeface it was measured against — with the fallback face it broke as "A Career
Operating / System." instead, so the break is stated in the data instead.

One subtlety: the space between lead and accent is kept even though the accent is a
block. It collapses visually before a block box, but dropping it makes the accessible
text read "A CareerOperating System."

## The reveal

One timeline on a single `ScrollTrigger` at `top 80%`, `once: true`.

| Target   | Motion                          | Starts at |
| -------- | ------------------------------- | --------- |
| Heading  | fade + `y: 40 → 0`              | 0s        |
| Collage  | fade + `y: 50 → 0`, `scale: 0.96 → 1` | 0.15s |
| Captions | fade + `x: ±40 → 0`, stagger 0.12 | 0.45s   |

Each caption enters from the side it sits on. The direction is read from `data-side`,
which exists precisely because the side is otherwise only encoded in a class string and
so is invisible to script.

## Image

`public/assets/course.png` — a local asset, so `next/image` optimises it and no
`remotePatterns` entry is needed. The `images.unsplash.com` host this section used to
require has been **removed from `next.config.ts`** along with the stock photo standing
in for this render; nothing else on the site used it.

Intrinsic size is passed rather than `fill`, so the box is reserved from the file's own
`799 × 471` ratio and the captions never jump as the image loads.

It carries **real alt text**, unlike the decorative card art elsewhere: the image
conveys the section's meaning and is not restated by the surrounding copy.

## Dropped in the revamp

The **"Start Your Journey" CTA** and the **"Everything You need" checklist**
(Learn / Build / Practice / Compete / Get Hired) are gone — neither appears in the new
design. `not-another-course-checklist.tsx` was deleted with them; both are recoverable
from git history if the CTA is wanted back.

## Verified

At 1440×900 the composition measures 1376×527 with the collage at 894×527 spanning
17.5–82.5%, the left caption at x 0–28% / y 68–90% and the right at x 72–100% /
y 13–30%. Captions go `static` and stack below the collage at 1024. The accent phrase
stays on one line at 390px (186px of 342px available). No page-level horizontal
overflow at 1440, 1024 or 390.
