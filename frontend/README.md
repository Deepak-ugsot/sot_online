# upGrad School of Technology — Frontend

Marketing site for the upGrad School of Technology 2-Year Career Acceleration
Program, built with **Next.js 16** (App Router), **React 19**, **TypeScript**,
**Tailwind CSS v4**, and **GSAP + ScrollTrigger** for scroll-driven motion.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The app runs at <http://localhost:3000>.

| Script          | Purpose                                |
| --------------- | -------------------------------------- |
| `npm run dev`   | Dev server (Turbopack)                 |
| `npm run build` | Production build                       |
| `npm run start` | Serve the production build             |
| `npm run lint`  | ESLint                                 |

---

## Folder structure

```text
frontend/
├── public/                        # Served verbatim at the site root
│   ├── assets/
│   │   ├── fonts/                 # Licensed .otf files — not in this repo (see "Fonts")
│   │   ├── Hero_BG_Video.mp4      # Hero background video
│   │   └── uGSOT_white_logo.png   # Brand mark
│   ├── companyLogo/               # 29 partner logos, all 177px tall (mentors marquee)
│   └── ugsot_logo.svg             # Favicon
│
├── src/
│   ├── app/                       # App Router — routing and page composition only
│   │   ├── globals.css            # Tailwind entry, design tokens, base layer
│   │   ├── layout.tsx             # Root layout: fonts, metadata, <html>/<body>
│   │   └── page.tsx               # Landing page — composes feature sections
│   │
│   ├── components/                # Shared, feature-agnostic UI
│   │   └── ui/
│   │       ├── arrow-icon.tsx     # Inline SVG arrow (diagonal / right)
│   │       ├── check-icon.tsx     # Inline SVG filled checkmark
│   │       ├── cta-button.tsx     # Call-to-action anchor (variants + sizes)
│   │       └── youtube-embed.tsx  # Click-to-load video facade
│   │
│   ├── config/
│   │   └── site.config.ts         # Brand metadata, nav links, asset paths
│   │
│   ├── features/                  # One folder per business capability
│   │   ├── README.md              # Feature conventions — read before adding one
│   │   ├── hero/                  # Landing page hero section
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP pin + video scrub
│   │   │   ├── types/
│   │   │   ├── index.ts           # Public API
│   │   │   └── README.md
│   │   ├── career/                # "College Gives You a Degree." section
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP scroll-into-view reveal
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── approach/              # "Our Approach" stacked word reveal
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP pin + per-word reveal
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── gallery/               # "Your 2-Year Engineering Journey" carousel
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP pin + horizontal track
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── showcase/              # "Build Projects That Matter" card fan
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # Staggered reveal + 3D hover tilt
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── mentors/               # "Learn From The Best" logo marquee
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP entrance (marquee itself is CSS)
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── not-another-course/    # "A Career Operating System." copy + media
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP scroll-into-view reveal
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── ai-mentor/             # "Meet your personal AI Career Mentor." + video
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── career-os/             # "Introducing Career OS" six-tile grid
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP staggered tile reveal
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── readiness/             # "Career Readiness Score" bento grid
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP heading + card reveal
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── dashboard/             # "Your Career Dashboard" checklist + screenshot
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP three-beat reveal
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── opportunities/         # "Exclusive Opportunities" 3D cylinder carousel
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP pin + arc rotation
│   │   │   ├── types/
│   │   │   ├── utils/             # The cylinder geometry (pure maths)
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── journey/               # "Career OS adapts to your Journey" pill arc
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP reveal, then a continuous drift
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── faq/                   # "Got Questions?" exclusive accordion
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── hooks/             # GSAP scroll-into-view reveal
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   └── footer/                # Site footer card, watermark, rotating tagline
│   │       ├── components/
│   │       ├── constants/
│   │       ├── hooks/             # GSAP five-beat unveiling
│   │       ├── types/
│   │       ├── index.ts
│   │       └── README.md
│   │
│   └── lib/                       # Framework-agnostic helpers
│       ├── fonts.ts               # next/font declarations
│       ├── gsap.ts                # GSAP + ScrollTrigger plugin registration
│       ├── placeholder-image.ts   # TEMPORARY seeded placeholder photography
│       └── utils.ts               # cn() class-name helper
│
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

### What goes where

| Folder            | Holds                                                            | Rule of thumb                                                       |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| `app/`            | Routes, layouts, metadata                                        | Stays thin. Composes features; contains no business logic.           |
| `components/ui/`  | Presentational primitives reused across features                 | If only one feature uses it, it belongs in that feature instead.     |
| `config/`         | Values referenced by more than one feature                       | Brand, navigation, asset paths.                                      |
| `features/`       | Self-contained slices — UI, state, hooks, types, constants       | One folder per capability. See `src/features/README.md`.             |
| `lib/`            | Pure helpers with no React or app-domain knowledge               | Must not import from `features/`.                                    |
| `public/`         | Static files served as-is                                        | Referenced via `assets` in `site.config.ts`, never as raw strings.   |

### Dependency rules

- `app/` may import from `features/`, `components/`, `config/`, `lib/`.
- `features/` may import from `components/`, `config/`, `lib/`.
- A feature **must not** reach into another feature's internals — import only from
  that feature's `index.ts`.
- `lib/` and `components/` **must not** import from `features/`.

### Naming conventions

| Thing                       | Convention   | Example                |
| --------------------------- | ------------ | ---------------------- |
| Folders and files           | `kebab-case` | `hero-section.tsx`     |
| React components and types  | `PascalCase` | `HeroSection`          |
| Functions, variables, props | `camelCase`  | `heroSubtext`          |
| Hooks                       | `use` prefix | `useReducedMotion`     |
| Typed suffixes              | descriptive  | `.types.ts`, `.constants.ts`, `.config.ts` |

`index.ts` is used **only** as a feature's public API — not as a barrel at every level.

---

## Styling

Tailwind CSS v4, configured **in CSS** (`src/app/globals.css`) rather than a
`tailwind.config.js`. Tokens declared in `@theme` become utilities automatically:

| Token                | Value                             | Utility                       |
| -------------------- | --------------------------------- | ----------------------------- |
| `--color-canvas`     | `#0a0708` — dark sections         | `bg-canvas`                   |
| `--color-brand`      | `#e6161f`                         | `text-brand`, `bg-brand`      |
| `--color-ink`        | `#0a0a0b` — text on light         | `text-ink`, `bg-ink`          |
| `--color-ink-muted`  | `#444444` — body copy on light    | `text-ink-muted`              |
| `--color-surface`    | `#f3f4f6` — light section bg      | `bg-surface`                  |
| `--color-hairline`   | `#ececec` — dividers on light     | `border-hairline`             |
| `--color-rule`       | `rgba(30,32,34,.2)` — row rules   | `border-t-rule`               |
| `--color-rule-soft`  | `rgba(30,32,34,.12)` — col rules  | `border-r-rule-soft`          |
| `--font-display`     | Neue Montreal → Plus Jakarta Sans | `font-display`                |
| `--font-accent`      | Ivy Ora Display → Playfair Display | `font-accent`                |
| `--font-sora`        | Sora — AI Mentor section only     | `font-sora`                   |
| `--font-fraunces`    | Fraunces italic — AI Mentor only  | `font-fraunces`               |
| `--ease-cinematic`   | `cubic-bezier(0.22, 1, 0.36, 1)`  | `ease-cinematic`              |

