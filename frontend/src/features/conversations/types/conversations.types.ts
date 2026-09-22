/** "Conversations / that shape a / brighter / **tomorrow**" */
export type ConversationsHeadingCopy = {
  /**
   * One string per line, each its own hard break rather than a wrap inside a
   * width-constrained box — see `ConversationsSection` for why.
   */
  leadLines: readonly string[];
  /** "tomorrow" — the red word the heading ends on. */
  accent: string;
};

/** The pull-quote card overlapping the foot of the portrait. */
export type ConversationsQuote = {
  name: string;
  role: string;
};

export type ConversationsPortrait = {
  src: string;
  alt: string;
  /** The file's real pixels, so `next/image` reserves the right ratio. */
  width: number;
  height: number;
};

/** The large player above the scrolling row — a podcast episode in its own right. */
export type ConversationsFeaturedVideo = {
  videoId: string;
  /** Used as the modal's iframe title and the poster button's accessible name. */
  title: string;
  poster: {
    src: string;
    width: number;
    height: number;
  };
};

/** One card in the horizontally scrolling row of podcast clips. */
export type ConversationsClip = {
  id: string;
  videoId: string;
  /**
   * The clip's hook, as it reads on the thumbnail's own baked-in caption — never shown
   * as page text, only as the accessible name for the card and the modal's iframe title,
   * since a screen reader has no way to read the words burned into the image.
   */
  headline: string;
  /** The name printed under the thumbnail, e.g. "Anand Sir". */
  guest: string;
};
