import { GetAdvertisments } from "@/services/advertisements/advertisements";
import { getTranslations } from "next-intl/server";
import React from "react";
import SwiperAdvertisments from "./SwiperAdvertisments";
import TriangleAdvirtisements from "./TriangleAdvirtisements";

export default async function Advertisements() {
  const t = await getTranslations("home.advertisements");
  const data = await GetAdvertisments();
  return (
    <div>
      <TriangleAdvirtisements />
      <div className="w-full pt-6 pb-10">
        <div className="px-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-7 items-center">
            <div className="relative z-20">
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-section-header">
                {t("title")}
              </h4>
              <div className="absolute bg-link-active/20 w-[100px] h-[20px] z-10 bottom-0 top-1/2 left-0"></div>
            </div>
            <SwiperAdvertisments data={data?.rows} />
          </div>
        </div>
        {/* <TriangleCategory /> */}
      </div>
    </div>
  );
}
