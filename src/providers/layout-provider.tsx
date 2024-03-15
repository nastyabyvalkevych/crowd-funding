"use client";

import React, { useEffect } from "react";
import { USER_MENU_EN } from "@/constants/index_en";
import { ADMIN_MENU_EN } from "@/constants/index_en";
import { USER_MENU_UA } from "@/constants/index_ua";
import { ADMIN_MENU_UA } from "@/constants/index_ua";
import { useLocale, useTranslations } from "next-intl";

import { usePathname } from "next/navigation";
import { getCurrentUserDataFromMongoDB } from "@/api/users";
import { message } from "antd";
import NavBar from "@/components/common/NavBar";
import Block from "@/components/common/Block";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [menuToShow, setMenuToShow] = React.useState<any>([]);
  const pathname = usePathname();
  const localActive = useLocale();
  //Users menu
  const t = useTranslations("AccessRole");

  const adminMenu = localActive === "en" ? ADMIN_MENU_EN : ADMIN_MENU_UA;
  const userMenu = localActive === "en" ? USER_MENU_EN : USER_MENU_UA;

  //Db fetch users
  const getCurrentUser = async () => {
    try {
      const response = await getCurrentUserDataFromMongoDB();
      if (response.error) throw new Error(response.error);
      setCurrentUser(response.data);
      if (response.data?.isAdmin) {
        setMenuToShow(adminMenu);
      } else {
        setMenuToShow(userMenu);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const getHeader = () => {
    return <NavBar currentUser={currentUser} menuToShow={menuToShow} />;
  };

  const getContent = () => {
    // if the route is private , render children only after getting current user
    const isAdminRoute = pathname.includes("/admin");
    if (isAdminRoute && !currentUser)
      return (
        <div className="flex justify-center items-center h-screen ">
          <div className="h-10 w-10 border-4 border-primary border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      );

    if (currentUser && isAdminRoute && !currentUser.isAdmin) {
      return (
        <div className="flex justify-center mt-20">
          <span>{t("warnings")}</span>
        </div>
      );
    }
    return <div>{children}</div>;
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  );
}

export default LayoutProvider;
