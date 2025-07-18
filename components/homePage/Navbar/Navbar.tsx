"use client";
import React, { useEffect, useState } from "react";
import {  Search } from "lucide-react";
import { UserRound } from "lucide-react";
import { ToggleTheme } from "@/components/theme/ToggleTheme";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import LogoImage from "./LogoImage";
import { House } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import PartIconCartAndLength from "./PartIconCartAndLength";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooksRedux";
import { FaBorderStyle } from "react-icons/fa";
import InputSearch from "./InputSearch";
import PartCategory from "./PartCategory";

export default function Navbar() {
  const t = useTranslations("home.navbar");
  const user = useAppSelector((state) => state?.user?.data);
  const [openInputSearch, setOpenInputSearch] = useState(false);
  const pathname = usePathname();
  const isRootLocaleOnly = pathname === "/";
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <nav
        className={cn(
          "w-full px-6 right-0 z-50 flex justify-center",
          isRootLocaleOnly && "fixed top-8 left-0 right-0",
          !isRootLocaleOnly && "mt-8"
        )}
      >
        <div className="p-3 rounded-xl shadow-md w-full max-w-7xl bg-transperants flex justify-between items-center relative">
          <div className="flex items-center gap-[7px] sm:gap-3 md:gap-5 ">
            <Link
              href={"/"}
              className="text-lg font-bold text-link-active cursor-pointer hidden lg:block hover:text-black dark:hover:text-blue-400"
            >
              {t("home")}
            </Link>
            <Link
              href={"/"}
              className="block lg:hidden cursor-pointer text-link-active hover:text-black"
            >
              <House className="dark:hover:text-blue-400" />
            </Link>
            <PartCategory />
          </div>

          <LogoImage />
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-2 text-link-active">
            <Search
              className={cn(
                "cursor-pointer w-6 h-6 hover:text-black dark:hover:text-blue-400 transition duration-300 block lg:hidden",
                !isRootLocaleOnly && "hidden",
                openInputSearch && "hidden"
              )}
              onClick={() => setOpenInputSearch(true)}
            />
            <div
              className={cn("hidden lg:block", !isRootLocaleOnly && "hidden")}
            >
              <InputSearch />
            </div>
            {openInputSearch && (
              <div className={cn("lg:hidden", !isRootLocaleOnly && "hidden")}>
                <InputSearch setOpenInputSearch={setOpenInputSearch} />
              </div>
            )}
            <div
              className={cn(
                "flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-2",
                openInputSearch && isMobile && "hidden"
              )}
            >
              <LanguageSwitcher />
              <ToggleTheme />
              {user?.id !== "" && (
                <Link href={"/orders"}>
                  <FaBorderStyle className="cursor-pointer w-5 h-5 hover:text-black dark:hover:text-blue-400 transition duration-300" />
                </Link>
              )}
              <PartIconCartAndLength />
              <Link href={user?.id !== "" ? "/user" : "/sign-in"}>
                <UserRound className="cursor-pointer hover:text-black dark:hover:text-blue-400 transition duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
