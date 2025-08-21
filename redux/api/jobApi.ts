import { creatingTalentPayload } from "@/types/jobApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bole.weytech.et/api",
    // credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
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

    //  get all talents
    getAllTalents: builder.query<any, void>({
      query: () => ({
        url: "/talent",
        method: "GET",
      }),
    }),

    // get a specific talent by id (Admin only)
    getSingleTalent: builder.query<any, string>({
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
