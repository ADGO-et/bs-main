import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Feedback, FeedbackResponse } from "@/types/feedbackApi";
import { API_BASE_URL } from "./baseUrl";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: "https://bole.weytech.et:1289",
=======
    baseUrl: API_BASE_URL,
>>>>>>> c339744 (baseurl constant and document uploading)
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
    submitFeedback: builder.mutation<
      FeedbackResponse,
      Omit<Feedback, "_id" | "createdAt" | "updatedAt" | "__v">
    >({
      query: (feedback) => ({
        url: "/feedbacks",
        method: "POST",
        body: feedback,
      }),
    }),
  }),
});

export const { useSubmitFeedbackMutation } = feedbackApi;
