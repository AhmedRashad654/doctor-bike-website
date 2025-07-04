"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
export default function PartDisplayComments() {
  const locale = useLocale();
  return (
    <motion.div
      className="flex flex-col gap-3 mt-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.5,
          },
        },
      }}
    >
      {[1, 2, 3].map((e) => (
        <motion.div
          key={e}
          variants={{
            hidden: { opacity: 0, x: locale === "ar" ? -50 : 50 },
            show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
        >
          <Card className="w-full max-w-7xl shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">احمد رشاد</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-white">
                لقد كنت أبحث طويلاً عن قطع غيار موثوقة لدراجتي الكهربائية،
                وعندما اكتشفت هذا المنتج، كنت متشككًا في البداية. ولكن بعد
                التجربة، تبين لي أنه خيار ممتاز. القطع أصلية، عالية الجودة،
                وسهلة التركيب. لاحظت تحسنًا ملحوظًا في أداء دراجتي بعد تركيب
                القطع الجديدة، خاصة في تحسين سرعة الشحن وزيادة استقرار القيادة.
                تجربة الشراء كانت سلسة والموقع يوفر خدمة عملاء ممتازة. أنصح بشدة
                لأي شخص يمتلك دراجة كهربائية بأن يستخدم هذا المنتج، فهو يوفر
                راحة البال وأداء ممتاز
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
