import { IItemColor } from "@/types/product/IProduct";
import { useLocale } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";

export default function LinkColor({
  itemColor,
  selectedColor,
  setSelectedColor,
}: {
  itemColor: IItemColor;
  selectedColor: IItemColor;
  setSelectedColor: Dispatch<SetStateAction<IItemColor>>;
}) {
  const locale = useLocale();
  return (
    <div
      key={itemColor.id}
      className={`font-semibold text-sm cursor-pointer py-1 px-4 rounded-md text-center border transition min-w-full sm:min-w-[200px]
              ${
                selectedColor?.id === itemColor.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-300 dark:text-black"
                  : "border-gray-300 bg-white dark:text-gray-600  hover:border-blue-400"
              }`}
      onClick={() => setSelectedColor(itemColor)}
    >
      {locale === "en"
        ? itemColor.colorEn
        : locale === "ar"
        ? itemColor.colorAr
        : itemColor.colorAbbr}
    </div>
  );
}
