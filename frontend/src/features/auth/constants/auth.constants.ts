import type { CallbackField } from "../types/auth.types";

/**
 * Copy and configuration for the login screen.
 *
 * Kept out of JSX for the same reason as every other feature's constants file: copy
 * changes never touch a component, and this is the one file to swap when the strings
 * move to a CMS.
 */

/** Dial code the screen draws beside the input, so the field holds ten digits and no more. */
export const DIAL_CODE = "+91";

/** Boxes in the OTP card. The card lays itself out from this — there is no second place to change. */
export const OTP_LENGTH = 4;

/** Seconds before "Resend OTP" becomes pressable. */
export const RESEND_SECONDS = 60;

/**
 * The design spells the button "Send OPT" and the timer "Resend OPT in 58s", while
 * the card heading beside them reads "OTP Verification". Taken as the typo it is and
 * spelled correctly here — a login screen is the wrong place to ship a transposed
 * acronym, and the mock disagrees with itself about it anyway.
 */
export const loginCopy = {
  heading: "Step Into Your Future",
  phoneLabel: "Phone Number",
  phonePlaceholder: "Enter your phone number here",
  sendOtp: "Send OTP",
  sendingOtp: "Sending OTP…",
  /** Shown under the field when the ten digits are not a mobile number. */
  phoneError: "Enter a valid 10-digit mobile number.",
  sendError: "We couldn't send the code. Please try again.",
} as const;

export const otpCopy = {
  heading: "OTP Verification",
  /** Split so the number itself can be set in brand red, per the design. */
  sentToPrefix: "Enter the OTP sent to",
  /** Accessible name for the pencil that returns to the phone step. */
  editLabel: "Change phone number",
  /** `{seconds}` is replaced with the live count. */
  resendPending: "Resend OTP in {seconds}s",
  resend: "Resend OTP",
  resending: "Sending…",
  verifying: "Verifying…",
  /** The code was read and rejected — distinct from never having reached the server. */
  verifyError: "That code doesn't match. Check it and try again.",
  networkError: "We couldn't check that code. Please try again.",
  resendError: "We couldn't resend the code. Please try again.",
} as const;

export const callbackCopy = {
  heading: "Request a Callback",
  /** Top-right button on every step, and the only way into the callback form. */
  trigger: "Request Call",
  submit: "Book My Callback",
  submitting: "Booking…",
  submitError: "We couldn't book your callback. Please try again.",
  /** Shown against the individual field, so it is written per field, not per form. */
  requiredError: "This field is required.",
  emailError: "Enter a valid email address.",
} as const;

export const callbackSentCopy = {
  heading: "We'll call you back",
  body: "Your request is in. One of our counsellors will call you on the number you gave us.",
  action: "Done",
} as const;

export const backLabel = "Back";

/** The callback form, in the order the design lists it. */
export const callbackFields: readonly CallbackField[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your Name here",
    control: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email here",
    control: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number here",
    control: "tel",
    autoComplete: "tel-national",
    required: true,
  },
  {
    name: "query",
    label: "Query",
    placeholder: "Tell us how can we help you....",
    control: "textarea",
    autoComplete: "off",
    required: false,
  },
] as const;

/**
 * The consent line under the phone and OTP panels.
 *
 * `#terms` / `#privacy` match the placeholders the footer already uses — neither
 * route exists yet. Point these at the real pages when they land; nothing else
 * needs to change.
 */
export const legalNote = {
  lead: "By submitting this form, you agree to our",
  terms: { label: "Terms and Conditions", href: "#terms" },
  conjunction: "and",
  privacy: { label: "Privacy Policy", href: "#privacy" },
} as const;
