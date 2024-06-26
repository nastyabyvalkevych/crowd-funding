"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import MainButton from "./MainButton";
import { NAV_LINKS_EN } from "@/constants/index_en";
import LocalSwitcher from "./LocalSwitcher";
import { NAV_LINKS_UA } from "@/constants/index_ua";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "@clerk/clerk-react";

import logo from "../../../public/images/Logo.png";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button, Dropdown } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function NavBar({ currentUser, menuToShow }: any) {
  // Menu Ui
  const [menu, setMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const router = useRouter();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLinkClick = (index: number, href: string) => {
    router.push(href);
    setActiveLink(index);
  };

  const handleLinkClickMobile = () => {
    setMenu(false);
  };

  //Localization
  const localActive = useLocale();
  const t = useTranslations("Navbar");
  const navLinks = localActive === "en" ? NAV_LINKS_EN : NAV_LINKS_UA;

  const { isSignedIn } = useSession();
  const pathname = usePathname();

  const isAdminRoute = pathname?.includes("/admin");
  return (
    <div className="md:sticky md:top-0   md:shadow-none z-20 ">
      {/* DESKTOP */}
      <div className="hidden lg:block animate-in fade-in bg-white p-6">
        <div className="flex justify-between mx-[41px] items-center">
          <div>
            <Image src={logo} alt="logo" width={130} height={100} />
          </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            {navLinks.map((link, index) => (
              <p
                key={link.key}
                onClick={() => handleLinkClick(index, link.href)}
                className={`transition-all duration-150 cursor-pointer flex items-center gap-2 font-[500] ${
                  activeLink === index
                    ? "text-[#1A8FE3] font-bold"
                    : "text-dark"
                }`}
              >
                {link.label}{" "}
                {activeLink === index && (
                  <span className="w-2 h-2 bg-[#1A8FE3] rounded-full"></span>
                )}
              </p>
            ))}
            {!isAdminRoute && <LocalSwitcher />}
          </div>
          <div className="flex items-center gap-[32px] select-none">
            {isSignedIn ? (
              <div className="bg-white rounded py-2 px-3 flex items-center gap-5">
                <Dropdown
                  menu={{
                    items: menuToShow.map((menu: any) => ({
                      key: menu.name,
                      label: menu.name,
                      onClick: () => {
                        router.push(menu.url);
                      },
                    })),
                  }}
                >
                  <Button type="link" className="text-[#1A8FE3]">
                    {currentUser?.userName}
                  </Button>
                </Dropdown>
              </div>
            ) : (
              <Link href="/ua/sign-in">
                <MainButton
                  text={t("buttons.signIn")}
                  classes="bg-white border border-primary text-primary font-bold hover:bg-white shadow-none"
                />
              </Link>
            )}
            <UserButton afterSignOutUrl={"/"} />
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in  ${
          menu ? " bg-primary py-2" : ""
        } `}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Image
              src={logo}
              alt="logo"
              width={130}
              height={100}
              className="w-[6rem]"
            />
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <img
                src="/images/hamburger.png"
                alt="logo"
                className="cursor-pointer animate-in fade-in zoom-in"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4 items-center">
              {navLinks.map((i, index) => (
                <p
                  key={i.key}
                  onClick={() => {
                    handleLinkClick(index, i.href);
                    handleLinkClickMobile();
                  }}
                  className={`transition-all duration-150 cursor-pointer flex items-center gap-2 font-[500] ${
                    activeLink === index
                      ? "text-[#1A8FE3] font-bold"
                      : "text-dark"
                  }`}
                >
                  {i.label}{" "}
                  {activeLink === index && (
                    <span className="w-2 h-2 bg-[#1A8FE3] rounded-full"></span>
                  )}
                </p>
              ))}
              {!isAdminRoute && <LocalSwitcher />}
              <div className="flex flex-col gap-[16px] select-none items-center">
                <UserButton afterSignOutUrl={`/`} />

                {isSignedIn ? (
                  <div className="bg-white rounded py-2 px-3 flex items-center gap-5">
                    <Dropdown
                      menu={{
                        items: menuToShow.map((menu: any) => ({
                          key: menu.name,
                          label: menu.name,
                          onClick: () => {
                            router.push(menu.url);
                            handleLinkClickMobile();
                          },
                        })),
                      }}
                    >
                      <Button type="link" className="text-[#1A8FE3]">
                        {currentUser?.userName}
                      </Button>
                    </Dropdown>
                  </div>
                ) : (
                  <Link
                    href="/ua/sign-in"
                    onClick={() => {
                      handleLinkClickMobile();
                    }}
                  >
                    <MainButton
                      text={t("buttons.signIn")}
                      classes="bg-white border border-primary text-primary font-bold hover:bg-white shadow-none"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
