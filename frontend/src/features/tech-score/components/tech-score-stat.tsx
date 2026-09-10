import { Box, ChartLine, Flame, Trophy, Users, type LucideIcon } from "lucide-react";

import type { TechScoreStat, TechScoreStatId } from "../types/tech-score.types";
import { TechScoreFigure } from "./tech-score-figure";
import { ToolMark } from "./tech-score-marks";

/**
 * The glyph in each card's plate, by card rather than by name.
 *
 * Keying on the card's id — rather than letting the constants name a glyph — means the
 * copy file cannot pick an icon that contradicts the figure underneath it, and a new
 * card is a type error here until it has one.
 *
 * Lucide for five of the six, for the reason `beyond-college`'s icon map gives: these
 * are generic UI glyphs with no house style, and Lucide draws them on one grid at one
 * optical weight. Open-Source Contributions is the exception — the plate is the GitHub
 * mark itself, which Lucide dropped when it removed brand icons.
 */
const PLATE_ICONS: Record<TechScoreStatId, LucideIcon | null> = {
  /** The cohort you are ranked within. */
  cohort: Users,
  /** A streak, as the flame every tracker draws it as. */
  streak: Flame,
  /** A shipped project, as a package rather than a rocket. */
  shipped: Box,
  /** Drawn from the mark map instead — see below. */
  contributions: null,
  /** A rating over time, as the line it traces. */
  rating: ChartLine,
  /** A placing. */
  hackathons: Trophy,
};

/**
 * One stat card: a plate, the figure it counts, and a graphic along the foot.
 *
 * `h-full` with the figure's `mt-auto` is what aligns the six graphics across both
 * rows. The grid stretches every card to its row's height, and pushing the figure to
 * the bottom means a card whose label wraps to two lines grows in the middle rather
 * than shunting its graphic down out of line with its neighbours.
 */
export function TechScoreStat({ stat }: { stat: TechScoreStat }) {
  const Icon = PLATE_ICONS[stat.id];

  return (
    <article
      data-tech-score="stat"
      className="flex h-full flex-col rounded-[1rem] border border-black/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(10,10,11,0.03)] sm:rounded-[1.25rem] sm:p-5"
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.75rem] bg-brand text-white sm:h-11 sm:w-11 sm:rounded-[0.875rem]"
      >
        {Icon ? (
          <Icon className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" strokeWidth={1.9} />
        ) : (
          <ToolMark tool="github" className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
        )}
      </span>

      <p className="mt-4 text-[1.25rem] leading-none font-bold tracking-[-0.02em] text-ink sm:mt-5 sm:text-[1.5rem]">
        {stat.value}
      </p>

      <p className="mt-1.5 text-[0.75rem] leading-snug text-ink-muted sm:mt-2 sm:text-[0.8125rem]">
        {stat.label}
      </p>

      <TechScoreFigure id={stat.id} />
    </article>
  );
}
