import React from "react";
import { getTranslations } from "next-intl/server";
import CardProduct from "./CardProduct";
import { GetProductMoreSales } from "@/services/products/products";
import { IProduct } from "@/types/product/IProduct";
import ButtonPagination from "@/components/pagination/ButtonBagination";

export default async function ProductMoreSales({
  page,
}: {
  page: string | string[];
}) {
  const t = await getTranslations("home.productMoreSales");
  const data = await GetProductMoreSales(page);
  return (
    <div className="w-full bg-card pb-6">
      <div className="px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-7 items-center">
          <div className="relative">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-section-header">
              {t("moreSales")}
            </h4>
            <div className="absolute bg-link-active/20 w-[150px] h-[20px] -z-10 bottom-0 top-1/2 left-0"></div>
          </div>
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
            {data?.rows?.map((product: IProduct) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-end w-full">
            <ButtonPagination
              totalPages={data?.paginationInfo?.totalPagesCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
