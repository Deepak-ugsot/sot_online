import { cn } from "@/lib/utils";
import type { BeyondCollegePanel as BeyondCollegePanelData } from "../types/beyond-college.types";
import { BeyondCollegeIcon } from "./beyond-college-icon";

type BeyondCollegePanelProps = {
  panel: BeyondCollegePanelData;
};

/**
 * Everything that differs between the two panels, in one place.
 *
 * Held as a lookup rather than as ternaries at each call site: there are eight
 * decisions here, and spread across the JSX they would be eight separate places to
 * check when a third panel or a dark mode arrives.
 */
const toneStyles = {
  college: {
    surface:
      "bg-[linear-gradient(148deg,#e9ebee_0%,#f6f7f8_42%,#ffffff_100%)] ring-1 ring-black/[0.06]",
    title: "text-ink",
    subtitle: "text-ink-muted",
    divider: "border-black/[0.07]",
    /* No plate: on the light panel the glyph sits directly on the surface, the way
       the reference draws it. The plate on the other side is what marks that panel
       as the active one. */
    iconPlate: "text-ink/70",
    itemTitle: "text-ink",
    itemDescription: "text-ink-muted",
    rowHover: "hover:bg-black/[0.025]",
  },
  accelerator: {
    surface:
      "bg-[linear-gradient(148deg,#f4232c_0%,#e6161f_45%,#bd0d16_100%)] ring-1 ring-white/10",
    title: "text-white",
    subtitle: "text-white/75",
    divider: "border-white/20",
    iconPlate: "rounded-[0.625rem] bg-white/15 p-2 text-white",
    itemTitle: "text-white",
    itemDescription: "text-white/85",
    rowHover: "hover:bg-white/[0.07]",
  },
} as const;

/**
 * One side of the comparison: a titled panel over a list of five rows.
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
        "flex h-full flex-col rounded-[1.5rem] p-6 sm:p-8",
        "shadow-[0_26px_60px_-34px_rgba(10,10,11,0.32)]",
        tone.surface,
      )}
    >
      {/*
        `<p>` rather than a heading element. These two label the columns of a
        comparison; they are not sections of the document, and promoting them to `h3`
        would put "YOUR COLLEGE" and "uGSOT BEYOND" into the page outline between the
        section's own `h2` and nothing at all.
      */}
      <p className={cn("type-heading text-[1.375rem] font-bold", tone.title)}>
        {panel.title}
      </p>
      <p className={cn("mt-1 text-[0.9375rem]", tone.subtitle)}>{panel.subtitle}</p>

      <ul className="mt-7 flex list-none flex-col">
        {panel.items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "group -mx-2 flex items-start gap-4 rounded-xl px-2 py-4",
              "transition-colors duration-300 ease-cinematic",
              tone.rowHover,
              // A rule *between* rows, so the list reads as one block rather than as
              // five separate strips — hence `border-t` on all but the first.
              index > 0 && cn("border-t", tone.divider),
            )}
          >
            <span
              className={cn(
                "mt-0.5 shrink-0 transition-transform duration-300 ease-cinematic group-hover:scale-110",
                tone.iconPlate,
              )}
            >
              <BeyondCollegeIcon name={item.icon} />
            </span>

            <span className="min-w-0">
              <span
                className={cn(
                  "block text-[0.9375rem] font-semibold leading-snug",
                  tone.itemTitle,
                )}
              >
                {item.title}
              </span>
              <span
                className={cn(
                  "mt-1 block text-[0.9375rem] leading-snug",
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
