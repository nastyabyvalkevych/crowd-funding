import HeroSection from "@/components/sections/HeroSection";
import LandingPageProvider from "@/providers/LandingPageProvider";

export default function Home() {
  
  return (
    <LandingPageProvider>
      <div>
        <HeroSection />
      </div>
    </LandingPageProvider>
  );
}
