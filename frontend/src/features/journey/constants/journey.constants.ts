import type { JourneyHeadingCopy, JourneyTrack } from "../types/journey.types";

/**
 * Copy and data for the Journey section. Kept out of JSX so marketing changes never
 * touch a component — see `features/hero/constants` for the same pattern.
 */

export const journeyHeading: JourneyHeadingCopy = {
  lead: "Career OS adapts to your Journey and helps you become",
  accent: "industry ready",
};

export const journeySubtitle =
  "Whether you're in 1st year or final year, or from any engineering branch, Career OS personalizes your learning journey to make you industry ready.";

/**
 * Curriculum artwork, in `public/assets/curriculum/`.
 *
 * **The filename's capitalisation is load-bearing.** It is passed through verbatim,
 * because macOS resolves `CPF.png` and `cpf.png` alike while the Linux deploy target
 * does not — a wrong case here would pass every local check and 404 in production.
 *
 * Each file is 647×431, exactly the card's height at desktop, so `object-cover` only
 * ever crops horizontally: the expanded card takes the middle 407px and the collapsed
 * ones a 102px slice of the same art.
 */
const curriculumImage = (file: string) => `/assets/curriculum/${file}`;

/**
 * The four programme tracks, in order.
 *
 * **The first is the one that starts expanded**, which is a layout consequence rather
 * than a flag: the gallery expands the first card whenever nothing is hovered, so
 * reordering this list changes which track greets the reader.
 */
export const journeyTracks: readonly JourneyTrack[] = [
  {
    id: "full-stack",
    year: "1st Year",
    title: "Full Stack Software Developer",
    image: curriculumImage("full_stack.png"),
  },
  {
    id: "foundation",
    year: "1st Year",
    title: "Computing & Programming Foundation",
    image: curriculumImage("CPF.png"),
  },
  {
    id: "cloud",
    year: "2nd Year",
    title: "Software Engineering & Cloud",
    image: curriculumImage("SEC.png"),
  },
  {
    id: "ai",
    year: "2nd Year",
    title: "AI Engineering & Career Accelerator",
    image: curriculumImage("AiECA.png"),
  },
] as const;

/**
 * Animation hooks, by `data-journey` attribute rather than class name, so restyling a
 * component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const JOURNEY_SELECTORS = {
  heading: '[data-journey="heading"]',
  gallery: '[data-journey="gallery"]',
  card: '[data-journey="card"]',
} as const;
