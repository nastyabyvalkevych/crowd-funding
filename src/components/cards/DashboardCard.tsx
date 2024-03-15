"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
  cardTitle: string;
  description: string;
  value: string;
  onClickPath?: string;
}

function DashboardCard({
  cardTitle,
  description,
  value,
  onClickPath,
}: DashboardCardProps) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col gap-3 p-5 border border-solid rounded-xl border-gray-300 hover:border-[#1A8FE3] cursor-pointer"
      onClick={() => {
        if (onClickPath) {
          router.push(onClickPath);
        }
      }}
    >
      <span className="text-primary font-semibold">{cardTitle}</span>
      <span className="text-xs text-gray-500">{description}</span>
      <span className="text-5xl font-semibold text-gray-700 text-center">
        {value}
      </span>
    </div>
  );
}

export default DashboardCard;
