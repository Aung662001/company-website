import React from "react";
import { UseFormRegister, FieldErrors, Path } from "react-hook-form";

// Define a generic interface for the props
import { FieldValues } from "react-hook-form";

interface UseFormTypes<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: keyof T;
  label: string;
  rule?: object;
  type?: string;
  icon?:string|null;
}

const Input = <T extends object>({
  register,
  errors,
  name,
  label,
  rule = {},
  type = "text",
  icon=null,
}: UseFormTypes<T>) => {
  return (
    <div className="flex flex-col gap-1 text-cyan-600">
      <label>{icon && icon}{label}</label>
      <input
        type={type}
        {...register(name as string as Path<T>, rule)}
        className={`${
          (errors[name] as any) ? "border-red-400" : "border-cyan-100"
        } border-2 h-9 pl-2 outline-none`}
      />
      <p className="text-sm italic text-red-600">
        {errors[name]?.message as string}
      </p>
    </div>
  );
};

export default Input;
