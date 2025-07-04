"use client";

import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  getItemById: (id: string) => CartItem | undefined;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
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

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    toast.info("تم إضافة المنتج إلى عربة التسوق");
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info("تم حذف المنتج من عربة التسوق");
  };

  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.info("تم زيادة الكمية");
  };

  const decreaseQty = (id: string) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

      const oldItem = prev.find((item) => item.id === id);
      const newItem = updatedCart.find((item) => item.id === id);

      if (oldItem && newItem && newItem.quantity < oldItem.quantity) {
        toast.info("تم تقليل الكمية");
      }

      return updatedCart;
    });
  };

  const getItemById = (id: string): CartItem | undefined =>
    cart.find((item) => item.id === id);

  const clearCart = () => {
    setCart([]);
    // toast.info("تم مسح عربة التسوق");
    localStorage.removeItem("cart");
  };
  const isInCart = (id: string): boolean => {
    return cart.some((item) => item.id === id);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
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
