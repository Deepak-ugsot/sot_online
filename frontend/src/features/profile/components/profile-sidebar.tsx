"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { profileAside, profileNav } from "../constants/profile.constants";
import { useProfile } from "../hooks/use-profile";
import { toDisplayName, toInitials } from "../utils/profile.utils";

/**
 * The profile's left rail: who is signed in, and the four sections.
 *
 * **Active state comes from the URL, not from a prop.** Each section is its own route,
 * so the pathname already knows which is open; passing it down would mean every page
 * restating something the router can answer, and a page that forgot would leave the
 * rail highlighting the wrong row.
 *
 * The name comes from the profile record rather than the session, so saving Personal
 * Details updates the rail in the same commit — both read the one store.
 */
export function ProfileSidebar() {
  const pathname = usePathname();
  const record = useProfile();

  const firstName = record.personal.firstName ?? "";
  const lastName = record.personal.lastName ?? "";
  const initials = toInitials(firstName, lastName);

  return (
    <aside className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)]">
      <h2 className="font-display text-[21px] font-bold text-ink">
        {profileAside.title}
      </h2>
      <p className="mt-1.5 font-display text-[13px] leading-[1.5] text-ink-muted">
        {profileAside.subtitle}
      </p>

      <hr className="my-6 border-hairline" />

      <div className="flex flex-col items-center gap-3">
        {/*
          Initials, not a photograph. There is no avatar upload and no stored image, and
          a stock headshot standing in for the student would be a portrait of someone
          else. Falls back to a glyph until a name is saved.
        */}
        <span
          aria-hidden="true"
          className="flex h-24 w-24 items-center justify-center rounded-full bg-brand/10 font-display text-[26px] font-semibold text-brand"
        >
          {initials || <UserRound className="h-10 w-10" strokeWidth={1.5} />}
        </span>

        <p className="font-display text-[17px] font-semibold text-ink">
          {toDisplayName(firstName, lastName, profileAside.namePlaceholder)}
        </p>

        <span className="rounded-full border border-brand/40 px-3 py-1 font-display text-[11px] font-semibold tracking-[0.08em] text-brand uppercase">
          {profileAside.role}
        </span>
      </div>

      <hr className="my-6 border-hairline" />

      <nav aria-label="Profile sections">
        <ul className="flex flex-col gap-1.5">
          {profileNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  // The one place the rail's state is exposed to assistive technology —
                  // colour alone says nothing to a screen reader.
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3.5 rounded-xl px-3 py-3 transition-colors duration-250 ease-cinematic",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    isActive ? "bg-brand" : "hover:bg-surface",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      isActive ? "bg-white/20 text-white" : "bg-surface text-ink",
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>

                  <span className="flex min-w-0 flex-col">
                    <span
                      className={cn(
                        "font-display text-[15px] font-semibold",
                        isActive ? "text-white" : "text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[12px]",
                        isActive ? "text-white/80" : "text-ink-muted",
                      )}
                    >
                      {item.hint}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
