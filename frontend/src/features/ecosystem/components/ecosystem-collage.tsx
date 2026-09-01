import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { ecosystemLogos } from "../constants/ecosystem.constants";

/**
 * The fanned row of brand cards.
 *
 * A `<ul>`: these are the six businesses behind the programme, so they are content,
 * not decoration, and each logo carries its brand name as alt text.
 *
 * **The fan angle travels as a `--rotate` custom property, applied through the
 * `transform` property rather than the standalone CSS `rotate`.** The hover tilt
 * animates the card's transform matrix, and a standalone `rotate` would compose with
 * that instead of being replaced by it — the card would end up rotated twice. Keeping
 * the base angle in `transform` means GSAP simply takes ownership of it, and the
 * property is still readable so the tilt can return to it on pointerleave.
 *
 * **The angle is a plain number, scaled by `--fan` on the wrapper.** A 150px card at
 * -27° is a confident scatter; the same angle on a 96px phone card reads as a pile,
 * and its corners swing far enough to crash into the row above. `--fan` eases the
 * whole fan back to half strength on phones and returns it to full once the row fits
 * on one line. Keeping the multiplier in CSS rather than baking a second set of
 * angles into the data leaves `rotation` the single source of truth — the tilt hook
 * reads both properties and multiplies them the same way.
 *
 * Cards overlap by 14px and paint in DOM order, so each one sits over the one before
 * it. Below 901px there is no room for that, so the row wraps and the overlap is
 * dropped — the rotations stay, because the scatter is the point.
 *
 * **The card is fluid below 901px so three fit across a phone.** At a flat 150px only
 * two fit on a 375px screen, and their rotated corners then overlapped both
 * neighbours; `26vw` puts three on a row from 320px up and is back at the designed
 * 150px well before the fan closes into a single line.
 */
export function EcosystemCollage() {
  return (
    <ul
      data-ecosystem="collage"
      className={
        // The 8px column gap is what keeps three cards on a row at 320px: at 12px
        // the third wraps by a single pixel and the fan falls into a 2×3 block.
        // The 32px row gap is set by the widest card that still wraps at half fan —
        // a 150px card just under 600px, whose corners reach 16px past its box.
        "flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-8 py-2 [perspective:1000px] [--fan:0.5] " +
        "min-[360px]:gap-x-3 " +
        // 44px of row gap from 600px: a 150px card at three-quarter fan swings its
        // corners 21px past its own box, and two rows of that meet in the middle.
        "min-[600px]:gap-x-4 min-[600px]:gap-y-11 min-[600px]:py-5 min-[600px]:[--fan:0.75] " +
        "min-[901px]:-mb-5 min-[901px]:flex-nowrap min-[901px]:gap-0 min-[901px]:[--fan:1]"
      }
    >
      {ecosystemLogos.map((logo, index) => (
        <li
          key={logo.id}
          data-ecosystem="card"
          style={{ "--rotate": logo.rotation } as CSSProperties}
          className={cn(
            "flex h-[clamp(5rem,26vw,9.375rem)] w-[clamp(5rem,26vw,9.375rem)] flex-none items-center justify-center",
            "rounded-[14px] border-[3px] border-ink-raised bg-white p-2",
            "min-[600px]:rounded-[22px] min-[600px]:border-4 min-[600px]:p-3",
            "shadow-[0_12px_28px_-8px_rgba(0,0,0,0.5)]",
            "[transform:rotate(calc(var(--rotate)*var(--fan)*1deg))] [transform-style:preserve-3d] will-change-transform",
            index > 0 && "min-[901px]:-ml-3.5",
          )}
        >
          {/*
            Sized to the card's whole content box rather than left at its natural
            size, so every logo is scaled up to fill it and the six read at a
            consistent weight. Left to their intrinsic sizes the artwork ranges from
            74px to 124px wide, so the smaller marks sat lost inside the card.

            `object-contain` keeps each one's aspect ratio, and setting both
            dimensions — rather than one — is what stops `next/image` treating this as
            a distorted image.
          */}
          <Image
            src={logo.image}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className="h-full w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
