export interface ISubCategory {
  id: number;
  nameAr: string;
  nameEng: string;
  nameAbree: string;
  descriptionAr: string;
  descriptionEng: string;
  descriptionAbree: string;
  imageUrl: string | File | null;
  isShow: boolean;
  mainCategoryId: number | string;
  userAdd: string;
  dateAdd: string;
  userEdit: string;
  dateEdit: string;
  mainCategoryWriteDto: null;
}