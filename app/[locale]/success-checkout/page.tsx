"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Link } from "@/i18n/navigation";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function SuccessCheckout() {
  const t = useTranslations("order");
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="flex items-center flex-col gap-[40px] w-[340px] md:w-[450px]">
        <div className="flex flex-col items-center justify-center gap-[30px]">
          <CheckCircle className="text-green-500 w-[80px] h-[80px]" />
          <h3 className="font-bold text-2xl text-center">
            {" "}
            {t("completeOrderSuccess")}
          </h3>
        </div>
        <Link href={"/orders"} className="w-full">
          <Button className="w-full font-bold cursor-pointer">
            {" "}
            {t("reviewOrder")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
