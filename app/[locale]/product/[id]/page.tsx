import React from "react";
import PartBack from "./PartBack";
import ImagesProduct from "./ImagesProduct";

export default function Product() {
  return (
    <div className="min-h-[200px] pt-[120px] pb-[50px] md:pt-[150px] w-full px-4 bg-card">
      <div className="max-w-7xl mx-auto flex flex-col gap-7">
        <PartBack />
        <ImagesProduct />
      </div>
    </div>
  );
}
