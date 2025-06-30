"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import slide1 from "@/public/slide1.jpg";
import slide2 from "@/public/slide2.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import {
  NavigationOptions,
  PaginationOptions,
  Swiper as SwiperType,
} from "swiper/types";

export default function SwiperHeroSection() {
  const [showNav, setShowNav] = useState(false);
  const [showPagination, setShowPagination] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const timerNav = setTimeout(() => setShowNav(true), 2000);
    const timerPag = setTimeout(() => setShowPagination(true), 2000);
    return () => {
      clearTimeout(timerNav);
      clearTimeout(timerPag);
    };
  }, []);

  useEffect(() => {
    if (
      swiperRef.current &&
      showNav &&
      prevRef.current &&
      nextRef.current &&
      showPagination &&
      paginationRef.current
    ) {

      if (
        swiperRef.current.params.navigation &&
        typeof swiperRef.current.params.navigation !== "boolean"
      ) {
        const navigation = swiperRef.current.params
          .navigation as NavigationOptions;
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.destroy();
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }

      if (
        swiperRef.current.params.pagination &&
        typeof swiperRef.current.params.pagination !== "boolean"
      ) {
        const pagination = swiperRef.current.params
          .pagination as PaginationOptions;
        pagination.el = paginationRef.current;
        swiperRef.current.pagination.destroy();
        swiperRef.current.pagination.init();
        swiperRef.current.pagination.update();
      }
    }
  }, [showNav, showPagination]);

  return (
    <div className="min-h-[750px] relative">
      <Swiper
        loop={true}
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={slide1} alt="slide1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide2} alt="slide2" />
        </SwiperSlide>
      </Swiper>


      <div
        ref={prevRef}
        className={`swiper-button-prev transition-all duration-300 ${
          showNav
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        ref={nextRef}
        className={`swiper-button-next transition-all duration-300 ${
          showNav
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={paginationRef}
        className={`swiper-pagination transition-all duration-300 ${
          showPagination
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
}
