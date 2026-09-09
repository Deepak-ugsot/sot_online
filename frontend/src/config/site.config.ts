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

/** Primary navigation. `href` values are in-page anchors until those routes exist. */
export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Student Journey", href: "#student-journey" },
  { label: "About Us", href: "#about" },
  { label: "FAQs", href: "#faqs" },
] as const;

/** Static assets served from `public/`. Centralised so paths are never string-literal'd in JSX. */
export const assets = {
  logoWhite: "/assets/uGSOT_white_logo.png",
  heroVideo: "/assets/Hero_BG_Video.mp4",
  /** Outlined "uGSOT Beyond" wordmark used as the footer watermark. 3840×491, RGBA. */
  footerWatermark: "/assets/upgrad_beyond.png",
} as const;
