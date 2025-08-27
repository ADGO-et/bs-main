import { creatingHiwotPayload } from "@/types/hiwotApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hiwotApi = createApi({
  reducerPath: "hiwotApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bole.weytech.et:1289",
    // credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
      return headers;
    },
  }),

  tagTypes: [],
  endpoints: (builder) => ({
    // create a new startup
    createHiwot: builder.mutation<any, creatingHiwotPayload>({
      query: (hiwot) => ({
        url: "/hiwot",
        method: "POST",
        body: hiwot,
      }),
    }),

    // get all hieot projects
    getAllHiwots: builder.query<any, void>({
      query: () => ({
        url: "/hiwot",
        method: "GET",
      }),
    }),

    getHiwotById: builder.query<any, string>({
      query: (id) => ({
        url: `/hiwot/${id}`,
        method: "GET",
      }),
    }),

    updateHiwot: builder.mutation<
      any,
      { id: string; hiwot: creatingHiwotPayload }
    >({
      query: ({ id, hiwot }) => ({
        url: `/hiwot/${id}`,
        method: "PATCH",
        body: hiwot,
      }),
    }),

    deleteHiwot: builder.mutation<any, string>({
      query: (id) => ({
        url: `/hiwot/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateHiwotMutation,
  useGetAllHiwotsQuery,
  useGetHiwotByIdQuery,
  useUpdateHiwotMutation,
  useDeleteHiwotMutation,
} = hiwotApi;
