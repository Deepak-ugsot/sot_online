import Image from "next/image";

import { conversationsClipLabel } from "../constants/conversations.constants";
import type { ConversationsClip } from "../types/conversations.types";

type ConversationClipCardProps = {
  clip: ConversationsClip;
  /**
   * `true` on every copy of the row after the first — see `ConversationClipRail` for why
   * the row exists more than once. The button loses its accessible name and its place in
   * the tab order: `aria-hidden` on the track already removes it from a screen reader,
   * but does nothing about keyboard focus on its own, and a silently-focusable duplicate
   * button is a worse trap than a plain image ever was in the faculty row this pattern
   * is borrowed from — that row has nothing focusable inside a duplicate card at all.
   */
  duplicate?: boolean;
  onSelect: (videoId: string, title: string, trigger: HTMLElement) => void;
};

/** One clip: its live YouTube thumbnail, the guest's name, and a play button. */
export function ConversationClipCard({ clip, duplicate = false, onSelect }: ConversationClipCardProps) {
  return (
    <li className="shrink-0 pr-3 motion-reduce:snap-start">
      <button
        type="button"
        tabIndex={duplicate ? -1 : undefined}
        aria-label={duplicate ? undefined : `Play video: ${clip.headline}`}
        onClick={(event) => onSelect(clip.videoId, clip.headline, event.currentTarget)}
        className="group w-[var(--clip-card)] cursor-pointer overflow-hidden rounded-lg bg-white text-left shadow-[0_2px_10px_rgba(16,24,40,0.08)] transition-transform duration-300 ease-cinematic hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink">
          <Image
            src={`https://i.ytimg.com/vi/${clip.videoId}/hqdefault.jpg`}
            alt=""
            fill
            sizes="152px"
            className="object-cover"
          />
        </div>

        <div className="flex items-center justify-between gap-2 px-2.5 py-2">
          <span className="min-w-0 font-display">
            <span className="block truncate text-[0.8125rem] leading-tight font-semibold text-ink">
              {clip.guest}
            </span>
            <span className="block text-[0.6875rem] leading-tight text-ink-muted">
              {conversationsClipLabel}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ink transition-transform duration-300 ease-cinematic group-hover:scale-110"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3 text-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </button>
    </li>
  );
}
