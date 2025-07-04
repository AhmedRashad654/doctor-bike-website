"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Send, ShoppingCart } from "lucide-react";
import { useLocale } from "next-intl";
import React from "react";

export default function PartAddComment() {
  const locale = useLocale();
  return (
    <div className="flex gap-3 flex-wrap items-center justify-between mt-2">
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-md">
        <Input type="text" placeholder="اضافة راي ..." className="p-5" />
        <button
          className={cn(
            "absolute  top-1/2 -translate-y-1/2",
            locale === "ar" ? "left-3" : "right-3"
          )}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      <Button className="flex items-center gap-2 justify-center w-full sm:w-[200px] cursor-pointer dark:bg-gray-600 text-white transition duration-300 hover:scale-[1.1]">
        <p>اضافة لعربة التسوق</p>
        <ShoppingCart className="w-4 h-4" />
      </Button>
    </div>
  );
}
