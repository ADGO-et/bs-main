"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function FeedbackSection() {
  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Value Your Voice
            </h2>
            <p className="text-gray-600">
              Help us improve by sharing your experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">Share Feedback</h3>
                <p className="text-gray-600 mb-6">
                  Your insights help us create a better platform for everyone.
                </p>
                <ul className="space-y-3 text-gray-600">
                  {[
                    "Quick 2-minute survey",
                    "Direct impact on our services",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-auto">
                <Link href="/feedback">
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg transition-all">
                    Give Feedback
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
