"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Users, Target, Award } from "lucide-react";
import imgg from "@/public/collab.svg";
import imgg2 from "@/public/carrer.svg";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-44 pb-16 relative overflow-hidden">
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
        <div className="text-center mb-12 md:mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-0.5 w-12 bg-purple-500"></div>
            <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
            <div className="h-0.5 w-12 bg-purple-500"></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              We&apos;re Changing How Funding Works
            </h2>
            <p className="text-gray-600 mb-6">
              Sigma Funding Solutions was founded with a simple mission: to make
              funding accessible to everyone. We believe that great ideas
              deserve support, regardless of where they come from.
            </p>
            <p className="text-gray-600 mb-6">
              Our platform connects entrepreneurs, families, and businesses with
              the right funding solutions tailored to their unique needs. With
              over 10 years of experience in the financial industry, we&apos;ve
              helped thousands of clients achieve their goals.
            </p>
            <div className="space-y-4">
              {[
                "Transparent funding process with no hidden fees",
                "Dedicated support team available 24/7",
                "Customized solutions for every client",
                "Fast approval and disbursement process",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src={imgg}
                alt="About Sigma Funding"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Our Mission",
              description:
                "To democratize access to funding and empower individuals and businesses to achieve their financial goals through innovative solutions.",
              icon: <Target className="h-10 w-10 text-purple-500" />,
            },
            {
              title: "Our Vision",
              description:
                "To become the world's most trusted funding platform, known for our integrity, innovation, and commitment to client success.",
              icon: <Award className="h-10 w-10 text-purple-500" />,
            },
            {
              title: "Our Values",
              description:
                "Integrity, transparency, innovation, and client-centricity guide everything we do. We believe in building lasting relationships based on trust.",
              icon: <Users className="h-10 w-10 text-purple-500" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts is passionate about helping you
              succeed. With backgrounds in finance, technology, and customer
              service, we bring a wealth of knowledge to every client
              interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: imgg2,
              },
              {
                name: "Michael Chen",
                role: "Chief Financial Officer",
                image: imgg2,
              },
              {
                name: "Aisha Patel",
                role: "Head of Client Relations",
                image: imgg2,
              },
              {
                name: "David Kim",
                role: "Technology Director",
                image: imgg2,
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-[300px]">
                  <Image
                    src={member.image || imgg}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: "10+", label: "Years of Experience" },
            { value: "5000+", label: "Clients Served" },
            { value: "$250M+", label: "Funding Facilitated" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-purple-50 p-6 rounded-lg text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
