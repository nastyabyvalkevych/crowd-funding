import Block from "@/components/common/Block";
import LinkButton from "@/components/common/LinkButton";
import { connectDB } from "@/db/config";
import CampaignModel from "@/models/campaign";
import React from "react";

connectDB();

interface SingleCampaignPageProps {
  params: {
    campaignid: string;
  };
}

async function SingleCampaignPage({ params }: SingleCampaignPageProps) {
  const campaign: CampaignType = (await CampaignModel.findById(
    params.campaignid
  )) as any;
  const getProperty = (key: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="font-bold text-gray-800">{key}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    );
  };

  return (
    campaign && (
      <Block>
        <h1 className="text-2xl font-bold text-gray-600">{campaign.name}</h1>

        <div className="grid md:grid-cols-3 gap-7 grid-cols-1">
          <div className="col-span-2 flex flex-col gap-7">
            <div className="flex flex-wrap gap-5">
              {campaign.images.map((image) => (
                <img src={image} className="h-60 object-cover rounded" />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {getProperty("Organizer", campaign.organizer)}
              {getProperty("Start date", campaign.startDate)}
              {getProperty("End date", campaign.endDate)}
              {getProperty("Target amount", `$ ${campaign.targetAmount}`)}
              {getProperty("Collected amount", `$ ${campaign.collectedAmount}`)}
            </div>

            <p className="text-sm text-gray-600">{campaign.description}</p>
          </div>
        </div>
      </Block>
    )
  );
}

export default SingleCampaignPage;
