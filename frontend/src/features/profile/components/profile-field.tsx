import { cn } from "@/lib/utils";
import type { ProfileField as FieldDef } from "../types/profile.types";
import { formatStoredDate } from "../utils/profile.utils";

type ProfileFieldProps = {
  field: FieldDef;
  value: string;
  /** Read-only when false: the control stays, its affordance does not. */
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
};

/**
 * One labelled field, in both of its states.
 *
 * **Read-only is `readOnly`, not `disabled`.** The two look alike and behave nothing
 * alike: a disabled input is skipped by keyboard navigation, is not announced by a
 * screen reader, and cannot have its contents selected or copied. Since three quarters
 * of this screen's life is spent read-only, `disabled` would make a profile that is
 * unreadable to anyone not using a mouse and unable to copy their own enrollment
 * number. `readOnly` keeps all of that and still refuses edits.
 *
 * The same control is used in both states rather than swapping an input for a `<p>`,
 * so entering edit mode does not reflow the card by a pixel — the change the student
 * sees is the affordance changing, not the layout jumping.
 */
export function ProfileField({
  field,
  value,
  isEditing,
  onChange,
}: ProfileFieldProps) {
  const id = `profile-${field.name}`;
  const Icon = field.icon;
  const isTextarea = field.control === "textarea";

  /*
    Filled grey and borderless while read-only, white and outlined while editing. The
    fill is the design's; the border only exists in edit mode, which is what makes an
    editable field look like somewhere to type rather than like a label that happens
    to be in a box.
  */
  const controlClasses = cn(
    "w-full rounded-lg border px-4 font-display text-[15px] text-ink",
    "placeholder:text-ink-muted/55",
    "transition-colors duration-250 ease-cinematic",
    isEditing
      ? "border-hairline bg-white hover:border-ink-muted/40 focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      : // `cursor-default`, not `not-allowed`: nothing is broken, it simply is not
        // editable yet, and a barred cursor on every field reads as an error state.
        "cursor-default border-transparent bg-surface",
  );

  return (
    <div className={cn("flex flex-col gap-2", field.span === "full" && "md:col-span-2")}>
      <label
        htmlFor={id}
        className="flex items-center gap-2 font-display text-[13.5px] text-ink-muted"
      >
        <Icon className="h-4 w-4 shrink-0" />
        {field.label}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          readOnly={!isEditing}
          rows={3}
          className={cn(controlClasses, "resize-y py-3 leading-[1.6]")}
        />
      ) : (
        <input
          id={id}
          /*
            A date field is a native picker while editing and plain text while not.
            `type="date"` renders its own `dd/mm/yyyy` scaffolding and spinner even when
            empty and read-only, which is noise on a screen that is mostly read — and
            it would show `2004-09-14` rather than a date anyone writes. Read-only, it
            shows the formatted date; editing, it hands back the real picker.
          */
          type={
            field.control === "date"
              ? isEditing
                ? "date"
                : "text"
              : (field.control ?? "text")
          }
          value={
            field.control === "date" && !isEditing
              ? formatStoredDate(value)
              : value
          }
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          readOnly={!isEditing}
          autoComplete={field.autoComplete}
          className={cn(controlClasses, "h-12")}
        />
      )}
    </div>
  );
}
