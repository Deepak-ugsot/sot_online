import { techScoreDial } from "../constants/tech-score.constants";

/**
 * The ring's geometry, on the 200×200 grid the SVG draws on.
 *
 * The dash length has to be derived from the circumference rather than written as a
 * percentage — `stroke-dasharray` is in user units — so the radius is the one number
 * everything else falls out of. `stroke` is thick enough that the radius has to inset
 * by half of it, or the arc is clipped by the viewBox.
 */
const SIZE = 200;
const STROKE = 19;
const RADIUS = (SIZE - STROKE) / 2;
const LENGTH = 2 * Math.PI * RADIUS;

/**
 * The score, as a ring with the number inside it.
 *
 * **The arc is one stroked circle over another, not two arcs.** The track is the full
 * circle and the progress is the same circle dashed to `value`%, drawn on top — which
 * means the gap between the arc's two ends is exactly the remainder and can never drift
 * out of agreement with the number.
 *
 * Rotated −90° so the sweep starts at twelve o'clock. Round caps because the arc reads
 * as a filling gauge rather than a slice of a pie chart.
 *
 * The number is markup rather than part of the SVG: the reveal counts it up by writing
 * `textContent`, and it has to stay selectable, scalable text either way.
 */
export function TechScoreRing() {
  const offset = LENGTH * (1 - techScoreDial.value / 100);

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <div className="relative w-full max-w-[17rem]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full -rotate-90" aria-hidden="true">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--color-brand)"
            strokeOpacity={0.12}
            strokeWidth={STROKE}
          />
          <circle
            data-tech-score="arc"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={LENGTH}
            strokeDashoffset={offset}
          />
        </svg>

        {/* Centred over the ring rather than placed inside the SVG, so the type scales
            with the section's own type scale and not with the drawing. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span
            data-tech-score="number"
            className="text-[clamp(2.75rem,6vw,3.5rem)] leading-none font-bold tracking-[-0.03em] text-ink"
          >
            {techScoreDial.value}
          </span>
          <span className="text-[clamp(0.9375rem,2vw,1.25rem)] leading-none tracking-[0.02em] text-ink uppercase">
            {techScoreDial.caption}
          </span>
        </div>
      </div>

      <p className="max-w-[19rem] text-[0.9375rem] leading-relaxed text-ink-muted">
        {techScoreDial.description}
      </p>
    </div>
  );
}
