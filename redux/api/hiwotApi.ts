import type { HiwotFund } from "@/types/hiwotApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseUrl";
import { StartupFund } from "@/types/startupApi";

export const hiwotApi = createApi({
  reducerPath: "hiwotApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    // credentials: "include",
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

  tagTypes: ["Hiwot"],
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
    getHiwotComments: builder.query<{ data: any[] }, string>({
      query: (id) => `/hiwot/comments/${id}`,
    }),
    postHiwotComment: builder.mutation<
      { data: any },
      { id: string; content: string; startup: string }
    >({
      query: ({ id, content, startup }) => ({
        url: `/hiwot/comments/${id}`,
        method: "POST",
        body: { content },
      }),
    }),
    likeOrDislikeHiwot: builder.mutation<{ data: any }, string>({
      query: (id) => ({
        url: `/hiwot/${id}/like`,
        method: "PATCH",
      }),
    }),
    FundHiwot: builder.mutation<any, { id: string; fund: StartupFund }>({
      query: ({ id, fund }) => ({
        url: `/hiwot/${id}/fund`,
        method: "PATCH",
        body: fund,
      }),
    }),
  }),
});

export const {
  useCreateHiwotMutation,
  useGetHiwotListQuery,
  useGetHiwotByIdQuery,
  useUpdateHiwotMutation,
  useDeleteHiwotMutation,
  useGetHiwotCommentsQuery,
  usePostHiwotCommentMutation,
  useLikeOrDislikeHiwotMutation,
  useFundHiwotMutation,
} = hiwotApi;
export default hiwotApi;
