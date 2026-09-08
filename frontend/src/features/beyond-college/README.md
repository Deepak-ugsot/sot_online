# Beyond College

"Already chosen your college? Perfect." — two panels either side of a student, making
one argument: the accelerator sits *alongside* the degree rather than instead of it.
The line under them states it outright.

Sits directly below the hero, and answers the claim the hero makes.

## Public API

- `BeyondCollegeSection` — the whole section. The only export routes should use.
- `BeyondCollegeHeadingCopy`, `BeyondCollegeItem`, `BeyondCollegePanel`,
  `BeyondCollegePanelTone` — types.

```tsx
import { BeyondCollegeSection } from "@/features/beyond-college";
```

## Structure

```text
beyond-college/
├── components/
│   ├── beyond-college-section.tsx  # Header + grid + closing line ("use client")
│   ├── beyond-college-panel.tsx    # One panel (server)
│   └── beyond-college-icon.tsx     # The nine glyphs, mapped onto Lucide
├── constants/
│   └── beyond-college.constants.ts # All copy, both panels, selector map
├── hooks/
│   └── use-beyond-college-reveal.ts
├── types/
│   └── beyond-college.types.ts
├── index.ts
└── README.md
```

## The student is a grid cell, not an overlay

The figure has to sit between the panels on a wide screen and between them again when
they stack. The obvious build — one absolutely positioned image centred on the
container — drifts off the seam the moment one panel's copy wraps and the two stop
being the same height, and it needs a second set of rules for the stacked case.

As the middle track of a `lg:grid-cols-[1fr_auto_1fr]` grid it is always on the seam,
and when the grid collapses to one column it lands between the panels for free. It
replaced a `+` badge that used to hold that slot.

Three things about that cell are load-bearing:

- **`items-end`.** The render is a standing figure cropped at the waist, so it has to
  sit on the row's baseline. Centred, it floats. Measured at 1600: bottom-aligned with
  both panels to 0px.
- **`z-10`.** The negative margin pulls the college panel *over* this cell, and without
  a stacking order the accelerator panel — later in DOM order — painted its own edge
  across the figure.
- **The pull is left-only** (`lg:ml-[-2.5rem] lg:mr-0`). Symmetric margins put "Bigger
  Future.", which is lettered into the render in red, on top of the red panel where it
  cannot be read. Flush on the right, the whole annotation stays on the light ground
  between the two — 32px of overlap on the left, 8px of clearance on the right.

`items-stretch` is what keeps the two panels the same height whichever one's copy
wraps. The section is a comparison, and two columns of visibly different height read
as one being the bigger offer — and it is what gives the figure a full-height box to
stand in.

**The section runs to `96rem`,** wider than the page's `84rem` measure. Two full panels
*and* a figure between them is three columns of content where every other section has
one or two; at `84rem` the figure came out barely two thirds the height of the panels
it stands between, where the reference has it nearly as tall as they are. Measured at
1600: panels 516px wide and 601px tall, figure 480×535 — 89% of the panel height.

## Why the panel titles are `<p>`

"YOUR COLLEGE" and "uGSOT BEYOND" label the columns of a comparison. They are not
sections of the document, and promoting them to `h3` would put them in the page
outline underneath the section's own `h2` as if they were subsections of it.

They are also **set in caps in the string**, not with `text-transform`, because
"uGSOT BEYOND" has to keep its lowercase `u` — `uppercase` would render "UGSOT". Same
reason the hero's CTA labels carry their own casing.

## Tone

Everything that differs between the two panels lives in one `toneStyles` lookup in
`beyond-college-panel.tsx` — surface, title, subtitle, divider, icon treatment, row
hover. Spread through the JSX as ternaries it would be eight separate places to check
when a third panel or a dark mode arrives.

The tones are named `college` / `accelerator` rather than by colour, because they
differ in more than colour — surface, rule, divider, plate fill and hover all change
together.

**Both panels plate their icons.** The plate used to be the accelerator's alone, as the
mark of the active side; with a portrait standing between the two, the unplated glyphs
on the left read as unfinished rather than as quiet. The sides are separated by colour
instead, which is a louder signal than a 52px square.

**The accelerator panel carries a chevron watermark** in its top right at 7% white. It
is drawn larger than the panel and the panel's own rounding crops it back into a corner
mark — texture on the red, not a graphic to be read, so it is `aria-hidden`.

## Motion

