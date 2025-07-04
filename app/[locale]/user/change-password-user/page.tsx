"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { setUser } from "../../../redux/features/userSlice";
import { IUser } from "@/types/user/IUser";

export default function ChangePasswordUser() {
  //   const user = useAppSelector((state) => state?.user?.data);
  // handle login
  //   const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");
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
      className="min-h-screen flex items-center justify-center pt-16 md:pt-32 pb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold">تغيير كلمة المرور</h2>
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
          <Label htmlFor="password" className="mb-1 block">
            كلمة المرور الجديدة
          </Label>
          <Controller
            control={control}
            name="password"
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
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
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
                value === password ||
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
        <Button type="submit" className="w-full font-bold cursor-pointer">
          تعديل كلمة المرور
        </Button>
      </div>
    </form>
  );
}
