import React, { useEffect, useState } from "react";
import { ChartBarStacked } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GetMainCategory } from "@/services/mainCategory/mainCategory";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { IMainCategory } from "@/types/mainCateroty/IMainCategory";
import { Link } from "@/i18n/navigation";

export default function PartCategory() {
  const t = useTranslations("home.navbar");
  const locale = useLocale();
  const [mainCatgory, setMainCategry] = useState([]);
  useEffect(() => {
    async function fetchMainCategory() {
      const response = await GetMainCategory();
      setMainCategry(response?.rows);
    }
    fetchMainCategory();
  }, []);
  if (!mainCatgory || mainCatgory.length === 0) return null;
  return (
    <>
      <Menubar className="bg-transperants border-none">
        <MenubarMenu>
          <MenubarTrigger>
            <div className="items-center gap-1 text-link-inactive cursor-pointer hidden lg:flex dark:hover:text-blue-400 hover:text-black">
              <h6 className="text-lg font-bold"> {t("category")}</h6>
              <ChevronDown className="mt-1 " />
            </div>
            <div className="block lg:hidden cursor-pointer text-link-active hover:text-black">
              <ChartBarStacked className="dark:hover:text-blue-400" />
            </div>
          </MenubarTrigger>
          <MenubarContent className="max-h-[40vh] overflow-y-auto max-w-[290px]">
            {mainCatgory?.map((item: IMainCategory) => (
              <MenubarItem key={item.id} asChild>
                <Link
                  href={`/sub-category/${item?.id}?MainCategoryNameEng=${item?.nameEng}&MainCategoryNameAr=${item?.nameAr}&MainCategoryNameAbree=${item?.nameAbree}`}
                  className="line-clamp-1"
                >
                  {locale === "en"
                    ? item?.nameEng
                    : locale === "ar"
                    ? item?.nameAr
                    : item?.nameAbree}
                </Link>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
