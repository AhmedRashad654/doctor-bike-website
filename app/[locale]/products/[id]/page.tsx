import PartProducts from "@/components/homePage/ProductMoreSales/PartProducts";
import React from "react";
export type Params = Promise<{ id: string }>;
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

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
        <PartProducts type={subCategory} />
      </div>
    </div>
  );
}
