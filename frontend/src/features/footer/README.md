# Footer

The site footer: a black card with rounded top corners, carrying a closing CTA, the
outlined wordmark, a rotating tagline, link columns and the disclaimer bar.

## Public API

- `SiteFooter` — the whole footer. The only export routes should use.
- `FooterLinkColumn`, `SocialLink`, `SocialPlatform` — shared types.

```tsx
import { SiteFooter } from "@/features/footer";
```

Mounted as a **sibling of `<main>`**, not inside it — it is site chrome, not page
content.

## Structure

```text
footer/
├── components/
│   ├── site-footer.tsx     # The card and its sections  ("use client")
│   ├── footer-tagline.tsx  # Rotating-word tagline      ("use client")
│   └── social-icon.tsx     # Brand glyphs (server)
├── constants/
│   └── footer.constants.ts # Copy, links, selector map
├── hooks/
│   └── use-footer-reveal.ts
├── types/
│   └── footer.types.ts
├── index.ts                # Public API
└── README.md
```

## The card

`padding-top` on the outer `<footer>` is what leaves a sliver of the light background
visible above the card. Without that gap the rounded corners read as the page simply
ending rather than as a card sitting on the page.

## The rotating tagline

The lead — "Your college gives you a degree. uGSOT Beyond helps you go beyond it." — is
a full sentence that **wraps**; the `max-w` on it is what picks the break, rather than
a hard newline in the copy. The highlight box sits on its own line beneath it.

A word cycles through the red highlight box every 1.5s. The box hugs its word, so the
highlight visibly resizes as they rotate — that is the design's intent, not a layout
bug. `overflow-hidden` on the box is what clips the word as it slides, so it appears
to move behind the box's edges rather than outside them.

**The swap is timed independently of the animation.** The obvious implementation hangs
the text change off the exit tween's `onComplete` — which is what the reference does,
and what this did first. GSAP advances on animation frames, so any stalled frame loop
(a backgrounded tab, a hidden container) leaves the tween unfinished and the word stuck
on screen **forever**. It was caught exactly that way: the word never advanced past
"Software Engineers." A `setTimeout` matched to the exit duration drives the swap
instead. The copy must keep rotating; the slide is decoration.

The two phases are split across two effects on purpose: the interval animates the
current word *out* and advances the index, and a second effect animates the new word
*in* once React has rendered it. One tween doing both would swap the text at the wrong
moment.

Under reduced motion the word still rotates — it just cuts rather than slides.

## The reveal

One timeline, five beats, each starting **before** the last finishes:

| Beat | Target        | Motion                        | Offset  |
| ---- | ------------- | ----------------------------- | ------- |
| 1    | CTA block     | fade + `y: 60 → 0`            | —       |
| 2    | Watermark     | fade + `scale: 0.85 → 1`      | `-=0.3` |
| 3    | Tagline       | fade + `y: 45 → 0`            | `-=0.4` |
| 4    | Columns       | fade + `y: 45`, 0.12 stagger  | `-=0.3` |
| 5    | Disclaimer    | fade + `y: 20 → 0`            | `-=0.2` |

A single timeline rather than five triggers: the overlap is the choreography, and only
a shared timeline can express it. Separate `ScrollTrigger`s would each fire on their
own element's position and drift apart.

## The watermark

`public/assets/upgrad_beyond.png` — **3840×491 RGBA**. The intrinsic size passed to
`next/image` must be the file's true pixel size, or the reserved box has the wrong
ratio and the layout jumps once the image loads.

Rendered at **full opacity**, not the reference's 50%: the artwork already fades its
own strokes out toward the bottom, and dimming it again washed out the top of the
wordmark too.

Hidden below `900px`, where it would shrink to an illegible smear, and `aria-hidden`
throughout — the brand is already named by the logo beneath it.

## Accessibility

- Each link column is a `<nav>` labelled by its own heading, so the two groups are
  distinguishable rather than one undifferentiated list of links.
- Social links carry the accessible name; the glyphs are `aria-hidden`, so a screen
  reader announces each platform once rather than twice.
- Every link has a visible `focus-visible` ring.

## Verified

Four social links, two labelled nav columns, and the tagline confirmed cycling through
all five words. No page-level horizontal overflow.

The bottom bar carries a **positioning disclaimer**, not a copyright line: it is what
keeps "Beyond" from reading as a replacement for uGSOT Campus, so it should not be
trimmed for layout reasons without asking.
