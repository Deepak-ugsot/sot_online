import {
  demoBuild,
  demoGithub,
  demoPlan,
  demoReview,
  demoShip,
} from "../../constants/demo.constants";
import { DemoIcon, type DemoIconName } from "./demo-icon";

/**
 * The five workspace panels, one per chapter after the library.
 *
 * **They share this file because they share one contract: `progress`, and nothing else.**
 * Each derives its whole animated state from how far through its chapter the tour is
 * — a character count, a number of revealed score rows, whether the submit has landed —
 * so there is no panel-local state and no timers anywhere below. That is what lets the
 * tour be paused, resumed and jumped around: every panel is a pure function of the
 * clock, so any position renders correctly on the first frame.
 */

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Re-scales `progress` to a window inside the chapter, so a panel can sequence several
 * things across one number: `phase(p, 0.1, 0.6)` is 0 until a tenth of the way in, then
 * runs 0→1 over the next half of the chapter.
 */
const phase = (progress: number, start: number, end: number) =>
  clamp01((progress - start) / (end - start));

/** The project's own easing, so panel motion matches the site's. */
const EASE = "cubic-bezier(.22,1,.36,1)";

/** Shared shell: a panel's title, blurb and the question chips where they apply. */
function PanelHead({
  title,
  blurb,
  chips = false,
}: {
  title: string;
  blurb: string;
  chips?: boolean;
}) {
  return (
    <>
      <div className="text-[15px] font-semibold text-white">{title}</div>
      <div className="mt-[4px] text-[11px] text-[var(--bsd-text-3)]">{blurb}</div>

      {chips ? (
        <div className="mt-[11px] flex items-center gap-[6px]">
          {["Q1", "Q2", "Q3", "Q4", "Q5"].map((label, index) => (
            <span
              key={label}
              className="rounded-[5px] px-[10px] py-[4px] text-[10.5px] font-semibold"
              style={
                index === 0
                  ? { background: "var(--bsd-lime)", color: "#000" }
                  : { background: "#fff", color: "#000" }
              }
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Chapter 2 — the plan. The answer types itself into the box, and only once it is
 * finished does "Submit for AI Review" come alive.
 *
 * That order is the point of the screen: the button is deliberately dead while the box is
 * empty, so the tour shows the gate rather than just the form.
 */
export function DemoPlanPanel({ progress }: { progress: number }) {
  const typing = phase(progress, 0.1, 0.82);
  const typed = demoPlan.answer.slice(0, Math.round(typing * demoPlan.answer.length));
  const complete = typing >= 1;

  return (
    <div className="flex h-full flex-col">
      <PanelHead title={demoPlan.eyebrow} blurb={demoPlan.blurb} chips />

      <div className="mt-[13px] flex items-center gap-[7px]">
        <DemoIcon name="clock" size={12} color="var(--bsd-text-4)" />
        <span className="text-[10.5px] text-[var(--bsd-text-4)]">{demoPlan.meta}</span>
      </div>

      <div className="mt-[11px] text-[12.5px] font-semibold text-white">
        {demoPlan.question}
      </div>
      <div className="mt-[4px] text-[10.5px] text-[var(--bsd-text-3)]">{demoPlan.hint}</div>

      <div
        className="mt-[13px] flex-1 rounded-[11px] border bg-[var(--bsd-surface-2)] p-[15px] transition-colors duration-500"
        style={{
          borderColor: typing > 0 ? "var(--bsd-lime-line)" : "var(--bsd-line)",
        }}
      >
        {typed.length === 0 ? (
          <span className="text-[11.5px] text-[var(--bsd-text-4)]">
            Walk through your technical approach in detail. Consider: data structures,
            trade-offs, edge cases, and how you would handle failures…
          </span>
        ) : (
          <span className="text-[11.5px] leading-[1.75] text-[var(--bsd-text)]">
            {typed}
            {complete ? null : <span className="bsd-caret" />}
          </span>
        )}
      </div>

      <div className="mt-[13px] flex items-center gap-[10px]">
        <span className="flex items-center gap-[6px] rounded-[7px] border border-[var(--bsd-line)] px-[14px] py-[8px] text-[11px] font-medium text-[var(--bsd-text-2)]">
          <DemoIcon name="file" size={12} />
          Save Draft
        </span>

        <span
          data-demo-target="plan-submit"
          className="flex flex-1 items-center justify-center gap-[7px] rounded-[7px] py-[8px] text-[11px] font-semibold transition-colors duration-500"
          style={{
            background: complete ? "var(--bsd-lime)" : "var(--bsd-surface-3)",
            color: complete ? "#000" : "var(--bsd-text-4)",
          }}
        >
          <DemoIcon name="sparkle" size={12} filled={complete} />
          Submit for AI Review
        </span>

        <span className="flex items-center gap-[6px] rounded-full border border-[var(--bsd-lime-line)] px-[14px] py-[7px] text-[11px] font-medium text-[var(--bsd-lime)]">
          Next
          <DemoIcon name="arrow" size={12} />
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const SCORE_ICONS: DemoIconName[] = ["layers", "shield", "trend", "zap", "file"];

/**
 * Chapter 3 — the review. Five dimensions score in sequence, then the two lists of
 * findings arrive.
 *
 * The bars are CSS width transitions on a value that only changes when a row's reveal
 * fires, so they stay on the compositor rather than being re-laid-out on every tick of
 * the tour clock.
 */
export function DemoReviewPanel({ progress }: { progress: number }) {
  const reveal = phase(progress, 0.08, 0.62);
  const shown = Math.round(reveal * demoReview.scores.length);
  const overall = Math.round(phase(progress, 0.1, 0.66) * demoReview.overall);
  const findings = phase(progress, 0.6, 0.78) >= 1;

  return (
    <div className="flex h-full flex-col">
      <PanelHead
        title="AI Engineering Review"
        blurb={`Q1: ${demoPlan.question}`}
        chips
      />

      <div className="mt-[13px] grid min-h-0 flex-1 grid-cols-[1fr_1.12fr] gap-[13px]">
        <div className="flex flex-col overflow-hidden rounded-[11px] border border-[var(--bsd-line)] bg-[var(--bsd-surface-2)]">
          <div className="flex items-center gap-[8px] border-b border-[var(--bsd-line)] px-[14px] py-[10px]">
            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-[var(--bsd-surface-3)]">
              <DemoIcon name="file" size={11} color="var(--bsd-lime)" />
            </span>
            <span className="text-[11.5px] font-semibold text-white">Your Answer</span>
          </div>
          <p className="px-[14px] py-[13px] text-[11px] leading-[1.8] text-[var(--bsd-text-2)]">
            {demoPlan.answer}
          </p>
        </div>

        <div className="flex flex-col overflow-hidden rounded-[11px] border border-[var(--bsd-lime-line)] bg-[var(--bsd-surface-2)]">
          <div className="flex items-center gap-[8px] border-b border-[var(--bsd-line)] px-[14px] py-[10px]">
            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-[var(--bsd-lime-dim)]">
              <DemoIcon name="sparkle" size={11} color="var(--bsd-lime)" filled />
            </span>
            <span className="text-[11.5px] font-semibold text-white">
              AI Engineering Review
            </span>
            <span className="ml-auto rounded-full bg-[var(--bsd-lime)] px-[9px] py-[2px] text-[10.5px] font-bold text-black">
              {overall}/100
            </span>
          </div>

          <div className="flex flex-col gap-[8px] px-[14px] py-[12px]">
            {demoReview.scores.map((score, index) => {
              const isShown = index < shown;
              const tone =
                score.tone === "green" ? "var(--bsd-green)" : "var(--bsd-orange)";
              return (
                <div key={score.label} className="flex items-center gap-[9px]">
                  <DemoIcon
                    name={SCORE_ICONS[index]}
                    size={12}
                    color={isShown ? tone : "var(--bsd-text-4)"}
                  />
                  <span className="w-[86px] flex-none text-[10.5px] text-[var(--bsd-text-2)]">
                    {score.label}
                  </span>
                  <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-[var(--bsd-surface-3)]">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: isShown ? `${score.value}%` : "0%",
                        background: tone,
                        transition: `width 900ms ${EASE}`,
                      }}
                    />
                  </span>
                  <span
                    className="w-[20px] flex-none text-right text-[10.5px] font-semibold transition-opacity duration-500"
                    style={{ color: tone, opacity: isShown ? 1 : 0 }}
                  >
                    {score.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="mt-auto border-t border-[var(--bsd-line)] px-[14px] py-[12px] transition-all duration-700"
            style={{
              opacity: findings ? 1 : 0,
              transform: findings ? "none" : "translateY(8px)",
              transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
            }}
          >
            <div className="text-[10.5px] font-semibold text-white">Strengths</div>
            {demoReview.strengths.map((item) => (
              <div key={item} className="mt-[5px] flex items-start gap-[6px]">
                <DemoIcon name="check" size={11} color="var(--bsd-green)" />
                <span className="text-[10px] leading-snug text-[var(--bsd-green)]">
                  {item}
                </span>
              </div>
            ))}

            <div className="mt-[10px] text-[10.5px] font-semibold text-white">
              Needs Work
            </div>
            {demoReview.needsWork.map((item) => (
              <div key={item} className="mt-[5px] flex items-start gap-[6px]">
                <DemoIcon name="spark" size={11} color="var(--bsd-red)" />
                <span className="text-[10px] leading-snug text-[var(--bsd-red)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[12px] flex justify-end">
        <span className="flex items-center gap-[7px] rounded-full bg-[var(--bsd-lime)] px-[16px] py-[8px] text-[11px] font-semibold text-black">
          Continue to Build
          <DemoIcon name="arrow" size={12} />
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Chapter 4 — the build. Two tasks are already done; the third ticks over mid-chapter and
 * the milestone bar moves with it.
 *
 * The bar's target is derived from the tasks actually checked rather than from
 * `demoBuild.progress` alone, so the number and the checklist can never disagree.
 */
export function DemoBuildPanel({ progress }: { progress: number }) {
  const checked = 2 + (phase(progress, 0.34, 0.46) >= 1 ? 1 : 0);
  const percent = Math.round((checked / demoBuild.tasks.length) * 100);
  const repo = phase(progress, 0.55, 0.7) >= 1;

  return (
    <div className="flex h-full flex-col">
      <PanelHead
        title="Build"
        blurb="Your repository is connected. Use your professional tools to build."
      />

      <div className="mt-[13px] rounded-[11px] border border-[var(--bsd-lime-line)] bg-[var(--bsd-surface-2)] p-[15px]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--bsd-text-4)]">
              {demoBuild.sprint}
            </div>
            <div className="mt-[5px] text-[12.5px] font-semibold text-white">
              {demoBuild.milestone}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-[0.12em] text-[var(--bsd-text-4)]">
              Build Progress
            </div>
            <div className="text-[17px] font-bold text-[var(--bsd-lime)]">{percent}%</div>
          </div>
        </div>

        <span className="mt-[11px] block h-[5px] overflow-hidden rounded-full bg-[var(--bsd-surface-3)]">
          <span
            className="block h-full rounded-full bg-[var(--bsd-lime)]"
            style={{ width: `${percent}%`, transition: `width 800ms ${EASE}` }}
          />
        </span>

        <div className="mt-[13px] flex flex-col gap-[7px]">
          {demoBuild.tasks.map((task, index) => {
            const isDone = index < checked;
            const isCurrent = index === checked;
            return (
              <div
                key={task}
                className="flex items-center gap-[10px] rounded-[8px] border px-[12px] py-[8px] transition-colors duration-500"
                style={{
                  borderColor: isDone
                    ? "rgba(215,255,95,0.30)"
                    : isCurrent
                      ? "var(--bsd-line)"
                      : "var(--bsd-line-soft)",
                  background: isCurrent ? "var(--bsd-surface-3)" : "transparent",
                }}
              >
                <span
                  className="flex h-[15px] w-[15px] flex-none items-center justify-center rounded-[4px] border transition-colors duration-500"
                  style={{
                    borderColor: isDone ? "var(--bsd-lime)" : "var(--bsd-text-4)",
                    background: isDone ? "var(--bsd-lime)" : "transparent",
                  }}
                >
                  {isDone ? <DemoIcon name="check" size={10} color="#000" /> : null}
                </span>
                <span
                  className="flex-1 text-[11px] transition-colors duration-500"
                  style={{
                    color: isDone
                      ? "var(--bsd-lime)"
                      : isCurrent
                        ? "#fff"
                        : "var(--bsd-text-4)",
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {task}
                </span>
                {isCurrent ? (
                  <span className="rounded-full border border-[var(--bsd-lime-line)] px-[8px] py-[1px] text-[9px] font-semibold text-[var(--bsd-lime)]">
                    Current
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="mt-[13px] rounded-[11px] border border-[var(--bsd-line)] bg-[var(--bsd-surface-2)] p-[15px] transition-all duration-700"
        style={{
          opacity: repo ? 1 : 0,
          transform: repo ? "none" : "translateY(10px)",
          transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="flex items-center gap-[10px]">
          <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[rgba(52,211,153,0.14)]">
            <DemoIcon name="check" size={13} color="var(--bsd-green)" />
          </span>
          <div className="flex-1">
            <div className="text-[11.5px] font-semibold text-white">
              Repository Connected
            </div>
            <div className="text-[10px] text-[var(--bsd-text-4)]">{demoBuild.repo.name}</div>
          </div>
          <span className="rounded-full bg-[var(--bsd-lime)] px-[10px] py-[2px] text-[9.5px] font-semibold text-black">
            Connected
          </span>
        </div>

        <div className="mt-[12px] grid grid-cols-4 gap-[10px]">
          {[
            { label: "Current Branch", value: demoBuild.repo.branch, mono: true },
            { label: "Last Commit", value: demoBuild.repo.lastCommit, mono: false },
            { label: "Latest SHA", value: demoBuild.repo.sha, mono: true },
            { label: "Open PRs", value: demoBuild.repo.prs, mono: false },
          ].map((tile) => (
            <div
              key={tile.label}
              className="rounded-[8px] border border-[var(--bsd-line-soft)] bg-[var(--bsd-surface)] px-[11px] py-[9px]"
            >
              <div className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-[var(--bsd-text-4)]">
                {tile.label}
              </div>
              <div
                className="mt-[3px] text-[11px] text-white"
                style={tile.mono ? { fontFamily: "ui-monospace, monospace" } : undefined}
              >
                {tile.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[13px] flex items-center gap-[10px]">
        <span className="flex flex-1 items-center justify-center gap-[8px] rounded-[8px] bg-[var(--bsd-lime)] py-[9px] text-[11.5px] font-semibold text-black">
          <DemoIcon name="code" size={13} />
          Open in VS Code
        </span>
        <span className="flex items-center gap-[7px] rounded-[8px] border border-[var(--bsd-line)] px-[16px] py-[9px] text-[11.5px] font-medium text-[var(--bsd-text-2)]">
          <DemoIcon name="github" size={13} />
          GitHub
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Chart box, in canvas pixels. The polyline is computed into this.
 *
 * **`width` has to be the card's real inner width, not an arbitrary number.** The `<svg>`
 * is `w-full` with a fixed height, so the default `preserveAspectRatio` letterboxes a
 * viewBox narrower than its box — the line renders at its viewBox width, centred, with
 * dead margins either side and the month labels beneath it no longer under their points.
 * 1008 is the canvas (1280) less the rail (196), the panel's gutters (2x24) and the card's
 * own padding (2x14), so the ratio comes out at 1 and nothing is scaled.
 */
const CHART = { width: 1008, height: 210, pad: 8 };

/**
 * Chapter 5 — the commit trail: repository state, a commit sparkline that draws itself,
 * and the headline counts.
 *
 * **The line is drawn with `stroke-dasharray`, not by animating the path.** One length
 * and one offset animate on the compositor; rebuilding the `d` attribute per frame would
 * re-rasterise the path on every tick and is the usual reason a chart like this stutters.
 */
export function DemoGithubPanel({ progress }: { progress: number }) {
  const draw = phase(progress, 0.1, 0.55);
  const statsIn = phase(progress, 0.42, 0.6);
  const tipIn = phase(progress, 0.56, 0.68) >= 1;

  const max = Math.max(...demoGithub.series);
  const inner = { w: CHART.width - CHART.pad * 2, h: CHART.height - CHART.pad * 2 };
  const points = demoGithub.series.map((value, index) => ({
    x: CHART.pad + (index / (demoGithub.series.length - 1)) * inner.w,
    y: CHART.pad + (1 - value / max) * inner.h,
  }));
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  const area = `${line} L${points[points.length - 1].x} ${CHART.height} L${points[0].x} ${CHART.height} Z`;
  const peak = points[demoGithub.peak.index];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-[10px]">
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] bg-[var(--bsd-surface-3)]">
          <DemoIcon name="github" size={15} color="#fff" />
        </span>
        <div>
          <div className="text-[14px] font-semibold text-white">
            GitHub Engineering Activity
          </div>
          <div className="text-[10.5px] text-[var(--bsd-text-3)]">{demoGithub.blurb}</div>
        </div>
      </div>

      <div className="mt-[13px] grid grid-cols-4 gap-[10px]">
        {[
          { label: "Repository", value: demoGithub.repo, sub: demoGithub.owner, icon: "box" },
          { label: "Current Branch", value: demoGithub.branch, sub: "DEFAULT", icon: "branch" },
          {
            label: "Last Commit",
            value: demoGithub.lastCommitAt,
            sub: demoGithub.lastCommit,
            icon: "commit",
          },
          {
            label: "Working Tree",
            value: "Clean",
            sub: demoGithub.workingTree,
            icon: "check",
          },
        ].map((tile) => (
          <div
            key={tile.label}
            className="rounded-[10px] border border-[var(--bsd-line)] bg-[var(--bsd-surface-2)] p-[11px]"
          >
            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-[var(--bsd-surface-3)]">
              <DemoIcon name={tile.icon as DemoIconName} size={11} color="var(--bsd-lime)" />
            </span>
            <div className="mt-[8px] text-[8.5px] font-semibold uppercase tracking-[0.12em] text-[var(--bsd-text-4)]">
              {tile.label}
            </div>
            <div className="mt-[2px] truncate text-[11px] font-medium text-white">
              {tile.value}
            </div>
            <div className="mt-[1px] truncate text-[9px] text-[var(--bsd-text-4)]">
              {tile.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[12px] flex-1 rounded-[11px] border border-[var(--bsd-line)] bg-[var(--bsd-surface-2)] p-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-white">Commit Calendar</span>
          <span className="flex items-center gap-[3px] rounded-full bg-white p-[2px]">
            {["Daily", "Weekly", "Monthly"].map((option) => (
              <span
                key={option}
                className="rounded-full px-[10px] py-[3px] text-[9.5px] font-semibold"
                style={
                  option === "Monthly"
                    ? { background: "var(--bsd-lime)", color: "#000" }
                    : { color: "#000" }
                }
              >
                {option}
              </span>
            ))}
          </span>
        </div>

        <div className="relative mt-[10px]">
          <svg
            viewBox={`0 0 ${CHART.width} ${CHART.height}`}
            className="w-full"
            style={{ height: CHART.height }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="bsd-commit-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d7ff5f" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#d7ff5f" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Baseline grid — four rules, so the peak has something to be tall against. */}
            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
              <line
                key={fraction}
                x1={CHART.pad}
                x2={CHART.width - CHART.pad}
                y1={CHART.pad + fraction * inner.h}
                y2={CHART.pad + fraction * inner.h}
                stroke="rgba(255,255,255,0.055)"
                strokeWidth="1"
              />
            ))}

            <path
              d={area}
              fill="url(#bsd-commit-fill)"
              style={{ opacity: draw, transition: "opacity 500ms linear" }}
            />
            <path
              d={line}
              fill="none"
              stroke="var(--bsd-lime)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              // A generous dash length: it only has to exceed the path's own length.
              // Overshooting is harmless, while too short would repeat the dash and draw
              // the line more than once.
              strokeDasharray="2000"
              strokeDashoffset={2000 * (1 - draw)}
            />

            {points.map((point, index) =>
              index % 3 === 0 || index === demoGithub.peak.index ? (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={index === demoGithub.peak.index ? 4 : 2.5}
                  fill="var(--bsd-lime)"
                  style={{
                    opacity: draw >= (index + 1) / points.length ? 1 : 0,
                    transition: "opacity 300ms linear",
                  }}
                />
              ) : null,
            )}
          </svg>

          {/* Peak callout, positioned against the same box the polyline was built in. */}
          <div
            className="absolute rounded-[7px] border border-[var(--bsd-line)] bg-[var(--bsd-surface-3)] px-[9px] py-[5px] transition-all duration-500"
            style={{
              left: `${(peak.x / CHART.width) * 100}%`,
              top: `${(peak.y / CHART.height) * 100}%`,
              transform: `translate(-50%, calc(-100% - 10px)) translateY(${tipIn ? 0 : 6}px)`,
              opacity: tipIn ? 1 : 0,
            }}
          >
            <div className="whitespace-nowrap text-[9px] text-[var(--bsd-text-3)]">
              {demoGithub.peak.label}
            </div>
            <div className="flex items-center gap-[5px]">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--bsd-lime)]" />
              <span className="whitespace-nowrap text-[9.5px] font-semibold text-white">
                {demoGithub.peak.value}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[6px] flex justify-between px-[8px]">
          {demoGithub.months.map((month) => (
            <span key={month} className="text-[8.5px] text-[var(--bsd-text-4)]">
              {month}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[12px] grid grid-cols-4 gap-[10px]">
        {demoGithub.stats.map((stat, index) => {
          const shown = statsIn >= (index + 1) / demoGithub.stats.length;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-[10px] rounded-[10px] border border-[var(--bsd-line)] bg-[var(--bsd-surface-2)] p-[11px] transition-all duration-500"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(8px)",
                transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
              }}
            >
              <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-[7px] bg-[var(--bsd-lime)]">
                <DemoIcon
                  name={(["commit", "branch", "pr", "file"] as DemoIconName[])[index]}
                  size={13}
                  color="#000"
                />
              </span>
              <div className="min-w-0">
                <div className="text-[15px] font-bold leading-none text-white">
                  {stat.value}
                </div>
                <div className="mt-[3px] truncate text-[8.5px] font-semibold uppercase tracking-[0.1em] text-[var(--bsd-text-4)]">
                  {stat.label}
                </div>
                <div className="text-[9px] text-[var(--bsd-green)]">
                  {stat.delta} from last 30 days
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Chapter 6 — shipping. Both URLs fill in, the button is pressed, and the confirmation
 * unlocks Phase 2.
 *
 * The two fields type in sequence rather than together, because the cursor can only be in
 * one of them and a form filling itself in two places at once reads as a glitch.
 */
export function DemoShipPanel({ progress }: { progress: number }) {
  const deployTyped = phase(progress, 0.06, 0.3);
  const repoTyped = phase(progress, 0.32, 0.54);
  const pressed = phase(progress, 0.6, 0.66) >= 1;
  const submitted = phase(progress, 0.68, 0.74) >= 1;
  const ready = repoTyped >= 1;

  const fields = [
    {
      label: demoShip.deploymentLabel,
      hint: demoShip.deploymentHint,
      value: demoShip.deploymentValue.slice(
        0,
        Math.round(deployTyped * demoShip.deploymentValue.length),
      ),
      active: deployTyped > 0 && deployTyped < 1,
    },
    {
      label: demoShip.repoLabel,
      hint: demoShip.repoHint,
      value: demoShip.repoValue.slice(
        0,
        Math.round(repoTyped * demoShip.repoValue.length),
      ),
      active: repoTyped > 0 && repoTyped < 1,
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <PanelHead
        title="Submit Attempt"
        blurb="Ship the project, then submit it for engineering review."
      />

      <div className="mt-[15px] flex flex-col gap-[15px]">
        {fields.map((field) => (
          <div key={field.label}>
            <div className="flex items-center gap-[4px]">
              <span className="text-[11.5px] font-semibold text-white">{field.label}</span>
              <span className="text-[11.5px] text-[var(--bsd-red)]">*</span>
            </div>
            <div className="mt-[3px] text-[10px] text-[var(--bsd-text-3)]">{field.hint}</div>
            <div
              className="mt-[8px] rounded-[9px] border bg-[var(--bsd-surface-2)] px-[14px] py-[11px] transition-colors duration-300"
              style={{
                borderColor: field.active
                  ? "var(--bsd-lime-line)"
                  : field.value.length > 0
                    ? "rgba(52,211,153,0.34)"
                    : "var(--bsd-line)",
              }}
            >
              <span
                className="text-[11.5px]"
                style={{
                  color: field.value.length > 0 ? "#fff" : "var(--bsd-text-4)",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                {field.value.length > 0 ? field.value : "https://"}
                {field.active ? <span className="bsd-caret" /> : null}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        data-demo-target="ship-submit"
        className="mt-[17px] flex items-center justify-center gap-[9px] rounded-[9px] py-[11px] text-[12px] font-semibold transition-[background,color,transform,filter] duration-300"
        style={{
          background: ready ? "var(--bsd-lime)" : "var(--bsd-surface-3)",
          color: ready ? "#000" : "var(--bsd-text-4)",
          transform: pressed && !submitted ? "scale(0.985)" : "none",
          filter: pressed && !submitted ? "brightness(0.92)" : "none",
        }}
      >
        <DemoIcon name={submitted ? "check" : "box"} size={14} />
        {submitted ? "Submitted for Review" : demoShip.submit}
      </div>

      <div
        className="mt-[15px] rounded-[11px] border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.05)] p-[15px] transition-all duration-700"
        style={{
          opacity: submitted ? 1 : 0,
          transform: submitted ? "none" : "translateY(12px)",
          transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="flex items-center gap-[9px]">
          <DemoIcon name="check" size={15} color="var(--bsd-green)" />
          <span className="text-[12.5px] font-semibold text-white">
            {demoShip.submitted}
          </span>
        </div>
        <div className="mt-[13px] grid grid-cols-3 gap-[13px]">
          {demoShip.results.map((result, index) => (
            <div
              key={result.label}
              className="transition-all duration-500"
              style={{
                opacity: submitted ? 1 : 0,
                transform: submitted ? "none" : "translateY(8px)",
                transitionDelay: `${140 + index * 90}ms`,
              }}
            >
              <div className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-[var(--bsd-text-4)]">
                {result.label}
              </div>
              <div className="mt-[3px] text-[11px] text-white">{result.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
