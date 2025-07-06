"use client";
import React, { useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IUser } from "@/types/user/IUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooksRedux";
import { useRouter } from "@/i18n/navigation";
import { setResetOTP } from "@/redux/features/userSlice";
import { ChangePasswordUserApi } from "@/services/auth/auth";

export default function ChangePassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userOTP = useAppSelector((state) => state?.user?.otp);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const password = watch("newPassword");
  const isSuccess = useRef(false);
  // handle change password
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const newData = {
      ...data,
      userId: userOTP?.userId,
      dateUpdate: new Date(),
    };
    const response = await ChangePasswordUserApi(newData as IUser, toast);
    if (response?.status === 200) {
      isSuccess.current = true;
      dispatch(setResetOTP());
      router.push("/sign-in");
    }
  };

  // check enable change password
  useEffect(() => {
    if (!isSuccess.current && !userOTP?.enabaleChangePassword) {
      router.replace("/");
    }
  }, [router, userOTP?.enabaleChangePassword]);

  if (!userOTP?.enabaleChangePassword) return;

  return (
    <form
      className="min-h-[calc(100vh-100px)] flex items-center justify-center py-4 md:py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold"> تغيير كلمة المرور</h2>

        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="password" className="mb-1 block">
            كلمة المرور
          </Label>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: "كلمة المرور مطلوبة",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "كلمة المرور يجب أن تحتوي على حرف كبير وصغير، رقم، ورمز (@،$،!...) وألا تقل عن 8 أحرف.",
              },
            }}
            render={({ field }) => (
              <Input
                id="password"
                placeholder="ادخل كلمة المرور"
                type="password"
                className="py-5"
                {...field}
              />
            )}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="confirmPassword" className="mb-1 block">
            تاكيد كلمة المرور
          </Label>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "تأكيد كلمة المرور مطلوب",
              validate: (value) =>
                value === password || "كلمة المرور غير متطابقة",
            }}
            render={({ field }) => (
              <Input
                placeholder=" ادخل تاكيد كلمة المرور"
                type="password"
                className="py-5"
                {...field}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "   الرجاء الانتظار... " : "تفيير كلمة المرور"}
        </Button>
      </div>
    </form>
  );
}
