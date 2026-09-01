type DemoCursorProps = {
  /** Position in canvas pixels. */
  x: number;
  y: number;
  /** True on the frames around the press. */
  clicking: boolean;
  /** True while the cursor has somewhere to be — it fades out otherwise. */
  visible: boolean;
};

/**
 * The pointer that walks the tour through the product.
 *
 * **It exists so the screens read as being operated rather than merely changing.** Panels
 * that swap on their own look like a slideshow; a pointer that crosses to a button and
 * presses it before the screen advances is what makes the same sequence read as somebody
 * using the product.
 *
 * The travel is a CSS transition on `translate`, not a per-frame position: the tour clock
 * publishes at about 16fps, which would visibly step a cursor moved by JS, while a
 * transition between two published positions is interpolated by the compositor at the
 * display's own rate.
 */
export function DemoCursor({ x, y, clicking, visible }: DemoCursorProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-50"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        opacity: visible ? 1 : 0,
        transition:
          "transform 900ms cubic-bezier(.33,.85,.28,1), opacity 350ms linear",
      }}
    >
      {/* The press ripple: scales up and fades as the click lands. */}
      <span
        className="absolute rounded-full bg-[var(--bsd-lime)]"
        style={{
          left: -8,
          top: -8,
          width: 36,
          height: 36,
          opacity: clicking ? 0.22 : 0,
          transform: clicking ? "scale(1)" : "scale(0.4)",
          transition: "transform 450ms cubic-bezier(.22,1,.36,1), opacity 450ms ease-out",
        }}
      />

      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{
          transform: clicking ? "scale(0.86)" : "scale(1)",
          transition: "transform 180ms ease-out",
          filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.55))",
        }}
      >
        <path
          d="M4 2.2 L4 16.4 L7.7 12.9 L10.2 18.9 L12.8 17.8 L10.3 11.9 L15.3 11.6 Z"
          fill="#ffffff"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="0.9"
        />
      </svg>
    </div>
  );
}
