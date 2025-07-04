"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { CheckCircle } from "lucide-react";

// import { useEffect } from "react";
// import { useAppSelector } from "../../../redux/hooks";
export default function SuccessCheckout() {
  //   const userOTP = useAppSelector((state) => state?.user?.otp);
  //   useEffect(() => {
  //     if (!userOTP?.enabaleChangePassword) {
  //       navigate("/");
  //     }
  //   }, [navigate, userOTP?.enabaleChangePassword]);
  //   if (!userOTP?.enabaleChangePassword) return;
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="flex items-center flex-col gap-[40px] w-[340px] md:w-[450px]">
        <div className="flex flex-col items-center gap-[30px]">
          <CheckCircle className="text-green-500 w-[80px] h-[80px]" />
          <h3 className="font-bold text-2xl"> تم اكمال طلبك</h3>
        </div>
        <Link href={"/orders"} className="w-full">
          <Button className="w-full font-bold cursor-pointer">مراجعة الطلب</Button>
        </Link>
      </div>
    </div>
  );
}
