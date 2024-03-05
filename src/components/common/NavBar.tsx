"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import MainButton from "./MainButton";
import { NAV_LINKS_EN } from "@/constants/index_en";
import LocalSwitcher from "../local-switcher";
import { NAV_LINKS_UA } from "@/constants/index_ua";
import { useLocale } from "next-intl";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index: number) => {
    setActiveLink(index);
  };

  const localActive = useLocale();
  const navLinks = localActive === "en" ? NAV_LINKS_EN : NAV_LINKS_UA;

  return (
    <div className="md:sticky md:top-0   md:shadow-none z-20 ">
      {/* DESKTOP */}
      <div className="hidden lg:block animate-in fade-in bg-white p-8">
        <div className="flex justify-between mx-[41px] items-center">
          <div>
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            {navLinks.map((link, index) => (
              <Link href={link.href} key={link.key}>
                <p
                  onClick={() => handleLinkClick(index)}
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
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-[40px] select-none">
            <MainButton
              text="Contact Us"
              classes="bg-white border border-primary text-primary font-bold hover:bg-white shadow-none"
            />
            <LocalSwitcher />
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
            <img src="/images/logo.png" alt="logo" className="w-[4rem]" />
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
            <div className="flex flex-col gap-8 mt-8 mx-4">
              {navLinks.map((i) => (
                <Link href={i.href} key={i.key}>
                  {" "}
                  <p
                    className={`hover:font-bold transition-all duration-150 cursor-pointer flex items-center gap-2  font-[500] text-dark`}
                  >
                    {i.label}
                  </p>
                </Link>
              ))}

              <div className="flex flex-col gap-[40px] select-none">
                <LocalSwitcher />
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
