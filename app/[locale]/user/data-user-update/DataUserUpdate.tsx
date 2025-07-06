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
import { UpdateProfileUser } from "@/services/auth/auth";
import { setUser } from "@/redux/features/userSlice";
import { toast } from "sonner";
import { fetchCity } from "@/redux/features/citySlice";
import { useLocale } from "next-intl";

export default function DataUserUpdate() {
  const user = useAppSelector((state) => state?.user);
  const city = useAppSelector((state) => state?.city);
  const locale = useLocale();
  const dispatch = useAppDispatch();

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
      cityId: "",
      address: "",
    },
  });
  useEffect(() => {
    setValue("email", user?.data?.email);
    setValue("userName", user?.data?.userName);
    setValue("phoneNumber", user?.data?.phoneNumber);
    setValue("phoneNumber2", user?.data?.phoneNumber2);
    setValue("cityId", String(user?.data?.cityId));
    setValue("address", user?.data?.address);
  }, [
    setValue,
    user?.data?.address,
    user?.data?.cityId,
    user?.data?.email,
    user?.data?.phoneNumber,
    user?.data?.phoneNumber2,
    user?.data?.userName,
    city,
    locale,
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
  // fetch city
  useEffect(() => {
    if (city?.status === "idle") {
      dispatch(fetchCity());
    }
  }, [city?.status, dispatch]);



  return (
    <form
      className="min-h-[calc(100vh-160px)] flex items-center justify-center py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
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
          <Label htmlFor="cityId" className="mb-1 block">
            المدينة
          </Label>
          <Controller
            control={control}
            name="cityId"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={
                  field.value !== undefined && field.value !== null
                    ? String(field.value)
                    : ""
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ادخل المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {city?.data
                    ?.filter((city) => city.isShow === true)
                    .map((city) => (
                      <SelectItem key={city.id} value={String(city.id)}>
                        {
                          city[
                            locale === "ar"
                              ? "cityNameAr"
                              : locale === "en"
                              ? "cityNameEng"
                              : "cityNameAbree"
                          ]
                        }
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.cityId && (
            <p className="text-red-500 text-xs">{errors.cityId.message}</p>
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
        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري التحميل" : "حفظ"}
        </Button>
      </div>
    </form>
  );
}
