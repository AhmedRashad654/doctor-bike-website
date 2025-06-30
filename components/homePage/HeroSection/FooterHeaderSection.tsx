"use client";
import React from "react";
import instagem from "@/public/instagram.png";
import facebook from "@/public/logos_facebook.png";
import tiktok from "@/public/logos_tiktok-icon.png";
import whatsapp from "@/public/logos_whatsapp-icon.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function FooterHeaderSection() {
  const locale = useLocale();
  return (
    <div className="w-full px-4 z-10 absolute bottom-[120px]">
      <div className="flex flex-wrap justify-center sm:justify-between items-center gap-3 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="flex items-center justify-center gap-4 px-4"
        >
          <h6 className="text-transperants dark:text-gray-200/80 text-lg font-semibold">
            تابعونا علي
          </h6>
          <div className="flex items-center gap-3 p-3">
            <Image
              src={instagem}
              alt="instagem"
              width={30}
              height={30}
              className="shadow-button-footer p-0  text-4xl z-50"
            />
            <Image
              src={facebook}
              alt="facebook"
              width={30}
              height={30}
              className="shadow-button-footer p-0  text-4xl z-50"
            />
            <Image
              src={tiktok}
              alt="tiktok"
              width={30}
              height={30}
              className="shadow-button-footer p-0  text-4xl z-50"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="flex items-center gap-3"
        >
          <h6 className="text-transperants dark:text-gray-200/80 text-lg font-semibold">
            لاستفساراتكم علي
          </h6>
          <Image
            src={whatsapp}
            alt="whatsapp"
            width={30}
            height={30}
            className="shadow-button-footer p-0  text-4xl z-10 "
          />
        </motion.div>
      </div>
    </div>
  );
}
