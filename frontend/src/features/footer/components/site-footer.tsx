"use client";

import Image from "next/image";
import { useRef } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import { assets, siteConfig } from "@/config/site.config";
import {
  footerCta,
  footerDisclaimer,
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
              width={3851}
              height={459}
              className="h-auto w-full"
            />
          </div>

          <FooterTagline />

          {/*
            Brand mark and social accounts, centred.

            This used to be a `justify-between` row with the mark on the left and two
            columns of links opposite. The columns are gone — every one of them pointed
            at a section that does not exist — and with them the only reason the mark
            sat off to one side. Centred, it lines up with the CTA, the watermark, the
            tagline and the disclaimer, which is how the rest of the card reads.
          */}
          <div data-footer="column" className="flex flex-col items-center gap-7">
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
