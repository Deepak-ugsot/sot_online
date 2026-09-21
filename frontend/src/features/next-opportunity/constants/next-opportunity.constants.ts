import type {
  NextOpportunityArtwork,
  NextOpportunityBenefit,
  NextOpportunityHeadingCopy,
  NextOpportunityLogo,
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
  "Get access to the Internshala ecosystem through SOT Catalyst. Explore internships and career opportunities across industries, discover roles that match your skills and interests, and gain real world experience while you're still in college.";

/** Artwork lives in `public/assets/next_opportunity/`. */
const opportunityImage = (file: string) =>
  `/assets/next_opportunity/${file}.png`;

/**
 * The partnership lockup over the heading: our mark, a multiplication sign, theirs.
 *
 * Both files are the design's own exports at 1× (49px tall), which is the height the
 * lockup is set at — they are soft on a high-density screen, and a vector of either
 * mark is the fix if that ever matters. The sign between them is Lucide's `X` rather
 * than the PNG the design shipped it as, so it stays sharp at any density.
 */
export const nextOpportunityPartners: {
  ours: NextOpportunityLogo;
  theirs: NextOpportunityLogo;
} = {
  ours: {
    src: opportunityImage("upgrad_school_of_technology"),
    alt: "upGrad School of Technology",
    width: 151,
    height: 49,
  },
  theirs: {
    src: opportunityImage("internshala_logo"),
    alt: "Internshala",
    width: 159,
    height: 49,
  },
} as const;

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
 * The section's render — the Internshala search on a laptop, with the kinds of
 * opportunity it finds floating round it. 2045×2080, a cut-out on transparency; see the
 * type for why it needs no plate.
 */
export const nextOpportunityArtwork: NextOpportunityArtwork = {
  src: opportunityImage("internshala_ecosystem"),
  alt: "A laptop showing an Internshala internship search, surrounded by cards for internships, top companies, remote and on-site roles, applying, a globe, and opportunities beyond borders — with a checklist reading learn, apply, grow.",
  width: 2045,
  height: 2080,
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
