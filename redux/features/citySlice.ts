import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../axios/axios";
import { ICity, ICityRedux } from "../../types/city/ICity";

const initialState: ICityRedux = {
  data: [],
  status: "idle",
};

export const fetchCity = createAsyncThunk(
  "city/fetchCity",
  async (_, thunkAPI) => {
    try {
      const response = await request.post(
        `/Cities/GetAllCities?StatusShow=show`,
        {
          paginationInfo: {
            pageIndex: 0,
            pageSize: 0,
          },
        }
      );
      return response.data.rows;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch city");
    }
  }
);

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setEditCity: (state, action: PayloadAction<ICity>) => {
      state.data = state?.data?.map((existingCategory) =>
        existingCategory?.id === action.payload.id
          ? action.payload
          : existingCategory
      );
    },
    setInitialStateCity: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
          state.data = action.payload;
        }
      })
      .addCase(fetchCity.rejected, (state) => {
        state.status = "failed";
        state.data = [];
      });
  },
});
export const { setEditCity, setInitialStateCity } =
  citySlice.actions;
export default citySlice.reducer;
