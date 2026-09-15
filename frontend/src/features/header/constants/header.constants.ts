import type { HeaderCta, NavLink } from "../types/header.types";

/**
 * Header copy and the one selector the header reaches for outside itself.
 *
 * Site-wide values (brand name, `navLinks`, asset paths) stay in
 * `src/config/site.config.ts` — the nav list is shared with the footer, so it does
 * not belong to this feature.
 */

/**
 * `/login` rather than the `#apply` anchor the page's other CTAs still carry: this is
 * the one that now has a route behind it. Phone-number login is the front door to the
 * application, so "Apply to uGSOT Catalyst" starts there.
 */
export const headerCta: HeaderCta = {
  label: "Apply to uGSOT Catalyst",
  href: "/login",
  variant: "primary",
};

/**
 * The hero section's anchor. The header floats transparent while this is still on
 * screen and takes its own backdrop once it has scrolled past — see
 * `useHeaderBackdrop`.
 */
export const HERO_SELECTOR = "#home";

/**
 * Navigation for the signed-in header.
 *
 * Separate from `navLinks` in `site.config.ts`, and not because the labels differ by
 * accident — these are **absolute** hrefs. The landing page's list is in-page hashes,
 * which from `/profile` scroll to nothing at all; every entry here goes to the landing
 * page and then to the section.
 *
 * The labels and targets match `navLinks` entry for entry, `#readiness` for "Student
 * Journey" included. They are one nav in the design, and a section that is "Student
 * Journey" signed out and something else signed in would be a bug either way round —
 * so an entry added to one list belongs in the other.
 */
export const appNavLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Student Journey", href: "/#readiness" },
  { label: "FAQs", href: "/#faqs" },
] as const;
