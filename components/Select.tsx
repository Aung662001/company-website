import { OrderFormData } from "@/utils/types";
import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
} from "react-hook-form";

interface SelectProps {
  register: UseFormRegister<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  name: keyof OrderFormData;
  label: string;
  orderTypes: { id: number; name: string }[];
  icon?:string|null;
}

const Select: React.FC<SelectProps> = ({
  register,
  errors,
  name,
  label,
  orderTypes,
  icon=null
}) => {
  return (
    <div className="flex flex-col my-4 gap-1 text-cyan-600">
      <label>{icon && icon}{label}</label>

      <select
        {...register(name)}
        className={`outline-none ${
          errors[name] ? "border-red-600" : "border-cyan-100"
        } border-2 h-9 px-6 py-1 focus:ring-2 focus:ring-blue-500`}
      >
        {orderTypes.map((type, i) => (
          <option key={i} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      {errors[name] && (
        <p className="text-red-600 text-sm">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Select;
