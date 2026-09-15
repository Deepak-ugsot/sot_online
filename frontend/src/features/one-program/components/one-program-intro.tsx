import { CtaButton } from "@/components/ui/cta-button";
import {
  oneProgramCta,
  oneProgramHeading,
  oneProgramPricing,
  oneProgramSubtitle,
} from "../constants/one-program.constants";

/**
 * The left column: the claim, what it buys, the price, and the way in.
 *
 * The price is a `<p>` rather than a heading — it is a figure, not a section of the
 * page, and promoting it to `<h3>` would put "₹50,000" into a screen reader's outline
 * between two real headings.
 *
 * `text-left` even when the column is stacked above the rails on narrow screens.
 * Centring it there would strand the footnote under the middle of the amount and break
 * the left edge the paragraph, the price and the button all share.
 */
export function OneProgramIntro() {
  return (
    <div data-one-program="intro" className="flex flex-col items-start">
      {/*
        The two lines are two `<span>`s on a `block`, not one string with a `\n`: the
        break is structural here — the accent line and the ink line are different type —
        so there is no width at which they should run together, and nothing to leave to
        `whitespace-pre-line`.
      */}
      <h2
        id="one-program-heading"
        className="type-heading text-[clamp(2rem,4.4vw,3.25rem)] font-semibold text-ink"
      >
        <span className="block font-accent font-medium text-brand">
          {oneProgramHeading.accent}
        </span>
        <span className="block">{oneProgramHeading.tail}</span>
      </h2>

      {/* `26rem` keeps the sentence to the three lines the design has it in. Left
          unbalanced deliberately — `text-pretty` fixes the orphan without evening the
          lines out, which would pull "over two years." up and cost the third line. */}
      <p className="mt-5 max-w-[26rem] font-display text-[clamp(0.9375rem,1.4vw,1.0625rem)] text-pretty text-ink-muted">
        {oneProgramSubtitle}
      </p>

      <p className="mt-8 flex items-baseline gap-1.5">
        <span className="type-heading text-[clamp(2.25rem,4.8vw,3.5rem)] font-bold text-brand">
          {oneProgramPricing.amount}
        </span>
        <span className="font-display text-[clamp(0.875rem,1.2vw,1rem)] text-ink-muted">
          {oneProgramPricing.period}
        </span>
      </p>

      <p className="mt-2 font-display text-[clamp(0.75rem,1vw,0.8125rem)] text-ink-muted">
        {oneProgramPricing.footnote}
      </p>

      {/* The site's standard CTA: dark pill, label, white arrow tile, flipping to brand
          red on hover.

          Shared `CtaButton` rather than the hand-rolled copy this used to carry. That
          copy predated the component and had drifted into the one `inverse` CTA on the
          page with no hover colour at all, while career, compete and the FAQ promo — the
          same pill on the same light ground — all resolved theirs to brand red. The
          early-start callout still hand-rolls its own and documents why: it sits on a
          brand-red card, which is the one place the red hover cannot go. */}
      <CtaButton
        href={oneProgramCta.href}
        variant="inverse"
        size="lg"
        withIcon
        className="mt-8"
      >
        {oneProgramCta.label}
      </CtaButton>
    </div>
  );
}
