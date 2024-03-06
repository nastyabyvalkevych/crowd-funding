import React from "react";
import Header from "../common/Header";
import TestimonialCard from "../cards/CommandCard";
import { useLocale, useTranslations } from "next-intl";
import { COMMAND_EN } from "@/constants/index_en";
import { COMMAND_UA } from "@/constants/index_ua";
import CommandCard from "../cards/CommandCard";

function CommandSection() {
  const localActive = useLocale();
  const data = localActive === "en" ? COMMAND_EN : COMMAND_UA;
  const t = useTranslations("About");

  return (
    <>
      <div className="relative">
        <Header title={t("Command.miniTitle")} subtitle={t("Command.title")} />
        <div className="flex gap-16 flex-col md:flex-row items-center mt-16">
          {data.map((datum, index) => (
            <CommandCard key={index} {...datum} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CommandSection;
