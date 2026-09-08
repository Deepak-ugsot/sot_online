# Beyond College

"Already chosen your college? Perfect." — two panels side by side, joined by a `+`,
making one argument: the accelerator sits *alongside* the degree rather than instead
of it. The line under them states it outright.

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
│   └── beyond-college-icon.tsx     # The ten glyphs, as a path map
├── constants/
│   └── beyond-college.constants.ts # All copy, both panels, selector map
├── hooks/
│   └── use-beyond-college-reveal.ts
├── types/
│   └── beyond-college.types.ts
├── index.ts
└── README.md
```

## The `+` is a grid cell, not an overlay

It has to sit between the panels on a wide screen and between them again when they
stack. The obvious build — one absolutely positioned badge centred on the container —
drifts off the seam the moment one panel's copy wraps and the two stop being the same
height, and it needs a second set of rules for the stacked case.

As the middle track of a `lg:grid-cols-[1fr_auto_1fr]` grid it is always on the seam,
and when the grid collapses to one column it lands between the panels for free.
Measured at 1400: both panels 538px tall, the badge centred on the seam to **0px** on
both axes.

`items-stretch` is what keeps the two panels the same height whichever one's copy
wraps. The section is a comparison, and two columns of visibly different height read
as one being the bigger offer.

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
differ in more than colour: the accelerator's icons sit on their own translucent
plates and the college's sit directly on the surface, which is what marks the
accelerator as the active side.

## Motion

**On hover**, each row tints (`black/[0.025]` left, `white/[0.07]` right, 300ms) and
its icon scales to 1.1. Restrained on purpose — these are list rows, not cards, and
ten of them lifting would be noise.

**On scroll**, `useBeyondCollegeReveal`:

| Element      | From                          | Notes                              |
| ------------ | ----------------------------- | ---------------------------------- |
| Header       | `y: 40`                       | at `top 82%`                       |
| Panels       | `x: ∓56` side by side, `y: 40` stacked | they close on the `+`     |
| `+` badge    | `scale: 0.4`, `back.out(2)`   | `delay: 0.35` — lands after them    |
| Closing line | `y: 28`                       | own trigger at `top 92%`            |

The panels arriving from opposite edges is the section's argument in motion. `x` is
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

- The `+` is `aria-hidden`. It is a visual join between two lists a screen reader
  already reads in order; announcing it would add a stray symbol and say nothing the
  copy does not.
- Icons are `aria-hidden` and decorative — every one restates its own row's title.
- The section is labelled by its `<h2>`; each panel's rows are a real `<ul>`.

## Icons

Ten glyphs in `beyond-college-icon.tsx`, as a path map behind one component — the same
shape as `features/buildspace`'s `DemoIcon`, kept local because that one is the product
mock's set and these two lists have no reason to move together. All stroked on
`currentColor` at a fixed 1.6 weight, so the dark glyphs on the left and the white ones
on the right are the same drawings and only the caller's `text-*` differs.

## Measured

| Viewport | Layout            | Notes                                        |
| -------- | ----------------- | -------------------------------------------- |
| 1400     | side by side      | panels 538px each, badge on seam at 0px/0px  |
| 820      | stacked           | badge between the two, no overflow           |
| 390      | stacked           | panels 342px, no row or page overflow        |
