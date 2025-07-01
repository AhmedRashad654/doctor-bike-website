"use client";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";
import { Star } from "lucide-react";
import prodictImage from "@/public/product.png";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export default function CardProduct({
  index,
  type,
}: {
  index: number;
  type?: string | string[];
}) {
  const locale = useLocale();
  const params = useParams();
  const id = params.id;
  
  return (
    <Link
      href={
        type
          ? `/product/${index}?subCategoryName=${type}&subCategoryId=${id}`
          : `/product/${index}`
      }
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: locale === "ar" ? -50 : 50 },
          show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
        className={cn(
          "min-h-[200px] bg-card rounded-lg flex flex-col gap-2 p-3",
          type && "dark:bg-gray-800"
        )}
      >
        <div className="flex flex-end">
          <p
            className={cn(
              "bg-link-active dark:bg-link-active/20 w-[100px] h-[30px] text-center p-1 text-white font-bold text-sm",
              locale === "ar" ? "rounded-l-full" : "rounded-r-full"
            )}
          >
            20% خصم
          </p>
        </div>
        <div className="flex justify-center items-center max-h-[100px] w-full">
          <Image
            src={prodictImage}
            alt="prodictImage"
            width={100}
            height={100}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-link-active dark:text-blue-600">
            قطع غيار
          </p>
          <div className="flex gap-1 font-semibold items-center">
            <Star className="text-yellow-400 w-5 h-5" />
            <p>4.8</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-sm font-bold">عجلة محرك</p>
          <p className="text-sm font-semibold">50$</p>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-sm"> متبقي 3 قطع</p>
          <button className="flex items-center gap-2 bg-link-active dark:bg-link-active/20 text-center py-1 px-3 text-white rounded-md font-bold text-sm cursor-pointer">
            اضافة
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
