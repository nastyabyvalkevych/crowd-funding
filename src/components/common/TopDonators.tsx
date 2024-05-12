"use client";

import { getTopDonators } from "@/api/donations";
import { message } from "antd";
import React, { useEffect, useState } from "react";

interface TopDonators {
  userName: string;
  totalAmount: number;
}

export default function TopDonators() {
  const [topDonators, setTopDonators] = useState<TopDonators[]>([]);

  const fetchTopDonators = async () => {
    try {
      const response: any = await getTopDonators();
      if (response.error) throw new Error(response.error);
      setTopDonators(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchTopDonators();
  }, []);

  const renderTopDonators = () => {
    return topDonators.map((donator, index) => (
      <div key={index} className="flex justify-between items-center py-2">
        <span className="flex-1">
          {donator.userName ? donator.userName : "Анонім"}
        </span>
        <span className="ml-2">{donator.totalAmount} грн</span>
      </div>
    ));
  };
  return (
    <div>
      <div>
        <h3 className="text-3xl text-rose-600">Топ донатери</h3>
        {renderTopDonators()}
      </div>
    </div>
  );
}
