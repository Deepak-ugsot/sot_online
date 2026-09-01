# FAQ

"Got Questions? We've Got Answers" — intro column and promo card on the left, an
exclusive accordion on the right.

## Public API

- `FaqSection` — the whole section. The only export routes should use.
- `FaqEntry` — shared type.

```tsx
import { FaqSection } from "@/features/faq";
```

## Structure

```text
faq/
├── components/
│   ├── faq-section.tsx   # Layout + accordion state  ("use client")
│   ├── faq-item.tsx      # One row (server)
│   └── faq-promo.tsx     # "Start Your Journey" card (server)
├── constants/
│   └── faq.constants.ts  # Copy, entries, selector map
├── hooks/
│   └── use-faq-reveal.ts
├── types/
│   └── faq.types.ts
├── index.ts              # Public API
└── README.md
```

## The accordion

**Exclusive** — opening one row closes the others, and clicking an open row closes it.
That state lives in `FaqSection` rather than in each row, because "only one at a time"
is a property of the set, not of any individual row. The first row starts open,
matching the design.

### The answer opens with `grid-template-rows`, not `max-height`

The reference animates to a fixed `max-height: 160px`. That is a guess about how tall
the tallest answer will ever be — longer copy, a narrower column or a wider typeface
silently clips it, with no error to notice.

Here the row is a grid transitioning `0fr → 1fr`, which resolves to the content's
**actual** height. Measured: the longest answer opens to `94.25px`, derived rather
than assumed, and it cannot crop. The `overflow-hidden` sits on the *child* of the
grid, not the grid itself — the track cannot collapse otherwise.

### Accessibility

The reference toggles a class and leaves the markup inert. Here each row is a real
`<button>` inside an `<h3>`, carrying `aria-expanded` and `aria-controls`, pointing at
an answer that is a labelled `region`. Verified in-browser: every `aria-controls`
resolves to its answer, every region resolves back to its question, and exactly one
row reports `aria-expanded="true"` at a time.

The `+` becomes an `×` by rotating 45°, so one glyph covers both states and the change
is animatable.

## The promo card

The reference layers a background photo under a `white → pink` gradient — but that
gradient runs 50%–70% opacity across the whole card and leaves the image essentially
invisible. Rendering the gradient over a white ground reproduces the design exactly
and drops a request that buys nothing.

## The reveal

| Target       | Trigger     | Motion              | Timing                         |
| ------------ | ----------- | ------------------- | ------------------------------ |
| Intro column | the section | fade + `y: 60 → 0`  | 0.9s `power3.out`              |
| Accordion rows | the list  | fade + `x: -50 → 0` | 0.6s `power3.out`, 0.1 stagger |

Only `opacity` and `x` are animated, deliberately: the accordion animates its own
`grid-template-rows`, and touching a row's height here would collide with that.

The intro animates as one block — it is a flex column with a large gap, so tweening
the copy and promo card separately would animate the space between them.

## Responsive

Splits to a stacked layout below **1000px** — the design's own switch point, written
as an arbitrary variant because no Tailwind breakpoint lands near it.

Both heading lines are `nowrap`: the design sets them as two deliberate lines and
letting either wrap would turn the heading into three.

## Verified

At 1440×900 the section measures **799px** against the reference's 823px, with an
inner width of exactly **1360px** matching the reference and all eight rows present.
No page-level horizontal overflow.
