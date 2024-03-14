"use client";

import { formats } from "@/lib/formats";
import { useTranslations } from "next-intl";

import Header from "@/components/common/Header";
import AboutUsSection from "@/components/sections/AboutUsSection";
import TestimonialSection from "@/components/sections/CommandSection";
import Block from "@/components/common/Block";

export default function About() {
  const t = useTranslations("About");
  return (
    <Block>
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
    </Block>
  );
}
