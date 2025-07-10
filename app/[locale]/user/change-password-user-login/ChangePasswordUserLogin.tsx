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
import { useTranslations } from "next-intl";
export default function ChangePasswordUserLogin() {
  const user = useAppSelector((state) => state?.user?.data);
  const t = useTranslations("auth");
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
            {t("oldPassword")}
          </Label>
          <Controller
            control={control}
            name="oldPassword"
            rules={{ required: t("oldPasswordRequired") }}
            render={({ field }) => (
              <Input
                placeholder={t("enterOldPassword")}
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
            {t("newPassword")}
          </Label>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: t("newPasswordRequired"),
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: t("passwordPattern"),
              },
            }}
            render={({ field }) => (
              <Input
                placeholder={t("enterNewPassword")}
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
            {t("confirmPassword")}
          </Label>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: t("confirmPasswordRequired"),
              validate: (value) =>
                value === newPassword || t("passwordAndConfirmPasswordNotSame"),
            }}
            render={({ field }) => (
              <Input
                placeholder={t("enterConfirmPassword")}
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
          {isSubmitting ? t("loading") : t("changePassword")}
        </Button>
      </div>
    </form>
  );
}
