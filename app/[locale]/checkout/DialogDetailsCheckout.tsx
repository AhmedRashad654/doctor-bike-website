import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { IUser } from "@/types/user/IUser";
import { UseFormGetValues } from "react-hook-form";
export default function DialogDetailsCheckout({
  open,
  onClose,
  getValues,
}: {
  open: boolean;
  onClose: () => void;
  getValues: UseFormGetValues<IUser>;
}) {
  const { totalItems, totalPrice } = useCart();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-2">
            تفاصيل الفاتورة
          </DialogTitle>
          <div className="flex flex-col gap-3 px-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <span>الاسم بالكامل :</span>
              <span> {getValues("userName")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> رقم الجوال :</span>
              <span> {getValues("phoneNumber")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> رقم الجوال البديل :</span>
              <span> {getValues("phoneNumber2")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> المدينة :</span>
              <span> {getValues("city")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> العنوان بالتفصيل :</span>
              <span> {getValues("address")} </span>
            </div>
            <div className="flex items-center gap-1">
              <span> كود الخصم :</span>
              <span> {getValues("code")} </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>عدد القطع</span>
              <span>{totalItems} قطع</span>
            </div>
            <div className="flex items-center justify-between">
              <span> سعر التوصيل</span>
              <span>20</span>
            </div>
            <div className="flex items-center justify-between">
              <span> السعر الاجمالي ( شامل التوصيل)</span>
              <span>{totalPrice + 20}</span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
