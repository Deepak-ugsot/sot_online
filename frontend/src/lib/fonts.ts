import {
  Bricolage_Grotesque,
  Fraunces,
  Plus_Jakarta_Sans,
  Sora,
} from "next/font/google";

/**
 * Typography for the site.
 *
 * **Neue Montreal** (UI + display) is licensed and cannot be redistributed here, so it
 * is declared as an `@font-face` in `globals.css` pointing at `public/assets/fonts/`,
 * with Plus Jakarta Sans below as the next entry in the fallback stack. Drop the
 * `.otf` files in and it takes over automatically — no code change. Until then the
 * browser falls through silently, and the stand-in is metric-similar enough to keep
 * layout stable. See `README.md` → "Fonts" for the expected filenames.
 *
 * The red accent face is **Bricolage Grotesque**, which is a real choice rather than a
 * stand-in — it is served from Google Fonts and is what the accent is meant to be. It
 * replaced Ivy Ora Display (and Playfair Display, which stood in for it).
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
 * The red accent face — the second colour in every two-tone heading on the page, and
 * the whole of the footer's tagline plate.
 *
 * A grotesque, not the high-contrast serif this role used to carry. The accent sets
 * product names ("uGSOT Beyond") as often as it sets prose, and a display serif made
 * a name read as decoration — it also rendered a deliberate lowercase initial as a
 * stylistic flourish rather than as spelling.
 *
 * Weights: 300 for the FAQ's light italic, 500 for the `font-medium` call sites, 700
 * for the two accents in the Beyond College section, which inherit `font-bold` from
 * their headings — without it loaded the browser fakes the bold by smearing the 600.
 * 400/600 are headroom. There is no true italic in the family, so the FAQ's `italic`
 * is a synthesised oblique — which is what the previous face did there too.
 */
export const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bricolage-grotesque",
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
  bricolageGrotesque.variable,
  sora.variable,
  fraunces.variable,
].join(" ");
