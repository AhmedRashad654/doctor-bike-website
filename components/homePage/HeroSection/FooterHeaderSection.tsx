"use client";
import React from "react";
import instagem from "@/public/instagram.png";
import facebook from "@/public/logos_facebook.png";
import { IoCallOutline } from "react-icons/io5";
import whatsapp from "@/public/logos_whatsapp-icon.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { IContact } from "@/types/contact/IContact";

export default function FooterHeaderSection({ data }: { data: IContact }) {
  const locale = useLocale();
  const t = useTranslations("home.heroSection");
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
            {t("followUs")}
          </h6>
          <div className="flex items-center gap-3 p-3">
            <a
              href={data?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="z-50 cursor-pointer"
            >
              <Image
                src={instagem}
                alt="instagem"
                width={30}
                height={30}
                className="shadow-button-footer p-0  text-4xl z-50"
              />
            </a>
            <a
              href={data?.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="z-50 cursor-pointer"
            >
              <Image
                src={facebook}
                alt="facebook"
                width={30}
                height={30}
                className="shadow-button-footer p-0  text-4xl"
              />
            </a>
            <a
              href={`tel:${data?.call}`}
              target="_blank"
              rel="noopener noreferrer"
              className="z-50 cursor-pointer"
            >
              <IoCallOutline className="w-[30px] h-[30px] text-green-500 z-50 shadow-button-footer" />
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="flex items-center gap-3"
        >
          <h6 className="text-transperants dark:text-gray-200/80 text-lg font-semibold">
            {t("explation")}
          </h6>
          <a
            href={`https://wa.me/${data?.whatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="z-50 cursor-pointer"
          >
            <Image
              src={whatsapp}
              alt="whatsapp"
              width={30}
              height={30}
              className="shadow-button-footer p-0  text-4xl z-10 "
            />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
