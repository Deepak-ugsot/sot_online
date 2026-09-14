import type { Metadata } from "next";

import { ProfileSectionView } from "@/features/profile";

export const metadata: Metadata = { title: "Academic Details" };

/** `/profile/academic` — education, qualifications and enrollment. */
export default function AcademicDetailsPage() {
  return <ProfileSectionView section="academic" />;
}
