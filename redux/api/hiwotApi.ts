import type { HiwotFund } from "@/types/hiwotApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseUrl";

export const hiwotApi = createApi({
  reducerPath: "hiwotApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    // credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
      return headers;
    },
  }),

  tagTypes: [],
  endpoints: (builder) => ({
    createHiwot: builder.mutation<{ data: HiwotFund }, Partial<HiwotFund>>({
      query: (body) => ({
        url: "/hiwot",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Hiwot", id: "LIST" }],
    }),
    getHiwotList: builder.query<{ data: HiwotFund[] }, void>({
      query: () => "/hiwot",
      providesTags: [{ type: "Hiwot", id: "LIST" }],
    }),
    getHiwotById: builder.query<{ data: HiwotFund }, string>({
      query: (id) => `/hiwot/${id}`,
      providesTags: (result, error, id) => [{ type: "Hiwot", id }],
    }),
    updateHiwot: builder.mutation<
      { data: HiwotFund },
      { id: string; body: Partial<HiwotFund> }
    >({
      query: ({ id, body }) => ({
        url: `/hiwot/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Hiwot", id },
        { type: "Hiwot", id: "LIST" },
      ],
    }),
    deleteHiwot: builder.mutation<{ data: any }, string>({
      query: (id) => ({
        url: `/hiwot/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Hiwot", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateHiwotMutation,
  useGetHiwotListQuery,
  useGetHiwotByIdQuery,
  useUpdateHiwotMutation,
  useDeleteHiwotMutation,
} = hiwotApi;
export default hiwotApi;
