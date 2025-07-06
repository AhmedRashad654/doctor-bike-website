"use client";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user/IUser";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooksRedux";
import { useRouter } from "@/i18n/navigation";
import { UpdateProfileUser } from "@/services/auth/auth";
import { setUser } from "@/redux/features/userSlice";
import { toast } from "sonner";

export default function DataUserUpdate() {
  const user = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // handle login

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      userName: "",
      phoneNumber: "",
      phoneNumber2: "",
      city: "",
      address: "",
    },
  });
  useEffect(() => {
    setValue("email", user?.data?.email);
    setValue("userName", user?.data?.userName);
    setValue("phoneNumber", user?.data?.phoneNumber);
    setValue("phoneNumber2", user?.data?.phoneNumber2);
    setValue("city", user?.data?.city);
    setValue("address", user?.data?.address);
  }, [
    setValue,
    user?.data?.address,
    user?.data?.city,
    user?.data?.email,
    user?.data?.phoneNumber,
    user?.data?.phoneNumber2,
    user?.data?.userName,
  ]);
  //   const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const newDate = {
      ...user?.data,
      ...data,
      dateUpdate: new Date().toISOString(),
    };
    const response = await UpdateProfileUser(newDate, toast);
    if (response) {
      dispatch(setUser(response?.data));
    }
  };
  // protected Routed
  useEffect(() => {
    if (user?.status === "succeeded" && user?.data?.id === "") {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <form
      className="min-h-[calc(100vh-100px)] flex items-center justify-center pt-28 py-4 md:py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold">البيانات الشخصية</h2>
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
          <Label htmlFor="name" className="mb-1 block">
            الاسم
          </Label>
          <Controller
            control={control}
            name="userName"
            rules={{ required: " الاسم مطلوب" }}
            render={({ field }) => (
              <Input
                placeholder="ادخل  الاسم"
                type="text"
                className="py-5"
                {...field}
              />
            )}
          />
          {errors.userName && (
            <p className="text-red-500 text-xs">{errors.userName.message}</p>
          )}
        </div>{" "}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="phoneNumber" className="mb-1 block">
            رقم الهاتف
          </Label>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <Input
                placeholder="ادخل  رقم الهاتف"
                type="text"
                className="py-5"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}
        </div>{" "}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="phoneNumber2" className="mb-1 block">
            رقم الهاتف البديل
          </Label>
          <Controller
            control={control}
            name="phoneNumber2"
            render={({ field }) => (
              <Input
                placeholder="ادخل  رقم الهاتف البديل"
                type="text"
                className="py-5"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
          {errors.phoneNumber2 && (
            <p className="text-red-500 text-xs">
              {errors.phoneNumber2.message}
            </p>
          )}
        </div>{" "}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="city" className="mb-1 block">
            المدينة
          </Label>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ادخل المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cairo">القاهرة</SelectItem>
                  <SelectItem value="giza">الجيزة</SelectItem>
                  <SelectItem value="alex">الإسكندرية</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="address" className="mb-1 block">
            العنوان
          </Label>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <Textarea
                placeholder="ادخل العنوان بالتفصيل ..."
                className="py-2"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full font-bold cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? "جاري التحميل" : "حفظ"}
        </Button>
      </div>
    </form>
  );
}
