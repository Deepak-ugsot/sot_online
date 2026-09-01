"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import { assets, navLinks, siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { headerCta } from "../constants/header.constants";
import { useHeaderBackdrop } from "../hooks/use-header-backdrop";

/** Shared classes for the three hamburger bars; each gets its own open-state transform. */
const menuBarClasses =
  "block h-[1.5px] w-6 bg-current transition-all duration-300 ease-cinematic";

/**
 * Site header: brand mark, primary navigation, and the "Apply Now" CTA.
 *
 * Fixed to the top of the viewport for the whole page. It floats with no background
 * of its own over the hero, then fades a dark backdrop in once it has scrolled past
 * it — the nav is white, and every section below the hero is light.
 *
 * Client component: it owns the mobile menu's open/closed state and measures the
 * hero to decide the backdrop.
 */
export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasBackdrop = useHeaderBackdrop(headerRef);

  // Close on Escape, and prevent the page scrolling behind the open mobile panel.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-6 py-4 transition-colors duration-300 ease-cinematic sm:px-8 lg:px-14 lg:py-5",
        // The open menu needs a background of its own at any scroll position —
        // otherwise the page shows through the nav links.
        (hasBackdrop || isMenuOpen) && "bg-canvas/90 backdrop-blur-md",
        // Only past the hero: a rule against the light sections below. Suppressed
        // while the menu is open, where the panel's own divider already reads.
        hasBackdrop && !isMenuOpen && "border-b border-white/10",
      )}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Brand */}
        <a href="#home" className="flex shrink-0 items-center" aria-label={`${siteConfig.name} — home`}>
          <Image
            src={assets.logoWhite}
            alt={siteConfig.name}
            // Intrinsic size preserves the aspect ratio; the classes drive rendered height.
            width={98}
            height={30}
            priority
            className="h-7 w-auto lg:h-[36px]"
          />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 font-display text-base">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/90 transition-colors duration-250 ease-cinematic hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/*
            Header CTA — hidden on the smallest screens, where it moves into the menu
            panel instead. Visibility lives on this wrapper rather than on the button:
            `CtaButton` sets `inline-flex` itself, and a `hidden` passed via `className`
            would lose to it in the generated stylesheet regardless of class order.
          */}
          <span className="hidden sm:block">
            <CtaButton
              href={headerCta.href}
              variant={headerCta.variant}
              size="sm"
              withIcon
            >
              {headerCta.label}
            </CtaButton>
          </span>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] text-white lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span
              className={cn(menuBarClasses, isMenuOpen && "translate-y-[7px] rotate-45")}
              aria-hidden="true"
            />
            <span
              className={cn(menuBarClasses, isMenuOpen && "opacity-0")}
              aria-hidden="true"
            />
            <span
              className={cn(menuBarClasses, isMenuOpen && "-translate-y-[7px] -rotate-45")}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/*
        Mobile menu panel. Body scroll is locked while it is open, so the panel scrolls
        itself on short viewports — otherwise its lower half would be unreachable.
      */}
      <nav
        id="site-mobile-menu"
        aria-label="Primary mobile"
        hidden={!isMenuOpen}
        className="mt-6 max-h-[calc(100svh-9rem)] overflow-y-auto border-t border-white/10 pt-6 lg:hidden"
      >
        <ul className="flex flex-col gap-5 font-display text-lg">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white/90 transition-colors duration-250 ease-cinematic hover:text-brand"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Only shown while the header CTA is hidden, so the two never both appear. */}
        <span className="mt-6 block sm:hidden">
          <CtaButton
            href={headerCta.href}
            variant={headerCta.variant}
            size="sm"
            withIcon
            onClick={() => setIsMenuOpen(false)}
          >
            {headerCta.label}
          </CtaButton>
        </span>
      </nav>
    </header>
  );
}
