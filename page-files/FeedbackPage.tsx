"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState(5); // 1-5 rating scale
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !rating) {
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
        title: "Feedback submitted!",
        description: "Thank you for your feedback.",
      });
      // Reset form
      setName("");
      setContactNumber("");
      setEmail("");
      setExperience("");
      setRating(5);
      setIsSubmitting(false);
    }, 1000);
  };

  const ratingEmojis = [
    { emoji: "😞", label: "Worst" },
    { emoji: "🙁", label: "Poor" },
    { emoji: "😐", label: "Fair" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😍", label: "Excellent" },
  ];

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
          <circle
            cx="200"
            cy="200"
            r="140"
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
            <div className="h-0.5 w-12 bg-purple-500"></div>
            <h1 className="text-3xl md:text-4xl font-bold">Feedback</h1>
            <div className="h-0.5 w-12 bg-purple-500"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 mt-12">
              Share Your Feedback
            </h2>
            <p className="text-gray-600">Rate your experience with us.</p>
          </motion.div>
        </div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium"
                >
                  Contact Number
                </label>
                <Input
                  id="contactNumber"
                  placeholder="+251 91 011 1111"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
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
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Share your experience in scaling
              </label>

              <div className="flex justify-between mb-2">
                {ratingEmojis.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs text-gray-500 mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <Slider
                defaultValue={[5]}
                max={5}
                min={1}
                step={1}
                value={[rating]}
                onValueChange={(value) => setRating(value[0])}
                className="py-4 [&>span:first-child]:bg-purple-500 [&>span:last-child]:bg-purple-500 [&>span:last-child]:ring-purple-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="experience" className="block text-sm font-medium">
                Describe your experience
              </label>
              <Textarea
                id="experience"
                placeholder="Describe your experience here"
                rows={6}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white px-12  h-fit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
