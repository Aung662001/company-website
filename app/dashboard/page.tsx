"use client"
import React ,{useState} from "react";
import {  RootState } from "@/context/ConfigureStore";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const page = () => {
  const { isLogin,role } = useSelector((state: RootState) => state.auth);
  const [orders,setOrders] = useState([])
//   if (!isLogin) {
//     redirect("/login");
//   }
  return <div className="flex flex-col justify-center items-center">
    <p className="font-3xl text-slate-600 text-center my-4">Orders </p></div>;
};

export default page;
