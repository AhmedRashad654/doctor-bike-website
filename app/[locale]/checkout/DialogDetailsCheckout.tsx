import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { ICity } from "@/types/city/ICity";
import { IUser } from "@/types/user/IUser";
import { useTranslations } from "next-intl";
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
  console.log(delivaryCity);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-2">
            {t("detailsCheckout")}
          </DialogTitle>
          <div className="flex flex-col gap-3 px-0 md:px-4 text-muted-foreground text-sm">
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
              <span> {getValues("city")} </span>
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
              <span>{delivaryCity?.deliver}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>
                {" "}
                {t2("totalPrice")}
                <span> </span>( {t("afterDlivery")})
              </span>
              <span>
                {delivaryCity
                  ? totalPriceWithOutDiscount + delivaryCity?.deliver
                  : totalPriceWithOutDiscount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="whitespace-nowrap">
                {" "}
                {t2("totalPriceAfterDiscount")}( {t("afterDlivery")})
              </span>
              <span>
                {delivaryCity
                  ? totalPriceWithDiscount + delivaryCity?.deliver
                  : totalPriceWithDiscount}
              </span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
