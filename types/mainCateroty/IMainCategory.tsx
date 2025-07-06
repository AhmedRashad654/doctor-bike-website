export interface IMainCategory {
  id: number;
  nameAr: string;
  nameEng: string;
  nameAbree: string;
  descriptionAr: string;
  descriptionEng: string;
  descriptionAbree: string;
  imageUrl: string | File | null;
  isShow: boolean;
  serAdd: string;
  dateAdd: string;
  serEdit: string;
  dateEdit: Date;
  supCategories: [];
}