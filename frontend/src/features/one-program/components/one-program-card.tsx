import Image from "next/image";

import type { OneProgramCapability } from "../types/one-program.types";

type OneProgramCardProps = {
  capability: OneProgramCapability;
};

/** Intrinsic pixel size of every icon in `public/assets/one_program/`. */
const ICON_SIZE = { width: 188, height: 183 } as const;

/**
 * One capability: its icon over its name, on a white tile.
 *
 * The tile draws no circle behind the icon — each PNG already carries its own pale-red
 * disc, and a second one would render as a ring around the first.
 *
 * `aria-hidden` on the icon with an empty `alt`: the illustration pictures exactly what
 * the label beneath it says, so describing it would make a screen reader read the tile
 * twice.
 *
 * **The tile is sized two different ways, because the rails run on two different axes.**
 * In a column it has no width of its own — it takes a third of the rail area, and the
 * `vw`-aware `clamp`s on the icon and the label are what keep it in proportion as that
 * third grows. In a row on a phone it cannot do that: a horizontal marquee's tiles have
 * to be `shrink-0` or the flex algorithm squeezes the whole track into the viewport and
 * there is nothing left to scroll. So there it takes a fixed 8.5rem, which is the width
 * at which "Competitive Programming" settles onto two lines rather than three.
 */
export function OneProgramCard({ capability }: OneProgramCardProps) {
  return (
    <li className="rounded-xl bg-white px-3 py-4 text-center shadow-[0_1px_2px_rgba(10,10,11,0.04),0_8px_24px_-12px_rgba(10,10,11,0.12)] motion-safe:max-sm:w-[8.5rem] motion-safe:max-sm:shrink-0">
      <div
        aria-hidden="true"
        className="mx-auto h-[clamp(3rem,6vw,4rem)] w-[clamp(3rem,6vw,4rem)]"
      >
        <Image
          src={capability.image}
          alt=""
          width={ICON_SIZE.width}
          height={ICON_SIZE.height}
          sizes="64px"
          className="h-full w-full object-contain object-center"
        />
      </div>

      <p className="mt-2.5 font-display text-[clamp(0.75rem,1vw,0.8125rem)] leading-snug text-balance text-ink">
        {capability.label}
      </p>
    </li>
  );
}
