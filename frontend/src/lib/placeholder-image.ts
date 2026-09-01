/**
 * TEMPORARY — deterministic placeholder photography.
 *
 * Seeded rather than truly random on purpose: `picsum.photos/seed/<seed>` returns the
 * *same* photo for a given seed every time. An unseeded URL would hand back a
 * different image on every request, so the server-rendered and client-rendered markup
 * could disagree, the page would change on every reload, and the image optimizer's
 * cache would never hit.
 *
 * Request a size with real headroom rather than the element's CSS size: Next's
 * optimizer never upscales, so the requested dimensions cap every generated variant
 * and an undersized source leaves the element visibly soft on retina displays.
 *
 * To replace with real art: drop the files in `public/assets/`, point the feature's
 * card data at those local paths, write real `alt` text (placeholders ship with
 * `alt=""` because they are decorative), and delete the `picsum.photos` entry from
 * `next.config.ts`.
 */
export function placeholderImage(
  seed: string,
  width: number,
  height: number,
): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
