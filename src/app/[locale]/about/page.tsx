"use client";

import AboutUsSection from "@/components/sections/AboutUsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialSection from "@/components/sections/TestimonialSection";

export default function About() {
;
  return (
    <div>
      <div className="px-4 md:px-16 flex flex-col gap-16 md:gap-32 ">
        <AboutUsSection />
        <PortfolioSection />
        <TestimonialSection />
      </div>
    </div>
  );
}
