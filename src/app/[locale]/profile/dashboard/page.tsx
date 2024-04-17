import { connectDB } from "@/db/config";
import React from "react";
import { getCurrentUserDataFromMongoDB } from "@/api/users";
import mongoose from "mongoose";
import Block from "@/components/common/Block";
import DonationModal from "@/models/donation";
import PageTitle from "@/components/common/PageTitle";
import DonationsTable from "@/components/common/DonationsTable";
import DashboardCard from "@/components/cards/DashboardCard";

connectDB();

async function Dashboard() {
  const mongoUser = await getCurrentUserDataFromMongoDB();
  const userId = new mongoose.Types.ObjectId(mongoUser.data._id);
  let [donationsCount, amountRaised] = await Promise.all([
    DonationModal.countDocuments({
      user: mongoUser.data._id,
    }),
    DonationModal.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]),
  ]);

  amountRaised = amountRaised[0]?.totalAmount || 0;

  const recentDonations = await DonationModal.find({
    user: mongoUser.data._id,
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("campaign");
  return (
    <Block>
      <PageTitle title="Панель" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <DashboardCard
          cardTitle="Донати"
          description="Загальна кількість донатів на всі кампанії"
          value={donationsCount.toString()}
          onClickPath="/admin/donations"
        />

        <DashboardCard
          cardTitle="Сума донатів"
          description="Загальна сума донатів на всі кампанії"
          value={`${amountRaised} грн`}
        />
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-semibold">Останні донати</h1>
        <DonationsTable
          donations={JSON.parse(JSON.stringify(recentDonations))}
          fromAdmin={false}
        />
      </div>
    </Block>
  );
}

export default Dashboard;
