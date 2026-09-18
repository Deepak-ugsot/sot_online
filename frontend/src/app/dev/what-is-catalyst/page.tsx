import { WhatIsCatalystSection } from "@/features/what-is-catalyst";

/**
 * Temporary isolation harness for the "What is uGSOT Catalyst?" section — no
 * ScrollSmoother and no pinned hero above it, so the card fan and the logo rail can be
 * inspected directly. Not linked from anywhere. Mirrors `dev/beyond-college`.
 */
export default function WhatIsCatalystDevPage() {
  return (
    <main>
      <WhatIsCatalystSection />
    </main>
  );
}
