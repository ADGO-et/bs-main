"use client";

import { useState } from "react";
import ProjectCard, { type StartupProject } from "./project-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/common-comp/pagination";
import { useRouter } from "next/navigation";
interface ProjectListProps {
  projects: StartupProject[];
  layout: "list" | "grid";
  onLayoutChange: (layout: "list" | "grid") => void;
}

export default function ProjectList({
  projects,
  layout,
  onLayoutChange,
}: ProjectListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("most-recent");
  const projectsPerPage = 9;
  const router = useRouter();
  // Sort projects
  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.projectName.localeCompare(b.projectName);
      case "name-desc":
        return b.projectName.localeCompare(a.projectName);
      case "funding-high":
        return b.goalFund - a.goalFund;
      case "funding-low":
        return a.goalFund - b.goalFund;
      case "progress-high":
        return (b.fundingProgress || 0) - (a.fundingProgress || 0);
      case "progress-low":
        return (a.fundingProgress || 0) - (b.fundingProgress || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePost = () => {
    router.push("/startup/add");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">All Startup Projects</h2>
          <p className="text-sm text-gray-500">
            Showing {sortedProjects.length} results
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Sort by:
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-recent">Most recent</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="funding-high">
                  Funding Goal (High-Low)
                </SelectItem>
                <SelectItem value="funding-low">
                  Funding Goal (Low-High)
                </SelectItem>
                <SelectItem value="progress-high">
                  Progress (High-Low)
                </SelectItem>
                <SelectItem value="progress-low">
                  Progress (Low-High)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`h-8 w-8 ${layout === "grid" ? "bg-purple-50" : ""}`}
              onClick={() => onLayoutChange("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`h-8 w-8 ${layout === "list" ? "bg-purple-50" : ""}`}
              onClick={() => onLayoutChange("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </Button>
          </div>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto"
            onClick={handlePost}
          >
            Post a Project
          </Button>
        </div>
      </div>

      {/* Projects */}
      {layout === "list" ? (
        <div className="space-y-4">
          {currentProjects.length > 0 ? (
            currentProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                layout="list"
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProjects.length > 0 ? (
            currentProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                layout="grid"
              />
            ))
          ) : (
            <div className="text-center py-8 col-span-full">
              <p className="text-gray-500">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {sortedProjects.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
