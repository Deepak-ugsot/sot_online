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
 * Placeholder photography, borrowed from `public/assets/Career/` until the section's
 * own artwork is cut.
 *
 * **These are stand-ins, chosen for subject rather than for the crop.** They are
 * square (1080²) against cards of 327×391, so they clear DPR 2 with room to spare and
 * are cropped to portrait by `object-cover`.
 *
 * There are six usable photographs for seven steps, so *Learn* and *Contribute* share
 * `Communication.jpg`. They are four apart, and the row never shows more than four
 * cards at once, so the two are never on screen together — which is the only reason a
 * repeat is tolerable here. It stops being safe the moment a step is added or reordered.
 *
 * **The filename's capitalisation is load-bearing.** It is passed through verbatim
 * because macOS resolves `career/coding.jpg` just fine while the Linux deploy target
 * does not — a wrong case here would pass every local check and 404 in production.
 */
const stepImage = (file: string) => `/assets/Career/${file}`;

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
    image: stepImage("Communication.jpg"),
    gradient: "linear-gradient(160deg, #cdd3e0 0%, #5f6f8f 45%, #232c3d 100%)",
  },
  {
    id: "code",
    title: "Code",
    description: "Master DSA, problem-solving, and competitive programming.",
    image: stepImage("Coding.jpg"),
    gradient: "linear-gradient(160deg, #cfd6d8 0%, #8fa3ab 45%, #3d4b52 100%)",
  },
  {
    id: "build",
    title: "Build",
    description: "Build real products with full-stack, cloud, and systems skills.",
    image: stepImage("Projects.jpg"),
    gradient: "linear-gradient(160deg, #c7d9db 0%, #4f8a90 45%, #1b3437 100%)",
  },
  {
    id: "compete",
    title: "Compete",
    description: "Prepare for ICPC, improve your ratings, and enter hackathons.",
    image: stepImage("Hackathons.jpg"),
    gradient: "linear-gradient(160deg, #dccbe0 0%, #8a638f 45%, #3a2640 100%)",
  },
  {
    id: "contribute",
    title: "Contribute",
    description: "Grow through GitHub, open source, and GSoC preparation.",
    image: stepImage("Communication.jpg"),
    gradient: "linear-gradient(160deg, #cdd3e0 0%, #5f6f8f 45%, #232c3d 100%)",
  },
  {
    id: "ai-native",
    title: "AI-Native",
    description: "Learn GenAI, AI agents, and AI engineering.",
    image: stepImage("DSA.jpg"),
    gradient: "linear-gradient(160deg, #e0c9b0 0%, #b5793f 45%, #4a2e18 100%)",
  },
  {
    id: "break-through",
    title: "Break Through",
    description:
      "Build industry exposure through internships, interviews, and career prep.",
    image: stepImage("Interviews.jpg"),
    gradient: "linear-gradient(160deg, #e0c3c5 0%, #a3444b 45%, #2f1113 100%)",
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
