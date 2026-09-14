# Profile

The signed-in student's account, at **`/profile`**. Reached by verifying an OTP on
`/login`, and gated behind that session.

Four sections in a persistent left rail: **Personal Details**, **Academic Details**,
**Payment Details**, **Professional Information**.

## Public API

- `ProfileLayout` — header, rail, session gate. Used by `app/profile/layout.tsx`.
- `ProfileSectionView` — any of the three editable screens; takes a section id.
- `PaymentDetailsView` — the one read-only screen.
- `useProfile` — the saved record, for anything that needs to read it.

```tsx
import { ProfileLayout, ProfileSectionView } from "@/features/profile";
```

## Structure

```text
profile/
├── components/
│   ├── profile-layout.tsx        # Header + rail + session gate   ("use client")
│   ├── profile-sidebar.tsx       # Avatar, name, the four sections
│   ├── profile-shell.tsx         # Heading + Edit/Save/Cancel/Log Out
│   ├── profile-section-view.tsx  # Any editable screen, from config
│   ├── profile-card.tsx          # Icon badge + title + field grid
│   ├── profile-field.tsx         # Label + control, read-only and edit
│   ├── payment-details-view.tsx  # Overview tiles + history table
│   ├── status-pill.tsx
│   └── brand-icon.tsx            # LinkedIn / GitHub — not in lucide v1
├── constants/
│   ├── profile.constants.ts      # Every field on all three forms
│   └── payment.constants.ts      # FIXTURE payment data
├── hooks/
│   ├── use-profile.ts            # The saved record
│   └── use-profile-section.ts    # One section's edit / save / cancel
├── services/
│   ├── profile.service.ts        # localStorage read / write
│   └── profile.store.ts          # …as a store React can subscribe to
├── types/, utils/, index.ts, README.md
```

## Routes

```text
/profile                 Personal Details   (the landing spot after verification)
/profile/academic        Academic Details
/profile/payments        Payment Details    (read-only)
/profile/professional    Professional Information
```

Four routes rather than one screen with tabs: the back button works, a section can be
linked to, and a refresh leaves you where you were. The header and rail live in
`app/profile/layout.tsx`, which Next keeps mounted across all four — so switching
sections re-renders only the column, and the store is read once per visit.

The whole segment is `robots: noindex` from the layout, inherited by anything added
later.

## Decisions

**The three forms are one component.** They *are* the same screen — heading, edit
cycle, stack of cards of labelled text fields — and the only thing that differs is
which fields. That is data (`profileSections`), so a route is one line and a restyle
happens once instead of three times and being applied twice.

**Read-only uses `readOnly`, not `disabled`.** They look alike and behave nothing
alike: a disabled input is skipped by keyboard navigation, not announced by screen
readers, and its contents cannot be selected or copied. Since these screens spend most
of their life read-only, `disabled` would make a profile that is unreadable without a
mouse and from which a student could not copy their own enrollment number.

**The same control renders in both states**, so entering edit mode changes the
affordance — grey and borderless becomes white and outlined — without moving the layout
by a pixel.

**Editing is per section, and Payment Details has none.** Those figures are the finance
system's record of what was billed and received; an edit button there invites a student
to correct their own balance. `ProfileShell` takes the edit cycle as an optional prop,
so omitting it is what removes the button — the two cannot disagree.

**Log Out is hidden while editing.** It sits exactly where Cancel goes, and someone
reaching for Cancel with unsaved changes should not be able to hit sign-out instead.

**The draft is `null` when not editing**, rather than a standing copy of the saved
values. That makes Cancel free — there is nothing to roll back, only a draft to discard
— and makes "am I editing?" and "what am I editing?" the same fact, so a cancelled edit
cannot reappear the next time the section is opened.

**A save that fails keeps the draft.** The student's typing is the only copy of those
values; clearing the form because a write failed would throw it away.

**`useSyncExternalStore`, not an effect.** `localStorage` is genuinely external state:
it exists before React mounts, other tabs mutate it, and it is absent during the server
render. Reading it in an effect and calling `setState` renders once with the wrong
answer and again with the right one — a cascading render, and the usual way a hydration
mismatch is introduced. A module-level store also means the rail and the form share one
copy with no provider, so saving a name updates the avatar in the same commit.

## Data, and what is not real

**Everything saved lives in one browser.** `profile.service.ts` reads and writes
`localStorage`; nothing reaches a server, so a student signing in on their phone finds
an empty form. That is the accepted shape of this build, and the reason every access
goes through that one module — replacing it with `GET`/`PATCH /profile` is a change to
three functions, and the store, the hooks and all four screens are untouched.

**The payment screen is fixture data.** The figures in `payment.constants.ts` are the
design's, not a ledger. Invoice downloads have nowhere to fetch a PDF from; the control
renders and says so when pressed, rather than silently doing nothing — which is the
version that gets reported as a bug.

**The session is a `localStorage` flag, not a security boundary** — see
`features/auth/README.md`. The gate in `ProfileLayout` decides what is *shown*, not
what is served.

## Departures from the mocks

1. **The Professional rail hint** is "Work & education details" on three of the four
   screens and "Work, skills & links" on the fourth. Took the fourth: the card under it
   holds work and links and no education, which has its own section directly above.
2. **"Links & Resume"** promises an upload the mock never shows, so the card is
   **"Links"**. A resume upload needs somewhere to put the file, which is a backend
   decision rather than a layout one.
3. **"Experience"** was the only label in sixteen with no icon — read as an omission,
   since one bare label in a grid reads as a rendering fault. It has one.
4. **The Professional subtitle** was "Your Education & Professional Journey" — title
   case where its three siblings are sentence case, and naming education on the one
   screen that holds none. Rewritten to match its content and its siblings.
5. **The avatar is initials, not a photograph.** There is no avatar upload and no
   stored image; a stock headshot would be a portrait of someone else.
6. **The header carries the brand mark alone.** The design pairs it with a red "upGrad"
   wordmark, and that lockup is not in this repo — see `assets.logoMark` for the
   one-line swap when it lands.

## Accessibility

- Every field's label is a real `<label>` bound by `htmlFor`; read-only fields stay
  focusable, announced and selectable.
- The rail marks the open section with `aria-current="page"`, so its state reaches a
  screen reader rather than living only in the red fill.
- The payment overview is a `<dl>`, so "Amount Due" and "₹50,000" are announced as a
  pair; the history is a real `<table>` with `scope="col"` headers.
- Status pills always carry their own text — red and green at that size are exactly the
  pair around one man in twelve cannot distinguish, so colour is never the only signal.
- Save reports `aria-busy`; a failed save is a `role="alert"` above the cards.
- The account menu sets `aria-expanded` / `aria-haspopup`, and closes on Escape, on an
  outside press, and on choosing an item.
- The payment table scrolls inside its own container, so five columns on a phone never
  make the whole page scroll sideways.
