import type { CareerHeadingCopy, CareerHighlight } from "../types/career.types";

/**
 * All copy for the Career section. Kept out of JSX so marketing changes never touch
 * a component — see `features/hero/constants` for the same pattern.
 */

export const careerHeading: CareerHeadingCopy = {
  lead: "College Gives You a Degree.\nWe Help You",
  accent: "Build a Career.",
};

export const careerParagraph =
  "Most colleges teach subjects. We prepare Future Software Engineers for real software engineering careers — hands-on, project-first, and mentor-led.";

export const careerCta = {
  label: "Explore the Curriculum",
  href: "#curriculum",
} as const;

export const careerHighlights: readonly CareerHighlight[] = [
  { id: "hands-on", label: "Hands-On, Project-First Learning" },
  { id: "mentorship", label: "Direct Industry Mentorship" },
  { id: "real-products", label: "Real Products, Real Problems" },
  { id: "career-os", label: "Personalized Career OS" },
  { id: "readiness", label: "Career Readiness From Day One" },
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
