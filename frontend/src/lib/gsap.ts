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

export { gsap, ScrollTrigger, ScrollSmoother };
