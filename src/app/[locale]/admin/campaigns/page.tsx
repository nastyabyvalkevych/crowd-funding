import Block from "@/components/common/Block";
import LinkButton from "@/components/common/LinkButton";
import PageTitle from "@/components/common/PageTitle";
import React from "react";

export default function Campaign() {
  return (
    <Block>
      <div className="flex justify-between items-center">
        <PageTitle title="Кампанії" />
        <LinkButton
          title="Створити кампанію"
          path="/admin/campaigns/new-campaign"
        />
      </div>

      {/* <CampaignsTable campaigns={JSON.parse(JSON.stringify(campaigns))} /> */}
    </Block>
  );
}
