"use client";

import Image from "next/image";
// import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import careerImage from "@/public/people.jpg";
import Link from "next/link";

export default function CareersSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Armed with the best, ready to lead.
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Elite National Benefits, LLC, we&apos;re building more than
              just a company; we&apos;re fostering a community of driven
              professionals dedicated to excellence. With over 20 years of
              senior-level industry experience, we understand that mutual
              contribution is the key to a successful and rewarding career
              partnership. We seek individuals who are passionate, dedicated,
              and ready to make a significant impact.
            </p>

            <div>
              <h3 className="text-2xl font-bold mb-6">
                Ready to conquer{" "}
                <span className="text-blue-500">the best?</span>
              </h3>
              <Link
                href="job"
                className="p-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              >
                Explore job Requests
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src={careerImage}
                alt="Illustration representing career growth and teamwork"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
