import type { CallbackRequest } from "../types/auth.types";

/**
 * The three network calls the login screen makes.
 *
 * **These are stand-ins.** `backend/src/server.ts` is empty — there is no endpoint to
 * call yet — so each one waits a beat and resolves. They exist as a module rather than
 * as inline `setTimeout`s in the components so that wiring the real API is a change to
 * this file only: swap each body for its `fetch`, keep the signatures, and every
 * pending, error and success state in the UI already works against it.
 *
 * Every function rejects on failure rather than returning a flag, so the callers'
 * `try/catch` is the single error path whether the failure is a network one or a
 * refusal from the server.
 */

/** Long enough for the pending states to be visible, short enough not to feel broken. */
const STUB_LATENCY_MS = 700;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Sends a one-time code to `phone` (ten national digits, no dial code).
 *
 * Real call: `POST /auth/otp` with `{ phone }`. Reject on a non-2xx response.
 */
export async function requestOtp(phone: string): Promise<void> {
  await delay(STUB_LATENCY_MS);
  void phone;
}

/**
 * Checks `code` against the one sent to `phone`. Resolves `true` when it matches.
 *
 * Real call: `POST /auth/otp/verify` with `{ phone, code }`.
 *
 * **While this is a stub, every code is accepted except `0000`.** Without that one
 * rejected value the card's error state would be unreachable in development and would
 * ship untested — this is the cheapest way to keep it honest, and it goes away with
 * the first line of the real implementation.
 */
export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  await delay(STUB_LATENCY_MS);
  void phone;
  return code !== "0000";
}

/**
 * Books a callback.
 *
 * Real call: `POST /leads/callback` with the payload as-is. Reject on a non-2xx
 * response.
 */
export async function submitCallbackRequest(
  request: CallbackRequest,
): Promise<void> {
  await delay(STUB_LATENCY_MS);
  void request;
}
