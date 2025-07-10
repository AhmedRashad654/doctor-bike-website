"use client";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { setUser } from "../../../redux/features/userSlice";
import { Link } from "@/i18n/navigation";
import { IUser } from "@/types/user/IUser";
import { useAppSelector } from "@/redux/hooksRedux";
import { useRouter } from "next/navigation";
import { RegisterUser } from "@/services/auth/auth";
import { useTranslations } from "next-intl";
export default function Register() {
  const user = useAppSelector((state) => state?.user?.data);
  const router = useRouter();
  const t = useTranslations("auth");
  // handle login
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const response = await RegisterUser(data, toast);
    if (response?.status === 200) {
      router.push("/sign-in");
    }
  };
  // protected Routed
  useEffect(() => {
    if (user?.id !== "") {
      router.replace("/");
    }
  }, [router, user?.id]);

  return (
    <form
      className="min-h-[calc(100vh-800px)] flex items-center justify-center py-4 md:py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold"> {t("welcomefirst")}</h2>

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

        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="password" className="mb-1 block">
            {t("password")}
          </Label>
          <Controller
            control={control}
            name="password"
            rules={{
              required: t("passwordRequired"),
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: t("passwordPattern"),
              },
            }}
            render={({ field }) => (
              <Input
                id="password"
                placeholder={t("enterPassword")}
                type="password"
                className="py-5"
                {...field}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="password" className="mb-1 block">
            {t("confirmPassword")}
          </Label>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: t("confirmPasswordRequired"),
              validate: (value) =>
                value === password || t("passwordAndConfirmPasswordNotSame"),
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
        </div>

        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("loading") : t("register")}
        </Button>
        <div className="text-sm">
          {t("haveAccount")}
          <Link
            href={"/sign-in"}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
          >
            {t("login")}
          </Link>
        </div>
      </div>
    </form>
  );
}
