# Brochure

The holding page at **`/brochure`**, where the hero's "Download Brochure" CTA lands.

There is no brochure PDF yet. The CTA used to scroll to the curriculum section
instead, which is a download control that silently does something else — read as a
broken link rather than as a gap. This route says the thing out loud: *the uGSOT
Catalyst brochure will be available soon.*

**It is a holding page, not an error page.** The reader asked for a file and is
getting a date, so the sentence that says so is the plainest thing on the screen and
sits directly under the headline. Everything else — the stack of sheets, the glow,
the contents list — exists to make the wait look like a document in progress.

## Public API

- `BrochureScreen` — the whole screen. The only export the route should use.

```tsx
import { BrochureScreen } from "@/features/brochure";
```

The route renders it alone — no `SiteHeader`, no `SiteFooter`. The landing page's
navigation is in-page anchors that scroll to nothing from here, so the screen draws
its own chrome (`BrochureTopBar`), exactly as `/login` does.

## Structure

```text
brochure/
├── components/
│   ├── brochure-screen.tsx    the section: backdrop, copy column, artwork column
│   ├── brochure-cover.tsx     the mock sheet stack
│   └── brochure-top-bar.tsx   logo home + "Back to site"
├── constants/brochure.constants.ts   every string on the page
├── types/brochure.types.ts
└── index.ts
```

## Notes

**Dark, like `/login` and the hero.** This route is one click off the hero's footage;
a white page there reads as a different site.

**Server-rendered.** Nothing is interactive beyond two links and the animation is
CSS, so none of it ships to the client.

**The cover is a cover, never a page.** A holding page that draws readable body copy
is showing the reader the document it just said does not exist. The one thing the
sheet does carry — the contents list — is the real section names; inventing chapter
titles for an unwritten document is the only thing here that could genuinely mislead.
It is `aria-hidden`, because the column beside it already says all of this in words.

**Three classes live in `globals.css`, not here**: `animate-brochure-float`,
`.brochure-sheen` and `.brochure-grid` all need `@keyframes` or a repeating
background, which a utility class cannot express. The float keyframes carry the
sheet's tilt too — a `rotate-*` utility and a `translate` keyframe both write
`transform`, so the animation would win and the tilt would disappear.

## When the PDF lands

1. Point `heroCtas[1].href` in `features/hero/constants` at the file.
2. Delete this feature and `app/brochure/`.

Nothing else references either.
