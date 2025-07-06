"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooksRedux";
import { setLogout } from "@/redux/features/userSlice";

export default function Logout() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <div className="flex items-center justify-center px-4 py-15">
      <div className="rounded-xl p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-4">
          هل أنت متأكد أنك تريد تسجيل الخروج؟
        </h2>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            نعم
          </Button>
          <Button variant="outline" className="cursor-pointer">
            إلغاء
          </Button>
        </div>
      </div>
    </div>
  );
}
