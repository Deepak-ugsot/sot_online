import type { NavLink } from "@/features/header/types/header.types";

/**
 * Site-wide constants: brand identity, primary navigation, and shared asset paths.
 *
 * Kept separate from feature-level copy (see `features/hero/constants/hero.constants.ts`)
 * because these values are referenced by more than one section of the page — the header
 * navigation reappears in the footer, and the logo is used by both.
 */
export const siteConfig = {
  name: "upGrad School of Technology",
  shortName: "upGrad SOT",
  description:
    "A structured 2-Year Career Acceleration Program with AI-powered learning, expert mentorship & real-world projects.",
  url: "https://sot-online-rho.vercel.app",
} as const;

/**
 * Primary navigation. Every `href` is an in-page anchor, scrolled to by
 * `AnchorScroll` — so each one has to name a section that exists on the page.
 *
 * Two of them did not. `#student-journey` matched no element; the journey is laid out
 * by the readiness section ("Two years. One serious transformation."), which is what
 * it points at now. `#about` matched nothing either and there is no About section to
 * point it at, so the entry is gone rather than left as a link that does nothing.
 */
export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Student Journey", href: "#readiness" },
  { label: "FAQs", href: "#faqs" },
] as const;

/** Static assets served from `public/`. Centralised so paths are never string-literal'd in JSX. */
export const assets = {
  logoWhite: "/assets/uGSOT_white_logo.png",
  /**
   * The brand mark on its own, in red — for light chrome, where the white lockup
   * above is invisible.
   *
   * The signed-in header in the design pairs this mark with a red "upGrad" wordmark.
   * That horizontal lockup is not in this repo (the only wordmark here is the white
   * one, and `assets/upgradSOT.png` is an outlined treatment that does not read at
   * nav size), so the header carries the mark alone. Drop the red lockup into
   * `public/assets/` and point this at it — nothing else changes.
   */
  logoMark: "/ugsot_logo.svg",
  heroVideo: "/assets/backround_update_BG.mp4",
  /** Outlined "uGSOT Catalyst" wordmark used as the footer watermark. 3851×459, RGBA. */
  footerWatermark: "/assets/uGSOT-Catayst.png",
  /**
   * The login screen's backdrop: a student on a lit plinth, with the right of the
   * frame left dark for the form. 1440×911 — composed for the whole viewport, not
   * for a column, so `LoginStage` lays it out full-bleed rather than in a half.
   */
  loginStage: "/assets/login/stage.png",
} as const;
