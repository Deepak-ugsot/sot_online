# Career

"The internet has everything. So why are students still confused?" — a light section
in the upper half of the page.

Two columns on desktop: an intro (heading, paragraph, CTA) on the left and a
hairline-ruled list on the right. The list is the heading's evidence — five questions
in the student's own voice, not a list of features — so the two columns are one
argument rather than a pitch beside a feature list. Both reveal on scroll into view.

## Public API

- `CareerSection` — the whole section. The only export routes should use.
- `CareerHeadingCopy`, `CareerHighlight` — shared types.

```tsx
import { CareerSection } from "@/features/career";
```

## Structure

```text
career/
├── components/
│   ├── career-section.tsx         # Section shell + layout  ("use client")
│   ├── career-intro.tsx           # Heading, paragraph, CTA (server)
│   └── career-highlight-list.tsx  # Ruled question list     (server)
├── constants/
│   └── career.constants.ts        # Copy + the data-career selector map
├── hooks/
│   └── use-career-reveal.ts       # GSAP scroll-into-view reveal
├── types/
│   └── career.types.ts
├── index.ts                       # Public API
└── README.md
```

## The reveal

Two `ScrollTrigger`s, both `once: true` — this is an entrance, not a scroll-linked
effect, so it does not reverse on the way back up.

| Target      | Trigger      | Start     | Motion                          | Timing                     |
| ----------- | ------------ | --------- | ------------------------------- | -------------------------- |
| Intro block | the section  | `top 90%` | fade + `y: 60 → 0`              | 0.9s `power3.out`          |
| List rows   | the list     | `top 90%` | fade + `x: -60 → 0`             | 0.7s `power3.out`, 0.12 stagger |

**The intro animates as one element, not per-child.** It is a flex column, so
tweening the heading, paragraph and CTA individually would animate the gaps between
them and let them overlap mid-flight.

**The list is triggered off itself, not the section.** On tall viewports the section
top can clear the trigger line while the list is still below the fold, which would
play the cascade before anyone can see it.

**Reduced motion registers nothing at all** — no tweens are created, so the markup
renders in its natural final state. There is no separate "static" branch to keep in
sync.

## Layout notes

**The section runs to `88rem`** — a step above `7xl`, and wider than the page's own
`84rem` measure that every other block holds to. This block is two columns pushed to
opposite edges rather than a centred body of text, so it needs more room between them
than a centred one does.

**Column widths are `basis`-sized, not a 50/50 split.** The intro is `38rem` (608px),
sized against the 594px that "why are students still confused?" measures at the
heading's 40px cap — the copy's own break puts that whole phrase on the second line, and
a narrower column breaks it again mid-phrase and runs the heading to three lines. The
list is `35rem` (560px), against the 550px the longest question ("Which competitions,
projects & internships should I pursue?") needs including its arrow. Both leave a little
slack, and the fallback face (Plus Jakarta Sans) sets wider than Neue Montreal, so the
licensed font only ever needs less.

**The gutter and trough are sized against 1280, not 1920.** The container stops growing
at `88rem`, so the columns are at their tightest at 1280 — where `lg:px-10` and
`lg:gap-8` leave exactly the 1168px the two bases ask for and nothing shrinks. Widening
either by one step puts the heading back onto three lines *there* while changing nothing
at 1920: past 1408 the surplus falls into the trough anyway, because `justify-between`
hands it to the gap rather than to the columns.

| Viewport | Content span | Columns   | Trough | Heading | Questions   |
| -------- | ------------ | --------- | ------ | ------- | ----------- |
| 1920     | 1328px       | 608 / 560 | 160px  | 2 lines | all 1 line  |
| 1280     | 1200px       | 608 / 560 | 32px   | 2 lines | all 1 line  |
| 1024     | 928px        | 475 / 437 | 32px   | 3 lines | one wraps   |

1024 is the floor, and it degrades rather than breaking: there is genuinely not room for
both columns at their natural widths there, so the heading takes a third line and the
longest question wraps — which is the case the arrow alignment below is built for. No
horizontal overflow at any width.

**The heading's line break lives in the copy**, as a `\n` in `careerHeading.lead`
rendered via `whitespace-pre-line`. That keeps the break alongside the text it belongs
to instead of hard-coding a `<br />` in JSX.

**The break waits for `sm`.** It is only an improvement while the first sentence still
fits on one line; on a 390px phone at 28px it does not, so the line wraps anyway and
the forced break then strands "why are" alone on a line. Below `sm` the heading is
`whitespace-normal`, the `\n` collapses to a space, and the same words come out as
three even lines. Verified at 390: no horizontal overflow, and the two questions that
wrap keep their arrows on the first line.

**Rules** come from a `border-t` on the list plus a `border-b` on each row, so the
first and last rules sit flush with the list edges without doubling up.

**The two columns close on the same line.** The container is `lg:items-stretch` so the
intro grows to the list's height, and the intro is `lg:justify-between` so its CTA
lands level with the list's last row. Its copy and CTA are separate flex children for
that reason — as three siblings the spare space would be dealt out between the heading
and the paragraph as well. Where the intro is the taller of the two (around `lg`
itself, where both columns are squeezed) there is no slack to distribute and the CTA
simply sits a few pixels below the last rule.

**The keyline** above the heading is decorative (`aria-hidden`), and picks up the red
of the list's arrows on this side of the section.

**The section is `overflow-x-clip`.** The rows cascade in from 60px left of where they
settle, which inside a `px-6` phone gutter is 36px outside the viewport: the first
frames play off screen and every row appears already half-travelled. Clipping to the
section keeps the cascade where it can be seen. Leftward overflow does not scroll the
page in LTR, so this is about the entrance reading correctly rather than about a stray
scrollbar. `clip` rather than `hidden`: `overflow-x: hidden` forces `overflow-y` to
`auto`, turning the section into a scroll container, and this page pins sections above
and below it.

**A row's arrow is aligned to its first line, not to the row.** At 320px the two
longest labels wrap, and a centred marker then sits in the gap between the two lines
pointing at nothing. `items-start` plus a 4px nudge puts it level with the first line's
optical centre — the same place `items-center` put it on the single-line rows every
wider screen gets.

## Shared components used

- `CtaButton` — `variant="inverse"` `size="lg"` (solid dark pill for light
  backgrounds), added to the shared component for this section.
- `ArrowIcon` — `direction="right"` for the list markers, added alongside the existing
  diagonal CTA arrow.

Both are inline SVG rather than the reference's "↗" / "→" text glyphs, so they render
identically regardless of which font loads.
