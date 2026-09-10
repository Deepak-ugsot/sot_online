import type { CompeteHighlight } from "../types/compete.types";

/**
 * Copy and artwork for the Compete section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the pattern.
 */

/**
 * Two sentences, and the break between them is the point — "Compete." lands alone on
 * its own line. The `\n` is rendered with `whitespace-pre-line` so the break stays here
 * with the copy rather than becoming a `<br />` in the component.
 *
 * **No accent half.** Unlike every other heading on the page this one is ink
 * throughout, which is what the reference does: the red in this section is carried by
 * the four icons instead.
 */
export const competeHeading = "Don't just learn to code.\nCompete.";

export const competeDescription =
  "Competitive programming changes how you think speed, logic, algorithms and problem solving under pressure.";

/** `#apply` is the page-wide admissions anchor every primary CTA points at. */
export const competeCta = {
  label: "Apply to uGSOT Beyond",
  href: "#apply",
} as const;

/**
 * Artwork lives in `public/assets/compete/`.
 *
 * **The filenames' capitalisation is load-bearing** — they are passed through
 * verbatim, and macOS resolves `structured_preparation.png` just fine where the Linux
 * deploy target does not.
 */
const competeIcon = (file: string) => `/assets/compete/${file}`;

/**
 * The four highlights, in reading order down each column.
 *
 * Their order here is also their order when the section stacks on a phone, which is
 * why the two `preparation` items come first: on a narrow screen the roadmap should be
 * read before the platforms it leads to.
 */
export const competeHighlights: readonly CompeteHighlight[] = [
  {
    id: "structured-preparation",
    title: "Structured Preparation",
    description:
      "A clear roadmap from fundamentals to advanced problem solving.",
    column: "preparation",
    image: {
      src: competeIcon("Structured_Preparation.png"),
      width: 174,
      height: 155,
    },
  },
  {
    id: "practice-compete",
    title: "Practice & Compete",
    description: "Regular contests, peer leaderboards, and team formation.",
    column: "preparation",
    image: { src: competeIcon("Practice_Compete.png"), width: 180, height: 154 },
  },
  {
    id: "platforms",
    title: "Platforms & Opportunities",
    description: "Codeforces, CodeChef, ICPC, open source, and more.",
    column: "platforms",
    image: {
      src: competeIcon("Platforms_Opportunities.png"),
      width: 174,
      height: 155,
    },
  },
  {
    id: "guidance",
    title: "Guidance & Career Growth",
    description:
      "Mentor support to crack internships, GSoC, and build a great engineering career.",
    column: "platforms",
    image: {
      src: competeIcon("Guidance_CareerGrowth.png"),
      width: 174,
      height: 155,
    },
  },
] as const;

/**
 * Animation hooks, by `data-compete` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `GLOBAL_AMBITION_SELECTORS`.
 *
 * `introItem` reaches the pitch's three parts — heading, paragraph, CTA — through the
 * intro's own children rather than tagging each one. They are spaced by `mt-*`
 * margins, not a flex gap, so they can travel separately without the space between
 * them animating too.
 */
export const COMPETE_SELECTORS = {
  intro: '[data-compete="intro"]',
  introItem: '[data-compete="intro"] > *',
  item: '[data-compete="item"]',
  itemIcon: '[data-compete="item-icon"]',
  itemCopy: '[data-compete="item-copy"]',
} as const;
