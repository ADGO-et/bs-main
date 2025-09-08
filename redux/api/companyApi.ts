import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { API_BASE_URL } from "./baseUrl";

export interface CompanyAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface RegisterCompanyPayload {
  name: string;
  tinNo?: number | string;
  registrationNumber?: string;
  incorporationDate?: string; // ISO date
  businessStructure?: string;
  address?: CompanyAddress;
}

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    registerCompany: builder.mutation<any, RegisterCompanyPayload>({
      query: (body) => ({
        url: "/companies",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    getCompanyById: builder.query<any, string>({
      query: (id) => ({ url: `/companies/${id}`, method: "GET" }),
      providesTags: (result, error, id) =>
        result ? [{ type: "Company", id }] : [{ type: "Company" }],
    }),
  }),
});

export const { useRegisterCompanyMutation, useGetCompanyByIdQuery } =
  companyApi;
export default companyApi;
