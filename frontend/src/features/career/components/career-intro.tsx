import { CtaButton } from "@/components/ui/cta-button";
import {
  careerCta,
  careerHeading,
  careerParagraph,
} from "../constants/career.constants";

/**
 * Left column: keyline, heading, supporting paragraph, and the section CTA.
 *
 * Carries `data-career="intro"` so the reveal animates it as one rigid unit — see
 * `useCareerReveal` for why that matters.
 *
 * **The copy and the CTA are separate flex children** so `justify-between` can push
 * the button to the foot of the column, landing it level with the last row of the
 * highlight list opposite. With all three as siblings the spare space would be dealt
 * out *between* the heading and the paragraph too, pulling the block apart.
 */
export function CareerIntro() {
  return (
    <div
      data-career="intro"
      // `38rem` = 608px, against the 594px "why are students still confused?" measures
      // at the heading's 40px cap. The copy's own line break puts that whole phrase on
      // the second line, so a narrower column would break it again mid-phrase and the
      // heading would run to three lines. The 14px over is the whole margin there is
      // at `7xl` — see the section's own comment for where the width goes.
      //
      // The fallback face (Plus Jakarta Sans) sets wider than Neue Montreal, so the
      // licensed font only ever needs less than this.
      className="flex flex-col items-start lg:shrink lg:basis-[38rem] lg:justify-between"
    >
      <div>
        {/* Keyline. Picks up the red of the list's arrows on this side of the
            section, and gives the heading a top edge to start from rather than
            floating. */}
        <span aria-hidden="true" className="mb-6 block h-[3px] w-14 bg-brand" />

        <h2
          id="career-heading"
          className="type-heading font-semibold text-[clamp(1.75rem,3.2vw,2.5rem)] text-ink"
        >
          {/* `whitespace-pre-line` renders the newline in the copy as the intended
              line break, keeping the break in the constants file with the rest of
              the copy rather than hard-coding a <br /> here.

              It waits for `sm`, because the break is only an improvement while the
              first sentence still fits on one line. On a 375px phone it does not:
              the line wraps anyway and the forced break then strands "Degree." on a
              line of its own. Left to wrap naturally the same words come out as
              three even lines. */}
          <span className="whitespace-normal sm:whitespace-pre-line">
            {careerHeading.lead}
          </span>{" "}
          <span className="font-accent font-medium text-brand">
            {careerHeading.accent}
          </span>
        </h2>

        {/* `mb-9` is the floor, not the gap — on `lg` the column's own
            `justify-between` adds whatever is left over on top of it. */}
        <p className="mt-6 mb-9 max-w-[47rem] text-base leading-relaxed text-ink-muted">
          {careerParagraph}
        </p>
      </div>

      <CtaButton href={careerCta.href} variant="inverse" size="lg" withIcon>
        {careerCta.label}
      </CtaButton>
    </div>
  );
}
