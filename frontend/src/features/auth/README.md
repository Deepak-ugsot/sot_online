# Auth

Phone-number login, at **`/login`**. Reached from the header's "Apply Now".

Three panels on one route: enter a mobile number, confirm the four-digit code sent to
it, or step sideways into "Request a Callback" for someone who would rather talk to a
person. Behind them, full-bleed, sits the design's artwork: a student on a lit
plinth.

## Public API

- `LoginScreen` — the whole screen. The only export the login route should use.
- `useSession` — the signed-in student, or `null`, or "not known yet".
- `useRequireSession` — the same, plus a redirect to `/login` when there is none.
- `useSignOut` — ends the session and returns to `/login`.
- `CallbackField`, `CallbackFieldName`, `CallbackRequest`, `LoginStep`,
  `RequestStatus`, `Session`, `SessionStatus` — shared types.

```tsx
import { LoginScreen } from "@/features/auth";
```

The route renders it alone — no `SiteHeader`, no `SiteFooter`. The screen draws its
own chrome (`LoginTopBar`), because dropping a reader who came here to log in back
into the landing page's navigation invites them straight out again.

## Structure

```text
auth/
├── components/
│   ├── login-screen.tsx       # Step machine + layout           ("use client")
│   ├── login-stage.tsx        # Full-bleed artwork + mobile scrim
│   ├── login-top-bar.tsx      # Logo + "Request Call"
│   ├── auth-panel.tsx         # Back / heading / content / footer shell
│   ├── auth-field.tsx         # Label + control + error, for both forms
│   ├── auth-submit.tsx        # The red submit button
│   ├── legal-note.tsx         # Consent line
│   ├── phone-step.tsx         # Step one
│   ├── otp-step.tsx           # Step two
│   ├── callback-step.tsx      # "Request a Callback"
│   └── auth-notice.tsx        # Both success panels
├── constants/
│   └── auth.constants.ts      # All copy, the OTP length, the resend window
├── hooks/
│   ├── use-otp-code.ts        # Four inputs driven as one value
│   ├── use-resend-countdown.ts
│   └── use-session.ts         # useSession / useRequireSession / useSignOut
├── services/
│   ├── auth.service.ts        # The three network calls — STUBS, see below
│   ├── session.service.ts     # Who is signed in — localStorage, NOT a security boundary
│   └── session.store.ts       # …as a store React can subscribe to
├── types/
│   └── auth.types.ts
├── utils/
│   ├── phone.utils.ts
│   └── email.utils.ts
├── index.ts
└── README.md
```

## The step machine

```text
phone ──send──▶ otp ──verify──▶ session started ──▶ /profile
  │              │
  └──────────────┴──"Request Call"──▶ callback ──send──▶ callback-sent ──▶ back to
                                                                          whichever
                                                                          step opened it
```

**One route, not four.** The steps are seconds apart and share a heading, so a URL per
step would animate the whole page out and back in between them — and would leave
`/login/otp` addressable with no code in flight and no number to send one to.

`LoginScreen` holds three things: the step, the phone number, and when the last code
was sent. The number is there because the OTP card reads it back, the callback form
pre-fills from it, and stepping back has to find it still typed in. The send time is
there because the OTP card unmounts whenever the callback form opens — owned locally,
the countdown would restart on the way back and hold a reader for a second minute over
a code already sent. Everything else — the code being typed, pending states, errors —
belongs to the step that owns that request and is right to unmount with it.

## Decisions

**A verified code goes straight to `/profile`.** There is no "you are verified" panel:
the profile is what the student logged in for, and it demonstrates the code worked
better than a screen saying so. Verification starts the session and `replace`s the
route, so Back leaves the site rather than landing on a form whose code has been spent.

**The session is a `localStorage` flag, and is not a security boundary.** It is
readable and writable by any script on the origin, never reaches a server, and is
verified by nothing — anyone can grant themselves one from the console. That is
acceptable *only* because nothing behind the gate is private: the profile screens read
and write the same browser's `localStorage`. The real thing is an httpOnly, `Secure`,
`SameSite=Lax` cookie set on verification and checked in middleware, so a signed-out
request never reaches the page. When that lands, `session.service.ts` is the file that
changes.

`useSession` has **three** states, not two. `loading` is the honest answer for the one
render where storage has not been read yet; a guard that collapsed it into "signed out"
would bounce every signed-in student back to the login screen on every refresh.

