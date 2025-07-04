"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { setUser } from "../../../redux/features/userSlice";
import { Link } from "@/i18n/navigation";
import { IUser } from "@/types/user/IUser";
export default function Login() {
  //   const user = useAppSelector((state) => state?.user?.data);
  // handle login
  //   const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //   const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log(data);
    // const response = await LoginUser(data, showToast);
    // if (response) {
    //   dispatch(setUser(response?.data?.user));
    // }
  };
  // protected Routed
  //   useEffect(() => {
  //     if (user?.id !== "") {
  //         router.replace("/");
  //     }
  //   }, [router, user?.id]);

  return (
    <form
      className="min-h-screen flex items-center justify-center pt-12"
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

        <Button type="submit" className="w-full font-bold cursor-pointer">
          تسجيل الدخول
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
