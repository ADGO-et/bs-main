"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const mockBlogPosts = [
  {
    title: "Aenean eleifend ante maecenas",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tag: "Trends",
  },
  {
    title: "Integer Maecenas Eget Viverra",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tag: "Guide",
  },
];

export function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with expert advice and industry trends.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {mockBlogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-purple-300 transition-all h-full">
                <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-3">
                  {post.tag}
                </span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-purple-500 font-medium inline-flex items-center gap-1">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <button className="bg-white text-purple-500 hover:bg-purple-50 border border-purple-300 px-6 py-3 rounded-lg transition-all">
              View All Articles →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
