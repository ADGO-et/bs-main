"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Share2, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import BlogCard from "@/components/blog-comp/BlogCard";

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
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h2>Key Points</h2>
    <ul>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
      <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco</li>
    </ul>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  `,
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

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blog, setBlog] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(15);

  useEffect(() => {
    // Find the blog with the matching ID
    const foundBlog = mockBlogs.find((blog) => blog.id === params.id);

    if (foundBlog) {
      setBlog(foundBlog);

      // Get 3 related blogs (excluding the current one)
      const related = mockBlogs
        .filter((b) => b.id !== params.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      setRelatedBlogs(related);
    }
  }, [params.id]);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  if (!blog) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
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
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-purple-500 transition-colors"
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
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{blog.date}</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
            <h2 className="text-xl text-gray-700 mb-6">
              {blog.secondaryHeading}
            </h2>

            <div
              className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

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
                  className="text-purple-500 hover:underline"
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
            {relatedBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                secondaryHeading={blog.secondaryHeading}
                description={blog.description}
                image={blog.image}
                author={blog.author}
                date={blog.date}
                delay={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
