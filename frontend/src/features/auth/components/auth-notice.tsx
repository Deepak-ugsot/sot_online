import { Check } from "lucide-react";

import { AuthPanel } from "./auth-panel";

type AuthNoticeProps = {
  heading: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
};

/**
 * The panel at the end of the callback flow: a tick, a line of reassurance, and the
 * one thing to do next.
 *
 * The OTP flow has no equivalent — a verified student goes straight to their profile,
 * which is what they logged in for. An interstitial saying the code worked, in front
 * of the screen that proves it worked, is a click that buys nothing.
 */
export function AuthNotice({
  heading,
  body,
  actionLabel,
  onAction,
}: AuthNoticeProps) {
  return (
    <AuthPanel heading={heading}>
      <div className="flex flex-col gap-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Check aria-hidden="true" className="h-6 w-6" strokeWidth={2.5} />
        </span>

        <p className="max-w-[26rem] font-display text-[15px] leading-[1.6] text-white/70">
          {body}
        </p>

        <button
          type="button"
          onClick={onAction}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-brand font-display text-[15px] font-semibold text-white transition-[background-color,transform] duration-300 ease-cinematic hover:bg-[#c9121a] hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {actionLabel}
        </button>
      </div>
    </AuthPanel>
  );
}
