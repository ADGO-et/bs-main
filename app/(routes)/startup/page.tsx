"use client";

import { useState } from "react";
import {
  User,
  FileText,
  Image,
  Gift,
  CreditCard,
  Send,
  Share2,
  MessageSquare,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <User className="h-6 w-6" />,
    title: "Sign Up & Complete Profile",
    description: "Register on BoleStarter and fill in your startup details.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Prepare Project Information",
    description:
      "Include title, description (problem/solution/impact), funding goal, and timeline.",
  },
  {
    icon: <Image className="h-6 w-6" />,
    title: "Add Visuals & Media",
    description: "Upload your logo, images, and a short introductory video.",
  },
  {
    icon: <Gift className="h-6 w-6" />,
    title: "Define Rewards (Optional)",
    description: "Offer perks like early access, branded items, or shout-outs.",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Payment Integration",
    description: "Connect local or international payment methods.",
  },
  {
    icon: <Send className="h-6 w-6" />,
    title: "Submit for Review",
    description: "Double-check your content and submit for approval.",
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Promote Campaign",
    description: "Share your link on social media and engage your network.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Engage Backers",
    description: "Post updates and respond to questions for transparency.",
  },
];

export default function HowItWorksPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4 text-blue-600"
        >
          BoleStarter Startup Guide
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-600 text-lg"
        >
          Follow these steps to create and launch your startup project
          successfully
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-blue-200 origin-top"></div>

          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 top-0 w-0.5 bg-blue-600 origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-16"
                onMouseEnter={() => setExpandedStep(idx)}
                onMouseLeave={() => setExpandedStep(null)}
                onClick={() =>
                  setExpandedStep(expandedStep === idx ? null : idx)
                }
              >
                {/* Circle indicator */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      expandedStep === idx
                        ? "bg-blue-600 text-white"
                        : "bg-white border-2 border-blue-500 text-blue-600"
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Step content */}
                <div
                  className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all duration-300 ${
                    expandedStep === idx
                      ? "border-l-4 border-blue-500 shadow-md"
                      : "hover:shadow-md"
                  }`}
                  onClick={() =>
                    setExpandedStep(expandedStep === idx ? null : idx)
                  }
                >
                  <h2 className="text-lg font-semibold mb-2 text-blue-600 flex items-center">
                    <span className="mr-2 text-blue-600">0{idx + 1}.</span>
                    {step.title}
                  </h2>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedStep === idx ? "auto" : 0,
                      opacity: expandedStep === idx ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 text-sm pt-2">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tip box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-1">
              <Rocket className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">Pro Tip</h3>
              <p className="text-blue-700">
                Projects with clear goals, compelling stories, and strong
                visuals attract more support.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Ready to bring your idea to life?
          </h2>
          <p className="text-gray-700 mb-6">
            Start now and launch your project with BoleStarter!
          </p>
          <motion.a
            href="/startup/add"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Your Project
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
