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
