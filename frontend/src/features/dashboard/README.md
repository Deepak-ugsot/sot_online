# Dashboard

"Your Career Dashboard" — a centred heading, two rows of ticked capabilities, and the
product screenshot beneath.

## Public API

- `DashboardSection` — the whole section. The only export routes should use.
- `DashboardChecklistRow` — shared type.

```tsx
import { DashboardSection } from "@/features/dashboard";
```

## Structure

```text
dashboard/
├── components/
│   ├── dashboard-section.tsx    # Heading, checklist, media  ("use client")
│   └── dashboard-checklist.tsx  # The two ticked rows (server)
├── constants/
│   └── dashboard.constants.ts   # Copy, rows, media, selector map
├── hooks/
│   └── use-dashboard-reveal.ts
├── types/
│   └── dashboard.types.ts
├── index.ts                     # Public API
└── README.md
```

## The checklist rows are grouped on purpose

Four short labels on the first row, three long ones on the second. That split is
chosen so both lines come out close in width and centre evenly against each other —
flattening them into one wrapping list would let the browser break wherever it liked
and lose the balance.

**The column gap is fluid, not the reference's flat 70px.** At 70px the first row
needs 998px against the 946px available and drops "Upcoming Classes" onto a line of
its own: the fallback face sets wider than Neue Montreal, and the container is capped
at 994px so it cannot absorb the difference. `clamp(1.5rem, 4vw, 3rem)` keeps the rows
airy while guaranteeing they hold one line each — verified at 1440px.

Labels are `nowrap` so a phrase never breaks mid-way, released below `700px` where
"Hackathons & Internship Applications" genuinely cannot fit on one line.

## The reveal

Three beats, each `once: true`:

| Target          | Trigger        | Motion                                | Timing                          |
| --------------- | -------------- | ------------------------------------- | ------------------------------- |
| Heading         | the section    | fade + `y: 55 → 0`                    | 0.9s `power3.out`               |
| Checklist items | the checklist  | fade + `y: 30 → 0`                    | 0.6s `power2.out`, 0.06 stagger |
| Media panel     | the panel      | fade + `y: 70 → 0`, `scale: 0.88 → 1` | 1s `power3.out`                 |

Checklist items are staggered **per item, not per row**, so the cascade reads
continuously left-to-right across the whole block rather than restarting on the second
line.

The media triggers off itself: it sits well below the heading, so the section top
clears the trigger line long before the panel is visible.

## Image

**TEMPORARY** — a seeded placeholder standing in for the Career OS dashboard
screenshot the design calls for.

The panel's `aspect-ratio` is `2048 / 1107` — the reference screenshot's own ratio
(≈1.85:1), measured from the live design rather than guessed. An initial 16:10 guess
ran the section ~160px taller than it should be. Reserving the box also stops the page
jumping as the image arrives, and gives the reveal a real element to animate.

`alt=""` while it is a stand-in: a random photo depicts nothing the alt text could
honestly describe, and the checklist above already lists what the real dashboard
shows. **The real screenshot needs real alt text.**

## Verified

At 1440×900 the section measures **1040px** against the reference's 1006px, with an
inner width of exactly **994px** matching the reference, both checklist rows on a
single line (4 + 3), seven check icons, and the media at 908×491 on a 1.850 ratio —
identical to the reference. No page-level horizontal overflow.
