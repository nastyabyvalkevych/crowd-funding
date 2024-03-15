import DonationCard from "@/components/cards/DonationCard";
import Block from "@/components/common/Block";
import LinkButton from "@/components/common/LinkButton";
import { connectDB } from "@/db/config";
import CampaignModel from "@/models/campaign";
import DonationModal from "@/models/donation";
import { useTranslations } from "next-intl";
import React from "react";

connectDB();

interface SingleCampaignPageProps {
  params: {
    campaignid: string;
  };
}

const getProperty = (key: string, value: any) => {
  return (
    <div className="flex flex-col text-sm">
      <span className="font-bold text-gray-800">{key}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
};

const LocalizationComponent = ({
  organizer,
  startDate,
  endDate,
  targetAmount,
  collectedAmount,
}: any) => {
  const t = useTranslations("Campaign");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {getProperty(t("organizer"), organizer)}
      {getProperty(t("startDate"), startDate)}
      {getProperty(t("endDate"), endDate)}
      {getProperty(t("targetAmount"), `${targetAmount} грн`)}
      {getProperty(t("collectedAmount"), `${collectedAmount} грн`)}
    </div>
  );
};

async function SingleCampaignPage({ params }: SingleCampaignPageProps) {
  const campaign: any = await CampaignModel.findById(params.campaignid);

  const recent5Donations = await DonationModal.find({
    campaign: params.campaignid,
  })
    .populate("user", "userName")
    .sort({ createdAt: -1 })
    .limit(5);

  return (
    campaign && (
      <Block>
        <h1 className="text-2xl font-bold text-gray-600 mb-3">
          {campaign.name}
        </h1>

        <div className="grid md:grid-cols-3 gap-7 grid-cols-1">
          <div className="col-span-2 flex flex-col gap-7">
            <div className="flex flex-wrap gap-5">
              {campaign.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  className="h-60 object-cover rounded "
                />
              ))}
            </div>
            <LocalizationComponent
              organizer={campaign.organizer}
              startDate={campaign.startDate}
              endDate={campaign.endDate}
              targetAmount={campaign.targetAmount}
              collectedAmount={campaign.collectedAmount}
            />
            <p className="text-sm text-gray-600">{campaign.description}</p>
          </div>
          <div className="col-span-1">
            <DonationCard
              donations={JSON.parse(JSON.stringify(recent5Donations))}
              campaign={JSON.parse(JSON.stringify(campaign))}
            />
          </div>
        </div>
      </Block>
    )
  );
}

export default SingleCampaignPage;
