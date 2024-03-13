import React from "react";
import CampaignForm from "../_components/campaign-form";
import PageTitle from "@/components/common/PageTitle";
import Block from "@/components/common/Block";

function NewCampaignPage() {
  return (
    <Block>
      <PageTitle title="Нова кампанія" />
      <CampaignForm />
    </Block>
  );
}

export default NewCampaignPage;
