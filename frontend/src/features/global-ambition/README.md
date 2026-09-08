# Global Ambition

"Your college may be anywhere. Your ambition can be global." — a centred header over
a bento grid of the seven opportunities the programme points students at: contests,
open source, real products, and internships.

Sits directly below the hero, and is the first thing on the page after it.

## Public API

- `GlobalAmbitionSection` — the whole section. The only export routes should use.
- `GlobalAmbitionCard`, `GlobalAmbitionCardSize`, `GlobalAmbitionHeadingCopy` — types.

```tsx
import { GlobalAmbitionSection } from "@/features/global-ambition";
```

## Structure

```text
global-ambition/
├── components/
│   ├── global-ambition-section.tsx   # Header + grid; owns the ref ("use client")
│   └── global-ambition-card.tsx      # One card (server)
├── constants/
│   └── global-ambition.constants.ts  # Copy, card data, selector map
├── hooks/
│   └── use-global-ambition-reveal.ts # GSAP entrance
├── types/
│   └── global-ambition.types.ts
├── index.ts
└── README.md
```

## The grid

Three columns at `lg`, two at `sm`, one below that. Seven cards fill it as **3 + 3 +
1**: the last card spans whatever the current column count is, so it stays the block's
base line at every breakpoint instead of becoming a stray wide card in a 2-up grid.

The only break in the rhythm is the **featured** card — "Build Real Products", the
middle of the second row and the only one on a white ground. It overhangs its row by
10px top and bottom, which is `lg:-my-2.5` on a stretched grid item: negative vertical
margins make its border box taller than the row it sits in. `lg:` only — below that
there is no row line to break, so the offset would just read as a card hanging oddly.
It also takes `z-10`, because it now overlaps its neighbours' margin boxes and would
otherwise have their shadows painted over its edges.

## Why the card is a flex row, not an absolute media box

The obvious build is to absolutely position the artwork over the right of the card.
That cannot guarantee the copy and the art clear each other: their widths are set in
different units against different boxes, and at 1280 they overlapped by **up to 32px**
— the ICPC medal ran through its own description.

So the card is a flex row. The copy and the media each get a real track (54% / 46%),
which can never collide at any width. The image is then absolutely positioned *inside*
its own track, which is what lets it hang past the card's edge; `overflow-hidden` on
the card is what crops it.

**The image is wrapped in a plain `div` rather than positioned directly**, and that
wrapper is load-bearing. Preflight sets `img { max-width: 100% }`, which gives every
`next/image` a resolved width — so an absolutely positioned one is over-constrained
and the browser drops the `right` inset entirely, leaving the artwork flush with its
track instead of hanging past it. A `div` has `width: auto` and takes its width from
the insets as intended; the image just fills it.

Each card carries its own inset string (`mediaClassName`) because every render is
cropped differently: the ICPC medal's ribbon runs off the top, the laptop and the GSoC
packet are cut by the right edge, the internship badge hangs past it.

## Motion

**On hover** (pure CSS, no client JS):

| Element | Change                          | Duration |
| ------- | ------------------------------- | -------- |
| Card    | `-translate-y-1.5` + deeper shadow | 500ms |
| Artwork | `scale(1.06)` + `-rotate(1.5deg)`  | 700ms |

The artwork is slower than the card on purpose, so it reads as the card leading and
the render following rather than as one rigid block. Both use `ease-cinematic`, the
site's signature curve. The card also lifts on `focus-within`, so a keyboard user
gets the same feedback if a control is ever added inside one.

**On scroll**, `useGlobalAmbitionReveal` fades the header up, then the cards on an
0.08s stagger in DOM order — across the first row, across the second, then the
full-width card. It fires once and does not reverse: this is an entrance, not a
scroll-linked effect.

The grid is triggered off its own top rather than the section's, and later than the
header — otherwise on a tall viewport the whole block would already be on screen
before anything moved.

## Reduced motion

The reveal registers nothing under `prefers-reduced-motion`, so every element renders
in its final position with no `from` state to sit in. The hover motion needs no guard:
the global rule in `globals.css` cuts every transition to 0.01ms.

## Accessibility

- The artwork is `aria-hidden` with empty `alt`. Every render is a picture of the
  thing its title already names, so describing them would make a screen reader
  announce "medal", "laptop", "lanyard" after each heading and teach nothing a
  sighted visitor gets from them.
- Each card is an `<article>` with an `<h3>`; the section is labelled by its `<h2>`.

## Assets

`public/assets/global/` — seven PNGs on transparent grounds:

| File                         | Pixels  |
| ---------------------------- | ------- |
| `ICPC.png`                   | 334×374 |
| `CodeChef.png`               | 468×345 |
| `Google_Summer of_Code.png`  | 476×329 |
| `Open_Source.png`            | 576×384 |
| `Build_Real_Products.png`    | 400×298 |
| `AI.png`                     | 340×270 |
| `Internships.png`            | 629×420 |

**The filenames' capitalisation is load-bearing** — they are passed through verbatim,
and macOS resolves `icpc.png` just fine where the Linux deploy target does not. Note
that `Google_Summer of_Code.png` contains a **space**; it is encoded correctly by
`next/image` and verified serving 200, but it is the one name worth renaming if these
files are ever reorganised.

## Measured

| Viewport | Columns | Grid rows       | Notes                                    |
| -------- | ------- | --------------- | ---------------------------------------- |
| 1440     | 3       | 3 + 3 + 1       | Featured card overhangs 10px each side   |
| 1280     | 3       | 3 + 3 + 1       | Copy 54% / art 46%, no overlap           |
| 768      | 2       | 2 + 2 + 2 + 1   | No overhang — `lg:` only                 |
| 390      | 1       | 7 stacked       | No horizontal overflow                   |
