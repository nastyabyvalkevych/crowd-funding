import React from "react";
import Header from "../common/Header";
import { useTranslations } from "next-intl";
import { formats } from "@/lib/formats";

function DonateSection() {
  const t = useTranslations("Donate");

  return (
    <>
      <div className="relative mt-16 md:mt-10 ">
        <div>
          <Header
            title={t("Section.miniTitle")}
            subtitle={t("Section.title")}
          />
          <p className="text-center text-customGray my-8">
            {t.rich("Section.description", formats)}
          </p>
        </div>
      </div>
    </>
  );
}

export default DonateSection;
