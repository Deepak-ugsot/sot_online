# Gallery

"Your 2-Year Engineering Journey" — a fixed intro column beside a card track that
advances one card per scroll step: **Foundations → Development → AI → Industry Ready**.

## Public API

- `GallerySection` — the whole section. The only export routes should use.
- `GalleryCard`, `GalleryHeadingCopy` — shared types.

```tsx
import { GallerySection } from "@/features/gallery";
```

## Structure

```text
gallery/
├── components/
│   ├── gallery-section.tsx    # Pin wrapper, stage, intro, track ("use client")
│   └── gallery-card.tsx       # One journey stage (server)
├── constants/
│   └── gallery.constants.ts   # Copy, card data, breakpoint, selector map
├── hooks/
│   └── use-gallery-carousel.ts
├── types/
│   └── gallery.types.ts
├── index.ts                   # Public API
└── README.md
```

## Two behaviours, split at `lg`

| Width                   | Behaviour                                                        |
| ----------------------- | ---------------------------------------------------------------- |
| **`lg` (1024px) and up** | Stage pins; the track is translated horizontally by page scroll. |
| **Below `lg`**          | No JS. A native horizontal scroll-snap track the user swipes.    |
| **Reduced motion, any width** | The scroll-snap track, at every width.                     |

This is the section's most important property: **the CSS track is the baseline and
the carousel is the enhancement.** If the hook never runs — narrow viewport, reduced
motion, a JS failure — the cards are still reachable by swipe, keyboard and screen
reader. Nothing is hidden behind the animation.

`GALLERY_PIN_BREAKPOINT` (1024) and Tailwind's `lg:` must stay in step. If they
disagree there is a band of widths where CSS offers a swipe track while JS pins the
section, and the two fight. The constant carries a comment saying so.

## The carousel

```
end = (totalSteps × viewportWidth × 1.6) / 0.85
```

- **`xPercent: -100` per step.** The track is exactly one viewport wide and each card
  is `w-full flex-none` **at `lg` and up**, so a whole-percentage translate lands each card precisely in
  frame at any viewport size — no pixel maths, nothing to recompute on resize.
- **`DISTANCE_MULTIPLIER = 1.6`** makes a card-step cost 1.6 viewport widths of
  scrolling rather than 1:1, so the carousel feels deliberate rather than twitchy.
  Matches the pacing of the hero and approach pins.
- **`end` is a callback**, so a resize re-reads `viewport.clientWidth` instead of
  reusing the first-paint value.
- **The 0.85 hold buffer** works as it does elsewhere: the track finishes travelling
  at `CONTENT_END`, and a trailing no-op tween stretches the timeline's duration back
  to a true `1.0` so `scrub` doesn't apply that compression twice.

## Images

Journey artwork, in `public/assets/Journey/`, at **1366×844** each. The media panel is
~55vw, which is 792px at a 1440 viewport, so the art covers it at 1× with room to
spare, but falls well short of DPR 2.

**The folder's and filenames' capitalisation is load-bearing.** `galleryImage()` passes
it through verbatim, because macOS resolves `journey/become_industry_ready.jpg` just
fine while the Linux deploy target does not — a wrong case would pass every local check
and 404 only in production.

`alt=""` — each card states its stage three times over, in the display text above and
the heading and description beneath, so alt text would only repeat what a screen reader
has just read.

## Card gradients are data, not utilities

Each card's media panel carries its own bespoke three-stop gradient, applied via
inline `style`. They are not Tailwind classes because they belong to no scale or
token — four one-off utility classes would only separate them from the card data they
describe. They live in `galleryCards` alongside the copy.

The dark scrim over the media is a real element rather than a `::after`, so the
card's visuals aren't split across two mechanisms.

## Verified against the reference

At a 1280×720 viewport the section measures **4571px** tall — identical to the
reference. At 390px it drops to 793px with a 4×342px snap track and no page-level
horizontal overflow.

## On a phone

Three things are different below `lg`, and each is answering a specific failure.

**The display text keeps scaling.** Its `clamp` floor was `2.5rem`, which meant it
stopped shrinking at about 380px wide — on a 360px phone the longest line
("Development.") wanted 265px against 248px of card and ran off the edge. The floor is
now `1.75rem`.

The `6vw` middle term is deliberately unchanged. Raising it would have fixed the phone
by breaking the desktop card, which is far narrower than the viewport once the intro
column and gap are taken out: at 1024px that same line needs 477px at `7vw` against
429px of panel. Only the floor was wrong.

**The card is 86% wide, not 100%.** Nothing below `lg` depends on the card being
exactly one screen — the pinned carousel and its `-100%` steps only run at `lg` and up
— and a full-width card gives a phone no sign that three more sit behind it. The
sliver is the affordance.

**The right edge is masked** over exactly the 3rem the next card peeks by. Unmasked,
that card shows a chopped bold title and three part-words, which reads as a layout
fault rather than as "there is more". The gradient carries a middle stop rather than
running straight to transparent — a linear fade is still fully opaque exactly where the
chopped words are, so it drops to 30% within the first rem.

Media padding also steps down (`p-5`, `sm:p-8`), since 32px of it on a 294px card is a
lot of the panel.

Verified at 390px: card 294 with a 48px peek, display text at 28px with 12–68px of
slack on the longest line of all four cards, the track swipeable, no page overflow. And
at 1440px nothing moved — mask `none`, card full-width at 828px so the `-100%` steps
still land, display text at its 80px cap.

## The swipe arrow

Below `lg` the track carries a `RailScrollArrow` (`@/components/ui/rail-scroll-arrow`),
pinned to the right edge and centred on the media panel — `top-[min(23vh,19.375rem)]`
is exactly half the panel's own `h-[46vh] max-h-[38.75rem]`, so the two move together.

**The peeking sliver was not enough on its own.** It reads as "there is more" only once
you already know the track scrolls; on a phone, with no hover and no scrollbar, nothing
said so outright. The arrow does, and it advances the track when tapped.

It lives in the wrapper `div` around the viewport, not inside it: the viewport carries
the right-edge mask, and an arrow under that mask fades out exactly where it is meant
to sit. The wrapper also took over `lg:min-w-0 lg:flex-1` so the flex sizing still
lands on the element that fills the row.

Whether the arrow shows is measured, not restated — see the component. It never needs
to know that this rail's breakpoint is `lg`.
