export interface IImageProduct {
  id: number;
  imageUrl: string;
  itemId: number;
}

export interface IItemColor {
  colorAbbr: string;
  colorAr: string;
  colorEn: string;
  discount: number;
  id: number;
  normailPrice: number;
  sizeId: number | string;
  stock: number;
  wholesalePrice: number;
}
export interface IItemSize {
  id: number | string;
  itemId: number;
  size: string;
  discount: number;
  description: string | null;
  itemSizeColor: IItemColor[];
}
export interface IProduct {
  id: number;
  nameAr: string;
  nameEng: string;
  nameAbree: string;
  isShow: boolean;
  descriptionAr: string;
  descriptionEng: string;
  descriptionAbree: string;
  videoUrl: string | null;
  normailPrice: number;
  wholesalePrice: number;
  stock: number;
  model: string;
  isNewItem: boolean;
  isMoreSales: boolean;
  rate: number;
  manufactureYear: number;
  discount: number;
  userIdAdd: string | number | null;
  dateAdd: string;
  userIdUpdate: string | number | null;
  dateUpdate: string;
  //   supCategory: any[]; // عدلها لنوع مخصص لو عندك
  normalImagesItems: IImageProduct[];
  _3DImagesItems: IImageProduct[];
  viewImagesItems: IImageProduct[];
  itemSizes: IItemSize[];
}
export interface IComment {
  id: number;
  comment: string;
  productId: number | string;
  productName: string;
  rate: number;
  userName: string;
  userAddId?: string;
  isShow?: boolean;
  dateAdd: Date | string;
}
