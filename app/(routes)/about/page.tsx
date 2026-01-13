/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Users, Target, Award } from "lucide-react";
import imgg from "@/public/about3.png";


export default function AboutPage() {
  return (
    <div className="min-h-screen pt-10 pb-16 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Animated SVG Backgrounds */}
      <div className="absolute -left-40 top-0 opacity-20 animate-pulse">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" stroke="#FFA500" strokeWidth="1.5" fill="url(#grad1)" />
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FFA500" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute -right-40 bottom-0 opacity-20 animate-pulse">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" stroke="#3B82F6" strokeWidth="1.5" fill="url(#grad2)" />
          <defs>
            <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">About Us</h1>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Discover our story, mission, and values. We believe in making funding accessible, transparent, and empowering for everyone.</p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">We&apos;re Changing How Funding Works</h2>
            <p className="text-gray-700 mb-6 text-lg">BoleStarter Funding Solutions was founded with a simple mission: to make funding accessible to everyone. We believe that great ideas deserve support, regardless of where they come from.</p>
            <p className="text-gray-700 mb-6 text-lg">Our platform connects entrepreneurs, families, and businesses with the right funding solutions tailored to their unique needs. With over 10 years of experience in the financial industry, we&apos;ve helped thousands of clients achieve their goals.</p>
            <div className="space-y-4">
              {[
                "Transparent funding process with no hidden fees",
                "Dedicated support team available 24/7",
                "Fast approval and disbursement process",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-xl px-4 py-2 shadow hover:shadow-lg transition"
                >
                  {/* @ts-expect-error lucide-react icon type issue */}
                  <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <p className="text-gray-800 font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute -top-8 -right-8 h-32 w-32 bg-gradient-to-tr from-blue-400 to-blue-300 rounded-full blur-2xl opacity-40 z-0"></div>
            <div className="relative h-[400px] w-full overflow-hidden p-10">
              <Image src={imgg} alt="About BoleStarter Funding" fill className="object-cover rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Mission, Vision, Values - Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Our Mission",
              description:
                "To democratize access to funding and empower individuals and businesses to achieve their financial goals through innovative solutions.",
              icon: <Target className="h-12 w-12 text-blue-500 drop-shadow" />,
            },
            {
              title: "Our Vision",
              description:
                "To become the world's most trusted funding platform, known for our integrity, innovation, and commitment to client success.",
              icon: <Award className="h-12 w-12 text-blue-400 drop-shadow" />,
            },
            {
              title: "Our Values",
              description:
                "Integrity, transparency, innovation, and client-centricity guide everything we do. We believe in building lasting relationships based on trust.",
              icon: <Users className="h-12 w-12 text-pink-500 drop-shadow" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/60 backdrop-blur-lg border border-blue-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-blue-600">{item.title}</h3>
              <p className="text-gray-700 text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-8 py-6 rounded-2xl shadow-lg text-center max-w-xl"
          >
            <h4 className="text-2xl font-bold mb-2">Ready to get started?</h4>
            <p className="mb-4">Join BoleStarter Funding Solutions and unlock new opportunities for your ideas and business.</p>
            <a href="/auth/signup" className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-50 transition">Sign Up Now</a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
