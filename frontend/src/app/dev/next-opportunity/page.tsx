import { NextOpportunitySection } from "@/features/next-opportunity";

/**
 * Temporary isolation harness for the Next Opportunity section — no ScrollSmoother and
 * no sections above it, so the two columns can be inspected directly. Not linked from
 * anywhere. Mirrors `dev/beyond-college`.
 */
export default function NextOpportunityDevPage() {
  return (
    <main>
      <NextOpportunitySection />
    </main>
  );
}
