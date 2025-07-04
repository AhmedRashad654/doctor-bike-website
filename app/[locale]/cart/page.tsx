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
import { Link } from "@/i18n/navigation";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    totalPrice,
    removeFromCart,
    totalItems,
  } = useCart();

  if (cart.length <= 0)
    return <Empty emptyImage={emptyImage} text={"عربة التسوق"} />;
  return (
    <div className="flex flex-col items-center gap-5 max-w-7xl pt-32 md:pt-36 mx-auto px-4 pb-4">
      <h4 className="text-2xl font-bold">عربة التسوق</h4>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between">
        {cart.map((item) => (
          <div
            key={item.id}
            className={cn(
              "min-h-[200px] bg-card rounded-lg flex flex-col gap-2 p-3"
            )}
          >
            <div className="flex justify-center items-center max-h-[120px] w-full">
              <Image
                src={item?.image || ""}
                alt="productImage"
                width={120}
                height={120}
              />
            </div>
            <div className="w-full flex items-center justify-between gap-2">
              <p className="text-sm font-bold">{item?.name}</p>
              <p className="text-sm font-semibold text-link-active">
                {formatCurrency(item?.price)}
              </p>
            </div>
            <div className="w-full flex items-center justify-between gap-2">
              <p className="text-sm">عدد القطع </p>
              <IncreaseAndDecrease
                quantity={item.quantity}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-red-500 dark:bg-red-600 text-center py-1 px-3 text-white rounded-md font-bold text-sm cursor-pointer"
              onClick={() => removeFromCart(item.id)}
            >
              ازالة
              <Delete className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full md:w-[340px] shadow-lg dark:shadow-white/10 p-4 rounded-md">
        <div className="w-full flex items-center justify-between gap-2">
          <p> عدد القطع </p>
          <p className="text-sm font-semibold text-link-active">
            {totalItems} قطع
          </p>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p>السعر الاجمالي </p>
          <p className="text-sm font-semibold text-link-active">
            {formatCurrency(totalPrice)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">السعر غير شامل التوصيل</p>
        <Link href={"/checkout"}>
          <Button className="w-full cursor-pointer">
            الانتقال الي الدفع
          </Button>
        </Link>
      </div>
    </div>
  );
}
