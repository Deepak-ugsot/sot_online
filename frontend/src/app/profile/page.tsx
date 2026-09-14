import type { Metadata } from "next";

import { ProfileSectionView } from "@/features/profile";

export const metadata: Metadata = { title: "Personal Details" };

/** `/profile` — the rail's first entry, and where a verified student lands. */
export default function PersonalDetailsPage() {
  return <ProfileSectionView section="personal" />;
}
