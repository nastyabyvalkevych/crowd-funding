import React from "react";
import Header from "../common/Header";
import CampaignModel from "@/models/campaign";
import CampaignCard from "../cards/CampaignCard";
import { connectDB } from "@/db/config";

connectDB();

export default async function DonateSection({
  title,
  subtitle,
  desc,
}: {
  title: string;
  subtitle: string;
  desc: any;
}) {
  const campaigns: CampaignType[] = (await CampaignModel.find({}).sort({
    createdAt: -1,
  })) as any;

  return (
    <div>
      <Header title={title} subtitle={subtitle} />
      <p className="text-center text-customGray my-8">{desc}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mx-10">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={JSON.parse(JSON.stringify(campaign))}
          />
        ))}
      </div>
    </div>
  );
}
