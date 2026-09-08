import type { GalleryCard, GalleryHeadingCopy } from "../types/gallery.types";

/**
 * Copy and card data for the Gallery section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

export const galleryHeading: GalleryHeadingCopy = {
  lead: "Become a",
  accent: "Complete Techie.",
};

/**
 * The line under the heading. Three sentences of what the programme is *not*, which is
 * what makes the six cards that follow read as one whole rather than as six options.
 */
export const gallerySubtitle =
  "Not someone who only knows DSA. Not someone who only knows React. Not someone who completed an AI certificate.";

/**
 * **Filename and folder capitalisation is load-bearing.** These paths are passed
 * through verbatim, because macOS resolves `journey/become_industry.jpg` just fine
 * while the Linux deploy target does not — a wrong case here would pass every local
 * check and 404 only in production. Note `oppertunity/` is spelled that way on disk.
 *
 * Four of the six cards reuse the artwork from the previous journey set, matched to
 * their nearest new meaning. **Two are placeholders** and marked as such on the card:
 * "The Contributor" borrows the open-source photo, which is at least on topic, and
 * "The Future-Tech Explorer" borrows the startup-challenges one, which is not — swap
 * both when the real artwork exists.
 */
const journeyImage = (file: string) => `/assets/Journey/${file}`;
const opportunityImage = (file: string) => `/assets/oppertunity/${file}`;

/**
 * The six facets of a "complete techie", in order.
 *
 * Each `overlay` is the card's own title, broken across two lines with a `\n` so the
 * display type sets as two balanced lines over the panel rather than one long one. The
 * break lives here with the copy rather than as a `<br />` in the component.
 *
 * Every card keeps its `gradient` even now that all six have artwork: it fills the
 * panel while the photo loads and if the photo fails, so the card never flashes white
 * and the overlay text stays legible either way.
 */
export const galleryCards: readonly GalleryCard[] = [
  {
    id: "problem-solver",
    image: journeyImage("Build_Strong(1).jpg"),
    overlay: "The Problem\nSolver",
    title: "The Problem Solver",
    description:
      "Build strong foundations in maths, programming, DSA, and competitive programming to sharpen your problem-solving skills and think like an engineer.",
    gradient: "linear-gradient(160deg, #cfd6d8 0%, #8fa3ab 45%, #2f3a40 100%)",
  },
  {
    id: "builder",
    image: journeyImage("Master_Software(1).jpg"),
    overlay: "The\nBuilder",
    title: "The Builder",
    description:
      "Build real-world software across frontend, backend, databases, cloud, and systems to turn ideas into scalable products.",
    gradient: "linear-gradient(160deg, #e0c9b0 0%, #b5793f 45%, #4a2e18 100%)",
  },
  {
    id: "ai-native",
    image: journeyImage("Build_AI_Powered(1).jpg"),
    overlay: "The AI-Native\nEngineer",
    title: "The AI-Native Engineer",
    description:
      "Master GenAI, AI APIs, agents, and AI engineering to build intelligent products and become an AI-native engineer.",
    gradient: "linear-gradient(160deg, #c7d9db 0%, #4f8a90 45%, #1b3437 100%)",
  },
  {
    id: "contributor",
    // PLACEHOLDER — on topic, but not shot for this card.
    image: opportunityImage("Open_Source_Programs.jpg"),
    overlay: "The\nContributor",
    title: "The Contributor",
    description:
      "Build your developer profile through GitHub, open source, GSoC preparation, and active developer communities.",
    gradient: "linear-gradient(160deg, #d5cfe6 0%, #6f5fa6 45%, #241c3d 100%)",
  },
  {
    id: "professional",
    image: journeyImage("Become_Industry(1).jpg"),
    overlay: "The\nProfessional",
    title: "The Professional",
    description:
      "Build the communication, aptitude, interview, and career-readiness skills needed to confidently step into the professional world.",
    gradient: "linear-gradient(160deg, #e0c3c5 0%, #a3444b 45%, #2f1113 100%)",
  },
  {
    id: "future-tech",
    // PLACEHOLDER — stand-in only, unrelated to the copy.
    image: opportunityImage("Startup_Challenges.jpg"),
    overlay: "The Future-Tech\nExplorer",
    title: "The Future-Tech Explorer",
    description:
      "Explore emerging technologies like quantum computing, cybersecurity, and robotics to understand and build for the future.",
    gradient: "linear-gradient(160deg, #c8d3ea 0%, #4a63a0 45%, #16203c 100%)",
  },
] as const;

/**
 * The viewport width at which the section switches from a swipeable scroll-snap
 * track to the pinned, scroll-driven carousel.
 *
 * This value is shared deliberately: `useGalleryCarousel` matches on it and the
 * markup uses Tailwind's `lg:` variant, which is the same 1024px. If the two ever
 * disagree there is a band of widths where CSS offers a swipe track while JS pins
 * the section — so keep this in step with `lg`.
 */
export const GALLERY_PIN_BREAKPOINT = 1024;

/**
 * Animation hooks, by `data-gallery` attribute rather than class name, so restyling
 * a component can never silently break the carousel. Mirrors `HERO_SELECTORS`.
 */
export const GALLERY_SELECTORS = {
  stage: '[data-gallery="stage"]',
  viewport: '[data-gallery="viewport"]',
  track: '[data-gallery="track"]',
} as const;
