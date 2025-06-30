import React from "react";
import CardMainCategory from "./CardMainCategory";

export default function MainCategory() {
  return (
    <div className="w-full bg-card pb-10">
      <div className="px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-7 items-center">
          <div className="relative z-20">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-section-header">
              الاقسام
            </h4>
            <div className="absolute bg-link-active/20 w-[100px] h-[20px] z-10 bottom-0 top-1/2 left-0">
            </div>
          </div>

          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 5].map((e, i) => (
              <CardMainCategory key={i} index={i} type="main" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