`font-sora` / `font-fraunces` are named after the typefaces rather than a role because
they are a deliberate local departure in one section, not another rung on the site's
type scale.

### Headings

Every section heading carries `type-heading` (defined in `globals.css`), which is the
design file's typography node expressed once:

| Property         | Value                                      |
| ---------------- | ------------------------------------------ |
| `font-family`    | `var(--font-display)` — Neue Montreal      |
| `font-weight`    | `500`                                      |
| `line-height`    | `1.3312` (133.12%)                         |
| `letter-spacing` | `-0.0104em` (`-0.416px` on the 40px spec)  |

**Size and colour are deliberately not part of it.** The spec is written at 40px, but
the page needs its hierarchy — the hero reaches 72px, the FAQ 68px, the section titles
40–56px — so each heading keeps its own `clamp()`. Colour is per-section for the same
reason: `text-ink` (`#0a0a0b`) on light sections, `text-white` on dark ones.

Three places deliberately opt out and are **not** headings in this scale: the AI Mentor
section (its own Sora/Fraunces pairing), the Approach word stack (a 148px display
treatment at `leading-[0.98]`), and the footer's rotating tagline (the highlight box
hugs its word).

The serif spans inside a heading carry `font-accent`, which resets `letter-spacing` to
`normal` in the base layer. That is a knowing deviation from the spec, which tracks both
the heading and the accent at `-0.416px`: that value is tuned for Neue Montreal, and
`letter-spacing` inherits, so without the reset the serif picks up spacing meant for a
different typeface and its letters read as touching.

