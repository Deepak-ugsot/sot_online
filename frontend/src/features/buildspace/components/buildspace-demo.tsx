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

  /**
   * The screen inside the frame, which is what the canvas has to fit.
   *
   * **Not the mount.** Between the two sit the glass card's padding and the frame's 1px
   * gradient — some 30px of the mount's width that the canvas does not get. Measuring the
   * mount puts the right edge of the canvas under the frame's own `overflow-hidden`.
   *
   * **Held in state rather than in a ref, which is the part that matters.** A ref pairs
   * with a `[]`-dependency effect, and that pair silently breaks the moment React replaces
   * this node instead of updating it — wrapping the screen in another element does exactly
   * that, and a Fast Refresh during such an edit leaves the observer watching a detached
   * node that can never resize again. The scale then stays frozen at whatever the *old*
   * tree measured, and the canvas renders that many pixels too wide for the rest of the
   * session. Keying the effect on the node makes a swap re-run it.
   */
  const [screenEl, setScreenEl] = useState<HTMLDivElement | null>(null);

  /** `null` until measured, which is what gates the first paint. */
  const [scale, setScale] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (!screenEl) return;

    const compact = window.matchMedia(COMPACT_QUERY);

    const apply = (width: number) => {
      // A zero width is not a measurement, it is the absence of one — a collapsed or
      // display:none ancestor, or a layout caught mid-change. Writing it through would set
      // `scale(0)` while also clearing the opacity guard below, which paints the canvas at
      // nothing instead of holding it back until there is a real width.
      if (width <= 0) return;

      // The canvas only ever scales down. Above 1280px of screen width it would start
      // enlarging 10px type into 14px type, which reads as a zoomed screenshot rather
      // than as a screen.
      setScale(Math.min(1, width / BUILDSPACE_CANVAS_WIDTH));
    };

    const measure = () => {
      setIsCompact(compact.matches);
      // `clientWidth`, not `getBoundingClientRect()`. The entrance reveal tweens a
      // `scale(0.97)` on an ancestor of this element, and a transformed rect would hand
      // back 97% of the real width for as long as that tween runs — wrong in the other
      // direction and just as sticky, since the layout width never changes afterwards to
      // correct it.
      apply(screenEl.clientWidth);
    };

    measure();

    const observer = new ResizeObserver(([entry]) => {
      setIsCompact(compact.matches);
      // The entry's box is fractional where `clientWidth` is rounded, so the canvas lands
      // on the container's real edge rather than up to half a pixel past it.
      apply(entry.contentRect.width);
    });
    observer.observe(screenEl);
    compact.addEventListener("change", measure);

    return () => {
      observer.disconnect();
      compact.removeEventListener("change", measure);
    };
  }, [screenEl]);

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
      className="relative z-[1] w-full"
      // Hovering holds the tour where it is, so a viewer can stop to read a panel
      // without the screen changing under them. Pointer events rather than mouse events:
      // this also covers a stylus, and a touch that lands on the window.
      onPointerEnter={tour.hold}
      onPointerLeave={tour.release}
    >
      {/*
        The product's lime accent blooming out from under the window, as if the screen were
        lighting the surface it sits on. It is the only lime on the section outside the
        canvas and the active chip, and it is what stops the window reading as a flat card
        pasted onto the ground.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 -bottom-8 z-0 h-24 bg-[radial-gradient(58%_100%_at_50%_100%,rgba(215,255,95,0.18),rgba(215,255,95,0)_72%)] blur-xl"
      />

      {/*
        The glass card the screen sits in.

        Glassmorphism proper: `rgba(20,20,20,0.6)` over a `backdrop-blur(20px)`, with a
        rainbow chasing round its edge. `.bs-glow-border` lives in `globals.css` — it needs a
        pseudo-element, a pair of composited masks and a registered custom property, none of
        which a utility class can express, and the comment there explains the hollowing trick
        that paints a gradient into a 1px border.

        **The edge animation is safe on this page in a way a moving layer is not.** It
        animates `--bs-angle`, so the element never moves and only its gradient is redrawn —
        a paint animation, on the same thread ScrollSmoother runs on. It cannot desync with
        the smoother the way a compositor transform can.

        `rounded-[32px]` against `p-3.5` is deliberate, and is why this keeps its radius
        rather than the 16px a glass card usually takes: 32 − 14 = 18, exactly the screen
        frame's own radius inside it. Drop the outer to 16 and the inner corner is rounder
        than the outer, which looks broken in a way nobody can name. The mobile pair
        (28 − 10) lands on 18 too.
      */}
      <div
        className={
          "bs-glow-border relative z-[1] rounded-[28px] bg-[rgba(20,20,20,0.6)] p-2.5 backdrop-blur-[20px] " +
          "shadow-[0_2px_10px_-4px_rgba(0,0,0,0.6),0_30px_60px_-28px_rgba(0,0,0,0.9),0_70px_130px_-50px_rgba(0,0,0,0.85)] " +
          "min-[1180px]:rounded-[32px] min-[1180px]:p-3.5"
        }
      >

        {/*
          The screen's own frame is a 1px gradient rather than a flat border: bright along
          the top-left edge where the section's light falls, fading to almost nothing at the
          bottom, with a trace of the product's lime in the bottom-right. At this size a
          single `border-white/12` reads as a drawn rectangle; a lit edge reads as a
          physical one.
        */}
        <div
          className="relative z-[2] rounded-[18px] p-px shadow-[0_1px_6px_-2px_rgba(0,0,0,0.6),0_16px_34px_-20px_rgba(0,0,0,0.85)]"
          style={{
            backgroundImage:
              "linear-gradient(155deg,rgba(255,255,255,0.34) 0%,rgba(255,255,255,0.1) 26%,rgba(255,255,255,0.03) 58%,rgba(215,255,95,0.24) 100%)",
          }}
        >
          <div
            ref={setScreenEl}
            className="relative overflow-hidden rounded-[17px] bg-[#1b1b1f]"
            style={{
              // `aspect-ratio` reserves the exact height before the canvas is measured, so
              // the section never reflows on mount.
              aspectRatio: `${BUILDSPACE_CANVAS_WIDTH} / ${BUILDSPACE_CANVAS_HEIGHT}`,
              // The compact tour sizes to its own content; only the scaled canvas needs the
              // ratio reserved.
              ...(isCompact ? { aspectRatio: "auto" } : null),
            }}
          >
            {isCompact ? (
              <DemoCompact index={tour.index} progress={tour.progress} />
            ) : (
              <>
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

                {/* The glass highlight along the screen's top edge, over the canvas rather
                    than inside it — it belongs to the frame, not to the product. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_38%,rgba(255,255,255,0.06)_100%)]"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/*
        Narration and the chapter rail — desktop only.

        The compact tour already prints the chapter title as its own headline and carries a
        row of progress dots, so on a phone all of this is the same information a second
        time. The chips go with it: they are a pointer affordance, and on a touch screen a
        row of small targets directly under a tall card mostly intercepts scrolls.
      */}
      <div className="relative mt-6 hidden flex-col items-center gap-4 min-[901px]:flex">
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

          **Out of flow, because it is invisible most of the time.** Left in the column it
          reserved its own height whether or not it was showing, and the section centres the
          copy against this column — so a control nobody could see pushed the heading a
          couple of dozen pixels below the window's optical centre. It sits inside the
          section's bottom padding when it does appear.
        */}
        <button
          type="button"
          onClick={tour.resume}
          className="absolute left-1/2 top-full flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/12 px-3.5 py-1.5 font-display text-[0.6875rem] font-medium text-white/60 transition-[opacity,color] duration-300 hover:text-white"
          style={{
            marginTop: "1rem",
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
