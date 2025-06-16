"use client";

import { useState } from "react";
import CandidateCard from "./candidate-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Pagination from "../common-comp/pagination";
import { Candidate } from "@/types/jobApi";

interface CandidateListProps {
  candidates: Candidate[];
  layout: "list" | "grid";
  onLayoutChange: (layout: "list" | "grid") => void;
}

export default function CandidateList({
  candidates,
  layout,
  onLayoutChange,
}: CandidateListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("most-relevant");
  const candidatesPerPage = 9;

  // Sort candidates
  const sortedCandidates = [...candidates].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      case "name-desc":
        return `${b.firstName} ${b.lastName}`.localeCompare(
          `${a.firstName} ${a.lastName}`
        );
      case "department":
        return a.department.localeCompare(b.department);
      case "location":
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = sortedCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(sortedCandidates.length / candidatesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">All Candidates</h2>
          <p className="text-sm text-gray-500">
            Showing {sortedCandidates.length} results
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
                <SelectItem value="most-relevant">Most relevant</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="location">Location</SelectItem>
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
          <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto">
            Create Project
          </Button>
        </div>
      </div>

      {/* Candidates */}
      {layout === "list" ? (
        <div className="space-y-4">
          {currentCandidates.length > 0 ? (
            currentCandidates.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
                layout="list"
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No candidates found matching your criteria.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCandidates.length > 0 ? (
            currentCandidates.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
                layout="grid"
              />
            ))
          ) : (
            <div className="text-center py-8 col-span-full">
              <p className="text-gray-500">
                No candidates found matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {sortedCandidates.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
