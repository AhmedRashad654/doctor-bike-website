"use client";
import React, { useState } from "react";
import TabSingleColors from "./TabSingleColors";
import { IProduct } from "@/types/product/IProduct";
import LinkColor from "./LinkColor";

export default function PartSelectSizeProduct({
  product,
}: {
  product: IProduct;
}) {
  const [selectedSize, setSelectedSize] = useState(product?.itemSizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(
    selectedSize?.itemSizeColor?.[0]
  );
  if (!selectedSize) return null;

  return (
    <div className="mb-6 w-full max-w-7xl">
      {/* Size selector */}
      <div className="w-full flex sm:flex-row flex-col-reverse gap-4 justify-between bg-gray-100 dark:bg-gray-800 rounded-md h-fit p-2">
        {product?.itemSizes?.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedSize(item);
              setSelectedColor(item.itemSizeColor?.[0] ?? "");
            }}
            className={`cursor-pointer text-sm font-bold w-full px-4 py-2 rounded-md text-center transition ${
              selectedSize?.id === item.id
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`}
          >
            {item.size}
          </button>
        ))}
      </div>

      {/* Colors */}
      <h4 className="text-center font-bold w-full mt-4 mb-2">
        الالوان المتاحة
      </h4>
      <div className="flex flex-wrap justify-between items-center gap-3">
        {selectedSize?.itemSizeColor?.map((itemColor) => (
          <LinkColor
            key={itemColor?.id}
            itemColor={itemColor}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        ))}
      </div>

      {/* Selected color details */}
      <div className="mt-4">
        <TabSingleColors
          selectedColor={selectedColor}
          product={product}
          selectedSize={selectedSize}
        />
      </div>
    </div>
  );
}
