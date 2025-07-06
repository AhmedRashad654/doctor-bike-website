export interface ICity {
  id: number;
  cityNameAr: string;
  cityNameEng: string;
  cityNameAbree: string;
  deliver: number;
  isShow: boolean;
  userIdAdd: string;
  dateAdd: string;
  userUpdate: string;
  dateUpdate: string;
}

export interface ICityRedux {
  data: ICity[];
  status: "idle" | "loading" | "succeeded" | "failed";
}
