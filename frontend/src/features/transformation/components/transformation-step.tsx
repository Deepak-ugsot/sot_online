import Image from "next/image";

import { cn } from "@/lib/utils";
import type { TransformationStep as TransformationStepData } from "../types/transformation.types";

type TransformationStepProps = {
  step: TransformationStepData;
  isOpen: boolean;
  /** Opens this panel. Fired on hover, on focus and on click — see the section. */
  onOpen: () => void;
};

/**
 * One panel of the accordion.
 *
 * **The whole panel is the button.** A small toggle inside a panel would leave most of
 * a 300px-wide target inert, and the row is meant to respond to the pointer crossing
 * it. That is also why the title and number are `<span>`s rather than a heading: a
 * `<button>` may only contain phrasing content, so an `<h3>` or a `<p>` in here would
 * be invalid markup.
 *
 * **`flex-grow` is what animates, not `width`.** The seven panels share one row, so an
 * explicit width on the open one leaves the other six to be recomputed by hand; growing
 * one flex child and letting the rest settle keeps the row exactly full at every frame
 * of the transition, at any container width.
 */
export function TransformationStep({
  step,
  isOpen,
  onOpen,
}: TransformationStepProps) {
  return (
    <li
      className={cn(
        // `basis-0` is what makes the six closed panels equal. Left at `auto`,
        // `flex-grow` shares out only the *leftover* space on top of each panel's own
        // content width — so "Break Through" came out 191px against "Build" at 104px.
        // From a zero basis the whole row is leftover space, and the ratio is the only
        // thing that decides a width.
        // A fixed-width snap card below `lg`, a flex child of the accordion at `lg`.
        // `shrink-0` is what stops the seven cards being squeezed into one screen
        // instead of forming a rail.
        "w-[80%] shrink-0 snap-start sm:w-[46%]",
        "min-w-0 lg:w-auto lg:shrink lg:basis-0 lg:transition-[flex-grow] lg:duration-500 lg:ease-[cubic-bezier(0.215,0.61,0.355,1)]",
        // Below `lg` the accordion is abandoned: every panel is open and they scroll
        // sideways, because a 150px collapsed column on a phone shows a number and
        // nothing else.
        isOpen ? "lg:grow-[2.4]" : "lg:grow",
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onMouseEnter={onOpen}
        onFocus={onOpen}
        onClick={onOpen}
        style={{ background: step.tint }}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-sm p-5 text-left",
          "lg:min-h-[24rem]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        )}
      >
        <span
          className={cn(
            "text-[0.9375rem] font-medium tabular-nums transition-colors duration-300",
            isOpen ? "text-brand" : "text-ink-muted/70",
          )}
        >
          {step.number}
        </span>

        {/*
          `whitespace-nowrap` while closed and wrapping while open: a collapsed column
          is narrower than "Break Through", and letting it wrap there made the closed
          panels a different height from each other mid-transition.
        */}
        <span className="mt-3 type-heading text-[1.125rem] text-ink lg:text-[1.25rem]">
          {step.title}
        </span>

        {/*
          **The body is always rendered, and only hidden at `lg`.** Unmounting it when
          the panel closes is the obvious build and it is wrong here: below `lg` there
          is no accordion at all, so exactly one panel would have shown its copy and the
          other six would have been empty coloured boxes. `display: none` also takes the
          hidden copy out of the accessibility tree, which is what unmounting was for.
        */}
        <span className={cn("contents", !isOpen && "lg:hidden")}>
          <span className="mt-4 block max-w-[18rem] text-[0.875rem] leading-relaxed text-ink-muted">
            {step.description}
          </span>

          {/*
            `mt-auto` pins the illustration to the panel's foot, which is where the
            reference sets it — the copy stays at the top whatever the panel's height.
          */}
          <span className="mt-auto block w-full pt-6">
            <Image
              src={step.image.src}
              alt=""
              width={step.image.width}
              height={step.image.height}
              sizes="(min-width: 1024px) 26vw, 100vw"
              className="h-auto w-full max-w-[15rem] object-contain"
            />
          </span>
        </span>
      </button>
    </li>
  );
}
