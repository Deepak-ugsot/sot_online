/**
 * Public API for the header feature.
 *
 * Routes import from `@/features/header` only — never from an internal component path.
 */
export { AppHeader } from "./components/app-header";
export { SiteHeader } from "./components/site-header";
export type { HeaderCta, NavLink } from "./types/header.types";
