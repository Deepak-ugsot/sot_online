import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ProfileLayout } from "@/features/profile";

export const metadata: Metadata = {
  title: { default: "My Profile", template: "%s | My Profile" },
  /*
    A student's own profile has nothing to offer a search engine and must not be the
    result anyone lands on from one. Inherited by every route in this segment, so a
    section added later cannot forget it.
  */
  robots: { index: false, follow: false },
};

/**
 * Shared chrome for `/profile/*`: header, left rail, and the session gate.
 *
 * Thin, like every route file here — `ProfileLayout` owns all of it. `children` is
 * passed straight through, so each section stays its own route and only the column
 * re-renders when the rail is used.
 */
export default function ProfileRouteLayout({ children }: { children: ReactNode }) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
