import React from "react";
import TriangleCategory from "./TriangleCategory";
import { getTranslations } from "next-intl/server";
import { GetMainCategory } from "@/services/mainCategory/mainCategory";
import CardMainCategory from "./CardMainCategory";
import { IMainCategory } from "@/types/mainCateroty/IMainCategory";

export default async function MainCategory() {
  const t = await getTranslations("home.mainCategory");
  const data = await GetMainCategory();

  return (
    <div className="w-full" id="category">
      <div className="px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-7 items-center">
          <div className="relative z-20">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-section-header">
              {t("category")}
            </h4>
            <div className="absolute bg-link-active/20 w-[100px] h-[20px] z-10 bottom-0 top-1/2 left-0"></div>
          </div>
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
            {data?.rows?.map((category: IMainCategory) => (
              <CardMainCategory key={category?.id} category={category} type="main" />
            ))}
          </div>
        </div>
      </div>
      <TriangleCategory />
    </div>
  );
}
