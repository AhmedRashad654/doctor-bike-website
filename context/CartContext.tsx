"use client";

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
  quantityForColor: number;
  image?: string;
  isOrderSize: boolean;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "quantityForColor">) => void;
  removeFromCart: (id: string | number, type?: string) => void;
  increaseQty: (id: string | number, type?: string) => void;
  decreaseQty: (id: string | number, type?: string) => void;
  getItemById: (id: string | number, type?: string) => CartItem | undefined;
  clearCart: () => void;
  isInCart: (id: string | number, type?: string) => boolean;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity" | "quantityForColor">) => {
    setCart((prev) => {
      if (item?.isOrderSize === false) {
        return [...prev, { ...item, quantity: 1, quantityForColor: 0 }];
      } else {
        return [...prev, { ...item, quantity: 0, quantityForColor: 1 }];
      }
    });
    toast.info("تم إضافة المنتج إلى عربة التسوق");
  };

  const removeFromCart = (id: string | number, type?: string) => {
    if (type && type === "color") {
      setCart((prev) => prev.filter((item) => item.idColor !== id));
    } else {
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
    toast.info("تم حذف المنتج من عربة التسوق");
  };

  const increaseQty = (id: string | number, type?: string) => {
    if (type && type === "color") {
      setCart((prev) =>
        prev.map((item) =>
          item.idColor === id
            ? { ...item, quantityForColor: item.quantityForColor + 1 }
            : item
        )
      );
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }

    toast.info("تم زيادة الكمية");
  };

  const decreaseQty = (id: string | number, type?: string) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) => {
        if (type === "color") {
          if (item.idColor === id) {
            return {
              ...item,
              quantityForColor: Math.max(1, (item.quantityForColor || 1) - 1),
            };
          }
          return item;
        } else {
          if (item.id === id) {
            return {
              ...item,
              quantity: Math.max(1, (item.quantity || 1) - 1),
            };
          }
          return item;
        }
      });

      const oldItem = prev.find((item) =>
        type === "color" ? item.idColor === id : item.id === id
      );
      const newItem = updatedCart.find((item) =>
        type === "color" ? item.idColor === id : item.id === id
      );

      const oldQty =
        type === "color" ? oldItem?.quantityForColor : oldItem?.quantity;
      const newQty =
        type === "color" ? newItem?.quantityForColor : newItem?.quantity;

      if (oldItem && newItem && newQty! < oldQty!) {
        toast.info("تم تقليل الكمية");
      }

      return updatedCart;
    });
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

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.normailPrice * item.quantity,
    0
  );

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
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
