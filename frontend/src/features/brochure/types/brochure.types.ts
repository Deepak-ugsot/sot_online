/**
 * The headline is split so the second word can be set in the accent face and brand
 * red while the first stays in the display sans — the hero's two-tone treatment,
 * reused so the holding page reads as part of the same site.
 */
export type BrochureHeadlineCopy = {
  lead: string;
  accent: string;
};

/**
 * A call-to-action on the holding page.
 *
 * `variant` names a `CtaButton` treatment rather than a meaning: `primary` is the
 * white pill, `secondary` the glass one that sits beside it on a dark ground.
 */
export type BrochureCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};
