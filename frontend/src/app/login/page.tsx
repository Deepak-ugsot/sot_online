import type { Metadata } from "next";

import { LoginScreen } from "@/features/auth";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Log in to upGrad School of Technology with your mobile number to start your application.",
  /*
    A login screen has nothing to offer a search engine and should not be the result
    someone lands on from one. Every other route on the site is indexable; this is the
    one that opts out.
  */
  robots: { index: false, follow: false },
};

/**
 * `/login` — phone-number login, reached from the header's "Apply Now".
 *
 * Thin by design, like every other route here: `LoginScreen` owns the flow. There is
 * no `SiteHeader` or `SiteFooter` — the screen draws its own chrome, and dropping a
 * reader who came here to log in back into the landing page's navigation invites them
 * straight out again.
 */
export default function LoginPage() {
  return (
    <main>
      <LoginScreen />
    </main>
  );
}
