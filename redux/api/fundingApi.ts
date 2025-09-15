import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseUrl";

export interface Funding {
  _id: string;
  tx_ref: string;
  amount: number;
  serviceFee?: number;
  description?: string;
  status?: string;
  createdAt?: string;
  [key: string]: any;
}

export const fundingApi = createApi({
  reducerPath: "fundingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      // Get token from Redux state
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyFundings: builder.query<{ data: Funding[] }, void>({
      query: () => "/fundings/me",
    }),
    getFundingByTxRef: builder.query<{ data: Funding }, string>({
      query: (tx_ref) => `/fundings/${tx_ref}`,
    }),
  }),
});

export const { useGetMyFundingsQuery, useGetFundingByTxRefQuery } = fundingApi;
export default fundingApi;
