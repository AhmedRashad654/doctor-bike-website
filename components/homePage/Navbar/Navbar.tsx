import React from "react";
import { ChevronDown } from "lucide-react";
import { UserRound } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { ToggleTheme } from "@/components/theme/ToggleTheme";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import LogoImage from "./LogoImage";
import { House } from "lucide-react";
import { ChartBarStacked } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full px-6 fixed top-8 left-0 right-0 z-50 flex justify-center">
      <div className="p-3 rounded-xl shadow-md w-full max-w-7xl bg-transperants flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-5 ">
          <h6 className="text-lg font-bold text-link-active cursor-pointer hidden md:block hover:text-black dark:hover:text-blue-400">
            الرئيسية
          </h6>
          <div className="block md:hidden cursor-pointer text-link-active hover:text-black">
            <House className="dark:hover:text-blue-400" />
          </div>
          <div className="items-center gap-1 text-link-inactive cursor-pointer hidden md:flex dark:hover:text-blue-400 hover:text-black">
            <h6 className="text-lg font-bold">الاقسام</h6>
            <ChevronDown className="mt-1 " />
          </div>
          <div className="block md:hidden cursor-pointer text-link-active hover:text-black">
            <ChartBarStacked className="dark:hover:text-blue-400" />
          </div>
        </div>

        <LogoImage />
        <div className="flex items-center gap-3 md:gap-5 text-link-active">
          <LanguageSwitcher />
          <ToggleTheme />
          <ShoppingCart className="cursor-pointer hover:text-black dark:hover:text-blue-400 transition duration-300" />
          <UserRound className="cursor-pointer hover:text-black dark:hover:text-blue-400 transition duration-300" />
        </div>
      </div>
    </nav>
  );
}
