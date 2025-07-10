"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooksRedux";
import { setLogout } from "@/redux/features/userSlice";
import { useTranslations } from "next-intl";

export default function Logout() {
  const dispatch = useAppDispatch();
  const t = useTranslations("auth");
  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <div className="flex items-center justify-center px-4 py-15">
      <div className="rounded-xl p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-4">{t("areYouSurelogout")}</h2>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            {t("yes")}
          </Button>
          <Button variant="outline" className="cursor-pointer">
            {t("cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
}
