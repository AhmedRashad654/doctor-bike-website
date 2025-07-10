"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";

export default function DialogConfirmCancel({
  open,
  onClose,
  confirmCancel,
  loadingCancelOrder,
}: {
  open: boolean;
  onClose: () => void;
  confirmCancel: () => void;
  loadingCancelOrder: boolean;
}) {
  const t = useTranslations("order");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {" "}
            {t("confirmCancelOrder")}
          </DialogTitle>
        </DialogHeader>
        <p className="mb-3 text-lg text-center">{t("areYouSureCancelOrder")}</p>
        <Separator />
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button className="bg-red-500 cursor-pointer" onClick={confirmCancel}>
            {loadingCancelOrder ? (
              <Loader className="animate-spin w-4 h-4" />
            ) : (
              t("yesCancelOrders")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
