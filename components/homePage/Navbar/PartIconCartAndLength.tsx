"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/hooks/useCart";

export default function PartIconCartAndLength() {
  const { cart } = useCart();
  return (
    <Link href={"/cart"} className="relative">
      <div className="w-6 h-6 rounded-full flex justify-center items-center absolute -top-4 bg-red-400 left-1 text-black dark:text-white font-bold">
        {cart?.length}
      </div>
      <ShoppingCart className="cursor-pointer hover:text-black dark:hover:text-blue-400 transition duration-300" />
    </Link>
  );
}