It used to be a positive `0.035em` instead, propping up an over-tight stand-in — see
**Fonts** below for why that stand-in changed and why `normal` is now the right answer.

## Fonts

The design uses two **licensed** typefaces that are not in this repo:

| Family            | Expected file                                      |
| ----------------- | -------------------------------------------------- |
| Neue Montreal     | `public/assets/fonts/NeueMontreal-Regular.otf`      |
|                   | `public/assets/fonts/NeueMontreal-Medium.otf`       |
|                   | `public/assets/fonts/NeueMontreal-Bold.otf`         |
| Ivy Ora Display   | `public/assets/fonts/Ivy-Ora-Display-Medium.otf`    |

They are declared as `@font-face` in `globals.css`, with **Plus Jakarta Sans** and
**Playfair Display** (self-hosted via `next/font/google`) next in the fallback stack.

Playfair replaced **Instrument Serif** as the accent stand-in because Instrument Serif
is a *condensed* display face: at 72px it set "Software Engineer" at **446px**, where
the same string is 588px in Georgia and 631px in the body sans it sits beside — so the
accent read as squeezed against the rest of its own line. Tracking cannot fix that; it
moves narrow glyphs apart rather than making them wide, which is why the old base rule
had to add `0.035em` and still looked tight. Playfair measures **597px**, and it ships a
real 400–900 range, so the 500 the call sites ask for is an actual weight instead of a
synthetic bold — which also retired a `-webkit-text-stroke` hack that existed only to
thicken a single-weight face.

Drop the licensed files in at those exact paths and they take over automatically —
no code change. Until then the `@font-face` URLs 404 and the browser falls through to
the Google fallbacks, so the site renders correctly either way.

## Responsive breakpoints

Tailwind defaults, mobile-first:

| Prefix | Min width | Used for                                                                    |
| ------ | --------- | --------------------------------------------------------------------------- |
| —      | 0         | Base: stacked CTAs, hamburger menu, fluid headline, swipeable gallery track  |
| `sm`   | 640px     | CTAs go side-by-side; header CTA appears                                     |
| `lg`   | 1024px    | Desktop nav; two-column career; gallery switches to the pinned carousel      |
| `xl`   | 1280px    | Hero headline locks to a single line; showcase cards scale up                |

A few sections use arbitrary variants (`min-[560px]:`, `min-[900px]:`,
`min-[1100px]:`) instead. Those switch points come from the content — where a
fixed-width column stops fitting, or where the reference reflows its grid — and no
Tailwind breakpoint lands near enough to substitute.

`lg` is also mirrored in JS as `GALLERY_PIN_BREAKPOINT` — the gallery's `matchMedia`
query must agree with its Tailwind variant or the two behaviours overlap.

Headline and subtext sizes use `clamp()` so they scale continuously between
breakpoints rather than stepping.

## Scroll animation

GSAP + ScrollTrigger, registered once in [`src/lib/gsap.ts`](src/lib/gsap.ts) and
consumed through a hook inside each feature. Two kinds are in use:

- **Scroll-linked** — the section pins and motion is scrubbed by scroll position.
  Used by [hero](src/features/hero/README.md) (video playhead),
  [approach](src/features/approach/README.md) (one word per scroll step),
  [gallery](src/features/gallery/README.md) (horizontal card track) and
  [opportunities](src/features/opportunities/README.md) (a 3D cylinder).
- **Scroll-into-view** — a one-shot entrance that plays once and does not reverse.
  Used by [career](src/features/career/README.md),
  [showcase](src/features/showcase/README.md),
  [mentors](src/features/mentors/README.md) and
  [not-another-course](src/features/not-another-course/README.md).
