"use client";

import { X } from "lucide-react";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

export type ActiveVideo = {
  videoId: string;
  title: string;
};

type VideoModalProps = {
  video: ActiveVideo | null;
  onClose: () => void;
};

/**
 * A lightbox that plays a YouTube video over the page, closed by Escape, the
 * backdrop, or the close button.
 *
 * **Portals to `document.body` rather than rendering in place.** This page drives its
 * scroll with GSAP ScrollSmoother, which moves `<main>` via a `transform` — and a
 * `fixed` element inside a transformed ancestor resolves against that ancestor instead
 * of the viewport (see `SmoothScroll`'s own note, which is why `SiteHeader` sits outside
 * it too). Portalling out from under `<main>` is what lets this overlay actually cover
 * the viewport instead of just the section that opened it.
 *
 * Mounts the iframe only while `video` is set, so nothing loads YouTube's player
 * until a video is actually chosen, and playback stops the instant the dialog closes
 * rather than continuing behind it.
 */
export function VideoModal({ video, onClose }: VideoModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!video) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // `html`, not `body`: this is the element `globals.css` already treats as the
    // page's scroll root (see its own `overflow-x: clip`).
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = previousOverflow;
    };
  }, [video, onClose]);

  if (!video) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
    >
      <div
        // Stops a click on the player itself from bubbling to the backdrop and closing it.
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        <h2 id={titleId} className="sr-only">
          {video.title}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          autoFocus
          className="absolute -top-11 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white/80 transition-colors duration-200 ease-cinematic hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-top-12"
        >
          <X aria-hidden="true" className="h-7 w-7" />
        </button>

        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <iframe
            // Remounts on every video change — a reused iframe keeps playing the old
            // video under a new `src` swap until YouTube's player script catches up.
            key={video.videoId}
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
