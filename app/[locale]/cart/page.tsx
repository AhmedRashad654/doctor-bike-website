"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import IncreaseAndDecrease from "../product/componant/IncreaseAndDecrease";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/formCurrency";
import Empty from "@/components/ui/Empty";
import emptyImage from "@/public/empty.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Delete } from "lucide-react";
import { url } from "@/axios/axios";
import { useLocale, useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooksRedux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    totalPriceWithOutDiscount,
    totalPriceWithDiscount,
    removeFromCart,
    totalItems,
  } = useCart();
  const user = useAppSelector((state) => state?.user?.data);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("cart");
  const goToCheckout = () => {
    if (!user?.id) {
      return toast.error(t("youMustLogin"));
    } else {
      router.push("/checkout");
    }
  };
  if (cart.length <= 0)
    return <Empty emptyImage={emptyImage} text={t("cart")} />;
  return (
    <div className="flex flex-col items-center gap-5 max-w-7xl py-6 md:py-10 mx-auto px-4">
      <h4 className="text-2xl font-bold"> {t("cart")}</h4>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
        {cart.map((item, i) => (
          <div
            key={i}
            className={cn(
              "min-h-[200px] bg-card rounded-lg flex flex-col gap-2 p-3"
            )}
          >
            {/* {item?.discount > 0 && ( */}
            <div className="flex flex-end">
              <p
                className={cn(
                  "bg-link-active dark:bg-link-active/20 w-[110px] h-[25px] text-center p-1 text-white font-bold text-xs",
                  locale === "ar" ? "rounded-l-full" : "rounded-r-full"
                )}
              >
                {item?.discount} {t("discount")}
              </p>
            </div>
            {/* )} */}
            <div className="flex justify-center items-center max-h-[120px] w-full">
              <Image
                src={`${url}${item?.image}` || ""}
                alt="productImage"
                width={120}
                height={120}
              />
            </div>
            <div className="w-full flex items-center justify-between gap-2">
              <p className="text-sm font-bold line-clamp-1">
                {locale === "ar"
                  ? item?.nameAr
                  : locale === "en"
                  ? item?.nameEng
                  : item?.nameAbree}
              </p>
              <p className="text-sm font-semibold text-link-active">
                {item?.isOrderSize === true
                  ? formatCurrency(item?.priceForColor)
                  : formatCurrency(item?.normailPrice)}
              </p>
            </div>
            <div className="w-full flex items-center justify-between gap-2">
              <p className="text-sm"> {t("totalItems")} </p>
              <IncreaseAndDecrease
                quantity={
                  item?.isOrderSize === true
                    ? item.quantityForColor
                    : item.quantity
                }
                onIncrease={() =>
                  item?.isOrderSize === true
                    ? increaseQty(item.idColor!, item?.stockForColor, "color")
                    : increaseQty(item.id!, item?.normailStock)
                }
                onDecrease={() =>
                  item?.isOrderSize === true
                    ? decreaseQty(item.idColor!, "color")
                    : decreaseQty(item.id)
                }
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-red-500 dark:bg-red-600 text-center py-1 px-3 text-white rounded-md font-bold text-sm cursor-pointer"
              onClick={() =>
                item?.isOrderSize === true
                  ? removeFromCart(item.idColor!, "color")
                  : removeFromCart(item.id)
              }
            >
              {t("remove")}
              <Delete className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full md:w-[340px] shadow-lg dark:shadow-white/10 p-4 rounded-md border border-blue-300 dark:border-blue-500">
        <div className="w-full flex items-center justify-between gap-2">
          <p> {t("totalItems")} </p>
          <p className="text-sm font-semibold text-link-active">
            {totalItems} {"item"}
          </p>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p> {t("totalPrice")} </p>
          <p className="text-sm font-semibold text-link-active">
            {formatCurrency(totalPriceWithOutDiscount)}
          </p>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p> {t("totalPriceAfterDiscount")} </p>
          <p className="text-sm font-semibold text-link-active">
            {formatCurrency(totalPriceWithDiscount)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {" "}
          {t("priceWithOutDilivary")}
        </p>
        <Button className="w-full cursor-pointer" onClick={goToCheckout}>
          {t("goToCheckout")}
        </Button>
      </div>
    </div>
  );
}
