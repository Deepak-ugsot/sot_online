"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  CONVERSATIONS_CLIP_MARQUEE_SECONDS,
  conversationsClips,
} from "../constants/conversations.constants";
import { ConversationClipCard } from "./conversation-clip-card";

/**
 * How many copies of the clip set the row holds.
 *
 * Same constraint as `FACULTY_MARQUEE_SECONDS`'s `TRACK_COPIES`: each track travels a
 * full -100% of its own width, so the loop is seamless only while `(copies - 1) ×
 * trackWidth` covers the window. Ten clips run to ~1,640px at desktop against a window
 * of at most ~620px (this column is half the page's measure, not the whole viewport), so
 * two copies close the loop many times over.
 */
const TRACK_COPIES = 2;

type ConversationClipTrackProps = {
  isPlaying: boolean;
  /** `true` for every copy after the first — see `ConversationClipCard`. */
  duplicate?: boolean;
  onSelect: (videoId: string, title: string, trigger: HTMLElement) => void;
};

function ConversationClipTrack({ isPlaying, duplicate = false, onSelect }: ConversationClipTrackProps) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      style={{ animationDuration: `${CONVERSATIONS_CLIP_MARQUEE_SECONDS}s` }}
      className={cn(
        "flex w-max shrink-0",
        // Held at rest (no class, no transform) until `isPlaying` flips true — see the
        // rail below for why. Once it does, `motion-safe:animate-marquee-left` takes the
        // *other* half of the reduced-motion split: whether it ever plays at all.
        isPlaying && "motion-safe:animate-marquee-left",
        "group-hover:[animation-play-state:paused]",
        duplicate && "motion-reduce:hidden",
      )}
    >
      {conversationsClips.map((clip) => (
        <ConversationClipCard key={clip.id} clip={clip} duplicate={duplicate} onSelect={onSelect} />
      ))}
    </ul>
  );
}

type ConversationClipRailProps = {
  onSelect: (videoId: string, title: string, trigger: HTMLElement) => void;
};

/**
 * The ten-clip row beneath the featured video, drifting leftward on a loop — the same
 * two-tracks-side-by-side trick as `FacultyMarquee` (see there for the mechanics), with
 * one addition of its own: **the loop does not start at page load.**
 *
 * A plain marquee runs from the moment it mounts, so a reader who takes half a minute to
 * scroll down the page would arrive to find the row already mid-loop, open on whatever
 * clip it had drifted to rather than "IIT नहीं हुआ तो क्या ??" (`clips[0]`). Instead the
 * track renders at rest — untransformed, `clips[0]` first — until an `IntersectionObserver`
 * reports the row has actually entered the viewport, at which point the animation class is
 * applied for the first time. A CSS animation always starts its cycle at 0% the moment it
 * is applied, so "first paint after the class lands" and "first frame of the loop" are the
 * same moment — which is what puts `clips[0]` in view exactly when a reader reaches it.
 *
 * The observer disconnects itself after the first hit: once running, the row keeps
 * scrolling "all the time" as asked, rather than restarting every time it scrolls in and
 * out of view.
 *
 * Under reduced motion the row drops the marquee for the same reason `FacultyMarquee`
 * does — a stopped loop is a row permanently clipped mid-card at both ends — and becomes
 * a plain swipeable, snap-scrolling list instead.
 */
export function ConversationClipRail({ onSelect }: ConversationClipRailProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsPlaying(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="group mt-4 flex overflow-hidden [--clip-card:8.25rem] sm:[--clip-card:9rem] lg:mt-5 lg:[--clip-card:8.5rem] xl:[--clip-card:9.5rem] motion-safe:[mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%-1.25rem),transparent)] motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:pb-1"
    >
      {Array.from({ length: TRACK_COPIES }, (_, copy) => (
        <ConversationClipTrack key={copy} isPlaying={isPlaying} duplicate={copy > 0} onSelect={onSelect} />
      ))}
    </div>
  );
}
