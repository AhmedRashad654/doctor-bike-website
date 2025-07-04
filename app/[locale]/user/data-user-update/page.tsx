"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { setUser } from "../../../redux/features/userSlice";
import { IUser } from "@/types/user/IUser";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function DataUserUpdate() {
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
      name: "",
      phoneNumber: "",
      phoneNumber2: "",
      city: "",
      address: "",
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
      className="min-h-screen flex items-center justify-center pt-28 md:pt-36 pb-4"
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
            name="name"
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
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>{" "}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="phoneNumber" className="mb-1 block">
            رقم الهاتف
          </Label>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: " رقم الهاتف مطلوب" }}
            render={({ field }) => (
              <Input
                placeholder="ادخل  رقم الهاتف"
                type="text"
                className="py-5"
                {...field}
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
            rules={{ required: " رقم الهاتف البديل مطلوب" }}
            render={({ field }) => (
              <Input
                placeholder="ادخل  رقم الهاتف البديل"
                type="text"
                className="py-5"
                {...field}
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
            rules={{ required: "  المدينة مطلوبة" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            rules={{ required: " العنوان مطلوب" }}
            render={({ field }) => (
              <Textarea
                placeholder="ادخل العنوان بالتفصيل ..."
                className="py-2"
                {...field}
              />
            )}
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full font-bold cursor-pointer">
          حفظ
        </Button>
      </div>
    </form>
  );
}
