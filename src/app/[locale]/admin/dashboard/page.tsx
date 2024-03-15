import DashboardCard from "@/components/cards/DashboardCard";
import PageTitle from "@/components/common/PageTitle";
import { connectDB } from "@/db/config";
import CampaignModel from "@/models/campaign";
import DonationModal from "@/models/donation";
import React from "react";
import CampaignsTable from "../campaigns/_components/CampaignsTable";
import DonationsTable from "@/components/common/DonationsTable";
import Block from "@/components/common/Block";

connectDB();

async function DashboardPage() {
  let [campaignsCount, donationsCount, amountRaised] = await Promise.all([
    CampaignModel.countDocuments({}),
    DonationModal.countDocuments({}),
    DonationModal.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]),
  ]);

  amountRaised = amountRaised[0]?.totalAmount || 0;

  const [recentCampaigns, recentDonations] = await Promise.all([
    CampaignModel.find({}).sort({ createdAt: -1 }).limit(5),
    DonationModal.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user")
      .populate("campaign"),
  ]);

  return (
    <Block>
      <PageTitle title="Панель управління" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <DashboardCard
          cardTitle="Кампанії"
          description="Загальна кількість кампаній, включаючи активні та неактивні"
          value={campaignsCount.toString()}
          onClickPath="/admin/campaigns"
        />

        <DashboardCard
          cardTitle="Донати"
          description="Загальна кількість пожертв, зроблених користувачами за всіма кампаніями"
          value={donationsCount.toString()}
          onClickPath="/admin/donations"
        />

        <DashboardCard
          cardTitle="Зібрано коштів"
          description="Загальна сума, зібрана всіма кампаніями, включаючи активні та неактивні"
          value={`${amountRaised} грн`}
        />
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-semibold text-gray-700">
          Останні кампанії
        </h1>
        <CampaignsTable
          campaigns={JSON.parse(JSON.stringify(recentCampaigns))}
          pagination={false}
        />
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-semibold text-gray-700">Останні донати</h1>
        <DonationsTable
          donations={JSON.parse(JSON.stringify(recentDonations))}
          pagination={false}
          fromAdmin
        />
      </div>
    </Block>
  );
}

export default DashboardPage;
