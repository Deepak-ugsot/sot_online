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

**The lead is absolutely positioned, and that is what keeps the word stack optically
centred** in the pinned stage. In flow it would push the stack down by its own height
for the whole pin. It carries `w-full px-6` because it is a real sentence now: without
a width to wrap inside, a translated absolute element sizes to its content and runs off
both edges of a phone. Measured at 390: one line at 17px, no horizontal overflow.

**The reveal re-spaces itself.** `useApproachReveal` derives its row spacing from
`rows.length`, so dropping from four words to three needed no change to the hook —
the last word still lands exactly at the end of the content window.

**Two-element structure is required by the pin** — same as the hero. The outer
`<section>` is the trigger and must not clip, because GSAP inserts a pin spacer inside
it to create the runway. The inner stage is what gets pinned.

## Verified against the reference

At a 1280×720 viewport the section measures **2088px** tall — identical to the
reference (720px stage + 1368px runway).
