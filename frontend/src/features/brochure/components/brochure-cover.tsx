import Image from "next/image";

import { assets, siteConfig } from "@/config/site.config";
import { brochureCover } from "../constants/brochure.constants";

/**
 * The mock brochure beside the copy: a stack of sheets, the top one turned face up.
 *
 * **It is deliberately a cover and not a page.** A holding page that draws readable
 * body text is showing the reader the document it just told them does not exist; a
 * cover shows the shape of the thing and stops there. What it does carry — the
 * contents list — is the real section names, because inventing chapter titles for an
 * unwritten document is the one thing here that could actually mislead.
 *
 * The lower half of that list fades out under a gradient rather than being cut off at
 * a hard edge: the sheet should read as still being written, not as cropped.
 *
 * `aria-hidden`, and no alternative text. Everything it says is said in words by the
 * column beside it, so to a screen reader this is decoration — announcing a fake
 * table of contents would be worse than announcing nothing.
 */
export function BrochureCover() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[19rem] select-none sm:max-w-[21rem]"
    >
      {/*
        The glow the sheets sit in. Sized well beyond the card and blurred to nothing
        at its edge, so the light appears to come off the paper rather than from a
        shape behind it.
      */}
      <div className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(230,22,31,0.32),rgba(230,22,31,0.07)_45%,transparent_72%)] blur-2xl" />

      {/* Two sheets under the top one, fanned the other way so the stack reads as a stack. */}
      <div className="absolute inset-0 -rotate-[9deg] rounded-[14px] border border-white/10 bg-white/[0.03]" />
      <div className="absolute inset-0 -rotate-[4.5deg] rounded-[14px] border border-white/12 bg-white/[0.05]" />

      <div className="animate-brochure-float">
        {/*
          No padding along the bottom: the contents list is meant to run off the
          edge of the sheet rather than stop above it, so the page reads as
          continuing past what is shown.
        */}
        <article className="relative overflow-hidden rounded-[14px] border border-white/15 bg-[linear-gradient(158deg,#191316_0%,#0f0b0d_52%,#0a0708_100%)] px-6 pt-6 shadow-[0_44px_90px_-28px_rgba(0,0,0,0.9)] sm:px-7 sm:pt-7">
          {/* The spine: the one saturated edge, so the sheet has a bound side. */}
          <span className="absolute inset-y-0 left-0 w-[3px] bg-[linear-gradient(180deg,#ff3b5c,#e6161f_45%,rgba(230,22,31,0.15))]" />

          {/*
            The corner stamp. Rotated through a corner the card clips, which is what
            makes it read as printed onto the sheet rather than floated above it.
          */}
          <span className="absolute -right-[3.35rem] top-[1.6rem] w-[13rem] rotate-45 bg-brand py-1.5 text-center font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_rgba(230,22,31,0.45)]">
            {brochureCover.ribbon}
          </span>

          <Image
            src={assets.logoWhite}
            alt={siteConfig.name}
            width={147}
            height={30}
            className="h-6 w-auto"
          />

          <p className="mt-7 font-accent text-[26px] leading-[1.1] font-medium text-white sm:text-[28px]">
            {brochureCover.title}
          </p>
          <p className="mt-1.5 font-display text-[13px] text-white/55">
            {brochureCover.subtitle}
          </p>

          {/*
            Above the rule, not below the contents. Set after the fade it looked like
            a line the mask had failed to reach — the list has to be the last thing on
            the sheet for the fade to read as "there is more of this".
          */}
          <p className="mt-4 font-display text-[10px] uppercase tracking-[0.28em] text-white/30">
            {brochureCover.edition}
          </p>

          <span className="mt-4 block h-px w-full bg-gradient-to-r from-white/25 via-white/10 to-transparent" />

          {/*
            The contents, fading into the sheet. The mask is on the list rather than on
            a scrim over it, so the fade is to the card's own gradient at every point
            instead of to one flat colour that only matches it at the top.
          */}
          <ol className="mt-5 space-y-[9px] pb-7 [mask-image:linear-gradient(180deg,#000_52%,rgba(0,0,0,0.3)_84%,transparent)]">
            {brochureCover.contents.map((item, index) => (
              <li
                key={item}
                className="flex items-baseline gap-3 font-display text-[12.5px] text-white/70"
              >
                <span className="w-4 shrink-0 tabular-nums text-[10px] font-semibold text-brand/85">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 truncate">{item}</span>
                {/* A page number that is not a number: nothing is paginated yet. */}
                <span className="shrink-0 text-[10px] tracking-[0.18em] text-white/25">
                  ••
                </span>
              </li>
            ))}
          </ol>

          {/* A single slow pass of light across the sheet, so it reads as paper under a lamp. */}
          <span className="brochure-sheen pointer-events-none absolute inset-0" />
        </article>
      </div>
    </div>
  );
}
