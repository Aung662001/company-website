import { OrderFormData } from "@/utils/types";
import React from "react";
import {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
interface useFormTypes {
  register: UseFormRegister<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  name: keyof OrderFormData;
  label: string;
  orderTypes: { id: number; name: string }[];
}
const Select = ({
  register,
  errors,
  name,
  label,
  orderTypes,
}: useFormTypes) => {
  return (
    <div className="flex flex-col my-4 gap-1 text-cyan-600">
      <label className="">{label}</label>
      <select
        {...register(name)}
        className={`${
          errors[name] ? " border-red-600" : "border-cyan-300"
        } border-2 h-9 px-6 py-1 focus:ring-2 focus:ring-blue-500`}
      >
        {orderTypes.map((type,id) => (
          <option key={id}>{type.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
