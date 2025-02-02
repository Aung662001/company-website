"use client";
import Input from "@/components/Input";
import { LoginFormData } from "@/utils/types";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { login } from "@/context/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/context/ConfigureStore";
import { redirect } from "next/navigation";

const defaultValues = {
  email: "",
  password: "",
};
const page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues: defaultValues });
  const dispatch: AppDispatch = useDispatch();
  const { user, loading, isLogin } = useSelector(
    (state: RootState) => state.auth
  );

  const onSubmit = async (data: LoginFormData) => {
    let res = await dispatch(login(data)).unwrap();
    if (res.status == 200) {
      redirect("/dashboard");
    }
    reset(defaultValues);
  };
  return (
    <div className="w-full h-screen justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full flex flex-col justify-center items-center bg-white shadow-lg rounded-lg"
      >
        <p className="text-2xl text-slate-700 text-center font-extrabold">
          Login{" "}
        </p>
        <form
          className="flex flex-col justify-center items-center gap-2 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input<LoginFormData>
            rule={{
              required: "User name field is required.",
              pattern: {
                message: "Invalid user name value",
              },
            }}
            register={register}
            name={"email"}
            label={"Email"}
            errors={errors}
          />
          <Input<LoginFormData>
            rule={{
              required: "Password field is required.",
              pattern: {
                value: /^[A-Za-z0-9\-_ ]+$/,
                message: "Invalid password value",
              },
            }}
            register={register}
            name={"password"}
            label={"Password"}
            errors={errors}
            type="password"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-lg bg-blue-500 text-white"
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default page;
