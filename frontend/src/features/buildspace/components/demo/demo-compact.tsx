import Image from "next/image";

import { buildspaceChapters, buildspaceOutro } from "../../constants/buildspace.constants";
import {
  demoBuild,
  demoGithub,
  demoPlan,
  demoProject,
  demoReview,
  demoShip,
} from "../../constants/demo.constants";
import { DemoIcon } from "./demo-icon";

type DemoCompactProps = { index: number; progress: number };

/**
 * The phone version of the tour.
 *
 * **It is a different component rather than the same canvas scaled down, and it has to
 * be.** The canvas is 1280px of real product UI; at 375px that is a scale of 0.29, which
 * turns 10px labels into 3px and every panel into grey noise. Nothing about the desktop
 * composition survives the reduction, so the phone gets the same six beats rendered as
 * one legible card at a time instead.
 *
 * Each chapter shows the single thing that chapter is about — the project, the answer,
 * the scores, the checklist, the commit counts, the confirmation — at a size a thumb's
 * distance away can actually read.
 */
export function DemoCompact({ index, progress }: DemoCompactProps) {
  const chapter = buildspaceChapters[index];

  return (
    <div className="bsd-root rounded-[16px] border border-[var(--bsd-line)] bg-[var(--bsd-bg)] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[var(--bsd-lime)] text-black">
            <DemoIcon name="code" size={14} />
          </span>
          <span className="text-[13px] font-bold text-white">BuildSpace</span>
        </span>
        <span className="rounded-full border border-[var(--bsd-lime-line)] bg-[var(--bsd-lime-dim)] px-2.5 py-1 text-[10px] font-semibold text-[var(--bsd-lime)]">
          {chapter.chapter}
        </span>
      </div>

      <div className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-white">
        {chapter.title}
      </div>

      <div className="mt-3">
        <CompactBody index={index} progress={progress} />
      </div>

      {/* Chapter position. Dots rather than a bar: there are seven of them and the
          viewer's question is "how many left", not "how far through this one". */}
      <div className="mt-4 flex items-center gap-1.5">
        {buildspaceChapters.map((item, dot) => (
          <span
            key={item.id}
            className="h-[3px] flex-1 rounded-full transition-colors duration-500"
            style={{
              background:
                dot === index
                  ? "var(--bsd-lime)"
                  : dot < index
                    ? "rgba(215,255,95,0.35)"
                    : "var(--bsd-line)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** The one panel that belongs to the current chapter. */
function CompactBody({ index, progress }: DemoCompactProps) {
  const chapter = buildspaceChapters[index].id;

  if (chapter === "project") {
    return (
      <div className="rounded-[12px] border border-[var(--bsd-line)] bg-[var(--bsd-surface)] p-3">
        <div className="relative h-[128px] w-full overflow-hidden rounded-[9px]">
          <Image
            src={demoProject.image}
            alt=""
            fill
            sizes="(max-width: 900px) 90vw, 300px"
            className="object-cover"
          />
        </div>
        <div className="mt-2.5 text-[12.5px] font-semibold text-white">
          {demoProject.title}
        </div>
        <div className="mt-1 text-[11px] text-[var(--bsd-text-3)]">
          {demoProject.level} · {demoProject.duration} · {demoProject.videos}
        </div>
      </div>
    );
  }

  if (chapter === "plan") {
    const typed = demoPlan.answer.slice(
      0,
      Math.round(Math.min(1, progress / 0.85) * demoPlan.answer.length),
    );
    return (
      <div className="rounded-[12px] border border-[var(--bsd-lime-line)] bg-[var(--bsd-surface-2)] p-3">
        <div className="text-[12px] font-medium text-white">{demoPlan.question}</div>
        <div className="mt-2 min-h-[86px] text-[11.5px] leading-relaxed text-[var(--bsd-text-2)]">
          {typed}
          {typed.length < demoPlan.answer.length ? <span className="bsd-caret" /> : null}
        </div>
      </div>
    );
  }

  if (chapter === "review") {
    const shown = Math.round(Math.min(1, progress / 0.7) * demoReview.scores.length);
    return (
      <div className="rounded-[12px] border border-[var(--bsd-lime-line)] bg-[var(--bsd-surface-2)] p-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-white">
            AI Engineering Review
          </span>
          <span className="rounded-full bg-[var(--bsd-lime)] px-2 py-0.5 text-[11px] font-bold text-black">
            {demoReview.overall}/100
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {demoReview.scores.map((score, i) => {
            const tone = score.tone === "green" ? "var(--bsd-green)" : "var(--bsd-orange)";
            const isShown = i < shown;
            return (
              <div key={score.label} className="flex items-center gap-2.5">
                <span className="w-[78px] flex-none text-[11px] text-[var(--bsd-text-2)]">
                  {score.label}
                </span>
                <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-[var(--bsd-surface-3)]">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: isShown ? `${score.value}%` : "0%",
                      background: tone,
                      transition: "width 900ms cubic-bezier(.22,1,.36,1)",
                    }}
                  />
                </span>
                <span
                  className="w-[18px] flex-none text-right text-[11px] font-semibold"
                  style={{ color: tone, opacity: isShown ? 1 : 0 }}
                >
                  {score.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (chapter === "build") {
    const checked = 2 + (progress > 0.45 ? 1 : 0);
    const percent = Math.round((checked / demoBuild.tasks.length) * 100);
    return (
      <div className="rounded-[12px] border border-[var(--bsd-lime-line)] bg-[var(--bsd-surface-2)] p-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-white">Milestone 3</span>
          <span className="text-[14px] font-bold text-[var(--bsd-lime)]">{percent}%</span>
        </div>
        <span className="mt-2 block h-[5px] overflow-hidden rounded-full bg-[var(--bsd-surface-3)]">
          <span
            className="block h-full rounded-full bg-[var(--bsd-lime)]"
            style={{ width: `${percent}%`, transition: "width 800ms cubic-bezier(.22,1,.36,1)" }}
          />
        </span>
        <div className="mt-3 flex flex-col gap-1.5">
          {demoBuild.tasks.slice(0, 3).map((task, i) => {
            const isDone = i < checked;
            return (
              <div key={task} className="flex items-center gap-2.5">
                <span
                  className="flex h-4 w-4 flex-none items-center justify-center rounded-[4px] border transition-colors duration-500"
                  style={{
                    borderColor: isDone ? "var(--bsd-lime)" : "var(--bsd-text-4)",
                    background: isDone ? "var(--bsd-lime)" : "transparent",
                  }}
                >
                  {isDone ? <DemoIcon name="check" size={11} color="#000" /> : null}
                </span>
                <span
                  className="text-[11.5px]"
                  style={{ color: isDone ? "var(--bsd-lime)" : "var(--bsd-text-3)" }}
                >
                  {task}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (chapter === "github") {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {demoGithub.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[12px] border border-[var(--bsd-line)] bg-[var(--bsd-surface-2)] p-3"
          >
            <div className="text-[18px] font-bold leading-none text-white">
              {stat.value}
            </div>
            <div className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[var(--bsd-text-4)]">
              {stat.label}
            </div>
            <div className="text-[10px] text-[var(--bsd-green)]">{stat.delta}</div>
          </div>
        ))}
      </div>
    );
  }

  if (chapter === "ship") {
    const submitted = progress > 0.55;
    return (
      <div className="rounded-[12px] border border-[var(--bsd-line)] bg-[var(--bsd-surface-2)] p-3">
        <div
          className="flex items-center justify-center gap-2 rounded-[9px] py-2.5 text-[12px] font-semibold transition-colors duration-500"
          style={{
            background: submitted ? "rgba(52,211,153,0.12)" : "var(--bsd-lime)",
            color: submitted ? "var(--bsd-green)" : "#000",
          }}
        >
          <DemoIcon name={submitted ? "check" : "box"} size={14} />
          {submitted ? "Submitted for Review" : demoShip.submit}
        </div>

        <div
          className="mt-3 transition-all duration-700"
          style={{
            opacity: submitted ? 1 : 0,
            transform: submitted ? "none" : "translateY(8px)",
          }}
        >
          <div className="text-[12px] font-medium text-white">{demoShip.submitted}</div>
          <div className="mt-2 flex flex-col gap-1">
            {demoShip.results.map((result) => (
              <div key={result.label} className="flex items-center justify-between">
                <span className="text-[10.5px] text-[var(--bsd-text-4)]">
                  {result.label}
                </span>
                <span className="text-[11px] text-white">{result.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center">
      <div
        className="text-[24px] font-bold tracking-[-0.02em] text-white transition-all duration-700"
        style={{
          opacity: progress > 0.12 ? 1 : 0,
          transform: progress > 0.12 ? "none" : "translateY(10px)",
        }}
      >
        {buildspaceOutro.lead}
      </div>
      <div
        className="text-[14px] text-[var(--bsd-text-2)] transition-all duration-700"
        style={{
          opacity: progress > 0.3 ? 1 : 0,
          transform: progress > 0.3 ? "none" : "translateY(10px)",
        }}
      >
        {buildspaceOutro.trail}
      </div>
    </div>
  );
}
