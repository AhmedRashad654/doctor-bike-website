"use client";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { IUser } from "@/types/user/IUser";
import { ForgetPasswordUser } from "@/services/auth/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooksRedux";
import { setOTP } from "@/redux/features/userSlice";

export default function ForgetPassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state?.user?.data);

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
    const response = await ForgetPasswordUser(data, toast);
    if (response) {
      dispatch(setOTP(response?.data));
      router.push("/otp");
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
        <h2 className="text-2xl font-semibold"> هيا بنا نبدأ</h2>
        <p className="text-center">سنقوم بارسال رمز تحقق للتأكيد علي بريدك الإلكتروني</p>
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
        <div className="text-sm">
          النقر علي التالي يعني أنك قرأت ووافقت علي
          <span> </span>
          <Link
            href={"/terms-policy"}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
          >
            الأحكام والشروط
          </Link>
          <span> </span>
          الخاصة باستخدام تطبيق doctorBike
        </div>
        <Button type="submit" className="w-full font-bold cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? "الرجاء الانتظار..." : "التالي"}
        </Button>
      </div>
    </form>
  );
}
