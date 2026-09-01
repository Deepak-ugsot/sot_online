import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  CAREER_OS_AVATAR_SIZE,
  careerOsCommunity,
  careerOsCommunityOverflow,
} from "../constants/career-os.constants";
import type {
  CareerOsCommunityMember,
  CareerOsIllustrationName,
} from "../types/career-os.types";

/**
 * The six tile illustrations.
 *
 * **They are drawn, not written.** Each one is a wireframe of a real product surface —
 * a path in progress, a streak grid, a podium — built from blocks, bars and glyphs
 * rather than sentences. Copy belongs to the title and description directly beneath;
 * a panel full of small text competes with them and reads as a screenshot, not an
 * illustration. At most a single figure survives per panel, where the number *is* the
 * point.
 *
 * DOM and SVG rather than exported images: they stay crisp at any tile width, pick up
 * the brand red from the same token as the rest of the page, and cannot go missing.
 *
 * Every illustration centres its content in a panel whose height the tile fixes, so a
 * panel that is ever cropped crops evenly top and bottom.
 */

/** Panel padding + vertical centring, shared by every illustration. */
const STAGE = "flex h-full flex-col justify-center gap-2.5 p-4";

/** The white sub-cards the wireframes are built from. */
const CARD = "rounded-xl bg-white p-3.5 shadow-[0_1px_2px_rgba(10,10,11,0.06)]";
const ROW = "rounded-lg bg-white px-3 py-2 shadow-[0_1px_2px_rgba(10,10,11,0.05)]";

/** A neutral block standing in for a line of text. */
function Bar({ className }: { className?: string }) {
  return <span className={cn("block rounded-full bg-black/[0.08]", className)} />;
}

/**
 * A cohort portrait.
 *
 * Size and ring are the caller's, not defaults: `cn` is a plain join rather than a
 * Tailwind-aware merge, so a base `h-8`/`ring-2` here could not be reliably overridden
 * from a call site — the winner would be decided by stylesheet order.
 */
function Avatar({
  member,
  className,
}: {
  member: CareerOsCommunityMember;
  className?: string;
}) {
  return (
    <Image
      src={member.src}
      alt=""
      width={CAREER_OS_AVATAR_SIZE}
      height={CAREER_OS_AVATAR_SIZE}
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  );
}

