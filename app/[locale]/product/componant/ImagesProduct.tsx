"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { NavigationOptions } from "swiper/types";
import { IImageProduct } from "@/types/product/IProduct";
import { url } from "@/axios/axios";

export default function ImagesProduct({
  normalImagesItems,
  DImagesItems,
  viewImagesItems,
}: {
  normalImagesItems: IImageProduct[];
  DImagesItems: IImageProduct[];
  viewImagesItems: IImageProduct[];
}) {
  const [stateImage, setStateImage] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const locale = useLocale();
  const images = [...normalImagesItems, ...DImagesItems, ...viewImagesItems];
  return (
    <div className="flex flex-col gap-8 items-center">
      <Image
        src={`${url}${images[stateImage]?.imageUrl}` || ""}
        alt="product"
        width={500}
        height={500}
        className="aspect-video rounded-lg object-contain max-h-[200px]"
      />
      <div className="min-h-[80px] relative max-w-md mx-auto">
        <div className="flex justify-between w-[calc(100%+70px)] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]  gap-2">
          <button
            ref={prevRef}
            aria-label="Previous"
            className="cursor-pointer"
          >
            {locale === "en" ? <ChevronLeft /> : <ChevronRight />}
          </button>
          <button ref={nextRef} aria-label="Next" className="cursor-pointer">
            {locale === "en" ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        <Swiper
          slidesPerView="auto"
          modules={[Navigation]}
          spaceBetween={15}
          loop={true}
          centeredSlides={false}
          onBeforeInit={(swiper) => {
            (swiper.params.navigation as NavigationOptions).prevEl =
              prevRef.current;
            (swiper.params.navigation as NavigationOptions).nextEl =
              nextRef.current;
          }}
          className="mySwiper max-w-[290px] sm:max-w-md"
        >
          {images?.map((image: IImageProduct, index: number) => (
            <SwiperSlide
              key={image.id}
              style={{ width: "80px", height: "80px" }}
              onClick={() => setStateImage(index)}
            >
              <Image
                src={`${url}${image?.imageUrl}`}
                alt={`product-${image.id}`}
                width={120}
                height={80}
                className="object-cover rounded-md cursor-pointer z-[50]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
