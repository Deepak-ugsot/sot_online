# Faculty

"Taught by World's Top Tech and Academic Minds" — the people who teach, as a row of
white cards drifting leftward under the heading.

## Public API

- `FacultySection` — the whole section. The only export routes should use.
- `FacultyMember`, `FacultyCompany`, `FacultyHeadingCopy` — shared types.

```tsx
import { FacultySection } from "@/features/faculty";
```

Rendered on the landing page directly below `LeadersSection` and above
`TechScoreSection`, and in isolation at `/dev/faculty`.

## Structure

```text
faculty/
├── components/
│   ├── faculty-section.tsx   # Heading, subtitle, the rail  ("use client")
│   ├── faculty-marquee.tsx   # The drifting row — pure CSS (server)
│   └── faculty-card.tsx      # One card (server)
├── constants/
│   └── faculty.constants.ts  # Copy, companies, the roster, timing, selectors
├── hooks/
│   └── use-faculty-reveal.ts
├── types/
│   └── faculty.types.ts
├── index.ts                  # Public API
└── README.md
```

## The roster

Eight faculty, in the design's order, written out in `facultyMembers`: Vishwa Mohan,
Gaurav Kaushik, Gladden Rumao, Mithun S, Jyoti Nigam, Rahul Yadav, Piyush Jain and
Rishab Bafna — each with their own role and the companies they have worked at, one mark
to six. Portraits are in `public/assets/faculty/`, one per person and named for them;
each is a square cut-out with its red backdrop drawn in, framed the same way. Four are
1092/1072px exports; the other four (Gaurav, Rahul, Piyush, Rishab) are 273px — under 1×
at the card's 284px on a high-density screen, so larger exports of those would sharpen
them (only the file and its `size` in the constants change).

Rishab's "lead Instructor" in the design is capitalised to match the other two lead
instructors.

## The row drifts rather than scrolls

It is a CSS marquee, the same trick as the employer marquee, the real-world ribbons and
the One Program rails: identical tracks side by side, each translated a full `-100%` of
its own width, so when one has slid exactly off the left its neighbour is standing where
it began. What keeps it honest:

- **Two copies.** The loop only closes while `(copies − 1) × trackWidth` covers the
  window. Eight cards measure ~2,850px against a window of at most 1,296px, so two copies
  cover it with room to spare. If the roster ever drops to three people or fewer, the
  track falls under the window and `TRACK_COPIES` needs to be three.
- **The spacing is each card's own right padding, not a `gap`**, so the last card of one
  copy and the first of the next are spaced like any other pair.
- **Only the first copy is content.** The duplicates are `aria-hidden` and their logos
  drop their `alt`, or a screen reader hears the faculty three times over.
- **The edges are a mask**, not a gradient laid over the cards, so they fade into
  whatever the ground is and nothing on top intercepts the hover.
- **It pauses under the pointer** (`group-hover`, which Tailwind gates behind
  `(hover: hover)`, so a tap never leaves it stuck).

One pass takes `FACULTY_MARQUEE_SECONDS` (80s), about 35px a second at desktop width.

**It always opens on Vishwa Mohan.** The animation runs from page load, so a reader would
otherwise arrive at whatever card the loop had drifted to. `useFacultyReveal` winds every
track's clock back to zero as the row first fades in, and again each time it scrolls back
into view from either direction — at the viewport's edge, so the jump is off-screen. It
*seeks* (`currentTime = 0`) rather than calling `play()` / `pause()`: either call pins a
CSS animation's play state for good, and the row would stop pausing under the pointer.
Verified in the browser: arriving from above and from below both restart it, and hover
still pauses it afterwards.

The entrance tween animates the rail's **wrapper**, never the tracks: their `transform`
belongs to the CSS animation, and a tween on the same property would fight it.

### Under reduced motion it becomes a scroller

A stopped marquee is a row clipped mid-card at both ends with most of the faculty out of
reach. So the duplicates and the mask drop out and the window scrolls on its own axis
with snap points — same cards, every one reachable, nothing moving by itself.

## Logos

Each mark comes from the sharpest copy in the repo:

- `public/companyLogo/` — the 177px masters for LinkedIn, Walmart, PayPal, Oracle,
  Salesforce, Microsoft and Cisco. They are the same marks the design shipped as 23px
  exports, which are exactly 1× at the card's size and soft on any high-density screen.
- The upGrad School of Technology lockup — next-opportunity's 49px export, twice the
  resolution of the design's.
- `public/assets/faculty/logos/` — PhysicsWallah, Barclays and iNeuron, which exist only
  as the design's own files.

Every mark's ink fills 82–100% of its file's height, so the card sets one height
(`--logo-h`) and each width follows. The one exception is the upGrad lockup: its subline
takes a third of its height, so at the shared height its wordmark reads a size under its
neighbours'. It carries `scale: 1.25` — the most it can take while Vishwa Mohan's six
marks still break three and three, as the design sets them.

They sit in a wrapping row pinned to the card's foot. Roles run one or two lines and the
lists run one mark to six, so every card fills its item (a flex row stretches items to the
tallest) and `mt-auto` puts the logos on a shared line across the row. The list is
labelled "Has worked at" for assistive tech.

Filenames are passed through verbatim — their capitalisation is load-bearing on the
Linux deploy target.

## Measurements

At 1440 the card is 332×440 against the design's ~331×441: a 284px portrait flush with
the card's top (the file's own transparent headroom is the design's top margin), 20px
side padding, logos at 23px tall. Below `sm` it steps down to 280px wide with 20px logos
so a phone shows one card and the edge of the next.
