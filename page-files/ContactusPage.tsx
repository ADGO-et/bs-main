"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import contactimgg from "@/public/contact.png";

export default function ContactusPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden md:w-[70vw] mx-auto mt-10">
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
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-0.5 w-12 bg-blue-500"></div>
            <h1 className="text-3xl md:text-4xl font-bold">Contact us</h1>
            <div className="h-0.5 w-12 bg-blue-500"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-blue-500 mb-2">
                Get in touch
              </h2>
              <p className="text-gray-600">
                We are here for you! How can we help?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto px-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src={contactimgg}
                alt="Contact us"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-600">Asmara Rd, Addis Ababa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-600">+251-911-266-116</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-600">info@bolestarter.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
