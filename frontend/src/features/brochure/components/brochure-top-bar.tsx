import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/ui/arrow-icon";
import { assets, siteConfig } from "@/config/site.config";

/**
 * The holding page's own chrome: the brand mark home, and a plain way back.
 *
 * Not `SiteHeader`, for the same reason `/login` does not use it either — that header
 * carries the landing page's in-page anchors, which from this route scroll to nothing
 * at all, and it measures a hero this page does not have. The two share only a logo.
 *
 * "Back" is spelled out rather than drawn as a bare chevron: this is a dead end, and
 * the way out of a dead end should not need decoding.
 */
export function BrochureTopBar() {
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
          width={147}
          height={30}
          priority
          className="h-7 w-auto lg:h-[36px]"
        />
      </Link>

      <Link
        href="/"
        className="group flex shrink-0 items-center gap-2.5 rounded-lg border border-white/20 bg-white/[0.06] px-4 py-2.5 font-display text-[13px] font-medium text-white/85 backdrop-blur-md transition-colors duration-300 ease-cinematic hover:border-white/40 hover:bg-white/12 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        {/* Mirrored rather than a separate left-pointing path — one glyph, one weight. */}
        <ArrowIcon
          direction="right"
          className="h-3 w-[1rem] rotate-180 transition-transform duration-300 ease-cinematic group-hover:-translate-x-0.5"
        />
        Back to site
      </Link>
    </div>
  );
}
