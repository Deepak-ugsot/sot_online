import Image from "next/image";

import type { NextOpportunityBenefit as Benefit } from "../types/next-opportunity.types";

type NextOpportunityBenefitProps = {
  benefit: Benefit;
};

/**
 * One benefit: the little render, then the claim and a line of support.
 *
 * `items-start` rather than centring the row. These renders are square-ish and the
 * copy under them is one or two lines depending on the width — centred, the icon
 * would drift down the row the moment a description wrapped, and the four of them
 * would stop sharing a line.
 *
 * A Server Component: nothing here moves on its own, and the section's reveal reaches
 * it by `data-next-opportunity` attribute.
 */
export function NextOpportunityBenefit({ benefit }: NextOpportunityBenefitProps) {
  return (
    <li data-next-opportunity="benefit" className="flex items-start gap-4">
      <Image
        src={benefit.icon.src}
        // `aria-hidden` with an empty `alt`: every one of these is a picture of the
        // thing its own title names, so describing it would make a screen reader
        // announce "globe", "magnifying glass" before each heading and teach the
        // reader nothing a sighted visitor gets from them.
        alt=""
        aria-hidden="true"
        width={benefit.icon.width}
        height={benefit.icon.height}
        // The files are 66–69px, so `h-14` (56px) never upscales them — and 56px is
        // the design's own size, a little under three times the title beside it.
        // `shrink-0` because the copy is what should give way at a narrow width.
        className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
      />

      {/* `min-w-0` so a long title wraps instead of forcing the row wider than its
          grid track — "Apply & Gain Experience" is one word from doing exactly that. */}
      <div className="min-w-0">
        <h3 className="font-display text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-snug font-medium text-ink/90">
          {benefit.title}
        </h3>

        <p className="mt-1.5 text-pretty text-[clamp(0.875rem,1.05vw,0.9375rem)] leading-[1.3] text-ink-muted">
          {benefit.description}
        </p>
      </div>
    </li>
  );
}