**No backend yet.** `backend/src/server.ts` is empty, so `services/auth.service.ts`
holds three stubs that wait a beat and resolve. Swap each body for its `fetch`, keep
the signatures, and every pending, error and success state already works against it.
While it is a stub, `verifyOtp` accepts any code **except `0000`** — without one
rejected value the card's error state would be unreachable in development and would
ship untested.

**The OTP card has no submit button.** Four boxes are visibly full at a glance, so a
button underneath asks the reader to confirm something they can already see is done.
Verification fires as the last digit lands.

**A rejected code is not cleared.** Wiping four boxes to punish one mistyped digit
makes the reader re-enter the three they got right. Editing any digit re-fires
verification on its own.

**The code is one string, not four values.** Box `i` renders `code[i]`, so "how many
digits are entered" is `code.length` and cannot disagree with what is on screen. A
per-box array lets a reader fill the last box first and leave a hole in the middle — a
state that looks complete and is not.

**No `maxLength` on the OTP boxes or the phone field.** Both caps look harmless and
both destroy data. Android autofill drops a whole SMS code into the first OTP box, and
a cap of 1 keeps the first digit and bins the rest. On the phone field a cap of ten
stops the eleventh digit ever reaching `toPhoneDigits`, which is exactly the keystroke
at which a number typed with its country code corrects itself — with the cap on,
`+919347436818` sticks at `9193474368`, which is a valid-*looking* ten-digit number
starting with a 9, belonging to nobody. Both values are controlled, so nothing
over-fills without the cap.

**Neither submit button is ever disabled for an incomplete form.** A greyed-out button
with no explanation is the most common way a form dead-ends: the reader cannot tell
which field is holding it back, and a screen reader skips the control entirely. Both
forms stay pressable and answer on submit with a message against the field that is
wrong. Only a request already in flight disables them.

**The backdrop is full-bleed, not a left-hand column.** `public/assets/login/stage.png`
(1440×911, registered as `assets.loginStage`) is composed for the whole viewport: the
student stands a quarter of the way in and the rest of the frame is deliberately
empty, unlit room, which is the space the form sits in. Cropping it to a half and
putting the panel beside it would throw away that composition and leave the form on a
flat colour instead of in the same room.

`object-cover` is anchored at **28% across**, not centred. A desktop viewport is close
enough to the artwork's 1.58:1 that almost all of it shows; a portrait phone is not —
`cover` there scales to the height and drops roughly two thirds of the width, and a
centred crop keeps the empty half of the room and cuts the student out of frame
entirely. 28% is where he stands.

The room wash underneath is not redundant: it paints for the frame or two before a
1440×911 render decodes, and it is matched to the artwork's own darkness, so the page
opens dark and settles rather than flashing a flat panel and swapping.

**The mobile scrim is graded, not flat.** Under `lg` the panel sits *on* the artwork —
the crop that keeps the student in frame is the same crop that puts him behind the
heading. The scrim is heaviest across the middle third, where the form is, and lifts
at both ends so the beam and the plinth still read; a flat wash dark enough for the
copy flattens the whole render to a texture. Above `lg` it is dropped entirely, since
the render's right-hand side already carries white type.

**"Send OTP", not "Send OPT".** The design spells the button and the timer "OPT" while
the card heading beside them reads "OTP". Taken as the typo it is.

## Accessibility

- Each OTP box carries `aria-label="Digit n of 4"`; the row is a `role="group"`.
  Backspace steps back through filled boxes, arrow keys move between them, and a paste
  anywhere in the row fills from the first box — an SMS copied from a notification is
  the whole code, never its tail.
- The card's status line is a permanently rendered `role="status"`. A live region
  added to the page at the same moment it gets its text is frequently missed; it has
  to be there beforehand for the change to be announced.
- Field errors are `role="alert"`, wired by `aria-describedby`, and set
  `aria-invalid` — the reader has usually left the field by the time one appears.
- Submit buttons set `aria-busy` while a request is in flight; the label change alone
  says nothing to a screen reader.
- The resend control is plain text until the window opens, not a disabled button: a
  dead control in the tab order is worse than a sentence.
- The whole stage is `aria-hidden` and out of the tab order.
- Every interactive element has a visible `focus-visible` ring in brand red.

## Outside this feature

Two files elsewhere changed for this:

- `features/header/constants/header.constants.ts` — the CTA's `href` is now `/login`.
  The page's other CTAs still point at `#apply`, which matches no element and does
  nothing; pointing them here is a one-line change each.
- `components/ui/cta-button.tsx` — a `/`-prefixed `href` now renders through
  `next/link`. An in-page `#hash` is untouched, so the landing page's CTAs behave
  exactly as before.
