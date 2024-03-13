export const dynamic = "force-dynamic";

import React from "react";

import { connectDB } from "@/db/config";
import CampaignForm from "../../_components/CampaignForm";
import PageTitle from "@/components/common/PageTitle";
import CampaignModel from "@/models/campaign";
import Block from "@/components/common/Block";

connectDB();
interface Props {
  params: {
    campaignid: string;
  };
}

async function EditCampaignPage({ params }: Props) {
  const campaign = await CampaignModel.findById(params.campaignid);
  return (
    <Block>
      <PageTitle title="Редагувати кампанію" />
      {campaign && (
        <CampaignForm
          initialData={JSON.parse(JSON.stringify(campaign))}
          isEditForm={true}
        />
      )}
    </Block>
  );
}

export default EditCampaignPage;
