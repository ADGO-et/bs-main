"use client";
import { motion } from "framer-motion";
import { Users, Target, Award } from "lucide-react";
import Link from "next/link";

export default function AboutUsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empowering startups and projects with transparent, innovative
            funding solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: <Target className="h-8 w-8 text-blue-500" />,
              title: "Mission",
              text: "Democratize access to funding for all great ideas.",
            },
            {
              icon: <Award className="h-8 w-8 text-blue-500" />,
              title: "Vision",
              text: "Become the most trusted funding platform worldwide.",
            },
            {
              icon: <Users className="h-8 w-8 text-blue-500" />,
              title: "Values",
              text: "Integrity, transparency, and client success.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/about">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all">
              Explore About Us →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
