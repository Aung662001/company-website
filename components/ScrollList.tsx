"use client"; // Required for Framer Motion animations in Next.js

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface ScrollRevealListProps {
  children: React.ReactNode;
}

const ScrollRevealList = ({ children }: ScrollRevealListProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default ScrollRevealList;