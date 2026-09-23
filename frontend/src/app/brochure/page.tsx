import type { Metadata } from "next";

import { BrochureScreen } from "@/features/brochure";

export const metadata: Metadata = {
  title: "Brochure",
  description:
    "The uGSOT Catalyst programme brochure will be available to download soon.",
  /*
    A holding page has nothing to offer a search engine, and it is the last thing that
    should rank for "uGSOT Catalyst brochure" — someone arriving on it from a search
    result gets the one page on the site that cannot answer them. `follow` stays on so
    the links out of it still pass through to the pages that can.

    Drop this when the PDF lands and the page becomes a real download.
  */
  robots: { index: false, follow: true },
};

/**
 * `/brochure` — where the hero's "Download Brochure" CTA lands.
 *
 * Thin by design, like every other route here: `BrochureScreen` owns the whole
 * screen, including its own header. There is no `SiteHeader` or `SiteFooter` — the
 * landing page's navigation is in-page anchors that scroll to nothing from here.
 */
export default function BrochurePage() {
  return (
    <main>
      <BrochureScreen />
    </main>
  );
}
