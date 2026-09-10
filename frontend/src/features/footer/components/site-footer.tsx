"use client";

import Image from "next/image";
import { useRef } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import { assets, siteConfig } from "@/config/site.config";
import {
  footerCta,
  footerDisclaimer,
  footerLinkColumns,
  footerSocialLinks,
} from "../constants/footer.constants";
import { useFooterReveal } from "../hooks/use-footer-reveal";
import { FooterTagline } from "./footer-tagline";
import { SocialIcon } from "./social-icon";

/**
 * Site footer: a black card with rounded top corners, sitting on the light ground.
 *
 * The `padding-top` on the outer element is what leaves the sliver of light
 * background visible above the card — that gap is why the rounded corners read as a
 * card rather than as the page simply ending.
 */
export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useFooterReveal(footerRef);

  return (
    <footer ref={footerRef} className="bg-surface pt-6">
      <div className="overflow-hidden rounded-t-[clamp(1.75rem,7vw,6.25rem)] bg-ink-raised">
        {/*
          The five blocks are separated by one shared gap rather than per-block
          margins, so this single value is the footer's rhythm.

          It was `20` (80px) with `p-20` to match: five blocks, four gaps and the card
          padding came to 480px of the footer's 1412 — a third of it was space. `12`
          and `p-14` keep the blocks clearly apart without the card reading as mostly
          air.
        */}
        <div className="flex flex-col items-center gap-10 px-6 py-10 min-[900px]:gap-12 min-[900px]:p-14">
          <div
            data-footer="cta"
            className="flex max-w-[45.25rem] flex-col items-center gap-[30px]"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="flex flex-col items-center type-heading font-semibold text-[clamp(1.75rem,3.6vw,3.25rem)] text-white">
                {footerCta.headingLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>

              <p className="font-display text-[15px] leading-[1.65] text-[#e5e5e5]">
                {footerCta.paragraph}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[18px]">
              <CtaButton
                href={footerCta.link.href}
                variant="primary"
                size="lg"
                withIcon
              >
                {footerCta.link.label}
              </CtaButton>

              <p className="font-display text-[13px] text-[#e5e5e5]">
                {footerCta.note.before}
                <span className="text-brand">{footerCta.note.highlight}</span>
                {footerCta.note.after}
              </p>
            </div>
          </div>

          {/*
            Decorative wordmark. Hidden below 900px, where it would shrink to an
            illegible smear, and `aria-hidden` because the brand is already named by
            the logo below it.

            Rendered at full opacity rather than the reference's 50%: the artwork
            already fades its own strokes out toward the bottom, so dimming it again
            washed the top of the wordmark out too.
          */}
          <div
            data-footer="watermark"
            aria-hidden="true"
            className="relative hidden w-full max-w-[71.875rem] min-[900px]:block"
          >
            <Image
              src={assets.footerWatermark}
              alt=""
              // The file's true pixel dimensions; anything else sets the wrong
              // intrinsic ratio and the reserved box jumps on load.
              width={3840}
              height={491}
              className="h-auto w-full"
            />
          </div>

          <FooterTagline />

          <div className="flex w-full flex-wrap items-start justify-center gap-12 min-[900px]:justify-between">
            <div
              data-footer="column"
              className="flex flex-col items-center gap-7 min-[900px]:items-start"
            >
              <Image
                src={assets.logoWhite}
                alt={siteConfig.name}
                width={150}
                height={46}
                className="h-[46px] w-auto"
              />

              <ul className="flex list-none items-center gap-6">
                {footerSocialLinks.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      // The link carries the accessible name; the glyph is decorative.
                      aria-label={social.label}
                      className="block text-white/90 transition-colors duration-300 ease-cinematic hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* `25` (100px) between the two link columns read as a hole in the row. */}
            <div className="flex gap-12 min-[900px]:gap-16">
              {footerLinkColumns.map((column) => (
                <nav
                  key={column.id}
                  data-footer="column"
                  aria-labelledby={`footer-${column.id}`}
                  className="text-left"
                >
                  <h3
                    id={`footer-${column.id}`}
                    className="mb-7 font-display text-xl font-medium uppercase text-white"
                  >
                    {column.heading}
                  </h3>

                  <ul className="flex list-none flex-col gap-[18px]">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="font-display text-base text-white/60 transition-colors duration-300 ease-cinematic hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div
            data-footer="bottom"
            className="w-full border-t border-white/15 pt-8"
          >
            <p className="mx-auto max-w-[62.5rem] text-center font-display text-xs leading-[1.6] text-white/60">
              {footerDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
