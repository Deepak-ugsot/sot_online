# AI Mentor

"Meet your personal AI Career Mentor." — copy on the left of the dark band, the mentor
figure standing at its bottom-right.

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

No `types/` — the section's data is plain strings and one image descriptor, so there is
nothing worth naming. Add the folder when real shapes appear.

## Its own typefaces

The only section set in **Sora** (eyebrow, heading, description, pills) and **Fraunces
italic** (the "Available 24×7" chip), rather than the site-wide `font-display` /
`font-accent` pairing.

That is the reference's own choice, not drift: this block reads as a product callout
and is deliberately distinct from the marketing sections around it. Both are genuine
Google fonts, so unlike Neue Montreal elsewhere these are the real typefaces rather
than a stand-in.

The theme tokens are named after the typefaces (`font-sora`, `font-fraunces`) rather
than a role, precisely because they are a local departure and not another rung on the
site's type scale.

## Layout

**The figure is absolutely positioned from `lg` up, not a grid column.** It has to run
to the viewport's right edge and sit flush with the band's bottom, and a column inside
the page's `84rem` measure can do neither — it would stop short on both sides. Taking
it out of flow also means the section's height is set by the copy alone, so the artwork
can never push the band taller than the words need.

Below `lg` the figure drops back into normal flow beneath the copy. It is still flush
with the bottom edge, because nothing follows it inside the section.

### Why the two halves cannot collide

The copy is capped at `34rem` inside a centred `84rem` container; the figure is `42%`
of the viewport anchored right, stepping to `46%` at `xl` where that cap stops binding.
The tightest case is 1024 — the narrowest viewport using this layout — where the copy
ends at 568px and the figure's box starts at 594px. Everything wider only opens the gap.

On top of that the image is `object-contain`, so it is scaled to fit inside its box
whichever dimension binds; it cannot spill sideways even if the numbers above are ever
edited into overlap.

## The figure

`public/assets/ai_mentor.png`, 625×694, anchored `object-bottom` so the subject runs off
the section's bottom edge rather than floating in it.

**It is a true cut-out, verified rather than assumed:** the file's corners are
`alpha: 0` and the subject is `alpha: 253`, with content reaching the image's own bottom
and right edges. That is what makes the bottom-right anchoring work — the crop is
already built for it, so there is no rectangle edge to hide.

`alt` is deliberately empty. The render is decorative: the heading beside it already
says "Meet your personal AI Career Mentor" and the description says what the mentor
does, so alt text would only make a screen reader announce the artwork's styling.

This replaced a `YouTubeEmbed` panel that was playing a placeholder video. Nothing else
in the section depended on it.

## The availability chip

"Available 24×7" is a live-status chip — a `animate-ping` dot in brand red behind a
solid one — not a line of text. A pulsing dot is the conventional shorthand for "up
right now", which is exactly what the claim asserts; as flat text beside the eyebrow it
said the same thing far more quietly.

No reduced-motion guard is needed at the call site: `globals.css` cuts every animation
on the page to a single 0.01ms pass under that preference.

## The glow

Two blurred brand-red discs behind the figure, `aria-hidden`. The tight one gives the
glow a core that reads as coming from the figure; the wide one lifts the right side of
the band off flat `#1b1b1f`.

The section is `isolate overflow-hidden` for them: without `isolate` a `-z-10` child
escapes to the root stacking context and paints *behind* the section's own background,
where it is invisible, and `overflow-hidden` clips discs that are deliberately wider
than the band.

## The reveal

Both halves share one `ScrollTrigger` at `top 85%`, `once: true`.

| Target      | Motion                                      | Timing              |
| ----------- | ------------------------------------------- | ------------------- |
| Copy        | fade + `y: 60 → 0`                          | 0.9s `power3.out`   |
| Figure (lg) | fade + `x: 80 → 0`, `scale: 0.96 → 1`       | 1.1s `power3.out`   |
| Figure (sm) | fade + `y: 40 → 0`, `scale: 0.96 → 1`       | 1.1s `power3.out`   |

The copy animates as **one block**, not per-child — it is a flex stack, so tweening the
eyebrow, heading, description, pills and CTA individually would animate the gaps between
them and let them overlap mid-flight.

The figure scales from `transformOrigin: "bottom center"`, not its centre: it stands on
the section's bottom line, and scaling about the centre would lift it off that line and
drop it back down.

The stacked breakpoint rises instead of sliding. See the comment in the hook for why an
`x` from-state is wrong there.
