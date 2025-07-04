"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { Send, ShoppingCart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

export default function PartAddComment() {
  const t = useTranslations("singleProduct");
  const { isInCart, addToCart, removeFromCart } = useCart();
  const locale = useLocale();
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
      {isInCart("5") ? (
        <Button
          className="flex items-center gap-2 justify-center w-full sm:w-[200px] cursor-pointer dark:bg-gray-600 text-white"
          onClick={() => removeFromCart("5")}
        >
          <p> {t("removeFromCart")}</p>
          <ShoppingCart className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          className="flex items-center gap-2 justify-center w-full sm:w-[200px] cursor-pointer dark:bg-gray-600 text-white"
          onClick={() =>
            addToCart({
              id: "5",
              name: "new product",
              price: 500,
              image: "/product.png",
            })
          }
        >
          <p> {t("addtoCart")}</p>
          <ShoppingCart className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
