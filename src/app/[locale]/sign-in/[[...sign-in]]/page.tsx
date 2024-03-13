import Block from "@/components/common/Block";
import Header from "@/components/common/Header";
import { SignIn } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Blog");

  return (
    <Block>
      <Header title={t("Section.miniTitle")} subtitle={t("Section.title")} />
      <div className="flex justify-center items-center relative  mt-8">
        <SignIn />
      </div>
    </Block>
  );
}
