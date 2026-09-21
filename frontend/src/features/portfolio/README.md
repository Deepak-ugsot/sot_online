# Portfolio

"Build. Showcase. Get Noticed." — what the two years leave a student holding: a developer
portfolio, pictured as the site itself on a laptop with its parts floating round it.

## Public API

- `PortfolioSection` — the whole section. The only export routes should use.
- `PortfolioArtwork`, `PortfolioHeadingCopy` — shared types.

```tsx
import { PortfolioSection } from "@/features/portfolio";
```

Rendered on the landing page directly below `LearnFromPeopleSection` and above
`EarlyStartSection`, and in isolation at `/dev/portfolio`.

## Structure

```text
portfolio/
├── components/
│   └── portfolio-section.tsx   # Copy + the laptop  ("use client")
├── constants/
│   └── portfolio.constants.ts  # Copy, artwork, selectors
├── hooks/
│   └── use-portfolio-reveal.ts
├── types/
│   └── portfolio.types.ts
├── index.ts                    # Public API
└── README.md
```

The render is `public/assets/portfolio/developer-portfolio.png`, 525×480, a cut-out on
transparency set at its own size.

## Layout

The composition sits *inside* the measure rather than on its edges: the design indents the
copy ~40px from the page's usual left edge (`lg:pl-10`) and starts the laptop at the head
of the right half (`lg:justify-self-start`), so the pair reads as one centred block.
Measured at 1440: the laptop's visible edge lands at x≈760 against the design's 762.

**The laptop's wrapper carries its width, not the image.** Pushed to its track's start, a
grid item shrinks to its content — and a responsive image's intrinsic width is its file's
width divided by the density `srcset` implies. The optimizer serves this 525px file as its
640w candidate, so a shrink-wrapped laptop rendered at ~433px. `w-full` capped at the
file's width on the wrapper sidesteps intrinsic sizing entirely.

The paragraph is 15px on a `27rem` measure, which sets it on the design's three lines.

## The reveal

The copy rises in; the laptop rises on its own trigger (it sits below the copy on a
phone). Fires once. Nothing is registered under reduced motion.
