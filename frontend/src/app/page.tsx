import { SmoothScroll } from "@/components/smooth-scroll";
import { AiMentorSection } from "@/features/ai-mentor";
import { ApproachSection } from "@/features/approach";
import { BeyondCollegeSection } from "@/features/beyond-college";
import { BuildspaceSection } from "@/features/buildspace";
import { CareerSection } from "@/features/career";
import { CareerOsSection } from "@/features/career-os";
import { CurriculumSection } from "@/features/curriculum";
import { DashboardSection } from "@/features/dashboard";
import { EcosystemSection } from "@/features/ecosystem";
import { FaqSection } from "@/features/faq";
import { SiteFooter } from "@/features/footer";
import { GallerySection } from "@/features/gallery";
import { GlobalAmbitionSection } from "@/features/global-ambition";
import { SiteHeader } from "@/features/header";
import { HeroSection } from "@/features/hero";
import { JourneySection } from "@/features/journey";
import { MentorsSection } from "@/features/mentors";
import { NotAnotherCourseSection } from "@/features/not-another-course";
import { OpportunitiesSection } from "@/features/opportunities";
import { ReadinessSection } from "@/features/readiness";
import { ShowcaseSection } from "@/features/showcase";

/**
 * Landing page.
 *
 * Kept deliberately thin — it composes feature sections and nothing else. Each new
 * section of the page lands here as one more feature import.
 *
 * `SiteHeader` sits *outside* `SmoothScroll` on purpose: the smoother drives its
 * content with a `transform`, and a transformed ancestor would make the header's
 * `position: fixed` resolve against that content instead of the viewport — the header
 * would scroll away with the page.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <SmoothScroll>
        <main>
          <HeroSection />
          <BeyondCollegeSection />
          <GlobalAmbitionSection />
          <CareerSection />
          <ApproachSection />
          <GallerySection />
          <ShowcaseSection />
          <BuildspaceSection />
          <MentorsSection />
          <EcosystemSection />
          <NotAnotherCourseSection />
          <AiMentorSection />
          <CareerOsSection />
          <ReadinessSection />
          <DashboardSection />
          <OpportunitiesSection />
          <JourneySection />
          <FaqSection />
          <CurriculumSection />
        </main>

        <SiteFooter />
      </SmoothScroll>
    </>
  );
}
