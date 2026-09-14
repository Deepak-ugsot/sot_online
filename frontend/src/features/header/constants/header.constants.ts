import type { HeaderCta } from "../types/header.types";

/**
 * Header copy and the one selector the header reaches for outside itself.
 *
 * Site-wide values (brand name, `navLinks`, asset paths) stay in
 * `src/config/site.config.ts` — the nav list is shared with the footer, so it does
 * not belong to this feature.
 */

/**
 * Matches the hero's primary CTA word for word, so the two read as the same button
 * following you down the page rather than as two different offers.
 *
 * Uppercase is set in the string rather than with `text-transform`, because the
 * brand's lowercase `u` has to survive — `uppercase` would render it "UGSOT".
 */
export const headerCta: HeaderCta = {
  label: "APPLY TO uGSOT CATALYST",
  href: "#apply",
  variant: "primary",
};

/**
 * The hero section's anchor. The header floats transparent while this is still on
 * screen and takes its own backdrop once it has scrolled past — see
 * `useHeaderBackdrop`.
 */
export const HERO_SELECTOR = "#home";
