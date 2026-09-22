"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { VideoModal, type ActiveVideo } from "@/components/ui/video-modal";
import {
  conversationsFeaturedVideo,
  conversationsHeading,
  conversationsPortrait,
  conversationsQuote,
} from "../constants/conversations.constants";
import { useConversationsReveal } from "../hooks/use-conversations-reveal";
import { ConversationClipRail } from "./conversation-clip-rail";

/**
 * "Conversations that shape a brighter tomorrow" — Vishwa Mohan's own pull-quote beside
 * a flagship interview and a swipeable row of ten shorter clips.
 *
 * Sits directly under Faculty: that section is who teaches, this one is the school's own
 * voice out in the world, on the same `surface` ground as Faculty and Tech Score either
 * side of it.
 *
 * A Client Component because it owns which video is open — the featured player and every
 * card in the row beneath it share one `VideoModal` instance rather than each mounting
 * its own player, so opening a second clip cannot leave the first still running underneath.
 */
export function ConversationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  // The element that opened the modal, so closing it can hand keyboard focus back
  // instead of dropping it to the top of the document.
  const triggerRef = useRef<HTMLElement | null>(null);

  useConversationsReveal(sectionRef);

  const openVideo = (videoId: string, title: string, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActiveVideo({ videoId, title });
  };

  const closeVideo = () => {
    setActiveVideo(null);
    triggerRef.current?.focus();
  };

  return (
    <section
      id="conversations"
      ref={sectionRef}
      aria-labelledby="conversations-heading"
      className="relative bg-surface"
    >
      {/* `84rem` — the page's shared measure, matching Faculty and Hackathons either side. */}
      <div className="mx-auto max-w-[84rem] px-6 pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
        {/* `7fr/5fr` rather than an even split: the copy column carries a display-sized
            heading beside a full portrait, and an even split leaves neither enough room
            — the design itself reads closer to 58/42 than 50/50.

            **`minmax(0, Nfr)`, never a bare `Nfr`.** A plain `fr` track's automatic
            minimum is its content's max-content size, and that reaches straight through
            the media column's own `overflow-hidden` — the clip rail's two marquee tracks
            sit side by side at `w-max` specifically so the wrapper can clip them, but an
            ancestor's *grid track* sizing doesn't stop at a descendant's overflow the way
            painting does. Without the `minmax(0, …)` floor the 5fr track was measured at
            ~2960px (both marquee copies laid end to end, unclipped) and the 7fr column
            was starved down to its own content's bare minimum to compensate. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 xl:gap-24">
          <div data-conversations="copy" className="lg:relative lg:flex lg:items-start lg:gap-0">
            {/* `lg:w-fit`, not a measured width — the design sets the portrait right
                against "Conversations" with nothing to spare, and any width this file
                hardcodes (a `rem` value, an `em` multiple of the heading's own `vw`
                clamp) is still only ever an estimate of that word's rendered size,
                carrying its own slack to stay safely past it. Each line is its own hard
                break instead (`leadLines`, one `block` span per line) rather than a
                natural wrap inside a width-constrained box, precisely so nothing here
                has to estimate that width at all: `fit-content` sizes the box to
                whichever line is actually widest, in whatever font is actually
                rendering, at its actual current size — exactly as tight as the glyphs
                allow rather than as tight as this file's last measurement allowed. */}
            <h2
              data-conversations="beat"
              id="conversations-heading"
              className="type-heading text-[clamp(2.25rem,4.6vw,3.25rem)] leading-[1.15] text-ink lg:w-fit lg:shrink-0"
            >
              {conversationsHeading.leadLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="font-accent block font-medium text-brand">
                {conversationsHeading.accent}
              </span>
            </h2>

            {/* Below `lg`, image and quote share one box — the card positioned as a
                percentage of it, so the two scale together at every width instead of the
                card drifting off the portrait's corner past whatever breakpoint set its
                offset.

                Beside the heading rather than under it from `lg`, as the design sets the
                pair — `flex-1` over a fixed width because the heading's own box is
                already the fixed side of this row, and a second fixed width would just
                as often overflow the row's own measure as fall short of it.

                **`lg:static`, cancelling the `relative` above.** The design's card sits
                against the *heading's* left edge, not the portrait's — it is mostly
                floating over the gap between them, past the portrait's own narrow box
                entirely at some widths. A card positioned as a percentage of that box
                can point outside it but can never be sized or placed relative to
                something *else* on the row, so from `lg` this stops being the card's
                positioning parent and `copy` (now `lg:relative`) becomes it instead —
                the containing block a plain CSS rule steps up to once nothing closer
                claims it.

                No `@container` here — `container-type` establishes a containing block
                for absolutely positioned descendants of its own accord, the same as
                `position` does, so the card stayed pinned to this box regardless of
                `lg:static` the one time this carried it. Fixed text sizes instead: the
                card's width was never wildly different between the two states this
                traded off (mid-150s to high-200s in px either way), so one pair of
                sizes safe for that whole span costs nothing bigger scaling would have
                bought. */}
            <div
              data-conversations="beat"
              className="relative mx-auto mt-8 w-full max-w-[22rem] sm:max-w-[25rem] lg:static lg:mx-0 lg:mt-0 lg:w-auto lg:max-w-none lg:flex-1"
            >
              <Image
                src={conversationsPortrait.src}
                alt={conversationsPortrait.alt}
                width={conversationsPortrait.width}
                height={conversationsPortrait.height}
                sizes="(min-width: 1024px) 26rem, 85vw"
                className="h-auto w-full select-none"
              />

              {/* A flat `#feebed`, not a translucent `bg-brand/*` — sampled directly off
                  the reference. The card sits over the portrait's own fade-to-transparent
                  edge, not the flat section background, so a percentage-opacity overlay
                  reads a different colour depending on where the photo happens to be
                  lighter or darker underneath it; a solid fill is the one way to match
                  the reference exactly regardless of what is behind it.

                  The `lg:` triple (left/width/bottom) is measured off the reference at
                  24% / 40% / 12% of the row `copy` now resolves this against (see the
                  `lg:static` note above) — `left` from the row's own start, which is the
                  heading's own left edge, not the portrait's.

                  The quote glyph hangs in its own column beside the two text lines rather
                  than stacking above them, as the design sets it — `items-start` over a
                  baseline alignment because it has to sit against the name's *cap* line,
                  and the two have neither the same font size nor the same baseline. */}
              <div className="absolute bottom-[6%] left-[-6%] w-[80%] rounded-2xl bg-[#feebed] p-4 shadow-[0_16px_32px_rgba(230,22,31,0.1)] sm:px-5 lg:bottom-[12%] lg:left-[24%] lg:w-[40%]">
                <div className="flex items-start gap-1.5">
                  <span
                    aria-hidden="true"
                    className="font-display shrink-0 text-[1.5rem] leading-none font-bold text-brand"
                  >
                    &ldquo;
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xl leading-tight font-bold whitespace-nowrap text-brand sm:text-2xl">
                      {conversationsQuote.name}
                    </p>
                    <p className="mt-2 font-display text-sm leading-snug italic text-ink sm:text-[0.9375rem]">
                      {conversationsQuote.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-conversations="media">
            <button
              type="button"
              onClick={(event) =>
                openVideo(
                  conversationsFeaturedVideo.videoId,
                  conversationsFeaturedVideo.title,
                  event.currentTarget,
                )
              }
              aria-label={`Play video: ${conversationsFeaturedVideo.title}`}
              className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-ink shadow-[0_20px_50px_rgba(16,24,40,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <Image
                src={conversationsFeaturedVideo.poster.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 42rem, 100vw"
                className="object-cover"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-black/10 transition-colors duration-300 ease-cinematic group-hover:bg-black/25"
              />

              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 ease-cinematic group-hover:scale-110"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>

            <ConversationClipRail onSelect={openVideo} />
          </div>
        </div>
      </div>

      <VideoModal video={activeVideo} onClose={closeVideo} />
    </section>
  );
}
