"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/types/product/IProduct";
import {  ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import React from "react";

export default function PartAddProductToCard({
  product,
}: {
  product: IProduct;
}) {
  const t = useTranslations("singleProduct");
  const { isInCart, addToCart, removeFromCart } = useCart();

  const handleAddProductToCard = () => {
    if (product?.stock <= 0) return toast.error("لا توجد كمية حاليا");
    addToCart({
      id: product?.id,
      nameAr: product?.nameAr,
      nameEng: product?.nameEng,
      nameAbree: product?.nameAbree,
      normailPrice: product?.normailPrice,
      image: product?.viewImagesItems[0]?.imageUrl,
      discount: product?.discount || 0,
      isOrderSize: false,
      idSize: null,
      idColor: null,
      priceForColor: 0,
      normailStock: product?.stock,
      stockForColor: 0,
    });
  };
  return (
    <div className="flex gap-3 flex-wrap items-center justify-between w-full sm:w-fit">
      {product?.itemSizes?.length === 0 &&
        (isInCart(product?.id) ? (
          <Button
            className="flex items-center gap-2 justify-center w-full sm:w-[200px] cursor-pointer dark:bg-gray-600 text-white"
            onClick={() => removeFromCart(product?.id)}
          >
            <p> {t("removeFromCart")}</p>
            <ShoppingCart className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            className="flex items-center gap-2 justify-center w-full sm:w-[200px] cursor-pointer dark:bg-gray-600 text-white"
            onClick={handleAddProductToCard}
          >
            <p> {t("addtoCart")}</p>
            <ShoppingCart className="w-4 h-4" />
          </Button>
        ))}
    </div>
  );
}
