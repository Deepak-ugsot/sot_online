import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import type { MentorsMarqueeRow } from "../types/mentors.types";

type MentorsMarqueeRowProps = {
  row: MentorsMarqueeRow;
  /** Rows in the first screenful should not wait for lazy loading. */
  priority?: boolean;
};

const directionClasses = {
  left: "animate-marquee-left",
  right: "animate-marquee-right",
} as const;

/**
 * Logo height and the gap between logos, per breakpoint.
 *
 * Both shrink together on the way down. At 375px a 40px logo separated by a 56px gap
 * puts barely two companies on screen at once, which reads as a near-empty strip
 * rather than a crowd — 28px logos at a 32px gap fit four.
 *
 * `pr` matches the gap exactly: it is the space between the last logo of one track
 * and the first of its twin, so it has to equal the internal gap or the seam shows.
 */
const TRACK_SPACING = "gap-8 pr-8 min-[641px]:gap-11 min-[641px]:pr-11 min-[901px]:gap-14 min-[901px]:pr-14";
const LOGO_HEIGHT = "h-7 min-[641px]:h-9 min-[901px]:h-10";

/**
 * One full pass takes `durationSeconds`, but only at desktop size.
 *
 * A track is as wide as its contents, so shrinking the logos and gaps above shortens
 * it to roughly two thirds by 375px. Held at the same duration it would crawl — the
 * distance fell but the time did not. These factors track that shrink, keeping the
 * strip travelling at about the same pixels-per-second at every width.
 *
 * The row's own duration arrives as the unitless `--marquee-seconds` so each
 * breakpoint can scale it; multiplying by a `s` value is what gives it a unit again.
 */
const TRACK_DURATION = [
  "[animation-duration:calc(var(--marquee-seconds)*0.66s)]",
  "min-[641px]:[animation-duration:calc(var(--marquee-seconds)*0.83s)]",
  "min-[901px]:[animation-duration:calc(var(--marquee-seconds)*1s)]",
].join(" ");

/**
 * The edge fade, as a share of the row's width.
 *
 * A percentage of a 1280px row is a generous 100px ramp; the same percentage of a
 * 375px one is 30px, which cuts rather than fades. The mobile row is also full-bleed,
 * so the fade is the only thing standing between a logo and the screen edge — hence
 * the wider ramp below 641px.
 *
 * Written out in full at both sizes rather than built from a helper: Tailwind reads
 * these class names out of the source text, so an interpolated one is never generated.
 */
const MASK = [
  "[-webkit-mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]",
  "[mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]",
  "min-[641px]:[-webkit-mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
  "min-[641px]:[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
].join(" ");

/**
 * One scrolling strip of logos.
 *
 * **Two identical tracks.** Each track translates a full -100% of its own width, so
 * as one leaves the frame its twin arrives at exactly the position the first started
 * from — the loop restarts with no visible seam. Both tracks must render the same
 * logos for that to hold.
 *
 * The row is masked to transparent at both edges so logos fade out rather than being
 * chopped off by the overflow boundary.
 */
export function MentorsMarqueeRow({ row, priority = false }: MentorsMarqueeRowProps) {
  const renderTrack = (isDuplicate: boolean) => (
    <div
      className={cn(
        "inline-flex flex-none items-center will-change-transform",
        TRACK_SPACING,
        directionClasses[row.direction],
        TRACK_DURATION,
        // The duplicate exists only to make the loop seamless. With motion disabled
        // it would just repeat every logo, so it is dropped entirely.
        isDuplicate && "motion-reduce:hidden",
      )}
      // Unitless, and read by the `TRACK_DURATION` classes rather than applied
      // directly: an inline `animation-duration` would outrank every breakpoint.
      style={{ "--marquee-seconds": row.durationSeconds } as CSSProperties}
    >
      {row.logos.map((logo) => (
        <Image
          key={logo.name}
          src={logo.src}
          // Empty because the whole marquee is `aria-hidden`; the company names are
          // announced once from `mentorsCompanyNames` instead.
          alt=""
          width={logo.width}
          height={logo.height}
          // Only the original track's images are worth prioritising — the duplicate
          // shows the same files, already in cache by then.
          priority={priority && !isDuplicate}
          className={cn("w-auto flex-none object-contain", LOGO_HEIGHT)}
        />
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "flex overflow-hidden",
        MASK,
        // With the animation off, a static strip is all that is left — let it be
        // scrolled by hand instead of silently cropping the logos past the edge.
        "motion-reduce:overflow-x-auto",
      )}
    >
      {renderTrack(false)}
      {renderTrack(true)}
    </div>
  );
}
