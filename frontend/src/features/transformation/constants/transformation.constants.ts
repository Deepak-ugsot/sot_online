import type {
  TransformationHeadingCopy,
  TransformationStep,
} from "../types/transformation.types";

/**
 * Copy and artwork for the Transformation section. Kept out of JSX so marketing
 * changes never touch a component — see `features/hero/constants` for the pattern.
 */

export const transformationHeading: TransformationHeadingCopy = {
  lead: "Two years.",
  accent: "One serious transformation.",
};

/**
 * Artwork lives in `public/assets/transformation/`.
 *
 * **The filenames' capitalisation is load-bearing** — they are passed through
 * verbatim, and macOS resolves `learn.png` just fine where the Linux deploy target
 * does not. `Break Through.png` also contains a space; `next/image` encodes it, but it
 * is the one name worth renaming if these files are ever reorganised.
 */
const stepImage = (file: string) => `/assets/transformation/${file}`;

/**
 * The seven steps, in order — they are a sequence, and the numbers printed on them say
 * so, which is why they are a `<ol>` in the markup rather than a set of cards.
 *
 * The tints run through the spectrum rather than repeating the brand red: seven panels
 * of the same colour would read as one striped block, and the point of the row is that
 * each step is its own place to stand.
 */
export const transformationSteps: readonly TransformationStep[] = [
  {
    id: "learn",
    number: "01",
    title: "Learn",
    description: "Build foundations in programming, maths, CS, Git, and Linux.",
    tint: "linear-gradient(180deg,#fdf3f2 0%,#fbe6e4 100%)",
    image: { src: stepImage("Learn.png"), width: 453, height: 326 },
  },
  {
    id: "code",
    number: "02",
    title: "Code",
    description: "Master DSA, problem-solving, and competitive programming.",
    tint: "linear-gradient(180deg,#fffdf5 0%,#fbf1d8 100%)",
    image: { src: stepImage("Code.png"), width: 453, height: 326 },
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "Build real products with full-stack, cloud, and systems skills.",
    tint: "linear-gradient(180deg,#f6faff 0%,#e4eefc 100%)",
    image: { src: stepImage("Build.png"), width: 453, height: 302 },
  },
  {
    id: "compete",
    number: "04",
    title: "Compete",
    description:
      "Prepare for ICPC, improve your ratings, and enter hackathons.",
    tint: "linear-gradient(180deg,#f5fbf7 0%,#e0f3e8 100%)",
    image: { src: stepImage("Compete.png"), width: 453, height: 302 },
  },
  {
    id: "contribute",
    number: "05",
    title: "Contribute",
    description: "Grow through GitHub, open source, and GSoC preparation.",
    tint: "linear-gradient(180deg,#f8f6fd 0%,#e9e4f7 100%)",
    image: { src: stepImage("Contribute.png"), width: 440, height: 316 },
  },
  {
    id: "ai-native",
    number: "06",
    title: "AI-Native",
    description: "Learn GenAI, AI agents, and AI engineering.",
    tint: "linear-gradient(180deg,#fbf7fe 0%,#f0e6fb 100%)",
    image: { src: stepImage("AI-Native.png"), width: 453, height: 302 },
  },
  {
    id: "break-through",
    number: "07",
    title: "Break Through",
    description:
      "Build industry exposure through internships, interviews, and career prep.",
    tint: "linear-gradient(180deg,#fef7f3 0%,#fbe5da 100%)",
    image: { src: stepImage("Break Through.png"), width: 453, height: 302 },
  },
] as const;

/** The line under the row, split so the middle phrase can carry the brand red. */
export const transformationClosing = {
  lead: "Don't wait until third year to start preparing for your future.",
  accent: "Start building",
  tail: "it from year one.",
} as const;
