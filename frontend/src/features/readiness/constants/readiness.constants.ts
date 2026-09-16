import type {
  ReadinessHeadingCopy,
  ReadinessStep,
} from "../types/readiness.types";

/**
 * Copy for the "Two years. One serious transformation." section. Kept out of JSX so
 * marketing changes never touch a component — see `features/hero/constants` for the
 * same pattern.
 */

/**
 * Two lines, not one string with a `<br>`: the second line is a different colour, so
 * it has to be its own node either way. Rejoining them is a one-line change here.
 */
export const readinessHeading: ReadinessHeadingCopy = {
  lead: "Two years.",
  accent: "One serious transformation.",
};

/**
 * The section's own artwork: seven purpose-cut renders, one per step, replacing the
 * programme photography this row borrowed from `public/assets/Career/` while it waited.
 *
 * They are 999×1206 against cards of 327×391 — DPR 2 with room to spare — and at 0.828
 * against the card's 0.836 they are all but uncropped by `object-cover`, so each render
 * arrives composed as it was drawn rather than trimmed to fit.
 *
 * Every step now owns its image. The old set had six photographs for seven steps and
 * leaned on *Learn* and *Contribute* never sharing the screen to hide the repeat — a
 * constraint that would have broken the moment a step was added or reordered, and one
 * this set removes outright.
 *
 * Filenames are lower-case throughout. The Career placeholders were mixed-case and had
 * to be echoed verbatim, because macOS resolves `career/coding.jpg` perfectly well while
 * the Linux deploy target does not — a wrong case passed every local check and 404'd only
 * in production. One case for every file retires that trap rather than documenting it.
 */
const stepImage = (file: string) => `/assets/readiness/${file}`;

/**
 * The seven steps, in the order they are scrolled through. Order is also what sets the
 * row's rhythm: every second card is dropped by 70px, so reordering changes which
 * cards sit high and which sit low.
 */
export const readinessSteps: readonly ReadinessStep[] = [
  {
    id: "learn",
    title: "Learn",
    description: "Build foundations in programming, maths, CS, Git, and Linux.",
    image: stepImage("learn.jpg"),
    gradient: "linear-gradient(160deg, #020b3b 0%, #161d32 45%, #03060d 100%)",
  },
  {
    id: "code",
    title: "Code",
    description: "Master DSA, problem-solving, and competitive programming.",
    image: stepImage("code.jpg"),
    gradient: "linear-gradient(160deg, #011b24 0%, #111e25 45%, #080c0d 100%)",
  },
  {
    id: "build",
    title: "Build",
    description: "Build real products with full-stack, cloud, and systems skills.",
    image: stepImage("build.jpg"),
    gradient: "linear-gradient(160deg, #020b3b 0%, #464b52 45%, #090a0d 100%)",
  },
  {
    id: "compete",
    title: "Compete",
    description: "Prepare for ICPC, improve your ratings, and enter hackathons.",
    image: stepImage("compete.jpg"),
    gradient: "linear-gradient(160deg, #011e2b 0%, #54482b 45%, #010202 100%)",
  },
  {
    id: "contribute",
    title: "Contribute",
    description: "Grow through GitHub, open source, and GSoC preparation.",
    image: stepImage("contribute.jpg"),
    gradient: "linear-gradient(160deg, #040927 0%, #2b3157 45%, #010103 100%)",
  },
  {
    id: "ai-native",
    title: "AI-Native",
    description: "Learn GenAI, AI agents, and AI engineering.",
    image: stepImage("ai-native.jpg"),
    gradient: "linear-gradient(160deg, #01160e 0%, #355244 45%, #010201 100%)",
  },
  {
    id: "break-through",
    title: "Breakthrough",
    description:
      "Build industry exposure through internships, interviews, and career prep.",
    image: stepImage("breakthrough.jpg"),
    gradient: "linear-gradient(160deg, #260144 0%, #423553 45%, #030205 100%)",
  },
] as const;

/** The line under the row, split so the middle phrase can carry the brand red. */
export const readinessClosing = {
  lead: "Don't wait until third year to start preparing for your future.",
  accent: "Start building",
  tail: "it from year one.",
} as const;

/**
 * Animation hooks, by `data-readiness` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const READINESS_SELECTORS = {
  topItem: '[data-readiness="top-item"]',
  viewport: '[data-readiness="viewport"]',
  track: '[data-readiness="track"]',
} as const;

/**
 * The width below which the row is swiped by hand instead of driven by the pin.
 *
 * Declared here because it has to agree in two places that cannot see each other: the
 * `min-[901px]:` utilities on the markup, and the media query the hook registers.
 */
export const READINESS_PIN_MIN_WIDTH = 901;
