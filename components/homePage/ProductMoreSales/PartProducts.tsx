"use client";

import React from "react";
import CardProduct from "./CardProduct";
import { motion } from "framer-motion";
export default function PartProducts({ type }: { type?: string | string[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
      className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full justify-between"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 6].map((e, i) => (
        <CardProduct key={i} index={i} type={type} />
      ))}
    </motion.div>
  );
}
