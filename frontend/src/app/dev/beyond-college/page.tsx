import { BeyondCollegeSection } from "@/features/beyond-college";

/**
 * Temporary isolation harness for the Beyond College section — no ScrollSmoother and
 * no pinned hero above it, so the panels can be inspected directly. Not linked from
 * anywhere. Mirrors `dev/curriculum`.
 */
export default function BeyondCollegeDevPage() {
  return (
    <main>
      <BeyondCollegeSection />
    </main>
  );
}
