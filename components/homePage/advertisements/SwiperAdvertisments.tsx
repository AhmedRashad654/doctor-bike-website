"use client";
import { url } from "@/axios/axios";
import { IAdvertisements } from "@/types/advertisements/IAdvertisements";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function SwiperAdvertisments({
  data,
}: {
  data: IAdvertisements[];
}) {
  const t = useTranslations("home.advertisements");
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      className="w-full shadow-xl border-2 dark:border-1 border-blue-200 dark:border-blue-500 rounded-lg"
    >
      {data?.map((item: IAdvertisements) => (
        <SwiperSlide key={item.id}>
          <div className="flex flex-col rounded-lg justify-center items-center overflow-hidden">
            <Image
              src={`${url}${item.imgUrl}`}
              alt={item.title}
              className="w-full md:w-1/3 h-auto object-cover"
              width={100}
              height={50}
            />
            <div className="p-4 flex flex-col  w-full justify-between">
              <h3 className="text-2xl font-bold mb-2 z-50">{item?.title}</h3>
              <p className="text-md text-gray-300 mb-4 z-50">
                {item?.description}
              </p>
              <a
                href={item?.urlAds}
                target="_blank"
                className="text-blue-500 font-semibold underline self-start z-50"
              >
                {t("visitAd")}
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
