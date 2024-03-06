"use client";

import { formats } from "@/lib/formats";
import { useTranslations } from "next-intl";

import Header from "@/components/common/Header";
import AboutUsSection from "@/components/sections/AboutUsSection";
import TestimonialSection from "@/components/sections/CommandSection";

export default function About() {
  const t = useTranslations("About");
  return (
    <div>
      <div className="px-4 md:px-16 flex flex-col gap-8 md:gap-20 ">
        <AboutUsSection />
        <div className="relative">
          <Header
            title={t("Services.miniTitle")}
            subtitle={t("Services.title")}
          />
          <p className="text-center text-customGray my-8">
            {t.rich("Services.description", formats)}
          </p>
        </div>
        <TestimonialSection />
      </div>
    </div>
  );
}
