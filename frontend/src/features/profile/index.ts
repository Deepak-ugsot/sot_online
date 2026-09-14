/**
 * Public API for the profile feature.
 *
 * Routes import from `@/features/profile` only — never from an internal component path.
 */
export { PaymentDetailsView } from "./components/payment-details-view";
export { ProfileLayout } from "./components/profile-layout";
export { ProfileSectionView } from "./components/profile-section-view";
export { useProfile } from "./hooks/use-profile";
export type {
  EditableSectionId,
  PaymentEntry,
  PaymentStat,
  PaymentStatus,
  ProfileCard,
  ProfileField,
  ProfileNavItem,
  ProfileRecord,
  ProfileSectionConfig,
  ProfileSectionId,
  ProfileValues,
} from "./types/profile.types";
