import { getCurrentUserDataFromMongoDB } from "@/actions/users";
import Block from "@/components/common/Block";
import DonationsTable from "@/components/common/DonationsTable";
import PageTitle from "@/components/common/PageTitle";
import { connectDB } from "@/db/config";
import DonationModal from "@/models/donation";
import React from "react";

connectDB();

async function DonationsPage() {
  const mongoUser = await getCurrentUserDataFromMongoDB();
  const donations = await DonationModal.find({ user: mongoUser.data._id })
    .populate("campaign")
    .populate("user")
    .sort({ createdAt: -1 });
  return (
    <Block>
      <PageTitle title="Донати" />
      <DonationsTable
        donations={JSON.parse(JSON.stringify(donations))}
        fromAdmin={false}
      />
    </Block>
  );
}

export default DonationsPage;
