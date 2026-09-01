/** One question-and-answer pair in the accordion. */
export type FaqEntry = {
  /** Stable React key, and the basis of the `id`s wiring the button to its answer. */
  id: string;
  question: string;
  answer: string;
};
