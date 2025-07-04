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

export default function DialogConfirmCancel({
  open,
  onClose,
  confirmCancel,
}: {
  open: boolean;
  onClose: () => void;
  confirmCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">تأكيد إلغاء الطلب</DialogTitle>
        </DialogHeader>
        <p className="mb-3 text-lg">
          هل أنت متأكد أنك تريد إلغاء هذا الطلب؟
        </p>
        <Separator />
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button className="bg-red-500" onClick={confirmCancel}>
            نعم، إلغاء الطلب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
