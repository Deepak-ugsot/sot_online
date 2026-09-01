/**
 * Places cards on a 3D cylinder — the geometry behind the carousel.
 *
 * Kept separate from the GSAP wiring because this is pure maths: given how far a card
 * sits from the one currently facing the viewer, it returns where that card belongs in
 * space. Nothing here knows about scroll, timelines or the DOM.
 *
 * ---
 *
 * **The edge bunching is the design, not a bug.** Because `x` follows `sin`, the
 * horizontal step between cards shrinks as the angle grows: the pair either side of
 * centre sit clear of it, while the outermost cards tuck in behind their neighbours.
 * That fanned, overlapping stack is exactly what the reference shows.
 *
 * An earlier revision replaced this with evenly-spaced linear positioning to "fix" the
 * crowding. It produced a uniform row with a gap between every pair — cleaner-looking
 * in isolation, and wrong. If a future change makes the arc look evenly spread, this
 * is the thing that regressed.
 */

/**
 * Cylinder radius in px. Larger means a flatter, wider arc.
 *
 * Scale this with the card width — **and only with it**. The neighbouring card sits
 * `RADIUS · sin(26°)` away, so raising the radius alone opens a gap between every pair
 * and flattens the fan into the evenly-spread row this file exists to warn against.
 * Raise both by the same factor and the overlap is preserved; the arc just gets bigger.
 *
 * `730` is two things: the design's original `620` scaled by 1.128 in step with the
 * card's `260 → 293px` (giving `699`), plus a deliberate 4.4% of extra spread on top
 * to open the gap between the centre card and its neighbours from 28px to 42px.
 *
 * That extra spread is the one place this file's own rule is knowingly broken, so keep
 * it small. It is already enough to turn the ±26°/±52° pair's 4px overlap into a 6px
 * gap; much more and the fan stops reading as a stack and starts reading as a row.
 * The far cards still tuck well behind their neighbours, which is what holds the
 * shape together.
 */
const RADIUS = 730;

/** Degrees of arc between adjacent cards. */
const ANGLE_PER_CARD = 26;

/**
 * Angle clamp. Without it the far cards keep rotating past edge-on and reappear
 * mirrored on the other side of the cylinder.
 */
const MAX_ANGLE = 130;

/** How quickly cards shrink and fade with distance from centre, and their floors. */
const SCALE_FALLOFF = 0.1;
const MIN_SCALE = 0.5;
const OPACITY_FALLOFF = 0.15;
const MIN_OPACITY = 0.2;

/** Perspective applied per card, matching the viewport's own. */
const PERSPECTIVE = 1400;

export type ArcTransform = {
  x: number;
  z: number;
  rotationY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  transformPerspective: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Where a card sits on the cylinder.
 *
 * @param delta - Signed distance from the card currently facing the viewer, in card
 *   positions. Fractional values are expected — scroll drives a *floating* centre, so
 *   cards glide between slots rather than snapping.
 *
 * The `x`/`z` pair is what makes this a cylinder rather than a flat fan: `x` follows
 * `sin` and `z` follows `cos`, so a receding card genuinely moves away from the viewer
 * instead of just sliding sideways. `rotationY` is the negated angle, which keeps each
 * card tangent to the curve — it turns to face outward along the cylinder wall rather
 * than staying parallel to the screen.
 */
export function getArcTransform(delta: number): ArcTransform {
  const distance = Math.abs(delta);
  const angleDeg = clamp(delta * ANGLE_PER_CARD, -MAX_ANGLE, MAX_ANGLE);
  const angleRad = (angleDeg * Math.PI) / 180;

  return {
    x: RADIUS * Math.sin(angleRad),
    // 0 at centre, increasingly negative toward the edges, so side cards recede.
    z: RADIUS * (Math.cos(angleRad) - 1),
    rotationY: -angleDeg,
    scale: Math.max(MIN_SCALE, 1 - distance * SCALE_FALLOFF),
    opacity: Math.max(MIN_OPACITY, 1 - distance * OPACITY_FALLOFF),
    // Paint order has to be set explicitly: `z` alone does not resolve stacking
    // reliably once cards overlap — and here they overlap by design, so the nearest
    // card must be given the highest index or the fan stacks the wrong way round.
    zIndex: 100 - Math.round(distance * 10),
    transformPerspective: PERSPECTIVE,
  };
}
