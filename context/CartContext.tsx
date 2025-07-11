"use client";

import { useTranslations } from "next-intl";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
type CartItem = {
  id: string | number;
  idSize: string | number | null;
  idColor: string | number | null;
  nameAr: string;
  nameEng: string;
  nameAbree: string;
  normailPrice: number;
  priceForColor: number;
  quantity: number;
  discount: number;
  quantityForColor: number;
  image?: string;
  isOrderSize: boolean;
  normailStock: number;
  stockForColor: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "quantityForColor">) => void;
  removeFromCart: (id: string | number, type?: string) => void;
  increaseQty: (id: string | number, stock: number, type?: string) => void;
  decreaseQty: (id: string | number, type?: string) => void;
  getItemById: (id: string | number, type?: string) => CartItem | undefined;
  clearCart: () => void;
  isInCart: (id: string | number, type?: string) => boolean;
  initialized: boolean;
  totalItems: number;
  totalPriceWithDiscount: number;
  totalPriceWithOutDiscount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  const t = useTranslations("context");
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, initialized]);

  const addToCart = (item: Omit<CartItem, "quantity" | "quantityForColor">) => {
    setCart((prev) => {
      if (item?.isOrderSize === false) {
        return [...prev, { ...item, quantity: 1, quantityForColor: 0 }];
      } else {
        return [...prev, { ...item, quantity: 0, quantityForColor: 1 }];
      }
    });
    toast.info(t("addProductToCartSuccess"));
  };

  const removeFromCart = (id: string | number, type?: string) => {
    if (type && type === "color") {
      setCart((prev) => prev.filter((item) => item.idColor !== id));
    } else {
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
    toast.info("removeProductFromCartSuccess");
  };
  const increaseQty = (id: string | number, stock: number, type?: string) => {
    let canIncrease = false;

    setCart((prev) =>
      prev.map((item) => {
        if (type === "color" && item.idColor === id) {
          if (item.quantityForColor < stock) {
            canIncrease = true;
            return { ...item, quantityForColor: item.quantityForColor + 1 };
          }
          return item;
        }

        if ((!type || type === "normail") && item.id === id) {
          if (item.quantity < stock) {
            canIncrease = true;
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }

        return item;
      })
    );
    setTimeout(() => {
      if (canIncrease) {
        toast.info(t("increaseQty"));
      } else {
        toast.error(t("quantityReuiredNotFoundInStock"));
      }
    }, 0);
  };

  const decreaseQty = (id: string | number, type?: string) => {
    let decreased = false;

    setCart((prev) => {
      return prev.map((item) => {
        if (type === "color" && item.idColor === id) {
          const oldQty = item.quantityForColor || 1;
          const newQty = Math.max(1, oldQty - 1);
          if (newQty < oldQty) decreased = true;
          return { ...item, quantityForColor: newQty };
        }

        if ((!type || type === "normail") && item.id === id) {
          const oldQty = item.quantity || 1;
          const newQty = Math.max(1, oldQty - 1);
          if (newQty < oldQty) decreased = true;
          return { ...item, quantity: newQty };
        }

        return item;
      });
    });

    // بعد setCart (في نفس الرفرفة) نعرض التوست
    setTimeout(() => {
      if (decreased) toast.info(t("decreaseQty"));
    }, 0);
  };

  const getItemById = (
    id: string | number,
    type?: string
  ): CartItem | undefined => {
    if (type && type === "color") {
      return cart.find((item) => item.idColor === id);
    } else {
      return cart.find((item) => item.id === id);
    }
  };

  const clearCart = () => {
    setCart([]);
    // toast.info("تم مسح عربة التسوق");
    localStorage.removeItem("cart");
  };
  const isInCart = (id: string | number, type?: string): boolean => {
    if (type && type === "color") {
      return cart.some((item) => item.idColor === id);
    } else {
      return cart.some((item) => item.id === id);
    }
  };

  const totalItems = cart.reduce((sum, item) => {
    if (item.isOrderSize === true) {
      return sum + (item.quantityForColor || 0);
    } else {
      return sum + (item.quantity || 0);
    }
  }, 0);
  const totalPriceWithOutDiscount = cart.reduce((sum, item) => {
    const price = item.isOrderSize
      ? item.priceForColor > 0
        ? item.priceForColor
        : item.normailPrice
      : item.normailPrice;
    const quantity = item.isOrderSize
      ? item.quantityForColor || 0
      : item.quantity || 0;
    return sum + price * quantity;
  }, 0);

  const totalPriceWithDiscount = cart.reduce((sum, item) => {
    const price = item.isOrderSize
      ? item.priceForColor > 0
        ? item.priceForColor
        : item.normailPrice
      : item.normailPrice;
    const quantity = item.isOrderSize
      ? item.quantityForColor || 0
      : item.quantity || 0;
    const discount = item.discount || 0;
    return sum + (price - discount) * quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        getItemById,
        clearCart,
        isInCart,
        totalItems,
        totalPriceWithOutDiscount,
        totalPriceWithDiscount,
        initialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
