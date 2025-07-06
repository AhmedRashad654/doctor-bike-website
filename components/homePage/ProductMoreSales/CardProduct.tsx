"use client";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Star } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { IProduct } from "@/types/product/IProduct";
import { url } from "@/axios/axios";
import { formatCurrency } from "@/lib/formCurrency";
// import { useParams } from "next/navigation";

export default function CardProduct({
  product,
  type,
  subCategory,
}: {
  product: IProduct;
  type?: string | string[];
  subCategory?: string | string[];
}) {
  const locale = useLocale();
  const t = useTranslations("home.productMoreSales");
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: locale === "ar" ? -50 : 50 },
          show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
        className={cn(
          "min-h-[200px] bg-white dark:bg-gray-800 rounded-lg flex flex-col gap-2 p-3 h-full",
          type && "bg-card  dark:bg-gray-800"
        )}
      >
        {product?.discount > 0 && (
          <div className="flex flex-end">
            <p
              className={cn(
                "bg-link-active dark:bg-link-active/20 w-[110px] h-[25px] text-center p-1 text-white font-bold text-xs",
                locale === "ar" ? "rounded-l-full" : "rounded-r-full"
              )}
            >
              {product?.discount} {t("discount")}
            </p>
          </div>
        )}

        <div className="flex justify-center items-center max-h-[100px] w-full">
          <Image
            src={`${url}${product?.viewImagesItems[0]?.imageUrl}`}
            alt="prodictImage"
            width={100}
            height={100}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-link-active dark:text-blue-600">
            {subCategory}
          </p>
          <div className="flex gap-1 font-semibold items-center">
            <p>{product.rate}</p>
            <Star className="text-yellow-400 w-5 h-5" />
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-sm font-bold line-clamp-1">
            {
              product[
                locale === "en"
                  ? "nameEng"
                  : locale === "ar"
                  ? "nameAr"
                  : "nameAbree"
              ]
            }
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product?.normailPrice)}
          </p>
        </div>
        <div className="w-full flex items-center justify-between gap-2 ">
          <p className="text-sm">
            {" "}
            {t("reset")} <span> </span>
            {product?.stock}
            <span> </span>
            {t("peace")}
          </p>
          <button className="flex items-center gap-2 bg-link-active dark:bg-link-active/20 text-center py-1 px-3 text-white rounded-md font-bold text-sm cursor-pointer hover:scale-[1.2] transition duration-300">
            {t("add")}
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
