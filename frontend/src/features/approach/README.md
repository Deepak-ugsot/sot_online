# Approach

"You don't need more content. You need…" — a pinned section that completes its own
sentence one oversized word per scroll step: **Direction → Discipline → Ecosystem**.

The lead line and the three words are one statement, which is why the lead is set as a
readable sentence rather than as the small letterspaced eyebrow this slot used to hold.
Only the middle word carries the brand red, so the stack opens and closes in ink.

## Public API

- `ApproachSection` — the whole section. The only export routes should use.
- `ApproachWord` — shared type.

```tsx
import { ApproachSection } from "@/features/approach";
```

## Structure

```text
approach/
├── components/
│   ├── approach-section.tsx    # Pin wrapper + stage  ("use client")
│   └── approach-words.tsx      # The stacked word list (server)
├── constants/
│   └── approach.constants.ts   # Copy + the data-approach selector map
├── hooks/
│   └── use-approach-reveal.ts  # GSAP pin + per-word reveal
├── types/
│   └── approach.types.ts
├── index.ts                    # Public API
└── README.md
```

## The reveal

One `ScrollTrigger` pins the stage over a runway of **1.9× viewport height** (1.4× at
≤767px) with `scrub: 0.2`. Each word then fades and rises `40px` into place,
0.3 of the content window each, `power2.out`.

**Spacing is derived, not hard-coded:**

```ts
rowSpacing = (1 - ROW_DURATION) / (rowCount - 1)
```

This places the last word's arrival at exactly `1.0` of the content window — i.e.
precisely at `CONTENT_END` once scaled. Adding or removing a word re-spaces the whole
sequence automatically; nothing else needs touching.

**The 0.85 hold buffer** works the same way as the hero's: all motion is compressed
into the first 85% of the pin's range, and a trailing no-op tween stretches the
timeline's own duration back to a true `1.0` so `scrub` doesn't apply that
compression twice. Without the buffer a fast flick could unpin the section before the
last word had arrived.

**Reduced motion registers nothing at all** — no timeline, no pin, and crucially no
`gsap.set` hiding the rows. The reference hides them at module scope and then
un-hides them in a static branch, which flashes the words to invisible first; here
they simply render in place. The stage also drops its fixed viewport height and the
lead returns to normal flow, via Tailwind's `motion-reduce:` variants.

## Layout notes

**`overflow-hidden` on each row is a horizontal-overflow guard, not an animation
mask.** The tween moves the row itself, so the clip travels with it and can never
mask the text. Its job is to stop the oversized `whitespace-nowrap` words widening the
document and producing a page-wide horizontal scrollbar on narrow viewports.

**The clamp minimum is `2.625rem` (42px), not the reference's `52px`.** The fallback
face (Plus Jakarta Sans) sets wider than Neue Montreal. The value was measured against
the longer set this section used to carry — at 52px "Career-Ready" needed 400px and
overflowed a 390px viewport, getting visibly shaved at both ends. The current three
words are shorter, so it now has room to spare: at 390 the widest ("Ecosystem") is
253px against the viewport's 390. Below 360 the `overflow-hidden` still catches it.

**The lead is a flex child, not absolutely positioned.** It was pinned at a fixed
`top`, which kept the word stack dead-centre — but the two were then laid out
independently, and on a short viewport they collided: at 1600×700 the stack's top sat
**58px above the lead's bottom**, running "DIRECTION" straight through the sentence. No
word size fixes that, because the stack grows from the centre while a pinned line stays
put. As a flex child the overlap cannot happen at all, and the stage's `pt-[7.5rem]` is
what clears the fixed site header (~79px).

**The `17vh` term in the word clamp caps them by the stage's height, not just the
viewport's width.** The stage is exactly one viewport tall and the stack is three rows,
so on a short laptop the words would otherwise outgrow the space between the lead and
the stage's bottom edge and be clipped. At 900px tall `17vh` is 153px, so the `9.5rem`
(152px) cap still wins and a normal desktop is unaffected.

**The words carry a `-webkit-text-stroke` of `0.015em`,** and it is doing real work:
`font-black` (900) is what the design asks for, but Plus Jakarta Sans — the stand-in
until Neue Montreal is installed — has no weight above 800. Measured: "Ecosystem" sets
to exactly 916px at both 800 and 900, so the browser clamps rather than faking one. The
stroke is what carries the extra weight in the meantime, in `em` so it scales with the
clamp. **Drop it when the licensed font lands** — with a real 900 underneath, the two
together would be too heavy.

| Viewport | Word size | Lead→stack gap | Collides | Clipped |
| -------- | --------- | -------------- | -------- | ------- |
| 1600×900 | 152px     | 45px           | no       | no      |
| 1600×700 | 119px     | 35px           | no       | no      |
| 390×844  | 46px      | —              | no       | no      |

At 390 the widest word ("Ecosystem") is 277px against a 390px viewport, and there is no
horizontal overflow.

**The reveal re-spaces itself.** `useApproachReveal` derives its row spacing from
`rows.length`, so dropping from four words to three needed no change to the hook —
the last word still lands exactly at the end of the content window.

**Two-element structure is required by the pin** — same as the hero. The outer
`<section>` is the trigger and must not clip, because GSAP inserts a pin spacer inside
it to create the runway. The inner stage is what gets pinned.

## Verified against the reference

At a 1280×720 viewport the section measures **2088px** tall — identical to the
reference (720px stage + 1368px runway).
