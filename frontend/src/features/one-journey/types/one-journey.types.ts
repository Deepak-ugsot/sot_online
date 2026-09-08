/**
 * A card's colour treatment.
 *
 * The four alternate red, white, red, white, so the pile reads as a deck rather than
 * as a list.
 */
export type OneJourneyCardTone = "brand" | "plain";

/** One card in the deck. */
export type OneJourneyCard = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  title: string;
  description: string;
  tone: OneJourneyCardTone;
  /**
   * The angle the card settles at, in degrees, read off the reference.
   *
   * A number rather than a `rotate-*` class, and that is deliberate: the card *rotates
   * into* this angle as it lands, so GSAP has to own the rotation. A CSS `rotate`
   * would be folded into GSAP's transform on the first write anyway, leaving two
   * owners for one value.
   */
  angle: number;
  /**
   * Where the card comes to rest, as `lg:` classes: its inset from the left, its
   * width, its top as a percentage of the deck, and its paint order.
   *
   * Carried as data rather than derived, because a scatter has no rule to derive it
   * from — each card is placed against the ones it overlaps. Kept as literal strings
   * so Tailwind's scanner sees them.
   */
  placementClassName: string;
};

/**
 * A heading split so the middle phrase can carry the brand red, matching every other
 * two-tone heading on the page.
 */
export type OneJourneyHeadingCopy = {
  lead: string;
  accent: string;
  tail: string;
};
