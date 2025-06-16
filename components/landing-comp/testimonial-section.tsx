"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Startup Founder, TechWave",
    content:
      "Bole Starter helped us secure funding within weeks. Their platform is intuitive and their support team is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Project Lead, GreenFuture",
    content:
      "The flexibility of funding options is unmatched. We got exactly what our project needed without bureaucracy.",
    rating: 4,
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "CEO, HealthInnovate",
    content:
      "From application to disbursement, everything was transparent and fast. Highly recommend for African startups.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO, AgroTech",
    content:
      "Their startup fund gave us the runway we needed to launch our MVP. Game-changing support!",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Determine which testimonials to display (current, previous, next)
  const displayedTestimonials = [
    testimonials[
      (currentIndex - 1 + testimonials.length) % testimonials.length
    ],
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-40 -top-40 w-80 h-60 rounded-full bg-purple-200 blur-3xl"></div>
        <div className="absolute -right-40 -bottom-40 w-80 h-60 rounded-full bg-blue-200 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-purple-600 max-w-2xl mx-auto">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center h-[300px] md:h-[350px] w-full">
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-2 md:left-8 top-1/2 -translate-y-1/2  md:bg-white p-3 rounded-full md:shadow-lg hover:bg-purple-50 transition-colors z-30"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>

          {/* Cards */}
          <div className="flex items-center justify-center w-full h-full relative">
            {/* Left Card */}
            <motion.div
              key={`left-${displayedTestimonials[0].id}`}
              initial={{ x: "-80%", scale: 0.8, opacity: 0.6 }}
              animate={{ x: 0, scale: 0.9, opacity: 0.8 }}
              exit={{ x: "-120%", opacity: 0 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="hidden md:block relative z-10 w-[280px] md:w-[320px] -mr-8"
            >
              <TestimonialCard
                testimonial={displayedTestimonials[0]}
                isActive={false}
              />
            </motion.div>

            {/* Center Card */}
            <motion.div
              key={`center-${displayedTestimonials[1].id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="z-20 w-[300px] md:w-[360px] mx-2"
            >
              <TestimonialCard
                testimonial={displayedTestimonials[1]}
                isActive={true}
              />
            </motion.div>

            {/* Right Card */}
            <motion.div
              key={`right-${displayedTestimonials[2].id}`}
              initial={{ x: "80%", scale: 0.8, opacity: 0.6 }}
              animate={{ x: 0, scale: 0.9, opacity: 0.8 }}
              exit={{ x: "120%", opacity: 0 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="hidden md:block relative z-10 w-[280px] md:w-[320px] -ml-8"
            >
              <TestimonialCard
                testimonial={displayedTestimonials[2]}
                isActive={false}
              />
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="absolute -right-2 md:right-8 top-1/2 -translate-y-1/2 md:bg-white p-3 rounded-full md:shadow-lg hover:bg-purple-50 transition-colors z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-purple-600 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: any;
  isActive: boolean;
}) {
  return (
    <motion.div
      className={`bg-white p-6 md:p-8 rounded-xl shadow-md border ${
        isActive ? "border-purple-300" : "border-gray-200"
      } h-full flex flex-col`}
      whileHover={isActive ? { y: -5 } : {}}
    >
      <Quote
        className={`w-6 h-6 mb-4 rotate-180 ${
          isActive ? "text-purple-500" : "text-gray-400"
        }`}
      />
      <p
        className={`mb-6 ${
          isActive ? "text-gray-800 text-lg" : "text-gray-600"
        }`}
      >
        {testimonial.content}
      </p>
      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <h4
              className={`font-semibold ${isActive ? "text-lg" : "text-base"}`}
            >
              {testimonial.name}
            </h4>
            <p className={`${isActive ? "text-gray-600" : "text-gray-500"}`}>
              {testimonial.role}
            </p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={i < testimonial.rating ? "#8b5cf6" : "#e2e8f0"}
                stroke="none"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
