import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  RefreshTokenPayload,
  ResetPasswordPayload,
  UserLoginPayload,
  UserRegistrationPayload,
} from "@/types/authApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bole.weytech.et:1289",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", `application/json`);

      // Get token from state
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [],
  endpoints: (builder) => ({
    // register a new user
    registerUser: builder.mutation<any, UserRegistrationPayload>({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),

    // login a user
    loginUser: builder.mutation<any, UserLoginPayload>({
      query: (user) => ({
        url: "/auth/signin",
        method: "POST",
        body: user,
      }),
    }),

    // logout a current user
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // change the current user's password
    changePassword: builder.mutation<any, ChangePasswordPayload>({
      query: (user) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: user,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation<any, ForgotPasswordPayload>({
      query: (payload) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation<any, ResetPasswordPayload>({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: payload,
      }),
    }),

    // refresh token
    refreshToken: builder.mutation<any, RefreshTokenPayload>({
      query: (payload) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLoginUserMutation,
} = authApi;
