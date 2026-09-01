/** A hero call-to-action. `variant` selects the button treatment. */
export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
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
