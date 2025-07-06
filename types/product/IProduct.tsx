export interface IImageProduct {
  id: number;
  imageUrl: string;
  itemId: number;
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
  //   itemSizes: any[];
}
