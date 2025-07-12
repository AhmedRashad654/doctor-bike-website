"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { IUser } from "@/types/user/IUser";
import { ForgetPasswordUser } from "@/services/auth/auth";
import { useAppDispatch } from "@/redux/hooksRedux";
import { setOTP } from "@/redux/features/userSlice";
import { useTranslations } from "next-intl";

export default function ForgetPassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations("auth");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const response = await ForgetPasswordUser(data, toast,t);
    if (response) {
      dispatch(setOTP(response?.data));
      router.push("/otp");
    }
  };

  return (
    <form
      className="min-h-[calc(100vh-100px)] flex items-center justify-center py-4 md:py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold"> {t("letsStart")}</h2>
        <p className="text-center">{t("weSendoptToYourEmail")}</p>
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="email" className="mb-1 block">
            {t("email")}
          </Label>
          <Controller
            control={control}
            name="email"
            rules={{ required: t("emailRequired") }}
            render={({ field }) => (
              <Input
                placeholder={t("enterEmail")}
                type="email"
                className="py-5"
                {...field}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="text-sm">
          {t("byClickHereMainYouAccept")}
          <span> </span>
          <Link
            href={"/terms-policy"}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
          >
            {t("TermsAndCondition")}
          </Link>
          <span> </span>
          {t("specialWithDoctorBike")}
        </div>
        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("loading") : t("next")}
        </Button>
      </div>
    </form>
  );
}
