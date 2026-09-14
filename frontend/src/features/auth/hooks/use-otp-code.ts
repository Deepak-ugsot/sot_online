"use client";

import { useEffect, useRef, useState } from "react";
import type { ClipboardEvent, KeyboardEvent } from "react";

type UseOtpCodeOptions = {
  /** Number of boxes. The code is complete at exactly this many digits. */
  length: number;
  /** Fired the moment the last digit lands — the card has no submit button of its own. */
  onComplete: (code: string) => void;
};

/**
 * The split OTP field: one `<input>` per digit, driven as a single value.
 *
 * **The code is held as one compact string, not an array of per-box values.** Box `i`
 * renders `code[i]`, so "how many digits have been entered" is just `code.length` and
 * cannot disagree with what is on screen. An array lets a reader click the last box
 * first and leave a hole in the middle — a state that looks complete to the eye and
 * is not, and that every guard then has to remember to check for.
 *
 * Focus moves with the value rather than being chased around by the component: every
 * edit funnels through one place that sets the code and puts the caret where the next
 * keystroke belongs.
 */
export function useOtpCode({ length, onComplete }: UseOtpCodeOptions) {
  const [code, setCode] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  /** Each box hands its element over so focus can be moved between them. */
  const registerInput = (index: number) => (element: HTMLInputElement | null) => {
    inputsRef.current[index] = element;
  };

  const focusBox = (index: number) => {
    const box = inputsRef.current[Math.min(Math.max(index, 0), length - 1)];
    box?.focus();
    // Selecting the digit already in the box is what makes typing over it replace
    // rather than append — see `handleChange`.
    box?.select();
  };

  /** The one funnel every edit goes through: set the code, move focus, report completion. */
  const commit = (next: string, caretAt: number) => {
    const digits = next.slice(0, length);
    setCode(digits);
    focusBox(caretAt);
    if (digits.length === length) onComplete(digits);
  };

  // The card exists to take a code, so the first box takes focus as it appears.
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, rawValue: string) => {
    const previous = code[index] ?? "";
    let typed = rawValue.replace(/\D/g, "");

    // A box that already holds a digit is selected on focus, so a keystroke normally
    // replaces it outright. Some browsers still report the old digit with the new one
    // appended — an autofill, or a caret the browser placed after the character
    // instead of over it. Dropping the leading repeat keeps a single keystroke a
    // single digit either way.
    if (typed.length > 1 && previous && typed.startsWith(previous)) {
      typed = typed.slice(previous.length);
    }

    // A non-digit keystroke: leave the code exactly as it was. The input is
    // controlled, so React puts the rejected character straight back out again.
    if (!typed) return;

    // Typing into a box past the end of the code appends instead of leaving a hole —
    // clicking the last box of an empty field fills the first. More than one digit
    // (a paste that landed inside a box) spreads rightwards from here.
    const start = Math.min(index, code.length);
    const next = code.slice(0, start) + typed + code.slice(start + typed.length);

    commit(next, start + typed.length);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      // Taken over from the browser: with the box's digit selected, the default would
      // clear it and stop, so an empty box would swallow the keystroke and the reader
      // would have to click their way backwards.
      event.preventDefault();

      // Delete this box's digit if it has one, otherwise step back and delete that.
      const target = code[index] ? index : index - 1;
      if (target < 0) return;

      commit(code.slice(0, target) + code.slice(target + 1), target);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusBox(index - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusBox(index + 1);
    }
  };

  /**
   * A pasted code always fills from the first box, whichever box received the paste —
   * an SMS copied from the notification is the whole code, never its tail.
   */
  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    event.preventDefault();
    const next = pasted.slice(0, length);
    commit(next, next.length);
  };

  /** Clears the field and returns to the first box — used after a rejected code. */
  const reset = () => {
    setCode("");
    focusBox(0);
  };

  return {
    code,
    registerInput,
    handleChange,
    handleKeyDown,
    handlePaste,
    reset,
  };
}
