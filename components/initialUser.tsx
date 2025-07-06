"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooksRedux";
import Cookies from "js-cookie";
import { fetchUser } from "@/redux/features/userSlice";
export default function InitUser() {
  const dispatch = useAppDispatch();
  const token = Cookies.get("token_doctor_bike_website");
    useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [token, dispatch]);

  return null;
}
