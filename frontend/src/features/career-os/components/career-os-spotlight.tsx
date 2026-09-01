import { cn } from "@/lib/utils";
import type { CareerOsSpotlight } from "../types/career-os.types";
import { CAREER_OS_CARD } from "./career-os-item";

/**
 * The red call-to-action tile.
 *
 * `lg:flex-1` is doing real work: at three columns this is the only tile whose height
 * is free, so it absorbs whatever slack its column has and pins the column's bottom
 * level with its neighbours. `justify-between` then keeps the badge at the top and the
 * copy at the bottom however tall it ends up — the gap between them is the design.
 *
 * A real anchor, not a card with a button in it: the whole tile is the target.
 */
export function CareerOsSpotlightCard({ tile }: { tile: CareerOsSpotlight }) {
  return (
    <a
      data-career-os="item"
      href={tile.href}
      className={cn(
        CAREER_OS_CARD,
        "group relative flex min-h-[16.5rem] flex-col justify-between overflow-hidden p-5 text-white sm:min-h-[19rem] sm:p-6 lg:flex-1",
        // Two stops of the brand red rather than a flat fill, so the tile has the same
        // depth as the white cards' shadows on the light ground.
        "bg-[linear-gradient(148deg,#F0242C_0%,#E6161F_46%,#C7101A_100%)]",
        "shadow-[0_20px_44px_-20px_rgba(230,22,31,0.6)]",
      )}
    >
      {/* Decorative sheen — a light source at the top-right corner. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-white/12 blur-2xl"
      />

      <span className="relative flex h-11 w-11 items-center justify-center rounded-[0.875rem] bg-[#0A0A0B] sm:h-12 sm:w-12 transition-transform duration-500 ease-cinematic group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </span>

      <div className="relative mt-10 sm:mt-14">
        <h3 className="text-[clamp(1.875rem,2.8vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.03em]">
          {tile.title}
        </h3>

        <p className="mt-3 max-w-[26rem] text-[0.9375rem] leading-[1.55] text-white/90 sm:mt-4">
          {tile.description}
        </p>
      </div>
    </a>
  );
}
