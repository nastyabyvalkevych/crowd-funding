import React from "react";
import Header from "../common/Header";
import CampaignModel from "@/models/campaign";
import CampaignCard from "../cards/CampaignCard";
import { connectDB } from "@/db/config";
import Filters from "../common/Filters";

connectDB();

export default async function DonateSection({
  title,
  subtitle,
  desc,
  searchParams,
}: {
  title: string;
  subtitle: string;
  desc: any;
  searchParams: any;
}) {
  let filters: any = {
    isActive: true,
  };
  if (searchParams.category) {
    filters.category = searchParams.category;
  }

  if (searchParams.organizer) {
    filters.organizer = {
      $regex: searchParams.organizer,
      $options: "i",
    };
  }

  const campaigns: CampaignType[] = (await CampaignModel.find(filters).sort({
    createdAt: -1,
  })) as any;
  return (
    <div>
      <Header title={title} subtitle={subtitle} />

      <p className="text-center text-customGray my-8">{desc}</p>
      <Filters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10 mt-8">
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
