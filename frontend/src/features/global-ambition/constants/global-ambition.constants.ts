import type {
  GlobalAmbitionCard,
  GlobalAmbitionHeadingCopy,
} from "../types/global-ambition.types";

/**
 * Copy and card data for the Global Ambition section. Kept out of JSX so marketing
 * changes never touch a component — see `features/hero/constants` for the pattern.
 */

export const globalAmbitionHeading: GlobalAmbitionHeadingCopy = {
  lead: "Your college may be anywhere. Your ambition can be",
  accent: "global.",
};

export const globalAmbitionSubtitle =
  "Go beyond classroom learning and build the skills, experience, and profile that take you places.";

/**
 * Artwork lives in `public/assets/global/`.
 *
 * **The filenames' capitalisation is load-bearing** — they are passed through
 * verbatim, and macOS resolves `icpc.png` just fine where the Linux deploy target
 * does not. A wrong case here passes every local check and 404s only in production.
 */
const globalImage = (file: string) => `/assets/global/${file}`;

/**
 * The seven cards, in the order they are laid out: three across, then three across
 * with the middle one featured, then one running the full width.
 *
 * Tints are flat washes rather than tokens: each is keyed to its own artwork — the
 * medal's ribbon against the rose, the GitHub cards against the green — and they
 * belong to this block alone, so there is no scale for them to be a rung on. The
 * one exception is the featured card, which is plain white so it lifts off the
 * section's grey.
 */
export const globalAmbitionCards: readonly GlobalAmbitionCard[] = [
  {
    id: "icpc",
    track: "Compete",
    title: "ICPC",
    description:
      "Train seriously to compete at the highest levels of competitive programming.",
    image: { src: globalImage("ICPC.png"), width: 334, height: 374 },
    tint: "#fdeded",
    size: "default",
    mediaClassName: "-top-[9%] bottom-0 left-0 right-[1%]",
  },
  {
    id: "codeforces",
    track: "Compete",
    title: "Codeforces / CodeChef",
    description:
      "Build your problem-solving skills and competitive coding profile.",
    image: { src: globalImage("CodeChef.png"), width: 468, height: 345 },
    tint: "#eaf4ec",
    size: "default",
    mediaClassName: "inset-y-0 left-0 -right-[16%]",
  },
  {
    id: "gsoc",
    track: "Contribute",
    title: "Google Summer of Code",
    description:
      "Build towards the open-source skills and contribution track needed to aim for GSoC.",
    image: {
      src: globalImage("Google_Summer of_Code.png"),
      width: 476,
      height: 329,
    },
    tint: "#fdf2df",
    size: "default",
    mediaClassName: "inset-y-0 left-0 -right-[14%]",
  },
  {
    id: "open-source",
    track: "Contribute",
    title: "Open Source",
    description:
      "Contribute to real codebases and build a GitHub profile that speaks for itself.",
    image: { src: globalImage("Open_Source.png"), width: 576, height: 384 },
    tint: "#eaf5ed",
    size: "default",
    mediaClassName: "inset-y-0 left-0 -right-[12%]",
  },
  {
    id: "build",
    track: "Build",
    title: "Build Real Products",
    description:
      "Ship full-stack, systems and AI products — not classroom assignments.",
    image: {
      src: globalImage("Build_Real_Products.png"),
      width: 400,
      height: 298,
    },
    tint: "#ffffff",
    size: "featured",
    mediaClassName: "left-0 -right-[14%] top-[6%] -bottom-[10%]",
  },
  {
    id: "ai",
    track: "Build",
    title: "AI",
    description: "Become an AI-native software engineer.",
    image: { src: globalImage("AI.png"), width: 340, height: 270 },
    tint: "#f0ebfb",
    size: "default",
    mediaClassName: "inset-y-0 left-0 -right-[14%]",
  },
  {
    id: "internships",
    track: "Experience",
    title: "Internships",
    description:
      "Start building real-world exposure long before your final year.",
    image: { src: globalImage("Internships.png"), width: 629, height: 420 },
    // The one gradient in the set. This card is four times the width of the others,
    // and a flat wash across that span reads as an empty bar rather than a card.
    tint: "linear-gradient(100deg, #dfeafd 0%, #e9f0fd 55%, #f4f7fe 100%)",
    size: "wide",
    mediaClassName: "-inset-y-[4%] left-0 -right-[14%]",
  },
] as const;

/**
 * Animation hooks, by `data-global-ambition` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const GLOBAL_AMBITION_SELECTORS = {
  header: '[data-global-ambition="header"]',
  card: '[data-global-ambition="card"]',
} as const;
