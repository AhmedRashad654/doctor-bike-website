"use client";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user/IUser";
import { Textarea } from "@/components/ui/textarea";
import DialogDetailsCheckout from "./DialogDetailsCheckout";
import { useRouter } from "@/i18n/navigation";
import { useCart } from "@/hooks/useCart";
import { useAppSelector } from "@/redux/hooksRedux";
import { useLocale, useTranslations } from "next-intl";
import {
  CheckOnDiscountCodeApi,
  CreateOrderApi,
} from "@/services/orders/orders";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import CustomSelect from "@/components/ui/CustomSelect";
import { formatCurrency } from "@/lib/formCurrency";

export default function Checkout() {
  const {
    cart,
    totalPriceWithDiscount,
    totalPriceWithOutDiscount,
    initialized,
  } = useCart();
  const t = useTranslations("order");
  const [openDialog, setOpenDialog] = useState(false);
  const [code, setCode] = useState<string>("");
  const [codeResult, setCodeResult] = useState<{
    codeId: number;
    codeName: string;
    codePercentage: number;
  } | null>(null);
  const [loadingCode, setLoadingCode] = useState<boolean>(false);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);

  const city = useAppSelector((state) => state?.city);
  const user = useAppSelector((state) => state?.user);
  const locale = useLocale();
  const router = useRouter();
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
    setValue,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
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

  const checkOnCodeDiscount = async () => {
    setLoadingCode(true);
    const response = await CheckOnDiscountCodeApi(code, user?.data?.id);
    if (
      response &&
      response?.status === 200 &&
      response?.data?.isActive === true
    ) {
      setCodeResult({
        codeName: response?.data?.code,
        codeId: response?.data?.id,
        codePercentage: response?.data?.discoundPercent,
      });
      toast.success(t("codeAvailabe"));
    } else {
      toast.success(t("codeNotAvailable"));
    }
    setLoadingCode(false);
  };

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const delivaryCity = city?.data?.find(
      (e) => e?.id === Number(data?.cityId)
    );

    const detailsOrder = cart.map((item) => {
      const quantity = item.isOrderSize ? item.quantityForColor : item.quantity;
      const itemPrice =
        item.isOrderSize && item.priceForColor > 0
          ? item.priceForColor
          : item.normailPrice;
      const totalPriceWithOutDiscound = itemPrice * quantity;
      const totalPriceWithDiscound = (itemPrice - item.discount) * quantity;
      const isOrderSize = item?.isOrderSize;
      if (isOrderSize === true) {
        return {
          id: 0,
          orderId: 0,
          itemId: Number(item?.id),
          isOrderSize: item.isOrderSize,
          itemSizeId: Number(item.idSize),
          itemSizeColorId: Number(item.idColor),
          quantity,
          itemPrice,
          totalPriceWithDiscound,
          totalPriceWithOutDiscound,
        };
      } else {
        return {
          id: 0,
          orderId: 0,
          itemId: Number(item?.id),
          isOrderSize: item.isOrderSize,
          quantity,
          itemPrice,
          totalPriceWithDiscound,
          totalPriceWithOutDiscound,
        };
      }
    });
    const newData = {
      id: 0,
      customerId: user?.data?.id,
      customerName: data?.userName,
      phoneNum1: data?.phoneNumber || "",
      phoneNum2: data?.phoneNumber2 || "",
      cityId: data?.cityId ?? 0,
      address: data?.address ?? "",
      status: "New",
      priceDelivery: delivaryCity?.deliver ?? 0,
      totalPriceWithDiscound:
        totalPriceWithDiscount + (delivaryCity?.deliver || 0),
      totalPriceWithOutDiscound:
        totalPriceWithOutDiscount + (delivaryCity?.deliver || 0),
      discoundCodeId: codeResult?.codeId ? codeResult?.codeId : null,
      discoundCodePercent: codeResult?.codePercentage
        ? codeResult?.codePercentage
        : null,
      discoundCode: codeResult?.codeName ? codeResult?.codeName : null,
      totalPriceWithDiscoundCode: codeResult?.codePercentage
        ? totalPriceWithDiscount * (1 - codeResult.codePercentage / 100) +
          (delivaryCity?.deliver || 0)
        : null,
      dateAdd: new Date().toISOString(),
      dateUpdate: new Date().toISOString(),
      userUpdate: "",
      userAddId: "",
      details: detailsOrder,
    };
    setLoadingOrder(true);
    const response = await CreateOrderApi(newData);
    if (response?.status === 200) {
      router.replace("/success-checkout");
    } else {
      toast.error("faild in create order");
    }
    console.log(response);
    setLoadingOrder(false);
  };
  useEffect(() => {
    if (initialized === true && cart.length === 0) {
      router.replace("/");
    }
  });
  return (
    <>
      <form
        className="min-h-screen flex items-center justify-center py-6 md:py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[340px] md:w-[450px] flex flex-col items-center gap-5">
          <h2 className="text-2xl font-semibold">{t("checkout")}</h2>
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
                  value={field.value ?? ""}
                />
              )}
            />
            {errors.userName && (
              <p className="text-red-500 text-xs">{errors.userName.message}</p>
            )}
          </div>{" "}
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="phoneNumber" className="mb-1 block">
              {t("phoneNumber")}
            </Label>
            <Controller
              control={control}
              name="phoneNumber"
              rules={{ required: t("phoneNumberRequired") }}
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
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>{" "}
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="phoneNumber2" className="mb-1 block">
              {t("phoneNumber2")}
            </Label>
            <Controller
              control={control}
              name="phoneNumber2"
              rules={{ required: t("phoneNumber2Required") }}
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
            <Label htmlFor="city" className="mb-1 block">
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
                            ? city.cityNameAr +
                              " - " +
                              formatCurrency(city.deliver)
                            : locale === "en"
                            ? city.cityNameEng +
                              " - " +
                              formatCurrency(city.deliver)
                            : city.cityNameAbree +
                              " - " +
                              formatCurrency(city.deliver),
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
              rules={{ required: t("addressRequired") }}
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
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="code" className="mb-1 block">
              {t("codeDiscount")}
            </Label>
            <div className="w-full flex items-center gap-2">
              <Input
                placeholder={t("enterCodeDiscount")}
                type="text"
                className="py-5"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setCodeResult(null);
                }}
              />
              {code && code?.length > 0 && (
                <div
                  onClick={checkOnCodeDiscount}
                  className={`cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
              bg-primary text-primary-foreground hover:bg-primary/90
              dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90
              h-10 px-4 py-2`}
                >
                  {loadingCode ? (
                    <Loader className="animate-spin h-5 w-5" />
                  ) : (
                    t("checkCodeDiscount")
                  )}
                </div>
              )}
            </div>
          </div>{" "}
          <div className="w-full" onClick={handleOpenDialog}>
            <h6 className="text-blue-400 text-xs cursor-pointer">
              {t("detailsCheckout")}
            </h6>
          </div>
          <Button type="submit" className="w-full font-bold cursor-pointer">
            {loadingOrder ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              t("confirmOrder")
            )}
          </Button>
        </div>
      </form>
      <DialogDetailsCheckout
        open={openDialog}
        onClose={handleClose}
        getValues={getValues}
        codeResult={codeResult}
        city={city?.data}
      />
    </>
  );
}
