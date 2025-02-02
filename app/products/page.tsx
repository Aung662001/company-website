"use client";
import { Lobster } from "next/font/google";
import modules from "@/data/product_modules.json";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import plans from "@/data/plans.json";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import MotionDiv from "@/components/MotionDiv";
import { motion } from "framer-motion";

export interface Item {
  id: string;
  product_id: string;
  parent_id: string;
  module_name: string;
  module_name_myanmar: string;
  description: string;
  price1: string;
  price2: string;
  price3: string;
  price4: string;
  price5: string;
  logo_class_name: string;
  module_image: string;
}
export interface Plan {
  id: number;
  name: string;
}
export interface Order extends Item {
  plan: Plan;
  price: number;
}
const lobster = Lobster({
  weight: "400",
  subsets: ["cyrillic-ext"],
});

export default function Home() {
  const { cartItems, setCartItems, totalCharge } = useContext(CartContext);
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectCategoryItem, setSelectedCategoryItem] = useState<Item>(
    modules[0]
  );
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(cartItems);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const [total, setTotal] = useState(0);
  const addOrder = (item: Item) => {
    if (orders?.find((o) => o.id == item.id)) {
      alert("Already In Cart");
      return;
    }
    setOrders((prev = []): Order[] => {
      let price =
        selectedPlan.id == 1
          ? parseInt(item.price1)
          : selectedPlan.id == 2
          ? parseInt(item.price2)
          : selectedPlan.id == 3
          ? parseInt(item.price2) * 2
          : parseInt(item.price2) * 3;
      let new_order_obj = [...prev, { ...item, plan: selectedPlan, price }];
      calculateTotal(new_order_obj);
      return new_order_obj;
    });
  };
  const calculateTotal = (orders: Order[] | undefined) => {
    if (!orders) {
      setTotal(0);
      return;
    }
    let total = 0;
    orders.length &&
      orders?.forEach((o) => {
        total = total + o.price;
      });
    setTotal(total);
    return total;
    // setToLocal("monicare_hms_orders", {
    //   orders: [...orders],
    //   total_charge: total,
    //   plan_id
    // });
  };
  const setToLocal = (name: string, item: any) => {
    if (item) {
      localStorage.setItem(name, JSON.stringify(item));
    } else {
      localStorage.removeItem(name);
    }
  };
  const changePlan = (event: ChangeEvent<HTMLSelectElement>) => {
    let plan_id = parseInt(event.target.value);
    let new_orders = orders?.map((o) => {
      switch (plan_id) {
        case 1:
          o.price = parseInt(o.price1);
          break;
        case 2:
          o.price = parseInt(o.price2);
          break;
        case 3:
          o.price = parseInt(o.price2) * 2;
          break;
        case 4:
          o.price = parseInt(o.price2) * 3;
          break;
      }
      return o;
    });
    setOrders(new_orders);
    let total = calculateTotal(new_orders);
    setToLocal("monicare_hms_orders", {
      orders: [...new_orders],
      total,
      plan_id,
    });
  };
  const changeModule = (e: ChangeEvent<HTMLSelectElement>) => {
    let click_category_id = e.target.value;
    let click_category = modules.find((m: Item) => m.id == click_category_id);
    setSelectedCategoryItem(click_category!);
  };
  const scrollToTarget = () => {
    window.scrollTo(0, 0);
  };
  const removeItemFromCart = (order: Order) => {
    let filtered_order = orders?.filter((o) => o.id !== order.id);
    setOrders(filtered_order);
    calculateTotal(filtered_order);
  };
  const setOrdersConfirm = () => {
    if (orders) {
      setCartItems({ ...orders });
      let total = calculateTotal(orders);
      setToLocal("monicare_hms_orders", {
        orders,
        total,
        plan_id: selectedPlan.id,
      });
      router.push("/orders");
    }
  };
  useEffect(() => {
    const fetchOrdersFromLocalStorage = () => {
      if (typeof window === "undefined") return;

      const json = localStorage.getItem("monicare_hms_orders");
      if (!json) return;

      const data = JSON.parse(json);
      setOrders(data.orders);
      calculateTotal(data.orders);
      setSelectedPlan(() => plans.find((p) => p.id == data.plan_id) as Plan);
    };

    fetchOrdersFromLocalStorage();
  }, []);
  return (
    <div className="mx-10 relative mb-10">
      {/* page hero */}
      <div className="hidden lg:flex flex-col gap-3 mt-4">
        <p className="text-3xl font-bold text-center bg-gradient-to-b from-blue-800 to-cyan-400 text-transparent bg-clip-text">
          Monicare (Hospital Management System)
        </p>
        {/* modules navs */}
        <div
          className="flex-grow flex flex-row flex-wrap gap-2 justify-center my-2"
          ref={targetRef}
        >
          {modules.map(
            (item, i) =>
              parseInt(item.parent_id) === 0 && (
                <button
                  onClick={() => setSelectedCategoryItem(item)}
                  className="text-yellow-600 mt-2 flex flex-row 
                bg-[#00FFFF] px-3 py-2 rounded-lg text-sm justify-center items-center gap-2 hover:shadow-2xl"
                  key={i}
                >
                  <FontAwesomeIcon
                    icon={
                      fa[item.logo_class_name as keyof typeof fa] as IconProp
                    }
                  />
                  <p>{item.module_name}</p>
                </button>
              )
          )}
        </div>
        {/* end module nav */}
      </div>
      {/* page hero */}
      <div className="flex flex-col lg:hidden mt-4">
        <p className="text-xl font-bold text-center bg-gradient-to-b from-blue-800 to-cyan-400 text-transparent bg-clip-text">
          Monicare HMS
        </p>
        <select
          onChange={changeModule}
          className="px-6 py-3 mt-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          {modules.map(
            (item, i) =>
              parseInt(item.parent_id) === 0 && (
                <option
                  value={item.id}
                  className={`text-yellow-600 flex flex-row
                ${
                  selectCategoryItem.id == item.id
                    ? "bg-cyan-800"
                    : "bg-[#00FFFF]"
                }`}
                  key={i}
                >
                  {item.module_name}
                </option>
              )
          )}
        </select>
      </div>
      {/*  */}
      <div className="grid grid-cols-10 gap-3 mt-5">
        <div className="lg:col-span-6 col-span-10">
          {/* Selected Module Informaiton */}
          <motion.div
            className="flex  bg-[#00FFFF] px-3 py-4 items-center"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-row flex-grow">
              <p>{selectCategoryItem?.module_name}</p>
              <p> ({selectCategoryItem?.module_name_myanmar}) </p>
            </div>
            <button
              className="self-end justify-end right-0 bg-green-600 text-white px-3 py-2 rounded-md"
              onClick={() => addOrder(selectCategoryItem)}
            >
              <FontAwesomeIcon
                icon={
                  fa[
                    selectCategoryItem.logo_class_name as keyof typeof fa
                  ] as IconProp
                }
                className="mr-2"
              />
              Add Module To Cart
            </button>
          </motion.div>
          {modules.map(
            (item, i) =>
              parseInt(item.parent_id) !== 0 &&
              item.parent_id == selectCategoryItem?.id && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  key={i}
                  className="mt-2 flex flex-col 
                bg-[#00FFFF] rounded-lg text-sm px-4 py-2"
                >
                  <p
                    className={` text-xl ${
                      i % 2 == 0 ? "text-cyan-900" : "text-blue-900"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        fa[item.logo_class_name as keyof typeof fa] as IconProp
                      }
                      className="mr-2"
                    />
                    {item.module_name}
                  </p>
                  <p
                    className={` text-sm pl-1 ${
                      i % 2 == 0 ? "text-gray-600" : "text-purple-500"
                    }`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              )
          )}
        </div>
        <div className="lg:col-span-4 col-span-10 lg:mt-0 mt-10">
          {/* Plans Section */}
          <div className="flex flex-row justify-between items-center mb-8">
            <p className="text-2xl font-semibold pl-4 text-gray-800  bg-gradient-to-r from-cyan-600 to-red-900 bg-clip-text text-transparent">
              Ordered Modules
            </p>
            <select
              className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              onChange={changePlan}
              value={selectedPlan.id || 1}
            >
              {plans.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ordered Modules List */}
          <div className="my-6">
            {orders?.map((order, i) => (
              <MotionDiv key={i}>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="text-lg text-gray-700">{order.module_name}</p>
                  <p className="text-lg font-medium text-gray-900">
                    {order.price} USD{" "}
                    <FontAwesomeIcon
                      icon={fa.faTrashCan}
                      className="text-red-700 ml-2"
                      onClick={() => {
                        removeItemFromCart(order);
                      }}
                    />
                  </p>
                </div>
              </MotionDiv>
            ))}
            <div className="h-1 w-full bg-gray-700"></div>
            <div className="flex flex-row justify-between items-center p-4">
              <p className="text-lg text-gray-700">Total Charges</p>
              <p className="text-lg font-medium text-gray-900 mr-7">
                {total} USD{" "}
              </p>
            </div>
            {/* Actions */}
            {orders && orders?.length > 0 && (
              <div className="mx-6 flex flex-row justify-between">
                <button
                  onClick={() => setOrdersConfirm()}
                  className="px-3 py-2 rounded-lg bg-green-500"
                >
                  Order Now
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-red-500"
                  onClick={() => {
                    setOrders([]);
                    localStorage.removeItem("monicare_hms_orders");
                    calculateTotal(undefined);
                  }}
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>

          {/* Promo Section */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl shadow-lg my-10">
            <p className="text-2xl font-semibold text-gray-800 mb-4 bg-gradient-to-r from-cyan-600 to-red-900 bg-clip-text text-transparent">
              Special Offers
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-lg text-gray-700">One Year</span>
                <span className="text-lg font-medium text-blue-600">
                  1 Month Free
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-lg text-gray-700">Two Years</span>
                <span className="text-lg font-medium text-blue-600">
                  3 Months Free
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-lg text-gray-700">Three Years</span>
                <span className="text-lg font-medium text-blue-600">
                  5 Months Free
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {typeof window !== "undefined" && window.scrollY > 500 && (
        <button
          className="sticky bottom-10 float-right bg-green-700 p-2 rounded-full"
          onClick={scrollToTarget}
        >
          Up
        </button>
      )}
    </div>
  );
}
