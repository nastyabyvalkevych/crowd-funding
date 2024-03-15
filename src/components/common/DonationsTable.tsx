"use client";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

interface DonationsTableProps {
  donations: DonationType[];
  fromAdmin: boolean;
  pagination?: any;
  fromCampaign?: boolean;
}

function DonationsTable({
  donations,
  fromAdmin = false,
  pagination,
  fromCampaign = false,
}: DonationsTableProps) {
  let columns: any[] = [
    {
      title: "Кампанія",
      dataIndex: "campaign",
      key: "campaign",
      render: (campaign: CampaignType) => {
        return <span>{campaign?.name ? campaign?.name : "Не існує"}</span>;
      },
    },
    {
      title: "Сума",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => {
        return <span>{amount} грн</span>;
      },
    },
    {
      title: "Повідомлення",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Дата та час",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => {
        return <span>{dayjs(createdAt).format("MMMM DD, YYYY hh:mm A")}</span>;
      },
    },
  ];

  if (fromAdmin) {
    // add user column after campaign column
    columns.splice(1, 0, {
      title: "Волонтери",
      dataIndex: "user",
      key: "user",
      render: (user: UserType) => {
        return <span>{user?.userName ? user.userName : "anonim"}</span>;
      },
    });
  }

  if (fromCampaign) {
    // remove campaign column
    columns = columns.filter((column) => column.key !== "campaign");
  }

  return (
    <div>
      <Table
        dataSource={donations}
        columns={columns}
        pagination={pagination}
        scroll={{ x: true }}
        className="mt-8"
      />
    </div>
  );
}

export default DonationsTable;
