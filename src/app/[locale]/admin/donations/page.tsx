import Block from "@/components/common/Block";
import DonationsTable from "@/components/common/DonationsTable";
import PageTitle from "@/components/common/PageTitle";
import { connectDB } from "@/db/config";
import DonationModal from "@/models/donation";
import React from "react";

connectDB();

async function DonationsPage() {
  const donations = await DonationModal.find({})
    .populate("campaign")
    .populate("user")
    .sort({ createdAt: -1 });
  return (
    <Block>
      <PageTitle title="Донати" />
      <DonationsTable
        donations={JSON.parse(JSON.stringify(donations))}
        fromAdmin={true}
      />
    </Block>
  );
}

export default DonationsPage;
