"use client";
import Input from "@/components/Input";
import { LoginFormData } from "@/utils/types";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { login } from "@/context/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/context/ConfigureStore";
import { BeatLoader } from "react-spinners";
import { redirect } from "next/navigation";

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
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
    try {
      const res = await dispatch(login(data)).unwrap();
      if (res.status === 200) {
        redirect("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    reset(defaultValues);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email Field */}
          <Input<LoginFormData>
            rule={{
              required: "Email field is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            register={register}
            name="email"
            label="Email"
            errors={errors}
          />

          {/* Password Field */}
          <Input<LoginFormData>
            rule={{
              required: "Password field is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
            register={register}
            name="password"
            label="Password"
            errors={errors}
            type="password"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <BeatLoader size={10} color="white" />
            ) : (
              "Sign In"
            )}
          </button>

          {/* Error Message Display */}
          {errors.email?.message && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          {errors.password?.message && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;