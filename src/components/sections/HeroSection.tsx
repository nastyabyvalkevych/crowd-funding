"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import MainButton from "../common/MainButton";
import { SUM_DONAT_EN } from "@/constants/index_en";
import { SUM_DONAT_UA } from "@/constants/index_ua";
import { formats } from "@/lib/formats";

function HeroSection() {
  const [donationAmount, setDonationAmount] = useState("");

  const t = useTranslations("Home");

  const localActive = useLocale();
  const sumDonate = localActive === "en" ? SUM_DONAT_EN : SUM_DONAT_UA;

  return (
    <div className="relative mt-32 md:mt-8 ">
      <div className="flex justify-center items-center px-4 mt-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold leading-tight text-center">
            {t.rich("HeroSection.title", formats)}
          </h1>
          <p className="mt-4 text-gray-500 text-center">
            {t("HeroSection.description")}
          </p>
          <div className="mt-10 bg-gray rounded-2xl shadow-lg p-8 border-2 border-blue-400">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                {" "}
                {t("HeroSection.form.title")}
              </h2>
              <div className="flex mt-2">
                <button className="flex-1 py-2 bg-blue-100 text-blue-400 rounded-l-lg focus:outline-none">
                  {t("HeroSection.form.option-1")}
                </button>
                <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-r-lg focus:outline-none">
                  {t("HeroSection.form.option-2")}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4 ">
              {sumDonate.map((i) => (
                <button
                  key={i.sum}
                  className="py-2 bg-gray-100 text-gray-700 rounded focus:outline-none"
                >
                  {i.sum} {i.currency}
                </button>
              ))}
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder={t("HeroSection.form.option-3")}
                className="w-full py-3 px-4 rounded border-gray-300 focus:outline-none"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </div>
            <MainButton
              text={t("HeroSection.form.button-text")}
              classes="w-full py-3 "
            />
          </div>
        </div>
      </div>
      <div className="absolute top-32  hidden md:block">
        <img src="/images/ellipse.png" alt="orange ellipse" />
      </div>
      <div className="absolute top-0 right-0">
        <img src="/images/formVector.svg" alt="blue gradient ball" />
      </div>
    </div>
  );
}

export default HeroSection;
