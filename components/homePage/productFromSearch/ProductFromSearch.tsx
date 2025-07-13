"use client";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/types/product/IProduct";
import { useTranslations } from "next-intl";
import { request } from "@/axios/axios";
import SkeletonCategory from "../MainCategory/SkeletonCategory";
import CardProduct from "../ProductMoreSales/CardProduct";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function ProductFromSearch() {
  const t = useTranslations("home.productFromSearch");
  const searchParams = useSearchParams();
  const nameProduct = searchParams.get("name");
  const router = useRouter();
  const pathname = usePathname();
  const [products, setProducts] = React.useState<{ rows: IProduct[] }>({
    rows: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await request.post(
          `/Items/GetAllItemByName?Name=${nameProduct}`,
          {
            listRelatedObjects: ["ViewImgs"],
            paginationInfo: {
              pageIndex: 0,
              pageSize: 20,
            },
          }
        );
        setProducts(response?.data);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [nameProduct]);
  const hanleClearSearch = () => {
    router.replace(pathname);
  };
  return (
    <div className="w-full pb-6 min-h-[300px]">
      <div className="px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-7 items-center">
          <div className="relative">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-section-header">
              {t("resultSearch")},{" "}
              <Button
                className="text-sm cursor-pointer"
                onClick={hanleClearSearch}
              >
                {t("clearSearch")}
              </Button>
            </h4>
            <div className="absolute bg-link-active/20 w-[150px] h-[20px] -z-10 bottom-0 top-1/2 left-0"></div>
          </div>
          {loading ? (
            <SkeletonCategory />
          ) : products?.rows?.length === 0 ? (
            <div className="flex jusify-center items-center min-h-[200px] text-2xl md:text-3xl text-center text-blue-500">
              {t("notFoundProductForName")} : {nameProduct}
            </div>
          ) : (
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
              {products?.rows
                ?.filter((e: IProduct) => e?.isShow === true)
                .map((product: IProduct) => (
                  <CardProduct
                    key={product.id}
                    product={product}
                    type={"sub"}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
