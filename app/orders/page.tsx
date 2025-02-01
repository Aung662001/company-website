"use client";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { CartContext } from "@/context/CartContext";
import { OrderFormData } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Order } from "../products/page";
import Divider from "@/components/Divider";
import Loading from "@/components/loading";
import { motion } from "framer-motion";

interface FinalOrder {
  orders: Order[];
  total_charge: number;
}
const defaultValues = {
  hospital_name: "",
  contact_person_name: "",
  phone: "",
  email: "",
  hospital_address: "",
  order_type: { id: 1, name: "Demo Order" },
};

const page = () => {
  const { cartItems, setCartItems, totalCharge } = useContext(CartContext);
  const [orderTypes] = useState([
    { id: 1, name: "Demo Order" },
    { id: 1, name: "Permanent Order" },
  ]);
  const [order, setOrder] = useState<FinalOrder>();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<OrderFormData>({ defaultValues: defaultValues });

  useEffect(() => {
    let json_orders =
      typeof window != "undefined"
        ? localStorage.getItem("monicare_hms_orders")
        : null;
    if (!json_orders) return;
    let data = JSON.parse(json_orders);
    setCartItems(data.orders);
    setOrder(data);
    console.log(data);
  }, []);

  const onSubmit = async (data: any) => {
    // we need to add total charges to data
    setLoading(true);
    data = {
      ...data,
      order_type_id: data.order_type.id,
      order_type_name: data.order_type.name,
      total_charge: order?.total_charge || 0,
    };
    try {
      const response_json = await fetch("/api/send_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await response_json.json();
      console.log(response.message || "Email sent successfully");
    } catch (error) {
      console.log("Failed to send email:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading loading={loading} />;
  }
  if (cartItems.length == 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col justify-center items-center h-screen gap-4"
      >
        <p className="w-[70%] text-center text-xl font-bold text-slate-600">
          Please chose your desired module that will need in you hospital and
          come back here to make order.
        </p>
        <a href="/products" className=" text-blue-600">
          Go To Products
        </a>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold text-center my-4 text-cyan-800">
        Hospital Management System (HMS) Order Form
      </p>
      <div className="grid grid-cols-10 mx-10 gap-4">
        <div className="lg:col-span-4 col-span-10  bg-cyan-200 shadow-lg pb-3">
          <p className="text-xl font-bold text-center">Your Order List</p>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems?.map((item, i) => (
              <div key={i} className="flex flex-row justify-between my-4 mx-4">
                <p className="text-blue-600">{item.module_name}</p>
                <p className="text-blue-800">{item.price} USD</p>
              </div>
            ))}
          <Divider />
          <div className="flex flex-row justify-between my-4 mx-4">
            <p className="text-xl text-blue-900">Total Charge</p>
            <p className="text-xl text-blue-900">{order?.total_charge} USD</p>
          </div>
          <Divider />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-6 bg-cyan-200 p-10 shadow-lg col-span-10 gap-3"
        >
          <Input<OrderFormData>
            rule={{
              required: "Hospital name field is required.",
              pattern: {
                value: /^[A-Za-z0-9\-_ ]+$/,
                message:
                  "Hospital name can only contain letters, numbers, hyphens, underscores, and spaces.",
              },
            }}
            register={register}
            name={"hospital_name"}
            label={"Hospital Name"}
            errors={errors}
          />
          <Input<OrderFormData>
            rule={{
              required: "Contact person field is required.",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message:
                  "Contact person name can only contain letters and spaces.",
              },
            }}
            register={register}
            name={"contact_person_name"}
            label={"Contact Person Name"}
            errors={errors}
          />
          <Input<OrderFormData>
            rule={{
              required: "Phone number field is required.",
              minLength: {
                value: 6,
                message: "Phone number must be at least 6 characters long.",
              },
              maxLength: {
                value: 15,
                message: "Phone number cannot exceed 15 characters.",
              },
            }}
            register={register}
            name={"phone"}
            label={"Phone Number"}
            errors={errors}
          />
          <Input<OrderFormData>
            rule={{
              required: "Email field is required.",
              minLength: {
                value: 5,
                message: "Email must be at least 5 characters long.",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address.",
              },
            }}
            register={register}
            name={"email"}
            label={"Email"}
            errors={errors}
          />
          <Select
            errors={errors}
            label={"Order Type"}
            name={"hospital_address"}
            register={register}
            orderTypes={orderTypes}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-xl text-slate-300 bg-blue-500 px-3 py-2 flex w-full
          rounded-sm shadow-lg hover:shadow-xl hover:scale-[1.01] duration-500 ease-in "
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
