import CardProduct from "@/components/homePage/ProductMoreSales/CardProduct";
import ButtonPagination from "@/components/pagination/ButtonBagination";
import { GetProductsBySubId } from "@/services/products/products";
import { IProduct } from "@/types/product/IProduct";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
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
  // locale
  const locale = await getLocale();
  // search params
  const resultSearchParams = await searchParams;
  const resultParams = await params;
  // Name main category from search params
  const SubCategory =
    locale === "en"
      ? resultSearchParams.subCategoryNameEng
      : locale === "ar"
      ? resultSearchParams.subCategoryNameAr
        : resultSearchParams.subCategoryNameAbree ?? "";
  const page = resultSearchParams.page ?? "1";
  // check is id found
  if (!resultParams.id) return notFound();
  // get data
  const data = await GetProductsBySubId(resultParams.id, page);
  return (
    <div className="min-h-screen py-4 md:py-10 w-full px-4 pb-10 dark:bg-card">
      <div className="max-w-7xl mx-auto flex flex-col gap-7">
        <div className="relative w-fit">
          <h4 className="font-bold center text-2xl md:text-3xl">
            {SubCategory}{" "}
          </h4>
          <div className="absolute bg-link-active/20 w-[100px] h-[20px] z-10 bottom-0 top-1/2 left-0"></div>
        </div>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
          {data?.rows?.map((product: IProduct) => (
            <CardProduct
              key={product.id}
              product={product}
              type={"sub"}
              subCategory={SubCategory}
            />
          ))}
        </div>
        <ButtonPagination totalPages={data?.paginationInfo?.totalPagesCount} />
      </div>
    </div>
  );
}
