import type { ReactNode } from "react";

import { demoProject, demoSteps, type DemoStepId } from "../../constants/demo.constants";
import { DemoIcon } from "./demo-icon";

type DemoWorkspaceProps = {
  /** Which rail step reads as current. */
  step: DemoStepId;
  children: ReactNode;
};

const META = [
  { icon: "clock", value: demoProject.duration },
  { icon: "video", value: demoProject.videos },
] as const;

const TABS = ["Learning Hub", "Workspace", "Discussion", "Reviews"] as const;

/**
 * The project page: its header, the tab strip, the numbered step rail, and whichever
 * panel the current chapter is showing.
 *
 * **Steps ahead of the current one are locked, and the rail derives that rather than
 * being told.** Walking forward through the rail is the spine of the whole tour — the
 * padlocks falling away one chapter at a time is what shows the programme has an order,
 * and deriving it from the step index means a reordered `demoSteps` cannot disagree with
 * the chapter list.
 */
export function DemoWorkspace({ step, children }: DemoWorkspaceProps) {
  const activeIndex = demoSteps.findIndex((item) => item.id === step);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-none px-[26px] pb-[13px] pt-[15px]">
        <div className="flex items-center gap-[7px] text-[10.5px] text-[var(--bsd-text-4)]">
          <span>Library</span>
          <span>/</span>
          <span>{demoProject.track}</span>
          <span>/</span>
          <span className="text-[var(--bsd-text-2)]">{demoProject.short}</span>
        </div>

        <div className="mt-[9px] flex items-start justify-between gap-[20px]">
          <div>
            <h3 className="text-[17.5px] font-bold tracking-[-0.02em] text-white">
              {demoProject.title}
            </h3>
            <p className="mt-[5px] max-w-[720px] text-[10.5px] leading-relaxed text-[var(--bsd-text-3)]">
              {demoProject.summary}
            </p>
          </div>

          <div className="flex items-center gap-[7px]">
            {(["bookmark", "share"] as const).map((icon) => (
              <span
                key={icon}
                className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] border border-[var(--bsd-line)]"
              >
                <DemoIcon name={icon} size={13} color="var(--bsd-text-3)" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-[11px] flex items-center gap-[15px]">
          <span className="rounded-[5px] border border-[var(--bsd-orange)]/45 px-[8px] py-[2px] text-[9.5px] font-medium text-[var(--bsd-orange)]">
            {demoProject.level}
          </span>
          <span className="flex items-center gap-[4px]">
            <DemoIcon name="star" size={11} color="var(--bsd-orange)" filled />
            <span className="text-[10px] font-semibold text-white">
              {demoProject.rating}
            </span>
            <span className="text-[10px] text-[var(--bsd-text-4)]">
              ({demoProject.ratingCount})
            </span>
          </span>
          <span className="text-[10px] text-[var(--bsd-text-3)]">
            {demoProject.students} students
          </span>
          {META.map((item) => (
            <span key={item.value} className="flex items-center gap-[5px]">
              <DemoIcon name={item.icon} size={11} color="var(--bsd-text-4)" />
              <span className="text-[10px] text-[var(--bsd-text-3)]">{item.value}</span>
            </span>
          ))}
          <span className="text-[10px] text-[var(--bsd-text-4)]">{demoProject.updated}</span>
        </div>

        <div className="mt-[11px] flex items-center gap-[6px]">
          {demoProject.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-[9px] py-[3px] text-[9.5px] font-medium text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-[13px] flex items-center gap-[11px]">
          <span className="rounded-[6px] bg-[var(--bsd-lime)] px-[15px] py-[6px] text-[11px] font-semibold text-black">
            Phase 1
          </span>
          <span className="flex items-center gap-[6px] rounded-[6px] bg-[var(--bsd-surface-3)] px-[13px] py-[6px] text-[11px] font-medium text-[var(--bsd-text-4)]">
            <DemoIcon name="lock" size={11} />
            Phase 2
          </span>
          <span className="text-[10px] text-[var(--bsd-text-4)]">
            Complete Phase 1 and submit your project to unlock Phase 2
          </span>
        </div>
      </div>

      <div className="flex flex-none items-center gap-[26px] border-b border-[var(--bsd-line)] px-[26px]">
        {TABS.map((tab) => {
          const isActive = tab === "Workspace";
          return (
            <span
              key={tab}
              className="flex items-center gap-[7px] border-b-2 pb-[10px] text-[11.5px] font-medium"
              style={{
                borderColor: isActive ? "var(--bsd-lime)" : "transparent",
                color: isActive ? "var(--bsd-lime)" : "var(--bsd-text-3)",
              }}
            >
              <DemoIcon name={isActive ? "code" : "book"} size={13} />
              {tab}
            </span>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-1">
        <nav className="w-[196px] flex-none border-r border-[var(--bsd-line)] py-[13px]">
          {demoSteps.map((item, index) => {
            const isActive = index === activeIndex;
            const isLocked = index > activeIndex;
            const isDone = index < activeIndex;

            return (
              <div
                key={item.id}
                className="flex items-center gap-[10px] border-l-2 px-[15px] py-[9px] transition-colors duration-300"
                style={{
                  borderColor: isActive ? "var(--bsd-lime)" : "transparent",
                  background: isActive ? "var(--bsd-lime-dim)" : "transparent",
                }}
              >
                <span
                  className="flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full text-[9.5px] font-semibold"
                  style={{
                    background: isActive
                      ? "var(--bsd-lime)"
                      : isDone
                        ? "rgba(52,211,153,0.16)"
                        : "var(--bsd-surface-3)",
                    color: isActive
                      ? "#000"
                      : isDone
                        ? "var(--bsd-green)"
                        : "var(--bsd-text-4)",
                  }}
                >
                  {isLocked ? (
                    <DemoIcon name="lock" size={10} />
                  ) : isDone ? (
                    <DemoIcon name="check" size={11} />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className="text-[11.5px] font-medium"
                  style={{
                    color: isActive
                      ? "var(--bsd-lime)"
                      : isLocked
                        ? "var(--bsd-text-4)"
                        : "var(--bsd-text-2)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>

        {/* `min-w-0` so a wide panel scrolls inside itself instead of stretching the rail. */}
        <div className="min-w-0 flex-1 overflow-hidden px-[24px] py-[18px]">{children}</div>
      </div>
    </div>
  );
}
