import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single place GSAP is configured.
 *
 * `registerPlugin` is idempotent, but routing every feature through one module keeps
 * plugin registration from being scattered across hooks — and means adding a plugin
 * later is a one-line change here rather than an audit of every import site.
 *
 * ScrollSmoother ships inside the `gsap` package itself (it has been free since 3.13),
 * so page-wide smoothing costs no extra dependency and is built to cooperate with the
 * ScrollTrigger pins and scrubs the sections already rely on.
 */
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * Stops mobile browsers' collapsing address bar from re-measuring every ScrollTrigger.
 *
 * On a phone, scrolling down hides the URL bar and scrolling up brings it back. Each
 * time, `window.innerHeight` changes by 50–100px and the browser fires `resize` — so
 * ScrollTrigger refreshes, every pin re-measures, and any `end` computed from
 * `innerHeight` (the hero's is) lands somewhere new *while the finger is still moving*.
 * The result is the scroll visibly catching and jumping, and only ever on real hardware:
 * a desktop browser's mobile emulation has no address bar to collapse, which is why this
 * never reproduces there.
 *
 * `ignoreMobileResize` makes ScrollTrigger ignore resizes that only change the viewport's
 * height on touch devices. A real orientation change still refreshes, because that
 * changes the width too.
 */
if (typeof window !== "undefined") {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, ScrollSmoother };

/**
 * Unwraps a `.pin-spacer` left wrapping `pin` by a previous, already-torn-down
 * ScrollTrigger.
 *
 * ScrollTrigger pins by wrapping the element in a spacer div, and removes that spacer
 * when the trigger is killed — but only while its cache still says the element is
 * "swapped in". Tearing a pin down can clear that flag *before* the spacer comes out
 * (`disable()` marks the pin's gsap cache `uncache`, which throws the cached spacer
 * away), and then nothing is left that knows to remove it. The next pin on the same
 * element therefore builds its own spacer *inside* the abandoned one:
 *
 *     .pin-spacer (stale, height: 100vh, no padding)
 *       └ .pin-spacer (live, height + padding for the real scroll runway)
 *           └ the pinned element
 *
 * The stale wrapper is a fixed viewport height with no pin padding, so it swallows the
 * runway the live spacer reserves — on this page that collapsed the document from
 * ~40,000px to ~23,800px and put every ScrollTrigger below it on the wrong geometry.
 *
 * In production a component mounts once and this never fires. In development React's
 * StrictMode deliberately mounts, unmounts and remounts every effect, so the second
 * mount hits it on the very first page load — which is why the scroll choreography
 * looks broken under `next dev` and correct in a production build.
 *
 * Call this immediately before creating a pin. Any spacer still around the element at
 * that point belongs to an instance that is already gone: the live one has yet to be
 * created, and React always runs the previous cleanup first.
 */
export function unwrapStalePinSpacer(pin: HTMLElement) {
  const spacer = pin.parentElement;
  if (!spacer?.classList.contains("pin-spacer")) return;

  spacer.parentElement?.insertBefore(pin, spacer);
  spacer.remove();
}
