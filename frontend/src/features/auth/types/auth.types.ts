/**
 * Which panel the login screen is showing.
 *
 * One flat union rather than nested state: every one of these replaces the whole
 * right-hand panel, and the callback form is reachable from the phone step *and*
 * the OTP step, so it is a sibling of both rather than a branch under either.
 */
export type LoginStep = "phone" | "otp" | "callback" | "callback-sent";

/** The fields the callback form collects, in the order the design lists them. */
export type CallbackFieldName = "name" | "email" | "phone" | "query";

/** One row of the callback form: its label, its placeholder, and the control to render. */
export type CallbackField = {
  name: CallbackFieldName;
  label: string;
  placeholder: string;
  /**
   * `textarea` renders the multi-line control; every other value is passed straight
   * through as an `<input type>`, so it doubles as the keyboard hint on mobile.
   */
  control: "text" | "email" | "tel" | "textarea";
  /** Browser autofill hint. `off` for the free-text query, which has nothing to fill. */
  autoComplete: string;
  required: boolean;
};

/** What the callback form sends. Keyed by field name so the form state maps 1:1. */
export type CallbackRequest = Record<CallbackFieldName, string>;

/** Where an async step is in its lifecycle. Drives the button label and the error line. */
export type RequestStatus = "idle" | "pending" | "error";

/**
 * A signed-in student.
 *
 * The phone number is the whole identity: it is what the OTP was sent to and the only
 * thing this flow establishes. A real session would carry a user id and a token
 * instead — see `services/session.service.ts` for where that swap happens.
 */
export type Session = {
  /** Ten national digits, exactly as `toPhoneDigits` normalises them. */
  phone: string;
  /** `Date.now()` at verification. */
  signedInAt: number;
};

/**
 * `loading` is a real state, not a placeholder: the session lives in `localStorage`,
 * which does not exist during the server render, so the first client render genuinely
 * does not know yet. A guard that treats that moment as "signed out" bounces every
 * signed-in student back to the login screen on every refresh.
 */
export type SessionStatus = "loading" | "authenticated" | "unauthenticated";
