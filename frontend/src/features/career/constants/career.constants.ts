import type { CareerHeadingCopy, CareerHighlight } from "../types/career.types";

/**
 * All copy for the Career section. Kept out of JSX so marketing changes never touch
 * a component — see `features/hero/constants` for the same pattern.
 */

export const careerHeading: CareerHeadingCopy = {
  lead: "The internet has everything. So\nwhy are",
  accent: "students still confused?",
};

export const careerParagraph =
  "Because the problem isn't finding content. It's answering the questions that actually matter.";

export const careerCta = {
  label: "Explore the Curriculum",
  href: "#curriculum",
} as const;

/**
 * The five questions the heading says students cannot answer — so these are phrased
 * as questions, in the student's own voice, rather than as the feature labels they
 * used to be. The list is the heading's evidence, which is why it reads as a set of
 * open questions and not as a list of what the programme sells.
 */
export const careerHighlights: readonly CareerHighlight[] = [
  { id: "what-to-learn", label: "What should I learn & in what order?" },
  { id: "how-deeply", label: "How deeply should I learn & practice?" },
  { id: "what-to-build", label: "What should I build & how do I improve?" },
  {
    id: "what-to-pursue",
    label: "Which competitions, projects & internships should I pursue?",
  },
  { id: "am-i-improving", label: "How do I know I'm actually getting better?" },
] as const;

/**
 * Animation hooks, by `data-career` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const CAREER_SELECTORS = {
  intro: '[data-career="intro"]',
  list: '[data-career="list"]',
  item: '[data-career="item"]',
} as const;
