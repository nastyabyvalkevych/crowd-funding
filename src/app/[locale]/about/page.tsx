import AboutUsSection from '@/components/sections/AboutUsSection';
import React from 'react'

export default function About() {
  return (
    <div>
      <div className="px-4 md:px-16 flex flex-col gap-16 md:gap-32 mt-16 md:mt-32">
        <AboutUsSection />
      </div>
    </div>
  );
}
