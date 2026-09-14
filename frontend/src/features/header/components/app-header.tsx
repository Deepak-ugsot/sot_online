"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { assets, siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { appNavLinks } from "../constants/header.constants";
import { AccountMenu } from "./account-menu";

/** Shared by the three hamburger bars; each gets its own open-state transform. */
const menuBarClasses =
  "block h-[1.5px] w-6 bg-current transition-all duration-300 ease-cinematic";

/**
 * The header for signed-in screens: brand mark, navigation, "Request Call", account menu.
 *
 * **Not `SiteHeader`.** That one is fixed over the hero, floats with no background
 * until it has scrolled past it, measures the hero every frame to decide when, and
 * carries an "Apply Now" CTA. None of that applies here: there is no hero, the page is
 * light, and a student who is already signed in is not applying. The two share a
 * navigation shape and nothing else, and folding both behaviours into one component
 * would mean every change to either having to be reasoned about against the other.
 *
 * It sits in the flow rather than fixed, so the profile scrolls under nothing and needs
 * no top padding to clear it.
 */
export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-black/[0.06] bg-white">
      <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <Image
            src={assets.logoMark}
            alt={siteConfig.name}
            width={36}
            height={50}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 font-display text-[15px]">
            {appNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink transition-colors duration-250 ease-cinematic hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/*
            Dark pill on a light bar — the inverse of the same control on the login
            screen, which is light on dark. Hidden on the narrowest screens, where it
            moves into the menu panel; the visibility lives on this wrapper because
            `cn` is a plain join and could not beat the button's own `inline-flex`.
          */}
          <span className="hidden sm:block">
            <Link
              href="/#faqs"
              className="inline-flex items-center gap-2.5 rounded-lg bg-ink px-4 py-2.5 font-display text-[13.5px] font-medium text-white transition-colors duration-300 ease-cinematic hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              Request Call
            </Link>
          </span>

          <AccountMenu />

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="app-mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] text-ink lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span
              className={cn(menuBarClasses, isMenuOpen && "translate-y-[7px] rotate-45")}
              aria-hidden="true"
            />
            <span className={cn(menuBarClasses, isMenuOpen && "opacity-0")} aria-hidden="true" />
            <span
              className={cn(menuBarClasses, isMenuOpen && "-translate-y-[7px] -rotate-45")}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <nav
        id="app-mobile-menu"
        aria-label="Primary mobile"
        hidden={!isMenuOpen}
        className="border-t border-black/[0.06] px-6 py-5 sm:px-8 lg:hidden"
      >
        <ul className="flex flex-col gap-4 font-display text-[16px]">
          {appNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-ink transition-colors duration-250 ease-cinematic hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Only while the header's own copy is hidden, so the two never both appear. */}
        <span className="mt-5 block sm:hidden">
          <Link
            href="/#faqs"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center gap-2.5 rounded-lg bg-ink px-4 py-2.5 font-display text-[13.5px] font-medium text-white transition-colors duration-300 ease-cinematic hover:bg-brand"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            Request Call
          </Link>
        </span>
      </nav>
    </header>
  );
}
