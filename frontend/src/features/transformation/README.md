# Transformation

"Two years. One serious transformation." — the seven steps of the programme as a
horizontal accordion: one panel open with its copy and illustration, the rest collapsed
to a number and a title.

Sits directly below the Gallery ("Your 2-Year Engineering Journey") section.

## Public API

- `TransformationSection` — the whole section. The only export routes should use.
- `TransformationStep`, `TransformationHeadingCopy` — types.

```tsx
import { TransformationSection } from "@/features/transformation";
```

## Structure

```text
transformation/
├── components/
│   ├── transformation-section.tsx  # Heading + row + closing line ("use client")
│   └── transformation-step.tsx     # One panel (server)
├── constants/
│   └── transformation.constants.ts # Copy, tints, artwork
├── types/
│   └── transformation.types.ts
├── index.ts
└── README.md
```

## The accordion

Modelled on the "Our Expertise" row at upgrad-enterprise.com, measured there: one panel
at 337px against five at 176px, all 400px tall, easing on
`cubic-bezier(0.215, 0.61, 0.355, 1)` over 0.5s. This row uses the same curve and
duration.

**A panel opens on hover, on focus and on click — all three.** Hover is the interaction
the row is designed around, but hover alone strands both the keyboard and the
touchscreen; focus covers the first and click the second, and none of them conflict
because all three do the same single thing.

**The open panel is React state, not CSS.** A pure-CSS version (`:hover` widening a flex
child) cannot keep a panel open once the pointer leaves, so the row would collapse to
nothing whenever the mouse was elsewhere. The reference always has exactly one panel
open, and so does this.

**`flex-grow` animates, not `width`.** The seven panels share one row, so an explicit
width on the open one leaves the other six to be recomputed by hand; growing one flex
child and letting the rest settle keeps the row exactly full at every frame, at any
container width.

**`basis-0` is what makes the six closed panels equal.** Left at `auto`, `flex-grow`
shares out only the *leftover* space on top of each panel's own content width — so
"Break Through" came out 191px against "Build" at 104px. From a zero basis the whole row
is leftover space and the ratio is the only thing deciding a width. Measured at 1440:
350px open, 146px each closed.

**The whole panel is the button.** A small toggle inside a 350px panel would leave most
of the target inert. That is also why the number and title are `<span>`s rather than a
heading — a `<button>` may only contain phrasing content, so an `<h3>` or `<p>` in there
would be invalid markup.

## Below `lg`

No accordion — a collapsed column on a phone is about 40px wide and would show a number
and nothing else. The row becomes a **horizontal scroll rail** instead: every panel open
with its copy and illustration, swiped through one at a time. That keeps the same
reading order as the desktop row rather than turning it into a different shape.

`-mx-6 px-6` cancels the container's gutter for the scroller alone, so a card can sit
flush against the viewport edge as it scrolls out; inside the gutter the rail would stop
24px short on both sides and the last card could never reach the edge. `no-scrollbar`
hides the bar — the next card peeking in from the right already says the rail scrolls.

The rail needs no `tabIndex` of its own: every panel is a `<button>`, so tabbing through
them scrolls the rail natively, and a container tab stop would add a step that does
nothing.

**The body is always rendered and only hidden at `lg`** (`lg:hidden` when closed)
rather than unmounted when the panel is shut. Unmounting is the obvious build and it is
wrong here: it is viewport-independent, so exactly one card in the rail would have shown
its copy and the other six would have been empty coloured boxes. `display: none` also
takes the hidden copy out of the accessibility tree, which is what unmounting was for.

## Assets

`public/assets/transformation/` — seven illustrations, one per step.

**The filenames' capitalisation is load-bearing** — they are passed through verbatim,
and macOS resolves `learn.png` just fine where the Linux deploy target does not.
`Break Through.png` also contains a **space**; `next/image` encodes it and it was
verified serving, but it is the one name worth renaming if these files are ever
reorganised.

## Measured

| Viewport | Result                                                                 |
| -------- | ---------------------------------------------------------------------- |
| 1440     | 7 panels, 350px open / 146px each closed, equal heights, no overflow   |
| 1440     | Opening panel 4 and panel 7 swaps the open state and loads its artwork |
| 390      | Snap rail: 274px cards, 2035px of scroll in a 390px viewport, all 7 open |
| 390      | Equal card heights (362px), no page-level horizontal overflow          |
