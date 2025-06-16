"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Briefcase, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import placeholderimg from "@/public/placeholder.png";

export interface StartupProject {
  id: string;
  projectName: string;
  projectDescription: string;
  projectOwner: string;
  email: string;
  phoneNumber: string;
  postDuration: number;
  goalFund: number;
  bank: string;
  bankAccount: string;
  location: string;
  address: string;
  companyLogo: StaticImageData;
  nationalId: string;
  videoLink: string;
  typeOfSupport: string;
  fundingProgress?: number;
  supporters?: number;
  category?: string;
}

interface ProjectCardProps {
  project: StartupProject;
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
    router.push(`/startup/detail/${project.id}`);
  };

  // Get support type badge color
  const getSupportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "funding":
        return "bg-green-100 text-green-800";
      case "mentorship":
        return "bg-blue-100 text-blue-800";
      case "technical":
        return "bg-purple-100 text-purple-800";
      case "partnership":
        return "bg-purple-100 text-purple-800";
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
              alt={project.projectName}
              fill
              className="object-cover rounded-full w-16 h-16"
            />
          </div>
          <div>
            <h3 className="font-medium">{project.projectName}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {project.projectDescription}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{project.postDuration} days</span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className={getSupportTypeColor(project.typeOfSupport)}>
                {project.typeOfSupport}
              </Badge>
              {project.category && (
                <Badge variant="outline">{project.category}</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm">
            <BarChart size={14} className="text-purple-500" />
            <span className="font-medium">
              ETB {project.goalFund.toLocaleString()}
            </span>
          </div>
          <Button
            variant="outline"
            className="text-purple-500 border-purple-500 hover:bg-purple-50 w-full sm:w-auto"
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
            alt={project.projectName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{project.projectName}</h3>
          <p className="text-xs text-gray-500">{project.location}</p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-600 line-clamp-2">
          {project.projectDescription}
        </p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={14} className="text-gray-500" />
        <span className="text-sm text-gray-500">
          {project.postDuration} days left
        </span>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">
            ETB {project.goalFund.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">
            {project.fundingProgress || 0}% funded
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full">
          <div
            className="h-1.5 bg-purple-500 rounded-full"
            style={{ width: `${project.fundingProgress || 0}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <Briefcase size={14} className="text-purple-500" />
          <span className="text-xs text-gray-500">{project.typeOfSupport}</span>
        </div>
      </div>
      <div className="mt-auto">
        <Badge className={`${getSupportTypeColor(project.typeOfSupport)} mb-3`}>
          {project.typeOfSupport}
        </Badge>
        <Button
          variant="outline"
          className="text-purple-500 border-purple-500 hover:bg-purple-50 w-full"
          onClick={handleSeeMore}
        >
          See More
        </Button>
      </div>
    </motion.div>
  );
}
