import type { ComponentType } from "react";

/**
 * A field or card glyph.
 *
 * Structurally typed rather than `LucideIcon`, because two of these are not Lucide
 * icons: `lucide-react` dropped its brand marks, so LinkedIn and GitHub are drawn in
 * `brand-icon.tsx`. Anything that takes a `className` and renders satisfies this, so
 * both kinds sit in the same field definitions without a wrapper.
 */
export type ProfileIcon = ComponentType<{ className?: string }>;

/** The four entries in the profile sidebar. */
export type ProfileSectionId =
  | "personal"
  | "academic"
  | "payments"
  | "professional";

/**
 * The three sections that are a form.
 *
 * Payments is deliberately not one of these: it is a record of what was billed and
 * paid, which the student reads and the finance system writes. Giving it an edit mode
 * would invite someone to "correct" their own balance.
 */
export type EditableSectionId = Exclude<ProfileSectionId, "payments">;

/** One entry in the sidebar. */
export type ProfileNavItem = {
  id: ProfileSectionId;
  label: string;
  /** The second line, under the label. */
  hint: string;
  href: string;
  icon: ProfileIcon;
};

/**
 * One field in a profile card.
 *
 * Every value is a string — including the date, which is held as the `yyyy-mm-dd` an
 * `<input type="date">` reads and writes. Uniform values are what let one storage
 * shape, one change handler and one control cover every field on the three forms.
 */
export type ProfileField = {
  name: string;
  label: string;
  placeholder: string;
  icon: ProfileIcon;
  /** `textarea` renders the multi-line control; anything else is an `<input type>`. */
  control?: "text" | "email" | "tel" | "date" | "url" | "textarea";
  /** Spans both columns of the card's grid. Only the bio needs it. */
  span?: "full";
  autoComplete?: string;
};

/** One card: a red icon badge, a title, and a two-column grid of fields. */
export type ProfileCard = {
  id: string;
  title: string;
  icon: ProfileIcon;
  fields: readonly ProfileField[];
};

/** A whole editable screen: its heading, and the cards that save together. */
export type ProfileSectionConfig = {
  id: EditableSectionId;
  title: string;
  subtitle: string;
  cards: readonly ProfileCard[];
};

/** One section's saved values, keyed by `ProfileField["name"]`. */
export type ProfileValues = Record<string, string>;

/** Everything the student has filled in, split by the unit that saves together. */
export type ProfileRecord = Record<EditableSectionId, ProfileValues>;

/** How a payment installment stands. Drives the pill's colour and its label. */
export type PaymentStatus = "paid" | "pending" | "overdue";

/** One row of the payment history table. */
export type PaymentEntry = {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: PaymentStatus;
};

/** One tile in the payment overview grid. */
export type PaymentStat = {
  id: string;
  label: string;
  value: string;
  /** `due` tints the tile red; `status` renders the value as a pill instead of text. */
  emphasis?: "due" | "status";
};

/** Where an async action stands. Drives the button label and the error line. */
export type RequestState = "idle" | "pending" | "error";
