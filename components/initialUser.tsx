"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooksRedux";
import Cookies from "js-cookie";
import { fetchUser } from "@/redux/features/userSlice";
import { fetchCity } from "@/redux/features/citySlice";
export default function InitUser() {
  const dispatch = useAppDispatch();
  const token = Cookies.get("token_doctor_bike_website");
  const city = useAppSelector((state) => state?.city);
  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [token, dispatch]);

  // fetch city
  useEffect(() => {
    if (city?.status === "idle") {
      dispatch(fetchCity());
    }
  }, [city?.status, dispatch]);

  return null;
}
