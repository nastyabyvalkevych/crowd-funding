import Header from "../common/Header";

import { useTranslations } from "next-intl";

import { formats } from "@/lib/formats";

function PortfolioSection() {
  const t = useTranslations("About");

  return (
    <>
      <div className="relative mt-16 md:mt-10 ">
      <Header title={t("Services.miniTitle")} subtitle={t("Services.title")} />
      <p className="text-center text-customGray my-8">
        {t.rich("Services.description", formats)}
      </p>
      </div>
    </>
  );
}

export default PortfolioSection;
