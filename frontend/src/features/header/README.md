# Header

Site chrome: brand mark, primary navigation, and the "Apply Now" CTA, **fixed to the
top of the viewport for the whole page**.

It floats with no background of its own over the hero — the design's intent, and the
reason the nav is white — then fades a dark backdrop in once it has scrolled clear of
the hero. Every section below the hero is light, so white-on-transparent would be
invisible there.

## Public API

- `SiteHeader` — the whole header. The only export routes should use.
- `HeaderCta`, `NavLink` — shared types.

```tsx
import { SiteHeader } from "@/features/header";
```

Mounted as a **sibling of `<main>`**, not inside it — like `SiteFooter`, it is site
chrome, not page content.

## Structure

```text
header/
├── components/
│   └── site-header.tsx        # Logo, nav, CTA, mobile menu  ("use client")
├── constants/
│   └── header.constants.ts    # CTA copy + the hero selector
├── hooks/
│   └── use-header-backdrop.ts # Tracks "have we scrolled past the hero?"
├── types/
│   └── header.types.ts
├── index.ts                   # Public API
└── README.md
```

`navLinks` is **not** here — it lives in `src/config/site.config.ts`, because the
footer renders the same list.

## The backdrop

`useHeaderBackdrop` measures the hero's live bounding box each frame the page scrolls
and flips the backdrop on once `hero.bottom` passes under the header's own height.

**Why measure rather than compare against a fixed scroll offset.** The hero's height
is not knowable up front: GSAP pins it and inserts a spacer whose size depends on the
viewport, and under `prefers-reduced-motion` there is no pin at all. The `<section>`
wrapping that spacer reports the true end of the hero in every one of those cases.

Reads are `requestAnimationFrame`-throttled, so a burst of scroll events costs at most
one layout measurement per frame. The listener is `passive`.

The hero is found by `#home` (`HERO_SELECTOR`) rather than by a passed-in ref, so the
header stays a leaf the route can drop in without wiring. With no hero on the page the
header simply always carries its backdrop.

## Decisions

**Fixed, not sticky.** `position: sticky` would need the header to be a flow sibling
of the sections it sits above; the hero pins itself with GSAP and inserts its own
spacer, which a sticky element in that flow would fight. `fixed` sidesteps the pin
entirely.

**`z-50`.** Nothing else on the page goes above `z-10`, so the header is comfortably
clear of every section's internal stacking.

**Anchor offset lives in CSS.** `scroll-padding-top` on `html` (in `globals.css`) is
what keeps an in-page jump from landing underneath the header. Doing it per-link in JS
would miss the browser's own restore-scroll and back/forward navigation.

**The header is not part of the hero's fade-out.** It used to be — the hero timeline
faded it away as you scrolled. That tween is gone; the header is page chrome now.

## Accessibility

- The mobile menu sets `aria-expanded` / `aria-controls`, closes on `Escape`, and
  locks body scroll while open.
- With body scroll locked, the panel scrolls itself (`max-h` + `overflow-y-auto`) so
  its lower half stays reachable on short viewports.
- The desktop and mobile navs carry distinct `aria-label`s, so a screen reader can
  tell the two apart.
- Every interactive element has a visible `focus-visible` ring in brand red.
