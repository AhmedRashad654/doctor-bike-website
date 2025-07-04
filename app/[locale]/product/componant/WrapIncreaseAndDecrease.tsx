"use client";
import React from "react";
import IncreaseAndDecrease from "./IncreaseAndDecrease";
import { useCart } from "@/hooks/useCart";

export default function WrapIncreaseAndDecrease() {
  const { increaseQty, decreaseQty, getItemById, isInCart } = useCart();
  const quantityItem = getItemById("5");
  if (!isInCart("5")) return;
  return (
    <IncreaseAndDecrease
      quantity={quantityItem?.quantity || 0}
      onIncrease={() => increaseQty("5")}
      onDecrease={() => decreaseQty("5")}
    />
  );
}
