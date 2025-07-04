"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { setUser } from "../../../redux/features/userSlice";
import { Link, useRouter } from "@/i18n/navigation";
import { IUser } from "@/types/user/IUser";
export default function ForgetPassword() {
  const router = useRouter();
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
    router.push("/otp");
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
      className="min-h-screen flex items-center justify-center pt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold"> هيا بنا نبدأ</h2>
        <p>سنقوم بارسال رمز تحقق للتأكيد علي بريدك الإلكتروني</p>
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
        <Button type="submit" className="w-full font-bold cursor-pointer">
          التالي
        </Button>
      </div>
    </form>
  );
}
