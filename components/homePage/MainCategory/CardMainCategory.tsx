"use client";
import Image from "next/image";
import React from "react";
import { Link } from "@/i18n/navigation";
import { IMainCategory } from "@/types/mainCateroty/IMainCategory";
import { url } from "@/axios/axios";
import { useLocale } from "next-intl";
import { ISubCategory } from "@/types/subCategory/ISubCategory";

export default function CardMainCategory({
  category,
  type,
}: {
  category: IMainCategory | ISubCategory;
  type: string;
}) {
  const locale = useLocale();
  return (
    <Link
      href={
        type === "main"
          ? `/sub-category/${category?.id}?MainCategoryNameEng=${category?.nameEng}&MainCategoryNameAr=${category?.nameAr}&MainCategoryNameAbree=${category?.nameAbree}`
          : `/products/${category?.id}?subCategoryNameEng=${category?.nameEng}&subCategoryNameAr=${category?.nameAr}&subCategoryNameAbree=${category?.nameAbree}`
      }
    >
      <div className="min-h-[250px] 2xl:min-h-[200px] xl:min-h-[220px] relative bg-card dark:bg-gray-800 rounded-lg flex flex-col gap-2 group h-full">
        <Image
          src={`${url}${category?.imageUrl}`}
          alt="prodictImage"
          width={100}
          height={100}
          className="2xl:h-[190px] xl:h-[210px] h-[240px] w-full rounded-t-lg"
        />

        <div className="w-full flex items-center justify-center px-3 pb-2">
          <h4 className="font-bold text-center">
            {
              category[
                locale === "en"
                  ? "nameEng"
                  : locale === "ar"
                  ? "nameAr"
                  : "nameAbree"
              ]
            }{" "}
          </h4>
        </div>
        <div
          className="absolute bg-blue-300 rounded-lg w-full h-full z-0 top-0 left-0 
        scale-0 group-hover:scale-100 transition-transform duration-500 origin-center flex justify-center items-center p-2"
        >
          <h4 className="text-2xl font-bold text-center text-white">
            {
              category[
                locale === "en"
                  ? "nameEng"
                  : locale === "ar"
                  ? "nameAr"
                  : "nameAbree"
              ]
            }
          </h4>
        </div>
      </div>
    </Link>
  );
}
