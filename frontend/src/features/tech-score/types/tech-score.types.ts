/**
 * One stat card, by identity rather than by index.
 *
 * The id is the join between three things that have to stay in step: the copy in the
 * constants, the plate glyph, and the figure drawn under it. Keying all three off one
 * union means a new card is a type error until every part of it exists, instead of a
 * card that silently renders with no icon.
 */
export type TechScoreStatId =
  | "cohort"
  | "streak"
  | "shipped"
  | "contributions"
  | "rating"
  | "hackathons";

/** One card in the six-up grid: a plate, a headline figure, and what it counts. */
export type TechScoreStat = {
  id: TechScoreStatId;
  /** The headline figure. Kept short — it is the largest type on the card. */
  value: string;
  /** What the figure counts. */
  label: string;
};

/** The ring, the number inside it, and the sentence underneath. */
export type TechScoreDial = {
  /** 0–100. Drives both the printed number and how far the arc sweeps. */
  value: number;
  /** The words under the number, inside the ring. */
  caption: string;
  /** The sentence under the ring. */
  description: string;
};

/**
 * A developer tool with a mark in the chip rows.
 *
 * These are third-party logos — see `TOOL_CHIPS` for what using them here assumes.
 */
export type TechScoreToolName = "github" | "vscode" | "gitlab" | "vercel";
