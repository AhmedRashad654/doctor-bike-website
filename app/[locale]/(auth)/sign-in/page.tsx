"use client";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { IUser } from "@/types/user/IUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooksRedux";
import { LoginUser } from "@/services/auth/auth";
import { setUser } from "@/redux/features/userSlice";
export default function Login() {
  const user = useAppSelector((state) => state?.user?.data);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // handle login
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
    const response = await LoginUser(data, toast);
    if (response) {
      dispatch(setUser(response?.data?.user));
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
      className="min-h-[calc(100vh-100px)] flex items-center justify-center py-4 md:py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold">مرحبا بعودتك !</h2>

        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="email" className="mb-1 block">
            البريد الالكتروني
          </Label>
          <Controller
            control={control}
            name="email"
            rules={{ required: "البريد الالكتروني مطلوب" }}
            render={({ field }) => (
              <Input
                placeholder="ادخل البريد الالكتروني"
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
            كلمة المرور
          </Label>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "كلمة المرور مطلوبة",
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
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="w-full -mt-2">
          <Link
            href="/forget-password"
            className="text-sm font-bold cursor-pointer text-blue-600 dark:text-white hover:underline"
          >
            هل نسيت كلمة المرور؟
          </Link>
        </div>

        <Button type="submit" className="w-full font-bold cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? " جاري تسجيل الدخول..." : "   تسجيل الدخول "}
        </Button>
        <div className="text-sm">
          ليس لديك حساب ؟
          <Link
            href={"/sign-up"}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
          >
            اشتراك
          </Link>
        </div>
      </div>
    </form>
  );
}
