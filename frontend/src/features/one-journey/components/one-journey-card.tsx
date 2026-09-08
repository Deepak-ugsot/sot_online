import { cn } from "@/lib/utils";
import type { OneJourneyCard as OneJourneyCardData } from "../types/one-journey.types";

type OneJourneyCardProps = {
  card: OneJourneyCardData;
};

const toneClasses = {
  /* The same gradient the "uGSOT BEYOND" panel carries in `features/beyond-college`,
     so the two red surfaces on the page read as one material rather than as two
     different reds. Kept as a literal here rather than shared: they are two features,
     and a token for one gradient used twice would be a scale that does not exist. */
  brand:
    "bg-[linear-gradient(147deg,#ee1a24_0%,#e6161f_40%,#b90c14_100%)] text-white ring-1 ring-black/10",
  /* A hairline outline rather than a shadow alone: on the section's near-white ground
     a white card with only a shadow loses its edges where it overlaps another white
     card, and two of these four do exactly that. */
  plain: "bg-white text-ink ring-1 ring-ink/85",
} as const;

/**
 * One card in the deck.
 *
 * **Absolutely placed from `lg` up, in flow below it.** The scatter is the point of
 * this section — four cards overlapping at four angles — and that cannot be built in
 * flow. It also cannot survive a phone: at 375px a card is the full column, so there
 * is nothing to overlap *with* and a turned card would only clip its own corners
 * against the viewport. Below `lg` they become an ordinary square stack.
 *
 * **No `rotate-*` class.** The card rotates *into* its angle as it lands, so GSAP owns
 * the rotation; the angle lives in the card's data. A CSS `rotate` would be folded
 * into GSAP's transform on the first write anyway, leaving two owners for one value.
 */
export function OneJourneyCard({ card }: OneJourneyCardProps) {
  return (
    <article
      data-one-journey="card"
      className={cn(
        "rounded-[1.375rem] p-4 sm:p-6 lg:p-7",
        "shadow-[0_22px_50px_-30px_rgba(10,10,11,0.45)]",
        toneClasses[card.tone],
        "lg:absolute",
        card.placementClassName,
      )}
    >
      <h3 className="type-heading text-[clamp(1.125rem,1.9vw,1.75rem)]">
        {card.title}
      </h3>

      <p
        className={cn(
          "mt-2 text-[clamp(0.8125rem,1.05vw,1rem)] leading-relaxed sm:mt-3",
          card.tone === "brand" ? "text-white/90" : "text-ink-muted",
        )}
      >
        {card.description}
      </p>
    </article>
  );
}
