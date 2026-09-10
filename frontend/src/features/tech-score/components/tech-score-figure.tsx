import { Medal, Trophy } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type {
  TechScoreStatId,
  TechScoreToolName,
} from "../types/tech-score.types";
import { TOOL_MARKS, ToolMark } from "./tech-score-marks";

/**
 * The strip of graphic under each card's copy.
 *
 * Three of the six draw a chart, three draw a row of chips. They share a fixed height
 * so the six cards' figures line up across both rows — the grid stretches the cards to
 * equal height, and a figure that sized itself to its own content would leave the
 * charts and the chips sitting at different baselines.
 */

/** Every figure occupies the same band at the foot of its card. */
const FIGURE = "mt-auto h-[4.5rem] w-full pt-3";

/* -------------------------------------------------------------------------- */

/** One tool, as a mark on its own circular plate. */
function ToolChip({ tool }: { tool: TechScoreToolName }) {
  const chip = TOOL_MARKS[tool];

  return (
    <span
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full",
        chip.plate,
        chip.ink,
      )}
    >
      <ToolMark tool={tool} className="h-[1.125rem] w-[1.125rem]" />
    </span>
  );
}

/**
 * A row of tool chips, spaced rather than overlapped.
 *
 * Overlapping them was the first draft and it does not work here: a stack reads as
 * "and N more" — the cohort-strip idiom — where this row is an enumeration of every
 * tool, and four marks in four different brand colours turn into mush at the seams.
 */
function ToolRow({ tools }: { tools: readonly TechScoreToolName[] }) {
  return (
    <div className={cn(FIGURE, "flex items-center gap-2")}>
      {tools.map((tool) => (
        <ToolChip key={tool} tool={tool} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The rising curve, shared by the two chart cards — only the hue changes.
 *
 * Stretched to the figure band with `preserveAspectRatio="none"`, so the stroke carries
 * `vector-effect="non-scaling-stroke"` to hold its weight through the non-uniform
 * scale. Drawn as an S rather than a straight climb: a line that starts flat, turns,
 * and levels off reads as a trajectory, where a diagonal reads as a decoration.
 */
const CURVE = "M0 60C32 60 50 57 76 46C102 35 120 13 158 8C188 4 214 5 240 5";
const CURVE_AREA = `${CURVE}L240 72L0 72Z`;

function Curve({ id, color }: { id: string; color: string }) {
  return (
    <div className={FIGURE}>
      <svg viewBox="0 0 240 72" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={CURVE_AREA} fill={`url(#${id})`} />
        <path
          d={CURVE}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Nine days of a streak, as percentages of the band.
 *
 * Written out rather than generated from a formula: the shape — a slow start that
 * steepens — is the illustration, and an even ramp reads as a chart axis rather than as
 * momentum.
 */
const STREAK_BARS = [17, 28, 36, 47, 56, 67, 78, 89, 100] as const;

/** Coding Streak — the run of days, each taller and more solid than the last. */
function StreakBars() {
  return (
    // Capped rather than full-bleed: the bars are `flex-1`, so on the wide card the
    // one- and two-column layouts hand this tile they would grow into slabs. The cap
    // holds them at roughly the width they are drawn at, and the row sits left.
    <div className={cn(FIGURE, "flex max-w-[15rem] items-end gap-[3.5%]")}>
      {STREAK_BARS.map((height, index) => (
        <span
          key={height}
          className="flex-1 rounded-full bg-brand"
          style={{
            height: `${height}%`,
            // A ramp rather than a flat fill: the bars gain weight as they gain height,
            // so the run reads as building even where two neighbours are close.
            opacity: 0.28 + (0.72 * index) / (STREAK_BARS.length - 1),
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Hackathons Entered — the two placings, as outlined badges rather than filled chips. */
function HackathonBadges() {
  return (
    <div className={cn(FIGURE, "flex items-center gap-2.5")}>
      <span className="grid h-9 w-9 place-items-center rounded-full border border-brand/25 text-brand">
        <Trophy className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
      </span>
      <span className="grid h-9 w-9 place-items-center rounded-full border border-[#F59E0B]/35 text-[#F59E0B]">
        <Medal className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Gradient ids are module-level literals, not generated per render.
 *
 * Each one appears exactly once in the document — there is a single Tech Score section
 * on the page — so a stable id is safe, and it keeps the server and client markup
 * identical. A `useId` here would be a hydration-safe answer to a problem this section
 * does not have.
 */
const figures: Record<TechScoreStatId, () => ReactNode> = {
  cohort: () => <Curve id="tech-score-cohort" color="var(--color-brand)" />,
  streak: StreakBars,
  shipped: () => <ToolRow tools={["github", "vscode", "gitlab"]} />,
  contributions: () => <ToolRow tools={["github", "vscode", "gitlab", "vercel"]} />,
  rating: () => <Curve id="tech-score-rating" color="#F59E0B" />,
  hackathons: HackathonBadges,
};

/**
 * The figure for a stat card.
 *
 * Purely decorative: each one restates the value and label directly above it, so it is
 * hidden from assistive tech rather than reading its parts out of context.
 *
 * **And dropped entirely below `560px`**, where the grid is two-up and a tile's content
 * box is ~120px. A chart squeezed into that is a smear, and the Open-Source card's four
 * brand chips need 168px — they cannot shrink to fit and stay recognisable as marks.
 * Since the figure only ever restated the number above it, losing it there costs no
 * information; the tile keeps the plate, the value and the label.
 *
 * `contents` rather than `block` at the breakpoint, so the figure stays a direct flex
 * child of the card and its `mt-auto` still reaches the card's foot.
 */
export function TechScoreFigure({ id }: { id: TechScoreStatId }) {
  const Figure = figures[id];

  return (
    <div aria-hidden="true" className="hidden select-none min-[560px]:contents">
      <Figure />
    </div>
  );
}
