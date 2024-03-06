import Header from "@/components/common/Header";
import { SignUp } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Blog");

  return (
    <div className="relative mt-16 md:mt-10 ">
      <div>
        <Header title={t("Section.miniTitle")} subtitle={t("Section.title")} />
        <div className="flex justify-center items-center relative  mt-8">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
