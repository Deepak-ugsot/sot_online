import { cn } from "@/lib/utils";
import type { FaqEntry } from "../types/faq.types";

type FaqItemProps = {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * One accordion row.
 *
 * **The answer opens with `grid-template-rows: 0fr → 1fr`, not `max-height`.** The
 * reference animates to a fixed `max-height: 160px`, which is a guess about how tall
 * the tallest answer will ever be — longer copy, a narrower column or a wider
 * typeface silently clips it. The grid technique animates to the content's *actual*
 * height, so it cannot crop and needs no magic number.
 *
 * The `+` becomes an `×` by rotating 45°, so one glyph covers both states and the
 * change is animatable.
 */
export function FaqItem({ entry, isOpen, onToggle }: FaqItemProps) {
  const answerId = `faq-answer-${entry.id}`;
  const questionId = `faq-question-${entry.id}`;

  return (
    <div data-faq="item" className="border-b border-[#e5e5e5]">
      <h3>
        <button
          type="button"
          id={questionId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-[15px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {entry.question}

          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 text-brand transition-transform duration-300 ease-cinematic",
              isOpen && "rotate-45",
            )}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              <path d="M10 4v12M4 10h12" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className={cn(
          "grid transition-[grid-template-rows] duration-350 ease-cinematic",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        {/* The collapsing track needs a child that can be clipped to zero height —
            the overflow lives here, not on the grid, or the row cannot shrink. */}
        <div className="overflow-hidden">
          <p className="max-w-[39.625rem] pb-5 font-display text-[15px] leading-[1.65] text-[#555]">
            {entry.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
