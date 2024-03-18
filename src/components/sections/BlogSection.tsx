"use client";

import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useTranslations } from "next-intl";
import { formats } from "@/lib/formats";
import { getTopDonators } from "@/api/donations";
import { message } from "antd";

interface TopDonators {
  userName: string;
  totalAmount: number;
}
function BlogSection() {
  const t = useTranslations("Blog");
  // Состояние для хранения данных о топ донатерах
  const [topDonators, setTopDonators] = useState<TopDonators[]>([]);

  // Функция для получения топ донатеров
  const fetchTopDonators = async () => {
    try {
      const response: any = await getTopDonators(); // Замените на свой метод получения топ донатеров
      if (response.error) throw new Error(response.error);
      setTopDonators(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchTopDonators();
  }, []); // Запускаем только при первом рендере

  // Функция для отображения списка топ донатеров
  const renderTopDonators = () => {
    return topDonators.map((donator, index) => (
      <div key={index}>
        <span>{donator.userName ? donator.userName : "annonym"} - </span>
        <span>{donator.totalAmount} грн</span>
      </div>
    ));
  };
  return (
    <div>
      <Header title={t("Section.miniTitle")} subtitle={t("Section.title")} />
      <p className="text-center text-customGray my-8">
        {t.rich("Section.description", formats)}
      </p>
      <div className="border border-solid rounded-xl border-gray-300 p-5">
        {/* Ваш существующий JSX */}

        {/* Блок с топ донатерами */}
        <div>
          <h3>Топ донатеры</h3>
          {renderTopDonators()}
        </div>
      </div>
    </div>
  );
}

export default BlogSection;
