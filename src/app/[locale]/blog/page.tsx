import Block from "@/components/common/Block";
import Header from "@/components/common/Header";
import BlogSection from "@/components/sections/BlogSection";
import { formats } from "@/lib/formats";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("Blog");

  return (
    <Block>
      <Header title={t("Section.miniTitle")} subtitle={t("Section.title")} />
      <p className="text-center text-customGray my-8">
        {t.rich("Section.description", formats)}
      </p>
      <BlogSection />
    </Block>
  );
}
