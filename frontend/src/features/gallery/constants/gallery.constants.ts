import type { GalleryCard, GalleryHeadingCopy } from "../types/gallery.types";

/**
 * Copy and card data for the Gallery section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

export const galleryHeading: GalleryHeadingCopy = {
  lead: "Your 2-Year",
  accent: "Engineering Journey",
};

/**
 * Journey artwork, in `public/assets/Journey/`.
 *
 * **The folder's and filenames' capitalisation is load-bearing.** They are passed
 * through verbatim, because macOS resolves `journey/become_industry_ready.jpg` just
 * fine while the Linux deploy target does not — a wrong case here would pass every
 * local check and 404 only in production.
 *
 * Each file is 1366×844. The media panel is ~55vw wide, which is 792px at a 1440
 * viewport, so the art covers it at 1× with room to spare, though it falls well
 * short of DPR 2.
 */
const galleryImage = (file: string) => `/assets/Journey/${file}`;

export const galleryCards: readonly GalleryCard[] = [
  {
    id: "foundations",
    image: galleryImage("Build_Strong(1).jpg"),
    overlay: "Build Strong\nFoundations.",
    title: "Build Strong Foundations",
    description:
      "Build a strong foundation in programming, Git & GitHub, Linux, computer science fundamentals, and problem-solving.",
    gradient: "linear-gradient(160deg, #cfd6d8 0%, #8fa3ab 45%, #3d4b52 100%)",
  },
  {
    id: "development",
    image: galleryImage("Master_Software(1).jpg"),
    overlay: "Master Software\nDevelopment.",
    title: "Master Software Development",
    description:
      "Learn frontend, backend, databases, APIs, and full stack development through hands-on projects.",
    gradient: "linear-gradient(160deg, #e0c9b0 0%, #b5793f 45%, #4a2e18 100%)",
  },
  {
    id: "ai",
    image: galleryImage("Build_AI_Powered(1).jpg"),
    overlay: "Build AI-Powered\nApplications.",
    title: "Build AI-Powered Applications",
    description:
      "Master Generative AI, prompt engineering, AI APIs, AI agents, LangChain, and modern AI development.",
    gradient: "linear-gradient(160deg, #c7d9db 0%, #4f8a90 45%, #1b3437 100%)",
  },
  {
    id: "industry-ready",
    image: galleryImage("Become_Industry(1).jpg"),
    overlay: "Become\nIndustry Ready.",
    title: "Become Industry Ready",
    description:
      "Gain real-world experience through projects, internships, hackathons, mock interviews, resume building, and placement preparation.",
    gradient: "linear-gradient(160deg, #e0c3c5 0%, #a3444b 45%, #2f1113 100%)",
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
