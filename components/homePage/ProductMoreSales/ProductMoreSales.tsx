import React from "react";
import CardProduct from "./CardProduct";
import ButtonPagination from "@/components/pagination/ButtonBagination";
import TriangleProduct from "./TriangleProduct";

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

          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 6].map((e, i) => (
              <CardProduct key={i} index={i} />
            ))}
          </div>
          <div className="flex justify-end w-full">
            <ButtonPagination meta={{ totalPages: 6 }} />
          </div>
        </div>
      </div>
      <TriangleProduct />
    </div>
  );
}
