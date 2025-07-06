import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import citySlice from "./features/citySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      city: citySlice,
    },
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
