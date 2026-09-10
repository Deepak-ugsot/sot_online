import type { TechScoreDial, TechScoreStat } from "../types/tech-score.types";

/**
 * Copy for the Tech Score section. Kept out of JSX so marketing changes never touch a
 * component — see `features/hero/constants` for the same pattern.
 */

export const techScoreHeading = {
  lead: "The",
  accent: "uGSOT Beyond",
  tail: "Tech Score.",
} as const;

/** Straight quotes, not curly: the line is a question being quoted back, not dialogue. */
export const techScoreSubtitle =
  'You should never have to ask: "Am I actually getting better?"';

export const techScoreDial: TechScoreDial = {
  value: 67,
  caption: "Tech Score",
  description:
    "A holistic score based on your learning, practice, projects, contributions and more.",
};

/**
 * The six cards, in reading order.
 *
 * Order is the layout: at three columns this fills left-to-right, top row then bottom,
 * and the same list stacks two-up and then one-up unchanged. The two cards carrying a
 * chart (`cohort`, `rating`) sit on opposite rows on purpose — three charts in a row
 * would read as one wide graph broken into thirds.
 */
export const techScoreStats: readonly TechScoreStat[] = [
  { id: "cohort", value: "Top 18%", label: "of Cohort" },
  { id: "streak", value: "24 days", label: "Coding Streak" },
  { id: "shipped", value: "3", label: "Projects Shipped" },
  { id: "contributions", value: "18", label: "Open-Source Contributions" },
  { id: "rating", value: "Rating", label: "Codeforce Improvement" },
  { id: "hackathons", value: "2", label: "Hackathons Entered" },
] as const;

/**
 * Animation hooks, by `data-tech-score` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `CAREER_OS_SELECTORS`.
 */
export const TECH_SCORE_SELECTORS = {
  card: '[data-tech-score="card"]',
  arc: '[data-tech-score="arc"]',
  number: '[data-tech-score="number"]',
  stat: '[data-tech-score="stat"]',
} as const;
