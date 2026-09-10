# Compete

"Don't just learn to code. Compete." — the pitch and its CTA on the left, four
highlights in two staggered columns to the right.

Sits directly below the Gallery section.

## Public API

- `CompeteSection` — the whole section. The only export routes should use.
- `CompeteColumn`, `CompeteHighlight` — types.

```tsx
import { CompeteSection } from "@/features/compete";
```

## Structure

```text
compete/
├── components/
│   ├── compete-section.tsx    # Heading, CTA, the two columns (client — hook only)
│   └── compete-highlight.tsx  # One icon + title + line (server)
├── constants/
│   └── compete.constants.ts   # Copy, artwork, and the reveal's selectors
├── hooks/
│   └── use-compete-reveal.ts  # Scroll-triggered entrance, GSAP
├── types/
│   └── compete.types.ts
├── index.ts
└── README.md
```

`CompeteSection` is `"use client"` for the reveal hook alone — `CompeteHighlight` stays a
Server Component, since its own hover motion is pure CSS.

## The reveal

The pitch (heading, description, CTA) fades and rises in first; the four highlights
follow on a stagger, `0.15s` behind it. Fires once per page load and does not reverse.

Both tweens share one `scrollTrigger`, off the section itself rather than off the
highlights: the four items live in two separate `<ul>`s with no wrapper of their own —
adding one would break the three-column grid — so the section is the only element that
actually contains all four.

`stagger` walks the highlights in DOM order: preparation's two items, then platforms'
two. That reads as one cascading entrance rather than two columns animating
independently, regardless of the `lg:pt-[15.3rem]` offset between them.

Under `prefers-reduced-motion` nothing is registered, so every element renders in its
final position with no `from` state to sit in.

## The stagger

The two highlight columns are deliberately offset: the platforms column runs from the
top of the section, level with the heading, while the preparation column starts lower,
level with the CTA. That offset is the reference's own composition — it is what stops
the right-hand half reading as a plain 2×2 grid.

`lg:pt-[15.3rem]` is that offset, and **the value is measured against the title, not
the list item.** An item's box starts at its icon, which is taller than the title line,
so aligning the boxes leaves the two texts 21px out. Measured at 1440 the title now
sits 0px from the CTA. It is a fixed value because the left column's height above the
CTA is set by two blocks of editable copy — re-measure if that copy changes length.

## The column widths are set by their longest unbreakable line

`lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1.15fr)]`, and each share has a
reason:

- **First** — "Don't just learn to code." must hold one line, or the copy's own break
  stops meaning anything and the heading runs to three. It measures ~423px at the
  heading's `2.25rem` cap against a ~413px column, which is why the cap is `2.25rem`
  and not larger.
- **Third** — "Platforms & Opportunities" wrapped to two lines at an even split, which
  the reference does not do.

## The rules

A `border-l` on the third column draws the vertical rule, rather than a separate
element — it is then exactly as tall as that column's content and needs no height of
its own.

The horizontal rules are a `border-t` on each item **except the first**, so no line
hangs above a column or below it. That needs two booleans, not one:

- `isFirstInColumn` — the top item of each column.
- `isFirstOverall` — the very first item in the section.

They differ on a phone, and that difference is the point: the columns collapse into one
list there, so the second column's top item needs a rule above it like any other row,
while at `lg` it heads a fresh column and must not. A `first:` variant cannot express
it — the two lists are separate `<ul>`s, so each has its own first child at every width.

## Measured

| Viewport | Result                                                                    |
| -------- | ------------------------------------------------------------------------- |
| 1440     | Heading 2 lines, all 4 titles 1 line, rules `[0,1px,0,1px]`, vertical rule |
| 1440     | First title level with the CTA to 0px, no overflow, 0 asset failures       |
| 390      | One column, no stagger, no vertical rule, rules `[0,1px,1px,1px]`          |
| 390      | Even 28px between every item, no horizontal overflow                      |
