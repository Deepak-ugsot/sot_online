import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { assets, siteConfig } from "@/config/site.config";
import { callbackCopy } from "../constants/auth.constants";

type LoginTopBarProps = {
  /** Opens the callback form in the panel. */
  onRequestCall: () => void;
};

/**
 * The login screen's own chrome: brand mark back to the site, and the callback
 * request.
 *
 * Not `SiteHeader`. That one carries the landing page's navigation and its "Apply
 * Now" CTA — which is what got the reader here — and it measures the hero to decide
 * its backdrop, a section this route does not have. The two share only a logo.
 *
 * "Request Call" is a `<button>`, not a link: it swaps the panel in place rather than
 * navigating, and the design keeps it visible on every step so the offer of a human
 * is never more than one press away.
 */
export function LoginTopBar({ onRequestCall }: LoginTopBarProps) {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-14">
      <Link
        href="/"
        aria-label={`${siteConfig.name} — home`}
        className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <Image
          src={assets.logoWhite}
          alt={siteConfig.name}
          // Intrinsic size preserves the aspect ratio; the classes drive rendered height.
          width={98}
          height={30}
          priority
          className="h-7 w-auto lg:h-[36px]"
        />
      </Link>

      <button
        type="button"
        onClick={onRequestCall}
        className="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg border border-white/25 bg-white/[0.06] px-4 py-2.5 font-display text-[13px] font-medium text-white backdrop-blur-md transition-colors duration-300 ease-cinematic hover:border-white/40 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <Phone aria-hidden="true" className="h-4 w-4" />
        {callbackCopy.trigger}
      </button>
    </div>
  );
}
