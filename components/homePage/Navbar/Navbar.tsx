"use client";
import React from "react";
import { ChevronDown, LogOut } from "lucide-react";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooksRedux";
import { Button } from "@/components/ui/button";
import { setLogout } from "@/redux/features/userSlice";

export default function Navbar() {
  const t = useTranslations("home.navbar");
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.data);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isRootLocaleOnly = pathname === "/";

  const handleLogout = () => {
    dispatch(setLogout());
    router.push("/sign-in");
  };
  return (
    <nav
      className={cn(
        "w-full px-6 right-0 z-50 flex justify-center",
        isRootLocaleOnly && "fixed top-8 left-0 right-0",
        !isRootLocaleOnly && "mt-8"
      )}
    >
      <div className="p-3 rounded-xl shadow-md w-full max-w-7xl bg-transperants flex justify-between items-center relative">
        <div className="flex items-center gap-3 md:gap-5 ">
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
          <div className="items-center gap-1 text-link-inactive cursor-pointer hidden md:flex dark:hover:text-blue-400 hover:text-black">
            <h6 className="text-lg font-bold"> {t("category")}</h6>
            <ChevronDown className="mt-1 " />
          </div>
          <div className="block md:hidden cursor-pointer text-link-active hover:text-black">
            <ChartBarStacked className="dark:hover:text-blue-400" />
          </div>
        </div>

        <LogoImage />
        <div className="flex items-center gap-3 md:gap-5 text-link-active">
          {user?.id !== "" && (
            <Button variant="outline" onClick={handleLogout} className="cursor-pointer">
              <LogOut />
            </Button>
          )}
          <LanguageSwitcher />
          <ToggleTheme />
          <PartIconCartAndLength />
          <Link href={user?.id !== "" ? "/user/data-user-update" : "/sign-in"}>
            <UserRound className="cursor-pointer hover:text-black dark:hover:text-blue-400 transition duration-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
