import Image from "next/image";

import {
  demoChrome,
  demoContinue,
  demoProject,
  demoStats,
  demoTrending,
} from "../../constants/demo.constants";
import { DemoIcon, type DemoIconName } from "./demo-icon";

/** 0–1 through the chapter; the project card lifts as the cursor arrives on it. */
type DemoLibraryProps = { progress: number };

const STAT_ICONS: DemoIconName[] = ["box", "play", "clock", "flame"];

/**
 * The first chapter's screen: the dashboard, with the project the tour is about to open
 * sitting first in the trending row.
 *
 * **The project card is the only thing here that reacts.** It lifts and takes a lime
 * border as the simulated cursor reaches it, which is what makes the click that ends the
 * chapter read as landing on something rather than happening at the screen in general.
 */
export function DemoLibrary({ progress }: DemoLibraryProps) {
  const hovering = progress > 0.52;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[22px] overflow-hidden px-[26px] py-[22px]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[var(--bsd-text-4)]">
            {demoChrome.greetingDate}
          </div>
          <div className="mt-[7px] text-[25px] font-bold tracking-[-0.02em] text-white">
            {demoChrome.greeting}
          </div>
          <div className="mt-[5px] text-[12.5px] text-[var(--bsd-text-3)]">
            {demoChrome.greetingSub}
          </div>
        </div>

        <span className="flex items-center gap-[8px] rounded-full bg-[var(--bsd-lime)] px-[16px] py-[9px] text-[12px] font-semibold text-black">
          <DemoIcon name="book" size={14} />
          Explore Library
        </span>
      </div>

      <div className="grid grid-cols-4 gap-[13px]">
        {demoStats.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-[13px] border border-[var(--bsd-line)] bg-[var(--bsd-surface)] p-[15px]"
          >
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[var(--bsd-line)] bg-[var(--bsd-surface-2)]">
              <DemoIcon name={STAT_ICONS[index]} size={13} color="var(--bsd-lime)" />
            </span>
            <div className="mt-[11px] text-[21px] font-bold tracking-[-0.02em] text-white">
              {stat.value}
            </div>
            <div className="mt-[2px] text-[10.5px] text-[var(--bsd-text-3)]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div>
        <span className="text-[14px] font-semibold text-white">Continue learning</span>

        <div className="mt-[11px] grid grid-cols-2 gap-[15px]">
          {demoContinue.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-[13px] rounded-[13px] border border-[var(--bsd-line)] bg-[var(--bsd-surface)] p-[13px]"
            >
              <div className="relative h-[56px] w-[76px] flex-none overflow-hidden rounded-[8px]">
                <Image src={item.image} alt="" fill sizes="160px" className="object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-[11.5px] font-semibold text-white">
                  {item.title}
                </div>
                <div className="mt-[3px] text-[9.5px] text-[var(--bsd-text-4)]">
                  {item.percent}% complete · {item.meta}
                </div>
                <div className="mt-[6px] flex items-center gap-[5px]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-[7px] py-[1px] text-[8.5px] font-medium text-black"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-[3px] flex items-center gap-[3px] text-[9.5px] font-medium text-[var(--bsd-lime)]">
                    <DemoIcon name="play" size={10} filled />
                    Resume
                  </span>
                </div>
              </div>

              {/*
                Percentage ring. Drawn with a dash on a rotated circle rather than an arc
                path: one number changes (`strokeDasharray`) instead of recomputing an
                arc's endpoints, and the geometry cannot degenerate at 0% or 100%.
              */}
              <span className="relative flex h-[34px] w-[34px] flex-none items-center justify-center">
                <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="var(--bsd-surface-3)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="var(--bsd-lime)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${(item.percent / 100) * 97.4} 97.4`}
                  />
                </svg>
                <span className="text-[9px] font-bold text-white">{item.percent}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-white">Trending This Week</span>
          <span className="flex items-center gap-[5px] text-[11px] text-[var(--bsd-lime)]">
            Browse all
            <DemoIcon name="arrow" size={12} />
          </span>
        </div>

        <div className="mt-[13px] grid grid-cols-3 gap-[15px]">
          {/*
            The tour's project, first. Given its own markup rather than folded into the
            map below because it is the only card that carries the hover state, a longer
            description and a rating row.
          */}
          <article
            data-demo-target="project-card"
            className="overflow-hidden rounded-[13px] border bg-[var(--bsd-surface)] transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
              borderColor: hovering ? "var(--bsd-lime-line)" : "var(--bsd-line)",
              transform: hovering ? "translateY(-4px)" : "none",
              boxShadow: hovering
                ? "0 18px 40px -18px rgba(0,0,0,0.75), 0 0 0 1px var(--bsd-lime-dim)"
                : "none",
            }}
          >
            <div className="relative h-[112px] w-full">
              <Image
                src={demoProject.image}
                alt=""
                fill
                sizes="300px"
                className="object-cover"
              />
              <span className="absolute left-[9px] top-[9px] rounded-[5px] bg-[var(--bsd-lime)] px-[7px] py-[2px] text-[8.5px] font-bold uppercase tracking-[0.08em] text-black">
                Pro
              </span>
              {/* Progress hairline along the card's foot, as on the reference cards. */}
              <span className="absolute bottom-0 left-0 h-[3px] w-[34%] bg-[var(--bsd-lime)]" />
            </div>

            <div className="p-[13px]">
              <div className="text-[11.5px] font-semibold leading-snug text-white">
                {demoProject.title}
              </div>
              <div className="mt-[6px] line-clamp-2 text-[10px] leading-relaxed text-[var(--bsd-text-3)]">
                {demoProject.summary}
              </div>

              <div className="mt-[10px] flex items-center gap-[5px]">
                {demoProject.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-[7px] py-[2px] text-[8.5px] font-medium text-black"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-[8.5px] text-[var(--bsd-text-4)]">+3 more</span>
              </div>

              <div className="mt-[11px] flex items-center justify-between">
                <span className="flex items-center gap-[4px]">
                  <DemoIcon name="star" size={11} color="var(--bsd-orange)" filled />
                  <span className="text-[10px] font-semibold text-white">
                    {demoProject.rating}
                  </span>
                  <span className="text-[9.5px] text-[var(--bsd-text-4)]">
                    ({demoProject.ratingCount})
                  </span>
                </span>
                <span className="rounded-full border border-[var(--bsd-orange)]/40 px-[8px] py-[2px] text-[9px] font-medium text-[var(--bsd-orange)]">
                  {demoProject.level}
                </span>
              </div>
            </div>
          </article>

          {demoTrending.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-[13px] border border-[var(--bsd-line)] bg-[var(--bsd-surface)]"
            >
              <div className="relative h-[112px] w-full">
                <Image src={card.image} alt="" fill sizes="300px" className="object-cover" />
                <span className="absolute left-[9px] top-[9px] rounded-[5px] bg-white/85 px-[7px] py-[2px] text-[8.5px] font-bold uppercase tracking-[0.08em] text-black">
                  Pro
                </span>
              </div>
              <div className="p-[13px]">
                <div className="text-[11.5px] font-semibold leading-snug text-white">
                  {card.title}
                </div>
                <div className="mt-[8px] text-[9.5px] text-[var(--bsd-text-4)]">
                  {card.meta}
                </div>
                <div className="mt-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-[4px]">
                    <DemoIcon name="star" size={11} color="var(--bsd-orange)" filled />
                    <span className="text-[10px] font-semibold text-white">4.8</span>
                  </span>
                  <span className="rounded-full border border-[var(--bsd-line)] px-[8px] py-[2px] text-[9px] font-medium text-[var(--bsd-text-3)]">
                    {card.level}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
