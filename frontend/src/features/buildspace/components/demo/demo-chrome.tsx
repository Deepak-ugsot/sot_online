import { demoChrome } from "../../constants/demo.constants";
import { DemoIcon, type DemoIconName } from "./demo-icon";

/** Which nav item reads as current. The library chapter browses; the rest are inside a project. */
type DemoChromeProps = { active: "Dashboard" | "Library" };

const NAV_ICONS: Record<string, DemoIconName> = {
  Dashboard: "grid",
  Library: "book",
  "My Learning": "cap",
};

/**
 * The product's top bar — brand, nav, search, streak, avatar.
 *
 * Present on every app screen and never animated, so it is the thing that makes the
 * chapters read as one product rather than six unrelated panels.
 */
export function DemoChrome({ active }: DemoChromeProps) {
  return (
    <header className="flex h-[58px] flex-none items-center gap-[26px] border-b border-[var(--bsd-line)] bg-[var(--bsd-bg)] px-[26px]">
      <div className="flex items-center gap-[9px]">
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-[var(--bsd-lime)] text-black">
          <DemoIcon name="code" size={15} />
        </span>
        <span className="text-[15px] font-bold tracking-[-0.01em] text-white">
          {demoChrome.brand}
        </span>
      </div>

      <nav className="flex items-center gap-[22px]">
        {demoChrome.nav.map((item) => {
          const isActive = item === active;
          return (
            <span
              key={item}
              className="flex items-center gap-[7px] text-[12.5px] font-medium"
              style={{ color: isActive ? "var(--bsd-lime)" : "var(--bsd-text-3)" }}
            >
              <DemoIcon name={NAV_ICONS[item]} size={14} />
              {item}
            </span>
          );
        })}
      </nav>

      {/* `flex-1` on the search puts the streak and avatar hard right without a spacer. */}
      <div className="flex flex-1 items-center gap-[8px] rounded-full border border-[var(--bsd-line)] bg-[var(--bsd-surface)] px-[14px] py-[7px]">
        <DemoIcon name="search" size={13} color="var(--bsd-text-4)" />
        <span className="text-[11.5px] text-[var(--bsd-text-4)]">{demoChrome.search}</span>
      </div>

      <div className="flex items-center gap-[16px]">
        <span className="relative flex">
          <DemoIcon name="bell" size={16} color="var(--bsd-text-3)" />
          <span className="absolute -right-[1px] -top-[1px] h-[5px] w-[5px] rounded-full bg-[var(--bsd-lime)]" />
        </span>

        <span className="flex items-center gap-[5px] rounded-full border border-[var(--bsd-lime-line)] bg-[var(--bsd-lime-dim)] px-[10px] py-[4px]">
          <DemoIcon name="flame" size={12} color="var(--bsd-lime)" filled />
          <span className="text-[11.5px] font-semibold text-[var(--bsd-lime)]">
            {demoChrome.streak}
          </span>
        </span>

        <span className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-[var(--bsd-surface-3)] text-[10.5px] font-semibold text-white">
          {demoChrome.avatar}
        </span>
      </div>
    </header>
  );
}
