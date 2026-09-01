/** A single entry in the primary navigation. */
export type NavLink = {
  label: string;
  href: string;
};

/** The header's call-to-action. `variant` selects the button treatment. */
export type HeaderCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};
