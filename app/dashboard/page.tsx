"use client";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/context/ConfigureStore";
import { redirect } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "@/context/OrderSlice";
import DataTable from "react-data-table-component";
import { OrderFormData } from "@/utils/types";
import dayjs from "dayjs";

const columns = [
  {
    name: "Hospital Name",
    selector: (row: OrderFormData) => row.hospital_name,
    sortable: true,
  },
  {
    name: "Contact Person Name",
    selector: (row: OrderFormData) => row.contact_person_name,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row: OrderFormData) => (
      <a href={`tel:${row.phone}`} className="text-blue-500">
        {row.phone}
      </a>
    ),
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: OrderFormData) => (
      <a href={`mailto:${row.email}`} className="text-blue-500">
        {row.email}
      </a>
    ),
    sortable: true,
  },
  {
    name: "Address",
    selector: (row: OrderFormData) => row.hospital_address,
    sortable: true,
  },
  {
    name: "Order Type",
    selector: (row: any) => row.order_type_name,
    sortable: true,
  },
  {
    name: "Order Time",
    selector: (row: any) =>
      dayjs(row.createdAt).format("DD/MM/YYYY HH:mm:ss A"),
    sortable: true,
  },
];

const page = () => {
  const { isLogin, role } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);
  if (!isLogin) {
    redirect("/login");
  }
  useEffect(() => {
    let res = dispatch(fetchOrders());
  }, []);
  return (
    <div className="flex flex-col justify-center items-center  ">
      <p className="font-3xl text-slate-600 text-center my-4">Orders </p>
      {orders && (
        <div className="w-full mx-4">
          <DataTable columns={columns} data={orders} />
        </div>
      )}
    </div>
  );
};

export default page;
