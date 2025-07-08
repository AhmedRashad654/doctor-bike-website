"use client";
import React from "react";
import IncreaseAndDecrease from "./IncreaseAndDecrease";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/types/product/IProduct";

export default function WrapIncreaseAndDecrease({
  product,
}: {
  product: IProduct;
}) {
  const { increaseQty, decreaseQty, getItemById, isInCart } = useCart();
  const quantityItem = getItemById(product?.id);
  if (!isInCart(product?.id) || quantityItem?.isOrderSize === true) return;
  return (
    <IncreaseAndDecrease
      quantity={quantityItem?.quantity || 0}
      onIncrease={() => increaseQty(product?.id, product?.stock, "normail")}
      onDecrease={() => decreaseQty(product?.id)}
    />
  );
}
