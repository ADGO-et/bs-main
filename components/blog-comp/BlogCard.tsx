"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import imgg from "@/public/collab.svg";

interface BlogCardProps {
  id: string;
  title: string;
  secondaryHeading: string;
  description: string;
  image: string;
  videoLink?: string;
  referenceLink?: string;
  author?: string;
  date?: string;
  delay?: number;
}

export default function BlogCard({
  id,
  title,
  // secondaryHeading,
  description,
  // image,
  // videoLink,
  // referenceLink,
  author = "Admin",
  date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
  delay = 0,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="group shadow-md p-4 rounded-lg"
    >
      <div className="overflow-hidden rounded-lg mb-3">
        <Link href={`/blog/${id}`} className="block">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={imgg}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>
      <div className="space-y-2">
        <Link href={`/blog/${id}`}>
          <h3 className="font-bold text-lg group-hover:text-purple-500 transition-colors">
            {title}
          </h3>
        </Link>
        <div className="flex items-center text-xs text-gray-500 space-x-4">
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="pt-2">
          <Link
            href={`/blog/${id}`}
            className="text-sm font-medium text-purple-500 hover:text-purple-600 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
