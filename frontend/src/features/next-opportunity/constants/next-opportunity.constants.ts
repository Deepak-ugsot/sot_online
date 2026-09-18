import type {
  NextOpportunityArtwork,
  NextOpportunityBenefit,
  NextOpportunityHeadingCopy,
} from "../types/next-opportunity.types";

/**
 * Copy and artwork for the Next Opportunity section. Kept out of JSX so marketing
 * changes never touch a component — see `features/hero/constants` for the pattern.
 */

export const nextOpportunityHeading: NextOpportunityHeadingCopy = {
  lead: "Your Next Opportunity",
  trail: "Could Be",
  accent: "Anywhere.",
} as const;

export const nextOpportunityDescription =
  "Get access to internship opportunities across the world through Internshala. Explore roles that match your skills, interests, and career goals and gain real-world experience while you're still in college.";

/** Artwork lives in `public/assets/next_opportunity/`. */
const opportunityImage = (file: string) =>
  `/assets/next_opportunity/${file}.png`;

/**
 * The four benefits, in the order the design reads them: across the top row, then
 * across the bottom.
 *
 * The order is an argument — where the work is, what the work is, how you do it, and
 * then applying — so it is rendered as a list and a new item goes in at the point it
 * belongs rather than at the end.
 */
export const nextOpportunityBenefits: readonly NextOpportunityBenefit[] = [
  {
    id: "global",
    title: "Global Opportunities",
    description: "Explore internships beyond your college and city.",
    icon: {
      src: opportunityImage("global_opportunities"),
      width: 66,
      height: 67,
    },
  },
  {
    id: "relevant",
    title: "Relevant Roles",
    description: "Discover opportunities based on your skills and interests.",
    icon: { src: opportunityImage("relevant_roles"), width: 69, height: 66 },
  },
  {
    id: "remote-onsite",
    title: "Remote & On-site",
    description: "Choose from different ways to gain real-world experience.",
    icon: { src: opportunityImage("remote_onsite"), width: 69, height: 66 },
  },
  {
    id: "apply",
    title: "Apply & Gain Experience",
    description:
      "Take your skills beyond the classroom and start building your career.",
    icon: {
      src: opportunityImage("apply_gain_experience"),
      width: 69,
      height: 66,
    },
  },
] as const;

/**
 * The section's render.
 *
 * The Internshala board is part of the file, so the brand is credited by the artwork
 * rather than by a logo of our own. It is the same claim `features/early-start` makes
 * with the wordmark set inline in its subtitle — if the brand ever ships a new mark,
 * that one changes here and this one changes with the render.
 */
export const nextOpportunityArtwork: NextOpportunityArtwork = {
  src: opportunityImage("internshala_astronaut"),
  alt: "An astronaut above the globe holding up an Internshala board, with location pins marking internships around the world.",
  width: 597,
  height: 543,
} as const;

/**
 * Animation hooks, by `data-next-opportunity` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors
 * `EARLY_START_SELECTORS`.
 */
export const NEXT_OPPORTUNITY_SELECTORS = {
  copy: '[data-next-opportunity="copy"]',
  benefit: '[data-next-opportunity="benefit"]',
  artwork: '[data-next-opportunity="artwork"]',
} as const;
