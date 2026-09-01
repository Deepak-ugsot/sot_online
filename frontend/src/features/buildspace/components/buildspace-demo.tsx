"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  BUILDSPACE_CANVAS_HEIGHT,
  BUILDSPACE_CANVAS_WIDTH,
  buildspaceChapters,
  buildspaceCursorBeats,
} from "../constants/buildspace.constants";
import type { DemoStepId } from "../constants/demo.constants";
import { useDemoTour } from "../hooks/use-demo-tour";
import { DemoChrome } from "./demo/demo-chrome";
import { DemoCompact } from "./demo/demo-compact";
import { DemoCursor } from "./demo/demo-cursor";
import { DemoLibrary } from "./demo/demo-library";
import { DemoOutro } from "./demo/demo-outro";
import {
  DemoBuildPanel,
  DemoGithubPanel,
  DemoPlanPanel,
  DemoReviewPanel,
  DemoShipPanel,
} from "./demo/demo-panels";
import { DemoWorkspace } from "./demo/demo-workspace";

/** How long the press state stays on after the click lands, as a fraction of a chapter. */
const CLICK_HOLD = 0.06;

/** Below this the canvas is unreadable and the compact tour takes over instead. */
const COMPACT_QUERY = "(max-width: 900px)";

/**
 * The product tour: a fixed 1280x880 canvas of mock BuildSpace UI, scaled to whatever
 * width the section gives it, walking itself through six chapters and a sign-off.
 *
 * **The canvas is a fixed pixel size scaled by transform, not a fluid layout.** Every
 * panel inside is real product chrome at real product sizes — 10px labels, 5px progress
 * bars, a 196px rail — and a fluid version of that would need every one of those numbers
 * to be a clamp, at which point the proportions drift with the container and it stops
 * looking like a screenshot of an app. One `scale()` keeps the composition exact and
 * costs nothing: it is a single compositor transform, applied once per resize.
 *
 * Playback lives in `useDemoTour`; everything here is presentation.
 */
