"use client";

import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/Navbar";
import { Inter, Roboto_Mono, Poppins } from "next/font/google";
import { useState } from "react";
import { Order } from "./products/page";
import { CartContext } from "@/context/CartContext";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/context/ConfigureStore";

// Configure the font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono", // For use with CSS variables
});

const poppins = Poppins({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartItems, setCartItems] = useState<Order[]>([]);
  const [totalCharge, setTotalCharge] = useState(0);
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <body className={`${poppins.className} bg-slate-100 text-gray-700 `}>
        <Provider store={store}>
          <CartContext.Provider
            value={{ cartItems, setCartItems, totalCharge }}
          >
            <NavBar />
            <main>{children}</main>
          </CartContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
