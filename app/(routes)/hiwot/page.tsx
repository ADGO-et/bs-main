"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Search, Upload, Shield, Users } from "lucide-react";

export default function HiwotCoverPage() {
  const features = [
    {
      icon: <Search className="w-6 h-6 text-purple-500" />,
      title: "Discover Cases",
      description:
        "Find individuals needing financial support for medical treatments",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-purple-500" />,
      title: "Make a Difference",
      description: "Contribute directly to life-changing medical care",
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Verified Profiles",
      description: "All cases are thoroughly vetted for authenticity",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Community Support",
      description: "Join others in making collective impact",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Browse Requests",
      description: "View profiles of individuals needing assistance",
    },
    {
      step: "2",
      title: "Select a Case",
      description: "Choose someone you'd like to support",
    },
    {
      step: "3",
      title: "Contribute",
      description: "Make a secure donation directly to their treatment fund",
    },
    {
      step: "4",
      title: "Track Progress",
      description: "Receive updates on how your contribution helped",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-0">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-purple-600">Hiwot Fund</span>: Extending a
            Helping Hand
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connecting compassionate donors with individuals needing financial
            assistance
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <Button className="px-8 py-6 text-lg bg-purple-600 hover:bg-purple-700">
                Browse Cases
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" className="px-8 py-6 text-lg">
                Request Assistance
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Impact Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: "500+", label: "Lives Impacted" },
              { value: "$2M+", label: "Raised" },
              { value: "120+", label: "Medical Cases" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How You Can Help</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it simple to support those in medical need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Simple Steps to Make an Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The process is transparent and straightforward
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline bar */}
              <div className="absolute left-8 top-0 h-full w-1 bg-purple-100 transform -translate-x-1/2"></div>

              <div className="space-y-12">
                {howItWorks.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-8 top-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center transform -translate-x-1/2">
                      {step.step}
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
