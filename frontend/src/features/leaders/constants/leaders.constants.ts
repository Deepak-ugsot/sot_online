import type { Leader, LeadersHeadingCopy } from "../types/leaders.types";

/**
 * Copy and portraits for the Leaders section. Kept out of JSX so marketing changes never
 * touch a component — see `features/hero/constants` for the pattern.
 */

/** "**Built by Leaders** Who've Shaped / Education and Technology" */
export const leadersHeading: LeadersHeadingCopy = {
  accent: "Built by Leaders",
  trail: "Who've Shaped",
  nextLine: "Education and Technology",
} as const;

/** Rendered inside a `<q>`, which supplies the curly quotes — so none are written here. */
export const leadersQuote =
  "Education is not about what you study, it's about who you become";

/**
 * Every portrait file shares one frame, and the caption's placement depends on it.
 *
 * The three PNGs are 360×571 and each is cut along the same 45° diagonal, running from
 * the right shoulder down to the bottom-left corner. `LeaderCard` positions the caption
 * as percentages of this frame, so a replacement file has to keep both the frame and
 * the cut — or the caption lands on the portrait.
 */
const PORTRAIT_WIDTH = 360;
const PORTRAIT_HEIGHT = 571;

/**
 * The three leaders, in the design's order.
 *
 * **The captions used to be pixels.** The design's exports had each name and bio baked
 * into the PNG beside the cut; they were cleared out of the files (everything past the
 * diagonal was caption and nothing else, so it came out clean) and are set as text here
 * instead — sharp at DPR 2, selectable, and editable without a designer.
 *
 * Two slips in the exported copy are corrected rather than carried: "Ex- CIO" loses its
 * stray space and "Linkedin" gets the capital the company spells it with.
 *
 * Every `alt` is empty: the name sits directly beside its portrait in the same
 * `<figure>`, so describing the photo would have a screen reader say it twice.
 */
export const leaders: readonly Leader[] = [
  {
    id: "ronnie-screwvala",
    name: "Ronnie Screwvala",
    roles: ["Visionary entrepreneur", "Co-founder, upGrad"],
    bio: "Built transformative enterprises and driven innovation in education and media",
    portrait: {
      src: "/assets/leaders/ronnie-screwvala.png",
      alt: "",
      width: PORTRAIT_WIDTH,
      height: PORTRAIT_HEIGHT,
    },
  },
  {
    id: "vishwa-mohan",
    name: "Vishwa Mohan",
    roles: ["CEO, upGrad School of Technology"],
    bio: "India's Top 40 CIOs (2023). Ex-CIO PhysicsWallah, LinkedIn, Amazon, PayPal, Walmart, and Oracle",
    portrait: {
      src: "/assets/leaders/vishwa-mohan.png",
      alt: "",
      width: PORTRAIT_WIDTH,
      height: PORTRAIT_HEIGHT,
    },
  },
  {
    id: "mehul-khandhedia",
    name: "Mehul Khandhedia",
    roles: ["CRO, upGrad School of Technology"],
    bio: "Ex-Professor: Mumbai University, ex-Coursera, and PhysicsWallah. Curated 35,000+ career enablements",
    portrait: {
      src: "/assets/leaders/mehul-khandhedia.png",
      alt: "",
      width: PORTRAIT_WIDTH,
      height: PORTRAIT_HEIGHT,
    },
  },
] as const;

/**
 * Hooks reach for these `data-*` attributes rather than class names, so restyling a
 * component can never silently break the reveal. Mirrors `LEARN_FROM_PEOPLE_SELECTORS`.
 */
export const LEADERS_SELECTORS = {
  intro: '[data-leaders="intro"]',
  grid: '[data-leaders="grid"]',
  card: '[data-leaders="card"]',
} as const;
