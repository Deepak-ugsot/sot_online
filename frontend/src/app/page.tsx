import { AnchorScroll } from "@/components/anchor-scroll";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AiMentorSection } from "@/features/ai-mentor";
import { ApproachSection } from "@/features/approach";
import { BeyondCollegeSection } from "@/features/beyond-college";
import { BuildspaceSection } from "@/features/buildspace";
import { BuiltForStudentsSection } from "@/features/built-for-students";
import { CareerSection } from "@/features/career";
import { CareerOsSection } from "@/features/career-os";
import { CompeteSection } from "@/features/compete";
import { CurriculumSection } from "@/features/curriculum";
import { EarlyStartSection } from "@/features/early-start";
import { EcosystemSection } from "@/features/ecosystem";
import { FacultySection } from "@/features/faculty";
import { FaqSection } from "@/features/faq";
import { SiteFooter } from "@/features/footer";
import { GallerySection } from "@/features/gallery";
import { GlobalAmbitionSection } from "@/features/global-ambition";
import { HackathonsSection } from "@/features/hackathons";
import { SiteHeader } from "@/features/header";
import { HeroSection } from "@/features/hero";
import { LeadersSection } from "@/features/leaders";
import { LearnFromPeopleSection } from "@/features/learn-from-people";
import { LearningRoutineSection } from "@/features/learning-routine";
import { NextOpportunitySection } from "@/features/next-opportunity";
import { NotAnotherCourseSection } from "@/features/not-another-course";
import { OneJourneySection } from "@/features/one-journey";
import { OneProgramSection } from "@/features/one-program";
import { OpportunitiesSection } from "@/features/opportunities";
import { PortfolioSection } from "@/features/portfolio";
import { ReadinessSection } from "@/features/readiness";
import { RealWorldSection } from "@/features/real-world";
import { TechScoreSection } from "@/features/tech-score";
import { WhatIsCatalystSection } from "@/features/what-is-catalyst";

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
 *
 * `AnchorScroll` renders nothing. It is here because the smoother breaks the browser's
 * own `#hash` jumps, and this is the one page whose navigation is built out of them.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <AnchorScroll />

      <SmoothScroll>
        <main>
          <HeroSection />
          <WhatIsCatalystSection />
          <BeyondCollegeSection />
          <GlobalAmbitionSection />
          <CareerSection />
          <ApproachSection />
          <OneJourneySection />
          <GallerySection />
          <CompeteSection />
          <AiMentorSection />
          <ReadinessSection />
          <BuildspaceSection />
          <NotAnotherCourseSection />
          <NextOpportunitySection />
          <HackathonsSection />
          <CurriculumSection />
          <LearningRoutineSection />
          <LearnFromPeopleSection />
          <PortfolioSection />
          <EarlyStartSection />
          <RealWorldSection />
          <OpportunitiesSection />
          <CareerOsSection />
          <LeadersSection />
          <FacultySection />
          <TechScoreSection />
          <EcosystemSection />
          <OneProgramSection />
          <BuiltForStudentsSection />
          <FaqSection />
        </main>

        <SiteFooter />
      </SmoothScroll>
    </>
  );
}
