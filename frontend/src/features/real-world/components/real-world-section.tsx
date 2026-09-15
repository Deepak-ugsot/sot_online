import Image from "next/image";

import {
  realWorldExperiences,
  realWorldHeading,
  realWorldPortrait,
  realWorldRibbons,
} from "../constants/real-world.constants";
import { RealWorldRibbon } from "./real-world-ribbon";

/**
 * "Digital By Design. Real-World By Experience." — the claim over two tilted ribbons of
 * the things students actually do, drifting in opposite directions behind a student.
 *
 * Sits directly under the early-start section and shares its light `surface` ground: that
 * section lays out *when* a career starts, and this one names *what* fills it. They read
 * as one light band.
 *
 * **The ribbons are the argument, not decoration.** The section's point is that the
 * programme is digital but the experience is not, and a list of six items set in a static
 * column would say that far more quietly than six items that will not hold still. Which is
 * also why they are gated behind `motion-safe` rather than given a reduced fallback that
 * animates more gently — see below.
 *
 * A Server Component: the whole device is CSS, so none of it needs to reach the client.
 */
export function RealWorldSection() {
  return (
    /*
      `overflow-hidden` is load-bearing here, not hygiene. The ribbons are deliberately
      wider than the stage and tilted, so their ends run well past every edge — this is
      what clips them back to the frame.
    */
    <section
      id="real-world"
      aria-labelledby="real-world-heading"
      className="relative overflow-hidden bg-surface"
    >
      {/*
        The stage. Everything inside is positioned against this box, including the
        ribbons' `top` percentages — so the band always crosses at the same point in the
        composition regardless of how tall the portrait renders.
      */}
      <div className="relative mx-auto max-w-[90rem]">
        {/*
          `z-30`: the heading sits above the ribbons. They pass beneath it by design, and
          at narrow widths the upper ribbon rises close enough to the second line that
          letting it cross would cost the heading its contrast.
        */}
        <div className="relative z-30 px-6 pt-12 sm:px-10 lg:px-16 lg:pt-32">
          <h2
            id="real-world-heading"
            className="type-heading max-w-[20ch] text-balance text-[clamp(1.625rem,3.6vw,3rem)] font-semibold leading-[1.15] text-ink"
          >
            {realWorldHeading.lead}
            {/*
              A hard break rather than a wrap: the two lines are two separate claims set
              in parallel, and a measure that let "Real-World" ride up next to "Design."
              would read as one run-on sentence. `<br />` is hidden from the accessibility
              tree by default, so the heading is still announced as one string.
            */}
            <br />
            {realWorldHeading.trail}{" "}
            {/* Bricolage Grotesque via `font-accent`, matching the red word across the
                hero, curriculum, career, early-start and learn-from-people headings. No
                weight override: the heading is `font-semibold` and the accent inherits
                it — 600 is loaded for exactly this. */}
            <span className="font-accent text-brand">{realWorldHeading.accent}</span>
          </h2>
        </div>

        {/*
          The portrait, above the ribbons so they pass behind it. A cutout on
          transparency, which is the whole reason the band can disappear behind a shoulder
          and re-emerge — a rectangular photo would cut it in two.

          **The negative top margin is the layout.** The portrait and the heading occupy
          opposite sides of the stage and never collide horizontally, so pulling the
          portrait up into the heading's band is what closes the dead space a plain stack
          would leave. Only from `lg`, where there is width for the two to sit side by
          side; below it they genuinely are stacked and the pull is small.

          The portrait also sets the stage's height — it is the only thing here in normal
          flow with a real intrinsic size — which is what the ribbons' percentages are
          measured against.
        */}
        <div className="relative z-20 -mt-6 ml-auto mr-[2%] w-[80%] max-w-[36rem] sm:mr-[4%] sm:w-[62%] lg:-mt-32 lg:mr-[10%] lg:w-[40%]">
          <Image
            src={realWorldPortrait.src}
            alt={realWorldPortrait.alt}
            width={realWorldPortrait.width}
            height={realWorldPortrait.height}
            /*
              The portrait is the section's one heavy asset and sits below the fold, so it
              stays lazy. `sizes` describes the column widths above, so the optimizer
              serves a variant matched to the box rather than the viewport.
            */
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 62vw, 80vw"
            className="h-auto w-full"
          />
        </div>

        {/*
          The ribbons.

          `aria-hidden` on the group, with the six experiences given once as `sr-only`
          text below. Each ribbon repeats the list three times and is then duplicated for
          the loop, so left readable this would announce the same six phrases a dozen
          times over — and in an order that is a function of the animation rather than of
          the content.

          `pointer-events-none` so the band never eats a click or a text selection meant
          for the heading. `inset-0` rather than a height of its own: the ribbons position
          themselves against the stage, and the stage is what the portrait has already
          sized.
        */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
          {realWorldRibbons.map((ribbon) => (
            <RealWorldRibbon key={ribbon.id} ribbon={ribbon} />
          ))}
        </div>

        <ul className="sr-only">
          {realWorldExperiences.map((experience) => (
            <li key={experience.id}>{experience.label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
