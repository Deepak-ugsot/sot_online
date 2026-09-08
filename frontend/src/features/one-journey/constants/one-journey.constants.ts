import type {
  OneJourneyCard,
  OneJourneyHeadingCopy,
} from "../types/one-journey.types";

/**
 * Copy and card data for the One Journey section. Kept out of JSX so marketing changes
 * never touch a component — see `features/hero/constants` for the pattern.
 */

/**
 * Two lines: the question, then the answer. The `\n` in `lead` is the break between
 * them, rendered with `whitespace-pre-line` so it stays here with the rest of the copy
 * rather than being a `<br />` in the component.
 */
export const oneJourneyHeading: OneJourneyHeadingCopy = {
  lead: "Why buy 10 different courses\nOne",
  accent: "uGSOT Beyond",
  tail: "journey.",
};

/**
 * The deck, in the order it lands.
 *
 * `angle` and the placement are read off the reference: each card is a little over
 * half the deck's width, they step down it at 6%, 24%, 40% and 55%, and they overlap
 * by design.
 *
 * **Both ends of the spread are set by the shortest deck, not the tallest.** The deck
 * is whatever is left of a one-viewport stage after the heading and the footer, so on a
 * 780px laptop it is only ~400px — and the cards do not shrink with it, because their
 * height is set by their copy.
 *
 * At the top: turning a ~740px card by even 1.5° lifts its corner about 10px above the
 * box, and the deck clips what leaves it, so at `top-0` that corner was shaved off. 6%
 * is the clearance it needs.
 *
 * At the bottom: the last card has to clear `deck - card height - its own rotation
 * lift`, which on that 400px deck is 57%. 55% holds with room to spare there and still
 * reads as the reference's spread on a tall screen. The third is turned hardest, which is what stops the four reading as a
 * neat fan. Paint order is explicit (`lg:z-1`…`lg:z-4`) so a later card always lands
 * *over* the one before it, matching the reference's stacking order.
 */
export const oneJourneyCards: readonly OneJourneyCard[] = [
  {
    id: "roadmap",
    title: "One Roadmap",
    description:
      "A clear, structured path that shows you what to learn, build, and master at every stage.",
    tone: "brand",
    angle: -1.5,
    placementClassName: "lg:z-1 lg:left-[10%] lg:top-[6%] lg:w-[53%]",
  },
  {
    id: "peers",
    title: "One Peer Group",
    description:
      "Learn, compete, and grow alongside ambitious students who share your drive to become better engineers.",
    tone: "plain",
    angle: -2,
    placementClassName: "lg:z-2 lg:left-[27%] lg:top-[24%] lg:w-[54%]",
  },
  {
    id: "mentors",
    title: "One Mentor Ecosystem",
    description:
      "Get guidance from experienced mentors who help you navigate technical challenges and career decisions.",
    tone: "brand",
    angle: -6.5,
    placementClassName: "lg:z-3 lg:left-[36%] lg:top-[40%] lg:w-[55%]",
  },
  {
    id: "journey",
    title: "One technology journey",
    description:
      "Go from fundamentals to real-world engineering through coding, projects, AI, open source, and industry exposure.",
    tone: "plain",
    angle: 2,
    placementClassName: "lg:z-4 lg:left-[12%] lg:top-[55%] lg:w-[54%]",
  },
] as const;

/** The line under the deck, split so the last word can carry the brand red. */
export const oneJourneyClosing = {
  lead: "Stop collecting courses. Start becoming an",
  accent: "engineer.",
} as const;

/**
 * `₹` is the rupee sign (U+20B9), not "Rs". The two parts are separate so the period
 * can be set small and quiet beside the figure rather than sharing its weight.
 */
export const oneJourneyPrice = {
  amount: "₹50,000",
  period: "/year",
} as const;

/**
 * Animation hooks, by `data-one-journey` attribute rather than class name, so
 * restyling a component can never silently break the reveal. Mirrors `HERO_SELECTORS`.
 */
export const ONE_JOURNEY_SELECTORS = {
  /** The full-height box that gets pinned. */
  stage: '[data-one-journey="stage"]',
  /** The box the cards are placed against, and clipped by. */
  deck: '[data-one-journey="deck"]',
  card: '[data-one-journey="card"]',
} as const;
