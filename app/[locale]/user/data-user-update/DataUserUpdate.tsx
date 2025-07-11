"use client";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user/IUser";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/redux/hooksRedux";
import { UpdateProfileUser } from "@/services/auth/auth";
import { setUser } from "@/redux/features/userSlice";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import CustomSelect from "@/components/ui/CustomSelect";

export default function DataUserUpdate() {
  const user = useAppSelector((state) => state?.user);
  const city = useAppSelector((state) => state?.city);
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const t = useTranslations("auth");

  // handle login
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
      phoneNumber2: "",
      cityId: "",
      address: "",
    },
  });

  useEffect(() => {
    setValue("email", user?.data?.email);
    setValue("fullName", user?.data?.fullName);
    setValue("phoneNumber", user?.data?.phoneNumber);
    setValue("phoneNumber2", user?.data?.phoneNumber2);
    setValue("cityId", String(user?.data?.cityId));
    setValue("address", user?.data?.address);
  }, [setValue, user?.data, city, locale]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const newDate = {
      ...user?.data,
      ...data,
      cityId: Number(data?.cityId) ?? null,
      dateUpdate: new Date().toISOString(),
    };
    const response = await UpdateProfileUser(newDate, toast);
    if (response) {
      dispatch(setUser(response?.data));
    }
  };
  return (
    <form
      className="min-h-[calc(100vh-160px)] flex items-center justify-center py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
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
          <Label htmlFor="name" className="mb-1 block">
            {t("name")}
          </Label>
          <Controller
            control={control}
            name="fullName"
            rules={{ required: t("nameRequired") }}
            render={({ field }) => (
              <Input
                placeholder={t("enterName")}
                type="text"
                className="py-5"
                {...field}
              />
            )}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>{" "}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="phoneNumber" className="mb-1 block">
            {t("phoneNumber")}
          </Label>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <Input
                placeholder={t("enterPhoneNumber")}
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
            {t("phoneNumber2")}
          </Label>
          <Controller
            control={control}
            name="phoneNumber2"
            render={({ field }) => (
              <Input
                placeholder={t("enterPhoneNumber2")}
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
            {t("city")}
          </Label>
          <Controller
            control={control}
            name="cityId"
            render={({ field }) => (
              <CustomSelect
                {...field}
                placeholder={t("enterCity")}
                options={
                  city?.data
                    ?.filter((city) => city.isShow)
                    .map((city) => ({
                      value: String(city.id),
                      label:
                        locale === "ar"
                          ? city.cityNameAr
                          : locale === "en"
                          ? city.cityNameEng
                          : city.cityNameAbree,
                    })) || []
                }
                value={field.value ?? ""}
              />
            )}
          />

          {errors.cityId && (
            <p className="text-red-500 text-xs">{errors.cityId.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="address" className="mb-1 block">
            {t("address")}
          </Label>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <Textarea
                placeholder={t("enterAddressWithDetails")}
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
          {isSubmitting ? t("loading") : t("save")}
        </Button>
      </div>
    </form>
  );
}
