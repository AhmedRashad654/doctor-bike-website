"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DialogConfirmCancel from "./DialogConfirmCancel";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import Empty from "@/components/ui/Empty";
import emptyImage from "@/public/empty.png";
import ButtonPagination from "@/components/pagination/ButtonBagination";
type OrderStatus = "جارية" | "مكتملة" | "ملغية";

interface Order {
  id: string;
  products: string[];
  date: string;
  status: OrderStatus;
}

const sampleOrders: Order[] = [
  {
    id: "1",
    products: ["دراجة هوائية", "خوذة حماية"],
    date: "2023-07-01",
    status: "جارية",
  },
  {
    id: "2",
    products: ["مضخة هواء"],
    date: "2023-06-20",
    status: "مكتملة",
  },
  {
    id: "3",
    products: ["إطار دراجة"],
    date: "2023-06-25",
    status: "ملغية",
  },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("جارية");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const locale = useLocale();

  const filteredOrders = sampleOrders.filter(
    (order) => order.status === activeTab
  );

  const baseColumns =
    locale === "ar"
      ? [
          { key: "status", label: "الحالة" },
          { key: "date", label: "تاريخ الطلب" },
          { key: "name", label: "اسم المنتج" },
        ]
      : [
          { key: "name", label: "Product Name" },
          { key: "date", label: "Order Date" },
          { key: "status", label: "Status" },
        ];

  const columns =
    activeTab === "جارية"
      ? locale !== "ar"
        ? [...baseColumns, { key: "action", label: "cancel order" }]
        : [{ key: "action", label: "إلغاء الطلب" }, ...baseColumns]
      : baseColumns;

  const openCancelDialog = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpenDialog(true);
  };

  const confirmCancel = () => {
    console.log("تم إلغاء الطلب رقم:", selectedOrderId);
    setOpenDialog(false);
    setSelectedOrderId(null);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };
  if (filteredOrders?.length === 0)
    return <Empty emptyImage={emptyImage} text={"لا يوجد طلبات حاليا"} />;
  return (
    <div className="max-w-7xl mx-auto p-6 pt-32 md:pt-36">
      <h1 className="text-2xl font-bold mb-6 text-center">طلباتي</h1>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as OrderStatus)}
        className="mb-6"
      >
        <TabsList className="w-full justify-center bg-gray-100 dark:bg-gray-800 rounded-md p-1">
          <TabsTrigger value="جارية" className="cursor-pointer">
            الطلبات الجارية
          </TabsTrigger>
          <TabsTrigger value="مكتملة" className="cursor-pointer">
            الطلبات المكتملة
          </TabsTrigger>
          <TabsTrigger value="ملغية" className="cursor-pointer">
            الطلبات الملغية
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {
            <div className="overflow-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="text-center py-2 whitespace-nowrap"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="text-center border-t">
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="py-2 whitespace-nowrap px-4"
                        >
                          {col.key === "name" ? (
                            order.products.join("، ")
                          ) : col.key === "status" ? (
                            <span
                              className={cn(
                                "p-1 rounded-full px-6 font-semibold",
                                order.status === "جارية"
                                  ? "bg-yellow-500"
                                  : order.status === "مكتملة"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              )}
                            >
                              {order.status}
                            </span>
                          ) : col.key === "action" ? (
                            <Button
                              size="sm"
                              className="bg-red-500"
                              onClick={() => openCancelDialog(order.id)}
                            >
                              {locale === "ar" ? "إلغاء" : "Cancel"}
                            </Button>
                          ) : (
                            order[col.key as keyof Order]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </TabsContent>
      </Tabs>

      <DialogConfirmCancel
        open={openDialog}
        onClose={closeDialog}
        confirmCancel={confirmCancel}
      />
      <ButtonPagination totalPages={6} />
    </div>
  );
}
