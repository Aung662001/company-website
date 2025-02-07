"use client";
import { Lobster } from "next/font/google";
import benefits from "@/data/benefit.json";
import company_data from "@/data/company_data.json";
import MotionDiv from "@/components/MotionDiv";
import { motion } from "framer-motion";
import Image from "next/image";
import doctorimg from "@/public/msbannerdt.jpg";
import plans from "@/data/plan_benefit.json";

const lobster = Lobster({
  weight: "400",
  subsets: ["cyrillic-ext"],
});

export default function Home() {
  return (
    <div className="bg-white w-full min-h-screen flex items-center justify-center py-12  flex-col">
      <div className="max-w-7xl mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left Column - Title and Description */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`text-6xl lg:text-7xl font-extrabold text-gray-800 ${lobster.className}`}
          >
            Monicare
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            If you are looking for affordable and easy-to-use hospital
            management software, contact us now.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn w-fit bg-gradient-to-tr from-blue-500 to-blue-600  text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            To Order Product <span className="ml-2">➡️</span>
          </motion.button>
        </motion.div>

        {/* Middle Column - Benefits List */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            "✅ Unlimited Users",
            "✅ Unlimited PCs",
            "✅ Any Operating System",
            "✅ Mobile Devices",
            "✅ Online/Offline",
          ].map((benefit, index) => (
            <span key={index} className="text-2xl text-gray-700">
              {benefit}
            </span>
          ))}
          <span className="text-gray-700 text-xl">
            Hotline:{" "}
            <a
              href="tel:+959 972 525 008"
              className="text-blue-600 hover:underline"
            >
              +959 972 525 008
            </a>
          </span>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="items-center justify-center hidden  lg:flex"
        >
          <Image
            src={doctorimg}
            alt="Doctor Image"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
            priority
          />
        </motion.div>
      </div>
      <div className="flex flex-row ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 gap-10 ">
          {plans.map((plan, i) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                key={i}
                className={`py-4 px-4 rounded-md bg-blue-${i + 3}00 text-white cursor-pointer`}
              >
                <h3 className="text-2xl text-center my-3">{plan.name}</h3>
                <div className="flex flex-col gap-2">
                  {plan.benefits.map((b, i) => (
                    <p key={i}>❇️ {b}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
