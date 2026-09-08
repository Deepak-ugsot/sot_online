# AI Mentor

"Don't just build for yourself. Build with the world." — copy on the left of a dark
band, an android holding a GitHub mark standing at its right.

## Public API

- `AiMentorSection` — the whole section. The only export routes should use.

```tsx
import { AiMentorSection } from "@/features/ai-mentor";
```

## Structure

```text
ai-mentor/
├── components/
│   └── ai-mentor-section.tsx   # Copy column + mentor figure  ("use client")
├── constants/
│   └── ai-mentor.constants.ts  # Copy, CTA, artwork, selector map
├── hooks/
│   └── use-ai-mentor-reveal.ts
├── index.ts                    # Public API
└── README.md
```

## The two-tone band

The section is **two flat colours meeting on a hard line, not a gradient.** A light
strip runs across the top and the rest is near-black; the figure is painted *over* the
seam, so its head sits in the light while its body is in the dark. That layering is the
design — the figure is what makes the two grounds read as one section rather than two
stacked bands.

Three things are load-bearing:

- **Nothing clips vertically.** The section is `overflow-x-clip`, not
  `overflow-hidden`: the glow discs are wider than the section and were producing a
  page-wide horizontal scrollbar, but `hidden` would also force `overflow-y: auto` and
  cut the head off at exactly the seam the design is built around. `clip` on one axis
  leaves the other genuinely `visible`.
- **The band's height is a shared constant.** `AI_MENTOR_BAND_HEIGHT` sets both the
  strip and the spacer above the copy, because the section's height is set by its own
  copy — a percentage band would ask the copy to clear a distance the copy defines.
  `lg:h-28` keeps it inside the reference's 15–20% at both ends of the desktop range
  (17% at 1440, 20% at 1024); the earlier `h-32` came out at 23% on the short one.
- **The figure spans the full section height,** `inset-y-0`, with the image
  bottom-anchored. Anchored to the dark area alone it would stop at the seam.

**Width is what sets how far the head rises.** `object-contain` is width-bound here, so
the render is `boxWidth / 1.083` tall. At 46% it cleared the seam by ~20px and the head
read as sitting *on* the line; at 52–54% the render is taller than the dark area at
every desktop width, which is the only way the head reliably lands in the light.

## The copy column is sized by the heading

`40rem`, and the number comes from one sentence: "Don't just build for yourself."
measures 575px at the heading's 44px cap. At the earlier `36rem` (576px) it wrapped,
which turned the copy's deliberate two-line heading into three. The `2.75rem` cap on
the heading is the other half of that — at `3rem` the same sentence needed 627px and no
sane column width would hold it.

The figure needs 52–54% and the copy 50%, so the two are close to 100% of the section.
They clear each other because the render carries about 4% of transparent margin down
its left edge — verified, the artwork's left edge lands right of the copy's right edge
at 1440.

## Measured

| Viewport | Result                                                                    |
| -------- | ------------------------------------------------------------------------- |
| 1440×900 | Heading 2 lines, band 17%, head 112px into the light, art clears the copy |
| 1024×900 | Heading 2 lines, band 20%, head 49px into the light                       |
| 390×900  | Band 80px, figure drops into flow below the copy, no horizontal overflow  |

## Accessibility

- The figure's `alt` is empty. It is a stylised render of an android holding a GitHub
  mark, not information: the heading beside it says "Build with the world" and the
  description names open source and GSoC outright.
- The chips are a real `<ul>` — seven steps along one path, in order.
- The section is labelled by its `<h2>`.

## A naming note

The feature is still called `ai-mentor` and the section keeps `id="ai-mentor"`, because
that anchor is the section's address on the page. The content is now about open source
and GSoC rather than an AI mentor, so the name no longer describes it — worth renaming
in one pass if any other anchor work comes up.
