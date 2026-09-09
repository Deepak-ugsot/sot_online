import type {
  EcosystemClosingCopy,
  EcosystemHeadingCopy,
  EcosystemLogo,
  EcosystemStat,
} from "../types/ecosystem.types";

/**
 * Copy and data for the Ecosystem section. Kept out of JSX so marketing changes never
 * touch a component — see `features/hero/constants` for the same pattern.
 */

/**
 * `tail` carries the line break as a `\n`, rendered with `whitespace-pre-line` in the
 * component so the break stays here with the rest of the copy rather than becoming a
 * `<br />` in JSX. "Designed" closes line one; "To Reach Beyond The Campus." is line
 * two on its own.
 */
export const ecosystemHeading: EcosystemHeadingCopy = {
  lead: "Built by",
  accent: "upGrad School of Technology.",
  tail: "Designed\nTo Reach Beyond The Campus.",
};

export const ecosystemSubtitle =
  "uGSOT Campus is building a full-time campus technology education experience. uGSOT Beyond takes a focused technology-acceleration layer to ambitious students who are already pursuing degrees elsewhere.";

/** The line under the stats, naming the brand once more before the section ends. */
export const ecosystemClosing: EcosystemClosingCopy = {
  lead: "The",
  accent: "uGSOT technology",
  tail: "ecosystem now accessible from wherever you study.",
};

/**
 * Brand artwork, in `public/assets/ecosystem/`.
 *
 * **The filename is the logo's `id`**, the same convention the showcase uses, so a
 * card and its artwork cannot drift apart.
 *
 * The files are small transparent PNGs (74–124px wide) sized for a 106px content box,
 * so they are served as-is rather than through a responsive ladder.
 */
const ecosystemImage = (id: string) => `/assets/ecosystem/${id}.png`;

/**
 * Order is the collage's left-to-right order. Later cards paint over earlier ones,
 * which is what the negative margin between them relies on — reordering this list
 * re-stacks the fan.
 *
 * **A negative `rotation` leans the card inward, a positive one outward.** The fan is
 * inward, outward, outward, then inward for the last three, so the row opens up in
 * the middle and closes at both ends.
 */
export const ecosystemLogos: readonly EcosystemLogo[] = [
  {
    id: "upgrad",
    name: "upGrad",
    width: 74,
    height: 87,
    rotation: -27,
    image: ecosystemImage("upgrad"),
  },
  {
    id: "internshala",
    name: "Internshala",
    width: 121,
    height: 37,
    rotation: 18,
    image: ecosystemImage("internshala"),
  },
  {
    id: "upgrad_enterprise",
    name: "upGrad Enterprise",
    width: 90,
    height: 90,
    rotation: 12,
    image: ecosystemImage("upgrad_enterprise"),
  },
  {
    id: "upgrad_abroad",
    name: "upGrad Abroad",
    width: 123,
    height: 38,
    rotation: -13,
    image: ecosystemImage("upgrad_abroad"),
  },
  {
    id: "upgrad_rekrut",
    name: "upGrad Rekrut",
    width: 122,
    height: 62,
    rotation: -3,
    image: ecosystemImage("upgrad_rekrut"),
  },
  {
    id: "upgrad_knowledgehut",
    name: "upGrad KnowledgeHut",
    width: 124,
    height: 45,
    rotation: -8,
    image: ecosystemImage("upgrad_knowledgehut"),
  },
] as const;

export const ecosystemStats: readonly EcosystemStat[] = [
  { label: "Learners", value: "10 M+" },
  { label: "Hiring Partners", value: "3000+" },
  { label: "Global Universities", value: "300+" },
  { label: "Countries", value: "70+" },
  { label: "Placements", value: "110K+" },
  { label: "Corporate clients trained annually", value: "600+" },
  { label: "Internships Enabled", value: "28L+" },
] as const;

/**
 * Animation hooks, by `data-ecosystem` attribute rather than class name, so restyling
 * a component can never silently break the reveal or the tilt. Mirrors `HERO_SELECTORS`.
 */
export const ECOSYSTEM_SELECTORS = {
  heading: '[data-ecosystem="heading"]',
  collage: '[data-ecosystem="collage"]',
  card: '[data-ecosystem="card"]',
  stats: '[data-ecosystem="stats"]',
  closing: '[data-ecosystem="closing"]',
} as const;
