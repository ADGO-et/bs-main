"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import fundingStartup from "@/public/funding-startup.svg";
import projfund from "@/public/projFund.svg";
import Link from "next/link";

export default function FundingPromo() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* First promo section */}
          <motion.div
            className="relative bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-12 flex flex-col h-full">
              <div className="mb-auto">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Start Funding
                  <br />
                  Startups today
                </h2>
                <p className="text-white/90 mb-6">
                  Start funding startups for only $10.
                </p>
                <Button className=" bg-white hover:bg-purple-600 text-black">
                  Sign Up For Free
                </Button>
              </div>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-auto p-4">
              <Image
                src={fundingStartup}
                alt="Funding growth"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="absolute bottom-0 right-0 opacity-20">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="100"
                  stroke="#FFA500"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#FFA500"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  stroke="#FFA500"
                  strokeWidth="0.5"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>

          {/* Second promo section */}
          <motion.div
            className="relative rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src={projfund}
              alt="Project funding"
              width={600}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="p-12 z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Let your project
                  <br />
                  get Fund
                </h2>
                <p className="text-white/90 mb-6">
                  Your search for your project fund begins here
                </p>
                <Button
                  asChild
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Link href="/startup">Learn more</Link>
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 opacity-20">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="100"
                  stroke="#FFA500"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#FFA500"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  stroke="#FFA500"
                  strokeWidth="0.5"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
