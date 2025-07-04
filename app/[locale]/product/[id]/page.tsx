import React from "react";
import PartBack from "../componant/PartBack";
import ImagesProduct from "../componant/ImagesProduct";
import { FaWhatsapp } from "react-icons/fa6";
import PartAddComment from "../componant/PartAddComment";
import PartDisplayComments from "../componant/PartDisplayComments";
import WrapIncreaseAndDecrease from "../componant/WrapIncreaseAndDecrease";
import { getTranslations } from "next-intl/server";

export default async function Product() {
  const t = await getTranslations("singleProduct");
  return (
    <div className="min-h-[200px] pt-[120px] pb-[50px] md:pt-[150px] w-full px-4 bg-card">
      <div className="max-w-7xl mx-auto flex flex-col gap-7">
        <PartBack />
        <ImagesProduct />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-3">
            <h4 className="text-xl">ضو بومة </h4>
            <p className="text-link-inactive">50 {t("chekal")}</p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <h4 className="text-xl text-link-inactive">ضو بومة حديد ...</h4>
            <p className="text-link-active dark:text-blue-500">
              {t("reset")} 500 {t("peace")}
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div className="border-2 border-green-500 rounded-md flex items-center gap-2 py-1 px-6 md:px-10  cursor-pointer ">
              <p className="text-green-500"> {t("askAboutProduct")}</p>
              <FaWhatsapp className="text-green-500 text-xl" />
            </div>
            <WrapIncreaseAndDecrease />
          </div>
          <PartAddComment />
          <PartDisplayComments />
        </div>
      </div>
    </div>
  );
}
