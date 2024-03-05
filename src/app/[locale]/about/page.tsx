import AboutUsSection from "@/components/sections/AboutUsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import React from "react";

export default function About() {
  return (
    <div className="px-4 md:px-16 flex flex-col gap-16 md:gap-32 ">
      <AboutUsSection />
      <ServicesSection />
      <TestimonialSection />
    </div>
  );
}
