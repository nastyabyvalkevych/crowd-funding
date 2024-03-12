import React from "react";
import { Separator } from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { FOOTER_CONTACT_INFO_EN } from "@/constants/index_en";
import { FOOTER_CONTACT_INFO_UA } from "@/constants/index_ua";
import logo from "../../../public/images/Logo.png";
import Image from "next/image";

function Footer() {
  const t = useTranslations("Footer");

  const localActive = useLocale();
  const data =
    localActive === "en" ? FOOTER_CONTACT_INFO_EN : FOOTER_CONTACT_INFO_UA;

  const socialLinks = [
    {
      src: "/facebook.png",
      link: "https://www.facebook.com/profile.php?id=100021111006928",
    },
    {
      src: "/instagram.png",
      link: "https://www.instagram.com/",
    },
    {
      src: "/linkedin.png",
      link: "https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D1%96%D1%8F-%D0%B1%D0%B8%D0%B2%D0%B0%D0%BB%D1%8C%D0%BA%D0%B5%D0%B2%D0%B8%D1%87-b00024283/",
    },
    {
      src: "/email.png",
      link: "https://mail.google.com/",
    },
    {
      src: "/x.png",
      link: "https://twitter.com/home",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="flex justify-between flex-col md:flex-row gap-16">
        <div>
          <Image src={logo} alt="footer logo" width={130} height={100} />
        </div>
        <div className="flex justify-between flex-col gap-8 md:flex-row flex-grow">
          {data.map((option, index) => (
            <div key={index}>
              <p className="text-grey font-bold text-[22px] mb-4" key={index}>
                {option.title}
              </p>
              <div className="flex flex-col gap-4">
                {option.items.map((item, index_inner) => (
                  <p className="text-grey text-[16px]" key={index_inner}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-16">
        <div className="flex gap-4">
          {socialLinks.map((i) => (
            <div key={i.link}>
              <a href={i.link}>
                <img src={`/images/${i.src}`} alt="facebook icon" />
              </a>
            </div>
          ))}
        </div>
        <div className="my-4 w-full">
          <Separator />
        </div>

        <p className="text-grey">{t("copyright")}</p>
      </div>
    </section>
  );
}

export default Footer;
