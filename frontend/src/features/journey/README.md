# Journey

"Career OS adapts to your Journey" — the heading beside a gallery of the four
programme tracks: an expanding row on wide screens, a horizontal scroller below.

Ported from upGrad Enterprise's ["Our Expertise"](https://www.upgrad-enterprise.com/enquiry).

## Public API

- `JourneySection` — the whole section. The only export routes should use.
- `JourneyTrack`, `JourneyHeadingCopy` — shared types.

```tsx
import { JourneySection } from "@/features/journey";
```

## Structure

```text
journey/
├── components/
│   ├── journey-section.tsx   # Heading + gallery  ("use client")
│   ├── journey-gallery.tsx   # The row / scroller, owns which card is open  ("use client")
│   └── journey-card.tsx      # One track
├── constants/
│   └── journey.constants.ts  # Copy, track data, selector map
├── hooks/
│   └── use-journey-reveal.ts # Staggered entrance
├── types/
│   └── journey.types.ts
├── index.ts                  # Public API
└── README.md
```

## Hovering activates a card, and it stays

Pointing at a card opens it, and it **remains open after the cursor leaves** — the row
only changes when another card is pointed at. That is the behaviour of the reference
this was modelled on (upGrad Enterprise's "Our Expertise"), and it is why the gallery
owns an `activeId` in state.

It used to be pure CSS: `hover:grow-[4]` on each card, with
`group-[:not(:hover)]/gallery:grow-[4]` opening the first whenever the gallery was not
hovered. Elegant, and wrong for this — the row snapped back to the first card the
instant the pointer left, so a reader could not move the mouse away from a track and
keep reading it. **`:hover` has no memory**, so no arrangement of CSS can express
"stay on the last one pointed at".

Three events open a card, covering all three ways in:

| Event          | Why |
| -------------- | --- |
| `onMouseEnter` | the pointer behaviour itself |
| `onClick`      | touch has no hover at all — without it a phone is stuck on whichever card is first |
| `onFocus`      | keeps keyboard tabbing in step; free here, since focus can only land inside an open card |

Exactly one card is active at a time, guaranteed by there being a single `activeId`
rather than a flag per card — so `flex-grow` can never be claimed by two cards at once.

Titles are faded rather than unmounted, so a screen reader reaches every track's title
regardless of which card happens to be open.

## What was taken from the reference

Read off `upgrad-enterprise.com/enquiry` rather than eyeballed:

| | reference ≤991px | reference ≥992px |
| --- | --- | --- |
| track | `overflow: auto` | flex row |
| cards | `min-width: 20rem`, all equal | closed `14%`, open `30%` (max `26%` ≥1280) |
| height | `min-height: 25rem` | `min-height: 25rem` |
| titles | every card | every card — `1.25rem` closed, `1.5rem` open |
| gap / radius | `16px` / `4px` | `16px` / `4px` |
| easing | — | `0.5s cubic-bezier(0.215, 0.61, 0.355, 1)` |

All of it carries over except the two things that cannot.

**Every card shows its title.** This is the reference's real lesson and the thing this
gallery used to get wrong: a closed card there is still a card you can read, so opening
one is a change of emphasis rather than a reveal. Opening used to be the only way to
learn what a card was, which meant tapping blind.

**The percentages become a ratio.** `30% / 14%` is written for six cards on a
full-width track. Four cards beside a heading do not add up to that, so the proportion
is expressed as grow factors — `15 : 7 : 7 : 7` — and the cards divide whatever the
track gives them: 39% for the open one, 18.2% each for the rest.

## Two breakpoints, and they are not the same one

`901px` is where the **section** stops stacking. The gallery becomes a column of a row
rather than the width of the screen, so it gives up its `-mx-6 px-6` bleed.

`xl` (1280px) is where the **row** becomes affordable. The reference switches at 992px
because its heading sits above the cards and the row gets the full `1296px`. Here the
heading sits beside the gallery and takes `460px` plus an `80px` gap, leaving
`vw - 588`. At 1024 that is 436px, and four cards in the reference's proportions come
out **191 / 89 / 89 / 89** — the same slivers this port exists to remove. So between
901px and `xl` the section is side by side and the gallery still scrolls.

Below `xl`, `isActive` styles nothing: every `grow`, `transition` and closed-title size
is prefixed `xl:`. The flag is still tracked rather than branched on in JS — the
open/closed look lives entirely in classes, so `xl` is the one place the two behaviours
part, and there is no second gallery to keep in step.

The scrollbar is hidden (`no-scrollbar`, in `globals.css`): the peeking card already
says the track scrolls, and on a touch device the bar is drawn over the artwork for a
second on every swipe. Snapping is ours, not the reference's — the reference scrolls
freely and lets a card rest half-shown.

## Responsive behaviour

| Width | Layout | Gallery | Card widths | Titles |
| --- | --- | --- | --- | --- |
| 375 | stacked | scroller, bled to the screen | 320 × 4, track 1376px | 24px |
| 1024 | side by side | scroller, 507px track | 320 × 4 | 24px |
| 1440 | side by side | expanding row, 756px track | 295 / 138 / 138 / 138 | 24px open, 16px closed |

Height is a flat `25rem` and the gap `16px` at every one of them, per the reference.

At 375 the `<ul>` measures the full 375px (left edge 0) while the first card starts at
the 24px gutter, and snapping lands scroll position exactly on card 2's start (336px).
The cards that run past the viewport all sit inside the scroll container — measured
`overflow-x: auto` on their parent — so the section contributes nothing to the page's
own horizontal overflow.

At 1440, activating card 4 moves the 295px and the 24px title to it and returns card 1
to 138px/16px.

Activation verified in-browser with transitions disabled: at rest card 1 is 408px with
its title showing and the rest 102px; activating card 3 moves the 408px and the title
to it; the pointer then leaving the gallery changes nothing; activating card 4, then
card 1, each moves it again. Corners compute to `0px`.

`onMouseEnter` runs the same `onActivate` as `onClick`, so pointer hover is covered by
that same path — but it is worth saying plainly that the *hover* entry point was not
driven end to end here. Synthetic `mouseover` does not map onto React's
`onMouseEnter`, and this session's browser pane was hidden, which parks real pointer
input and freezes CSS transitions mid-flight.

## Reveal

Heading children stagger in at 0.1s, then the cards cascade at 0.08s, triggered off
the gallery rather than the section — on the stacked layout the section top clears the
trigger line while the cards are still below the fold.

It animates each card's `y` and opacity, which is safe alongside the open/closed
behaviour: that is driven entirely by `flex-grow`, so the two never write to the same
property.

## Images

Curriculum artwork, in `public/assets/curriculum/`. Each file is **647×431** — exactly
the card's height at desktop, so `object-cover` only ever crops horizontally: the
expanded card takes the middle 407px and the collapsed ones a 102px slice of the same
art.

**The filename's capitalisation is load-bearing.** `curriculumImage()` passes it
through verbatim, because macOS resolves `CPF.png` and `cpf.png` alike while the Linux
deploy target does not — a wrong case would pass every local check and 404 only in
production.

`sizes` quotes the *expanded* card's width, not the collapsed one: all four pull the
same file, so quoting 102px would fetch art too small for the one card actually being
read.

`alt=""` — the title beside each image names the track, so the artwork is decorative.

At 647px wide the source is comfortably above the 407px the expanded card renders at,
but below the 814px a retina display would want. Re-exporting at ~1300×866 would make
it crisp on those screens; nothing in the code would need to change.

## Relationship to the reference

Matches the reference implementation measurement for measurement: section background
`#f3f4f6`, `100px 24px 120px` padding, heading column `460px` / `20px` gap, title
`clamp(30px, 3.2vw, 48px)` at `1.18`, subtitle
`clamp(16px, 1.6vw, 20px)` at `1.4`, gallery `431px` tall with a `14px` gap, cards
transitioning `flex-grow` over `0.5s` on `--ease-cinematic`, year pill white on brand
red at `14px`, title `24px` bold.

**Deliberate deviations:**

- **Container `84rem`, not the reference's `81.375rem`** — the same measure the
  showcase and mentors sections use, which is the widest on the page, so this section
  sits on the same outer edges as the rest of them.
- **`80px` column gap, not `40px`.** The extra container width absorbs it, so the
  gallery does not lose anything: it measures 756px against the reference's 754px.
- The gallery is a `<ul>` of `<li>` cards; the reference uses bare `<article>`s. These
  are the four stages of the programme, so they are a list.
- **No border radius**, against the reference's `8px`.
- **Hover activates and persists**, against the reference's hover-and-snap-back —
  matching upGrad Enterprise's "Our Expertise" instead, as asked.
