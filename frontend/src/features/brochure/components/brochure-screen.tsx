import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import {
  brochureCtas,
  brochureEyebrow,
  brochureFootnote,
  brochureHeadline,
  brochureSubtext,
} from "../constants/brochure.constants";
import { BrochureCover } from "./brochure-cover";
import { BrochureTopBar } from "./brochure-top-bar";

/**
 * `/brochure` — where the hero's "Download Brochure" lands until there is a PDF to
 * download.
 *
 * **A holding page, not an error page.** The reader asked for a file and is getting a
 * date instead, so the one sentence that says so is the plainest thing on the screen
 * and sits directly under the headline. Everything else — the stack of sheets, the
 * glow, the contents list — is there to make the wait feel like a document in
 * progress rather than a link that is broken.
 *
 * Dark, like `/login` and the hero, and for the same reason: this route is reached
 * from the hero, and a white page one click off that footage reads as a different
 * site. It draws its own chrome (`BrochureTopBar`) rather than mounting `SiteHeader`,
 * whose in-page anchors scroll to nothing from here.
 *
 * A server component. Nothing on it is interactive beyond two links, and the
 * animation is CSS — so there is no reason to ship it to the client.
 */
export function BrochureScreen() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-canvas">
      {/*
        Backdrop, in three layers, all non-interactive.

        A grid alone reads as graph paper and a glow alone reads as a gradient; the
        grid is what gives the glow something to fall on. It is masked to nothing well
        before the edges of the viewport so it never meets a border — a ruled plane
        that stops at a hard line reads as an image pasted onto the page.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 brochure-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_42%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[18%] -top-[28%] -z-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(230,22,31,0.2),transparent_66%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[34%] -right-[14%] -z-10 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(230,22,31,0.14),transparent_68%)] blur-3xl"
      />
      {/* Vignette, drawn last so it sits over the glows and settles the corners. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_38%,transparent_38%,rgba(10,7,8,0.72)_100%)]"
      />

      <BrochureTopBar />

      {/*
        `py-32` clears the absolutely-positioned top bar at every width — it is out of
        flow, so nothing below it reserves its height automatically.
      */}
      <div className="mx-auto flex min-h-svh max-w-[78rem] items-center px-6 py-32 sm:px-8 lg:px-14">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-20">
          {/* Copy. Centred until the layout splits, where it takes the left column. */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 backdrop-blur-sm">
              {/*
                Two dots stacked: a solid one, and a copy of it expanding and fading
                behind. A static dot beside "coming soon" is a bullet; a pulsing one is
                a status light, which is what this is.
              */}
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {/*
                No `uppercase` utility — the string is already set in caps, because the
                brand's lowercase "u" has to survive. `text-transform` would render it
                "UGSOT". Same reasoning as the hero's CTA labels.
              */}
              <span className="font-display text-[11px] font-medium tracking-[0.18em] text-white/70">
                {brochureEyebrow}
              </span>
            </span>

            <h1 className="type-heading mt-7 text-balance text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1.05] text-white">
              {brochureHeadline.lead}{" "}
              {/* The accent face and brand red, exactly as the hero sets its product name. */}
              <span className="font-accent font-medium text-brand">
                {brochureHeadline.accent}
              </span>
            </h1>

            {/*
              The two sentences are separate blocks so the break lands between them.
              The first is the answer the reader came for and is set a step larger and
              brighter than the second, which only explains it.
            */}
            <p className="mt-6 max-w-[34rem] text-[clamp(1rem,1.5vw,1.1875rem)] font-medium leading-relaxed text-white/90">
              {brochureSubtext[0]}
            </p>
            <p className="mt-3 max-w-[34rem] text-[clamp(0.875rem,1.15vw,1.0625rem)] leading-relaxed text-white/55">
              {brochureSubtext[1]}
            </p>

            {/*
              Stacked and full-width on the narrowest screens, capped so the pair never
              stretches to the full column — the hero's CTA row, same reasoning.
            */}
            <div className="mt-9 flex w-full max-w-[20rem] flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              {brochureCtas.map((cta) => (
                <CtaButton
                  key={cta.href}
                  href={cta.href}
                  variant={cta.variant}
                  size="md"
                  withIcon={cta.variant === "primary"}
                  className={cn("w-full sm:w-auto")}
                >
                  {cta.label}
                </CtaButton>
              ))}
            </div>

            <p className="mt-7 text-[13px] leading-snug text-white/40">
              {brochureFootnote}
            </p>
          </div>

          {/*
            The artwork. Ordered after the copy in the DOM so the headline is what a
            narrow screen — and a screen reader — reaches first; on the split layout
            the grid puts it on the right regardless.
          */}
          <div className="flex justify-center lg:justify-end">
            <BrochureCover />
          </div>
        </div>
      </div>
    </section>
  );
}
