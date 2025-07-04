"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { setUser } from "../../../redux/features/userSlice";
import { IUser } from "@/types/user/IUser";
export default function ChangePassword() {
  //   const dispatch = useAppDispatch();
  //   const userOTP = useAppSelector((state) => state?.user?.otp);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");
  // check enable change password
  //   useEffect(() => {
  //     if (!userOTP?.enabaleChangePassword) {
  //       navigate("/");
  //     }
  //   }, [navigate, userOTP?.enabaleChangePassword]);

  // handle change password
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log(data);
    // const newData = {
    //   ...data,
    //   userID: userOTP?.userId,
    //   dateUpdate: new Date(),
    // };
    // const response = await ChangePasswordUser(newData, showToast);
    // if (response) {
    //   dispatch(setResetOTP());
    //   navigate("/");
    // }
  };
  //   if (!userOTP?.enabaleChangePassword) return;

  return (
    <form
      className="min-h-screen flex items-center justify-center pt-6"
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
            name="password"
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
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
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

        <Button type="submit" className="w-full font-bold cursor-pointer">
          تفيير كلمة المرور
        </Button>
      </div>
    </form>
  );
}
