import { CareerSection } from "@/features/career";

/**
 * Temporary isolation harness for the Career section — no ScrollSmoother and no
 * pinned hero above it, so the two columns can be inspected directly. Not linked
 * from anywhere. Mirrors `dev/curriculum`.
 */
export default function CareerDevPage() {
  return (
    <main>
      <CareerSection />
    </main>
  );
}
