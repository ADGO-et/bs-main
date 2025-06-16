"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Search, FileText, CheckCircle } from "lucide-react";

export default function JobsCoverPage() {
  const paths = [
    {
      title: "I'm Hiring",
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      description: "Find skilled professionals for your projects",
      features: [
        "Browse verified candidates",
        "Filter by skills and experience",
        "Direct messaging",
        "Secure hiring process",
      ],
      cta: "Browse Candidates",
      href: "/auth/signin",
    },
    {
      title: "I'm a Freelancer",
      icon: <User className="w-8 h-8 text-purple-500" />,
      description: "Find work that matches your skills",
      features: [
        "Create your professional profile",
        "Showcase your portfolio",
        "Get matched with projects",
        "Secure payments",
      ],
      cta: "Create Profile",
      href: "/auth/signin",
    },
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-500" />,
      title: "Verified Profiles",
      description: "All candidates are thoroughly vetted",
    },
    {
      icon: <Search className="w-6 h-6 text-purple-500" />,
      title: "Smart Matching",
      description: "Find the perfect fit quickly",
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      title: "Secure Contracts",
      description: "Protected agreements for both parties",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-0">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 pt-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-purple-600">Talent Connect</span>: Where
            Opportunities Meet Skills
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            The platform connecting businesses with top female talent in
            Ethiopia
          </p>
        </motion.div>
      </section>

      {/* Dual Path Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  {path.icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                {path.title}
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                {path.description}
              </p>

              <ul className="space-y-3 mb-8">
                {path.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={path.href} className="flex justify-center">
                <Button className="w-full">{path.cta}</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 pt-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed for efficient and secure talent matching
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
