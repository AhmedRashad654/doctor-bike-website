import React from "react";
import PartBack from "../componant/PartBack";
import ImagesProduct from "../componant/ImagesProduct";
import { FaWhatsapp } from "react-icons/fa6";
import PartAddComment from "../componant/PartAddComment";
import PartDisplayComments from "../componant/PartDisplayComments";
import WrapIncreaseAndDecrease from "../componant/WrapIncreaseAndDecrease";
import { getLocale, getTranslations } from "next-intl/server";
import { Params } from "../../products/[id]/page";
import { GetSingleProduct } from "@/services/products/products";
import { formatCurrency } from "@/lib/formCurrency";
import { GetContact } from "@/services/contact/contact";
import PartSelectSizeProduct from "../componant/PartSelectSizeProduct";

export default async function Product({ params }: { params: Params }) {
  const t = await getTranslations("singleProduct");
  const dataContact = await GetContact();
  const locale = await getLocale();
  const resultParams = await params;
  const data = await GetSingleProduct(resultParams.id);
  console.log(data, "data");
  return (
    <div className="min-h-screen py-6 md:py-10 w-full px-4 bg-card">
      <div className="max-w-7xl mx-auto flex flex-col gap-7">
        <PartBack />
        <ImagesProduct
          normalImagesItems={data?.normalImagesItems}
          DImagesItems={data?._3DImagesItems}
          viewImagesItems={data?.viewImagesItems}
        />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h4 className="text-xl line-clamp-2">
              {locale === "en"
                ? data?.nameEng
                : locale === "ar"
                ? data?.nameAr
                : data?.nameAbree}
            </h4>
            <p className="text-link-inactive whitespace-nowrap">
              {formatCurrency(data?.normailPrice)}
            </p>
          </div>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h4 className="text-xl text-link-inactive line-clamp-2">
              {locale === "en"
                ? data?.descriptionEng
                : locale === "ar"
                ? data?.descriptionAr
                : data?.descriptionAbree}{" "}
            </h4>{" "}
            <p className="text-link-active dark:text-blue-500 whitespace-nowrap">
              {t("reset")} {data?.stock} {t("peace")}
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <a
              href={`https://wa.me/${dataContact?.data?.whatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-green-500 rounded-md flex items-center gap-2 py-1 px-6 md:px-10  cursor-pointer "
            >
              <p className="text-green-500"> {t("askAboutProduct")}</p>
              <FaWhatsapp className="text-green-500 text-xl" />
            </a>
            <WrapIncreaseAndDecrease product={data} />
          </div>
          <PartAddComment product={data} />
          <PartSelectSizeProduct product={data} />
          <PartDisplayComments />
        </div>
      </div>
    </div>
  );
}
