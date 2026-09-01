import { cn } from "@/lib/utils";
import { approachWords } from "../constants/approach.constants";

/**
 * The stack of oversized words revealed one per scroll step.
 *
 * The words are a `<ul>`: these are the programme's four pillars, and they are the
 * section's real content, not decoration.
 *
 * **`overflow-hidden` on each row is a horizontal-overflow guard, not an animation
 * mask.** The words are `whitespace-nowrap` at display size, so the longest one
 * ("Career-Ready") can still exceed a very narrow viewport even at the clamp's
 * minimum. Without the clip that would widen the document and produce a horizontal
 * scrollbar across the whole page. The reveal animates the row itself, so the clip
 * travels with it and never masks the text.
 *
 * The clamp minimum is `2.625rem` rather than the reference's `52px`: the fallback
 * face (Plus Jakarta Sans) sets wider than Neue Montreal, and at 52px "Career-Ready"
 * overflows a 390px viewport by ~10px and gets visibly shaved at both ends. 42px
 * clears every viewport down to 360px.
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
            136px / 98% / -0.02em on desktop, uppercase — the ratios are kept in
            em so they hold across the clamp, and the 8.5rem cap is the 136px
            desktop size.

            Weight 800, not 700: the fallback face (Plus Jakarta Sans) sets lighter
            than Neue Montreal, so 700 reads thin at display size. The Neue Montreal
            Bold `@font-face` covers 700–900, so this stays on the real Bold file
            once that font is installed.
          */}
          <span
            className={cn(
              "block whitespace-nowrap font-display font-extrabold not-italic uppercase",
              "text-[clamp(2.625rem,9.5vw,8.5rem)] leading-[0.98] tracking-[-0.02em]",
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
