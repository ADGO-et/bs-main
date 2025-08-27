import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogListResponse, Blog, BlogResponse } from "@/types/blogApi";
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bole.weytech.et:1289",
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
    //  get all blogs
    //  get all blogs
    getAllBlogs: builder.query<BlogListResponse, void>({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
    }),

    // get blog by id
    getBlogById: builder.query<BlogResponse, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),

    // like a blog post
    likeBlog: builder.mutation<any, string>({
      query: (id) => ({
        url: `/blogs/${id}/like`,
        method: "PATCH",
      }),
    }),

    // dislike a blog post
    dislikeBlog: builder.mutation<any, string>({
      query: (id) => ({
        url: `/blogs/${id}/dislike`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useLikeBlogMutation,
  useDislikeBlogMutation,
} = blogApi;