**On hover**, each row tints (`black/[0.025]` left, `white/[0.07]` right, 300ms) and
its icon scales to 1.1. Restrained on purpose — these are list rows, not cards, and
ten of them lifting would be noise.

**On scroll**, `useBeyondCollegeReveal`:

| Element      | From                          | Notes                              |
| ------------ | ----------------------------- | ---------------------------------- |
| Header       | `y: 40`                       | at `top 82%`                       |
| Panels       | `x: ∓56` side by side, `y: 40` stacked | they close on the `+`     |
| Student      | `y: 44`                       | `delay: 0.3` — rises after them     |
| Closing line | `y: 28`                       | own trigger at `top 92%`            |

The panels arriving from opposite edges is the section's argument in motion, and the
figure rises last so he reads as the thing they arrived for rather than as a third
panel. `y` rather than a scale pop, because he stands on the row's baseline and scaling
about the centre would lift him off it and drop him back down. `x` is
zeroed when they stack: there is no left and right to arrive from, and a horizontal
slide on a full-width card would make the document briefly wider than the viewport —
a `from` tween holds its start state until its ScrollTrigger fires, so that width
would be real, and reachable, until the reader scrolled here.

Everything fires once and does not reverse — an entrance, not a scroll-linked effect.

## Reduced motion

The reveal registers nothing under `prefers-reduced-motion`, so every element renders
in its final position with no `from` state to sit in. The hover needs no guard: the
global rule in `globals.css` cuts every transition to 0.01ms.

## Accessibility

- **The portrait's `alt` is not empty**, unlike the page's other figures. This render
  has the section's own argument lettered into it — "Same College." on one side,
  "Bigger Future." on the other — so it carries text a screen reader would otherwise
  never reach. The `alt` is that lettering, not a description of the photograph.
- Icons are `aria-hidden` and decorative — every one restates its own row's title.
- The chevron watermark is `aria-hidden`.
- The section is labelled by its `<h2>`; each panel's rows are a real `<ul>`.

## Icons

Nine glyphs in `beyond-college-icon.tsx`, mapped onto **Lucide** (`lucide-react`).

**Lucide rather than hand-drawn paths.** This feature originally carried its own path
map, the way `features/buildspace`'s `DemoIcon` does. That was the wrong call here:
these are generic UI icons with no house style to them, and hand-drawing a mortarboard
or a bar chart from scratch produced shapes that broke down at 26px. Lucide draws them
properly, on one grid, at one optical weight.

**The indirection is still worth keeping.** Call sites name the *role* (`cap`,
`campus`, `chart`) rather than the vendor's component, so swapping a glyph — or the
library — is a change to this one file, and an unknown name stays a type error rather
than a silently missing icon.

`strokeWidth` is 1.75 rather than Lucide's default 2: these sit at 26px inside a 52px
plate and are the only graphic element in either panel, so the default reads a touch
heavy against the panels' text.

| Role       | Lucide          |
| ---------- | --------------- |
| `cap`      | `GraduationCap` |
| `users`    | `Users`         |
| `document` | `FileText`      |
| `campus`   | `Landmark`      |
| `book`     | `BookOpen`      |
| `rocket`   | `Rocket`        |
| `code`     | `CodeXml`       |
| `bulb`     | `Lightbulb`     |
| `chart`    | `ChartColumn`   |

## On a phone

The section is deliberately smaller below `sm`, not just narrower:

- **The student is not rendered at all below `lg`.** He only means anything while he is
  standing *between* the two panels; once they stack he is a tall photograph wedged
  between two cards, and on a phone that is most of the section's height for no
  argument at all.
- **The chevron watermark is hidden below `sm`.** It is sized as a fraction of its
  panel, and on a phone the panel is narrow and tall enough that the same fraction
  stops being a corner mark and becomes a band across the copy.
- **Everything steps down**: panel radius 28→16px, panel padding 36→20px, icon plates
  52→44px, glyphs 26→22px, row padding 16→12px, row titles 15→14px and descriptions
  15→13px, and the section's own padding 96→48px.

Measured at 375: no horizontal overflow, and the section is 1385px tall — where the
figure alone had been adding roughly a third of a screen.

## Measured

| Viewport | Layout       | Notes                                                       |
| -------- | ------------ | ----------------------------------------------------------- |
| 1600     | side by side | panels 516×601, figure 480×535, bottom-aligned to 0px       |
| 375      | stacked      | figure and watermark not rendered, 1385px tall, no overflow |
