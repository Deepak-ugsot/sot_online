# AI Mentor

"Meet your personal AI Career Mentor." — copy column on the left, video on the right,
on the dark canvas ground.

## Public API

- `AiMentorSection` — the whole section. The only export routes should use.

```tsx
import { AiMentorSection } from "@/features/ai-mentor";
```

## Structure

```text
ai-mentor/
├── components/
│   └── ai-mentor-section.tsx   # Copy column + video panel  ("use client")
├── constants/
│   └── ai-mentor.constants.ts  # Copy, video, selector map
├── hooks/
│   └── use-ai-mentor-reveal.ts
├── index.ts                    # Public API
└── README.md
```

No `types/` — the section's data is plain strings and a video id, so there is nothing
worth naming. Add the folder when real shapes appear.

## Its own typefaces

The only section set in **Sora** (eyebrow, heading, pills) and **Fraunces italic**
(the "Available 24×7." line), rather than the site-wide `font-display` / `font-accent`
pairing.

That is the reference's own choice, not drift: this block reads as a product callout
and is deliberately distinct from the marketing sections around it. Both are genuine
Google fonts, so unlike Neue Montreal and Ivy Ora elsewhere these are the real
typefaces rather than stand-ins.

The theme tokens are named after the typefaces (`font-sora`, `font-fraunces`) rather
than a role, precisely because they are a local departure and not another rung on the
site's type scale.

## Layout

Both columns are `flex: 1 1 26.25rem` capped at `31.3rem`, so they sit side by side
while there is room for two 420px tracks and wrap to a stack when there is not —
**no breakpoint involved**. The copy column measures exactly 501px at 1280, matching
the reference.

## The video panel

The design calls for an animated chat demo here. It is a video for now, using
`YouTubeEmbed` from `components/ui`.

**It is a click-to-load facade, not a plain `<iframe>`.** A bare embed pulls roughly a
megabyte of YouTube player JavaScript — and sets cookies — on every page load, for
every visitor, whether or not they press play. On a marketing page most never do.

Measured before any click: **zero** network requests to `youtube.com` or `ytimg.com`.
The poster frame is proxied through our own image optimizer, so the page makes no
third-party contact at all until the user opts in. On click, the iframe mounts against
`youtube-nocookie.com` with `autoplay=1` — correct there, because the iframe only
exists as a direct result of the user pressing play.

The play control is a real `<button>` with an accessible name
(`Play video: <title>`) and a visible focus ring, not a decorative overlay.

To swap in the real footage, change `videoId` in the constants. If the panel goes back
to being a chat mock-up, replace `YouTubeEmbed` outright — nothing else in the section
depends on it.

## The reveal

Both halves share one `ScrollTrigger` at `top 85%`, `once: true`.

| Target      | Motion                                 | Timing            |
| ----------- | -------------------------------------- | ----------------- |
| Copy column | fade + `y: 60 → 0`                     | 0.9s `power3.out` |
| Video panel | fade + `x: 100 → 0`, `scale: 0.94 → 1` | 1s `power3.out`   |

The copy column animates as **one block**, not per-child — it is a flex stack, so
tweening the eyebrow, heading, tagline and pills individually would animate the gaps
between them and let them overlap mid-flight.

The reference has no entrance here at all; its chat panel animates itself instead.
This matches the "Not Another Course" entrance so the two copy-plus-media sections
read consistently.

## Verified

At 1280×800 the section measures **549px** tall against the reference's 544px, with
the copy column at exactly 501px, seven capability pills, Sora 800 on the heading and
Fraunces italic on the tagline. No page-level horizontal overflow.
