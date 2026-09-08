import { GlobalAmbitionSection } from "@/features/global-ambition";

/**
 * Temporary isolation harness for the Global Ambition section — no ScrollSmoother and
 * no pinned hero above it, so the grid can be inspected directly. Not linked from
 * anywhere. Mirrors `dev/curriculum`.
 */
export default function GlobalAmbitionDevPage() {
  return (
    <main>
      <GlobalAmbitionSection />
    </main>
  );
}
