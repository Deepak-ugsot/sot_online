import { buildspaceOutro } from "../../constants/buildspace.constants";
import { DemoIcon } from "./demo-icon";

/**
 * The sign-off that closes the loop: two lines and the product mark, each arriving in
 * turn.
 *
 * **It is the only chapter with no app chrome, and that is what makes the loop legible.**
 * Without a beat that clearly ends, a tour that jumps from the submitted confirmation
 * straight back to the dashboard reads as having glitched rather than started again.
 *
 * Lines rise out of a blur rather than simply fading, which is the same entrance the
 * marketing headings above use.
 */
export function DemoOutro({ progress }: { progress: number }) {
  const lines = [
    { text: buildspaceOutro.lead, className: "text-[38px] font-bold tracking-[-0.03em] text-white" },
    { text: buildspaceOutro.trail, className: "text-[19px] text-[var(--bsd-text-2)]" },
  ];

  /** Each line gets a third of the chapter's first 80% to arrive in. */
  const step = (index: number) => progress > 0.12 + index * 0.17;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
      {lines.map((line, index) => (
        <div
          key={line.text}
          className={line.className}
          style={{
            opacity: step(index) ? 1 : 0,
            transform: step(index) ? "none" : "translateY(14px)",
            filter: step(index) ? "blur(0px)" : "blur(6px)",
            transition: "all 720ms cubic-bezier(.22,1,.36,1)",
          }}
        >
          {line.text}
        </div>
      ))}

      <div
        className="mt-[10px] flex items-center gap-[10px]"
        style={{
          opacity: step(2) ? 1 : 0,
          transform: step(2) ? "none" : "translateY(12px)",
          transition: "all 660ms cubic-bezier(.22,1,.36,1)",
        }}
      >
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[var(--bsd-lime)] text-black">
          <DemoIcon name="code" size={17} />
        </span>
        <span className="text-[17px] font-bold text-white">{buildspaceOutro.badge}</span>
      </div>
    </div>
  );
}
