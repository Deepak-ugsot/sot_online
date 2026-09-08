/** One word in the stacked reveal. */
export type ApproachWord = {
  /** Stable React key — do not derive keys from `label`, which is editable copy. */
  id: string;
  label: string;
  /** Set on the word that carries the brand red rather than ink. */
  accent?: boolean;
};
