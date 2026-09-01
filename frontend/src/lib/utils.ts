/**
 * Conditionally joins class names into a single string.
 *
 * Intentionally dependency-free — this is a plain join, **not** a Tailwind-aware merge.
 *
 * That means a class passed in by a caller does NOT reliably beat one a component sets
 * internally: two utilities targeting the same CSS property are both single-class
 * selectors, so the winner is decided by their order in Tailwind's generated stylesheet,
 * not by their order in the `class` attribute. Passing `hidden` to a component that sets
 * `inline-flex` will not hide it.
 *
 * So: put layout/visibility overrides on a wrapper element rather than passing them
 * down via `className`. If overriding a component's own utilities ever becomes a real
 * requirement, add `tailwind-merge` and swap it in here.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
