"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { UserRound } from "lucide-react";
import { ToggleTheme } from "@/components/theme/ToggleTheme";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import LogoImage from "./LogoImage";
import { House } from "lucide-react";
import { ChartBarStacked } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import PartIconCartAndLength from "./PartIconCartAndLength";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooksRedux";
import { FaBorderStyle } from "react-icons/fa";
import { Search } from "lucide-react";
import ModalSearchProduct from "./ModalSearchProduct";
import { scroller } from "react-scroll";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("home.navbar");
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.data);
  const [openDialog, setOpenDialog] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("scrollTo");
  const isRootLocaleOnly = pathname === "/";
  ///////////function handleScrollTo//////////////
  function handleScrollTo(sectionTo: string) {
    if (pathname === "/") {
      scroller.scrollTo(sectionTo, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -130,
      });
    } else {
      router.push(`/?scrollTo=${sectionTo}`);
    }
  }

  useEffect(() => {
    if (scrollTo) {
      scroller.scrollTo(scrollTo, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -130,
      });
    }
    setTimeout(() => {
      router.replace(pathname, {
        scroll: false,
      });
    }, 300);
  }, [pathname, router, scrollTo]);

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
              className="text-lg font-bold text-link-active cursor-pointer hidden md:block hover:text-black dark:hover:text-blue-400"
            >
              {t("home")}
            </Link>
            <Link
              href={"/"}
              className="block md:hidden cursor-pointer text-link-active hover:text-black"
            >
              <House className="dark:hover:text-blue-400" />
            </Link>
            <div
              className="items-center gap-1 text-link-inactive cursor-pointer hidden md:flex dark:hover:text-blue-400 hover:text-black"
              onClick={() => handleScrollTo("category")}
            >
              <h6 className="text-lg font-bold"> {t("category")}</h6>
              <ChevronDown className="mt-1 " />
            </div>
            <div
              className="block md:hidden cursor-pointer text-link-active hover:text-black"
              onClick={() => handleScrollTo("category")}
            >
              <ChartBarStacked className="dark:hover:text-blue-400" />
            </div>
          </div>

          <LogoImage />
          <div className="flex items-center gap-[7px] sm:gap-3 md:gap-5 text-link-active">
            <LanguageSwitcher />
            <ToggleTheme />
            <Search
              className={cn(
                "cursor-pointer w-6 h-6 hover:text-black dark:hover:text-blue-400 transition duration-300",
                !isRootLocaleOnly && "hidden"
              )}
              onClick={() => setOpenDialog(true)}
            />
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
      </nav>
      <ModalSearchProduct
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
