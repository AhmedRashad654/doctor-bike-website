"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooksRedux";
import { ForgetPasswordUser } from "@/services/auth/auth";
import { toast } from "sonner";
import { setEnableChangePassword, setOTP } from "@/redux/features/userSlice";
import { IUser } from "@/types/user/IUser";
import { useTranslations } from "next-intl";

export default function Otp() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [otp, setOtp] = useState("");
  const userOTP = useAppSelector((state) => state?.user?.otp);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations("auth")
  // decrease count
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  // check send email
  useEffect(() => {
    if (userOTP?.otp === "") {
      router.push("/");
    }
  }, [router, userOTP?.otp]);
  // handle repeat send otp
  const handleRepeatSendOTP = async () => {
    const data = { email: userOTP?.email };
    const response = await ForgetPasswordUser(data as IUser, toast,t);
    if (response) {
      dispatch(setOTP(response?.data));
      setTimeLeft(60);
    }
  };
  const handleVerificationCode = () => {
    if (otp?.length < 4) return alert(t("otpNotComplete"));
    if (Number(otp) !== Number(userOTP?.otp)) {
      return toast.error(t("otpNotMatch"));
    } else {
      dispatch(setEnableChangePassword(true));
      router.push("/success-otp");
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center py-[20px] w-full min-h-[100vh]">
      <div className="flex flex-col gap-[20px] p-4 w-[340px] md:w-[450px]">
        <div className="flex flex-col items-center gap-[10px]">
          <h5 className="font-bold"> {t("checkOnOtp")}</h5>
          <h6 className="text-blue-600 dark:text-blue-400">
          {t("pleaseEnterOtp")}
          </h6>
        </div>
        <div className="w-full flex justify-center">
          <InputOTP maxLength={4} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button onClick={handleVerificationCode} className="cursor-pointer">
       {t("check")}
        </Button>
        <div className="flex flex-col gap-5 items-center">
          <h6>{t("notHaveOtp") }</h6>

          {timeLeft > 0 ? (
            <h6 className="font-bold">
              {" "}
              {/* إعادة الإرسال خلال 00: */}
              {t("repeatSendThrought")}
              {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </h6>
          ) : (
            <h6
              className="font-bold cursor-pointer"
              onClick={handleRepeatSendOTP}
            >
           {t("repeatSendNow")}
            </h6>
          )}
        </div>
      </div>
    </div>
  );
}
