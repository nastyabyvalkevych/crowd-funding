import HeroSection from "@/components/sections/HeroSection";
import LandingPageProvider from "@/providers/LandingPageProvider";

export default function Home() {
  return (
    <LandingPageProvider>
      <div>
        <HeroSection />
        {/* <div className="px-4 md:px-16 flex flex-col gap-16 md:gap-32 mt-16 md:mt-32">
          <AboutUsSection />
          <ServicesSection />
          <PortfolioSection />
          <TestimonialSection />
          <CollaborationSection />
        </div> */}
      </div>
    </LandingPageProvider>
  );
}
