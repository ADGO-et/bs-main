import { creatingStartupPayload, StartupApproval } from "@/types/startupApi";
import { creatingStartupWithBsTeamPayload } from "@/types/startupApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const startupApi = createApi({
  reducerPath: "startupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bole.weytech.et:5002", // production
    // baseUrl: "http://localhost:5002", // local development
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
    createStartupself: builder.mutation<any, creatingStartupPayload>({
      query: (startup) => ({
        url: "/startup/self",
        method: "POST",
        body: startup,
      }),
    }),

    createStartupByBsTeam: builder.mutation<
      any,
      creatingStartupWithBsTeamPayload
    >({
      query: (startup) => ({
        url: "/startup/bole",
        method: "POST",
        body: startup,
      }),
    }),
    // get all startups (this is for the admin only)
    getAllStartups: builder.query<any, void>({
      query: () => ({
        url: "/startup",
        method: "GET",
      }),
    }),

    // get all verified startups
    getAllVerifiedStartups: builder.query<any, void>({
      query: () => ({
        url: "/startup/find-all-verified-startups",
        method: "GET",
      }),
    }),

    // get all unverified startups
    getAllUnverifiedStartups: builder.query<any, void>({
      query: () => ({
        url: "/startup/find-all-unverified-startups",
        method: "GET",
      }),
    }),

    // get a single verified startup by id
    getSingleVerifiedStartup: builder.query<any, string>({
      query: (id) => ({
        url: `/startup/verified/${id}`,
        method: "GET",
      }),
    }),

    // get a single unverified startup by id
    getSingleUnverifiedStartup: builder.query<any, string>({
      query: (id) => ({
        url: `/startup/unverified/${id}`,
        method: "GET",
      }),
    }),

    // update a specific startup approval and set expiry date
    updateStartupApproval: builder.mutation<
      any,
      { id: string; startup: StartupApproval }
    >({
      query: ({ id, startup }) => ({
        url: `/startup/approve/${id}`,
        method: "PATCH",
        body: startup,
      }),
    }),

    // update a startup
    updateStartup: builder.mutation<
      any,
      { id: string; startup: creatingStartupPayload }
    >({
      query: ({ id, startup }) => ({
        url: `/startup/${id}`,
        method: "PATCH",
        body: startup,
      }),
    }),

    // delete a startup
    deleteStartup: builder.mutation<any, string>({
      query: (id) => ({
        url: `/startup/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateStartupselfMutation,
  useCreateStartupByBsTeamMutation,
  useGetAllStartupsQuery,
  useGetAllVerifiedStartupsQuery,
  useGetAllUnverifiedStartupsQuery,
  useGetSingleVerifiedStartupQuery,
  useGetSingleUnverifiedStartupQuery,
  useUpdateStartupApprovalMutation,
  useUpdateStartupMutation,
  useDeleteStartupMutation,
} = startupApi;
