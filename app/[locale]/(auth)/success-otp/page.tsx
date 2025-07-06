"use client";

import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/redux/hooksRedux";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function SuccessOtp() {
  const router = useRouter();
    const userOTP = useAppSelector((state) => state?.user?.otp);
    useEffect(() => {
      if (!userOTP?.enabaleChangePassword) {
        router.replace("/");
      }
    }, [router, userOTP?.enabaleChangePassword]);
    if (!userOTP?.enabaleChangePassword) return;
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] py-4 md:py-8">
      <div className="flex items-center flex-col gap-[50px] w-[340px] md:w-[450px]">
        <div className="flex flex-col items-center gap-[30px]">
          <CheckCircle className="text-green-500 w-[50px] h-[50px]" />
          <h3 className="font-bold text-2xl">تم التحقق بنجاح</h3>
        </div>
        <Link href={"/change-password"} className="w-full">
          <Button className="w-full font-bold cursor-pointer">التالي</Button>
        </Link>
      </div>
    </div>
  );
}
