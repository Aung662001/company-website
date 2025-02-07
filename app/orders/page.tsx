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
import apperals from "@/data/apperals.json";

interface FinalOrder {
  orders: Order[];
  total: number;
  plan: { name: string };
}

const defaultValues = {
  hospital_name: "",
  contact_person_name: "",
  phone: "",
  email: "",
  hospital_address: "",
  order_type: { id: 1, name: "Demo Order" },
};

const Page = () => {
  const { cartItems, setCartItems, totalCharge } = useContext(CartContext);
  const [orderTypes] = useState([
    { id: 1, name: "Demo Order" },
    { id: 2, name: "Permanent Order" },
  ]);
  const [order, setOrder] = useState<FinalOrder>();
  const [loading, setLoading] = useState(false);
  const [agreeterm, setAgreeTerm] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<OrderFormData>({ defaultValues });

  useEffect(() => {
    let json_orders =
      typeof window != "undefined"
        ? localStorage.getItem("monicare_hms_orders")
        : null;
    if (!json_orders) return;
    let data = JSON.parse(json_orders);
    setCartItems(data.orders);
    setOrder(data);
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data = {
      ...data,
      order_type_id: data.order_type.id,
      order_type_name: data.order_type.name,
      total_charge: order?.total || 0,
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

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col justify-center items-center h-screen gap-4"
      >
        <p className="w-[70%] text-center text-xl font-bold text-slate-600">
          Please choose your desired module that will be needed in your hospital
          and come back here to make an order.
        </p>
        <a href="/products" className="text-blue-600 hover:underline">
          Go To Products
        </a>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center my-6 text-cyan-800"
      >
        Hospital Management System (HMS) Order Form
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-yellow-50 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold text-center mb-4">Your Order List</h2>
          <Divider />
          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between my-4">
              <p className="text-blue-600 text-sm">
                {i + 1}. {item.module_name}
                <br />({item.module_name_myanmar})
              </p>
              <p className="text-blue-800 text-sm">
                {item.price} USD / {order?.plan?.name}
              </p>
            </div>
          ))}
          <Divider />
          <div className="flex justify-between my-4">
            <p className="text-xl text-blue-900">Total Charge</p>
            <p className="text-xl text-blue-900">
              {order?.total} USD / {order?.plan?.name}
            </p>
          </div>
          <Divider />
        </motion.div>

        {/* Order Form */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
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
            label={"Hospital Name (ဆေးရုံအမည်)"}
            icon={"🏩"}
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
            label={"Contact Person Name (ဆက်သွယ်ရမည့်သူ)"}
            icon={"🧑‍⚕️"}
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
            label={"Phone (ဆက်သွယ်ရန် ဖုန်းနံပါတ်)"}
            icon={"📱"}
            errors={errors}
          />
          <Input<OrderFormData>
            rule={{
              required: "Email field is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address.",
              },
            }}
            register={register}
            name={"email"}
            label={"Email (အီးမေးလ်)"}
            icon={"📧"}
            errors={errors}
          />
          <Select
            errors={errors}
            label={"Order Type (အော်ဒါ ပုံစံ)"}
            name={"order_type"}
            register={register}
            orderTypes={orderTypes}
            icon={"📝"}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="aggree_term_check"
              checked={agreeterm}
              onChange={() => setAgreeTerm(!agreeterm)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="aggree_term_check" className="text-sm text-gray-700">
              I have read the apperals carefully.<br />
              ပန်ကြားချက်များကို သေချာဖတ်ပြီးပါပြီ။
            </label>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!agreeterm}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
              agreeterm ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            📤 Submit Order
          </motion.button>
        </motion.form>

        {/* Apperals Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-green-50 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold text-center mb-4">
            A Request To Our Valued Customers (မေတ္တာရပ်ခံချက်)
          </h2>
          <Divider />
          {apperals.map((apperal, i) => (
            <div key={i} className="my-4">
              <p className="text-green-700">✅ {apperal.en}</p>
              <p className="text-green-600">{apperal.mm}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Page;