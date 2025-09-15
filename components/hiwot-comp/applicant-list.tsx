"use client";

import { useState } from "react";
import ApplicantCard from "./applicant-card";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/common-comp/pagination";
import type { HiwotFund } from "@/types/hiwotApi";

interface ApplicantListProps {
  applicants: HiwotFund[];
  layout: "list" | "grid";
  onLayoutChange: (layout: "list" | "grid") => void;
}

export default function ApplicantList({
  applicants,
  layout,
  onLayoutChange,
}: ApplicantListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("most-recent");
  const applicantsPerPage = 9;

  // Sort applicants
  const sortedApplicants = [...applicants].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      case "name-desc":
        return `${b.firstName} ${b.lastName}`.localeCompare(
          `${a.firstName} ${a.lastName}`
        );
      case "funding-high":
        return b.fundingGoal - a.fundingGoal;
      case "funding-low":
        return a.fundingGoal - b.fundingGoal;
      default:
        // Most recent (assuming createdAt exists)
        return (
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
        );
    }
  });

  // Pagination
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = sortedApplicants.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const totalPages = Math.ceil(sortedApplicants.length / applicantsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">All Hiwot Funds</h2>
          <p className="text-sm text-gray-500">
            Showing {sortedApplicants.length} results
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Sort by:
            </span>
            <select
              className="border rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="most-recent">Most recent</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="funding-high">Funding Goal (High-Low)</option>
              <option value="funding-low">Funding Goal (Low-High)</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`h-8 w-8 ${layout === "grid" ? "bg-blue-50" : ""}`}
              onClick={() => onLayoutChange("grid")}
            >
              {/* grid icon */}
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
              className={`h-8 w-8 ${layout === "list" ? "bg-blue-50" : ""}`}
              onClick={() => onLayoutChange("list")}
            >
              {/* list icon */}
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
          <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto">
            Apply for Fund
          </Button>
        </div>
      </div>

      {/* Applicants */}
      {layout === "list" ? (
        <div className="space-y-4">
          {currentApplicants.length > 0 ? (
            currentApplicants.map((applicant, index) => (
              <ApplicantCard
                key={applicant._id}
                applicant={applicant}
                index={index}
                layout="list"
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No hiwot funds found.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentApplicants.length > 0 ? (
            currentApplicants.map((applicant, index) => (
              <ApplicantCard
                key={applicant._id}
                applicant={applicant}
                index={index}
                layout="grid"
              />
            ))
          ) : (
            <div className="text-center py-8 col-span-full">
              <p className="text-gray-500">No hiwot funds found.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {sortedApplicants.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
