import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { backLabel } from "../constants/auth.constants";

type AuthPanelProps = {
  heading: string;
  /** Renders the back control. Omitted on the first step, which has nowhere to go back to. */
  onBack?: () => void;
  /** Sits under the content — the consent line, on the steps that carry one. */
  footer?: ReactNode;
  children: ReactNode;
};

/**
 * The right-hand column every step renders into: optional back control, heading,
 * content, optional footer.
 *
 * The five steps differ only in those four slots, so the column's width, rhythm and
 * type scale are set once here. Without it each step restates them and they drift —
 * the heading is the fixed point a reader tracks as the panel changes under it, and
 * it has to land in exactly the same place every time.
 */
export function AuthPanel({ heading, onBack, footer, children }: AuthPanelProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex w-fit cursor-pointer items-center gap-3 font-display text-[15px] text-white/80 transition-colors duration-250 ease-cinematic hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <ArrowLeft aria-hidden="true" className="h-[18px] w-[18px]" />
          {backLabel}
        </button>
      )}

      <h1 className="type-heading font-bold text-[clamp(1.75rem,3.4vw,2.75rem)] text-white">
        {heading}
      </h1>

      {children}

      {footer}
    </div>
  );
}
