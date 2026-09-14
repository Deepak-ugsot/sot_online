"use client";

import { ChevronDown, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { useSignOut } from "@/features/auth";
import { cn } from "@/lib/utils";

const menuCopy = {
  open: "Account menu",
  profile: "My Profile",
  signOut: "Log Out",
} as const;

/**
 * The avatar and its dropdown, at the right of the signed-in header.
 *
 * The design shows the control closed, so what it opens is inferred: the two things an
 * account menu in this position always offers, and the two this app has routes for.
 *
 * **A menu is only useful if it closes.** Three ways out, because readers reach for
 * different ones: Escape, a click anywhere outside, and choosing an item. Without the
 * outside click it survives navigation and hangs over the next screen; without Escape
 * it is a trap for anyone not using a mouse.
 */
export function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const signOut = useSignOut();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    /*
      `pointerdown`, not `click`: a click fires after the press has already moved focus
      and, on a control that itself navigates, after the navigation has begun. Closing
      on the press is what keeps the menu from outliving the screen it belongs to.
    */
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const itemClasses =
    "flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left font-display text-[14px] text-ink transition-colors duration-200 ease-cinematic hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-label={menuCopy.open}
        className="flex cursor-pointer items-center gap-1.5 rounded-full p-0.5 transition-colors duration-250 ease-cinematic hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink-muted">
          <UserRound aria-hidden="true" className="h-[18px] w-[18px]" />
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-ink-muted transition-transform duration-250 ease-cinematic",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        id={menuId}
        role="menu"
        hidden={!isOpen}
        className="absolute right-0 top-[calc(100%+0.625rem)] z-10 w-48 overflow-hidden rounded-xl border border-black/[0.08] bg-white py-1.5 shadow-[0_12px_32px_rgba(16,24,40,0.14)]"
      >
        <Link
          href="/profile"
          role="menuitem"
          onClick={() => setIsOpen(false)}
          className={itemClasses}
        >
          <UserRound aria-hidden="true" className="h-4 w-4" />
          {menuCopy.profile}
        </Link>

        <button
          type="button"
          role="menuitem"
          onClick={() => {
            setIsOpen(false);
            signOut();
          }}
          className={cn(itemClasses, "text-brand hover:bg-brand/5")}
        >
          <LogOut aria-hidden="true" className="h-4 w-4" />
          {menuCopy.signOut}
        </button>
      </div>
    </div>
  );
}
