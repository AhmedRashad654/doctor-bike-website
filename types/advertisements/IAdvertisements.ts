export interface IAdvertisements {
  id: number;
  title: string;
  description: string;
  urlAds: string;
  imgUrl: string;
  isShow: boolean;
  addDate: Date;
  userAddId: string;
  updateDate: Date | null;
  userUpdateId: string | null;
}