/** Glyphs, all on a 24×24 grid at one stroke weight so they read as one set. */
function Glyph({ path, className }: { path: readonly string[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
    >
      {path.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const GLYPHS = {
  play: ["M8 5.5 18 12 8 18.5Z"],
  check: ["m5 12.5 4.5 4.5L19 7"],
  plus: ["M12 6v12", "M6 12h12"],
  star: ["m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4L4.2 9.7l5.4-.8Z"],
  trend: ["m3 16 5.5-5.5 3.5 3.5L21 5", "M15 5h6v6"],
} as const;

/* -------------------------------------------------------------------------- */

/** Learn Smarter — a path 72% done, with the modules behind it checked off. */
function LearnIllustration() {
  return (
    <div className={STAGE}>
      <div className={CARD}>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.625rem] bg-brand/10 text-brand">
            <Glyph path={GLYPHS.play} className="h-3.5 w-3.5 fill-current stroke-none" />
          </span>

          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Bar className="h-2 w-3/5" />
            <Bar className="h-1.5 w-2/5" />
          </span>

          <span className="shrink-0 text-[0.875rem] font-bold text-brand">72%</span>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.08]">
          <div className="h-full w-[72%] rounded-full bg-brand" />
        </div>
      </div>

      <ul className="flex flex-col gap-1.5">
        {[true, true, false].map((done, index) => (
          <li key={index} className={cn(ROW, "flex items-center gap-2.5")}>
            {done ? (
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Glyph path={GLYPHS.check} className="h-2.5 w-2.5" />
              </span>
            ) : (
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand/15">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
            )}

            <Bar className={cn("h-2", index === 1 ? "w-1/2" : "w-3/5")} />
            <span
              className={cn(
                "ml-auto h-2 w-6 shrink-0 rounded-full",
                done ? "bg-black/[0.06]" : "bg-brand/25",
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Four weeks of practice, as intensities 0–3.
 *
 * Written out rather than generated: the shape of the grid — a quiet start building to
 * a solid current week — is the illustration, and a random fill would redraw it on
 * every render.
 */
const practiceWeeks = [
  [1, 0, 2, 1, 2, 0, 1],
  [2, 1, 2, 3, 1, 2, 0],
  [1, 3, 2, 3, 3, 2, 2],
  [3, 3, 3, 2, 3, 3, 0],
] as const;

const practiceFill = [
  "bg-black/[0.06]",
  "bg-brand/25",
  "bg-brand/55",
  "bg-brand",
] as const;

/** Practice Every Day — the streak count over its own contribution grid. */
function PracticeIllustration() {
  return (
    <div className={STAGE}>
      <div className={CARD}>
        <div className="flex items-end gap-2.5">
          <span className="text-[1.75rem] leading-none font-bold tracking-[-0.03em] text-ink">
            14
          </span>
          <span className="flex flex-1 flex-col gap-1.5 pb-1">
            <Bar className="h-2 w-1/2" />
            <Bar className="h-1.5 w-1/3" />
          </span>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {practiceWeeks.map((week, weekIndex) =>
            week.map((level, dayIndex) => (
              <span
                key={`${weekIndex}-${dayIndex}`}
                className={cn("h-3 rounded-[3px]", practiceFill[level])}
              />
            )),
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="flex h-6 items-center rounded-full bg-white px-2.5 shadow-[0_1px_2px_rgba(10,10,11,0.06)]">
          <Bar className="h-1.5 w-7 bg-brand/60" />
        </span>
        <span className="flex h-6 items-center rounded-full bg-white px-2.5 shadow-[0_1px_2px_rgba(10,10,11,0.06)]">
          <Bar className="h-1.5 w-5" />
        </span>
        <span className="flex h-6 items-center rounded-full bg-white px-2.5 shadow-[0_1px_2px_rgba(10,10,11,0.06)]">
          <Bar className="h-1.5 w-4" />
        </span>
        <span className="flex h-6 w-9 items-center justify-center rounded-full bg-[#0A0A0B] text-white">
          <Glyph path={GLYPHS.plus} className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Build Real Products — a product taking shape in an editor window.
 *
 * Held to one compact card: this tile traded panel heights with Connect & Grow, which
 * needed the room for its session row, and the columns only stay level if the swap is
 * even.
 */
function BuildIllustration() {
  return (
    <div className={cn(STAGE, "p-3.5")}>
      <div className={cn(CARD, "p-2.5")}>
        <div className="flex items-center gap-1.5">
          {["#F8B9BC", "#F6D68C", "#A9DBD4"].map((tone) => (
            <span
              key={tone}
              style={{ backgroundColor: tone }}
              className="h-1.5 w-1.5 rounded-full"
            />
          ))}
          <Bar className="ml-1.5 h-1.5 w-10" />
        </div>

        <div className="mt-2 flex gap-2">
          <div className="flex flex-1 flex-col gap-1.5">
            <span className="h-5 rounded-md bg-brand/10" />
            <Bar className="h-1.5 w-3/5" />
          </div>

          <div className="flex w-1/3 flex-col gap-1.5">
            <span className="h-3 rounded-md bg-black/[0.05]" />
            <span className="h-3 rounded-md bg-brand/25" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Leaderboard standings: the learner on top, the runner-up behind. */
const standings = [
  { member: careerOsCommunity[4], fill: "w-[86%] bg-brand", leader: true },
  { member: careerOsCommunity[2], fill: "w-[54%] bg-black/[0.18]", leader: false },
] as const;

/**
 * Compete & Win — the top two rows of a contest leaderboard.
 *
 * A podium was the first draft and it does not survive this panel: at 6rem the steps
 * come out nearly square and read as blocks of colour rather than a ranking. Rows of
 * different length carry the same idea and stay legible at any tile width.
 */
function CompeteIllustration() {
  return (
    <div className={cn(STAGE, "gap-1.5")}>
      {standings.map((entry, index) => (
        <div key={index} className={cn(ROW, "flex items-center gap-2.5 py-1.5")}>
          <span
            className={cn(
              "grid h-5 w-5 shrink-0 place-items-center rounded-md",
              entry.leader ? "bg-brand text-white" : "bg-black/[0.06]",
            )}
          >
            {entry.leader && (
              <Glyph path={GLYPHS.star} className="h-3 w-3 fill-current stroke-none" />
            )}
          </span>

          <Avatar member={entry.member} className="h-6 w-6" />

          <span className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
            <span className={cn("block h-full rounded-full", entry.fill)} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Four faces fit the strip; the rest are carried by the count beside them. */
const strip = careerOsCommunity.slice(0, 4);

/**
 * Connect & Grow — the cohort, and the session running right now.
 *
 * The one panel that keeps its words: the session's name is what makes it a community
 * rather than a row of faces, and there is nowhere else on the tile to say it.
 *
 * The portraits are placeholders — see `careerOsCommunity` for what replacing them
 * takes.
 *
 * **The one panel that has to give way when it narrows.** Five overlapping 48px faces
 * and a two-line session row do not fit the ~14rem panel the two-column layout hands
 * this tile, and the session's name truncating to "Live AM…" is worse than showing
 * less. So the container queries below — keyed off the panel, which is the query
 * container — shrink the faces, drop the session's own portrait and reduce the badge
 * to its pulsing dot. Both lines of the session then fit whole at every width.
 */
function ConnectIllustration() {
  return (
    <div className={STAGE}>
      <div className="flex justify-center">
        <div className="flex -space-x-3">
          {strip.map((member) => (
            <Avatar
              key={member.id}
              member={member}
              className="h-10 w-10 ring-[3px] ring-white @min-[16rem]:h-12 @min-[16rem]:w-12"
            />
          ))}

          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-[0.6875rem] font-bold text-white ring-[3px] ring-white @min-[16rem]:h-12 @min-[16rem]:w-12 @min-[16rem]:text-[0.75rem]">
            {careerOsCommunityOverflow}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(10,10,11,0.06)]">
        <Avatar
          member={careerOsCommunity[1]}
          className="hidden h-8 w-8 @min-[16rem]:block"
        />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.8125rem] leading-tight font-semibold text-ink">
            Live AMA today
          </span>
          <span className="block truncate text-[0.6875rem] leading-tight text-[rgba(10,10,11,0.55)]">
            Cracking system design
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-2 py-1 text-[0.6875rem] font-semibold text-brand">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          <span className="hidden @min-[16rem]:inline">Live</span>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Get Career Ready — the placement curve.
 *
 * The chart is stretched to the panel with `preserveAspectRatio="none"`, so the stroke
 * carries `vector-effect="non-scaling-stroke"` to hold its weight through the
 * non-uniform scale. The end marker is a positioned element rather than an SVG circle
 * for the same reason — a scaled circle would render as an ellipse.
 */
function CareerIllustration() {
  return (
    <div className={cn(STAGE, "gap-3")}>
      <div className={cn(CARD, "flex min-h-0 flex-1 flex-col")}>
        <div className="flex items-center gap-2">
          <Bar className="h-2 w-20" />
          <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-brand">
            <Glyph path={GLYPHS.trend} className="h-2.5 w-2.5" />
            <span className="text-[0.625rem] font-bold">92%</span>
          </span>
        </div>

        <div className="relative mt-2 min-h-[3rem] flex-1">
          <svg
            viewBox="0 0 240 96"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="career-os-curve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 80C30 78 50 71 78 64C106 57 122 49 148 39C174 29 202 18 240 11L240 96L0 96Z"
              fill="url(#career-os-curve)"
            />
            <path
              d="M0 80C30 78 50 71 78 64C106 57 122 49 148 39C174 29 202 18 240 11"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <span className="absolute top-[11.5%] right-0 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-brand ring-[3px] ring-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((index) => (
          <div key={index} className={cn(ROW, "flex items-center gap-2 py-2")}>
            <span
              className={cn(
                "h-5 w-5 shrink-0 rounded-md",
                index === 0 ? "bg-brand/15" : "bg-black/[0.06]",
              )}
            />
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <Bar className="h-1.5 w-full" />
              <Bar className="h-1.5 w-2/3" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const illustrations: Record<CareerOsIllustrationName, () => ReactNode> = {
  learn: LearnIllustration,
  build: BuildIllustration,
  practice: PracticeIllustration,
  compete: CompeteIllustration,
  connect: ConnectIllustration,
  career: CareerIllustration,
};

/**
 * The illustration for a tile.
 *
 * Purely decorative: each one restates its tile's title and description in pictures,
 * so it is hidden from assistive tech rather than reading its parts out of context.
 */
export function CareerOsIllustration({ name }: { name: CareerOsIllustrationName }) {
  const Illustration = illustrations[name];

  return (
    <div aria-hidden="true" className="h-full w-full select-none">
      <Illustration />
    </div>
  );
}
