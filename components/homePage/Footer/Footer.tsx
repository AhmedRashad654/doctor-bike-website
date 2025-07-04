"use client";
import slide1 from "@/public/slide1.jpg";
import TriangleFooter from "./TriangleFooter";
import LogoImage from "../Navbar/LogoImage";
import Link from "next/link";
import Image from "next/image";
import apple from "@/public/apple.png";
import googlePlay from "@/public/google play.png";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
export default function Footer() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-full  h-[400px] bg-cover bg-center relative",
        (pathname.includes("/sign-in") ||
          pathname.includes("/sign-up") ||
          pathname.includes("/forget-password") ||
          pathname.includes("/otp") ||
          pathname.includes("/success-otp") ||
          pathname.includes("/change-password") ||
          pathname.includes("/user")) &&
          "hidden"
      )}
      style={{
        backgroundImage: `url(${slide1.src})`,
      }}
    >
      <TriangleFooter />
      <div className="absolute w-full h-full bg-black/40 z-10 top-0 left-0"></div>
      <div className="w-full relative px-4">
        <div className="flex justify-center items-center w-full mt-5 md:mt-10">
          <div className="flex flex-col md:flex-row gap-10  justify-between md:items-center w-full max-w-7xl mx-auto z-20">
            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href="/contact-us"
                  className="text-white text-2xl font-bold text-decoration-underline"
                >
                  اتصل بنا
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href="/about"
                  className="text-white text-2xl font-bold text-decoration-underline"
                >
                  من نحن
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href="/terms-policy"
                  className="text-white text-2xl font-bold text-decoration-underline"
                >
                  الشروط و الاحكام
                </Link>
              </motion.div>
            </div>
            <LogoImage />
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-3 md:items-center"
            >
              <h4 className="text-white text-2xl font-bold">
                متوفر الان تطبيق للشركة
              </h4>
              <div className="flex flex-row gap-2">
                <a href="#">
                  <Image
                    src={apple}
                    alt="apple"
                    width={100}
                    height={100}
                    className="w-[100px]"
                  />
                </a>
                <a href="#">
                  <Image
                    src={googlePlay}
                    alt="googlePlay"
                    width={100}
                    height={100}
                    className="w-[100px]"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
