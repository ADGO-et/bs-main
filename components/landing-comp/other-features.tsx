"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const features = [
  {
    title: "Hiwot Fund",
    excerpt: "Get funding ",
    tag: "Funding",
    href: "/hiwot",
  },
  {
    title: "Job Applications",
    excerpt: "Find your next opportunity or post a job.",
    tag: "Careers",
    href: "/job",
  },
];

export function OtherFeatures() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const requiresAuth = (href: string) => ["/hiwot", "/job"].includes(href);
  const resolveHref = (href: string) =>
    !isAuthenticated && requiresAuth(href) ? "/auth/signin" : href;
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
            Explore More Features
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {features.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => router.push(resolveHref(post.href))}
            >
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all h-full">
                <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-3">
                  {post.tag}
                </span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={resolveHref(post.href)}
                  className="text-blue-500 font-medium inline-flex items-center gap-1"
                  onClick={(e) => {
                    const target = resolveHref(post.href);
                    if (target !== post.href) {
                      // prevent default navigation to protected route
                      e.preventDefault();
                      router.push(target);
                    }
                  }}
                >
                  Explore now
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
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