export function BuildspaceDemo() {
  const mountRef = useRef<HTMLDivElement>(null);
  const tour = useDemoTour(mountRef);

  /** `null` until measured, which is what gates the first paint. */
  const [scale, setScale] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const compact = window.matchMedia(COMPACT_QUERY);

    const measure = () => {
      setIsCompact(compact.matches);

      // A zero-width mount is not a measurement, it is the absence of one — a collapsed
      // or display:none ancestor, or a layout caught mid-change. Writing it through would
      // set `scale(0)` while also clearing the opacity guard below, which paints the
      // canvas at nothing instead of holding it back until there is a real width.
      const width = mount.clientWidth;
      if (width <= 0) return;

      // The canvas only ever scales down. Above 1280px of mount width it would start
      // enlarging 10px type into 14px type, which reads as a zoomed screenshot rather
      // than as a screen — and the mount is capped at 860px anyway.
      setScale(Math.min(1, width / BUILDSPACE_CANVAS_WIDTH));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(mount);
    compact.addEventListener("change", measure);

    return () => {
      observer.disconnect();
      compact.removeEventListener("change", measure);
    };
  }, []);

  const chapter = buildspaceChapters[tour.index];
  const beat = buildspaceCursorBeats[tour.index];
  const clicking =
    beat !== null &&
    tour.progress >= beat.clickAt &&
    tour.progress < beat.clickAt + CLICK_HOLD;

  return (
    <div
      data-buildspace="demo"
      ref={mountRef}
      className="relative z-[1] w-full max-w-[53.75rem]"
      // Hovering holds the tour where it is, so a viewer can stop to read a panel
      // without the screen changing under them. Pointer events rather than mouse events:
      // this also covers a stylus, and a touch that lands on the window.
      onPointerEnter={tour.hold}
      onPointerLeave={tour.release}
    >
      {/*
        The window's own frame: a dark screen with a lime top edge, sitting on the
        section's lighter ground. `aspect-ratio` reserves the exact height before the
        canvas is measured, so the section never reflows on mount.
      */}
      <div
        className="relative overflow-hidden rounded-[14px] border border-white/12 bg-[#1b1b1f] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]"
        style={{
          aspectRatio: `${BUILDSPACE_CANVAS_WIDTH} / ${BUILDSPACE_CANVAS_HEIGHT}`,
          // The compact tour sizes to its own content; only the scaled canvas needs the
          // ratio reserved.
          ...(isCompact ? { aspectRatio: "auto" } : null),
        }}
      >
        {isCompact ? (
          <DemoCompact index={tour.index} progress={tour.progress} />
        ) : (
          <div
            className="bsd-root absolute left-0 top-0 flex flex-col"
            style={{
              width: BUILDSPACE_CANVAS_WIDTH,
              height: BUILDSPACE_CANVAS_HEIGHT,
              transform: `scale(${scale ?? 0})`,
              transformOrigin: "0 0",
              // Held back one frame until measured, so nothing paints at the wrong size.
              opacity: scale === null ? 0 : 1,
              transition: "opacity 260ms linear",
            }}
          >
            <DemoScreen id={chapter.id} progress={tour.progress} />

            <DemoCursor
              x={beat?.x ?? BUILDSPACE_CANVAS_WIDTH / 2}
              y={beat?.y ?? BUILDSPACE_CANVAS_HEIGHT + 60}
              clicking={clicking}
              visible={beat !== null && tour.progress > 0.06}
            />
          </div>
        )}
      </div>

      {/*
        Narration and the chapter rail — desktop only.

        The compact tour already prints the chapter title as its own headline and carries a
        row of progress dots, so on a phone all of this is the same information a second
        time. The chips go with it: they are a pointer affordance, and on a touch screen a
        row of small targets directly under a tall card mostly intercepts scrolls.
      */}
      <div className="mt-6 hidden flex-col items-center gap-4 min-[901px]:flex">
        <p
          key={chapter.id}
          className="font-display text-[clamp(0.9375rem,1.5vw,1.125rem)] text-white/70"
        >
          {chapter.title}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {buildspaceChapters.map((item, index) => {
            // The outro shares the "Ship" label with the chapter before it, so it gets no
            // chip of its own — two identical chips would look like a duplicate.
            if (item.id === "outro") return null;
            const isActive = index === tour.index;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => tour.goTo(index)}
                className="relative overflow-hidden rounded-full border px-3.5 py-1.5 font-display text-xs font-medium transition-colors duration-300"
                style={{
                  borderColor: isActive ? "rgba(215,255,95,0.5)" : "rgba(255,255,255,0.16)",
                  color: isActive ? "#d7ff5f" : "rgba(255,255,255,0.55)",
                }}
              >
                {/* Fills across as the chapter plays — the only progress readout the
                    desktop tour has. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 bg-[#d7ff5f]/10"
                  style={{
                    width: isActive ? `${tour.progress * 100}%` : "0%",
                    transition: "width 120ms linear",
                  }}
                />
                <span className="relative">{item.chapter}</span>
              </button>
            );
          })}
        </div>

        {/*
          Only shown while a countdown is actually running — a viewer who jumped chapters.
          A plain hover hold needs no control: moving the pointer away resumes it.
        */}
        <button
          type="button"
          onClick={tour.resume}
          className="relative flex items-center gap-2 overflow-hidden rounded-full border border-white/12 px-3.5 py-1.5 font-display text-[0.6875rem] font-medium text-white/60 transition-[opacity,color] duration-300 hover:text-white"
          style={{
            opacity: tour.resumeProgress > 0 ? 1 : 0,
            pointerEvents: tour.resumeProgress > 0 ? "auto" : "none",
          }}
        >
          <svg viewBox="0 0 20 20" className="h-2.5 w-2.5 -rotate-90" aria-hidden="true">
            <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="#d7ff5f"
              strokeWidth="4"
              strokeDasharray={`${(1 - tour.resumeProgress) * 50.3} 50.3`}
            />
          </svg>
          Tour resumes in a moment
        </button>
      </div>
    </div>
  );
}

/** Maps a chapter to its screen. The workspace chapters share one shell. */
function DemoScreen({ id, progress }: { id: string; progress: number }) {
  if (id === "outro") {
    return (
      <div className="bsd-root flex flex-1 flex-col bg-[var(--bsd-bg)]">
        <DemoOutro progress={progress} />
      </div>
    );
  }

  if (id === "project") {
    return (
      <>
        <DemoChrome active="Dashboard" />
        <DemoLibrary progress={progress} />
      </>
    );
  }

  const panels: Record<string, { step: DemoStepId; node: ReactNode }> = {
    plan: { step: "plan", node: <DemoPlanPanel progress={progress} /> },
    review: { step: "review", node: <DemoReviewPanel progress={progress} /> },
    build: { step: "build", node: <DemoBuildPanel progress={progress} /> },
    github: { step: "github", node: <DemoGithubPanel progress={progress} /> },
    ship: { step: "ship", node: <DemoShipPanel progress={progress} /> },
  };

  const panel = panels[id];
  if (!panel) return null;

  return (
    <>
      <DemoChrome active="Library" />
      <DemoWorkspace step={panel.step}>{panel.node}</DemoWorkspace>
    </>
  );
}
