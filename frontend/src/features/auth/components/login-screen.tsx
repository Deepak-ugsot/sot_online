"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { callbackSentCopy } from "../constants/auth.constants";
import { startSession } from "../services/session.store";
import type { LoginStep } from "../types/auth.types";
import { AuthNotice } from "./auth-notice";
import { CallbackStep } from "./callback-step";
import { LoginStage } from "./login-stage";
import { LoginTopBar } from "./login-top-bar";
import { OtpStep } from "./otp-step";
import { PhoneStep } from "./phone-step";

/**
 * The login screen: the stage artwork behind a panel that swaps between entering a
 * phone number, confirming the code sent to it, and requesting a callback instead.
 *
 * A verified code starts the session and hands straight over to `/profile` — there is
 * no "you are verified" step, because the profile is what the student came for and it
 * proves the code worked better than a panel saying so.
 *
 * **Everything happens on one route.** The steps are three or four seconds apart and
 * share a heading, so pushing a URL per step would animate the whole page out and
 * back in between them — and would leave `/login/otp` addressable with no code in
 * flight and no number to send one to. The screen owns the step instead.
 *
 * It holds three pieces of state: which panel is showing, the phone number, and when
 * the last code was sent. The number lives here rather than in `PhoneStep` because the
 * OTP card reads it back and the callback form pre-fills from it, and because stepping
 * back from either has to find it still typed in. The send time lives here because the
 * OTP card unmounts whenever the callback form is opened, and a countdown that restarts
 * on the way back would hold a reader for a second minute over a code already sent.
 *
 * Everything else — the code being typed, the pending states, the errors — belongs to
 * whichever step owns that request and is right to unmount with it.
 */
export function LoginScreen() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  /** `Date.now()` of the last code sent. Only read once the OTP card is showing. */
  const [otpSentAt, setOtpSentAt] = useState(0);

  /**
   * Where "Request Call" was pressed, so its Back goes there rather than to the
   * start. A reader glancing at the callback form midway through an OTP should not
   * lose the code they were typing.
   *
   * A ref, not state: nothing renders from it — it is read in a click handler — so
   * writing it should not cost a render.
   */
  const returnStep = useRef<LoginStep>("phone");

  const openCallback = () => {
    // Guarded, or pressing "Request Call" while already on the callback form would
    // record the form as the place to return to.
    if (step !== "callback" && step !== "callback-sent") {
      returnStep.current = step;
    }
    setStep("callback");
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-canvas">
      <LoginStage />

      <LoginTopBar onRequestCall={openCallback} />

      {/*
        Centred on a phone, where the panel sits over the dimmed stage; pushed to the
        right edge above `lg`, where the stage has the other half to itself. The
        padding matches the top bar's at every width, so the panel's right edge and the
        "Request Call" button's line up.

        `min-h-svh` with `items-center`: the panel is vertically centred on a tall
        screen and the page simply grows past the fold on a short one, rather than the
        OTP card being cut off by a fixed `h-svh`.
      */}
      <div className="relative z-10 flex min-h-svh items-center justify-center px-6 pt-28 pb-16 sm:px-8 lg:justify-end lg:px-14">
        <div className="w-full max-w-[27.5rem]">
          {step === "phone" && (
            <PhoneStep
              phone={phone}
              onPhoneChange={setPhone}
              onSent={() => {
                setOtpSentAt(Date.now());
                setStep("otp");
              }}
            />
          )}

          {step === "otp" && (
            <OtpStep
              phone={phone}
              sentAt={otpSentAt}
              onResent={() => setOtpSentAt(Date.now())}
              onEditPhone={() => setStep("phone")}
              onBack={() => setStep("phone")}
              onVerified={() => {
                startSession(phone);
                /*
                  `replace`, not `push`: the login screen is finished business, and a
                  Back press from the profile should leave the site rather than land on
                  a form whose code has already been spent.
                */
                router.replace("/profile");
              }}
            />
          )}

          {step === "callback" && (
            <CallbackStep
              defaultPhone={phone}
              onBack={() => setStep(returnStep.current)}
              onSent={() => setStep("callback-sent")}
            />
          )}

          {step === "callback-sent" && (
            <AuthNotice
              heading={callbackSentCopy.heading}
              body={callbackSentCopy.body}
              actionLabel={callbackSentCopy.action}
              onAction={() => setStep(returnStep.current)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
