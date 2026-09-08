import { CurriculumSection } from "@/features/curriculum";

import { GsapBridge } from "./gsap-bridge";

/**
 * Temporary isolation harness for the Curriculum section — no ScrollSmoother, so the
 * headers can be driven directly. Not linked from anywhere.
 */
export default function CurriculumDevPage() {
  return (
    <main>
      <GsapBridge />
      <CurriculumSection />
    </main>
  );
}
