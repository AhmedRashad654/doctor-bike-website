"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
export default function MainTextHeroSection() {
  const t = useTranslations("home.heroSection");
  return (
    <div className="absolute top-[48%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-40 flex flex-col gap-3 md:gap-4 items-center w-[75%] mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="font-bold text-3xl md:text-5xl lg:text-6xl text-transperants dark:text-gray-200"
      >
        {t("title")}
      </motion.h1>
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-xl md:text-3xl lg:text-4xl text-transperants dark:text-gray-200 text-center w-[85%]"
      >
        {" "}
        {t("description")}
      </motion.h4>
    </div>
  );
}
