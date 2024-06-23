"use client";
import { Select, Input, Button } from "antd";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/app/[locale]/admin/campaigns/_components/CampaignForm";
import { useTranslations } from "next-intl";

function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [category, setCategory] = React.useState<string>(
    searchParams ? searchParams.get("category") || "" : ""
  );
  const [organizer, setOrganizer] = React.useState<string>(
    searchParams ? searchParams.get("organizer") || "" : ""
  );
  const t = useTranslations("Filter");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-5 my-5 items-end">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-500">
          {t("category")}
        </span>
        <Select
          value={category}
          options={categories}
          onChange={(value) => setCategory(value)}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-500">
          {t("organizer")}
        </span>
        <Input
          value={organizer}
          onChange={(e: any) => setOrganizer(e.target.value)}
        />
      </div>
      <div className="flex gap-5">
        <Button
          onClick={() => {
            router.push(`/campaign`);
            setCategory("");
            setOrganizer("");
          }}
          block
        >
          {t("reset")}
        </Button>
        <Button
          onClick={() => {
            router.push(
              `campaign/?category=${category}&organizer=${organizer}`,
            );
          }}
          block
        >
          {t("filter")}
        </Button>
      </div>
    </div>
  );
}

export default Filters;
