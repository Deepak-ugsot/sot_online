/**
 * The heading is split so one word can be rendered in brand red, matching the hero,
 * curriculum and ecosystem sections.
 */
export type LearnFromPeopleHeadingCopy = {
  lead: string;
  accent: string;
  trail: string;
};

/**
 * The four card tints.
 *
 * A named tone rather than the Tailwind classes themselves: the constants file holds
 * copy, and a gradient written there would be the one thing in it a copywriter could
 * not safely edit. The component owns the mapping — see `TONE_CLASSES`.
 */
export type LearnFromPeopleTone = "crimson" | "azure" | "emerald" | "violet";

/** One mentor card. */
export type LearnFromPeopleMentor = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  /** What they have done — the card's heading. */
  title: string;
  /** What they mentor. Set in brand red under the title. */
  role: string;
  /** The "Prior: …" line. Written out in full, including the label. */
  background: string;
  tone: LearnFromPeopleTone;
  image: {
    src: string;
    /**
     * Empty on purpose — see the constants for why these renders are decorative.
     */
    alt: string;
    /** Intrinsic pixel size, so Next can reserve the box and avoid a layout shift. */
    width: number;
    height: number;
  };
};
