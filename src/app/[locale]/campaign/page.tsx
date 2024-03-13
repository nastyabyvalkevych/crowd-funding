import Block from "@/components/common/Block";
import DonateSection from "@/components/sections/DonateSection";
import { formats } from "@/lib/formats";
import { useTranslations } from "next-intl";

export default function Donation() {
    const t = useTranslations("Donate");
  return (
    <Block>
      <DonateSection
        title={t("Section.miniTitle")}
        subtitle={t("Section.title")}
        desc={t.rich("Section.description", formats)}
      />
    </Block>
  );
}
