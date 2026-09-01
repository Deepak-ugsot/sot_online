/** A labelled group of footer links. */
export type FooterLinkColumn = {
  id: string;
  heading: string;
  links: readonly { label: string; href: string }[];
};

/** Social platforms with a glyph in `SocialIcon`. */
export type SocialPlatform = "facebook" | "instagram" | "x" | "youtube";

/** One social account link. */
export type SocialLink = {
  platform: SocialPlatform;
  /** Used as the link's accessible name — the glyph itself is decorative. */
  label: string;
  href: string;
};
