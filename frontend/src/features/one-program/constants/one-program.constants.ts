import type {
  OneProgramCapability,
  OneProgramCta,
  OneProgramHeadingCopy,
  OneProgramPricing,
  OneProgramRail,
} from "../types/one-program.types";

/**
 * Copy and data for the One Program section. Kept out of JSX so marketing changes never
 * touch a component — see `features/hero/constants` for the same pattern.
 */

export const oneProgramHeading: OneProgramHeadingCopy = {
  accent: "One Program",
  tail: "Instead of Ten.",
};

export const oneProgramSubtitle =
  "A complete technology accelerator designed to compound your skills, projects, and career over two years.";

/**
 * The figure is written as three fields, not one string: the amount is set at display
 * size in brand red and the period at body size in ink, and a single string would have
 * to be split in the component to do that.
 */
export const oneProgramPricing: OneProgramPricing = {
  amount: "₹50,000",
  period: "/year",
  footnote: "Total program fee ₹1,00,000 · ≈ ₹137/day",
};

/**
 * `#apply` is the site-wide application anchor every CTA points at until that route
 * exists — see `features/early-start/constants`.
 */
export const oneProgramCta: OneProgramCta = {
  label: "Apply to uGSOT Beyond",
  href: "#apply",
};

/**
 * Icon artwork, in `public/assets/one_program/`.
 *
 * **The filename is the capability's `id`**, the same convention the ecosystem collage
 * uses, so a tile and its icon cannot drift apart.
 *
 * Every file is a 188×183 transparent PNG with its own pale-red disc baked in, which is
 * why the tiles draw no circle of their own — one is already in the artwork, and a
 * second would show as a ring around it.
 */
const oneProgramImage = (id: string) => `/assets/one_program/${id}.png`;

const capability = (id: string, label: string): OneProgramCapability => ({
  id,
  label,
  image: oneProgramImage(id),
});

/**
 * The eighteen capabilities, dealt into three rails.
 *
 * Grouping is editorial rather than alphabetical: each column mixes craft, competition
 * and career so no single rail reads as "the coding one" while another reads as "the
 * soft one". Order within a column is the order it drifts past.
 *
 * **Six per rail is load-bearing.** The rails loop by duplicating their own track, so a
 * track has to be at least as long as the box it runs through, or the duplicate appears
 * mid-frame and the seam is visible. Six tiles clear the tallest rail height (34rem) and
 * the widest phone comfortably; drop a rail to four and neither holds.
 *
 * The middle rail runs `down` against its neighbours' `up`, and all three periods are
 * different: matched periods put the rails in lockstep, which reads as one block sliding
 * rather than three rails drifting.
 *
 * **The periods are read against the track's own length, not the box it shows through.**
 * A rail covers its full length in `seconds` either way, so the same number gives a
 * comparable speed whether the track is running vertically at 831px or horizontally at
 * 912px — which is why the mobile rows need no separate set of numbers.
 */
export const oneProgramRails: readonly OneProgramRail[] = [
  {
    id: "craft",
    direction: "up",
    seconds: 26,
    items: [
      capability("programming-maths", "Programming + Maths"),
      capability("competitive-programming", "Competitive Programming"),
      capability("full-stack-development", "Full Stack Development"),
      capability("open-source-gsoc", "Open Source + GSoC Guidance"),
      capability("systems-cloud", "Systems + Cloud"),
      capability("emerging-tech", "Emerging Tech"),
    ],
  },
  {
    id: "proof",
    direction: "down",
    seconds: 22,
    items: [
      capability("internship-ecosystem", "Internship Ecosystem"),
      capability("career-preparation", "Career Preparation"),
      capability("dsa", "DSA"),
      capability("icpc-preparation", "ICPC Preparation"),
      capability("ai-genai", "AI & GenAI"),
      capability("real-projects", "Real Projects"),
    ],
  },
  {
    id: "network",
    direction: "up",
    seconds: 30,
    items: [
      capability("buildspace", "BuildSpace"),
      capability("ai-mentor", "AI Mentor"),
      capability("industry-mentorship", "Industry Mentorship"),
      capability("competitions", "Competitions"),
      capability("career-os", "Career OS"),
      capability("selected-immersions", "Selected Immersions"),
    ],
  },
] as const;

/**
 * Animation hooks, by `data-one-program` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `ECOSYSTEM_SELECTORS`.
 */
export const ONE_PROGRAM_SELECTORS = {
  intro: '[data-one-program="intro"]',
  rails: '[data-one-program="rails"]',
} as const;
