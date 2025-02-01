"use client";
import { Order } from "@/app/products/page";
import { createContext } from "react";

export type CartContextType = {
  cartItems: Order[];
  setCartItems: React.Dispatch<React.SetStateAction<Order[]>>;
  totalCharge: number;
};
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  totalCharge: 0,
});
