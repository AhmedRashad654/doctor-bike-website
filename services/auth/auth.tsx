import { AxiosError } from "axios";
import { request } from "../../axios/axios";
import Cookies from "js-cookie";
import { IUser } from "@/types/user/IUser";
import { toast } from "sonner";
type ToastType = typeof toast;

// register user
export const RegisterUser = async (data: IUser, toast: ToastType) => {
  try {
    const response = await request.post(`/Users/Register`, {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      dateAdd: new Date().toISOString(),
      dateUpdate: new Date().toISOString(),
    });
    if (response?.status === 200) {
      toast.success("تم انشاء حساب بنجاح");
      return response;
    } 
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
};

// login user
export const LoginUser = async (data: IUser, toast: ToastType) => {
  try {
    const response = await request.post(`/Auth/login`, {
      email: data.email,
      password: data.password,
    });
    if (response?.status === 200) {
      if (response?.data?.block === true) {
        toast.error("هذا الحساب محظور");
        return null;
      }

      Cookies.set("token_doctor_bike_website", response?.data.token, {
        expires: 7,
      });
      toast.success("تم تسجيل الدخول بنجاح");
      return response;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
};

//forget password
export const ForgetPasswordUser = async (data: IUser, toast: ToastType) => {
  try {
    const response = await request.post(
      `/Auth/ForgotPassword?Email=${data?.email}`
    );
    if (response?.status === 200) {
      toast.success("تم ارسال رمز OTP الي الايميل الخاص بك");
      return response;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message);
    }
  }
};

// change password
export const ChangePasswordUserApi = async (newData: IUser, toast: ToastType) => {
  try {
    const response = await request.patch(
      `/Auth/ChangePasswordToForgot`,
      newData
    );
    if (response?.status === 200) {
      toast.success("تم تغيير كلمة المرور بنجاح");
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
export const UpdateProfileUser = async (newData: IUser, toast: ToastType) => {
  try {
    const response = await request.post(`/Users/Edit`, newData);
    if (response?.status === 200) {
      toast.success("تم   تحديث الملف الشخصي بنجاح");
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

