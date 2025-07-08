"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/formCurrency";
import { IItemColor, IItemSize, IProduct } from "@/types/product/IProduct";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import IncreaseAndDecrease from "./IncreaseAndDecrease";

export default function TabSingleColors({
  selectedColor,
  product,
  selectedSize,
}: {
  selectedColor: IItemColor;
  product: IProduct;
  selectedSize: IItemSize;
}) {
  const t = useTranslations("singleProduct");
  const {
    isInCart,
    removeFromCart,
    addToCart,
    getItemById,
    increaseQty,
    decreaseQty,
  } = useCart();
  const quantityItem = getItemById(selectedColor?.id, "color");

  // add product for cart
  const handleAddProductToCard = () => {
    if (selectedColor?.stock <= 0) return toast.error("لا توجد كمية حاليا");
    addToCart({
      id: product?.id,
      nameAr: product?.nameAr,
      nameEng: product?.nameEng,
      nameAbree: product?.nameAbree,
      normailPrice: product?.normailPrice,
      image: product?.viewImagesItems[0]?.imageUrl,
      isOrderSize: true,
      idSize: selectedSize.id,
      idColor: selectedColor.id,
      priceForColor: selectedColor.normailPrice,
    });
  };
  if (!selectedColor) return;
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 mt-2 text-sm text-gray-700">
        <div className="flex gap-2 items-center">
          <span className="font-[600] text-xl">Quantity :</span>
          <span className="text-lg"> {selectedColor?.stock}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-[600] text-xl">Price :</span>
          <span className="text-lg">
            {formatCurrency(selectedColor?.normailPrice)}
          </span>
        </div>
        {isInCart(selectedColor?.id, "color") && (
          <IncreaseAndDecrease
            quantity={quantityItem?.quantityForColor || 0}
            onIncrease={() => increaseQty(selectedColor?.id, "color")}
            onDecrease={() => decreaseQty(selectedColor?.id, "color")}
          />
        )}
        {isInCart(selectedColor?.id, "color") ? (
          <Button
            className="flex items-center gap-2 justify-center w-full sm:w-[200px] cursor-pointer dark:bg-gray-600 text-white"
            onClick={() => removeFromCart(selectedColor?.id, "color")}
          >
            <p> {t("removeFromCart")}</p>
            <ShoppingCart className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            className="flex items-center gap-2 justify-center w-full sm:w-[200px] cursor-pointer dark:bg-gray-600 text-white"
            onClick={handleAddProductToCard}
          >
            <p> {t("addtoCart")}</p>
            <ShoppingCart className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
