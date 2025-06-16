"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CandidateCardProps } from "@/types/jobApi";
import placeholderimg from "@/public/person-placeholder.png";

export default function CandidateCard({
  candidate,
  index,
  layout,
}: CandidateCardProps) {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push(`/job/detail/${candidate.id}`);
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "fulltime":
        return "text-green-500 bg-green-50";
      case "parttime":
        return "text-blue-500 bg-blue-50";
      case "remote":
        return "text-purple-500 bg-purple-50";
      case "internship":
        return "text-purple-500 bg-purple-50";
      case "contract":
        return "text-gray-500 bg-gray-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={placeholderimg}
              alt={`${candidate.firstName} ${candidate.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{`${candidate.firstName} ${candidate.lastName}`}</h3>
            <p className="text-sm text-gray-500">
              {candidate.department} - {candidate.field}
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MapPin size={12} className="mr-1" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full flex items-center ${getEmploymentTypeColor(
                  candidate.typeOfEmployment
                )}`}
              >
                <Briefcase size={10} className="mr-1" />
                {candidate.typeOfEmployment}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="text-purple-500 border-purple-500 hover:bg-purple-50 w-full sm:w-auto"
          onClick={handleSeeMore}
        >
          See More
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border rounded-lg p-4 flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image
            src={placeholderimg}
            alt={`${candidate.firstName} ${candidate.lastName}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{`${candidate.firstName} ${candidate.lastName}`}</h3>
          <p className="text-xs text-gray-500">{candidate.location}</p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm font-medium">{candidate.department}</p>
        <p className="text-sm text-gray-600">{candidate.field}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`text-xs px-2 py-1 rounded-full flex items-center ${getEmploymentTypeColor(
            candidate.typeOfEmployment
          )}`}
        >
          <Briefcase size={10} className="mr-1" />
          {candidate.typeOfEmployment}
        </span>
      </div>
      <Button
        variant="outline"
        className="text-purple-500 border-purple-500 hover:bg-purple-50 mt-auto"
        onClick={handleSeeMore}
      >
        See More
      </Button>
    </motion.div>
  );
}
