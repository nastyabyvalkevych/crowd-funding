import React from "react";
import Header from "../common/Header";
import { useTranslations } from "next-intl";
import { formats } from "@/lib/formats";
import CampaignModel from "@/models/campaign";
import CampaignCard from "../cards/CampaignCard";
import { connectDB } from "@/db/config";

connectDB();

async function DonateSection() {
  const t = useTranslations("Donate");
 
  const campaigns: CampaignType[] = (await CampaignModel.find({}).sort({
    createdAt: -1,
  })) as any;
  return (
    <div>
      <Header title={t("Section.miniTitle")} subtitle={t("Section.title")} />
      <p className="text-center text-customGray my-8">
        {t.rich("Section.description", formats)}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={JSON.parse(JSON.stringify(campaign))} />
        ))}
      </div>
    </div>
  );
}

export default DonateSection;
