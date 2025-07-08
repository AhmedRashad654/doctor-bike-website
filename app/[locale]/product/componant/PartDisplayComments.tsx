"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader, Send } from "lucide-react";
import { IComment, IProduct } from "@/types/product/IProduct";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooksRedux";
import { toast } from "sonner";
import {
  CreateComment,
  GetCommentForProduct,
} from "@/services/comment/comment";
export default function PartDisplayComments({
  product,
}: {
  product: IProduct;
}) {
  const locale = useLocale();
  const params = useParams();
  const [comments, setComments] = useState<IComment[]>();
  const [valueComment, setValueComment] = useState<string>("");
  const t = useTranslations("singleProduct");
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state?.user?.data);
  // get comment for product
  useEffect(() => {
    async function getCommentForProduct() {
      if (params?.id) {
        await GetCommentForProduct(params?.id).then((res) => {
          setComments(res?.rows);
        });
      }
    }
    getCommentForProduct();
  }, [params?.id]);


  // handle Add Comment
  const handleAddComment = async () => {
    if (!params?.id) return;
    if (!user?.id) {
      toast.error("يجب تسجيل الدخول اولا");
      return;
    }
    if (!valueComment) {
      toast.error("يجب كتابة التعليق");
      return;
    }
    const data = {
      id: 0,
      comment: valueComment,
      productId: product?.id,
      productName: product?.nameAr,
      rate: 0,
      userName: user?.userName || "un Know",
      dateAdd: new Date().toISOString(),
    };
    setLoading(true);
    const response = await CreateComment(data);
    if (response) {
      setComments((prev) => [response, ...(prev || [])]);
      toast.success("تم انشاء التعليق بنجاح");
    }
    setValueComment("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 mt-2">
      <div className="relative w-full md:max-w-sm bg-white dark:bg-gray-800 rounded-md">
        <Input
          type="text"
          placeholder={t("addOpinion")}
          className="p-5"
          onChange={(e) => setValueComment(e.target.value)}
          value={valueComment}
        />
        <button
          className={cn(
            "absolute  top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.3] transition duration-300 flex gap-1 items-center",
            locale === "ar" ? "left-3" : "right-3"
          )}
          onClick={handleAddComment}
        >
          {loading && <Loader className="animate-spin h-5 w-5 " />}

          <Send className="h-5 w-5 " />
        </button>
      </div>
      {comments?.length === 0 ? (
        <p className=" text-gray-700 dark:text-white text-center mt-5 text-xl">
          لا يوجد تعليقات حتى الآن
        </p>
      ) : (
        comments?.map((comment) => (
          <div key={comment?.id}>
            <Card className="w-full max-w-7xl shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {comment?.userName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-white">
                  {comment?.comment}
                </p>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}
