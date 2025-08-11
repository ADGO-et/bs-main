/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Share2, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import BlogCard from "@/components/blog-comp/BlogCard";
import { useParams } from "next/navigation";
import { useGetBlogByIdQuery, useGetAllBlogsQuery } from "@/redux/api/blogApi";

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Fetch blog by ID
  const { data, isLoading, isError } = useGetBlogByIdQuery(id);
  const blog = data?.data;

  // Fetch all blogs for related articles
  const { data: allBlogsData } = useGetAllBlogsQuery();
  const allBlogs = allBlogsData?.data?.blogs || [];

  // Related blogs: exclude current, pick 3 random
  const relatedBlogs = allBlogs
    .filter((b) => b._id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likes?.length ?? 0);

  useEffect(() => {
    setLikeCount(blog?.likes?.length ?? 0);
  }, [blog]);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
    // Optionally, call likeBlog mutation here
  };

  if (isLoading)
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  if (isError || !blog)
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p>Blog not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen  pb-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -left-40 top-0 opacity-10">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
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
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
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
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blogs
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden mb-12"
        >
          {/* Blog Header */}
          <div className="relative h-[400px] w-full">
            <Image
              src={blog.blogImage || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>
                  {blog.authorId?.firstName && blog.authorId?.lastName
                    ? `${blog.authorId.firstName} ${blog.authorId.lastName}`
                    : blog.authorId?.username ||
                      blog.authorId?.email ||
                      "Unknown"}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
            <h2 className="text-xl text-gray-700 mb-6">
              {blog.secondaryHeading}
            </h2>

            <div className="prose max-w-none mb-8">
              {Array.isArray(blog.content) ? (
                blog.content.map((para, idx) => <p key={idx}>{para}</p>)
              ) : (
                <p>{blog.content}</p>
              )}
            </div>

            {/* Video Embed */}
            {blog.videoLink && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Video</h3>
                <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={blog.videoLink.replace("watch?v=", "embed/")}
                    className="absolute top-0 left-0 w-full h-full"
                    title="Video"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Reference Link */}
            {blog.referenceLink && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">Reference</h3>
                <a
                  href={blog.referenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {blog.referenceLink}
                </a>
              </div>
            )}

            {/* Social Actions */}
            <div className="flex items-center space-x-4 border-t pt-6">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 ${
                  liked ? "text-blue-500" : ""
                }`}
                onClick={handleLike}
              >
                <ThumbsUp size={16} />
                <span>{likeCount}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 size={16} />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Related Blogs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((related, index) => (
              <BlogCard
                key={related._id}
                id={related._id}
                title={related.title}
                secondaryHeading={related.secondaryHeading}
                description={
                  Array.isArray(related.content)
                    ? related.content[0]
                    : related.content
                }
                image={related.blogImage}
                author={
                  related.authorId?.firstName && related.authorId?.lastName
                    ? `${related.authorId.firstName} ${related.authorId.lastName}`
                    : related.authorId?.username ||
                      related.authorId?.email ||
                      "Unknown"
                }
                date={new Date(related.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                delay={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
