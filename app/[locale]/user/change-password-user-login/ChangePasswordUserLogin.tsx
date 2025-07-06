"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user/IUser";
import { toast } from "sonner";
import { ChangePasswordUserLoginApi } from "@/services/auth/auth";
import { useAppSelector } from "@/redux/hooksRedux";
export default function ChangePasswordUserLogin() {
  const user = useAppSelector((state) => state?.user?.data);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const newPassword = watch("newPassword");
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const newDate = {
      ...data,
      userId: user?.id,
      dateUpdate: new Date().toISOString(),
    };
    const response = await ChangePasswordUserLoginApi(newDate, toast);
    if (response?.status === 200) {
      reset();
    }
  };

  return (
    <form
      className="min-h-[calc(100vh-160px)] flex justify-center py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="oldPassword" className="mb-1 block">
            كلمة المرور القديمة
          </Label>
          <Controller
            control={control}
            name="oldPassword"
            rules={{ required: "  كلمة المرور القديمة مطلوبة" }}
            render={({ field }) => (
              <Input
                placeholder="ادخل  كلمة المرور القديمة"
                type="password"
                className="py-5"
                {...field}
              />
            )}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-xs">{errors.oldPassword.message}</p>
          )}
        </div>{" "}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="newPassword" className="mb-1 block">
            كلمة المرور الجديدة
          </Label>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: "كلمة المرور الجديدة مطلوبة",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "كلمة المرور يجب أن تحتوي على حرف كبير وصغير، رقم، ورمز (@،$،!...) وألا تقل عن 8 أحرف.",
              },
            }}
            render={({ field }) => (
              <Input
                placeholder="ادخل كمة المرور الجديدة"
                type="password"
                className="py-5"
                {...field}
              />
            )}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs">{errors.newPassword.message}</p>
          )}
        </div>{" "}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="confirmPassword" className="mb-1 block">
            تاكيد كلمة المرور
          </Label>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "تاكيد كلمة المرور مطلوب",
              validate: (value) =>
                value === newPassword ||
                "كلمة المرور و تاكيد كلمة المرور غير متطابقين",
            }}
            render={({ field }) => (
              <Input
                placeholder="ادخل تاكيد كلمة المرور"
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
        </div>{" "}
        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "...  رجاء الانتظار" : "تعديل كلمة المرور"}
        </Button>
      </div>
    </form>
  );
}
