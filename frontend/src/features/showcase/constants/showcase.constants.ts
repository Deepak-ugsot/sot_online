import type {
  ShowcaseHeadingCopy,
  ShowcaseProject,
} from "../types/showcase.types";

/**
 * Copy and card data for the Showcase section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

export const showcaseHeading: ShowcaseHeadingCopy = {
  lead: "Build",
  accent: "Projects",
  trail: "That Matter",
};

export const showcaseParagraph =
  "Not toy projects. Real products. Ship products the way teams do at work — real features, real users, real feedback.";

/**
 * Project artwork, in `public/assets/project/`.
 *
 * **The filename is the project's `id`.** Nothing maps one to the other, so a card
 * and its image cannot drift apart — adding a project means dropping `<id>.jpg` in
 * beside the others.
 *
 * Each file is **600×833** at JPEG quality 70, ~50–95KB. The cards are 262×260, so
 * the art is cropped to roughly its middle square and still clears DPR 2 on width.
 */
const showcaseImage = (id: string) => `/assets/project/${id}.jpg`;

/**
 * Order is purely the reading order of the marquee — all cards share one footprint,
 * so reordering this list changes the sequence, not the shape of the row.
 */
export const showcaseProjects: readonly ShowcaseProject[] = [
  {
    id: "ai-interview",
    title: "AI Interview Platform",
    description: "Mock interviews, scored live",
    image: showcaseImage("AI_Interview_Platform"),
  },

  {
    id: "food-delivery",
    title: "Food Delivery App",
    description: "Live order tracking end-to-end",
    image: showcaseImage("Food_Delivery_App"),
  },

  {
    id: "chat",
    title: "Chat Application",
    description: "Sockets, presence, threads",
    image: showcaseImage("Chat_Application"),
  },

  {
    id: "ecommerce",
    title: "Ecommerce Platform",
    description: "Catalog, cart, checkout, payments",
    image: showcaseImage("Ecommerce_Platform"),
  },

  {
    id: "resume-builder",
    title: "AI Resume Builder",
    description: "ATS-aware, generated on the fly",
    image: showcaseImage("Resume"),
  },

  {
    id: "video-calling",
    title: "Video Calling App",
    description: "Peer-to-peer, sub-second latency",
    image: showcaseImage("Video_Calling_App"),
  },

  {
    id: "crm",
    title: "CRM Platform",
    description: "Pipelines, automations, reports",
    image: showcaseImage("CRM_Platform"),
  },
] as const;

/**
 * One full pass of a track, in seconds.
 *
 * Set as a duration rather than a speed, so the loop keeps its timing when the cards
 * shrink on small screens — the row simply travels its own shorter width in the same
 * time. Shared by both tracks; they must move in lockstep or the seam opens up.
 *
 * A good deal quicker than the reference's 32s. The logo marquee below runs its own
 * rows at 36–48s, so the cards staying slower than that read as sluggish next to it.
 */
export const SHOWCASE_MARQUEE_SECONDS = 22;

/**
 * Animation hooks, by `data-showcase` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const SHOWCASE_SELECTORS = {
  viewport: '[data-showcase="viewport"]',
  track: '[data-showcase="track"]',
  card: '[data-showcase="card"]',
} as const;
