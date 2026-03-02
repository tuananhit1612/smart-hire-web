import { HeroSection, FeaturesSection, HowItWorksSection, TestimonialsSection, StatsSection } from "@/features/landing/components/home-page-sections";
import { HighlightFeaturesSection } from "@/features/landing/components/highlight-features-section";
import { ResumeBuilderSection } from "@/features/landing/components/resume-builder-section";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen font-body overflow-x-hidden">
      {/* Single global animated background for the entire landing page */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <ParticleBackground showRings={true} />
      </div>

      <main className="flex flex-col items-center w-full relative z-10">
        <HeroSection />
        <FeaturesSection />
        <HighlightFeaturesSection />
        <HowItWorksSection />
        <ResumeBuilderSection />
        <TestimonialsSection />
        <StatsSection />
      </main>
    </div>
  );
}
