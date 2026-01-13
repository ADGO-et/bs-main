/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/blog-comp/BlogCard";
import FeaturedBlog from "@/components/blog-comp/featured-blog";
import Pagination from "@/components/blog-comp/pagination";
import { useGetAllBlogsQuery } from "@/redux/api/blogApi";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  // Fetch blogs from API
  const { data, isLoading, isError } = useGetAllBlogsQuery();

  // Extract blogs and pagination from API response
  const blogs = data?.data?.blogs || [];
  const pagination = data?.data?.pagination || {
    total: 0,
    page: 1,
    limit: blogsPerPage,
    totalPages: 1,
  };

  // Featured blog (first blog)
  const featuredBlog = blogs[0];

  // Paginate blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 when component mounts
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen pt-10 pb-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -left-40 top-0 opacity-10">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="200"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute -right-40 bottom-0 opacity-10">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="200"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-0.5 w-12 bg-blue-500"></div>
          <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          <div className="h-0.5 w-12 bg-blue-500"></div>
        </div>
        {/* Loading/Error/Empty states */}
        {isLoading && (
          <div className="p-4 text-center text-sm text-gray-500">
            Loading...
          </div>
        )}
        {isError && (
          <div className="p-4 text-center text-sm text-red-500">
            Failed to load blogs.
          </div>
        )}
        {!isLoading && !isError && blogs.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">
            No blogs found.
          </div>
        )}
        {/* Featured Blog */}
        {!isLoading && !isError && featuredBlog && (
          <FeaturedBlog
            id={featuredBlog._id}
            title={featuredBlog.title}
            secondaryHeading={featuredBlog.secondaryHeading}
            description={
              Array.isArray(featuredBlog.content)
                ? featuredBlog.content[0]
                : featuredBlog.content
            }
            image={featuredBlog.blogImage}
          />
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog, index) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              secondaryHeading={blog.secondaryHeading}
              description={
                Array.isArray(blog.content) ? blog.content[0] : blog.content
              }
              image={blog.blogImage}
              videoLink={blog.videoLink}
              referenceLink={blog.referenceLink}
              author={
                blog.authorId?.firstName && blog.authorId?.lastName
                  ? `${blog.authorId.firstName} ${blog.authorId.lastName}`
                  : blog.authorId?.username || blog.authorId?.email || "Unknown"
              }
              date={new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              delay={index}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
