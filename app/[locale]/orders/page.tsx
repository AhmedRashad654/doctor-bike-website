"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DialogConfirmCancel from "./DialogConfirmCancel";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Empty from "@/components/ui/Empty";
import emptyImage from "@/public/empty.png";
import ButtonPagination from "@/components/pagination/ButtonBagination";
import { useAppSelector } from "@/redux/hooksRedux";
import {
  EditOnStatusOrder,
  GetMyOrdersByStatus,
} from "@/services/orders/orders";
import { IOrder, IOrderItem } from "@/types/order/IOrder";
import { useSearchParams } from "next/navigation";
import SkeletonOrder from "./skeletonOrder";
import { toast } from "sonner";
type OrderStatus = "New" | "Pending" | "Done" | "canceled";
interface StateOrder {
  rows: IOrder[];
  paginationInfo: {
    totalPagesCount: number;
  };
}
export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("New");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);
  const [loadingCancelOrder, setLoadingCancelOrder] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const t = useTranslations("order");
  const user = useAppSelector((state) => state?.user?.data);
  const [orders, setOrders] = useState<StateOrder>();
  const locale = useLocale();

  useEffect(() => {
    async function getOrders() {
      setLoadingOrder(true);
      const response = await GetMyOrdersByStatus(activeTab, user?.id, page);
      setOrders(response?.data);
      setLoadingOrder(false);
    }
    getOrders();
  }, [activeTab, user?.id, page]);

  const openCancelDialog = (order: IOrder) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const confirmCancel = async () => {
    const newDate = {
      ...selectedOrder,
      status: "Canceled",
    };
    setLoadingCancelOrder(true);
    const response = await EditOnStatusOrder(newDate);
    if (response?.status === 200) {
      setOpenDialog(false);
      setSelectedOrder(null);
      setOrders((prevOrders) => {
        if (!prevOrders) return undefined;
        return {
          ...prevOrders,
          rows: prevOrders.rows.filter(
            (order) => order.id !== selectedOrder?.id
          ),
        };
      });
      toast.success(t("orderCanceledSuccessfully"));
    } else {
      toast.error(t("errorOccurDuringEditOrder"));
    }
    setLoadingCancelOrder(false);
    console.log(response, "update Status");
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  function extractItemNamesByLanguage(
    details: IOrderItem[],
    lang: string
  ): string {
    const names = details.map((detail) => {
      const item = detail.item;
      if (!item) return "";

      switch (lang) {
        case "ar":
          return item.nameAr;
        case "en":
          return item.nameEng;
        case "he":
          return item.nameAbree;
        default:
          return item.nameEng;
      }
    });
    const separator = lang === "ar" ? " ، " : " , ";
    return names.filter(Boolean).join(separator);
  }
  const classDirestion = locale === "en" ? "text-start" : "text-end";
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 md:py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">{t("myOrders")}</h1>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as OrderStatus)}
        className="mb-6"
      >
        <TabsList className="w-full justify-center bg-gray-100 dark:bg-gray-800 rounded-md p-1">
          <TabsTrigger value="New" className="cursor-pointer">
            {t("New")}
          </TabsTrigger>
          <TabsTrigger value="Pending" className="cursor-pointer">
            {t("Pending")}
          </TabsTrigger>
          <TabsTrigger value="Done" className="cursor-pointer">
            {t("Done")}
          </TabsTrigger>
          <TabsTrigger value="Canceled" className="cursor-pointer">
            {t("Canceled")}
          </TabsTrigger>
        </TabsList>
        {orders && orders?.rows?.length === 0 && (
          <Empty emptyImage={emptyImage} text={t("noFoundOrerYet")} />
        )}
        {loadingOrder ? (
          <SkeletonOrder />
        ) : orders && orders?.rows?.length > 0 ? (
          <TabsContent value={activeTab}>
            {
              <div className="overflow-auto mt-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th
                        className={cn(
                          classDirestion,
                          "py-2 whitespace-nowrap px-2"
                        )}
                      >
                        {t("nameProducts")}
                      </th>
                      <th
                        className={cn(
                          classDirestion,
                          "py-2 whitespace-nowrap px-2"
                        )}
                      >
                        {t("dateOrder")}
                      </th>
                      <th
                        className={cn(
                          classDirestion,
                          "py-2 whitespace-nowrap px-2"
                        )}
                      >
                        {t("status")}
                      </th>
                      {activeTab === "New" && (
                        <th
                          className={cn(
                            classDirestion,
                            "py-2 whitespace-nowrap px-2"
                          )}
                        >
                          {t("cancelOrder")}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.rows?.map((order: IOrder) => (
                      <tr key={order.id} className="border-t">
                        <td className={cn(classDirestion, "py-2 px-2")}>
                          <span className="whitespace-nowrap">
                            {extractItemNamesByLanguage(order?.details, locale)}
                          </span>
                        </td>
                        <td className={cn(classDirestion, "py-2 px-2")}>
                          {new Date(order?.dateAdd).toLocaleDateString()}
                        </td>
                        <td className={cn(classDirestion, "py-2 px-2")}>
                          <span
                            className={cn(
                              "p-1 rounded-full px-6 font-semibold",
                              order.status === "New"
                                ? "bg-yellow-500"
                                : order.status === "Done"
                                ? "bg-green-500"
                                : order?.status === "Canceled"
                                ? "bg-blue-500"
                                : "bg-red-500"
                            )}
                          >
                            {order.status}
                          </span>
                        </td>
                        {activeTab === "New" && (
                          <td
                            className={cn(
                              classDirestion,
                              "py-2 px-2 cursor-pointer"
                            )}
                          >
                            <Button
                              size="sm"
                              className="bg-red-500 cursor-pointer"
                              onClick={() => openCancelDialog(order)}
                            >
                              {locale === "ar" ? "إلغاء" : "Cancel"}
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </TabsContent>
        ) : (
          ""
        )}
      </Tabs>

      <DialogConfirmCancel
        open={openDialog}
        onClose={closeDialog}
        confirmCancel={confirmCancel}
        loadingCancelOrder={loadingCancelOrder}
      />
      {orders && (
        <ButtonPagination
          totalPages={orders?.paginationInfo?.totalPagesCount || 1}
        />
      )}
    </div>
  );
}
