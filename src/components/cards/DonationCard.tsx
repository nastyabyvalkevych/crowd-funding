"use client";
import { Button, Input, Modal, Progress } from "antd";
import { message as antdMessage } from "antd";
import { useTranslations } from "next-intl";
const { TextArea } = Input;
import React from "react";

interface DonationCardProps {
  campaign: CampaignType;
  donations?: DonationType[];
}


function DonationCard({ campaign, donations = [] }: DonationCardProps) {
 
  const [loading = false, setLoading] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<number>();
  const [message, setMessage] = React.useState("");
  const collectedPercentage = Math.round(
    (campaign.collectedAmount / campaign.targetAmount) * 100
  );

   const t = useTranslations("Campaign");


  return (
    <div className="border border-solid rounded-xl border-gray-300 p-5">
      <span className="text-xl text-primary font-semibold">
        {campaign.collectedAmount} грн {t("raised")} {campaign.targetAmount} грн
      </span>
      <Progress percent={collectedPercentage} />

      <hr className="my-10" />

      <div className="flex flex-col gap-5 mt-5">
        <Input
          placeholder={t("amount")}
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
          value={amount}
        />

        <TextArea
          placeholder={t("message")}
          rows={4}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <Button type="default" block disabled={!amount} loading={loading}>
          {t("donate")}
        </Button>
      </div>
    </div>
  );
}

export default DonationCard;
