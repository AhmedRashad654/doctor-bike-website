import React from "react";
import PartMainCategory from "./PartMainCategory";
import TriangleCategory from "./TriangleCategory";
import { getTranslations } from "next-intl/server";


export default async function MainCategory() {
  const t = await getTranslations("home.mainCategory");
  return (
    <div className="w-full ">
      <div className="px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-7 items-center">
          <div className="relative z-20">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-section-header">
              {t("category")}
            </h4>
            <div className="absolute bg-link-active/20 w-[100px] h-[20px] z-10 bottom-0 top-1/2 left-0"></div>
          </div>

          <PartMainCategory type="main" />
        </div>
      </div>
      <TriangleCategory />
    </div>
  );
}
