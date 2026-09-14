"use client";

import type { ReactNode } from "react";

import { useRequireSession } from "@/features/auth";
import { AppHeader } from "@/features/header";
import { profileAside } from "../constants/profile.constants";
import { ProfileSidebar } from "./profile-sidebar";

/**
 * The chrome every profile screen sits in: the signed-in header, the left rail, and
 * the column the four sections render into.
 *
 * **It is a layout, not a wrapper each page repeats.** Next keeps a layout mounted
 * across navigations inside it, so moving between the four sections re-renders only
 * the column — the header keeps its open menu, the rail does not flash, and the
 * profile store is read once per visit rather than once per tab click.
 *
 * It also owns the session gate, for the same reason: one check covering four routes,
 * rather than four that can drift apart.
 */
export function ProfileLayout({ children }: { children: ReactNode }) {
  const { status } = useRequireSession();

  /*
    `loading` is the render where the session genuinely is not known yet, and
    `unauthenticated` is the moment between deciding that and the redirect landing.
    Neither should render the profile: the first would flash an empty form at a
    signed-in student, the second would show one to someone on their way out.

    The header still renders, so the page has its frame and the swap does not jump.
  */
  if (status !== "authenticated") {
    return (
      <div className="min-h-svh bg-surface">
        <AppHeader />
        <p
          role="status"
          className="px-6 py-24 text-center font-display text-[15px] text-ink-muted"
        >
          {status === "loading" ? "Loading your profile…" : "Taking you to sign in…"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-surface">
      <AppHeader />

      {/*
        `84rem` — the page's shared measure, matching the landing page's sections.
        The rail is a fixed 19rem beside a fluid column above `lg`, and stacks above
        the content below it: a 304px rail and a form grid cannot both fit a tablet.
      */}
      <div className="mx-auto grid max-w-[84rem] gap-6 px-6 py-10 lg:grid-cols-[19rem_1fr] lg:gap-8 lg:px-12 lg:py-12">
        <ProfileSidebar />
        {/* `min-w-0` — without it the payment table's own scroll container widens this
            grid column instead of scrolling inside it. */}
        <main className="min-w-0" aria-label={profileAside.title}>
          {children}
        </main>
      </div>
    </div>
  );
}
