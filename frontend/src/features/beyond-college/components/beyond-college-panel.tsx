import { cn } from "@/lib/utils";
import type { BeyondCollegePanel as BeyondCollegePanelData } from "../types/beyond-college.types";
import { BeyondCollegeIcon } from "./beyond-college-icon";

type BeyondCollegePanelProps = {
  panel: BeyondCollegePanelData;
};

/**
 * Everything that differs between the two panels, in one place.
 *
 * Held as a lookup rather than as ternaries at each call site: there are nine
 * decisions here, and spread across the JSX they would be nine separate places to
 * check when a third panel or a dark mode arrives.
 */
const toneStyles = {
  college: {
    surface: "bg-white ring-1 ring-black/[0.05]",
    title: "text-ink",
    /* The rule under the title is the section's red on this side and white on the
       other — it is the one mark that ties the quiet panel to the loud one. */
    rule: "bg-brand",
    subtitle: "text-ink-muted",
    divider: "border-black/[0.06]",
    plate: "bg-[#f3f4f6] text-ink",
    itemTitle: "text-ink",
    itemDescription: "text-ink-muted",
    rowHover: "hover:bg-black/[0.02]",
    plateHover: "group-hover:bg-[#eceef1]",
  },
  accelerator: {
    surface:
      "bg-[linear-gradient(147deg,#ee1a24_0%,#e6161f_40%,#b90c14_100%)] ring-1 ring-white/10",
    title: "text-white",
    rule: "bg-white/55",
    subtitle: "text-white/80",
    divider: "border-white/15",
    plate: "bg-white/15 text-white",
    itemTitle: "text-white",
    itemDescription: "text-white/85",
    rowHover: "hover:bg-white/[0.07]",
    plateHover: "group-hover:bg-white/25",
  },
} as const;

/**
 * One side of the comparison: a titled panel over a list of five rows.
 *
 * **Both panels plate their icons now.** The plate used to be the accelerator's alone,
 * as the mark of the active side — but with a portrait standing between the two, the
 * unplated glyphs on the left read as unfinished rather than as quiet. The two sides
 * are separated by colour instead, which is a louder signal than a 52px square.
 *
 * A Server Component — the row hover is pure CSS, and under `prefers-reduced-motion`
 * the global rule in `globals.css` cuts every transition to 0.01ms, so it needs no
 * guard here.
 */
export function BeyondCollegePanel({ panel }: BeyondCollegePanelProps) {
  const tone = toneStyles[panel.tone];

  return (
    <div
      data-beyond-college="panel"
      className={cn(
        // `relative isolate overflow-hidden` is for the watermark below: it is drawn
        // larger than the panel on purpose, and the panel's own rounding is what
        // crops it back into a corner mark.
        "relative isolate flex h-full flex-col overflow-hidden rounded-2xl p-5 sm:rounded-[1.75rem] sm:p-8 lg:p-9",
        "shadow-[0_18px_40px_-28px_rgba(10,10,11,0.34)] sm:shadow-[0_34px_80px_-46px_rgba(10,10,11,0.42)]",
        tone.surface,
      )}
    >
      {/*
        The chevron the reference sets into the accelerator panel's top-right. Barely
        there by design — it is a texture on the red, not a graphic to be read, so it
        is `aria-hidden` and carries no meaning the copy does not.

        `sm` and up only: it is sized as a fraction of the panel, and on a phone the
        panel is narrow and tall enough that the same fraction stops being a corner
        mark and becomes a band across the copy.
      */}
      {panel.tone === "accelerator" && (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -top-[12%] -right-[18%] -z-10 hidden h-[62%] w-[58%] text-white/[0.07] sm:block"
        >
          <path d="M8 0 58 50 8 100 30 100 80 50 30 0Z" fill="currentColor" />
          <path d="M52 0 100 48 100 52 52 100 74 100 100 74 100 26 74 0Z" fill="currentColor" />
        </svg>
      )}
      {/*
        `<p>` rather than a heading element. These two label the columns of a
        comparison; they are not sections of the document, and promoting them to `h3`
        would put "YOUR COLLEGE" and "uGSOT BEYOND" into the page outline between the
        section's own `h2` and nothing at all.
      */}
      <p
        className={cn(
          "type-heading text-[clamp(1.0625rem,1.6vw,1.5rem)] font-bold",
          tone.title,
        )}
      >
        {panel.title}
      </p>

      <span
        aria-hidden="true"
        className={cn("mt-2.5 block h-[3px] w-9 rounded-full sm:mt-3 sm:w-11", tone.rule)}
      />

      <p className={cn("mt-2.5 text-sm sm:mt-3 sm:text-[0.9375rem]", tone.subtitle)}>
        {panel.subtitle}
      </p>

      <ul className="mt-4 flex list-none flex-col sm:mt-6">
        {panel.items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "group -mx-1.5 flex items-center gap-3 rounded-xl px-1.5 py-3 sm:-mx-2 sm:gap-4 sm:rounded-2xl sm:px-2 sm:py-4",
              "transition-colors duration-300 ease-cinematic",
              tone.rowHover,
              // A rule *between* rows, so the list reads as one block rather than as
              // five separate strips — hence `border-t` on all but the first.
              index > 0 && cn("border-t", tone.divider),
            )}
          >
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-[3.25rem] sm:rounded-[0.9375rem]",
                "transition-[background-color,transform] duration-300 ease-cinematic group-hover:scale-105",
                tone.plate,
                tone.plateHover,
              )}
            >
              <BeyondCollegeIcon
                name={item.icon}
                className="h-[1.375rem] w-[1.375rem] sm:h-[1.625rem] sm:w-[1.625rem]"
              />
            </span>

            <span className="min-w-0">
              <span
                className={cn(
                  "block text-sm leading-snug font-semibold sm:text-[0.9375rem]",
                  tone.itemTitle,
                )}
              >
                {item.title}
              </span>
              <span
                className={cn(
                  "mt-0.5 block text-[0.8125rem] leading-snug sm:mt-1 sm:text-[0.9375rem]",
                  tone.itemDescription,
                )}
              >
                {item.description}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
