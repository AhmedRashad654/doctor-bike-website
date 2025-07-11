import { IProduct } from "../product/IProduct";

export interface IOrder {
  id: number;
  customerId: string;
  customerName: string;
  phoneNum1: string;
  phoneNum2: string;
  cityId: number | string;
  address: string;
  status: string;
  isWholesale?: boolean;
  priceDelivery: number;
  totalPriceWithDiscound: number;
  totalPriceWithOutDiscound: number;
  discoundCodeId?: number | null;
  discoundCodePercent?: number | null;
  discoundCode?: string | null;
  totalPriceWithDiscoundCode: number | null;
  userAddId?: string;
  dateAdd: string;
  userUpdate?: string;
  dateUpdate?: string;

  details: IOrderItem[];
}

export interface IOrderItem {
  item?: IProduct;
  id: number;
  orderId: number;
  itemId: number;
  isOrderSize: boolean;
  itemSizeId?: number | null;
  itemSizeColorId?: number | null;
  quantity: number;
  itemPrice: number;
  totalPriceWithDiscound: number;
  totalPriceWithOutDiscound: number;
}

