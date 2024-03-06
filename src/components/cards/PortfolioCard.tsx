import React from "react";

interface IProps {
  img: string;
  title: string;
}

function PortfolioCard({ img, title }: IProps) {
  return (
    <div
      className={`px-8 w-full rounded-[30px] bg-cover bg-no-repeat relative 
       h-[350px]
      `}
    >
      <img src={`/images/${img}`} alt="image" />
      <p
        className={`text-grey font-bold text-[24px] absolute `}
      >
        {title}
      </p>
    </div>
  );
}

export default PortfolioCard;
