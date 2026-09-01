# Hero

The landing page's opening section: a pinned, scroll-scrubbed video stage with the
centred headline block and the scroll cue.

Scrolling pins the section and drives the background video's playhead directly —
the video does not play on its own. While it scrubs, the headline, subtext, CTAs and
scroll cue fade out on staggered offsets, then the pin releases.

The header is **not** part of this feature. It is fixed site chrome that stays visible
for the whole page — see `@/features/header`.

## Public API

- `HeroSection` — the whole section. This is the only export routes should use.
- `HeroCta`, `HeroHeadlineCopy` — shared types.

```tsx
import { HeroSection } from "@/features/hero";
```

## Structure

```text
hero/
├── components/
│   ├── hero-section.tsx      # Pin wrapper + stage; composes everything ("use client")
│   ├── hero-background.tsx   # Video backdrop + vignette + grain (server)
│   └── hero-headline.tsx     # The split <h1>
├── constants/
│   └── hero.constants.ts     # Copy + the data-hero selector map
├── hooks/
│   └── use-hero-scroll-animation.ts   # GSAP pin + video scrub + fade-outs
├── types/
│   └── hero.types.ts
├── index.ts                  # Public API
└── README.md
```

## The scroll animation

`useHeroScrollAnimation` builds one GSAP `ScrollTrigger` that pins the stage over a
runway of **2.4× viewport height** (1.6× at ≤1024px) with `scrub: 0.2`.

**Video scrubbing.** `onUpdate` only records a target time; a `requestAnimationFrame`
loop applies at most one seek per frame. Writing `currentTime` straight from the
scroll handler queues seeks faster than the decoder can service them, which is what
makes naive scroll-scrubbed video stutter.

**The 0.85 hold buffer.** All motion is compressed into the first 85% of the pin's
range; the rest is a deliberate no-op hold. `scrub` smooths the animated value so it
*lags* raw scroll, but the pin releases on raw scroll — without the buffer a fast
flick can unpin the hero before the video has caught up. A trailing no-op tween
stretches the timeline's own duration back to a true 1.0, so `scrub` doesn't apply
that same compression twice.

**Fade-out offsets** (as a fraction of the content window), matching the reference:

| Element     | Starts | Duration | Motion              |
| ----------- | ------ | -------- | ------------------- |
| Headline    | 0.02   | 0.30     | fade + `y: -46`     |
| CTAs        | 0.04   | 0.28     | fade + `scale 0.92` |
| Subtext     | 0.05   | 0.32     | fade + `y: -22`     |

The site header is deliberately absent from that list: it is fixed page chrome and
stays put.

**Selectors, not refs.** Animated elements are found by `data-hero="…"` attribute
(mapped in `HERO_SELECTORS`), scoped to the section via `gsap.context`. This keeps
child components from having to forward refs, and means restyling can't silently
break the animation the way a class-name selector would.

## Decisions

**Server where possible.** `HeroBackground`, `HeroHeadline` and `HeroScrollHint` are
Server Components. Only `HeroSection` opts into the client — it owns the ref and runs
the GSAP scroll animation.

**Two-element structure is required by the pin.** The outer `<section>` is the
trigger and must not clip — GSAP inserts a pin spacer inside it to create the scroll
runway. The inner stage is what gets pinned and owns the `overflow-hidden`.

**Copy lives in `constants/`.** No user-facing string is inline in JSX, so copy
changes never touch a component — and there's one file to swap when this moves to a CMS.

**Headline wrapping.** The reference renders the headline across two lines at
desktop. Here it wraps freely with `text-balance` at every breakpoint — it settles
on two lines at desktop widths and reflows on narrow viewports instead of
overflowing.

**Viewport height.** The section uses `100svh` (with `100vh` as fallback) so the hero
doesn't jump when mobile browser chrome collapses on scroll.

**Content centring.** The content column is flex-centred rather than absolutely
positioned, so on short viewports it reflows inside the padded area instead of
sliding under the fixed site header. Its top padding is what clears that header.

## Assets

Referenced through `assets` in `src/config/site.config.ts`, never as a string literal
in JSX:

- `public/assets/Hero_BG_Video.mp4` — background video (~2.6 MB)

## Difference from the reference

The reference scrubs a **30-frame JPEG sequence** drawn to a `<canvas>`. This
implementation scrubs an **MP4** instead, with the same choreography and timings.

Video is the more fragile of the two: smooth scrubbing depends on the file's keyframe
density, because seeking to a non-keyframe forces the decoder to walk forward from the
previous one. `Hero_BG_Video.mp4` currently seeks in 9–36 ms and scrubs cleanly. If a
future re-cut stutters, re-encode with a keyframe on every frame:

```bash
ffmpeg -i Hero_BG_Video.mp4 -c:v libx264 -g 1 -keyint_min 1 -sc_threshold 0 -crf 20 -an Hero_BG_Video_scrub.mp4
```

That trades file size for seek performance. If it is still not smooth enough, fall
back to the reference's approach — export a frame sequence and draw to a canvas.

## Accessibility

- The video is `aria-hidden`, `tabIndex={-1}`, and never plays on its own.
- Under `prefers-reduced-motion` the whole pin/scrub is skipped via
  `gsap.matchMedia` — the hero renders as a static first frame and the page scrolls
  normally.
- The section is labelled by the `<h1>` via `aria-labelledby`.
- Every interactive element has a visible `focus-visible` ring in brand red.

## On a phone

The stage clips, so anything the content column outgrows is simply lost. At 320×700 it
was: 564px of content in 492px of padded space, **72px over**, with the bottom of the
CTAs cut off.

Three things fixed it, and each is a floor rather than a cap:

- **Column padding** steps down (`pt-24 pb-16`, `sm:pt-28 sm:pb-24`). The mobile header
  is 72px rather than 79, and the stage has far less height to give away.
- **The headline's `clamp` floor** drops from `2.125rem` to `1.75rem`. At the old floor
  it stopped scaling below about 450px, so a 320px phone got five lines at 34px.
- **The subtext floor** drops from `1rem` to `0.9375rem`.

Measured after: 320×700 leaves **99px of slack** with the headline at 28px on four
lines; 390×844 leaves 261px. Nothing clips at either.

**The CTAs are full-width when stacked**, capped at `20rem`. Left to size themselves
they came out 189px and 192px — near-identical but not identical, which on a centred
stack reads as a mistake rather than as two buttons. They are 272px each at 320 and
320px each at 390, both 44px tall, which is also a comfortable tap target.

None of this touches the row layout: at 1440 the headline is still 72px over two lines,
the subtext 19px, and the CTAs sit in a row at their natural 189/192px.
