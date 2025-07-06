export interface IUser {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  oldPassword?: string;
  newPassword?: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  address: string | null;
  block: boolean;
  fullName: string | null;
  phoneNumber2: string | null;
  typeUser: string | null;
  dateAdd: string;
  userUpdate: string;
  dateUpdate: Date | string | null;
  cityId: string | number | null;
  city: string | null;
  roles: string[];
  userId: string;
  code: string;
}
export interface IOtpState {
  otp: string | number;
  email: string;
  userId: string;
  enabaleChangePassword: boolean;
}

export interface IUserRedux {
  otp: IOtpState;
  data: IUser;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface TokenPayload {
  nameid: string;
  email: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
