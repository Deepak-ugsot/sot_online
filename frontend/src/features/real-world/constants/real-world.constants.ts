import type {
  RealWorldExperience,
  RealWorldHeadingCopy,
  RealWorldRibbon,
} from "../types/real-world.types";

/**
 * Copy and geometry for the Real World section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the pattern.
 */

/** "Digital By Design. / Real-World By **Experience.**" */
export const realWorldHeading: RealWorldHeadingCopy = {
  lead: "Digital By Design.",
  trail: "Real-World By",
  accent: "Experience.",
} as const;

/**
 * The student who carries the right of the frame — a cutout on transparency, so the
 * ribbons pass behind them rather than being interrupted by a photo's edges.
 *
 * `width`/`height` are the PNG's own pixels, so Next reserves the right box before the
 * file lands and the ribbons underneath never reflow.
 *
 * The filename's spelling is the asset's, not a typo here.
 */
export const realWorldPortrait = {
  src: "/assets/expericnce.png",
  /**
   * Empty, deliberately. The image is decorative: it carries no information the
   * heading and the ribbons do not already state, so naming it would only add a
   * description of stock photography between the heading and the list.
   */
  alt: "",
  width: 580,
  height: 696,
} as const;

/**
 * The six experiences, in the order they read on the ribbon.
 *
 * Both ribbons render this one list — the design's second row is the same words at a
 * different offset, not a second set — so adding an experience here adds it to both.
 *
 * **Keep the count even.** The chips alternate black and red strictly by position, so an
 * odd-length list puts two chips of the same colour together where the loop closes. See
 * `buildRibbonTrack`.
 */
export const realWorldExperiences: readonly RealWorldExperience[] = [
  { id: "campus-immersion", label: "Campus Immersion" },
  { id: "coding-bootcamps", label: "Coding Bootcamps" },
  { id: "hackathons", label: "Hackathons" },
  { id: "product-showcases", label: "Product Showcases" },
  { id: "industry-sessions", label: "Industry Sessions" },
  { id: "community-meetups", label: "Community Meetups" },
] as const;

/**
 * The two ribbons.
 *
 * The tilts are opposite and unequal, and the tops are set so the pair nearly meets at
 * the left edge and opens out to the right — the design's shallow "<". Equal and
 * opposite angles would have made a symmetrical X, which reads as a graphic device
 * rather than as two things passing.
 *
 * The periods are close but not equal, and deliberately not a simple ratio: at the same
 * speed the two rows stay in a fixed relationship and the whole device reads as one
 * rigid shape being dragged across, rather than as two independent ribbons.
 */
export const realWorldRibbons: readonly RealWorldRibbon[] = [
  { id: "upper", top: 45, angle: -8.5, direction: "rightward", seconds: 38 },
  { id: "lower", top: 76, angle: 7, direction: "leftward", seconds: 31 },
] as const;
