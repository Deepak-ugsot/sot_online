import { cn } from "@/lib/utils";
import type { HeroHeadlineCopy } from "../types/hero.types";

type HeroHeadlineProps = HeroHeadlineCopy & {
  /** Referenced by the section's `aria-labelledby`. */
  id?: string;
  className?: string;
  /** Animation hook used by `useHeroScrollAnimation`. */
  "data-hero"?: string;
};

/**
 * The hero's `<h1>`: a lead, an accent in brand red, then a tail — all three in the
 * display sans.
 *
 * The accent uses the same `font-accent` face as every other two-tone heading on the
 * page — Bricolage Grotesque. It carries the product name, and a name should look the
 * same everywhere it appears.
 *
 * All three parts live in one heading element so screen readers announce a single
 * continuous phrase.
 *
 * Sizing note: the two sentences are separate blocks, so the line break always lands
 * on the full stop between them — `lead` above, `accent` + `tail` below. Left to wrap
 * on its own the first sentence broke as "Your college gives you a / degree.", which
 * reads as a typesetting accident.
 *
 * Within each of those two lines the text still wraps freely with `text-balance`, so
 * narrow viewports reflow onto more lines rather than overflowing.
 */
export function HeroHeadline({
  id,
  lead,
  accent,
  tail,
  className,
  "data-hero": dataHero,
}: HeroHeadlineProps) {
  return (
    <h1
      id={id}
      data-hero={dataHero}
      className={cn(
        "type-heading text-white",
        /*
          All three values are load-bearing.

          The **floor** matters as much as the cap: at `2.125rem` the headline stopped
          scaling below ~450px and pushed the block past the stage, which clips.

          The **`5vw` slope** is set so the second sentence keeps to one line as the
          viewport narrows. At the previous `7.5vw` the headline hit its 72px cap at
          1280 while the column was only 1216 wide — the sentence wrapped, the block
          grew to three lines, and at 1280×720 it overflowed its padded area and left
          the eyebrow 13px under the site header. `5vw` holds the two-line set from
          roughly 768px up, and still reaches the full 72px at 1440 and above.
        */
        "text-[clamp(1.625rem,5vw,4.5rem)]",
        "text-balance",
        // Separates the type from the bright plate behind it, so the scrim does not
        // have to be darkened further to carry the whole burden of legibility.
        "[text-shadow:0_1px_2px_rgba(0,0,0,0.45),0_6px_32px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <span className="block">{lead}</span>
      <span className="block">
        <span className="font-accent font-medium text-brand">{accent}</span> {tail}
      </span>
    </h1>
  );
}
