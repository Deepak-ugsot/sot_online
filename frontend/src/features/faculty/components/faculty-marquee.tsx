import { cn } from "@/lib/utils";
import { FACULTY_MARQUEE_SECONDS } from "../constants/faculty.constants";
import type { FacultyMember } from "../types/faculty.types";
import { FacultyCard } from "./faculty-card";

/**
 * How many copies of the card set the row holds.
 *
 * **A constraint, not a preference.** Each track travels a full -100% of its own width,
 * so at the end of a cycle the remaining `copies - 1` tracks are all that is left
 * covering the window: the loop is seamless only while `(copies - 1) × trackWidth` is at
 * least the window's width. Eight cards measure ~2,850px against a window of at most
 * 1,296px, so two copies close the loop with room to spare. If the roster ever drops to
 * three people or fewer, the track falls under the window and this needs to be three.
 */
const TRACK_COPIES = 2;

type FacultyTrackProps = {
  members: readonly FacultyMember[];
  /**
   * `true` for every copy after the first. A screen reader must meet the faculty once,
   * so the duplicates are hidden from assistive tech — and dropped entirely under
   * reduced motion, where there is no loop for them to close.
   */
  duplicate?: boolean;
};

/** One copy of the card set. */
function FacultyTrack({ members, duplicate = false }: FacultyTrackProps) {
  return (
    <ul
      data-faculty="track"
      aria-hidden={duplicate || undefined}
      // A per-section number from the constants file rather than a class: enumerating
      // durations as Tailwind utilities would put content data into a style map. Same
      // reasoning as the employer marquee and the real-world ribbons.
      style={{ animationDuration: `${FACULTY_MARQUEE_SECONDS}s` }}
      className={cn(
        "flex w-max shrink-0",
        "motion-safe:animate-marquee-left",
        // Holds still under the pointer, so a reader who has stopped on a card is not
        // chasing it across the row.
        "group-hover:[animation-play-state:paused]",
        duplicate && "motion-reduce:hidden",
      )}
    >
      {members.map((member) => (
        <FacultyCard key={member.id} member={member} duplicate={duplicate} />
      ))}
    </ul>
  );
}

/**
 * The faculty cards, drifting leftward for as long as the section is on screen.
 *
 * The loop is the same trick as the employer marquee, the real-world ribbons and the
 * One Program rails: identical tracks side by side, each translated a full -100% of its
 * own width, so when one has slid exactly off the left its neighbour stands precisely
 * where it began. It holds only while every copy renders the same cards.
 *
 * The window's edges are a mask rather than a gradient drawn over the cards, so the
 * cards fade into whatever the section's ground is, and nothing sits on top of them to
 * intercept the hover that pauses the row.
 *
 * **Under reduced motion the row stops being a marquee and becomes a scroller.** A
 * stopped marquee is a row clipped mid-card at both ends, with the rest of the faculty
 * unreachable. So the duplicates and the mask drop out, the window scrolls on its own
 * axis with snap points, and every card is one swipe or scroll away — same cards, no
 * motion the reader did not ask for.
 *
 * A Server Component: the motion is a CSS animation, and pausing it is a CSS `group`
 * away.
 */
export function FacultyMarquee({ members }: { members: readonly FacultyMember[] }) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        "motion-safe:[mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%_-_2.5rem),transparent)]",
        "motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto",
      )}
    >
      {Array.from({ length: TRACK_COPIES }, (_, copy) => (
        <FacultyTrack key={copy} members={members} duplicate={copy > 0} />
      ))}
    </div>
  );
}
