"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types/product/IProduct";
import { Send, ShoppingCart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import React from "react";

export default function PartAddComment({ product }: { product: IProduct }) {
  const t = useTranslations("singleProduct");
  const { isInCart, addToCart, removeFromCart } = useCart();

  const locale = useLocale();
  const handleAddProductToCard = () => {
    if (product?.stock <= 0) return toast.error("لا توجد كمية حاليا");
    addToCart({
      id: product?.id,
      nameAr: product?.nameAr,
      nameEng: product?.nameEng,
      nameAbree: product?.nameAbree,
      normailPrice: product?.normailPrice,
      image: product?.viewImagesItems[0]?.imageUrl,
      isOrderSize: false,
      idSize: null,
      idColor: null,
      priceForColor: 0,
    });
  };
  return (
    <div className="flex gap-3 flex-wrap items-center justify-between mt-2">
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-md">
        <Input type="text" placeholder={t("addOpinion")} className="p-5" />
        <button
          className={cn(
            "absolute  top-1/2 -translate-y-1/2",
            locale === "ar" ? "left-3" : "right-3"
          )}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
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
