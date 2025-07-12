import { AxiosError } from "axios";
import { request } from "../../axios/axios";
import Cookies from "js-cookie";
import { IUser } from "@/types/user/IUser";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
type ToastType = typeof toast;
type TFunctionType = ReturnType<typeof useTranslations>;
// register user
export const RegisterUser = async (
  data: IUser,
  toast: ToastType,
  t: TFunctionType
) => {
  try {
    const response = await request.post(`/Users/Register`, {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      dateAdd: new Date().toISOString(),
      dateUpdate: new Date().toISOString(),
    });
    if (response?.status === 200) {
      toast.success(t("registerSuccessfully"));
      return response;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
};

// login user
export const LoginUser = async (data: IUser, toast: ToastType, t: TFunctionType) => {
  try {
    const response = await request.post(`/Auth/login`, {
      email: data.email,
      password: data.password,
    });
    if (response?.status === 200) {
      if (response?.data?.block === true) {
        toast.error(t("accountBlocked"));
        return null;
      }

      Cookies.set("token_doctor_bike_website", response?.data.token, {
        expires: 7,
      });
      toast.success(t("loginSuccessfully"));
      return response;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
};

//forget password
export const ForgetPasswordUser = async (
  data: IUser,
  toast: ToastType,
  t: TFunctionType
) => {
  try {
    const response = await request.post(
      `/Auth/ForgotPassword?Email=${data?.email}`
    );
    if (response?.status === 200) {
      toast.success(t("sendedOtPToYourEmail"));
      return response;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
};

// change password
export const ChangePasswordUserApi = async (
  newData: IUser,
  toast: ToastType,
  t: TFunctionType
) => {
  try {
    const response = await request.patch(
      `/Auth/ChangePasswordToForgot`,
      newData
    );
    if (response?.status === 200) {
      toast.success(t("changePasswordSuccessfully"));
      return response;
    } else {
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
};

// update profile user
export const UpdateProfileUser = async (
  newData: IUser,
  toast: ToastType,
  t: TFunctionType
) => {
  try {
    const response = await request.post(`/Users/Edit`, newData);
    if (response?.status === 200) {
      toast.success(t("updateProfileSuccessfully"));
      return response;
    } else {
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
};

// change password user login
export const ChangePasswordUserLoginApi = async (
  newData: IUser,
  toast: ToastType,
  t: TFunctionType
) => {
  try {
    const response = await request.post(`/Auth/ChangePassword`, newData);
    if (response?.status === 200) {
      toast.success(t("changePasswordSuccessfully"));
      return response;
    } else {
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error);
      toast.error(
        error?.response?.data?.exception?.Message || "error in change password"
      );
    }
  }
};
