# Career

"College Gives You a Degree. We Help You Build a Career." — the first light section,
sitting directly beneath the hero.

Two columns on desktop: an intro (heading, paragraph, CTA) on the left and a
hairline-ruled list of programme highlights on the right. Both reveal on scroll into
view.

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
│   └── career-highlight-list.tsx  # Ruled highlight list    (server)
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

**Column widths are `basis`-sized, not a 50/50 split**, matching the reference's
asymmetric measure and keeping the paragraph at a readable line length. The intro's
basis is `34rem` rather than the reference's `480px` because the fallback face
(Plus Jakarta Sans) sets wider than Neue Montreal — at `480px` the heading spills onto
a third line. With the licensed fonts installed this simply leaves a little slack.

**The heading's line break lives in the copy**, as a `\n` in `careerHeading.lead`
rendered via `whitespace-pre-line`. That keeps the break alongside the text it belongs
to instead of hard-coding a `<br />` in JSX.

**The break waits for `sm`.** It is only an improvement while the first sentence still
fits on one line; on a 375px phone at 28px it does not, so the line wraps anyway and
the forced break then strands "Degree." alone on the second line. Below `sm` the
heading is `whitespace-normal`, the `\n` collapses to a space, and the same words come
out as three even lines.

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
