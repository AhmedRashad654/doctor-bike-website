"use client";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "@/i18n/navigation";
import { DialogContent } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ModalSearchProduct({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations("home.navbar");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.replace(pathname);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="w-[350px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card p-6 rounded-md z-[99999]">
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            {t("searchnProduct")}
          </DialogTitle>
          <button
            onClick={() => setOpenDialog(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-600 cursor-pointer"
          >
            <X />
          </button>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col gap-3">
            <Label>{t("name")}</Label>
            <Input
              name="name"
              defaultValue={searchParams.get("name") || ""}
              onChange={(e) => updateQuery("name", e.target.value)}
              className="border border-gray-400"
            />
          </div>
          {/* <div className="flex flex-col gap-3">
            <Label>{t("minPrice")}</Label>
            <Input
              name="minPrice"
              type="number"
              defaultValue={searchParams.get("minPrice") || ""}
              onChange={(e) => updateQuery("minPrice", e.target.value)}
              className="border border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>{t("maxPrice")}</Label>
            <Input
              name="maxPrice"
              type="number"
              defaultValue={searchParams.get("maxPrice") || ""}
              onChange={(e) => updateQuery("maxPrice", e.target.value)}
              className="border border-gray-400"
            />
          </div> */}
          <button
            onClick={clearFilters}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition cursor-pointer"
          >
            {t("clearFilters")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
