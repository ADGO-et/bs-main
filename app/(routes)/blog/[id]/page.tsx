/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import Image from "next/image";
import { Calendar, User, ArrowLeft, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import BlogCard from "@/components/blog-comp/BlogCard";
import { useParams } from "next/navigation";
import { useGetBlogByIdQuery, useGetAllBlogsQuery } from "@/redux/api/blogApi";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { toast } = useToast();
  const [shareSuccess, setShareSuccess] = useState(false);

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

  // Build a canonical universal link that works for both dev & prod.
  // Prefer an explicitly configured public site URL so links created in a preview / SSR env are still production-safe.
  const getCanonicalShareUrl = () => {
    // Allow a NEXT_PUBLIC_SITE_URL env variable (e.g. https://yourprod.com)
    const baseEnv = process.env.NEXT_PUBLIC_SITE_URL;
    // Fallback to current origin (only available client-side)
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const base = baseEnv && baseEnv.length > 0 ? baseEnv.replace(/\/$/, "") : origin;
    // Current routing pattern: /blog/[id]
    return `${base}/blog/${id}`;
  };

  const handleShare = async () => {
    const shareUrl = getCanonicalShareUrl();
    const title = blog.title || "Blog";
    const text = blog.secondaryHeading || blog.content?.[0] || "Check out this blog";

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: shareUrl });
        toast({ title: "Shared", description: "Link shared successfully." });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareSuccess(true);
        toast({ title: "Link copied", description: "Universal link copied to clipboard." });
        setTimeout(() => setShareSuccess(false), 2500);
      } else {
        // Legacy fallback: create a temporary input
        const el = document.createElement("input");
        el.value = shareUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setShareSuccess(true);
        toast({ title: "Link copied", description: "Universal link copied to clipboard." });
        setTimeout(() => setShareSuccess(false), 2500);
      }
    } catch (err) {
      console.error("Share failed", err);
      toast({
        title: "Share failed",
        variant: "destructive",
        description: "Couldn't share the link. Try again or copy manually.",
      });
    }
  };

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

      <div className="container mx-auto px-4 mt-10">
        <div className="mb-6">
          <Button
            href="/blog"
            onClick={() => router.push("/blog")}
            className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-600/80 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blogs
          </Button>
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
              {/* <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 ${
                  liked ? "text-blue-500" : ""
                }`}
                onClick={handleLike}
              >
                <ThumbsUp size={16} />
                <span>{likeCount}</span>
              </Button> */}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleShare}
              >
                {shareSuccess ? <Check size={16} /> : <Share2 size={16} />}
                <span>{shareSuccess ? "Copied" : "Share"}</span>
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
