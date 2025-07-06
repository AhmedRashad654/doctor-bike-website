import React from "react";
import { Params, SearchParams } from "../../products/[id]/page";
import { ISubCategory } from "@/types/subCategory/ISubCategory";
import CardMainCategory from "@/components/homePage/MainCategory/CardMainCategory";
import { GetSubCategoryByMainId } from "@/services/subCategory/subcategory";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function SubCategory({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  // locale
  const locale = await getLocale();
  // search params
  const resultSearchParams = await searchParams;
  const resultParams = await params;
  // Name main category from search params
  const MainCategory =
    locale === "en"
      ? resultSearchParams.MainCategoryNameEng
      : locale === "ar"
      ? resultSearchParams.MainCategoryNameAr
      : resultSearchParams.MainCategoryNameAbree ?? "";
  // check is id found
  if (!resultParams.id) return notFound();
  // get data
  const data = await GetSubCategoryByMainId(resultParams.id);
  return (
    <div className="min-h-screen py-4 md:py-10 w-full px-4 pb-10 dark:bg-card">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="relative w-fit">
          <h4 className="font-bold center text-2xl md:text-3xl">
            {MainCategory}
          </h4>
          <div className="absolute bg-link-active/20 w-[100px] h-[20px] z-10 bottom-0 top-1/2 left-0"></div>
        </div>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
          {data?.rows
            ?.filter((e: ISubCategory) => e?.isShow === true)
            .map((subCategory: ISubCategory) => (
              <CardMainCategory
                key={subCategory?.id}
                category={subCategory}
                type="sub"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
