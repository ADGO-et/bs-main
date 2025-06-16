"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/blog-comp/BlogCard";
import FeaturedBlog from "@/components/blog-comp/featured-blog";
import Pagination from "@/components/blog-comp/pagination";

// Mock blog data
const mockBlogs = Array.from({ length: 30 }, (_, i) => ({
  id: `blog-${i + 1}`,
  title:
    i === 0
      ? "Integer Maecenas Eget Viverra"
      : [
          "Integer Maecenas Eget Viverra",
          "Aenean eleifend ante maecenas",
          "Vivamus laoreet mauris fusce",
        ][i % 3],
  secondaryHeading: "The Future of Digital Marketing",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  image: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400&text=Blog+Image+2",
    "/placeholder.svg?height=300&width=400&text=Blog+Image+3",
  ][i % 3],
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  referenceLink: "https://example.com/reference",
  author: ["John Doe", "Jane Smith", "Alex Johnson"][i % 3],
  date: new Date(2023, i % 12, (i % 28) + 1).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
}));

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const totalPages = Math.ceil(mockBlogs.length / blogsPerPage);

  // Get featured blog (first blog)
  const featuredBlog = mockBlogs[0];

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = mockBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 when component mounts
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen pt-44 pb-16 relative overflow-hidden">
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
          <div className="h-0.5 w-12 bg-purple-500"></div>
          <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          <div className="h-0.5 w-12 bg-purple-500"></div>
        </div>

        {/* Featured Blog */}
        <FeaturedBlog
          id={featuredBlog.id}
          title={featuredBlog.title}
          secondaryHeading={featuredBlog.secondaryHeading}
          description={featuredBlog.description}
          image={featuredBlog.image}
        />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              secondaryHeading={blog.secondaryHeading}
              description={blog.description}
              image={blog.image}
              videoLink={blog.videoLink}
              referenceLink={blog.referenceLink}
              author={blog.author}
              date={blog.date}
              delay={index}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
