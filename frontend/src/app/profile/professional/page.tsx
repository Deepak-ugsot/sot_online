import type { Metadata } from "next";

import { ProfileSectionView } from "@/features/profile";

export const metadata: Metadata = { title: "Professional Information" };

/** `/profile/professional` — work experience and professional links. */
export default function ProfessionalInformationPage() {
  return <ProfileSectionView section="professional" />;
}
