"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { HeartHandshake, Upload, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function JobsCoverPage() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const router = useRouter();
  const authUser = useSelector((state: any) => state.auth.user);

  const userCompany = authUser?.company;
  // console.log(userCompany, "userCompany");

  const handlePathClick = (path: (typeof paths)[0]) => {
    if (path.needsCompany) {
      if (userCompany) {
        router.push(path.href);
      } else {
        router.push("/job/company");
      }
      return;
    }
    if (path.href) router.push(path.href);
  };

  useEffect(() => {}, [userCompany]);

  const paths = [
    {
      title: "You want to hire?",
      icon: <HeartHandshake className="w-8 h-8" />,
      steps: ["Check available skills", "Contact candidates"],
      cta: "Browse Skills",
      href: "/job/overview",
      needsCompany: true,
    },
    {
      title: "You want to post your skill?",
      icon: <Upload className="w-8 h-8" />,
      steps: ["Post your skill", "Connect with Employers"],
      cta: "Post Your Skill",
      href: "/job/add",
      needsCompany: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-0">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 pt-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold">
            <span className="text-blue-600">Talent Connect</span>: Where
            Opportunities Meet Skills
          </h1>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-[50vw] mx-auto">
        {paths.map((path, index) => (
          <div
            key={index}
            className="relative h-80 perspective-1000"
            onMouseEnter={() => setFlippedIndex(index)}
            onMouseLeave={() => setFlippedIndex(null)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
                flippedIndex === index ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute inset-0 bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center backface-hidden border-2 border-gray-100">
                <div className="text-blue-500 mb-4">{path.icon}</div>
                <h2 className="text-center text-2xl font-bold mb-2 text-wrap">
                  {path.title}
                </h2>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 border-2 border-blue-100">
                <h3 className="text-xl font-semibold mb-4">How it works</h3>
                <ul className="space-y-3 mb-6 text-center">
                  {path.steps.map((step, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span> {step}
                    </li>
                  ))}
                </ul>
                <Button className="gap-2" onClick={() => handlePathClick(path)}>
                  {path.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
