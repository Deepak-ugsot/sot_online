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
 * The hero's `<h1>`: a display-sans lead, a serif accent in brand red, then a
 * display-sans tail.
 *
 * All three parts live in one heading element so screen readers announce a single
 * continuous phrase.
 *
 * Sizing note: the tail is a block, so it always begins its own line — the lead
 * and accent read as one phrase above it. Within each of those two lines the text
 * still wraps freely with `text-balance`, so narrow viewports reflow onto more
 * lines instead of overflowing.
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
        // The floor matters as much as the cap. At `2.125rem` the headline stopped
        // scaling below ~450px, so on a 320px phone it ran to five lines and pushed
        // the block past the stage, which clips. `1.75rem` lets it keep shrinking.
        "text-[clamp(1.75rem,7.5vw,4.5rem)]",
        "text-balance",
        // Separates the type from the bright plate behind it, so the scrim does not
        // have to be darkened further to carry the whole burden of legibility.
        "[text-shadow:0_1px_2px_rgba(0,0,0,0.45),0_6px_32px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      {lead}{" "}
      <span className="font-accent font-medium text-brand">{accent}</span>{" "}
      <span className="block">{tail}</span>
    </h1>
  );
}
