import type { EarlyStartStep } from "../types/early-start.types";

type EarlyStartTimelineProps = {
  steps: readonly EarlyStartStep[];
};

/**
 * The six stages as an ordered list, with a rail drawn through their markers as the
 * reader scrolls.
 *
 * `<ol>`, not `<ul>` or a stack of `<div>`s: the order is the section's entire
 * argument — learn before you build, build before you apply — so a reader who never
 * sees the rail still gets the sequence from the markup.
 *
 * **The rail is one SVG segment per step, not a single line down the list.** A single
 * line would have to be absolutely positioned, which means knowing where the first and
 * last markers sit — an offset that moves with the type scale at every breakpoint and
 * would have to be re-measured in JS to stay exact. Each step instead owns the segment
 * *below its own dot*, so the geometry is pure layout: the segment is a flex child that
 * fills whatever space is left between one dot and the next, at every width, with no
 * measurement involved. `useEarlyStartReveal` then draws the segments back to back, and
 * because they are collinear and contiguous the result is one line being traced.
 *
 * The vertical rhythm is padding on the *text* column rather than a `gap` on the list,
 * so the marker column stretches the full height of each row and its segment has
 * somewhere to reach. A `gap` would leave the rail broken between every step.
 */
export function EarlyStartTimeline({ steps }: EarlyStartTimelineProps) {
  return (
    <ol data-early-start="list" className="flex flex-col">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.id}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 sm:gap-x-5"
          >
            <div className="flex flex-col items-center">
              {/*
                `mt-[0.4rem]` centres the dot on the title's first line rather than on
                the row: an `items-center` marker would drift downward as soon as a
                title wrapped to two lines, which "Become Internship Ready" does on a
                phone. The halo is a ring rather than a second element so it cannot
                take part in layout and push the rail off-centre.
              */}
              <span
                aria-hidden="true"
                data-early-start="dot"
                className="mt-[0.4rem] h-3.5 w-3.5 shrink-0 rounded-full bg-brand ring-[5px] ring-brand/15"
              />

              {/*
                The segment is a plain `div` that flexes, with the SVG absolutely
                filling it — the SVG cannot be the flex child itself.

                An `<svg>` is a replaced element carrying an intrinsic 150×150, and that
                intrinsic height is what a flex container measures its own content-based
                height from. The column would therefore size *itself* from the segment
                and stand 150px tall in every row, instead of the segment filling
                whatever the row left over. Neither `flex-1` nor `min-h-0` nor an
                explicit `height: 0` gets around it: they change how the item is flexed,
                not what it contributes to the measurement that decides the space being
                flexed. Taking the SVG out of flow removes the contribution entirely, and
                `inset-0` then gives it a definite box to fill.

                No `viewBox`, deliberately: without one the SVG's user units are its own
                CSS pixels, so `y2="100%"` is exactly the height the box gave it and the
                1px stroke renders at 1px. A `viewBox` would need
                `preserveAspectRatio="none"`, and the non-uniform scale that follows
                distorts both the stroke weight and the dash pattern the draw depends on.

                `pathLength={1}` restates the segment's length as 1 unit, which is what
                lets one `strokeDasharray` cover segments of different heights: the dash
                is the whole line and the gap after it is the whole line, so a
                `strokeDashoffset` of 1 hides the segment and 0 draws it in full,
                whatever its real height. The offset is left at its initial 0 here — the
                segments are drawn by default, and only the reveal hook takes them away
                to draw back in.
              */}
              {!isLast && (
                <div
                  data-early-start="rail"
                  className="relative mt-1 w-px min-h-0 flex-1"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="absolute inset-0 h-full w-full"
                  >
                    <line
                      x1="0.5"
                      y1="0"
                      x2="0.5"
                      y2="100%"
                      pathLength={1}
                      strokeDasharray={1}
                      strokeWidth={1}
                      className="stroke-brand/45"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div
              data-early-start="copy"
              className={isLast ? "" : "pb-7 sm:pb-8"}
            >
              <h3 className="font-display text-[clamp(1.0625rem,1.5vw,1.25rem)] font-medium text-ink">
                {step.title}
              </h3>

              <p className="mt-1.5 font-display text-[clamp(0.875rem,1.15vw,1rem)] text-pretty text-ink-muted">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
