# Hero

The landing page's opening section: a pinned, scroll-scrubbed video stage with the
centred headline block and the scroll cue.

The copy block is five elements top to bottom: eyebrow, headline, subtext, footnote,
CTA row. The footnote sits *above* the buttons so it answers the "do I have to leave
my degree?" objection before the reader reaches them.

Scrolling pins the section and drives the background video's playhead directly —
the video does not play on its own. While it scrubs, all five fade out on staggered
offsets, then the pin releases.

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
runway of **2.4× viewport height** (0.6× at ≤1024px) with `scrub: 0.2`.

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

**Fade-out offsets** (as a fraction of the content window). The block leaves roughly
top-down: the eyebrow goes first and the CTA row last, so it dissolves in reading
order rather than all at once.

| Element  | Starts | Duration | Motion              |
| -------- | ------ | -------- | ------------------- |
| Eyebrow  | 0.00   | 0.28     | fade + `y: -52`     |
| Headline | 0.02   | 0.30     | fade + `y: -46`     |
| Footnote | 0.04   | 0.30     | fade + `y: -14`     |
| Subtext  | 0.05   | 0.32     | fade + `y: -22`     |
| CTAs     | 0.07   | 0.28     | fade + `scale 0.92` |

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

**Headline wrapping — the break is placed, not left to chance.** The headline is two
sentences, and each is its own block, so the line break always lands on the full stop
between them. Left to wrap on its own the first sentence broke as "Your college gives
you a / degree.", which reads as a typesetting accident. Within each block the text
still wraps freely with `text-balance`, so narrow viewports reflow onto more lines
rather than overflowing.

**The content column is `84rem`,** matching the career, mentors and AI-mentor sections
so the page keeps one measure down its length. The headline is also the only thing that
uses the full width: at `76rem` the second sentence was 94px too wide to hold one line
at 72px. The eyebrow (`34rem`), subtext (`47rem`) and footnote (`42rem`) set their own
narrower caps.

**The headline's `clamp` slope is `5vw`, not `7.5vw`,** and that is what keeps the
second sentence on one line as the viewport narrows. At `7.5vw` the headline reached
its 72px cap by 1280 while the column was only 1216 wide: the sentence wrapped, the
block grew to three lines, and at 1280×720 it overflowed its padded area and left the
eyebrow 13px under the site header.

Measured across the range — two lines everywhere from 768 up, and the slack is the
stage's, so a positive number means nothing clips:

| Viewport | Headline | Lines | Slack |
| -------- | -------- | ----- | ----- |
| 1440×900 | 72px     | 2     | 176px |
| 1280×720 | 64px     | 2     | 46px  |
| 1024×768 | 51px     | 2     | 175px |
| 768×1024 | 38px     | 2     | 485px |
| 390×844  | 26px     | 4     | 247px |
| 320×700  | 26px     | 4     | 66px  |

At 1440 the two lines set 1080px and 1310px against the 1344px column.

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

The stage clips, so anything the content column outgrows is simply lost — and 320×700
is the width everything here is tuned against. The current copy is longer than what it
replaced and added two elements to the block, which put it **68px over** on first
render.

Every value below is a floor rather than a preference:

- **Column padding** steps down (`pt-20 pb-10`, `sm:pt-28 sm:pb-24`). The mobile header
  is 72px, so `pt-20` still clears it by 8px.
- **The headline's `clamp` floor** is `1.625rem`. It stopped scaling below about 450px
  at the original `2.125rem`; the copy is two sentences now rather than one, so it
  needs the extra room. The floor binds below roughly 520px, so both phone widths set
  at 26px.
- **The subtext floor** is `0.875rem`, and it sets `leading-normal` below `sm` — six
  lines of `leading-relaxed` is the tallest single thing in the block on a phone.
- **Gaps tighten below `sm`**: `mb-3` under the eyebrow, `mt-3.5` above the subtext,
  `mt-3` above the footnote, `mt-5` above the CTA row.

Measured after, with the block at 514px: 320×700 leaves **66px of slack**, clearing the
header by 41px and the stage's bottom edge by 73px. 390×844 leaves 247px. Nothing clips
at either.

**A caveat on every width in this file.** `Neue Montreal` is licensed and not in the
repo (see `lib/fonts.ts`), so these were measured against its stand-in, Plus Jakarta
Sans. Drop the real `.otf` files into `public/assets/fonts/` and re-check the 1440
headline and the 320 slack — the metrics are close but not identical.

**The CTAs are full-width when stacked**, capped at `20rem`. Left to size themselves
they came out 189px and 192px — near-identical but not identical, which on a centred
stack reads as a mistake rather than as two buttons. They are 272px each at 320 and
320px each at 390, both 44px tall, which is also a comfortable tap target.

None of this touches the row layout: at 1440 the headline is still 72px over two lines,
the subtext 19px, and the CTAs sit in a row at their natural 189/192px.
