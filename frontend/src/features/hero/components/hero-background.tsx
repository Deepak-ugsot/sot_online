import { assets } from "@/config/site.config";

/**
 * The legibility scrim: an even tint plus a soft full-width band across the rows the
 * copy occupies.
 *
 * The footage is near-white — measured mean relative luminance ~0.86, only 1.2:1
 * against white text — so some scrim is unavoidable. Both layers are *linear* and
 * full-bleed on purpose: a radial scrim reads as a visible oval sitting on the
 * scene, whereas a band has no edge to notice.
 *
 * The band is wide and gently ramped so it covers the copy at every viewport,
 * including narrow ones where the text occupies most of the frame.
 *
 * This whole element fades out as the hero scrolls (see `useHeroScrollAnimation`),
 * leaving the video unobstructed once the copy has gone.
 */
const HERO_COPY_SCRIM = [
  // The plateau starts at 12%, not 20%: the copy block begins with the eyebrow, which
  // sits at roughly 13% of the stage at desktop. At 20% that first line landed on the
  // ramp rather than the band, and brand red on the near-white plate is the least
  // legible thing in the block — it needs the band more than the white type does.
  "linear-gradient(180deg, rgba(0,0,0,0) 2%, rgba(0,0,0,0.36) 12%, rgba(0,0,0,0.36) 78%, rgba(0,0,0,0) 94%)",
  "linear-gradient(rgba(0,0,0,0.34), rgba(0,0,0,0.34))",
].join(", ");

/**
 * The permanent frame — the one scrim that does *not* fade with the copy.
 *
 * It darkens under the fixed header so the nav stays readable for the whole pin, and
 * lands on near-black at the bottom so the hero blends into the section below.
 */
const HERO_FRAME =
  "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.14) 18%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 66%, rgba(0,0,0,0.45) 88%, rgba(0,0,0,0.85) 100%)";

/**
 * The hero's full-bleed video backdrop, plus the scrims and grain on top of it.
 *
 * Purely presentational — a Server Component with no client JS. What the video *does*
 * is decided by `useHeroScrollAnimation`, which finds it via the `data-hero="video"`
 * attribute: on desktop it drives the playhead from scroll, and at 1024px and below it
 * lets the video loop on its own because seeking is too expensive for mobile decoders.
 *
 * Note there is no `autoPlay`, even though small viewports do play. Autoplay is left to
 * the hook so the two modes are decided in one place — and so a desktop visitor never
 * catches a frame of unscrubbed playback in the gap before hydration.
 *
 * `preload="auto"` serves both modes: seeking needs buffered data ahead of the playhead,
 * and looping playback needs it just the same.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-canvas">
      <video
        data-hero="video"
        className="h-full w-full object-cover object-center"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={assets.heroVideo} type="video/mp4" />
      </video>

      {/*
        Inline styles rather than arbitrary Tailwind values: stacked gradients in a
        single bracketed class are unreadable, and each layer needs its rationale
        next to it.
      */}
      <div
        data-hero="copy-scrim"
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: HERO_COPY_SCRIM }}
      />
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: HERO_FRAME }} />

      {/* Film grain — breaks up gradient banding across the large dark areas. */}
      <div aria-hidden="true" className="absolute inset-0 opacity-5 mix-blend-overlay bg-grain" />
    </div>
  );
}
