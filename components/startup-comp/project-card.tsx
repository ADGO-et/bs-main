"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Briefcase, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import placeholderimg from "@/public/placeholder.png";
import { Startup } from "@/types/startupApi";

interface ProjectCardProps {
  project: Startup;
  index: number;
  layout: "list" | "grid";
}

export default function ProjectCard({
  project,
  index,
  layout,
}: ProjectCardProps) {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push(`/startup/detail/${project._id}`);
  };

  // Get support type badge color
  const getSupportTypeColor = (type: string) => {
    switch ((type || "a").toLowerCase()) {
      case "technology":
        return "bg-green-100 text-green-800";
      case "non-technology":
        return "bg-blue-100 text-blue-800";
      case "investment":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
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
          <div className="relative h-12 w-12 rounded-md overflow-hidden">
            <Image
              src={placeholderimg}
              alt={project.companyName}
              fill
              className="object-cover rounded-full w-16 h-16"
            />
          </div>
          <div>
            <h3 className="font-medium">{project.companyName}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {project.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              {/* <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>{project.}</span>
              </div> */}
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                {project.postExpiryDate?.split("T")[0]}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {/* <Badge className={getSupportTypeColor(project.typeOfSupport)}>
                {project.typeOfSupport}
              </Badge> */}
              {project.category && (
                <Badge variant="outline">{project.category}</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm">
            <BarChart size={14} className="text-blue-500" />
            <span className="font-medium">
              ETB {project.currentFunding.toLocaleString()}
            </span>
          </div>
          <Button
            variant="outline"
            className="text-blue-500 border-blue-500 hover:bg-blue-50 w-full sm:w-auto"
            onClick={handleSeeMore}
          >
            See More
          </Button>
        </div>
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
        <div className="relative h-12 w-12 rounded-md overflow-hidden">
          <Image
            src={placeholderimg}
            alt={project.companyName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{project.companyName}</h3>
          <p className="text-xs text-gray-500">
            {project.firstName} {project.lastName}
          </p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-600 line-clamp-2">
          {project.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={14} className="text-gray-500" />
        <span className="text-sm text-gray-500">{project.howLong} days</span>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">
            ETB {project.currentFunding.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">
            {project.fundingProgress || 0}% funded
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full">
          <div
            className="h-1.5 bg-blue-500 rounded-full"
            style={{ width: `${project.fundingProgress || 0}%` }}
          ></div>
        </div>
        {/* <div className="flex items-center gap-1 mt-2">
          <Briefcase size={14} className="text-blue-500" />
          <span className="text-xs text-gray-500">{project.typeOfSupport}</span>
        </div> */}
      </div>
      <div className="mt-auto">
        {/* <Badge className={`${getSupportTypeColor(project.typeOfSupport)} mb-3`}>
          {project.typeOfSupport}
        </Badge> */}
        <Button
          variant="outline"
          className="text-blue-500 border-blue-500 hover:bg-blue-50 w-full"
          onClick={handleSeeMore}
        >
          See More
        </Button>
      </div>
    </motion.div>
  );
}
