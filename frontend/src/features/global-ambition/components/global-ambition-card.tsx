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
    later cards in DOM order would paint their shadows over its edges.
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
        "group relative isolate flex min-h-[11.5rem] items-stretch overflow-hidden rounded-xl",
        // The lift. `ease-cinematic` is the site's signature curve — see `globals.css`.
        "transition-[transform,box-shadow] duration-500 ease-cinematic",
        "hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(10,10,11,0.13)]",
        // Keyboard parity: the card is not focusable itself, but when it wraps a
        // focused control the same lift should read.
        "focus-within:-translate-y-1.5 focus-within:shadow-[0_18px_38px_rgba(10,10,11,0.13)]",
        sizeClasses[card.size],
      )}
    >
      {/* `min-w-0` so a long unbroken title shrinks the text rather than the art. */}
      <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
        <p className="text-[0.6875rem] font-bold tracking-[0.13em] uppercase text-brand">
          {card.track}
        </p>

        <h3 className="mt-2 type-heading text-[clamp(1.0625rem,1.4vw,1.3125rem)] font-bold text-ink">
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
              The second half of the hover: the artwork pushes forward and tips
              slightly while the card lifts. Slower than the card's own transition so
              it reads as the card leading and the render following, rather than as
              one rigid block.
            */
            className="h-full w-full object-contain transition-transform duration-700 ease-cinematic group-hover:scale-[1.06] group-hover:-rotate-[1.5deg]"
          />
        </div>
      </div>
    </article>
  );
}
