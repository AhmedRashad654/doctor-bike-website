import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/formCurrency";
import { ICity } from "@/types/city/ICity";
import { IUser } from "@/types/user/IUser";
import { useLocale, useTranslations } from "next-intl";
import { UseFormGetValues } from "react-hook-form";
export default function DialogDetailsCheckout({
  open,
  onClose,
  getValues,
  codeResult,
  city,
}: {
  open: boolean;
  onClose: () => void;
  getValues: UseFormGetValues<IUser>;
  codeResult: {
    codeId: number;
    codeName: string;
    codePercentage: number;
  } | null;
  city: ICity[];
}) {
  const { totalItems, totalPriceWithOutDiscount, totalPriceWithDiscount } =
    useCart();
  const t = useTranslations("order");
  const t2 = useTranslations("cart");

  const delivaryCity = city?.find((e) => String(e?.id) === getValues("cityId"));
  const locale = useLocale();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center mb-2">
            {t("detailsCheckout")}
          </DialogTitle>
          <div className="flex flex-col gap-3 px-0 md:px-2 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <span> {t("name")} :</span>
              <span> {getValues("userName")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> {t("phoneNumber")} :</span>
              <span> {getValues("phoneNumber")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> {t("phoneNumber2")} :</span>
              <span> {getValues("phoneNumber2")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> {t("city")} :</span>
              <span>
                {locale === "ar"
                  ? delivaryCity?.cityNameAr
                  : locale === "en"
                  ? delivaryCity?.cityNameEng
                  : delivaryCity?.cityNameAbree}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span> {t("address")} :</span>
              <span> {getValues("address")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> {t("codeDiscount")} :</span>
              <span> {codeResult?.codeName} </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span> {t("totalItems")}</span>
              <span>
                {totalItems} {t("items")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span> {t("dliveryPrice")}</span>
              <span>
                {delivaryCity && formatCurrency(delivaryCity?.deliver)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>
                {" "}
                {t2("totalPrice")}
                <span> </span>( {t("afterDlivery")} )
              </span>
              <span>
                {delivaryCity
                  ? formatCurrency(
                      totalPriceWithOutDiscount + delivaryCity?.deliver
                    )
                  : totalPriceWithOutDiscount}
              </span>
            </div>
            <div className="flex items-center gap-1 justify-between flex-wrap">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="whitespace-nowrap">
                  {" "}
                  {t2("totalPriceAfterDiscount")}
                </span>
                <span className="whitespace-nowrap">
                  {" "}
                  ( {t("afterDlivery")} )
                </span>
              </div>

              <span>
                {delivaryCity
                  ? formatCurrency(
                      totalPriceWithDiscount + delivaryCity?.deliver
                    )
                  : formatCurrency(totalPriceWithDiscount)}
              </span>
            </div>
            <div className="flex items-center gap-1 flex-wrap justify-between">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="whitespace-nowrap ">
                  {" "}
                  {t2("totalPriceAfterCodeDiscount")}
                </span>
                <span className="whitespace-nowrap ">
                  {" "}
                  ( {t("afterDlivery")} )
                </span>
              </div>

              <span>
                {codeResult?.codePercentage
                  ? formatCurrency(
                      totalPriceWithDiscount *
                        (1 - codeResult.codePercentage / 100) +
                        (delivaryCity?.deliver || 0)
                    )
                  : ""}
              </span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
