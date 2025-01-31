"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const MotionDiv = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className=""
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
