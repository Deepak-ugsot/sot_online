/**
 * The heading is split so its last phrase can be set in brand red, matching the hero,
 * curriculum and ecosystem sections.
 */
export type EarlyStartHeadingCopy = {
  lead: string;
  accent: string;
};

/** One stop on the timeline: a stage of the career the section says starts early. */
export type EarlyStartStep = {
  /** Stable React key — never derive keys from copy, which is editable. */
  id: string;
  title: string;
  description: string;
};

/**
 * The red card beside the timeline: one claim and the CTA under it.
 *
 * The claim is a `string` with its own line breaks left to the layout rather than a
 * list of lines — unlike the heading, nothing about it changes line by line, so the
 * breaks are purely a function of the card's width and belong to the type, not the copy.
 */
export type EarlyStartCalloutCopy = {
  claim: string;
  cta: {
    label: string;
    href: string;
  };
};
