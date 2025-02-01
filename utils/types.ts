import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface OrderFormData {
  hospital_name: string;
  contact_person_name: string;
  phone: string;
  email: string;
  hospital_address: string;
  order_type: { id: number; name: string };
}
export interface useOrderFormTypes {
  register: UseFormRegister<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  name: keyof OrderFormData;
  label: string;
  rule?: object;
}
export interface LoginFormData {
  email: string;
  password: string;
}
export interface useLoginType {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  name: keyof LoginFormData;
  label: string;
  rule?: object;
}
