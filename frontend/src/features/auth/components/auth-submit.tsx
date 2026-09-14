import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthSubmitProps = {
  children: ReactNode;
  /** Rendered before the label. The callback form's button carries a phone glyph. */
  icon?: ReactNode;
  /** Blocks a second submit and swaps the label — the caller supplies the pending copy. */
  isPending?: boolean;
};

/**
 * The red submit button both forms on this screen end with.
 *
 * A `<button type="submit">`, not the site's `CtaButton` — that one renders an `<a>`
 * by its own documented design, and an anchor cannot submit a form, be disabled, or
 * carry a pending state. This is the sibling its comment asks for rather than a
 * polymorphic `as` prop bolted onto it.
 *
 * **It is never disabled for an incomplete form.** A greyed-out button with no
 * explanation is the most common way a form dead-ends: the reader cannot tell which
 * field is holding it back, and a screen reader skips the control entirely. Both
 * forms here stay pressable and answer on submit with a message against the field
 * that is wrong. The only thing that disables it is a request already in flight.
 *
 * Full width: it closes a stacked column of full-width fields, and a button narrower
 * than the field above it would break that edge.
 */
export function AuthSubmit({ children, icon, isPending = false }: AuthSubmitProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      // Tells assistive technology the control is working, which the label change
      // alone does not.
      aria-busy={isPending || undefined}
      className={cn(
        "flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg",
        "bg-brand font-display text-[15px] font-semibold text-white",
        "transition-[background-color,transform,opacity] duration-300 ease-cinematic",
        "hover:bg-[#c9121a] hover:-translate-y-px",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
        "disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-brand",
      )}
    >
      {icon}
      {children}
    </button>
  );
}
