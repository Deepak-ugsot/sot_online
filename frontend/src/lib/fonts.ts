import {
  Fraunces,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Sora,
} from "next/font/google";

/**
 * Typography for the site.
 *
 * The reference design uses two licensed typefaces — **Neue Montreal** (UI + display)
 * and **Ivy Ora Display** (the red serif accent). Those cannot be redistributed here,
 * so each is declared as an `@font-face` in `globals.css` pointing at
 * `public/assets/fonts/`, with the Google fonts below as the next entry in the
 * fallback stack.
 *
 * Drop the licensed `.otf` files into `public/assets/fonts/` and they take over
 * automatically — no code change. Until then the browser silently falls through to
 * the self-hosted Google equivalents, which are metric-similar enough to keep layout
 * stable. See `README.md` → "Fonts" for the expected filenames.
 */

/**
 * Body / UI text. Matches the reference design, which uses this family directly.
 *
 * 800 is carried for the oversized display words in the approach section: this face
 * stands in for Neue Montreal, which sets noticeably heavier at that size, so 700
 * here reads too light against the reference.
 */
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

/**
 * Stand-in for Ivy Ora Display — the high-contrast serif used for the accent.
 *
 * **Chosen on measured width, not on looks alone.** The previous stand-in was
 * Instrument Serif, which is a *condensed* display serif: it set "Software Engineer"
 * at 446px where the same string is 588px in Georgia and 631px in the body sans it
 * sits beside. Next to Neue Montreal's stand-in the accent read as squeezed, and no
 * amount of letter-spacing fixes that — tracking moves the glyphs apart, it does not
 * make narrow glyphs wide.
 *
 * Playfair Display measures 597px, in line with the rest of the line, and keeps the
 * high-contrast display character the accent is for. It also ships a real 400–900
 * range, so the 500 the call sites ask for is an actual weight rather than something
 * the browser has to fake.
 */
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-playfair-display",
});

/**
 * The AI Mentor section is set in its own pair of typefaces rather than the
 * site-wide ones, and both are genuinely used by the reference design — so these are
 * the real thing, not stand-ins like the two above.
 */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  // Suffixed to stay distinct from the `--font-sora` theme token in `globals.css`,
  // which wraps this in a full fallback stack. Same split as `--font-sans` above.
  variable: "--font-sora-google",
});

/** Italic-only: it is used for a single accent line. */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
  variable: "--font-fraunces-google",
});

/** Every font variable, ready to spread onto `<html>`. */
export const fontVariables = [
  plusJakartaSans.variable,
  playfairDisplay.variable,
  sora.variable,
  fraunces.variable,
].join(" ");
