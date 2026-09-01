import type { AnchorHTMLAttributes } from "react";

import { ArrowIcon } from "@/components/ui/arrow-icon";
import { cn } from "@/lib/utils";

type CtaButtonVariant = "primary" | "secondary" | "inverse";
type CtaButtonSize = "sm" | "md" | "lg";

type CtaButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /**
   * - `primary` — solid white pill, for dark backgrounds.
   * - `secondary` — frosted glass pill that sits beside a primary on dark
   *   backgrounds.
   * - `inverse` — solid dark pill, for light backgrounds.
   */
  variant?: CtaButtonVariant;
  /** `sm` header, `md` in-hero, `lg` in-section. */
  size?: CtaButtonSize;
  /** Renders the boxed diagonal arrow. Ignored by the `secondary` variant. */
  withIcon?: boolean;
  /**
   * Appended to the button's own classes. Use for spacing only — this is a plain
   * join, not a Tailwind-aware merge, so it cannot override the display, colour or
   * padding utilities set below. Wrap the button instead. See `cn` in `@/lib/utils`.
   */
  className?: string;
};

/** Shared by every variant: layout, and a visible keyboard focus ring. */
const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap " +
  "transition-[transform,color,background-color,box-shadow] duration-300 ease-cinematic " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

const variantClasses: Record<CtaButtonVariant, Partial<Record<CtaButtonSize, string>>> = {
  primary: {
    sm: "bg-white text-ink text-[13px] font-medium gap-[11px] py-1.5 pl-[19px] pr-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:-translate-y-px",
    md: "bg-white text-ink text-[13px] font-semibold gap-3 py-2.5 pl-6 pr-4 shadow-[0_14px_34px_rgba(0,0,0,0.4)] hover:-translate-y-0.5",
    // The footer's CTA: white pill that flips to brand red on hover. Unlike the
    // smaller primaries it carries no shadow — it sits on a flat black card where a
    // drop shadow would be invisible.
    lg: "bg-white text-ink text-base font-medium gap-4 py-2 pl-[26px] pr-2 hover:bg-brand hover:text-white hover:-translate-y-px",
  },
  /*
    Glass, not a solid fill: this variant only ever sits on the hero's video, and a
    second opaque pill beside the primary would compete with it for the eye. The tint
    is carried at 12% white so the button still reads as a target on the one or two
    frames where the footage goes pale and the blur has nothing to darken — the blur
    is the finish, never the whole background.

    `py-[11px]` rather than the primary's `py-2.5`: the primary is padded around a
    24px icon box and this one is not, so equal padding would leave it visibly shorter
    than the button it stands next to. The odd number is the 1px border, which the
    primary does not carry. Measured — both render 44px tall.
  */
  secondary: {
    sm: "bg-white/12 text-white/90 backdrop-blur-md border border-white/25 text-[13px] font-medium px-[19px] py-2 hover:bg-white/20 hover:text-white",
    md: "bg-white/12 text-white/90 backdrop-blur-md border border-white/25 text-[13px] font-semibold px-6 py-[11px] shadow-[0_14px_34px_rgba(0,0,0,0.25)] hover:bg-white/20 hover:text-white hover:-translate-y-0.5",
  },
  inverse: {
    lg: "bg-ink text-white text-base font-medium gap-4 py-2 pl-[26px] pr-2 hover:bg-brand hover:-translate-y-px",
  },
};

/** The icon box inverts against its button, so it reads as a cut-out either way. */
const iconBoxClasses: Record<CtaButtonVariant, string> = {
  primary: "bg-ink text-white",
  secondary: "",
  inverse: "bg-white text-ink",
};

const iconSizeClasses: Record<CtaButtonSize, string> = {
  sm: "h-[27px] w-[27px]",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

const iconGlyphClasses: Record<CtaButtonSize, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-[18px] w-[18px]",
};

/**
 * The site's call-to-action anchor.
 *
 * Renders an `<a>` because every current CTA navigates. If a CTA ever needs to
 * trigger an action instead, add a sibling `CtaAction` button rather than
 * overloading this with a polymorphic `as` prop.
 *
 * Not every variant defines every size — only the combinations the design actually
 * uses are built, so an unused pairing renders unstyled rather than silently
 * inventing a treatment that was never designed.
 */
export function CtaButton({
  variant = "primary",
  size = "md",
  withIcon = false,
  className,
  children,
  ...props
}: CtaButtonProps) {
  const showIcon = withIcon && variant !== "secondary";

  return (
    <a
      className={cn(baseClasses, variantClasses[variant][size], className)}
      {...props}
    >
      {children}
      {showIcon && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center",
            iconBoxClasses[variant],
            iconSizeClasses[size],
          )}
        >
          <ArrowIcon className={iconGlyphClasses[size]} />
        </span>
      )}
    </a>
  );
}
