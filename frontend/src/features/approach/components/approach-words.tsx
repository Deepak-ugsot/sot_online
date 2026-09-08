import { cn } from "@/lib/utils";
import { approachWords } from "../constants/approach.constants";

/**
 * The stack of oversized words revealed one per scroll step.
 *
 * The words are a `<ul>`: these are the three things the lead sentence says a student
 * needs, and they are the section's real content, not decoration.
 *
 * **`overflow-hidden` on each row is a horizontal-overflow guard, not an animation
 * mask.** The words are `whitespace-nowrap` at display size, so the longest one can
 * still exceed a very narrow viewport even at the clamp's minimum. Without the clip
 * that would widen the document and produce a horizontal scrollbar across the whole
 * page. The reveal animates the row itself, so the clip travels with it and never
 * masks the text.
 *
 * The clamp minimum is `2.625rem` rather than the reference's `52px`, because the
 * fallback face (Plus Jakarta Sans) sets wider than Neue Montreal. It was measured
 * against the longer set this section used to carry ("Career-Ready"); the current
 * three words are shorter, so it now has room to spare rather than being at its
 * limit.
 */
export function ApproachWords() {
  return (
    <ul className="flex list-none flex-col items-center">
      {approachWords.map((word) => (
        <li
          key={word.id}
          data-approach="row"
          className="flex w-full items-center justify-center overflow-hidden"
        >
          {/*
            152px / 106% / -0.02em on desktop, uppercase — the ratios are kept in
            em so they hold across the clamp, and the `9.5rem` cap is the 152px
            desktop size.

            **The `17vh` term caps the words by the stage's height, not just the
            viewport's width.** The stage is exactly one viewport tall and the stack is
            three of these rows, so on a short laptop the words would otherwise outgrow
            the space between the lead sentence and the stage's bottom edge and get
            clipped. At 900px tall `17vh` is 153px, so the `9.5rem` cap still wins and
            a normal desktop is unaffected. `uppercase` here rather than in the copy, because unlike
            the hero's CTA labels or "uGSOT BEYOND" these are ordinary words with no
            casing of their own to preserve.

            **`leading` is the gap between the words**, not just the words' own
            height: each word is one line in its own row, so the line box *is* the
            row, and the leading over 1 is split evenly above and below. `1.06` puts
            roughly 9px of air between rows at the 152px cap.

            Weight 900, not 700: the fallback face (Plus Jakarta Sans) sets lighter
            than Neue Montreal, so 700 reads thin at display size. The Neue Montreal
            Bold `@font-face` covers 700–900, so this lands on the real Bold file's
            top end once that font is installed.

            **Until then 900 renders as 800**, and measurably so: Plus Jakarta Sans
            has no weight above 800, and "Ecosystem" sets to exactly 916px at both, so
            the browser is clamping rather than faking one. The `-webkit-text-stroke`
            below is what carries the extra weight in the meantime. **Drop the stroke
            when the licensed font is installed** — with a real 900 underneath it, the
            two together would be too heavy.
          */}
          <span
            className={cn(
              "block whitespace-nowrap font-display font-black not-italic uppercase",
              "text-[clamp(2.875rem,min(10.5vw,17vh),9.5rem)] leading-[1.06] tracking-[-0.02em]",
              // See the note above: this is what actually carries the extra weight
              // while the stand-in face is capped at 800. `em`, so it scales with the
              // clamp instead of overwhelming the 46px mobile size.
              "[-webkit-text-stroke:0.015em_currentColor]",
              word.accent ? "text-brand" : "text-ink",
            )}
          >
            {word.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
