import React from "react";
import ButtonPagination from "@/components/pagination/ButtonBagination";
import TriangleProduct from "./TriangleProduct";
import PartProducts from "./PartProducts";

export default function ProductMoreSales() {
  return (
    <div className="w-full mt-5">
      <div className="px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-7 items-center">
          <div className="relative">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-section-header">
              المنتجات الأكثر مبيعا
            </h4>
            <div className="absolute bg-link-active/20 w-[150px] h-[20px] -z-10 bottom-0 top-1/2 left-0"></div>
          </div>
          <PartProducts />
          <div className="flex justify-end w-full">
            <ButtonPagination meta={{ totalPages: 6 }} />
          </div>
        </div>
      </div>
      <TriangleProduct />
    </div>
  );
}
