import { cn } from "@/lib/utils";

type StatusTone = "paid" | "pending" | "overdue" | "neutral";

/**
 * The small coloured pill used for a payment's state.
 *
 * Every tone carries its own label as text — the colour is a second signal, never the
 * only one. Red and green at this size are exactly the pair that around one man in
 * twelve cannot tell apart, and a table whose meaning is carried by that difference is
 * unreadable to them.
 */
const toneClasses: Record<StatusTone, string> = {
  paid: "bg-[#e7f6ec] text-[#116b36]",
  pending: "bg-[#fdeaea] text-[#b3261e]",
  overdue: "bg-[#fdeaea] text-[#b3261e]",
  neutral: "bg-[#fdf3e2] text-[#8a5a00]",
};

export function StatusPill({
  tone,
  children,
}: {
  tone: StatusTone;
  children: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-display text-[12px] font-semibold",
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
