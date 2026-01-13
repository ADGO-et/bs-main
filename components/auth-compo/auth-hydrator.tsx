"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/authSlice";

export function AuthHydrator() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        dispatch(setCredentials({ accessToken: token }));
      }
    } catch (e) {
      // ignore
    }
  }, [dispatch]);
  return null;
}
