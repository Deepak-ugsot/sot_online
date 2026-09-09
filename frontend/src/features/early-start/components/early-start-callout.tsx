import { ArrowIcon } from "@/components/ui/arrow-icon";

import type { EarlyStartCalloutCopy } from "../types/early-start.types";

type EarlyStartCalloutProps = {
  callout: EarlyStartCalloutCopy;
};

/**
 * The red card beside the timeline — the section's claim, and the way in.
 *
 * **The CTA is hand-rolled rather than `CtaButton`.** Every variant of the shared
 * button resolves its hover to brand red (`hover:bg-brand`, or white-to-red for the
 * footer's), which on a brand-red card would make the button dissolve into its own
 * background at exactly the moment the pointer is on it. The treatment is otherwise
 * the same two-tone pill the buildspace section uses — a solid slab with the arrow in
 * an inverted square inset at its end — so the CTA still reads as the site's.
 *
 * The asymmetric padding (`p-2 pl-[1.625rem]`) is what centres the label against that
 * square rather than against the slab.
 */
export function EarlyStartCallout({ callout }: EarlyStartCalloutProps) {
  return (
    <div
      data-early-start="callout"
      className="flex flex-col items-start gap-8 rounded-2xl bg-brand px-7 py-8 sm:px-9 sm:py-10 lg:gap-10"
    >
      <p className="type-heading text-[clamp(1.375rem,2.2vw,2rem)] text-balance text-white">
        {callout.claim}
      </p>

      <a
        href={callout.cta.href}
        className="group inline-flex items-center gap-4 bg-ink p-2 pl-[1.625rem] font-display text-base font-medium text-white transition-transform duration-300 ease-cinematic hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <span>{callout.cta.label}</span>
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-ink"
        >
          <ArrowIcon direction="diagonal" className="h-[18px] w-[18px]" />
        </span>
      </a>
    </div>
  );
}
