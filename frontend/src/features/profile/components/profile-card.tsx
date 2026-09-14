import type { ProfileCard as CardDef, ProfileValues } from "../types/profile.types";
import { ProfileField } from "./profile-field";

type ProfileCardProps = {
  card: CardDef;
  values: ProfileValues;
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
};

/**
 * One white card: red icon badge, title, and a two-column grid of its fields.
 *
 * The grid is single-column below `md`. The design's pairs — First/Last name,
 * City/State — are two halves of one thing, and at phone width a two-column grid makes
 * each half narrower than the text it holds.
 */
export function ProfileCard({ card, values, isEditing, onChange }: ProfileCardProps) {
  const Icon = card.icon;

  return (
    <section
      aria-labelledby={`${card.id}-title`}
      className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)] sm:p-8"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
          <Icon className="h-5 w-5" />
        </span>
        <h2
          id={`${card.id}-title`}
          className="font-display text-[18px] font-semibold text-ink"
        >
          {card.title}
        </h2>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        {card.fields.map((field) => (
          <ProfileField
            key={field.name}
            field={field}
            value={values[field.name] ?? ""}
            isEditing={isEditing}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  );
}
