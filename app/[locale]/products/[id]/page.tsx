import CardProduct from "@/components/homePage/ProductMoreSales/CardProduct";
import React from "react";
export type Params = Promise<{ id: string }>;
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Products({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const resultSearchParams = await searchParams;
  const resultParams = await params;
  const subCategory = resultSearchParams.subCategoryName ?? "";
  console.log(resultParams.id);
  return (
    <div className="min-h-[200px] pt-[120px] md:pt-[150px] w-full px-4 pb-10 dark:bg-card">
      <div className="max-w-7xl mx-auto flex flex-col gap-7">
        <div className="relative w-fit">
          <h4 className="font-bold center text-2xl md:text-3xl">
            {subCategory}{" "}
          </h4>
          <div className="absolute bg-link-active/20 w-[100px] h-[20px] z-10 bottom-0 top-1/2 left-0"></div>
        </div>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => (
            <CardProduct key={i} index={i} type="forSub" />
          ))}
        </div>
      </div>
    </div>
  );
}
