"use client";
import React, { useEffect } from "react";

import { Modal, Spin, message } from "antd";
import { getCampaignReportsById } from "@/actions/campaigns";
import DashboardCard from "@/components/cards/DashboardCard";
import DonationsTable from "@/components/common/DonationsTable";

interface Props {
  showCampaignReportModal: boolean;
  setShowCampaignReportModal: (show: boolean) => void;
  selectedCampaign: CampaignType | null;
}

function CampaignReportsModal({
  showCampaignReportModal,
  setShowCampaignReportModal,
  selectedCampaign,
}: Props) {
  const [data = [], setData] = React.useState<any>(null);
  const [loading = false, setLoading] = React.useState<boolean>(false);
  const getData = async () => {
    try {
      setLoading(true);
      const result = await getCampaignReportsById(selectedCampaign?._id!);
      if (result.error) throw new Error(result.error);
      console.log(result.data);
      setData(result.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      open={showCampaignReportModal}
      onCancel={() => setShowCampaignReportModal(false)}
      title=""
      footer={null}
      width={1000}
    >
      <div className="flex flex-col">
        <span className="font-semibold text-gray-500">Кампанія</span>
        <span className="text-sm font-semibold text-gray-800">
          {selectedCampaign?.name}
        </span>
      </div>

      <hr className="my-5" />

      <div className="flex justify-center">{loading && <Spin />}</div>

      {data && (
        <div>
          <div className="grid grid-cols-3 gap-5">
            <DashboardCard
              cardTitle="Загальна сума донатів"
              description="Загальна кількість донатів, зроблених користувачами на цю кампанію"
              value={data.donationsCount}
            />

            <DashboardCard
              cardTitle="Загальна сума зібраних коштів"
              description="Загальна сума, зібрана в рамках цієї кампанії завдяки всім донатам до цього часу"
              value={`${data.totalAmountRaised} грн`}
            />
          </div>

          <div className="mt-5">
            <h1 className="text-sm font-semibold text-primary">Донати</h1>

            <DonationsTable
              fromCampaign={true}
              donations={data.donations}
              fromAdmin={true}
            />
          </div>
        </div>
      )}
    </Modal>
  );
}

export default CampaignReportsModal;
