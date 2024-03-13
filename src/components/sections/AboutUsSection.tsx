import React from "react";
import Header from "../common/Header";
import MainButton from "../common/MainButton";
import { useTranslations } from "next-intl";
import { formats } from "@/lib/formats";

function AboutUsSection() {
  const t = useTranslations("About");

  return (
    <>
    
          <Header
            title={t("AboutUs.titile")}
            subtitle={t("AboutUs.description")}
          />
          <div className="flex justify-between items-center gap-8 flex-col md:flex-row mt-8">
            <div>
              <img src="/images/team_image.png" alt=" team image" />
            </div>
            <div>
              {t.rich("AboutUs.story", formats)}

              <div className="flex gap-4 mt-8">
                <MainButton text={t("AboutUs.buttons.about")} />
                <MainButton
                  text={t("AboutUs.buttons.story")}
                  classes="bg-white hover:bg-white border border-primary text-primary font-semibold"
                  iconRoute="/images/play_icon.png"
                />
              </div>
            </div>
          </div>
      
    </>
  );
}

export default AboutUsSection;
