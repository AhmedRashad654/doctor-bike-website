"use client";

import React, { useEffect, useState } from "react";
import logo from "@/public/logo_Bike.png";
import logoDark from "@/public/logo_Bike_dark.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function LogoImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 , y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
      className="absolute  left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-transperants rounded-[50%] w-[110px] h-[110px] hidden md:flex  justify-center items-center">
      <Image
        src={theme === "dark" ? logoDark : logo}
        alt="logo"
        width={70}
        height={70}
        priority
      />
    </motion.div>
  );
}
