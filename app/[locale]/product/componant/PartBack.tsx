"use client";
import { useTranslations } from "next-intl";
import React from "react";
// import { ArrowLeft } from "lucide-react";
// import { ArrowRight } from "lucide-react";
// import { useLocale } from "next-intl";
// import { useRouter } from "@/i18n/navigation";
// import { useSearchParams } from "next/navigation";

export default function PartBack() {
  const t = useTranslations("singleProduct");
  // const locale = useLocale();
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const subCategory = searchParams.get("subCategory");
  // const subCategoryId = searchParams.get("subCategoryId");

  // const handleBack = () => {
  //   if (subCategory) {
  //     router.push(`/products/${subCategoryId}?subCategoryName=${subCategory}`);
  //   } else {
  //     router.push("/");
  //   }
  //   router.back();
  // };
  return (
    <div className="flex items-center gap-3">
      {/* <div className="cursor-pointer">
        {locale === "en" ? (
          <ArrowLeft onClick={handleBack} />
        ) : (
          <ArrowRight onClick={handleBack} />
        )}
      </div> */}

      <h4 className="text-2xl md:text-3xl font-semibold">
        {" "}
        {t("detailsProduct")}
      </h4>
    </div>
  );
}
