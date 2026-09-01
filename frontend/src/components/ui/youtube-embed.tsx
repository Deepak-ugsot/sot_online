"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  /** The 11-character YouTube video id. */
  videoId: string;
  /** Describes the video. Used for the play button's accessible name and the iframe title. */
  title: string;
  className?: string;
};

/**
 * A click-to-load YouTube player.
 *
 * Renders the video's thumbnail with a play button, and only mounts the real iframe
 * once the user asks for it. A plain `<iframe>` would pull roughly a megabyte of
 * YouTube player JavaScript — plus set cookies — on every page load, for every
 * visitor, whether or not they ever press play. On a marketing page most never do.
 *
 * Playback uses `youtube-nocookie.com`, which defers YouTube's tracking cookies until
 * the video actually plays.
 */
export function YouTubeEmbed({ videoId, title, className }: YouTubeEmbedProps) {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl bg-black",
        className,
      )}
    >
      {isPlayerLoaded ? (
        <iframe
          // `autoplay=1` is correct here: the iframe only exists because the user
          // just clicked play, so nothing starts without an explicit action.
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlayerLoaded(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 900px) 640px, 100vw"
            className="object-cover"
          />

          {/* Scrim — keeps the play control legible over an unknown thumbnail. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-black/25 transition-colors duration-300 ease-cinematic group-hover:bg-black/10"
          />

          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-cinematic group-hover:scale-110"
          >
            {/* Nudged right so the triangle looks optically centred in the circle. */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
