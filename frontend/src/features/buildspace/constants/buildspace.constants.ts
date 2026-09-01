import type {
  BuildspaceCard,
  BuildspaceHeadingCopy,
  BuildspaceLayer,
  BuildspaceSubtitleCopy,
} from "../types/buildspace.types";

/**
 * Copy and scene data for the BuildSpace section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the same pattern.
 */

export const buildspaceHeading: BuildspaceHeadingCopy = {
  lead: "Build More. Ship Faster. With",
  accent: "BuildSpace.",
};

export const buildspaceSubtitle: BuildspaceSubtitleCopy = {
  lead: "As an SOT student, get",
  badge: "FREE ACCESS",
  trail:
    "to BuildSpace to build real projects, practice in-demand skills, and turn ideas into reality.",
};

/**
 * Product artwork, in `public/assets/BuildSpace/`.
 *
 * **The folder's capitalisation is load-bearing.** It is passed through verbatim,
 * because macOS resolves `buildspace/github.png` just fine while the Linux deploy
 * target does not — a wrong case here would pass every local check and 404 only in
 * production.
 */
const buildspaceImage = (file: string) => `/assets/BuildSpace/${file}`;

/**
 * The scene's intrinsic proportions. Every position below is a percentage of this box,
 * so the ratio must stay fixed or the whole arrangement drifts apart.
 */
export const BUILDSPACE_SCENE_ASPECT = "1340 / 790";

/**
 * The five feature cards, scattered around the laptop.
 *
 * They are deliberately uneven — the design has them scattered rather than placed on a
 * grid, so there is no formula to derive these from.
 *
 * **Sizes are the reference's, scaled 1.32x about each card's own centre.** Growing
 * from the stored top-left corner instead would have slid every card down and right and
 * pulled the whole ring off centre.
 *
 * **Positions are then re-spaced by column, and that step is not optional.** Scaling
 * alone leaves the cards nearly touching — at 1.32x the gap between `workspace` and
 * `ai-review` collapsed to 0.53% of the scene, because each card grew into the space
 * between them from both sides. The left column is now laid out down a 4-92 band with
 * an even 7.2% between cards; the right column, having only two, takes a wider 14.05%.
 * Each column is also nudged outward into the slack at the box edge, which buys back
 * some clearance from the laptop as well.
 *
 * Three things to re-check after touching any of these numbers — all three were found
 * by search rather than by eye:
 *
 * - no two cards closer than ~7% (the tightest pair is `workspace` / `ai-review`)
 * - every card at least 1.5% clear of the laptop (the tightest is `github`, at 2.46%)
 * - the composition inside the box, currently x[2.5, 97.5] y[4.0, 92.0]
 */
export const buildspaceCards: readonly BuildspaceCard[] = [
  {
    id: "workspace",
    label: "Workspace",
    image: buildspaceImage("workspace.png"),
    width: 656,
    height: 731,
    left: 13.5,
    top: 4,
    size: 12.94,
  },
  {
    id: "ai-review",
    label: "AI Review",
    image: buildspaceImage("ai_review.png"),
    width: 687,
    height: 609,
    left: 2.5,
    top: 35.66,
    size: 16.37,
  },
  {
    id: "learning-hub",
    label: "Learning Hub",
    image: buildspaceImage("learning_hub.png"),
    width: 546,
    height: 609,
    left: 7,
    top: 67.47,
    size: 12.94,
  },
  {
    id: "github",
    label: "GitHub Engineering",
    image: buildspaceImage("github.png"),
    width: 706,
    height: 787,
    left: 78.2,
    top: 6,
    size: 16.9,
  },
  {
    id: "video",
    label: "Video sections",
    image: buildspaceImage("video.png"),
    width: 768,
    height: 784,
    left: 80.3,
    top: 52,
    size: 17.16,
  },
] as const;

/**
 * The student, layered over everything else.
 *
 * `left` and `size` are the *rendered* rectangle, not the reference's box: it places
 * the artwork in a 37%-wide box with `object-contain`, and this portrait fills that
 * box's height rather than its width, so what actually appears is 32.1% wide, centred
 * on the same 50% axis. Those numbers are then scaled 1.22x about that centre — less
 * than the cards get, because the student is already a third of the scene and matching
 * the cards' 1.32x would have them towering over the laptop.
 */
export const buildspaceCharacter: BuildspaceLayer = {
  image: buildspaceImage("person.png"),
  width: 1606,
  height: 1916,
  left: 30.42,
  top: 10.86,
  size: 39.16,
};

/**
 * The laptop plate the scene is composed around, sitting *behind* the cards and the
 * student.
 *
 * Like the student, `top` and `size` are the *rendered* rectangle rather than the
 * reference's box: it places the art in a box `46.8%` wide and `52%` tall with
 * `object-contain`, and at 1.763 this plate fills that box's width, leaving it centred
 * 3.5% lower than the box's own top edge.
 *
 * Scaled 1.10x about that centre — the smallest step of the three. It is the merge
 * target, so every card has to stay clear of it; each further 5% here costs roughly
 * that much again in clearance from `github`, which is the tightest of the five.
 */
export const buildspaceLaptop: BuildspaceLayer = {
  image: buildspaceImage("laptop.png"),
  width: 1585,
  height: 899,
  left: 24.26,
  top: 38.25,
  size: 51.48,
};

/**
 * Animation hooks, by `data-buildspace` attribute rather than class name, so restyling
 * a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const BUILDSPACE_SELECTORS = {
  stage: '[data-buildspace="stage"]',
  heading: '[data-buildspace="heading"]',
  scene: '[data-buildspace="scene"]',
  card: '[data-buildspace="card"]',
  laptop: '[data-buildspace="laptop"]',
  character: '[data-buildspace="character"]',
} as const;

/**
 * How much the laptop swells while the cards fold into it.
 *
 * Deliberately slight. This is the only thing in the scene that moves besides the
 * cards themselves — the heading and the scene box both stay exactly where they are,
 * so the swell reads as the laptop drawing the features in rather than as the whole
 * composition lurching. Scaling is about the laptop's own centre, so it does not
 * shift the point the cards are aiming at.
 */
export const BUILDSPACE_LAPTOP_GROW = 1.1;

/**
 * The merge choreography, as fractions of the pinned runway.
 *
 * These are not invented — they are read off the reference implementation of this
 * effect, whose defining quality is that the cards *hang almost still* and then rush
 * inward. Two things produce that, and both are easy to lose:
 *
 * - `DURATION` is long and `STAGGER` is short, so every card is in flight at once
 *   rather than firing one clean card at a time. The last card starts before the
 *   first is a third of the way home.
 * - `power2.in` back-loads each card's own window: halfway through its tween a card
 *   has covered under a fifth of the distance.
 *
 * Shorten the duration or flatten the ease and it turns into an ordinary staggered
 * fly-out, which is the thing this is not.
 */
export const BUILDSPACE_MERGE = {
  /** When the first card starts, as a fraction of the content window. */
  START: 0.15,
  /** Offset between consecutive cards. */
  STAGGER: 0.045,
  /** How long one card takes. Longer than the gap between cards, hence the overlap. */
  DURATION: 0.58,
  /** What a card shrinks to as it disappears into the laptop. */
  SCALE: 0.1,
} as const;

/**
 * All motion is compressed into this fraction of the pin; the rest is a hold, so the
 * finished state is readable before the pin releases. Matches the reference, which
 * settles at ~0.9 and holds.
 */
export const BUILDSPACE_CONTENT_END = 0.9;

/** Runway length, in viewport heights. The reference pins for 1.5. */
export const BUILDSPACE_PIN_VH = 1.5;
