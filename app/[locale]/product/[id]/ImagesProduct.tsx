"use client";
import Image from "next/image";
import React, { useRef } from "react";
import product from "@/public/slide1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { NavigationOptions } from "swiper/types";

export default function ImagesProduct() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-8 items-center">
      <Image
        src={product}
        alt="product"
        width={500}
        height={500}
        className="aspect-video rounded-lg"
      />
      <div className="min-h-[80px] relative max-w-md mx-auto">
        <div className="flex justify-between w-[calc(100%+50px)] absolute -top-7 translate-x-[25px] translate-y-[45px] gap-2">
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
          {[...Array(10)].map((_, i) => (
            <SwiperSlide key={i} style={{ width: "80px", height: "80px" }}>
              <Image
                src={product}
                alt={`product-${i}`}
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
