/** A single row in the section's highlight list. */
export type CareerHighlight = {
  /** Stable React key — do not derive keys from `label`, which is editable copy. */
  id: string;
  label: string;
};

/**
 * The heading is split so the closing phrase can be rendered in the accent serif
 * and brand red, matching the hero's treatment.
 */
export type CareerHeadingCopy = {
  lead: string;
  accent: string;
};
