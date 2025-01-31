import { OrderFormData } from "@/utils/types";
import { register } from "module";
import React from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
interface useFormTypes {
  register: UseFormRegister<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  name: keyof OrderFormData;
  label: string;
  rule?:object
}
const Input = ({ register, errors, name, label,rule={} }: useFormTypes) => {
  return (
    <div className="flex flex-col my-4 gap-1 text-cyan-600 ">
      <label>{label}{''}</label>
      <input
        {...register(name,rule)}
        className={`${
            errors[name] ? "border-red-400" : "border-cyan-300"
        } border-2 h-9 pl-2`}
      />
        <p className="text-sm italic text-red-600">{errors[name]?.message}</p>
    </div>
  );
};

export default Input;