- **Pointer-driven** — the showcase cards' 3D hover tilt, gated behind
  `(hover: hover)` so it never runs on touch.
- **Continuous CSS** — the [mentors](src/features/mentors/README.md) logo marquee,
  which loops from page load independently of scroll. Its GSAP entrance animates a
  *wrapper* rather than the tracks, so the two never fight over `transform`.

Pinned sections share a **0.85 hold buffer**: all motion is compressed into the first
85% of the pin's scroll range, with a trailing no-op tween stretching the timeline's
duration back to a true 1.0. `scrub` lags raw scroll while the pin releases on raw
scroll, so without the buffer a fast flick can unpin a section mid-animation.

Both scope their selectors with `gsap.context` and target elements by `data-*`
attribute rather than class name, so restyling can't silently break an animation.
Both skip entirely under `prefers-reduced-motion` via `gsap.matchMedia`.

One global CSS rule exists specifically for this and should not be "tidied away":

```css
html { overflow-x: clip; }   /* NOT overflow-x: hidden, and NOT on body */
```

`overflow-x: hidden` makes an element a scroll container, forcing its `overflow-y` to
`auto`. On `body` that nests a second scroller inside the viewport's and ScrollTrigger
measures against the wrong one. `clip` suppresses horizontal overflow without creating
a scroll container.

`scroll-behavior: smooth` is also deliberately absent — it fights ScrollTrigger's
`scrub`, which does its own smoothing.

## Accessibility

- `prefers-reduced-motion` is honoured globally in `globals.css`, and the hero's
  entire pin/scrub is skipped via `gsap.matchMedia` — the page scrolls normally and
  the video holds its first frame.
- All interactive elements have a visible `focus-visible` ring.
- Decorative media is `aria-hidden` and removed from tab order.
- The mobile menu manages `aria-expanded` / `aria-controls`, closes on `Escape`, and
  locks body scroll while open.

## Status

**Built**

1. **Hero** — pinned, scroll-scrubbed video with staggered content fade-outs.
2. **Career** — two-column intro + highlight list with a scroll-into-view reveal.
3. **Approach** — pinned stacked word reveal, one word per scroll step.
4. **Gallery** — pinned horizontal card carousel, with a CSS scroll-snap fallback.
5. **Showcase** — fanned project cards with a staggered reveal and 3D hover tilt.
6. **Mentors** — three-row company logo marquee with an accessible text alternative.
7. **Not Another Course** — copy column plus product shot, with a paired reveal.
8. **AI Mentor** — copy column plus a click-to-load video, in its own typefaces.
9. **Career OS** — six-tile capability grid with per-tile divider rules.
10. **Readiness** — eight-card bento grid with a frosted-glass hover reveal.
11. **Dashboard** — centred checklist plus the product screenshot.
12. **Opportunities** — pinned 3D cylinder carousel of six cards.
13. **Journey** — pill arc on curved paths, with a continuous per-pill drift.
14. **FAQ** — exclusive accordion with an accessible, non-clipping disclosure.
15. **Footer** — card with wordmark watermark and a rotating tagline.

All landing-page sections from the reference design are now built.

### Third-party embeds

Video uses [`YouTubeEmbed`](src/components/ui/youtube-embed.tsx), a click-to-load
facade rather than a plain `<iframe>`. Before the user presses play there are **zero**
requests to YouTube — the poster frame is proxied through our own image optimizer — so
no player JavaScript and no cookies land on visitors who never watch. Playback then
uses `youtube-nocookie.com`.

### Placeholder images

Two temporary sources, both allow-listed in `next.config.ts`:

- **`picsum.photos`** — seeded random photos for the gallery and showcase cards, via
  [`src/lib/placeholder-image.ts`](src/lib/placeholder-image.ts). Seeded so the same
  card always gets the same photo.
- **`images.unsplash.com`** — one pinned photo for the "Not Another Course" panel,
  which needs to actually depict students rather than anything random.

To swap in real art: drop files into `public/assets/`, repoint the feature's data,
write real `alt` text (decorative placeholders ship `alt=""`), and delete the
corresponding remote pattern.

Two `remotePatterns` gotchas worth knowing before adding a host: `search` must include
the leading `?`, and `*`/`**` only match **complete** path segments — a wildcard
cannot cover part of one.
