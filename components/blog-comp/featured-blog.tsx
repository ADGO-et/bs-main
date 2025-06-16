"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import imgg from "@/public/collab.svg";

interface FeaturedBlogProps {
  id: string;
  title: string;
  secondaryHeading: string;
  description: string;
  image: string;
}

export default function FeaturedBlog({
  id,
  title,
  secondaryHeading,
  description,
}: FeaturedBlogProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-xl overflow-hidden mb-12"
    >
      <div className="relative h-[400px] w-full">
        <Image src={imgg} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-lg mb-4">{secondaryHeading}</p>
          <p className="text-gray-200 mb-6 max-w-3xl">{description}</p>
          <Link
            href={`/blog/${id}`}
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
