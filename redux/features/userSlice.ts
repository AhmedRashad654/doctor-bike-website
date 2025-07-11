import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { request } from "@/axios/axios";
import { IOtpState, IUser, IUserRedux, TokenPayload } from "@/types/user/IUser";

const initialState: IUserRedux = {
  otp: {
    otp: "",
    email: "",
    userId: "",
    enabaleChangePassword: false,
  },
  data: {
    id: "",
    userName: "",
    normalizedUserName: "",
    email: "",
    normalizedEmail: "",
    emailConfirmed: false,
    passwordHash: "",
    securityStamp: "",
    concurrencyStamp: "",
    phoneNumber: null,
    phoneNumberConfirmed: false,
    twoFactorEnabled: false,
    lockoutEnd: null,
    lockoutEnabled: false,
    accessFailedCount: 0,
    address: null,
    block: false,
    fullName: "",
    phoneNumber2: null,
    typeUser: null,
    dateAdd: "",
    userUpdate: "",
    dateUpdate: null,
    cityId: null,
    city: null,
    roles: [],
    userId: "",
    code: "",
  },
  status: "idle",
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("token_doctor_bike_website");
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }
      const decoded: TokenPayload = jwtDecode(token);
      const userId = decoded?.nameid;
      const response = await request.post(`/Users/GetById?id=${userId}`, {
        paginationInfo: {
          pageIndex: 0,
          pageSize: 0,
        },
      });
      if (response?.data?.block === true) {
        return thunkAPI.rejectWithValue("user is blocked");
      }

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch user data");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload;
    },
    setOTP: (state, action: PayloadAction<IOtpState>) => {
      state.otp = { ...state.otp, ...action.payload };
    },
    setEnableChangePassword: (state, action: PayloadAction<boolean>) => {
      state.otp.enabaleChangePassword = action.payload;
    },
    setResetOTP: (state) => {
      state.otp = {
        otp: "",
        email: "",
        userId: "",
        enabaleChangePassword: false,
      };
    },
    setLogout: () => {
      Cookies.remove("token_doctor_bike_website");
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
          state.data = action.payload;
        }
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
        Cookies.remove("token_doctor_bike");
        state.data = initialState.data;
        state.otp = initialState.otp;
      });
  },
});

export const {
  setUser,
  setOTP,
  setEnableChangePassword,
  setResetOTP,
  setLogout,
} = userSlice.actions;
export default userSlice.reducer;
