"use client";

import { LogOut, Pencil } from "lucide-react";
import type { ReactNode } from "react";

import { useSignOut } from "@/features/auth";
import { cn } from "@/lib/utils";
import { profileActions } from "../constants/profile.constants";
import type { ProfileSectionState } from "../hooks/use-profile-section";

type ProfileShellProps = {
  title: string;
  subtitle: string;
  /**
   * The section's edit cycle. Omitted by Payment Details, which has nothing to edit —
   * and omitting it is what removes the Edit button, so the two cannot disagree.
   */
  edit?: ProfileSectionState;
  children: ReactNode;
};

const buttonBase =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 font-display text-[14px] font-medium transition-colors duration-250 ease-cinematic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-70";

/**
 * A profile screen's heading, its actions, and the cards under them.
 *
 * Shared by all four so the title, the button row and the card rhythm land in exactly
 * the same place as the rail switches between them — the heading is the fixed point
 * the eye tracks, and a page that positioned its own would visibly jump.
 *
 * **Log Out is hidden while editing.** It sits where Cancel goes, and a student
 * reaching for Cancel with unsaved changes should not be able to hit sign-out instead.
 */
export function ProfileShell({ title, subtitle, edit, children }: ProfileShellProps) {
  const signOut = useSignOut();
  const isEditing = edit?.isEditing ?? false;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold text-ink">
            {title}
          </h1>
          <p className="mt-1 font-display text-[14px] text-ink-muted">{subtitle}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {isEditing && edit ? (
            <>
              <button
                type="button"
                onClick={edit.cancel}
                disabled={edit.isSaving}
                className={cn(buttonBase, "border-hairline bg-white text-ink hover:bg-surface")}
              >
                {profileActions.cancel}
              </button>
              <button
                type="button"
                onClick={edit.save}
                disabled={edit.isSaving}
                aria-busy={edit.isSaving || undefined}
                className={cn(
                  buttonBase,
                  "border-brand bg-brand text-white hover:bg-[#c9121a]",
                )}
              >
                {edit.isSaving ? profileActions.saving : profileActions.save}
              </button>
            </>
          ) : (
            <>
              {edit && (
                <button
                  type="button"
                  onClick={edit.startEdit}
                  className={cn(buttonBase, "border-hairline bg-white text-ink hover:bg-surface")}
                >
                  <Pencil aria-hidden="true" className="h-4 w-4" />
                  {profileActions.edit}
                </button>
              )}

              <button
                type="button"
                onClick={signOut}
                className={cn(
                  buttonBase,
                  "border-brand/40 bg-white text-brand hover:bg-brand/5",
                )}
              >
                <LogOut aria-hidden="true" className="h-4 w-4" />
                {profileActions.signOut}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Whole-section failure, above the cards so it is not scrolled past. */}
      {edit?.error && (
        <p
          role="alert"
          className="rounded-lg border border-brand/30 bg-brand/5 px-4 py-3 font-display text-[13.5px] text-brand"
        >
          {edit.error}
        </p>
      )}

      {children}
    </div>
  );
}
