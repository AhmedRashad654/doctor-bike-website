"use client";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { setUser } from "../../../redux/features/userSlice";
import { IUser } from "@/types/user/IUser";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogDetailsCheckout from "./DialogDetailsCheckout";
import { useRouter } from "@/i18n/navigation";
import { useCart } from "@/hooks/useCart";
export default function Checkout() {
  const { clearCart } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  //   const user = useAppSelector((state) => state?.user?.data);
  // handle login
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IUser>({
    defaultValues: {
      userName: "",
      phoneNumber: "",
      phoneNumber2: "",
      city: "",
      address: "",
      code: "",
    },
  });
  //   const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log(data);
    // const response = await LoginUser(data, showToast);
    // if (response) {
    //   dispatch(setUser(response?.data?.user));
    // }
    clearCart();
    router.replace("/success-checkout");
  };
  // protected Routed
  //   useEffect(() => {
  //     if (user?.id !== "") {
  //         router.replace("/");
  //     }
  //   }, [router, user?.id]);

  return (
    <>
      <form
        className="min-h-screen flex items-center justify-center pt-28 md:pt-36 pb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
          <h2 className="text-2xl font-semibold">الدفع</h2>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="name" className="mb-1 block">
              الاسم بالكامل
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
              rules={{ required: " رقم الهاتف مطلوب" }}
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
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
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
              rules={{ required: "  المدينة مطلوبة" }}
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
              rules={{ required: " العنوان مطلوب" }}
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
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="code" className="mb-1 block">
              كود الخصم
            </Label>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Input
                  placeholder="ادخل  كود الخصم"
                  type="number"
                  className="py-5"
                  {...field}
                />
              )}
            />
            {errors.code && (
              <p className="text-red-500 text-xs">{errors.code.message}</p>
            )}
          </div>{" "}
          {isValid && (
            <div className="w-full" onClick={handleOpenDialog}>
              <h6 className="text-blue-400 text-xs cursor-pointer">
                تفاصيل الفاتورة
              </h6>
            </div>
          )}
          <Button type="submit" className="w-full font-bold cursor-pointer">
            تاكيد الطلب
          </Button>
        </div>
      </form>
      <DialogDetailsCheckout
        open={openDialog}
        onClose={handleClose}
        getValues={getValues}
      />
    </>
  );
}
