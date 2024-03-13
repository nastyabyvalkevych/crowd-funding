"use client";

import { deleteCampaign } from "@/actions/campaigns";
import { Button, Table, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  campaigns: CampaignType[];
  pagination?: any;
}

export default function CampaignsTable({
  campaigns,
  pagination = true,
}: Props) {
  const router = useRouter();
  const [loading = false, setLoading] = React.useState<boolean>(false);
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const result = await deleteCampaign(id);
      if (result.error) throw new Error(result.error);
      message.success("Кампанію успішно видалено!");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Організатор",
      dataIndex: "organizer",
      key: "organizer",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render(category: string) {
        return <span>{category.toUpperCase()}</span>;
      },
    },
    {
      title: "Цільова сума",
      dataIndex: "targetAmount",
      key: "targetAmount",
      render(targetAmount: number) {
        return `${targetAmount} грн`;
      },
    },
    {
      title: "Зібрана сума",
      dataIndex: "collectedAmount",
      key: "collectedAmount",
      render(collectedAmount: number) {
        return `${collectedAmount} грн`;
      },
    },
    {
      title: "Дата початку",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Дата закінчення",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Дія",
      key: "action",
      render(record: CampaignType) {
        return (
          <div className="flex gap-5">
            <Button
              // onClick={() => {
              //   setSelectedCampaign(record);
              //   setShowReportModal(true);
              // }}
              size="small"
            >
              Report
            </Button>
            <Button
              onClick={() =>
                router.push(`/admin/campaigns/edit-campaign/${record._id}`)
              }
              size="small"
              icon={<i className="ri-pencil-line"></i>}
            />
            <Button
              size="small"
              onClick={() => onDelete(record._id)}
              icon={<i className="ri-delete-bin-line"></i>}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="mt-8">
      <Table
        columns={columns}
        dataSource={campaigns}
        loading={loading}
        rowKey="_id"
        pagination={pagination === undefined ? true : pagination}
        scroll={{ x: true }}
      />

      {/* {showReportModal && (
        <CampaignReportsModal
          showCampaignReportModal={showReportModal}
          setShowCampaignReportModal={setShowReportModal}
          selectedCampaign={selectedCampaign}
        />
      )} */}
    </div>
  );
}
