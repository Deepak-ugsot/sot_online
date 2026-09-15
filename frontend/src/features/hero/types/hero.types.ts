/** A hero call-to-action. `variant` selects the button treatment. */
export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  /**
   * Leading glyph, set here rather than inferred from the variant: "secondary" is a
   * treatment, not a meaning, and the next secondary CTA added need not be a download.
   */
  icon?: "download";
};

/**
 * The headline is split so the middle phrase can be rendered in the accent
 * serif and brand red, while the lead and tail stay in the display sans.
 */
export type HeroHeadlineCopy = {
  lead: string;
  accent: string;
  tail: string;
};
