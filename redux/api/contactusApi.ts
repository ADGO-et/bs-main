import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseUrl";

export const contactusApi = createApi({
  reducerPath: "contactusApi",
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
    // submit a contact us form
    submitContactUs: builder.mutation<
      any,
      { name: string; email: string; subject: string; message: string }
    >({
      query: (contact) => ({
        url: "/contact",
        method: "POST",
        body: contact,
      }),
    }),
  }),
});

export const { useSubmitContactUsMutation } = contactusApi;
