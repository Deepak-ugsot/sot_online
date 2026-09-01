/**
 * Public API for the footer feature.
 *
 * Routes import from `@/features/footer` only — never from an internal component path.
 */
export { SiteFooter } from "./components/site-footer";
export type {
  FooterLinkColumn,
  SocialLink,
  SocialPlatform,
} from "./types/footer.types";
