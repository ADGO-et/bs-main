import {
  creatingTalentPayload,
  SingleTalentResponse,
  TalentResponse,
} from "@/types/jobApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseUrl";

export const jobApi = createApi({
  reducerPath: "jobApi",
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

  tagTypes: [],
  endpoints: (builder) => ({
    // create a new startup
    createTalent: builder.mutation<any, creatingTalentPayload>({
      query: (talent) => ({
        url: "/talent/apply",
        method: "POST",
        body: talent,
      }),
    }),

    // get all talents with pagination and filters
    getAllTalents: builder.query<
      TalentResponse,
      { page?: number; limit?: number; category?: string; period?: string }
    >({
      query: ({ page = 1, limit = 10, category, period } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (category) params.append("category", category);
        if (period) params.append("period", period);

        return {
          url: `/talent?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    // get a specific talent by id (Admin only)
    getSingleTalent: builder.query<SingleTalentResponse, string>({
      query: (id) => ({
        url: `/talent/${id}`,
        method: "GET",
      }),
    }),

    // update a talent
    updateTalent: builder.mutation<
      any,
      { id: string; data: creatingTalentPayload }
    >({
      query: ({ id, data }) => ({
        url: `/talent/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // delete a talent
    deleteTalent: builder.mutation<any, string>({
      query: (id) => ({
        url: `/talent/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTalentMutation,
  useGetAllTalentsQuery,
  useGetSingleTalentQuery,
  useUpdateTalentMutation,
  useDeleteTalentMutation,
} = jobApi;
