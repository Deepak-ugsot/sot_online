import { CtaButton } from "@/components/ui/cta-button";
import {
  competeCta,
  competeDescription,
  competeHeading,
  competeHighlights,
} from "../constants/compete.constants";
import { CompeteHighlight } from "./compete-highlight";

/**
 * "Don't just learn to code. Compete." — the pitch and its CTA on the left, four
 * highlights in two columns to the right of it.
 *
 * **The two highlight columns are deliberately staggered.** The platforms column runs
 * from the top of the section, level with the heading; the preparation column starts
 * lower, level with the CTA. That offset is the reference's own composition — it is
 * what stops the right-hand half reading as a plain 2×2 grid — and it is `lg:` only,
 * because below that everything is one column and there is nothing to stagger against.
 *
 * A Server Component: nothing here has state or motion.
 */
export function CompeteSection() {
  const preparation = competeHighlights.filter((h) => h.column === "preparation");
  const platforms = competeHighlights.filter((h) => h.column === "platforms");

  return (
    <section
      id="compete"
      aria-labelledby="compete-heading"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      {/* `84rem` matches the career and mentors sections, so the page keeps one
          measure down its length. */}
      <div className="mx-auto max-w-[84rem] px-6">
        {/* The three shares are set by their longest unbreakable line: the heading in
            the first, "Structured Preparation" in the second, and "Platforms &
            Opportunities" in the third — that last one wrapped to two lines at an even
            split, which the reference does not do. */}
        <div className="grid grid-cols-1 gap-y-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-x-10 lg:gap-y-12 xl:gap-x-14">
          <div>
            {/* The `2.25rem` cap and the column's `1.15fr` share are one decision:
                "Don't just learn to code." has to hold a single line, or the copy's own
                break stops meaning anything and the heading runs to three lines. It
                measures ~423px at this cap against a ~451px column. */}
            <h2
              id="compete-heading"
              className="type-heading text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold text-ink"
            >
              {/* `whitespace-pre-line` renders the `\n` in the copy as the intended
                  break, so "Compete." lands on its own line. */}
              <span className="whitespace-pre-line">{competeHeading}</span>
            </h2>

            <p className="mt-6 max-w-[30rem] text-[clamp(0.875rem,1.1vw,1.0625rem)] leading-relaxed text-ink-muted">
              {competeDescription}
            </p>

            <CtaButton
              href={competeCta.href}
              variant="inverse"
              size="lg"
              withIcon
              className="mt-9 lg:mt-12"
            >
              {competeCta.label}
            </CtaButton>
          </div>

          {/*
            `lg:pt-[15.3rem]` is the stagger — it drops this column to sit level with the CTA
            in the column beside it. A fixed value rather than something derived: the
            left column's height above the CTA is set by two blocks of editable copy,
            so there is nothing stable to align to programmatically.
          */}
          {/* `mt-10` below `lg` is the only gap between the CTA and the list; the grid's
              row gap is zeroed there so the two lists sit flush and their rules space
              every row identically. */}
          <ul className="mt-10 list-none lg:mt-0 lg:pt-[15.3rem]">
            {preparation.map((highlight, index) => (
              <CompeteHighlight
                key={highlight.id}
                highlight={highlight}
                isFirstInColumn={index === 0}
                isFirstOverall={index === 0}
              />
            ))}
          </ul>

          {/*
            The vertical rule between the two highlight columns. A `border-l` on this
            column rather than a separate element, so it is exactly as tall as the
            column's own content and needs no height of its own.
          */}
          <ul className="list-none lg:border-l lg:border-black/10 lg:pl-10 xl:pl-14">
            {platforms.map((highlight, index) => (
              <CompeteHighlight
                key={highlight.id}
                highlight={highlight}
                isFirstInColumn={index === 0}
                isFirstOverall={false}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
