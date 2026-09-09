import Image from "next/image";

import { cn } from "@/lib/utils";
import type { GlobalAmbitionCard as GlobalAmbitionCardData } from "../types/global-ambition.types";

type GlobalAmbitionCardProps = {
  card: GlobalAmbitionCardData;
  /** Above-the-fold cards skip lazy loading. */
  priority?: boolean;
};

/** Grid placement per `size`. See the type for what each one means. */
const sizeClasses: Record<GlobalAmbitionCardData["size"], string> = {
  default: "",
  /*
    Negative vertical margins on a stretched grid item make its border box taller
    than the row it sits in — which is exactly the effect: the card breaks the row's
    top and bottom line by 10px on each side.

    `lg:` only. Below that the grid is one or two columns and there is no row line to
    break, so the offset would just be a card that hangs oddly.

    `z-10` because it now overlaps its neighbours' margin boxes, and without it the
    later cards in DOM order would paint their own grounds over its edges.
  */
  featured: "lg:z-10 lg:-my-2.5",
  wide: "sm:col-span-2 lg:col-span-3",
};

/**
 * One opportunity: a tinted panel with the copy on the left and the artwork filling
 * the right, bleeding off the card's edge.
 *
 * **The split is a flex row, and only the bleed is absolute.** The obvious build —
 * absolutely positioning the whole media box over the right of the card — cannot
 * guarantee the two clear each other: the copy's width and the art's width are set
 * in different units against different boxes, and at 1280 they overlapped by up to
 * 32px, putting the ICPC medal through its own description. Here the row reserves
 * each side a real track, so they can never collide at any width; the image is
 * absolute *within* its own track, which is what lets it hang past the card's edge
 * (`overflow-hidden` on the card is what then crops it).
 *
 * A Server Component: the hover motion below is pure CSS, so nothing here needs the
 * client. Under `prefers-reduced-motion` the global rule in `globals.css` cuts every
 * transition to 0.01ms, which flattens the whole interaction without a guard here.
 */
export function GlobalAmbitionCard({ card, priority }: GlobalAmbitionCardProps) {
  return (
    <article
      data-global-ambition="card"
      style={{ background: card.tint }}
      className={cn(
        // `group` still earns its place with no hover of its own: the artwork's motion
        // below is keyed to hovering anywhere on the card, not just on the render.
        "group relative isolate flex min-h-[11.5rem] items-stretch overflow-hidden rounded-xl",
        sizeClasses[card.size],
      )}
    >
      {/*
        The ghost word behind the copy — the card's own subject, set at display size in
        one step deeper than its wash.

        Absolute rather than a first child of the copy column: the column is
        `justify-center`, so in flow the mark would push the copy off centre and drag
        the card's height with it. Here it hangs off the card's padding box instead
        (`left-5 sm:left-6`, matching the copy's own `p-5 sm:p-6`), leaving the layout
        exactly as it was.

        `-z-10` puts it behind both the copy and the artwork — the renders are cut-outs
        on transparency, so the mark reads through them the way the wash does. Masked to
        fade out downward so it dies before the description rather than behind it.
      */}
      <span
        aria-hidden="true"
        style={{ color: card.watermarkTint }}
        className={cn(
          "type-heading pointer-events-none absolute top-2.5 left-5 -z-10 leading-[0.8] font-extrabold tracking-[-0.04em] select-none sm:top-3 sm:left-6",
          "text-[clamp(2.75rem,5.4vw,4.75rem)]",
          "[mask-image:linear-gradient(to_bottom,#000_55%,transparent_100%)]",
        )}
      >
        {card.watermark}
      </span>

      {/* `min-w-0` so a long unbroken title shrinks the text rather than the art. */}
      {/*
        The top padding is set again, larger, *after* the shorthand: it is the band the
        ghost word stands in. The copy stays vertically centred — in the room that is
        left — so it still sits on the card's optical centre rather than being pinned
        to the bottom, and the mark gets to be read as a word before the title crosses
        its tail.
      */}
      <div className="flex min-w-0 flex-1 flex-col justify-center p-5 pt-14 sm:p-6 sm:pt-20">
        <h3 className="type-heading text-[clamp(1.0625rem,1.4vw,1.3125rem)] font-bold text-ink">
          {card.title}
        </h3>

        <p className="mt-2 text-[0.8125rem] leading-[1.5] text-ink-muted">
          {card.description}
        </p>
      </div>

      {/*
        `aria-hidden`, and the image's `alt` is empty: every one of these renders is a
        picture of the thing the title already names. Describing them would make a
        screen reader announce "medal", "laptop", "lanyard" after each heading and
        teach the reader nothing a sighted visitor gets from them.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none relative shrink-0",
          card.size === "wide" ? "w-[34%] sm:w-[28%] lg:w-[26%]" : "w-[46%]",
        )}
      >
        {/*
          The bleed box, and the reason the image is not positioned directly.

          Preflight sets `img { max-width: 100% }`, which gives every `next/image`
          a resolved width — so an absolutely positioned one is over-constrained and
          the browser drops the `right` inset entirely, leaving the artwork flush
          with the track instead of hanging past it. A plain `div` has `width: auto`,
          so it takes its width from the insets as intended; the image then simply
          fills it.
        */}
        <div className={cn("absolute", card.mediaClassName)}>
          <Image
            src={card.image.src}
            alt=""
            width={card.image.width}
            height={card.image.height}
            priority={priority}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 50vw"
            /*
              The card's whole hover, now that the panel itself no longer lifts: the
              artwork pushes forward and tips while everything around it holds still.
              Slow (700ms) on purpose — it is the only thing moving, so a quick pop
              would read as a glitch rather than as the render leaning out of the card.
            */
            className="h-full w-full object-contain transition-transform duration-700 ease-cinematic group-hover:scale-[1.06] group-hover:-rotate-[1.5deg]"
          />
        </div>
      </div>
    </article>
  );
}
