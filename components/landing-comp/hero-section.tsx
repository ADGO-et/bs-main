"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import collab from "@/public/collab.svg";

export default function HeroSection() {
  return (
    <section className="relative pt-44 pb-16 overflow-hidden">
      {/* Background pattern */}
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
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="120"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
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
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="120"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your new Funding,
            <br />
            Platform all over the world
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            The best place to discover & get to the coolest start ups, projects
            and else.
            <br />
            More than 672800 current vacancies from 17750 sites available to
            you.
          </p>

          <Button className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white py-6 px-8">
            Explore Now
          </Button>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src={collab}
            alt="Team collaboration"
            width={1000}
            height={500}
            className="w-full h-auto rounded-lg object-cover"
          />
        </motion.div>

        {/* <motion.div
          className="flex flex-wrap justify-center items-center gap-8 mt-12 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {["Snowflake", "Hues", "Cactus", "Vision", "Greenish", "Cloud", "Proline", "Leafle"].map((partner, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <p className="font-bold text-lg">{partner}</p>
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
