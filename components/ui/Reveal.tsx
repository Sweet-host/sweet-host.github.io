"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
}

export const Reveal = ({ children, delay = 0.2 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Starts 50px lower and invisible
      whileInView={{ opacity: 1, y: 0 }} // Slides up and fades in
      viewport={{ once: true, margin: "-100px" }} // Trigger slightly before it hits the center
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
