"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";
import category from "@/public/category.jpg";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

export default function CardMainCategory({
  index,
  type,
}: {
  index: number;
  type: string;
}) {
  const locale = useLocale();
  return (
    <Link
      href={
        type === "main"
          ? `/sub-category/${index}?MainCategoryName=ضواو وكبسات ومزامير`
          : `/products/${index}?subCategoryName=ضواو وكبسات ومزامير`
      }
    >
      <motion.div
        initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: (index + 1) * 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="min-h-[200px] relative bg-white dark:bg-gray-800 rounded-lg flex flex-col gap-2 group"
      >
        <Image
          src={category}
          alt="prodictImage"
          width={100}
          height={100}
          className="h-[190px] w-full rounded-t-lg"
        />

        <div className="w-full flex items-center justify-center px-3 pb-2">
          <h4 className="font-bold center">ضواو وكبسات ومزامير </h4>
        </div>
        <div
          className="absolute bg-blue-300 rounded-lg w-full h-full z-0 top-0 left-0 
        scale-0 group-hover:scale-100 transition-transform duration-500 origin-center flex justify-center items-center p-2"
        >
          <h4 className="text-2xl font-bold text-center text-white">
            ضواو وكبسات ومزامير{" "}
          </h4>
        </div>
      </motion.div>
    </Link>
  );
}
